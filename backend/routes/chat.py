from fastapi import APIRouter
from pydantic import BaseModel
from core.ai import generate_chat_response
from core.memory import get_history, add_turn
from core.ml import predict_feature1, predict_feature2
import uuid

router = APIRouter()

class ChatRequest(BaseModel):
    article_text: str
    user_question: str
    session_id: str | None = None


@router.post("/chat")
def chat_with_article(data: ChatRequest):
    # 1️⃣ Run analysis automatically
    biased_phrases = []
    f1 = predict_feature1(data.article_text)
    f2 = predict_feature2(data.article_text)

    # 2️⃣ Fetch conversation memory
    session_id = data.session_id or str(uuid.uuid4())
    history = get_history(session_id)

    # 3️⃣ Generate AI response
    answer = generate_chat_response(
        article_text=data.article_text,
        user_question=data.user_question,
        sentiment={},
        bias_score=f2["completeness_score"],
        biased_phrases=biased_phrases,
        history=history
    )

    # 4️⃣ Save memory
    add_turn(session_id, data.user_question, answer)

    return {
        "answer": answer,
        "bias_score": f2["completeness_score"]
    }
