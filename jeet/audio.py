"""Microphone capture and speaker playback for push-to-talk voice.

Needs a real microphone/speaker and, for push-to-talk, OS-level key-hold
detection — none of which exist in a headless sandbox. This module is only
imported by jeet/voice.py, never by the text loop, so a missing audio
dependency never breaks `python -m jeet.main`.
"""

import io
import threading
import time
import wave

try:
    import numpy as np
    import sounddevice as sd
    from pynput import keyboard
except (ImportError, OSError) as e:
    raise ImportError(
        "Voice mode needs a working microphone/speaker and keyboard hooks, which this "
        f"environment doesn't have ({e}).\n\n"
        "Things to check on a real machine:\n"
        "  - PortAudio installed? (macOS: bundled with the sounddevice wheel; "
        "Linux: `sudo apt install libportaudio2`)\n"
        "  - On Linux, push-to-talk needs an X server — a Wayland-only session may need XWayland.\n"
        "  - On macOS, grant your terminal/IDE Accessibility permission "
        "(System Settings > Privacy & Security > Accessibility) so it can detect the held key.\n\n"
        "The typed interface (`python -m jeet.main`) still works without any of this."
    ) from e

RECORD_SAMPLE_RATE = 16000


def pcm_to_wav(pcm_bytes, samplerate=RECORD_SAMPLE_RATE, channels=1, sampwidth=2):
    """Wrap raw int16 PCM samples in a minimal WAV container so Deepgram can
    auto-detect the format without separate encoding/sample-rate params.
    """
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sampwidth)
        wf.setframerate(samplerate)
        wf.writeframes(pcm_bytes)
    return buf.getvalue()


class PushToTalk:
    """Hold `key` to record, release to stop.

    Also fires `on_press` the instant the key goes down — before recording
    starts — so the caller can interrupt any in-progress playback first.
    That ordering is what keeps Jeet from ever recording itself talking.
    """

    def __init__(self, key=None, on_press=None):
        self.key = key if key is not None else keyboard.Key.space
        self._on_press_cb = on_press
        self._pressed = threading.Event()
        self._listener = keyboard.Listener(
            on_press=self._handle_press, on_release=self._handle_release
        )

    def start(self):
        self._listener.start()
        self._listener.wait()  # block until the listener is actually ready

    def stop(self):
        self._listener.stop()

    def _handle_press(self, key):
        if key == self.key and not self._pressed.is_set():
            self._pressed.set()
            if self._on_press_cb:
                self._on_press_cb()

    def _handle_release(self, key):
        if key == self.key:
            self._pressed.clear()

    def wait_for_press(self, poll_interval=0.02):
        while not self._pressed.is_set():
            time.sleep(poll_interval)

    def record_while_held(self, samplerate=RECORD_SAMPLE_RATE, poll_interval=0.01):
        """Call right after wait_for_press(). Records until the key is
        released; returns raw int16 mono PCM bytes (empty if nothing was
        captured, e.g. a tap too short to register a frame).
        """
        frames = []

        def callback(indata, frame_count, time_info, status):
            frames.append(indata.copy())

        with sd.InputStream(samplerate=samplerate, channels=1, dtype="int16", callback=callback):
            while self._pressed.is_set():
                time.sleep(poll_interval)

        if not frames:
            return b""
        return np.concatenate(frames, axis=0).tobytes()


class Player:
    """Plays streamed raw PCM audio (as produced by ElevenLabs' pcm_24000
    output) and can be interrupted mid-sentence from another thread.
    """

    def __init__(self, samplerate=24000):
        self.samplerate = samplerate
        self._interrupted = threading.Event()

    @property
    def interrupted(self):
        return self._interrupted.is_set()

    def interrupt(self):
        self._interrupted.set()

    def play(self, pcm_chunks):
        """Play an iterable of raw int16 PCM byte chunks, stopping
        immediately if interrupt() is called from another thread.
        """
        self._interrupted.clear()
        leftover = b""
        with sd.RawOutputStream(samplerate=self.samplerate, channels=1, dtype="int16") as stream:
            for chunk in pcm_chunks:
                if self._interrupted.is_set():
                    return
                data = leftover + chunk
                # int16 = 2 bytes/sample; hold back any odd trailing byte
                # rather than write a partial sample.
                usable_len = len(data) - (len(data) % 2)
                leftover = data[usable_len:]
                if usable_len:
                    stream.write(data[:usable_len])
