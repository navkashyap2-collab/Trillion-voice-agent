"""The thin seam between Jeet's brain and the model provider.

Every other part of the harness talks to `stream_reply` and never touches
the Anthropic SDK directly. Swapping providers later means rewriting this
one file.
"""

import anthropic

from .config import MODEL_ID

MAX_TOKENS = 4096


class LLMError(Exception):
    """A model call failed in a way that should be shown to the user, not crash the loop."""


def stream_reply(history, system_prompt):
    """Stream a reply for `history` (list of {"role", "content"} dicts).

    Yields text chunks as they arrive so the caller can print (or eventually
    speak) them as they're generated. Raises LLMError on any failure.
    """
    client = anthropic.Anthropic()
    try:
        with client.messages.stream(
            model=MODEL_ID,
            max_tokens=MAX_TOKENS,
            system=system_prompt,
            messages=history,
        ) as stream:
            yield from stream.text_stream
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
        # The SDK raises a plain TypeError (not an APIError subclass) when it
        # can't find any credentials at client-construction/request-build time.
        if "authentication" in str(e).lower():
            raise LLMError(
                "No API credentials found — set ANTHROPIC_API_KEY in your .env file."
            ) from e
        raise LLMError(f"Something went wrong talking to the model: {e}") from e
    except Exception as e:  # last-resort net: never let a model call crash the loop
        raise LLMError(f"Something went wrong talking to the model: {e}") from e
