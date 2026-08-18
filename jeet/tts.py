"""The thin seam between Jeet's mouth and the text-to-speech provider.

One job: give it streamed text, hear it spoken aloud as it's generated.
Swapping providers later means rewriting this one file.
"""

import os
import re

from elevenlabs import ElevenLabs
from elevenlabs.core.api_error import ApiError

from .config import TTS_MODEL
from .llm import LLMError

# Raw PCM at 24kHz — no decoding needed, feeds straight into the speaker.
OUTPUT_FORMAT = "pcm_24000"

_SENTENCE_END = re.compile(r"(?<=[.!?])\s+")


class TTSError(Exception):
    """Speech synthesis failed in a way that should be shown to the user, not crash the loop."""


def _sentences(text_chunks):
    """Buffer streamed text chunks and yield complete sentences as soon as
    they're ready, so playback can start before the whole reply exists.
    """
    buffer = ""
    for chunk in text_chunks:
        buffer += chunk
        *complete, buffer = _SENTENCE_END.split(buffer)
        for sentence in complete:
            sentence = sentence.strip()
            if sentence:
                yield sentence
    buffer = buffer.strip()
    if buffer:
        yield buffer


def speak_stream(text_chunks, player):
    """Speak `text_chunks` (an iterable of streamed text, e.g. from
    jeet.llm.run_turn) aloud sentence by sentence, using `player` for
    playback. Raises TTSError on synthesis failure; lets an LLMError from
    `text_chunks` pass through unchanged so the caller can handle it the
    same way it would in text mode.
    """
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    voice_id = os.environ.get("ELEVENLABS_VOICE_ID")
    if not api_key or not voice_id:
        raise TTSError(
            "No ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID set — add them to your .env file."
        )

    client = ElevenLabs(api_key=api_key)

    try:
        for sentence in _sentences(text_chunks):
            audio_chunks = client.text_to_speech.stream(
                voice_id=voice_id,
                text=sentence,
                model_id=TTS_MODEL,
                output_format=OUTPUT_FORMAT,
            )
            player.play(audio_chunks)
            if player.interrupted:
                return
    except LLMError:
        raise  # not ours to wrap — the brain failed, not the voice
    except ApiError as e:
        raise TTSError(f"ElevenLabs returned an error ({e.status_code}). Try again.") from e
    except Exception as e:  # last-resort net: never let a model call crash the loop
        raise TTSError(f"Speech synthesis failed: {e}") from e
