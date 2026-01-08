from fastapi import APIRouter
from pydantic import BaseModel
from core.ml import analyze_sentiment, detect_biased_phrases
from core.ai import generate_bias_explanation

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze")
def analyze_text(data: AnalyzeRequest):
    sentiment = analyze_sentiment(data.text)
    biased_phrases = detect_biased_phrases(data.text)

    bias_score = min(len(biased_phrases) * 15, 100)
    credibility_score = max(100 - bias_score, 0)

    ai_output = generate_bias_explanation(
        text=data.text,
        sentiment=sentiment,
        bias_score=bias_score,
        biased_phrases=biased_phrases
    )

    return {
    "article_text": data.text,
    "sentiment": sentiment,
    "bias_score": bias_score,
    "credibility_score": credibility_score,
    "biased_phrases": biased_phrases,
    "ai_reasoning": ai_output["reasoning"],
    "neutral_rewrite": ai_output["neutral_rewrite"],
    "counter_perspective": ai_output["counter_perspective"]
}

