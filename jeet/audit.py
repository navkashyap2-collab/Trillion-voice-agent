"""A plain, append-only, human-readable log of what Jeet did and why —
every tool call, every confirmation asked (and how it was answered), and
everything the heartbeat ran or surfaced. When something surprises you,
data/audit.log is where to look. One line per event, oldest first, plain
text — open it in any editor.

Also keeps a running tally of model token usage for this process, so a
runaway loop is visible immediately instead of discovered on a bill later.
"""

import threading
from datetime import datetime

from . import store

FILE = "audit.log"
_lock = threading.Lock()

_session_totals = {"input_tokens": 0, "output_tokens": 0}


def _write(line):
    with _lock:
        path = store.data_dir() / FILE
        with open(path, "a") as f:
            f.write(f"{datetime.now().isoformat(timespec='seconds')} {line}\n")


def log_tool_call(name, tool_input, result, is_error):
    status = "ERROR" if is_error else "ok"
    _write(f"TOOL      {name}({tool_input}) -> {status}: {result[:200]!r}")


def log_confirmation(name, tool_input, approved):
    outcome = "approved" if approved else "declined"
    _write(f"CONFIRM   {name}({tool_input}) -> {outcome}")


def log_heartbeat_run(check_name):
    _write(f"HEARTBEAT ran check '{check_name}'")


def log_heartbeat_error(check_name, error):
    _write(f"HEARTBEAT check '{check_name}' failed: {error}")


def log_heartbeat_notice(check_name, level, message):
    _write(f"NOTICE    [{check_name}/{level}] {message[:200]!r}")


def log_model_usage(input_tokens, output_tokens):
    _session_totals["input_tokens"] += input_tokens
    _session_totals["output_tokens"] += output_tokens
    _write(
        f"USAGE     +{input_tokens} in / +{output_tokens} out tokens "
        f"(session total: {_session_totals['input_tokens']} in / "
        f"{_session_totals['output_tokens']} out)"
    )


def session_totals():
    return dict(_session_totals)
