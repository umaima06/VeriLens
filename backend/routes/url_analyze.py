from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.scraper import extract_article_text
from core.ml import get_bias_score
from core.ai import generate_bias_explanation

router = APIRouter(prefix="/api")

class URLAnalyzeRequest(BaseModel):
    url: str

@router.post("/analyze-url")
def analyze_url(data: URLAnalyzeRequest):
    try:
        article_text = extract_article_text(data.url)
    except RuntimeError:
        raise HTTPException(
            status_code=422,
            detail="Unable to fetch article. This website may block automated access."
        )

    # ✅ Replace sentiment & biased_phrases with empty placeholders
    sentiment = {}
    biased_phrases = []

    # Compute bias score using embeddings only
    ai_output = generate_bias_explanation(
        text=article_text,
        sentiment=sentiment,
        bias_score=0,  # temporary, will recalc below
        biased_phrases=biased_phrases
    )
    
    # Use embedding-based bias computation
    neutral = ai_output["neutral_rewrite"]
    bias_score = get_bias_score(article_text)
    credibility_score = max(100 - bias_score, 0)

    return {
        "article_text": article_text,
        "bias_score": bias_score,
        "credibility_score": credibility_score,
        "biased_phrases": biased_phrases,
        "ai_reasoning": ai_output["reasoning"],
        "neutral_rewrite": neutral,
        "counter_perspective": ai_output["counter_perspective"]
    }
