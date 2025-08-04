from contextlib import asynccontextmanager
import operator
from typing import Annotated, Sequence, TypedDict, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from dotenv import load_dotenv
from pathlib import Path
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from pinecone_utils import search_top_k
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime 


project_root = Path(__file__).parent.parent
load_dotenv(project_root / ".env")

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable not set.")

# Initialize MongoDB client
client = AsyncIOMotorClient(MONGO_URI)
db = client.shivaay_chatbot
sessions_collection = db.chat_sessions

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

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        await sessions_collection.create_index("session_id", unique=True)
        await sessions_collection.create_index("updated_at")
        print("MongoDB indexes created successfully")
    except Exception as e:
        print(f"Error creating indexes: {e}")
    
    yield
    
    # Shutdown
    client.close()
    print("MongoDB connection closed")

app_graph = workflow.compile()

app = FastAPI(
    title="Deep-Shiva Conversational Chatbot API",
    description="A simple API for the Deep-Shiva chatbot using LangChain and LangGraph.",
    version="1.0.0",
    lifespan=lifespan,
)

# Get frontend URL from environment variables
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

print(f"CORS configured for frontend URL: {frontend_url}")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],  # Allow requests from frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

async def load_session(session_id: str) -> List[Dict]:
    """
    Load session messages from MongoDB.
    Returns a list of message dictionaries.
    """
    try:
        session_doc = await sessions_collection.find_one({"session_id": session_id})
        if session_doc:
            return session_doc.get("messages", [])
        return []
    except Exception as e:
        print(f"Error loading session {session_id}: {e}")
        return []

async def save_session(session_id: str, messages: List[Dict]):
    """
    Save session messages to MongoDB.
    """
    try:
        await sessions_collection.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "session_id": session_id,
                    "messages": messages,
                    "updated_at": datetime.utcnow(),
                }
            },
            upsert=True
        )
    except Exception as e:
        print(f"Error saving session {session_id}: {e}")

def message_to_dict(message: BaseMessage) -> Dict:
    """
    Convert a BaseMessage to a dictionary for JSON serialization.
    """
    return {
        "type": message.__class__.__name__,
        "content": message.content,
        "timestamp": datetime.utcnow().isoformat()
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

    # Load session from MongoDB
    session_messages = await load_session(session_id)
    
    if not session_messages:
        print(f"New session created: {session_id}")
    
    # Convert stored message dicts back to BaseMessage objects
    current_history = [dict_to_message(msg_dict) for msg_dict in session_messages]
    current_history.append(HumanMessage(content=user_message_content))

    # Get context from Pinecone
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

        # Convert messages back to dicts and save to MongoDB
        session_messages_dict = [message_to_dict(msg) for msg in current_history]
        await save_session(session_id, session_messages_dict)

    except Exception as e:
        print(f"Error during chatbot invocation: {e}")
        final_response_content = "An error occurred while processing your request."
    
    return final_response_content

@app.get("/")
async def read_root():
    return {"message": "Deep-Shiva Chatbot API is running!"}

@app.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """
    Get session history for a specific session ID.
    """
    try:
        session_doc = await sessions_collection.find_one({"session_id": session_id})
        if session_doc:
            return {
                "session_id": session_id,
                "messages": session_doc.get("messages", []),
                "updated_at": session_doc.get("updated_at")
            }
        return {"session_id": session_id, "messages": [], "updated_at": None}
    except Exception as e:
        print(f"Error retrieving session {session_id}: {e}")
        return {"error": "Failed to retrieve session"}

@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """
    Delete a specific session.
    """
    try:
        result = await sessions_collection.delete_one({"session_id": session_id})
        if result.deleted_count > 0:
            return {"message": f"Session {session_id} deleted successfully"}
        return {"message": f"Session {session_id} not found"}
    except Exception as e:
        print(f"Error deleting session {session_id}: {e}")
        return {"error": "Failed to delete session"}

if __name__ == "__main__":
    if "GROQ_API_KEY" not in os.environ:
        print("WARNING: GROQ_API_KEY environment variable not set. Chatbot may not function.")
    uvicorn.run(app, host="0.0.0.0", port=8000)
