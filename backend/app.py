# In app.py
import streamlit as st
from PIL import Image
import numpy as np
import json
import requests
import io
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os

# --- PAGE CONFIGURATION ---
st.set_page_config(
    page_title="Visual Product Matcher",
    layout="wide",
    initial_sidebar_state="auto"
)

# --- LOAD DATA AND MODELS (this runs only once) ---
@st.cache_resource
def load_data():
    """Loads the model, embeddings, and product database from files."""
    print("Loading data...")
    model = SentenceTransformer('clip-ViT-B-32')
    embeddings = np.load('product_embeddings.npy')
    with open('database.json', 'r') as f:
        db = json.load(f)
    # Create a list of unique categories for the filter
    categories = ["All Categories"] + sorted(list(set([p['category'] for p in db])))
    print("Data loaded successfully.")
    return model, embeddings, db, categories

model, product_embeddings, product_db, category_options = load_data()

# --- SIDEBAR ---
with st.sidebar:
    st.header("Search Controls")
    st.write("Adjust the search parameters here.")

    # --- NEW: Category Selection Dropdown ---
    selected_category = st.selectbox(
        "Filter by category:",
        options=category_options
    )
    
    # Slider for number of results
    num_results = st.slider(
        "Number of similar products to show:",
        min_value=5,
        max_value=20,
        value=10,
        step=1
    )
    
    # Slider for similarity score threshold
    min_similarity = st.slider(
        "Minimum similarity score:",
        min_value=0.0,
        max_value=1.0,
        value=0.3,
        step=0.05
    )

# --- MAIN PAGE LAYOUT ---
st.title("📸 Visual Product Matcher")
st.write(
    "Upload an image or provide an image URL to find visually similar products from our database."
)

col1, col2 = st.columns(2)
with col1:
    uploaded_file = st.file_uploader(
        "Upload an image file",
        type=["jpg", "jpeg", "png", "webp"]
    )
with col2:
    image_url = st.text_input("Or enter an image URL")

# --- PROCESSING AND DISPLAY LOGIC ---
query_image = None
if uploaded_file:
    query_image = Image.open(uploaded_file)
elif image_url:
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        query_image = Image.open(io.BytesIO(response.content))
    except requests.exceptions.RequestException as e:
        st.error(f"Error fetching image from URL: {e}")
        query_image = None

if query_image:
    st.subheader("Your Query Image:")
    st.image(query_image, width=250)

    with st.spinner("Searching for similar products..."):
        query_embedding = model.encode([query_image], convert_to_numpy=True)
        similarities = cosine_similarity(query_embedding, product_embeddings)[0]
        result_indices_scores = list(enumerate(similarities))
        
        # --- MODIFIED: Filter results by category BEFORE sorting ---
        if selected_category != "All Categories":
            filtered_results = [
                res for res in result_indices_scores 
                if product_db[res[0]]['category'] == selected_category and res[1] >= min_similarity
            ]
        else:
            filtered_results = [res for res in result_indices_scores if res[1] >= min_similarity]
            
        sorted_results = sorted(filtered_results, key=lambda x: x[1], reverse=True)
        top_results = sorted_results[:num_results]

    st.subheader(f"Found {len(top_results)} similar products:")

    if not top_results:
        st.warning("No products found matching your criteria. Try changing the category or lowering the similarity score.")
    else:
        cols = st.columns(5)
        for i, (index, score) in enumerate(top_results):
            product = product_db[index]
            image_path = product['image_path']

            if os.path.exists(image_path):
                with cols[i % 5]:
                    st.image(image_path, caption=f"Score: {score:.2f}")
                    st.markdown(f"**{product['name']}**")
                    st.markdown(f"_{product['category']}_")
            else:
                st.warning(f"Image not found at path: {image_path}")