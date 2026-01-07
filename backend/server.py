from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router
from dotenv import load_dotenv
from routes.chat import router as chat_router
from routes.smart_chat import router as smart_chat_router
from routes.url_analyze import router as url_analyze_router

load_dotenv()

app = FastAPI()
app.include_router(chat_router, prefix="/api")
app.include_router(smart_chat_router, prefix="/api")
app.include_router(url_analyze_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "Backend running"}
