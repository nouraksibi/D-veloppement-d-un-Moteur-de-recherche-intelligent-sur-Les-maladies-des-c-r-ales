from datetime import datetime
from services.db import history_col

class RecommendationAgent:
    def __init__(self):
        pass

    def save_history(self, user_id, doc_id):
        """Enregistrer la consultation d'un document dans MongoDB"""
        history_col.insert_one({
            "user_id": user_id,  # uniforme avec le reste du projet
            "doc_id": doc_id,
            "date_consultation": datetime.now(),
            "score_frequence": 1
        })
        print(f"✅ Historique sauvegardé: user={user_id}, doc={doc_id}")

    def get_user_history(self, user_id, limit=10):
        """Récupérer l'historique des consultations d'un utilisateur"""
        cursor = history_col.find({"user_id": user_id}).sort("date_consultation", -1).limit(limit)
        return list(cursor)

    def recommend(self, user_id, top_k=3):
        """Recommandation simple basée sur l'historique"""
        history = self.get_user_history(user_id)
        if not history:
            return []  # aucun historique → aucune recommandation
        doc_ids = [h["doc_id"] for h in history if "doc_id" in h]
        return doc_ids[:top_k] if doc_ids else []
