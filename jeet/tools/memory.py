"""Business memory tools — capability #2, the tool-facing half of Tier 4.

The storage itself lives in jeet/memory.py, which jeet/config.py also reads
to load these facts into the system prompt at the start of every session.
These tools are how Jeet manages that same store mid-conversation.
"""

from .. import memory
from .registry import Tool, register


def remember_fact(tool_input):
    fact = memory.remember(tool_input["fact"])
    return f"Remembered (#{fact['id']}): {fact['text']}"


def recall_facts(tool_input):
    facts = memory.recall(tool_input.get("query"))
    if not facts:
        return "No matching facts stored." if tool_input.get("query") else "Nothing stored yet."
    return "\n".join(f"#{f['id']}: {f['text']}" for f in facts)


def update_fact(tool_input):
    fact = memory.update(tool_input["fact_id"], tool_input["fact"])
    return f"Updated #{fact['id']}: {fact['text']}"


def forget_fact(tool_input):
    fact = memory.forget(tool_input["fact_id"])
    return f"Forgot #{fact['id']}: {fact['text']}"


register(
    Tool(
        name="remember_fact",
        description=(
            "Store one durable fact about the user, their business, or their preferences — "
            "a plain single-sentence statement, e.g. 'client Acme Corp pays net-30' or "
            "'prefers morning meetings'. Use for things worth knowing next session, not "
            "passing chatter. If a similar fact is already stored, prefer update_fact instead."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "fact": {
                    "type": "string",
                    "description": "One clear, self-contained statement of fact.",
                }
            },
            "required": ["fact"],
        },
        handler=remember_fact,
        safe=True,
    )
)

register(
    Tool(
        name="recall_facts",
        description=(
            "Look up remembered facts about the user or their business. Use when the user "
            "asks what you know about a topic, client, or preference, or when it would help "
            "to check before answering. Most facts are already in your system prompt at the "
            "start of the conversation — use this to search, or to see facts added since."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Optional keyword to filter by. Omit to list everything.",
                }
            },
        },
        handler=recall_facts,
        safe=True,
    )
)

register(
    Tool(
        name="update_fact",
        description=(
            "Correct or rewrite an existing remembered fact in place, given its numeric id "
            "(shown by recall_facts). Use this instead of remember_fact when a stored fact is "
            "now wrong or out of date, so there's one current fact per topic instead of "
            "duplicates piling up."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "fact_id": {"type": "integer", "description": "The fact's id."},
                "fact": {"type": "string", "description": "The corrected statement of fact."},
            },
            "required": ["fact_id", "fact"],
        },
        handler=update_fact,
        safe=True,
    )
)

register(
    Tool(
        name="forget_fact",
        description=(
            "Permanently delete a remembered fact, given its numeric id (shown by "
            "recall_facts). This cannot be undone."
        ),
        input_schema={
            "type": "object",
            "properties": {"fact_id": {"type": "integer", "description": "The fact's id."}},
            "required": ["fact_id"],
        },
        handler=forget_fact,
        safe=False,  # deletes data — Tier 6 gates this behind confirmation
    )
)
