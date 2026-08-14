"""Heartbeat checks — each one looks at something and decides whether it's
worth telling the user about. Most runs should produce nothing; that's
the point. Add a new capability by writing one function here and
registering it below — the scheduler in jeet/heartbeat/loop.py never
changes.

A check's only job is to look, decide, and call notices.add() itself if
something's worth surfacing — it has full control over the message and
whether it's "fyi" (calm log) or "urgent" (worth an interruption).
"""

from datetime import datetime, timedelta

from .. import store
from . import notices

CHECKS = {}


def register(name, fn):
    CHECKS[name] = fn


def run_check(name, params):
    fn = CHECKS.get(name)
    if fn is None:
        raise ValueError(f"no such heartbeat check: '{name}'")
    fn(params or {})


def _stale_tasks(params):
    """Open tasks that have been sitting untouched for a while. One notice
    per outbreak, not one per task — if it's already been flagged and not
    dismissed, don't pile on; once dismissed, a later run can flag again.
    """
    if notices.has_active("stale_tasks"):
        return

    stale_after_days = params.get("stale_after_days", 3)
    cutoff = datetime.now() - timedelta(days=stale_after_days)

    stale = []
    for t in store.load("tasks.json", []):
        if t.get("done"):
            continue
        created_at = t.get("created_at")
        if created_at and datetime.fromisoformat(created_at) <= cutoff:
            stale.append(t)

    if not stale:
        return

    plural = "task" if len(stale) == 1 else "tasks"
    lines = "\n".join(f"  #{t['id']} {t['description']}" for t in stale)
    notices.add(
        "stale_tasks",
        f"{len(stale)} open {plural} been sitting for {stale_after_days}+ days:\n{lines}",
        level="fyi",
    )


register("stale_tasks", _stale_tasks)


def _heartbeat_smoke_test(params):
    """Not a real feature — a way to prove the whole heartbeat pipeline
    works end to end without waiting on a real-world condition. Write
    data/heartbeat_trigger.json (e.g. `{"message": "test"}`) and this
    check picks it up — and deletes the file, so it only fires once — on
    its next run.
    """
    trigger = store.load("heartbeat_trigger.json", None)
    if not trigger:
        return

    store.delete("heartbeat_trigger.json")
    message = (trigger.get("message") or "").strip() or "Heartbeat smoke test triggered."
    notices.add("heartbeat_smoke_test", message, level="urgent")


register("heartbeat_smoke_test", _heartbeat_smoke_test)
