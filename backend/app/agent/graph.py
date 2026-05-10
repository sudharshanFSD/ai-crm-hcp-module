from typing import TypedDict

from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq

import os
import json

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    groq_api_key=os.getenv("GROQ_API_KEY")
)

# STATE

class AgentState(TypedDict):
    user_input: str
    result: str


# TOOL 1 — LOG / EDIT INTERACTION

def log_interaction(state: AgentState):

    prompt = f"""
    You are an AI CRM assistant.

    Analyze the user's message and return ONLY the fields
    that should be updated in the CRM form.

IMPORTANT:
- If user corrects only one field,
  return ONLY that field.
- Do NOT return unchanged fields.
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- sentiment must ALWAYS be exactly:
  Positive
  Neutral
  Negative

    Available fields:
    - hcp_name
    - hospital
    - interaction_type
    - interaction_date
    - interaction_time
    - attendees
    - interaction_summary
    - sentiment
    - outcomes
    - follow_up_action

    User Message:
    {state['user_input']}
    """

    response = llm.invoke(prompt)

    cleaned_response = response.content.strip()

    cleaned_response = cleaned_response.replace("```json", "")
    cleaned_response = cleaned_response.replace("```", "")

    return {
        "result": cleaned_response
    }


# TOOL 2 — SUMMARIZE INTERACTION

def summarize_interaction(state: AgentState):

    prompt = f"""
    Summarize this HCP interaction in 2 concise lines.

    Interaction:
    {state['user_input']}
    """

    response = llm.invoke(prompt)

    return {
        "result": response.content
    }


# TOOL 3 — FOLLOW-UP RECOMMENDATION

def follow_up_recommendation(state: AgentState):

    prompt = f"""
    Suggest the next best follow-up action for this HCP interaction.

    Interaction:
    {state['user_input']}
    """

    response = llm.invoke(prompt)

    return {
        "result": response.content
    }


# TOOL 4 — SENTIMENT ANALYSIS

def sentiment_analysis(state: AgentState):

    prompt = f"""
    Identify sentiment of this HCP interaction.

    Return ONLY one word:
    Positive / Neutral / Negative

    Interaction:
    {state['user_input']}
    """

    response = llm.invoke(prompt)

    return {
        "result": response.content
    }


# TOOL 5 — EDIT INTERACTION

def edit_interaction(state: AgentState):

    prompt = f"""
    Improve and professionally rewrite this HCP interaction note.

    Interaction:
    {state['user_input']}
    """

    response = llm.invoke(prompt)

    return {
        "result": response.content
    }


# BUILD GRAPH

workflow = StateGraph(AgentState)

workflow.add_node("log_interaction", log_interaction)

workflow.set_entry_point("log_interaction")

workflow.add_edge("log_interaction", END)

graph = workflow.compile()


# MAIN FUNCTION

def analyze_interaction(user_input: str):

    result = graph.invoke({
        "user_input": user_input
    })

    return json.loads(result["result"])