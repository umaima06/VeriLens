from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import re

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text: str) -> dict:
    scores = analyzer.polarity_scores(text)
    return {
        "positive": scores["pos"],
        "negative": scores["neg"],
        "neutral": scores["neu"],
        "compound": scores["compound"]
    }

def calculate_bias_score(sentiment: dict, biased_phrases: list) -> int:
    score = 0

    # Phrase-based bias
    for p in biased_phrases:
        if p["type"] == "emotional":
            score += 20
        elif p["type"] == "assertion":
            score += 15
        elif p["type"] == "uncertainty":
            score += 10

    # Sentiment amplification (emotional tone increases bias likelihood)
    compound = sentiment.get("compound", 0)
    if abs(compound) > 0.5:
        score += 15
    elif abs(compound) > 0.2:
        score += 8

    return min(score, 100)

def detect_biased_phrases(text: str) -> list:
    patterns = [
        (r"\b(shocking|outrageous|disgusting|terrible|devastating)\b", "emotional"),
        (r"\b(allegedly|reportedly|supposedly)\b", "uncertainty"),
        (r"\b(obviously|clearly|undeniably)\b", "assertion"),
    ]

    results = []

    for pattern, bias_type in patterns:
        for match in re.finditer(pattern, text, re.IGNORECASE):
            results.append({
                "phrase": match.group(),
                "type": bias_type,
                "start": match.start(),
                "end": match.end()
            })

    return results
