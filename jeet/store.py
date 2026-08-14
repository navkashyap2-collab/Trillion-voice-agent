"""Tiny JSON-file storage shared by the tools.

Not a database — just a place for small, human-readable state (tasks,
remembered facts, drafts) that survives between tool calls. Each file is a
flat JSON list of dicts, easy to open and read by hand.
"""

import json
import os
from pathlib import Path

def _path(name):
    # Read JEET_DATA_DIR fresh on every call, not once at import time — this
    # module gets imported (via jeet.config -> jeet.memory) before main.py's
    # load_dotenv() runs, so a module-level constant would never see a
    # data-dir override set in .env rather than a real shell env var.
    data_dir = Path(os.environ.get("JEET_DATA_DIR", "data"))
    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir / name


def load(name, default):
    path = _path(name)
    if not path.exists():
        return default
    with open(path) as f:
        return json.load(f)


def save(name, data):
    with open(_path(name), "w") as f:
        json.dump(data, f, indent=2)


def next_id(items):
    return max((item["id"] for item in items), default=0) + 1
