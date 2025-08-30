# Visual Product Matcher

**Live Application URL:** [https://your-deployed-app-url.com](https://your-deployed-app-url.com) *(Replace with your live URL after deployment)*

![Visual Product Matcher Screenshot](./path-to-your/screenshot.png)
*(Replace with a path to a screenshot of your finished application)*

---

## 📝 Project Overview

[cite_start]This project is a full-stack web application built as a technical assessment for a Software Engineer position[cite: 3]. [cite_start]It allows users to find visually similar products by uploading an image or providing an image URL[cite: 6, 8]. The application leverages a powerful AI model to analyze images and calculate similarity scores, providing an intuitive and responsive user experience.

---

## ✨ Key Features

* [cite_start]**Dual Image Input:** Supports both direct file uploads and searching via image URL[cite: 8].
* [cite_start]**Similarity Filtering:** Users can dynamically filter the search results based on a minimum similarity score to refine their search[cite: 11].
* [cite_start]**Real-time Previews:** Displays a preview of the selected image before the search is initiated[cite: 9].
* [cite_start]**Dynamic Results Grid:** Shows a clean, responsive grid of similar products found, including their name, category, and similarity match percentage[cite: 10, 16].
* **Full-Stack Architecture:** Built with a modern, decoupled architecture using React for the frontend and FastAPI for the backend.
* [cite_start]**Enhanced UX:** Includes loading states during searches and clear error handling to provide a smooth user experience[cite: 19, 20].

---

## 🛠️ Tech Stack

### Frontend
* **React:** A component-based library for building interactive user interfaces.
* **CSS:** Custom CSS for styling, organized by component for maintainability.

### Backend
* **FastAPI (Python):** A high-performance web framework for building APIs.
* **Uvicorn:** A lightning-fast ASGI server for running the FastAPI application.

### AI / Machine Learning
* **Sentence Transformers (`clip-ViT-B-32`):** A state-of-the-art model for generating vector embeddings from images.
* **Scikit-learn:** Used for calculating the cosine similarity between image vectors.
* **NumPy:** For efficient numerical operations.

---

## 📂 Project Structure

The project is organized into two main directories:

* `/frontend`: Contains the entire React application.
* `/backend`: Contains the FastAPI server, the AI model logic, and the product database files.

---

## 🚀 Getting Started

To run this project locally, you'll need Python 3.8+ and Node.js v16+ installed.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will now be running on `http://localhost:8000`.

### Frontend Setup

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
3.  **Run the React development server:**
    ```bash
    npm run dev
    ```
    The frontend will now be running on `http://localhost:5173`.

---

## 💡 Approach Write-up

For this project, I chose a decoupled full-stack architecture to separate concerns and create a scalable application. The frontend is built with **React**, which is ideal for creating a dynamic and component-based user interface. This approach makes managing state for features like image previews, loading indicators, and filtering straightforward.

The backend is powered by **FastAPI**, chosen for its high performance and ease of integrating machine learning models. The core of the visual search is the `clip-ViT-B-32` model from Sentence Transformers. When a user provides an image, the backend encodes it into a high-dimensional vector. This vector is then compared against a pre-computed set of vectors for all products in the database using **cosine similarity**. This mathematical operation efficiently calculates the "visual distance" between images. The backend then filters these results based on the user-defined similarity threshold before returning the top matches. This entire process ensures that the results are not only fast but also highly relevant to the user's query image.

---

## 🔮 Future Improvements

* **Advanced Filtering:** Add filters for product category or brand.
* **Pagination:** Implement pagination for the search results to handle larger datasets.
* **User Accounts:** Allow users to save their search history.
* **CI/CD Pipeline:** Set up a continuous integration and deployment pipeline for automated testing and deployment.