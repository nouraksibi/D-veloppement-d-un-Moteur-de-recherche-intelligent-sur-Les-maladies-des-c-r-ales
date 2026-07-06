import re
from services.preprocess import clean_text

class ChatbotAgent:
    def __init__(self):
        # Liste de mots simples / salutations
        self.greetings = ["bonjour", "salut", "bonsoir", "coucou", "merci", "ok", "oui", "non"]

    def process(self, query):
        """
        Analyse simple de la requête.
        - Nettoyage du texte
        - Détection des salutations / mots simples
        """
        if not query:
            return None

        print("🤖 [ChatbotAgent] Question reçue :", query)
        query_clean = clean_text(query)
        print("🤖 [ChatbotAgent] Question nettoyée :", query_clean)

        # Si c'est une salutation ou mot simple
        if query_clean in self.greetings:
            print("🤖 [ChatbotAgent] Réponse directe détectée")
            return query  # renvoie le texte original ou tu peux personnaliser la réponse

        # Sinon, aucune réponse
        return None
