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

    pos_votes = 0
    neg_votes = 0
    confidences = []

    for chunk in chunks:
        result = _sentiment_analyzer(chunk)[0]
        label = result["label"]
        score = result["score"]

        confidences.append(score)

        if label == "POSITIVE":
            pos_votes += 1
        else:
            neg_votes += 1

    total = pos_votes + neg_votes
    
    # Majority vote
    if pos_votes > neg_votes:
        label = "POSITIVE"
    elif neg_votes > pos_votes:
        label = "NEGATIVE"
    else:
        label = "NEUTRAL"
        
    # 🔥 Dominance check (THIS IS THE KEY)
    dominance = abs(pos_votes - neg_votes) / total
    
    if dominance < 0.15:
        label = "NEUTRAL"

    return {
        "label": label,
        "confidence": round(sum(confidences) / len(confidences), 4)
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