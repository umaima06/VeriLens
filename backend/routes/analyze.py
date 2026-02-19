from fastapi import APIRouter
from pydantic import BaseModel
from core.ml import predict_feature1, predict_feature2
from core.ai import generate_bias_explanation

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze")
def analyze_text(data: AnalyzeRequest):

    # Layer 1 — ML
    f1 = predict_feature1(data.text)
    f2 = predict_feature2(data.text)

    # Layer 2 — AI (human explanation)
    ai_output = generate_bias_explanation(
        text=data.text,
        sentiment={},
        bias_score=f2["completeness_score"],
        biased_phrases=[]
    )

    return {
        "article_text": data.text,

        "signals": {
            "topic": f1["topic"],
            "topic_confidence": f1["topic_confidence"],
            "narrative_frame": f1["narrative_frame"],
            "ideology": f2["ideology"],
            "ideology_confidence": f2["ideology_confidence"]
        },

        "coverage_analysis": {
            "stakeholders": f2["stakeholders"],
            "completeness_score": f2["completeness_score"],
            "coverage_gaps": f2["coverage_gaps"]
        },

        "ai_layer": ai_output
    }
