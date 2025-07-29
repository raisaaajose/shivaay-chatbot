import operator
from typing import Annotated, Sequence, TypedDict, Dict, List
from fastapi import FastAPI, Request
from pydantic import BaseModel
import uvicorn
import os
import json
from dotenv import load_dotenv
from pathlib import Path
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from pinecone_utils import search_top_k 


project_root = Path(__file__).parent.parent
load_dotenv(project_root / ".env")

# JSON file path for storing sessions
SESSIONS_FILE = project_root / "sessions.json"

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
            "Your knowledge is strictly limited to tourism in Uttarakhand, India."
            "If a user asks about topics outside of Uttarakhand tourism (e.g., politics, health, personal advice, other regions/countries), "
            "politely state that you can only assist with Uttarakhand tourism-related inquiries."
            "\n\nHere is relevant tourism information to help you answer the user's query:\n{context_info}" # context_info placeholder
        ),
        ("placeholder", "{messages}"), 
    ]
)

conversational_llm = prompt | llm

async def call_llm(state: AgentState):
    """
    Node to call the LLM with the current conversation history and context to generate a response.
    """
    messages = state["messages"]
    context_info = state.get("context_info", "") 
    llm_input = {"messages": messages, "context_info": context_info}
    
    response = await conversational_llm.ainvoke(llm_input)
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

def load_sessions() -> Dict[str, List[Dict]]:
    """
    Load sessions from JSON file.
    Returns a dictionary with session_id as key and list of message dicts as value.
    """
    try:
        if SESSIONS_FILE.exists():
            with open(SESSIONS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    except Exception as e:
        print(f"Error loading sessions: {e}")
        return {}

def save_sessions(sessions: Dict[str, List[Dict]]):
    """
    Save sessions to JSON file.
    """
    try:
        # Ensure the directory exists
        SESSIONS_FILE.parent.mkdir(parents=True, exist_ok=True)
        
        with open(SESSIONS_FILE, 'w', encoding='utf-8') as f:
            json.dump(sessions, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving sessions: {e}")

def message_to_dict(message: BaseMessage) -> Dict:
    """
    Convert a BaseMessage to a dictionary for JSON serialization.
    """
    return {
        "type": message.__class__.__name__,
        "content": message.content
    }

def dict_to_message(message_dict: Dict) -> BaseMessage:
    """
    Convert a dictionary back to a BaseMessage.
    """
    message_type = message_dict.get("type")
    content = message_dict.get("content", "")
    
    if message_type == "HumanMessage":
        return HumanMessage(content=content)
    elif message_type == "AIMessage":
        return AIMessage(content=content)
    else:
        # Fallback to HumanMessage if type is unknown
        return HumanMessage(content=content)

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

    # Load sessions from JSON file
    sessions_data = load_sessions()
    
    if session_id not in sessions_data:
        sessions_data[session_id] = []
        print(f"New session created: {session_id}")
    
    # Convert stored message dicts back to BaseMessage objects
    current_history = [dict_to_message(msg_dict) for msg_dict in sessions_data[session_id]]
    current_history.append(HumanMessage(content=user_message_content))

    
    context_docs = search_top_k(user_message_content)
    context_str = "\n".join([
        f"{doc['metadata'].get('name', 'N/A')}: {doc['metadata'].get('description', 'N/A')}"
        for doc in context_docs
    ])
  

    final_response_content = "I'm sorry, I couldn't generate a response."
    
    try:
        
        final_state = await app_graph.ainvoke({"messages": current_history, "context_info": context_str})
        
        if final_state and "messages" in final_state and final_state["messages"]:
            for msg in reversed(final_state["messages"]): 
                if isinstance(msg, AIMessage):
                    final_response_content = msg.content
                    break
        
        current_history.append(AIMessage(content=final_response_content))

        # Convert messages back to dicts and save to JSON
        sessions_data[session_id] = [message_to_dict(msg) for msg in current_history]
        save_sessions(sessions_data)

    except Exception as e:
        print(f"Error during chatbot invocation: {e}")
        final_response_content = "An error occurred while processing your request."
    
    return final_response_content

@app.get("/")
async def read_root():
    return {"message": "Deep-Shiva Chatbot API is running!"}

if __name__ == "__main__":
    if "GROQ_API_KEY" not in os.environ:
        print("WARNING: GROQ_API_KEY environment variable not set. Chatbot may not function.")
    uvicorn.run(app, host="0.0.0.0", port=8000)
