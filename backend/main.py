import io
import json
import os
import numpy as np
from PIL import Image
import requests
from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# --- APP SETUP ---
app = FastAPI()

# Use environment variables for URLs
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
BASE_URL = os.environ.get("BASE_URL", "http://localhost:8000")

origins = [
    "http://localhost:5173",
    frontend_url
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD MODELS & DATA ---
@app.on_event("startup")
async def startup_event():
    global model, product_db, product_embeddings
    print("Loading AI model...")
    model = SentenceTransformer('clip-ViT-B-32')
    print("Loading product database...")
    with open('database.json', 'r') as f:
        product_db = json.load(f)
    print("Loading product embeddings...")
    product_embeddings = np.load('product_embeddings.npy')
    print("Startup complete.")

# --- SERVE PRODUCT IMAGES ---
app.mount("/images", StaticFiles(directory="images"), name="images")

# --- API ENDPOINTS ---
@app.post("/search/")
async def search(
    image: UploadFile = File(None), 
    image_url: str = Form(None),
    min_similarity: float = Query(0.5, ge=0.0, le=1.0)
):
    if not image and not image_url:
        raise HTTPException(status_code=400, detail="No image file or URL provided.")

    try:
        query_image = None
        # This logic correctly handles either a file upload or a URL
        if image and image.filename:
            # Read the file's contents into memory
            contents = await image.read()
            # Open the in-memory bytes as an image
            query_image = Image.open(io.BytesIO(contents))
        elif image_url:
            response = requests.get(image_url)
            response.raise_for_status()
            query_image = Image.open(io.BytesIO(response.content))

        if query_image is None:
             raise HTTPException(status_code=400, detail="Could not process image.")
        
        query_embedding = model.encode([query_image], convert_to_numpy=True)
        similarities = cosine_similarity(query_embedding, product_embeddings)[0]
        
        filtered_indices = [i for i, score in enumerate(similarities) if score >= min_similarity]
        sorted_filtered_indices = sorted(filtered_indices, key=lambda i: similarities[i], reverse=True)
        top_indices = sorted_filtered_indices[:20]
        
        results = []
        for index in top_indices:
            product = product_db[index]
            results.append({
                "id": product["id"],
                "name": product["name"],
                "category": product["category"],
                "score": float(similarities[index]),
                "image_url": f"{BASE_URL}/{product['image_path']}"
            })
            
        return results

    except Exception as e:
        print(f"Error during search: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/categories/")
async def get_categories():
    if 'product_db' not in globals():
        raise HTTPException(status_code=500, detail="Database not loaded.")
    
    unique_categories = sorted(list(set([p['category'] for p in product_db])))
    return unique_categories