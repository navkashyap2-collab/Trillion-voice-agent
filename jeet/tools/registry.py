"""The tool registry: where every capability gets registered exactly once.

Adding a new capability to Jeet should always mean writing one self-contained
tool module and registering it here — never editing the conversation loop.
"""

from dataclasses import dataclass
from typing import Callable


@dataclass
class Tool:
    name: str
    description: str
    input_schema: dict
    handler: Callable[[dict], str]
    # Read-only / non-destructive tools are safe to run on their own. Tools
    # that send, spend, delete, or change a setting are marked unsafe here —
    # Tier 6 wires this flag into an actual confirmation gate; for now it's
    # just a plainly-visible declaration of intent per tool.
    safe: bool = True


TOOLS: dict[str, Tool] = {}


def register(tool: Tool):
    if tool.name in TOOLS:
        raise ValueError(f"Tool '{tool.name}' is already registered")
    TOOLS[tool.name] = tool


def anthropic_tool_defs():
    return [
        {"name": t.name, "description": t.description, "input_schema": t.input_schema}
        for t in TOOLS.values()
    ]


def call_tool(name, tool_input):
    """Run a registered tool. Never raises — failures come back as a plain-
    language error string plus an is_error flag, so the model can react to
    them instead of the harness crashing.
    """
    tool = TOOLS.get(name)
    if tool is None:
        return f"No such tool: '{name}'.", True
    try:
        return tool.handler(tool_input), False
    except Exception as e:
        return f"'{name}' failed: {e}", True
