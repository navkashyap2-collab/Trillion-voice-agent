"""The thin seam between Jeet's ears and the speech-to-text provider.

One job: give it audio, get back text. Swapping providers later means
rewriting this one file.
"""

import os

from deepgram import DeepgramClient
from deepgram.core.api_error import ApiError

from .config import STT_MODEL


class STTError(Exception):
    """Transcription failed in a way that should be shown to the user, not crash the loop."""


def transcribe(wav_bytes: bytes) -> str:
    """Transcribe a complete WAV recording and return the text (possibly
    empty, if the model heard silence). Raises STTError on failure.
    """
    api_key = os.environ.get("DEEPGRAM_API_KEY")
    if not api_key:
        raise STTError("No DEEPGRAM_API_KEY set — add it to your .env file.")
    if not wav_bytes:
        raise STTError("No audio was captured — try holding the key a little longer.")

    try:
        client = DeepgramClient(api_key=api_key)
        response = client.listen.v1.media.transcribe_file(
            request=wav_bytes,
            model=STT_MODEL,
            smart_format=True,
            punctuate=True,
        )
    except ApiError as e:
        raise STTError(f"Deepgram returned an error ({e.status_code}). Try again.") from e
    except Exception as e:  # last-resort net: never let a model call crash the loop
        raise STTError(f"Transcription failed: {e}") from e

    try:
        transcript = response.results.channels[0].alternatives[0].transcript or ""
    except (AttributeError, IndexError) as e:
        raise STTError("Deepgram didn't return a transcript.") from e

    return transcript.strip()
