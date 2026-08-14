"""Tier 3 (+4/5): push-to-talk voice, wrapped around the exact same brain
as the text loop (jeet.llm.run_turn), the exact same tools, the same
memory-loaded system prompt, and the same background heartbeat. Hold
SPACE, speak, release — Jeet transcribes, thinks (calling tools as
needed), and speaks back. The typed interface (jeet.main) is untouched
and keeps working exactly as before; this is a second front door onto
the same brain, not a fork of it.

Run with `python -m jeet.voice`.
"""

from dotenv import load_dotenv

from .config import NAME, build_system_prompt
from .heartbeat import Heartbeat, startup_summary
from .llm import LLMError, run_turn
from .tools import anthropic_tool_defs


def _echo(text_gen):
    """Print streamed text to the console as it arrives (so you can see
    what Jeet is saying, and — while debugging — catch a bad transcript
    before it gets three sentences into an answer to the wrong question)
    while still handing every chunk on to the caller.
    """
    for chunk in text_gen:
        print(chunk, end="", flush=True)
        yield chunk


def run():
    load_dotenv()

    try:
        from .audio import Player, PushToTalk, pcm_to_wav
        from .stt import STTError, transcribe
        from .tts import TTSError, speak_stream
    except ImportError as e:
        print(f"Can't start voice mode:\n\n{e}")
        return

    system_prompt = build_system_prompt()
    tool_defs = anthropic_tool_defs()
    history = []

    heartbeat = Heartbeat()
    heartbeat.start()

    player = Player()
    push_to_talk = PushToTalk(on_press=player.interrupt)

    def announce_tool(name):
        print(f"\n  ↳ using {name}...", flush=True)

    def confirm_action(name, tool_input):
        """The Tier 6 confirmation gate's voice-mode UI. Yes/no still goes
        through the keyboard, not another round of listening — but Jeet
        speaks a heads-up first so a "hold to talk" reflex doesn't get met
        with silence and no explanation. Every call is a fresh ask —
        approving one action never pre-approves the next.
        """
        args = ", ".join(f"{k}={v!r}" for k, v in tool_input.items())
        print(f"\n⚠️  {NAME} wants to run {name}({args}) — this can't easily be undone.")
        try:
            speak_stream(iter(["I need you to confirm something on screen before I go on."]), player)
        except TTSError:
            pass  # the on-screen prompt below still works even if speech fails
        try:
            answer = input("Proceed? [y/N] ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print("(no answer given — treating as no)")
            return False
        return answer in ("y", "yes")

    print(f"{NAME} is up in voice mode. Hold SPACE to talk, release to send.")
    print("Press SPACE again while Jeet is speaking to interrupt. Ctrl+C to quit.")
    summary = startup_summary()
    if summary:
        print(summary)
    print()

    try:
        push_to_talk.start()
    except Exception as e:
        print(f"Couldn't start listening for the push-to-talk key: {e}")
        heartbeat.stop()
        return

    try:
        while True:
            print("Hold SPACE to talk...", end="", flush=True)
            push_to_talk.wait_for_press()
            print("\r🎙 listening...        ", flush=True)
            pcm = push_to_talk.record_while_held()

            if not pcm:
                print("(nothing captured)\n")
                continue

            print("[transcribing...]", flush=True)
            try:
                transcript = transcribe(pcm_to_wav(pcm))
            except STTError as e:
                print(f"[{NAME} couldn't hear that: {e}]\n")
                continue

            if not transcript:
                print("(heard silence)\n")
                continue

            print(f"You said: {transcript}\n")

            turn_start = len(history)
            history.append({"role": "user", "content": transcript})

            print(f"{NAME}: ", end="", flush=True)
            try:
                text_gen = run_turn(
                    history,
                    system_prompt,
                    tool_defs,
                    on_tool_use=announce_tool,
                    confirm=confirm_action,
                )
                speak_stream(_echo(text_gen), player)
            except LLMError as e:
                print(f"\n[{NAME} hit a snag: {e}]")
                # Drop the whole failed turn — including any partial tool
                # exchanges — so retrying next time starts clean.
                del history[turn_start:]
                continue
            except TTSError as e:
                print(f"\n[{NAME} couldn't say that out loud: {e}]")
                # The reply itself succeeded and is already on screen —
                # keep it in history even though speaking it failed.
            print("\n")
    except KeyboardInterrupt:
        print(f"\n{NAME}: See you later.")
    finally:
        push_to_talk.stop()
        heartbeat.stop()


if __name__ == "__main__":
    run()
