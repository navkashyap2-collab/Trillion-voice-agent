"""The heartbeat's inbox — where proactive checks leave things for you to
see, held until you dismiss them so nothing surfaces once and gets lost.

Two things write here concurrently: the heartbeat's own background thread
(adding notices) and the conversation loop's dismiss_notice tool (running
on the main thread, possibly at the same moment). A lock keeps a
read-modify-write from either side from clobbering the other's change.
"""

import threading
from datetime import datetime

from .. import audit, store

FILE = "notices.json"
_lock = threading.Lock()


def _load():
    return store.load(FILE, [])


def add(check_name, message, level="fyi"):
    """level: "fyi" (sits quietly in the log) or "urgent" (worth an
    interruption, outside quiet hours)."""
    with _lock:
        notices = _load()
        notice = {
            "id": store.next_id(notices),
            "check": check_name,
            "message": message,
            "level": level,
            "created_at": datetime.now().isoformat(),
            "dismissed": False,
        }
        notices.append(notice)
        store.save(FILE, notices)
    audit.log_heartbeat_notice(check_name, level, message)
    return notice


def has_active(check_name):
    with _lock:
        return any(n["check"] == check_name and not n["dismissed"] for n in _load())


def active():
    with _lock:
        return [n for n in _load() if not n["dismissed"]]


def dismiss(notice_id):
    with _lock:
        notices = _load()
        for n in notices:
            if n["id"] == notice_id:
                n["dismissed"] = True
                store.save(FILE, notices)
                return n
        raise ValueError(f"no notice with id {notice_id}")
