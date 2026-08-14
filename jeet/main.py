"""Tiers 1-2-4-5-6: a plain-text conversation loop with tool use, memory
loaded at startup, a background heartbeat, and a hard confirmation gate
on consequential actions.

Run with `python -m jeet.main`. Type a message, get a streamed reply —
Jeet may call a tool along the way (tasks, memory, drafts, briefing,
notices) and weave the result into its answer, stopping to ask first if
the action is consequential. Ctrl+D / Ctrl+C / "exit" / "quit" to leave.
"""

from dotenv import load_dotenv

from .config import NAME, build_system_prompt
from .heartbeat import Heartbeat, startup_summary
from .llm import LLMError, run_turn
from .tools import anthropic_tool_defs


def announce_tool(name):
    print(f"\n  ↳ using {name}...", flush=True)


def confirm_action(name, tool_input):
    """The Tier 6 confirmation gate's text-mode UI: state plainly what
    Jeet is about to do and wait for an explicit yes. Every call is a
    fresh ask — approving one action never pre-approves the next.
    """
    args = ", ".join(f"{k}={v!r}" for k, v in tool_input.items())
    print(f"\n⚠️  {NAME} wants to run {name}({args}) — this can't easily be undone.")
    try:
        answer = input("Proceed? [y/N] ").strip().lower()
    except (EOFError, KeyboardInterrupt):
        print("(no answer given — treating as no)")
        return False
    return answer in ("y", "yes")


def run():
    load_dotenv()
    system_prompt = build_system_prompt()
    tool_defs = anthropic_tool_defs()

    heartbeat = Heartbeat()
    heartbeat.start()

    history = []
    print(f"{NAME} is up. Type a message (Ctrl+D or 'exit' to quit).")
    summary = startup_summary()
    if summary:
        print(summary)
    print()

    try:
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
                for chunk in run_turn(
                    history,
                    system_prompt,
                    tool_defs,
                    on_tool_use=announce_tool,
                    confirm=confirm_action,
                ):
                    print(chunk, end="", flush=True)
                print()
            except LLMError as e:
                print(f"\n[{NAME} hit a snag: {e}]")
                # Drop the whole failed turn — including any partial tool
                # exchanges — so retrying next time starts clean.
                del history[turn_start:]
                continue
    finally:
        heartbeat.stop()


if __name__ == "__main__":
    run()
