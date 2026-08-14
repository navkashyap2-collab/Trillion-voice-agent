"""Kill-switch tools — pause or resume the heartbeat from a normal
conversation turn, in either text or voice mode.

pause_heartbeat is deliberately marked safe (no confirmation gate): it's
the emergency stop, and the whole point of a kill switch is that it works
the instant you want it, with zero friction — asking "are you sure?" is
exactly wrong for a control whose purpose is stopping something
unexpected right now. resume_heartbeat is equally harmless: it only
returns the heartbeat to its normal, already-configured behavior.
"""

from ..heartbeat import killswitch
from .registry import Tool, register


def pause_heartbeat(tool_input):
    killswitch.pause()
    return "Heartbeat paused. No background checks will run until you say to resume."


def resume_heartbeat(tool_input):
    killswitch.resume()
    return "Heartbeat resumed."


register(
    Tool(
        name="pause_heartbeat",
        description=(
            "Pause all background/proactive checks (the heartbeat) until resumed. Use "
            "when the user asks to stop background activity, go quiet, or pause proactive "
            "checks — this is the kill switch, run it immediately without asking first."
        ),
        input_schema={"type": "object", "properties": {}},
        handler=pause_heartbeat,
        safe=True,
    )
)

register(
    Tool(
        name="resume_heartbeat",
        description="Resume background/proactive checks (the heartbeat) after they were paused.",
        input_schema={"type": "object", "properties": {}},
        handler=resume_heartbeat,
        safe=True,
    )
)
