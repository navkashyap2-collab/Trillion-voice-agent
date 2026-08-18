"""General settings Jeet reads at startup — config/settings.yaml. Edit
that file to tune behavior; this module never needs to change for a
threshold or list edit.
"""

import os
from pathlib import Path

import yaml

_DEFAULT_PATH = Path(__file__).resolve().parent.parent / "config" / "settings.yaml"

_DEFAULTS = {
    "extra_confirmation_required": [],
}


def _settings_path():
    override = os.environ.get("JEET_SETTINGS_CONFIG")
    return Path(override) if override else _DEFAULT_PATH


def load():
    path = _settings_path()
    if not path.exists():
        return dict(_DEFAULTS)
    with open(path) as f:
        data = yaml.safe_load(f) or {}
    return {**_DEFAULTS, **data}
