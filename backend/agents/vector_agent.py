import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from services.preprocess import clean_text
from services.db import documents_col
import nltk
from nltk.corpus import stopwords

# Télécharger les stopwords français si nécessaire
nltk.download('stopwords')
french_stopwords = stopwords.words('french')

class VectorAgent:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words=french_stopwords)

        # 🔹 Charger les documents depuis MongoDB
        self.documents = list(documents_col.find({}, {"_id": 0}))

        if not self.documents:
            print("⚠️ [VectorAgent] Aucun document trouvé dans MongoDB")
            self.corpus = []
            self.document_vectors = None
        else:
            self.corpus = [clean_text(doc.get("contenu", "")) for doc in self.documents]
            self.document_vectors = self.vectorizer.fit_transform(self.corpus)
            print(f"🧠 [VectorAgent] {len(self.documents)} documents chargés depuis MongoDB")

    def search(self, query, top_k=3, threshold=0.03):
        query_clean = clean_text(query)

        if not query_clean.strip() or not self.documents:
            return []

        query_vec = self.vectorizer.transform([query_clean])
        similarities = cosine_similarity(query_vec, self.document_vectors)[0]

        if max(similarities) < threshold:
            return []

        top_indices = similarities.argsort()[-top_k:][::-1]

        results = []
        for i in top_indices:
            doc = self.documents[i]
            results.append({
                "content": doc.get("contenu", ""),
                "culture": doc.get("culture", ""),
                "maladie": doc.get("maladie", ""),
                "score": float(similarities[i])
            })

        return results
