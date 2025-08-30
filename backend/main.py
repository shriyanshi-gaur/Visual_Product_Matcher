# # In backend/main.py
# import io
# import json
# import os
# import numpy as np
# from PIL import Image
# import requests

# from fastapi import FastAPI, File, UploadFile, HTTPException, Form
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity

# # --- 1. APP SETUP ---
# app = FastAPI()
# origins = ["http://localhost:5173"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- 2. LOAD MODELS & DATA (on startup) ---
# @app.on_event("startup")
# async def startup_event():
#     global model, product_db, product_embeddings
#     print("Loading AI model...")
#     model = SentenceTransformer('clip-ViT-B-32')
#     print("Loading product database...")
#     with open('database.json', 'r') as f:
#         product_db = json.load(f)
#     print("Loading product embeddings...")
#     product_embeddings = np.load('product_embeddings.npy')
#     print("Startup complete.")

# # --- 3. SERVE PRODUCT IMAGES ---
# app.mount("/images", StaticFiles(directory="images"), name="images")
# BASE_URL = "http://localhost:8000"

# # --- 4. THE UPDATED SEARCH ENDPOINT ---
# @app.post("/search/")
# async def search(image: UploadFile = File(None), image_url: str = Form(None)):
#     if not image and not image_url:
#         raise HTTPException(status_code=400, detail="No image file or URL provided.")

#     try:
#         query_image = None
#         # --- Updated logic to handle file or URL ---
#         # Only process the file if it has actual content (size > 0)
#         if image and image.size > 0:  # <-- THIS IS THE FIX
#             contents = await image.read()
#             query_image = Image.open(io.BytesIO(contents))
#         elif image_url:
#             response = requests.get(image_url)
#             response.raise_for_status()
#             query_image = Image.open(io.BytesIO(response.content))
#         # --- End of updated logic ---

#         if query_image is None:
#              raise HTTPException(status_code=400, detail="Could not process image.")
        
#         query_embedding = model.encode([query_image], convert_to_numpy=True)
#         similarities = cosine_similarity(query_embedding, product_embeddings)[0]
#         top_indices = np.argsort(similarities)[::-1][:20]
        
#         results = []
#         for index in top_indices:
#             product = product_db[index]
#             results.append({
#                 "id": product["id"],
#                 "name": product["name"],
#                 "category": product["category"],
#                 "score": float(similarities[index]),
#                 "image_url": f"{BASE_URL}/{product['image_path']}"
#             })
            
#         return results

#     except Exception as e:
#         # For debugging, you might want to print the error
#         print(f"Error during search: {e}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# In backend/main.py
import io
import json
import os
import numpy as np
from PIL import Image
import requests

# Import Query for the new parameter
from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# --- APP SETUP (No changes here) ---
app = FastAPI()
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD MODELS & DATA (No changes here) ---
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

# --- SERVE PRODUCT IMAGES (No changes here) ---
app.mount("/images", StaticFiles(directory="images"), name="images")
BASE_URL = "http://localhost:8000"

# --- THE UPDATED SEARCH ENDPOINT ---
@app.post("/search/")
async def search(
    image: UploadFile = File(None), 
    image_url: str = Form(None),
    # 1. ADD a min_similarity query parameter with a default and validation
    min_similarity: float = Query(0.5, ge=0.0, le=1.0)
):
    if not image and not image_url:
        raise HTTPException(status_code=400, detail="No image file or URL provided.")

    try:
        query_image = None
        if image and image.size > 0:
            contents = await image.read()
            query_image = Image.open(io.BytesIO(contents))
        elif image_url:
            response = requests.get(image_url)
            response.raise_for_status()
            query_image = Image.open(io.BytesIO(response.content))

        if query_image is None:
             raise HTTPException(status_code=400, detail="Could not process image.")
        
        query_embedding = model.encode([query_image], convert_to_numpy=True)
        similarities = cosine_similarity(query_embedding, product_embeddings)[0]
        
        # --- 2. UPDATE LOGIC to filter before sorting ---
        # Get all results that meet the minimum similarity score
        filtered_indices = [
            i for i, score in enumerate(similarities) if score >= min_similarity
        ]
        
        # Sort these filtered results by score, in descending order
        sorted_filtered_indices = sorted(
            filtered_indices, 
            key=lambda i: similarities[i], 
            reverse=True
        )
        
        # Take the top 20 of the filtered & sorted results
        top_indices = sorted_filtered_indices[:20]
        # --- End of updated logic ---
        
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
    """
    Reads the database and returns a sorted list of unique product categories.
    """
    if not product_db:
        raise HTTPException(status_code=500, detail="Database not loaded.")
    
    unique_categories = sorted(list(set([p['category'] for p in product_db])))
    return unique_categories