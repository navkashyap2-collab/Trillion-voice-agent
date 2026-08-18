"""The long-term memory store — durable facts Jeet knows about the user and
their business, one plain statement per entry, human-readable on disk at
data/memory.json (open it, fix a wrong fact, or delete something by hand
any time you want).

This is Tier 4. What makes it different from any other tool's private
storage is that jeet/config.py loads it automatically into every session's
system prompt, so Jeet already knows these facts before being asked —
restarting the program doesn't mean starting over. jeet/tools/memory.py is
the thin tool-facing layer on top of this same store, for managing it
mid-conversation.
"""

from . import store

FILE = "memory.json"


def all_facts():
    return store.load(FILE, [])


def remember(fact_text):
    facts = all_facts()
    fact = {"id": store.next_id(facts), "text": fact_text}
    facts.append(fact)
    store.save(FILE, facts)
    return fact


def recall(query=None):
    facts = all_facts()
    if query:
        query = query.strip().lower()
        facts = [f for f in facts if query in f["text"].lower()]
    return facts


def update(fact_id, new_text):
    facts = all_facts()
    for f in facts:
        if f["id"] == fact_id:
            f["text"] = new_text
            store.save(FILE, facts)
            return f
    raise ValueError(f"no stored fact with id {fact_id}")


def forget(fact_id):
    facts = all_facts()
    for f in facts:
        if f["id"] == fact_id:
            facts.remove(f)
            store.save(FILE, facts)
            return f
    raise ValueError(f"no stored fact with id {fact_id}")
