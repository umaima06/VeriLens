from collections import defaultdict

# session_id -> chat history
chat_memory = defaultdict(list)

def get_history(session_id: str):
    return chat_memory[session_id]

def add_turn(session_id: str, user_msg: str, ai_msg: str):
    chat_memory[session_id].append({
        "user": user_msg,
        "assistant": ai_msg
    })
