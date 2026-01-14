from transformers import pipeline
import torch

# ==============================
# CONFIG
# ==============================
DEVICE = -1  # FORCE CPU
CHUNK_SIZE = 512

# ==============================
# LOAD MODELS ONCE (IMPORTANT)
# ==============================
_sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english",
    device=DEVICE
)

_bias_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=DEVICE
)

# ==============================
# HELPERS
# ==============================
def chunk_text(text: str, chunk_size: int = CHUNK_SIZE):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

# ==============================
# SENTIMENT (EXPORT THIS)
# ==============================
def analyze_sentiment(text: str) -> dict:
    chunks = chunk_text(text)

    pos, neg = 0.0, 0.0

    for chunk in chunks:
        result = _sentiment_analyzer(chunk)[0]
        label = result["label"].upper()
        score = result["score"]

        if label == "POSITIVE":
            pos += score
        else:
            neg += score

    if pos > neg:
        return {
            "label": "POSITIVE",
            "confidence": round(pos / len(chunks), 4)
        }
    elif neg > pos:
        return {
            "label": "NEGATIVE",
            "confidence": round(neg / len(chunks), 4)
        }
    else:
        return {
            "label": "NEUTRAL",
            "confidence": 0.5
        }

# ==============================
# BIAS SCORE (EXPORT THIS)
# ==============================
def analyze_bias(text: str) -> int:
    chunks = chunk_text(text)
    total_bias = 0.0

    for chunk in chunks:
        result = _bias_classifier(chunk, ["biased", "neutral"])
        for label, score in zip(result["labels"], result["scores"]):
            if label.lower() == "biased":
                total_bias += score
                break

    return int((total_bias / len(chunks)) * 100)

def get_sentiment(text: str) -> dict:
    return analyze_sentiment(text)

def get_bias_score(text: str) -> int:
    return analyze_bias(text)