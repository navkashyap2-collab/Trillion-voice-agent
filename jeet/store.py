"""Tiny JSON-file storage shared by the tools.

Not a database — just a place for small, human-readable state (tasks,
remembered facts, drafts) that survives between tool calls. Each file is a
flat JSON list of dicts, easy to open and read by hand.
"""

import json
import os
from pathlib import Path

def data_dir():
    """The resolved data directory, honoring JEET_DATA_DIR — read fresh on
    every call, not cached at import time, since this module gets imported
    (via jeet.config -> jeet.memory) before main.py's load_dotenv() runs.
    Prefer load()/save() for JSON state; this is for callers like the
    audit log that need to open a file directly.
    """
    d = Path(os.environ.get("JEET_DATA_DIR", "data"))
    d.mkdir(parents=True, exist_ok=True)
    return d


def _path(name):
    return data_dir() / name


def load(name, default):
    path = _path(name)
    if not path.exists():
        return default
    with open(path) as f:
        return json.load(f)


def save(name, data):
    with open(_path(name), "w") as f:
        json.dump(data, f, indent=2)


def delete(name):
    path = _path(name)
    if path.exists():
        path.unlink()


def next_id(items):
    return max((item["id"] for item in items), default=0) + 1
