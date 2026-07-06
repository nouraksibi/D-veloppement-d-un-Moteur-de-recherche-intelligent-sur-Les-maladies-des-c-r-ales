#  Intelligent Search Engine for Cereal Diseases

##  Overview

This project is an intelligent search engine dedicated to cereal diseases (wheat, barley, maize, and other cereals). It uses a **multi-agent architecture** to analyze user queries, perform semantic searches, and provide personalized recommendations.

The system combines Natural Language Processing (NLP), TF-IDF vectorization, semantic search, and recommendation techniques to help farmers, researchers, and agricultural advisors quickly find relevant scientific information.

---

##  Features

-  Intelligent semantic search
-  Chatbot for natural language query processing
-  TF-IDF document indexing
-  Personalized recommendations
-  User authentication (Login/Register)
-  Search history management
-  MongoDB database integration
-  Web interface built with React

---

##  System Architecture

The application follows a **multi-agent architecture** composed of:

- **Chatbot Agent**
  - Cleans and analyzes user queries.
- **Vector Search Agent**
  - Performs semantic search using TF-IDF and cosine similarity.
- **Recommendation Agent**
  - Recommends relevant documents based on user history.

---

##  Technologies Used

### Backend

- Python
- Flask
- Flask-CORS
- MongoDB
- Scikit-learn
- NLTK
- PyMongo

### Frontend

- React.js
- Axios
- CSS

### Database

- MongoDB

---

##  Project Structure

```
project/
│
├── backend/
│   ├── agents/
│   ├── services/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

##  Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/Intelligent-Cereal-Disease-Search-Engine.git
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

The Flask server runs on:

```
http://127.0.0.1:5000
```

---

### Frontend

```bash
cd frontend

npm install

npm start
```

The React application runs on:

```
http://localhost:3000
```

---

## 📊 Search Process

1. User enters a question.
2. Chatbot Agent preprocesses the query.
3. Vector Agent computes TF-IDF similarity.
4. Recommendation Agent ranks results.
5. Relevant documents are returned to the user.

---

##  Main Algorithms

- TF-IDF
- Cosine Similarity
- Text Preprocessing
- Recommendation based on user history

---

##  Author

**Noura Ksibi**

Master's Student in Information Systems and Web Technologies

University of Jendouba – Higher Institute of Computer Science of Kef

---

##  License

This project is intended for academic and research purposes.
