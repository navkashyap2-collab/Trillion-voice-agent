"""The thin seam between Jeet's brain and the model provider.

Every other part of the harness talks to `run_turn` and never touches the
Anthropic SDK directly. Swapping providers later means rewriting this one
file.
"""

import anthropic

from .config import MODEL_ID
from .tools import call_tool

MAX_TOKENS = 4096
# A turn may bounce through several tool calls before the model is ready to
# answer — but not forever. This is a circuit breaker, not a design limit.
MAX_TOOL_ROUNDS = 8


class LLMError(Exception):
    """A model call failed in a way that should be shown to the user, not crash the loop."""


def run_turn(history, system_prompt, tools, on_tool_use=None):
    """Run one full conversational turn, including any tool calls.

    Mutates `history` in place with everything that happened this turn
    (assistant messages and tool results), so the next call sees the
    complete conversation. Yields text chunks as they stream in — including
    text the model writes before or between tool calls. Calls
    `on_tool_use(tool_name)` right before running each tool, if given.
    Raises LLMError on failure; the caller decides how to show that to the
    user and how much of the partial turn to keep.
    """
    client = anthropic.Anthropic()

    for _ in range(MAX_TOOL_ROUNDS):
        try:
            with client.messages.stream(
                model=MODEL_ID,
                max_tokens=MAX_TOKENS,
                system=system_prompt,
                messages=history,
                tools=tools,
            ) as stream:
                for event in stream:
                    if event.type == "content_block_delta" and event.delta.type == "text_delta":
                        yield event.delta.text
                message = stream.get_final_message()
        except anthropic.AuthenticationError as e:
            raise LLMError(
                "Authentication failed — check that ANTHROPIC_API_KEY is set correctly."
            ) from e
        except anthropic.RateLimitError as e:
            raise LLMError("I'm being rate-limited right now. Try again in a moment.") from e
        except anthropic.APIConnectionError as e:
            raise LLMError("I couldn't reach the model — check your internet connection.") from e
        except anthropic.APIStatusError as e:
            raise LLMError(f"The model API returned an error ({e.status_code}). Try again.") from e
        except anthropic.APIError as e:
            raise LLMError(f"Something went wrong talking to the model: {e}") from e
        except TypeError as e:
            # The SDK raises a plain TypeError (not an APIError subclass) when
            # it can't find any credentials at client-construction time.
            if "authentication" in str(e).lower():
                raise LLMError(
                    "No API credentials found — set ANTHROPIC_API_KEY in your .env file."
                ) from e
            raise LLMError(f"Something went wrong talking to the model: {e}") from e
        except Exception as e:  # last-resort net: never let a model call crash the loop
            raise LLMError(f"Something went wrong talking to the model: {e}") from e

        history.append({"role": "assistant", "content": message.content})

        tool_use_blocks = [b for b in message.content if b.type == "tool_use"]
        if not tool_use_blocks:
            return

        tool_results = []
        for block in tool_use_blocks:
            if on_tool_use:
                on_tool_use(block.name)
            result_text, is_error = call_tool(block.name, block.input)
            tool_results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result_text,
                    "is_error": is_error,
                }
            )
        history.append({"role": "user", "content": tool_results})

    raise LLMError("Gave up after too many tool calls in a row — something may be looping.")
