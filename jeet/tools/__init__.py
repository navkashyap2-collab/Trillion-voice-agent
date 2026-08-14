from .registry import TOOLS, anthropic_tool_defs, call_tool  # noqa: F401

# Each import below runs a tool module's registration side effect. Adding a
# new capability means adding one line here plus its own file — the loop in
# jeet/llm.py never changes.
from . import briefing, drafts, memory, notices, tasks  # noqa: F401,E402
