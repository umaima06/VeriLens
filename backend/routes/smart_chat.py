from fastapi import APIRouter
from pydantic import BaseModel
import uuid

from core.ml import analyze_sentiment, detect_biased_phrases
from core.ai import generate_chat_response
from core.memory import get_history, add_turn

router = APIRouter()

class SmartChatRequest(BaseModel):
    article_text: str
    user_question: str
    session_id: str | None = None


@router.post("/smart-chat")
def smart_chat(data: SmartChatRequest):
    # 1️⃣ Session handling
    session_id = data.session_id or str(uuid.uuid4())

    # 2️⃣ Auto analyze article
    sentiment = analyze_sentiment(data.article_text)
    biased_phrases = detect_biased_phrases(data.article_text)
    bias_score = min(len(biased_phrases) * 15, 100)

    # 3️⃣ Load memory
    history = get_history(session_id)

    # 4️⃣ AI response
    answer = generate_chat_response(
        article_text=data.article_text,
        user_question=data.user_question,
        sentiment=sentiment,
        bias_score=bias_score,
        biased_phrases=biased_phrases,
        history=history
    )

    # 5️⃣ Save memory
    add_turn(session_id, data.user_question, answer)

    return {
        "session_id": session_id,
        "answer": answer,
        "bias_score": bias_score,
        "sentiment": sentiment,
        "biased_phrases": biased_phrases
    }
