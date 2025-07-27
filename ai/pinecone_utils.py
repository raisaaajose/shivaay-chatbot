import os
import json
import requests
from pinecone import Pinecone, ServerlessSpec # ServerlessSpec is good for new indexes
from huggingface_hub import InferenceClient
from pathlib import Path
from typing import List, Dict, Any # Added for type hinting consistency
from dotenv import load_dotenv

project_root = Path(__file__).parent.parent
load_dotenv(project_root / ".env")

# Ensure these environment variables are set in your example.env
HF_API_KEY = os.getenv("HF_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# Check if API keys are available
if not HF_API_KEY:
    raise ValueError("HF_API_KEY environment variable not set.")
if not PINECONE_API_KEY:
    raise ValueError("PINECONE_API_KEY environment variable not set.")

# Initialize Hugging Face Inference Client
client = InferenceClient(
    model="BAAI/bge-m3",
    token=HF_API_KEY # Use the variable from os.getenv for consistency
)

def get_embedding(text: str) -> List[float]: # Changed return type hint to List[float]
    """
    Generates an embedding for the given text using the Hugging Face Inference Client.
    Converts the embedding to a Python list if it's a NumPy array.
    """
    embedding = client.feature_extraction(text)
    # Ensure the embedding is a list of floats
    if hasattr(embedding, 'tolist'):
        return embedding.tolist()
    return embedding


# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "tourism-chatbot"

# It's good practice to check if the index exists and create it if not
# This part might be better handled in a separate setup script or during initial deployment
# For a running application, ensure the index is already created
try:
    index = pc.Index(index_name)
    print(f"Connected to Pinecone index: {index_name}")
except Exception as e:
    print(f"Error connecting to Pinecone index '{index_name}': {e}")
    print("Please ensure the index exists and your API key/environment are correct.")
    # If the index doesn't exist, you might want to create it here for development:
    # pc.create_index(
    #     name=index_name,
    #     dimension=get_embedding("test").shape[0], # Get dimension from a sample embedding
    #     metric='cosine', # or 'euclidean', 'dotproduct'
    #     spec=ServerlessSpec(cloud='aws', region='us-west-2') # Adjust cloud/region as needed
    # )
    # index = pc.Index(index_name)
    # print(f"Pinecone index '{index_name}' created and connected.")
    raise # Re-raise to stop if index connection is critical


def search_top_k(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Generates an embedding for the query text and searches the Pinecone index.

    Args:
        query (str): The text query to embed and search for.
        top_k (int): The number of top similar results to retrieve.

    Returns:
        List[Dict[str, Any]]: A list of dictionaries, each representing a retrieved document
                               with its ID, score, and metadata.
    """
    try:
        query_embedding = get_embedding(query) # get_embedding now handles tolist()
        
        result = index.query(
            vector=query_embedding, # This will now be a list of floats
            top_k=top_k,
            include_metadata=True
        )

        return result['matches']
    except Exception as e:
        print(f"Error during Pinecone search_top_k: {e}")
        return []

# Example usage for local testing
if __name__ == "__main__":
    print("--- Running local tests for pinecone_utils ---")
    # Make sure your .env file is set up with actual Pinecone credentials
    # and your Pinecone index has some data.

    # Example query
    test_query = "What are the famous temples in Uttarakhand?"
    print(f"\nSearching Pinecone for: '{test_query}'")
    
    results = search_top_k(test_query, top_k=2)
    
    if results:
        print("\nRetrieved documents:")
        for doc in results:
            print(f"  ID: {doc['id']}, Score: {doc['score']}")
            print(f"  Name: {doc['metadata'].get('name', 'N/A')}")
            print(f"  Description: {doc['metadata'].get('description', 'N/A')}")
    else:
        print("No documents retrieved or an error occurred.")

