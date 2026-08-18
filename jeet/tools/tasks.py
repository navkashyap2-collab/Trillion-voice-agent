"""Tasks & reminders — capability #1."""

from datetime import datetime

from .. import store
from .registry import Tool, register

FILE = "tasks.json"


def _load():
    return store.load(FILE, [])


def add_task(tool_input):
    tasks = _load()
    task = {
        "id": store.next_id(tasks),
        "description": tool_input["description"],
        "done": False,
        "created_at": datetime.now().isoformat(),
    }
    tasks.append(task)
    store.save(FILE, tasks)
    return f"Added task #{task['id']}: {task['description']}"


def list_tasks(tool_input):
    tasks = _load()
    include_completed = tool_input.get("include_completed", False)
    visible = [t for t in tasks if include_completed or not t["done"]]
    if not visible:
        return "No tasks at all." if include_completed else "No open tasks."
    return "\n".join(f"#{t['id']} [{'x' if t['done'] else ' '}] {t['description']}" for t in visible)


def complete_task(tool_input):
    tasks = _load()
    task_id = tool_input["task_id"]
    for t in tasks:
        if t["id"] == task_id:
            t["done"] = True
            store.save(FILE, tasks)
            return f"Marked #{task_id} done: {t['description']}"
    raise ValueError(f"no task with id {task_id}")


def remove_task(tool_input):
    tasks = _load()
    task_id = tool_input["task_id"]
    for t in tasks:
        if t["id"] == task_id:
            tasks.remove(t)
            store.save(FILE, tasks)
            return f"Removed task #{task_id}: {t['description']}"
    raise ValueError(f"no task with id {task_id}")


register(
    Tool(
        name="add_task",
        description=(
            "Add a task or reminder to the user's to-do list. Use when the user asks to "
            "remember to do something, add a reminder, or add an item to their list."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "description": {
                    "type": "string",
                    "description": "Plain-language description of the task, e.g. 'call the bank at 3pm'.",
                }
            },
            "required": ["description"],
        },
        handler=add_task,
        safe=True,
    )
)

register(
    Tool(
        name="list_tasks",
        description=(
            "List the user's tasks. Use when the user asks what's on their list, what they "
            "need to do, or what's still open."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "include_completed": {
                    "type": "boolean",
                    "description": "Include already-completed tasks too. Default false.",
                }
            },
        },
        handler=list_tasks,
        safe=True,
    )
)

register(
    Tool(
        name="complete_task",
        description="Mark a task as done, given its numeric id (shown by list_tasks).",
        input_schema={
            "type": "object",
            "properties": {"task_id": {"type": "integer", "description": "The task's id."}},
            "required": ["task_id"],
        },
        handler=complete_task,
        safe=True,
    )
)

register(
    Tool(
        name="remove_task",
        description=(
            "Permanently delete a task from the list, given its numeric id. This cannot be "
            "undone."
        ),
        input_schema={
            "type": "object",
            "properties": {"task_id": {"type": "integer", "description": "The task's id."}},
            "required": ["task_id"],
        },
        handler=remove_task,
        safe=False,  # deletes data — Tier 6 gates this behind confirmation
    )
)
