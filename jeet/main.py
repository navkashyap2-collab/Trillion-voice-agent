"""Tier 1-2: a plain-text conversation loop with tool use.

Run with `python -m jeet.main`. Type a message, get a streamed reply — Jeet
may call a tool along the way (tasks, memory, drafts, briefing) and weave
the result into its answer. Ctrl+D / Ctrl+C / "exit" / "quit" to leave.
"""

from dotenv import load_dotenv

from .config import NAME, build_system_prompt
from .llm import LLMError, run_turn
from .tools import anthropic_tool_defs


def announce_tool(name):
    print(f"\n  ↳ using {name}...", flush=True)


def run():
    load_dotenv()
    system_prompt = build_system_prompt()
    tool_defs = anthropic_tool_defs()

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

        turn_start = len(history)
        history.append({"role": "user", "content": user_input})

        print(f"{NAME}: ", end="", flush=True)
        try:
            for chunk in run_turn(history, system_prompt, tool_defs, on_tool_use=announce_tool):
                print(chunk, end="", flush=True)
            print()
        except LLMError as e:
            print(f"\n[{NAME} hit a snag: {e}]")
            # Drop the whole failed turn — including any partial tool
            # exchanges — so retrying next time starts clean.
            del history[turn_start:]
            continue


if __name__ == "__main__":
    run()
