# AI-First CRM HCP Module

This project is an AI-powered CRM interaction logging system designed for Healthcare Professionals (HCPs). 

The goal was to create a smart interaction logging experience for pharmaceutical field representatives using conversational AI.

Instead of filling large CRM forms manually, users can describe interactions naturally through a chat assistant, and the AI automatically extracts and updates the required CRM fields.

The system also supports conversational corrections. For example, if a user says:

“Sorry , the doctor name was John”
only that specific field gets updated without affecting the rest of the interaction data.

## This Project / Application

The application contains two main sections:

### 1. Structured CRM Form
Users can manually view and manage:
HCP Name
Hospital
Interaction Type
Date & Time
Attendees
Discussion Summary
Sentiment
Outcomes
Follow-up Actions

### 2. Conversational AI Assistant
The AI assistant allows users to:
Log interactions naturally
Edit existing interaction fields
Generate summaries
Detect sentiment
Suggest follow-up actions

The assistant updates the CRM form automatically based on the conversation.

## Tech Stack I Used here :

### Frontend
React
Ant Design
Axios

### Backend
FastAPI
LangGraph
LangChain
Groq API

### LLM Used
llama-3.3-70b-versatile

## LangGraph Tools Implemented

### Log Interaction
Extracts CRM interaction details from conversational input.

### Edit Interaction
Allows conversational correction of existing CRM fields.

### Summarize Interaction
Creates concise summaries of interactions.

### Sentiment Analysis
Detects whether the interaction sentiment is:

Positive
Neutral
Negative

### Follow-Up Recommendation
Suggests the next best action for the field representative.

## Project Flow

1.User enters interaction details through chat.
2.LangGraph processes the request.
3.Groq LLM extracts structured CRM data.
4.The frontend form updates automatically.
5.Future conversational corrections update only the required fields.

## Conversation Examples

User:
Met Dr. Smith at Apollo Hospital yesterday at 4 PM regarding diabetes treatment adoption.

AI:
Updated HCP Name, Hospital, Date, Time, and Discussion Summary.

User:
Sorry, the doctor name was John.

AI:
Updated HCP Name to John.

## Running Commandds

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn python-dotenv
pip install langgraph langchain langchain-groq

uvicorn app.main:app --reload

Backend runs on:
http://127.0.0.1:8000

Frontend runs on:
http://localhost:5173
