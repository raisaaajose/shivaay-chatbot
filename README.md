# Shivaay Chatbot

> Conversational AI for Tourism in Uttarakhand, India

![Shivaay Full Logo](./app/public/icon-full.svg)

A conversational AI assistant focused on tourism in Uttarakhand, India. Built with FastAPI, LangChain, LangGraph, and Groq LLM, it leverages Pinecone for vector search and BAAI/bge-m3 embeddings. The project consists of two backends: a main Node.js/TypeScript backend for data management and authentication, and a Python AI backend for conversational AI functionality.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Usage](#api-usage)
- [Environment Variables](#environment-variables)
- [Notes on Unused Libraries](#notes-on-unused-libraries)
- [Notes on Unused Libraries](#notes-on-unused-libraries)

---

## Features

- *Conversational AI*: Chatbot focused on Uttarakhand tourism.
- *Session Persistence*: Conversation history is stored in a JSON file.
- *Contextual Search*: Uses Pinecone and Hugging Face for context retrieval.
- *API-First*: RESTful endpoints for easy integration.
- *Swagger UI*: API documentation and testing at /docs.

---

## Project Structure

```text
shivaay-chatbot/
  ai/
    app.py                # FastAPI backend for chatbot
    pinecone_utils.py     # Pinecone & Hugging Face utilities
    requirements.txt      # Python dependencies
  api/                    # Node.js/TypeScript backend (auth, user, etc.)
  app/                    # Next.js frontend
  .env                    # Environment variables (not committed)
  example.env             # Example environment variables
  ...
```

---

## Tech Stack & Libraries

### Python Backend (ai/)

- **[FastAPI](https://fastapi.tiangolo.com/)**: Web framework for building APIs.
- **[Uvicorn](https://www.uvicorn.org/)**: ASGI <!-- cspell:ignore ASGI --> server for running FastAPI.
- **[LangChain Core](https://python.langchain.com/docs/get_started/introduction)**: Framework for LLM applications.
- **[LangChain Groq](https://python.langchain.com/docs/integrations/llms/groq/)**: Integration for Groq LLMs.
- **[LangGraph](https://github.com/langchain-ai/langgraph)**: Graph-based orchestration for LLM workflows.
- **[Pinecone](https://www.pinecone.io/)**: Vector database for semantic search.
- **[Hugging Face Hub](https://huggingface.co/docs/huggingface_hub/index)**: For generating embeddings.
- **[python-dotenv](https://pypi.org/project/python-dotenv/)**: Loads environment variables from .env.
- **[Pydantic](https://docs.pydantic.dev/)**: Data validation and settings management.
- **[requests](https://docs.python-requests.org/)**: HTTP requests (used in pinecone_utils.py and test scripts).
- **[json](https://docs.python.org/3/library/json.html)**: For session persistence.

#### Present but Not Currently Used

- **[huggingface-hub](https://pypi.org/project/huggingface-hub/)**: Used for embeddings, but you can expand to use more Hugging Face models.
- **[pinecone](https://pypi.org/project/pinecone/)**: Used for vector search.
- **[pydantic](https://pydantic-docs.helpmanual.io/)**: Used for request validation.
- **[requests](https://pypi.org/project/requests/)**: Used in utility scripts, not directly in main API logic.
- **[json](https://docs.python.org/3/library/json.html)**: Used for session storage.

---

### Node.js Backend (api/)

- *Express.js*: Web framework (implied by structure, not directly shown).
- *Passport.js*: Authentication strategies (Google, GitHub, Local).
- *TypeScript*: Type safety.
- *Nodemon*: Development server auto-reload.
- *MongoDB*: User and session storage (implied by MONGO_URI).
- *JWT*: For authentication tokens.
- *dotenv*: Loads environment variables.
- *Other*: Email (SMTP), OAuth, etc.

---

### Frontend (app/)

- *Next.js*: React framework for SSR/SSG.
- *TypeScript*: Type safety.
- *PostCSS*: CSS processing.
- *Custom UI Components*: For authentication, admin, profile, etc.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/raisaaajose/shivaay-chatbot
cd shivaay-chatbot
```

### 2. Set Up Environment Variables

Copy the example file and fill in your API keys:

```bash
cp example.env .env
```

Edit .env and set:

- GROQ_API_KEY (from [Groq Console](https://console.groq.com/))
- PINECONE_API_KEY (from [Pinecone Console](https://app.pinecone.io/))
- HF_API_KEY (from [Hugging Face](https://huggingface.co/settings/tokens))
- Other keys as needed for Node.js backend and frontend

### 3. Install Python Dependencies

```bash
cd ai
pip install -r requirements.txt
```

---

## Running the Application

### Start the FastAPI Backend

```bash
cd ai
python app.py
```

Or, for hot-reload during development:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).

---

## API Usage

### /chat Endpoint

- *POST* /chat
- *Body*:
  json
  {
    "session_id": "your_session_id",
    "user_message": "Tell me about Kedarnath temple" <!-- cspell:ignore Kedarnath -->
  }
  
- *Response*: Chatbot reply as a string.

### / Endpoint

- *GET* /
- *Response*: Health check message.

### API Docs

- *Swagger UI*: [http://localhost:8000/docs](http://localhost:8000/docs)
- *ReDoc*: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Environment Variables

| Variable            | Description                        | Required for      |
|---------------------|------------------------------------|-------------------|
| GROQ_API_KEY        | Groq LLM API Key                   | Python backend    |
| PINECONE_API_KEY    | Pinecone vector DB API Key         | Python backend    |
| HF_API_KEY          | Hugging Face API Key               | Python backend    |
| MONGO_URI           | MongoDB connection string          | Node backend      |
| FRONTEND_URL        | URL of the frontend app            | Node backend      |
| SESSION_SECRET      | Session management secret          | Node backend      |
| JWT_SECRET          | JWT signing secret                 | Node backend      |
| ...                 | ...                                | ...               |

See example.env for all options.

---

## Notes on Unused Libraries

- *huggingface-hub*: Used specifically for BAAI/bge-m3 embeddings, but can be expanded for other Hugging Face models.
- *pinecone*: Used for vector search, but not all features are utilized.
- *pydantic*: Used for request validation, but not for settings management.
- *requests*: Used in utility scripts, not in main API logic.
- *Node.js/TypeScript/Next.js dependencies*: Present for full-stack development, but not all are used in the Python AI backend.

---

*Enjoy exploring Uttarakhand with Shivaay!*  
For any questions, open an issue or contact the maintainer.
