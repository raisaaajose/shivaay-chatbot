import operator
from typing import Annotated, Sequence, TypedDict

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
# Removed tool import as this version is purely conversational
# from langchain_core.tools import tool
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from typing import Dict, List
from fastapi import FastAPI, Request
from pydantic import BaseModel
import uvicorn
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from project root
project_root = Path(__file__).parent.parent
load_dotenv(project_root / ".env")


class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a friendly and helpful AI assistant for tourism in Uttarakhand. "
            "Engage in conversation, provide information, and answer questions to the best of your ability. "
            "Always be polite and informative."
        ),
        ("placeholder", "{messages}"), 
    ]
)

conversational_llm = prompt | llm

async def call_llm(state: AgentState):
    """
    Node to call the LLM with the current conversation history to generate a response.
    """
    messages = state["messages"]
    response = await conversational_llm.ainvoke({"messages": messages})
    return {"messages": [response]}


def should_continue(state: AgentState):
    """
    In a regular chatbot, after the LLM generates a response, the turn ends.
    """
    return "end_conversation"

workflow = StateGraph(AgentState)

workflow.add_node("llm_response", call_llm)
workflow.set_entry_point("llm_response")

workflow.add_conditional_edges(
    "llm_response",
    should_continue, 
    {
        "end_conversation": END,
    },
)

app_graph = workflow.compile()

app = FastAPI(
    title="Deep-Shiva Conversational Chatbot API",
    description="A simple API for the Deep-Shiva chatbot using LangChain and LangGraph.",
    version="1.0.0",
)

chat_sessions: Dict[str, List[BaseMessage]] = {}

class ChatRequest(BaseModel):
    session_id: str
    user_message: str

@app.post("/chat", response_model=str)
async def chat_endpoint(request: ChatRequest):
    """
    API endpoint for the chatbot.
    Takes a session_id and user_message, returns the chatbot's response.
    """
    session_id = request.session_id
    user_message_content = request.user_message

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
        print(f"New session created: {session_id}")
    
    current_history = chat_sessions[session_id]
    current_history.append(HumanMessage(content=user_message_content))

    final_response_content = "I'm sorry, I couldn't generate a response."
    
    try:
        
        final_state = await app_graph.ainvoke({"messages": current_history})
        if final_state and "messages" in final_state and final_state["messages"]:
            for msg in reversed(final_state["messages"]):
                if isinstance(msg, AIMessage):
                    final_response_content = msg.content
                    break
        
        current_history.append(AIMessage(content=final_response_content))

    except Exception as e:
        print(f"Error during chatbot invocation: {e}")
        final_response_content = "An error occurred while processing your request."
    
    return final_response_content

@app.get("/")
async def read_root():
    return {"message": "Deep-Shiva Chatbot API is running!"}

if __name__ == "__main__":
    if "GROQ_API_KEY" not in os.environ:
        print("WARNING: LLAMA_API_KEY environment variable not set. Chatbot may not function.")
    uvicorn.run(app, host="0.0.0.0", port=8000)
