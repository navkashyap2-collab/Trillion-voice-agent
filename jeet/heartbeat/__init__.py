"""Tier 5: the heartbeat — a background loop, separate from the
conversation loop, that runs proactive checks on their own schedule and
holds anything worth surfacing until you're back. Quiet by default: most
checks produce nothing, and what they do surface sits in a calm log
unless it's genuinely worth an interruption.

Configure checks in config/heartbeat.yaml — interval, quiet hours, and
per-check params all live there, not in code.
"""

from .config import in_quiet_hours
from .config import load as load_config
from .loop import Heartbeat
from . import notices

__all__ = ["Heartbeat", "startup_summary"]


def startup_summary():
    """Text to print right when a session starts, summarizing anything the
    heartbeat left in the inbox. Returns None if there's nothing to show.

    Urgent notices get shown in full outside quiet hours — that's the one
    case worth an actual interruption. Everything else (fyi notices, or
    urgent ones caught during quiet hours) gets a one-line mention only;
    you can always ask "what's up?" to see the rest.
    """
    items = notices.active()
    if not items:
        return None

    config = load_config()
    urgent = [n for n in items if n["level"] == "urgent"]

    if urgent and not in_quiet_hours(config):
        lines = ["🔔 While you were away:"]
        lines.extend(f"  #{n['id']} {n['message']}" for n in urgent)
        fyi_count = len(items) - len(urgent)
        if fyi_count:
            lines.append(f'  (+{fyi_count} more — ask "what\'s up?" to see everything)')
        return "\n".join(lines)

    plural = "thing" if len(items) == 1 else "things"
    return f'({len(items)} {plural} waiting in the log — ask "what\'s up?" any time)'
