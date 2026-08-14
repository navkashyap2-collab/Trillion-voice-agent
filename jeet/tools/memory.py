"""Business memory — capability #2.

This is the storage half of the Tier 4 long-term memory store: durable
facts Jeet learns about the user and their business, one plain statement
per entry. Tier 2 exposes it as tools Jeet can call mid-conversation; Tier 4
is what loads it automatically into the system prompt at the start of every
session so Jeet "just knows" without being asked to look it up.
"""

from .. import store
from .registry import Tool, register

FILE = "memory.json"


def _load():
    return store.load(FILE, [])


def remember_fact(tool_input):
    facts = _load()
    fact = {"id": store.next_id(facts), "text": tool_input["fact"]}
    facts.append(fact)
    store.save(FILE, facts)
    return f"Remembered (#{fact['id']}): {fact['text']}"


def recall_facts(tool_input):
    facts = _load()
    query = (tool_input.get("query") or "").strip().lower()
    if query:
        facts = [f for f in facts if query in f["text"].lower()]
    if not facts:
        return "No matching facts stored." if query else "Nothing stored yet."
    return "\n".join(f"#{f['id']}: {f['text']}" for f in facts)


def forget_fact(tool_input):
    facts = _load()
    fact_id = tool_input["fact_id"]
    for f in facts:
        if f["id"] == fact_id:
            facts.remove(f)
            store.save(FILE, facts)
            return f"Forgot #{fact_id}: {f['text']}"
    raise ValueError(f"no stored fact with id {fact_id}")


register(
    Tool(
        name="remember_fact",
        description=(
            "Store one durable fact about the user, their business, or their preferences — "
            "a plain single-sentence statement, e.g. 'client Acme Corp pays net-30' or "
            "'prefers morning meetings'. Use for things worth knowing next session, not "
            "passing chatter."
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
            "to check before answering."
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
