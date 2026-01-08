from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.scraper import extract_article_text
from core.ml import analyze_sentiment, detect_biased_phrases
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

    sentiment = analyze_sentiment(article_text)
    biased_phrases = detect_biased_phrases(article_text)
    bias_score = min(len(biased_phrases) * 15, 100)

    ai_output = generate_bias_explanation(
        text=article_text,
        sentiment=sentiment,
        bias_score=bias_score,
        biased_phrases=biased_phrases
    )
    
    credibility_score = max(100 - bias_score, 0)

    return {
    "article_text": article_text,
    "sentiment": sentiment,
    "bias_score": bias_score,
    "credibility_score": credibility_score,
    "biased_phrases": biased_phrases,
    "ai_reasoning": ai_output["reasoning"],
    "neutral_rewrite": ai_output["neutral_rewrite"],
    "counter_perspective": ai_output["counter_perspective"]
}
