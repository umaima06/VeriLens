from fastapi import APIRouter
from pydantic import BaseModel
from core.ml import get_sentiment, get_bias_score
from core.ai import generate_bias_explanation  # Layer 2

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze")
def analyze_text(data: AnalyzeRequest):
    # Layer 1: ML analysis
    sentiment = get_sentiment(data.text)
    bias_score = get_bias_score(data.text)
    credibility_score = max(100 - bias_score, 0)

    # Layer 2: AI explanation
    ai_output = generate_bias_explanation(
        text=data.text,
        sentiment=sentiment,
        bias_score=bias_score,
        biased_phrases=[]
    )

    return {
        "article_text": data.text,
        "sentiment": sentiment,
        "bias_score": bias_score,
        "credibility_score": credibility_score,
        "ai_reasoning": ai_output["reasoning"],
        "neutral_rewrite": ai_output["neutral_rewrite"],
        "counter_perspective": ai_output["counter_perspective"]
    }
