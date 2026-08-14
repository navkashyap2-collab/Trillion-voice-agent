"""Tier 1: a plain-text conversation loop.

Run with `python -m jeet.main`. Type a message, get a streamed reply, repeat.
Ctrl+D / Ctrl+C / "exit" / "quit" to leave.
"""

from dotenv import load_dotenv

from .config import NAME, SYSTEM_PROMPT
from .llm import LLMError, stream_reply


def run():
    load_dotenv()

    history = []
    print(f"{NAME} is up. Type a message (Ctrl+D or 'exit' to quit).\n")

    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print(f"\n{NAME}: See you later.")
            break

        if not user_input:
            continue
        if user_input.lower() in ("exit", "quit"):
            print(f"{NAME}: See you later.")
            break

        history.append({"role": "user", "content": user_input})

        print(f"{NAME}: ", end="", flush=True)
        reply_chunks = []
        try:
            for chunk in stream_reply(history, SYSTEM_PROMPT):
                print(chunk, end="", flush=True)
                reply_chunks.append(chunk)
            print()
        except LLMError as e:
            print(f"\n[{NAME} hit a snag: {e}]")
            # Don't keep a partial/failed turn in history — retry cleanly next time.
            history.pop()
            continue

        history.append({"role": "assistant", "content": "".join(reply_chunks)})


if __name__ == "__main__":
    run()
