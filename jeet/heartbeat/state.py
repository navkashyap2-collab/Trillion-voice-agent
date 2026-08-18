"""Tracks when each heartbeat check is next due, in a file that survives a
restart — so relaunching the program doesn't reset every timer or fire
everything at once on boot. Each check has exactly one next-due time, so a
long-off program catches up by running once, not by replaying every
interval it missed.
"""

from datetime import datetime, timedelta

from .. import store

FILE = "heartbeat_state.json"


def is_due(check_name, interval_minutes):
    state = store.load(FILE, {})
    next_due = state.get(check_name)
    if next_due is None:
        return True  # never run before — due now
    return datetime.now() >= datetime.fromisoformat(next_due)


def mark_run(check_name, interval_minutes):
    state = store.load(FILE, {})
    next_due = datetime.now() + timedelta(minutes=interval_minutes)
    state[check_name] = next_due.isoformat()
    store.save(FILE, state)
