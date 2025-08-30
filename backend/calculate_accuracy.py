import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
from collections import defaultdict

# --- CONFIGURATION ---
K = 5  # The 'K' in Precision@K
DATABASE_FILE = 'database.json'
EMBEDDINGS_FILE = 'product_embeddings.npy'

# Test queries (IDs are 1-based in JSON)
TEST_QUERY_IDS = [2, 11, 28, 33, 40, 52, 62, 68]  # Watch, Backpack, Jacket, Sneaker, iPhone, Tablet, Chair, Guitar

def evaluate(product_db, product_embeddings, use_category_filter=False):
    """Evaluate Precision@K, optionally restricting candidates to the same category."""
    all_precision_scores = []
    category_scores = defaultdict(list)

    mode = "Category-Filtered" if use_category_filter else "Embedding-Only"
    print(f"\n🔍 Running {mode} Retrieval")
    print("-" * 30)

    for query_id in TEST_QUERY_IDS:
        query_index = query_id - 1
        query_product = product_db[query_index]
        query_category = query_product['category']
        query_embedding = product_embeddings[query_index].reshape(1, -1)

        similarities = cosine_similarity(query_embedding, product_embeddings)[0]

        # Candidate pool
        candidates = list(range(len(product_db)))
        candidates.remove(query_index)  # remove the query itself

        if use_category_filter:
            candidates = [i for i in candidates if product_db[i]['category'] == query_category]

        # Sort by similarity
        sorted_candidates = sorted(candidates, key=lambda i: similarities[i], reverse=True)
        top_indices = sorted_candidates[:K]

        relevant_count = 0
        for index in top_indices:
            result_category = product_db[index]['category']
            if result_category == query_category:
                relevant_count += 1

        precision = relevant_count / K if K > 0 else 0
        all_precision_scores.append(precision)
        category_scores[query_category].append(precision)

        print(f"Query: '{query_product['name']}' (Target: {query_category})")
        print(f"Precision@{K}: {relevant_count}/{K} = {precision:.0%}\n")

    avg_precision = np.mean(all_precision_scores)
    print("-" * 30)
    print(f"✅ {mode} Result:")
    print(f"Average Precision@{K} across all test queries: {avg_precision:.2%}\n")

    print("📊 Category-wise Average Precision@{K}:")
    for category, scores in category_scores.items():
        cat_avg = np.mean(scores)
        print(f"  - {category}: {cat_avg:.2%} (based on {len(scores)} queries)")
    print("\n" + "=" * 50)
    return avg_precision, category_scores

def calculate_accuracy():
    print("Loading data files...")
    if not os.path.exists(DATABASE_FILE) or not os.path.exists(EMBEDDINGS_FILE):
        print(f"🚨 Error: Make sure '{DATABASE_FILE}' and '{EMBEDDINGS_FILE}' are in the same directory.")
        return

    with open(DATABASE_FILE, 'r') as f:
        product_db = json.load(f)
    product_embeddings = np.load(EMBEDDINGS_FILE)

    # Run both modes
    evaluate(product_db, product_embeddings, use_category_filter=False)
    evaluate(product_db, product_embeddings, use_category_filter=True)

if __name__ == '__main__':
    calculate_accuracy()
