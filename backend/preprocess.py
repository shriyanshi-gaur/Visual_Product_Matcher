# In preprocess.py
import json
import numpy as np
from sentence_transformers import SentenceTransformer
from PIL import Image
import os

# --- 1. Load the AI Model ---
# This model is excellent at understanding the content of images.
print("Loading CLIP model...")
model = SentenceTransformer('clip-ViT-B-32')

# --- 2. Load Product Metadata ---
# Opens your database.json file to get the path for each image.
print("Loading product data from database.json...")
with open('database.json', 'r') as f:
    products = json.load(f)

print(f"Found {len(products)} products. Generating embeddings...")

# --- 3. Prepare Image Paths ---
# Collects all the 'image_path' values from your JSON file.
image_paths = [product['image_path'] for product in products]

# Safety check to ensure all image files exist before starting the process.
for path in image_paths:
    if not os.path.exists(path):
        print(f"🚨 ERROR: Image not found at path: {path}")
        print("Please check your folder structure and JSON file for typos.")
        exit()

# --- 4. Generate and Save Embeddings ---
# This is the main step. The model "looks" at each image and converts it
# into a vector (a list of numbers). This process can take a minute.
print("Encoding images... (This might take a moment)")
image_embeddings = model.encode(
    [Image.open(filepath) for filepath in image_paths],
    batch_size=32,  # Process images in batches for efficiency
    convert_to_numpy=True,
    show_progress_bar=True
)

# Saves the resulting array of embeddings to a file.
print("Saving embeddings to product_embeddings.npy...")
np.save('product_embeddings.npy', image_embeddings, allow_pickle=False)

print("\n✅ Pre-processing complete! Your `product_embeddings.npy` file is ready.")