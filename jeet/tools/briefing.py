"""Daily briefing — capability #4. Pulls tasks + memory into one summary."""

from .. import store
from .registry import Tool, register


def brief_me(tool_input):
    tasks = [t for t in store.load("tasks.json", []) if not t["done"]]
    facts = store.load("memory.json", [])

    lines = []
    if tasks:
        lines.append("Open tasks:")
        lines.extend(f"  #{t['id']} {t['description']}" for t in tasks)
    else:
        lines.append("No open tasks.")

    if facts:
        lines.append("")
        lines.append("Things I know:")
        lines.extend(f"  #{f['id']} {f['text']}" for f in facts)

    return "\n".join(lines)


register(
    Tool(
        name="brief_me",
        description=(
            "Give the user a quick briefing: open tasks plus what's remembered about them. "
            "Use when the user asks to be briefed, wants a summary, or asks what's going on."
        ),
        input_schema={"type": "object", "properties": {}},
        handler=brief_me,
        safe=True,
    )
)
