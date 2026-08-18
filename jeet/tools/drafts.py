"""Draft messages — capability #3.

Drafting is always safe to run on its own: it only composes and stores text
for the user to review. Actually *sending* a message is a different tool
that doesn't exist yet — when it does, it falls under the Tier 6 hard
confirmation gate ("never send without asking first").
"""

from .. import store
from .registry import Tool, register

FILE = "drafts.json"


def draft_message(tool_input):
    drafts = store.load(FILE, [])
    draft = {
        "id": store.next_id(drafts),
        "recipient": tool_input["recipient"],
        "subject": tool_input.get("subject", ""),
        "body": tool_input["body"],
    }
    drafts.append(draft)
    store.save(FILE, drafts)

    subject_line = f" (subject: {draft['subject']})" if draft["subject"] else ""
    return (
        f"Draft #{draft['id']} prepared for {draft['recipient']}{subject_line}:\n\n"
        f"{draft['body']}\n\n"
        "This is only a draft — nothing has been sent. Sending isn't built yet, and when "
        "it is, it'll always ask you first."
    )


register(
    Tool(
        name="draft_message",
        description=(
            "Draft a message (e.g. an email or chat message) for the user to review before "
            "sending. This only composes and stores a draft — it never sends anything."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "recipient": {"type": "string", "description": "Who the message is for."},
                "subject": {"type": "string", "description": "Optional subject line."},
                "body": {"type": "string", "description": "The message body."},
            },
            "required": ["recipient", "body"],
        },
        handler=draft_message,
        safe=True,
    )
)
