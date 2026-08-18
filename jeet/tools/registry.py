"""The tool registry: where every capability gets registered exactly once.

Adding a new capability to Jeet should always mean writing one self-contained
tool module and registering it here — never editing the conversation loop.
"""

from dataclasses import dataclass
from typing import Callable

from .. import settings


@dataclass
class Tool:
    name: str
    description: str
    input_schema: dict
    handler: Callable[[dict], str]
    # Read-only / non-destructive tools are safe to run on their own. Tools
    # that send, spend, delete, or change a setting are marked unsafe here,
    # which jeet/llm.py's confirmation gate (Tier 6) checks before ever
    # running one. A tool's own safe=False can't be loosened from config —
    # see requires_confirmation() below — only tightened.
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


def requires_confirmation(name):
    """Whether this tool must stop and get an explicit yes before running.
    True for any tool marked safe=False in code, or one the user has added
    to config/settings.yaml's extra_confirmation_required — and True for an
    unrecognized name too, since "we don't know what this does" is exactly
    the situation that should default to caution, not silent execution.
    """
    tool = TOOLS.get(name)
    if tool is None:
        return True
    if not tool.safe:
        return True
    return name in (settings.load().get("extra_confirmation_required") or [])
