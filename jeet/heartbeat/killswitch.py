"""The kill switch — one obvious way to pause all proactive behavior at
once without tearing the heartbeat down or losing its schedule. Flip it
back on and checks resume exactly where the persisted schedule
(jeet/heartbeat/state.py) says they should — pausing never resets a timer.
"""

from .. import store

FILE = "heartbeat_paused.json"


def is_paused():
    return bool(store.load(FILE, {}).get("paused", False))


def pause():
    store.save(FILE, {"paused": True})


def resume():
    store.save(FILE, {"paused": False})
