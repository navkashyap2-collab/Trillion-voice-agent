"""The heartbeat: a background loop, separate from the conversation loop,
that wakes on an interval and runs whatever checks are due. Runs as a
daemon thread inside the same process as the conversation loop (main.py /
voice.py) so it shares the same data directory and never needs its own
process or IPC.
"""

import threading

from . import checks as checks_module
from . import config as config_module
from . import state


class Heartbeat:
    def __init__(self):
        self._stop = threading.Event()
        # One thread per check name, so a slow check can't overlap with
        # its own next run — but different checks still run independently.
        self._threads = {}

    def start(self):
        thread = threading.Thread(target=self._run, daemon=True)
        thread.start()
        return thread

    def stop(self):
        self._stop.set()

    def _run(self):
        while not self._stop.is_set():
            config = config_module.load()  # re-read every tick — edits apply live

            for check_cfg in config.get("checks", []):
                if not check_cfg.get("enabled", True):
                    continue

                name = check_cfg["name"]
                interval = check_cfg.get("interval_minutes", 60)

                if not state.is_due(name, interval):
                    continue

                running = self._threads.get(name)
                if running is not None and running.is_alive():
                    continue  # still working from last time — skip this tick, don't pile up

                # Mark the next run before starting this one: even if the
                # check hangs or crashes, the schedule has already moved
                # forward, so a stuck check can't spin the scheduler.
                state.mark_run(name, interval)

                check_thread = threading.Thread(
                    target=self._run_check_safely,
                    args=(name, check_cfg.get("params", {})),
                    daemon=True,
                )
                self._threads[name] = check_thread
                check_thread.start()

            self._stop.wait(config.get("poll_interval_seconds", 30))

    def _run_check_safely(self, name, params):
        try:
            checks_module.run_check(name, params)
        except Exception as e:
            # A broken check should never take down the heartbeat or the
            # app it's running inside — note it and move on.
            print(f"\n[heartbeat: check '{name}' failed: {e}]")
