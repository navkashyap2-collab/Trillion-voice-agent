"""Loads config/heartbeat.yaml — what to check, how often, and quiet
hours. Edit that file to tune the heartbeat; this module never needs to
change for a threshold or interval tweak.
"""

import os
from datetime import time
from pathlib import Path

import yaml

_DEFAULT_CONFIG_PATH = Path(__file__).resolve().parent.parent.parent / "config" / "heartbeat.yaml"

_DEFAULTS = {
    "poll_interval_seconds": 30,
    "quiet_hours": {"start": "22:00", "end": "07:00"},
    "checks": [],
}


def _config_path():
    override = os.environ.get("JEET_HEARTBEAT_CONFIG")
    return Path(override) if override else _DEFAULT_CONFIG_PATH


def load():
    path = _config_path()
    if not path.exists():
        return dict(_DEFAULTS)
    with open(path) as f:
        data = yaml.safe_load(f) or {}
    return {**_DEFAULTS, **data}


def _parse_time(text):
    hour, minute = text.split(":")
    return time(int(hour), int(minute))


def in_quiet_hours(config, now=None):
    from datetime import datetime

    now = now or datetime.now()
    quiet_hours = config.get("quiet_hours") or {}
    start = _parse_time(quiet_hours.get("start", "22:00"))
    end = _parse_time(quiet_hours.get("end", "07:00"))
    current = now.time()

    if start <= end:
        return start <= current < end
    return current >= start or current < end  # window wraps past midnight
