from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.agent.graph import analyze_interaction

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

@app.post("/api/analyze")
def analyze(data: ChatRequest):

    result = analyze_interaction(data.message)

    return {
        "result": result
    }