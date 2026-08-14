"""Notices — the tool-facing side of the Tier 5 heartbeat's inbox. Lets
the user ask what came up while they were away, and clear an item once
they've seen or handled it. This is how "every surfaced item is
dismissible" actually happens — through the same conversation loop as
everything else, text or voice.
"""

from ..heartbeat import notices
from .registry import Tool, register


def list_notices(tool_input):
    items = notices.active()
    if not items:
        return "Nothing waiting."
    lines = []
    for n in items:
        marker = "🔔" if n["level"] == "urgent" else "•"
        lines.append(f"{marker} #{n['id']} ({n['check']}): {n['message']}")
    return "\n".join(lines)


def dismiss_notice(tool_input):
    n = notices.dismiss(tool_input["notice_id"])
    return f"Dismissed #{n['id']}."


register(
    Tool(
        name="list_notices",
        description=(
            "List things the heartbeat has noticed and left for you while running in the "
            "background. Use when the user asks what's new, what came up, what they missed, "
            "or says something like 'what's up?'."
        ),
        input_schema={"type": "object", "properties": {}},
        handler=list_notices,
        safe=True,
    )
)

register(
    Tool(
        name="dismiss_notice",
        description=(
            "Clear a notice from the heartbeat's inbox, given its numeric id (shown by "
            "list_notices), once the user has seen or handled it."
        ),
        input_schema={
            "type": "object",
            "properties": {"notice_id": {"type": "integer", "description": "The notice's id."}},
            "required": ["notice_id"],
        },
        handler=dismiss_notice,
        safe=True,
    )
)
