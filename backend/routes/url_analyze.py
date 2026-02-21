from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from core.scraper import extract_article_text
from core.ai import generate_bias_explanation
from routes.analyze import predict_feature1, predict_feature2

router = APIRouter()

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

    signals = predict_feature1(article_text)
    coverage = predict_feature2(article_text)
    
    ai_output = generate_bias_explanation(
        text=article_text,
        sentiment={},
        bias_score=coverage["completeness_score"],  
        biased_phrases=[]
   )

    return {
       "article_text": article_text,
       "signals": {
           "topic": signals["topic"],
           "topic_confidence": signals["topic_confidence"],
           "narrative_frame": signals["narrative_frame"],
           "ideology": coverage["ideology"],
           "ideology_confidence": coverage["ideology_confidence"]
        },
       "coverage_analysis": coverage,
       "ai_layer": ai_output
    }