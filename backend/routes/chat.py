from fastapi import APIRouter
from pydantic import BaseModel
from core.ai import generate_chat_response
from core.ml import analyze_sentiment, detect_biased_phrases
from core.memory import get_history, add_turn
import uuid

router = APIRouter()

class ChatRequest(BaseModel):
    article_text: str
    user_question: str
    session_id: str | None = None


@router.post("/chat")
def chat_with_article(data: ChatRequest):
    # 1️⃣ Run analysis automatically
    sentiment = analyze_sentiment(data.article_text)
    biased_phrases = detect_biased_phrases(data.article_text)
    bias_score = min(len(biased_phrases) * 15, 100)

    # 2️⃣ Fetch conversation memory
    session_id = data.session_id or str(uuid.uuid4())
    history = get_history(session_id)

    # 3️⃣ Generate AI response
    answer = generate_chat_response(
        article_text=data.article_text,
        user_question=data.user_question,
        sentiment=sentiment,
        bias_score=bias_score,
        biased_phrases=biased_phrases,
        history=history
    )

    # 4️⃣ Save memory
    add_turn(data.session_id, data.user_question, answer)

    return {
        "answer": answer,
        "bias_score": bias_score
    }
