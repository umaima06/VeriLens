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
