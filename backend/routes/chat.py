from fastapi import APIRouter
from pydantic import BaseModel
from core.ai import generate_chat_response
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
    sentiment = {}
    biased_phrases = []
    bias_score = 0


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
    add_turn(session_id, data.user_question, answer)

    return {
        "answer": answer,
        "bias_score": bias_score
    }
