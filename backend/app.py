from flask import Flask, request, jsonify
from flask_cors import CORS
from agents.chatbot_agent import ChatbotAgent
from agents.vector_agent import VectorAgent
from agents.recommendation_agent import RecommendationAgent
from services.db import users_col, documents_col, history_col
from werkzeug.security import generate_password_hash, check_password_hash
from concurrent.futures import ThreadPoolExecutor, as_completed

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # 🔹 autoriser React

# 🔹 Instances des agents
chat_agent = ChatbotAgent()
vector_agent = VectorAgent()  
recommendation_agent = RecommendationAgent()

# ---------------------------
# Fonction pour générer un user_id unique
# ---------------------------
def generate_user_id():
    i = 1
    while True:
        uid = f"user_{i:03d}"
        if not users_col.find_one({"_id": uid}):
            return uid
        i += 1

# ---------------------------
# Endpoint : inscription
# ---------------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nom = data.get("nom")
    password = data.get("password")
    role = data.get("role", "agriculteur")

    if not nom or not password:
        return jsonify({"error": "Nom et mot de passe obligatoires"}), 400

    if users_col.find_one({"nom": nom}):
        return jsonify({"error": "Cet utilisateur existe déjà"}), 400

    user_id = generate_user_id()
    hashed_password = generate_password_hash(password)

    user = {
        "_id": user_id,
        "nom": nom,
        "role": role,
        "password": hashed_password
    }

    users_col.insert_one(user)

    user_copy = user.copy()
    user_copy.pop("password")

    return jsonify({
        "message": "Utilisateur enregistré avec succès",
        "user": user_copy
    })

# ---------------------------
# Endpoint : login
# ---------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    nom = data.get("nom")
    password = data.get("password")

    if not nom or not password:
        return jsonify({"error": "Nom et mot de passe obligatoires"}), 400

    user = users_col.find_one({"nom": nom})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Nom ou mot de passe incorrect"}), 401

    user_copy = user.copy()
    user_copy.pop("password")

    return jsonify({"user": user_copy})

# ---------------------------
# Endpoint : recherche
# ---------------------------
@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    user_id = data.get("user_id", "user_001")
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"results": [{"content": "Veuillez entrer une question."}]})

    print(f"[SEARCH] user={user_id}, query='{query}'")

    # Fonctions pour chaque agent
    def call_chatbot():
        res = chat_agent.process(query)
        if res:
            return ("ChatbotAgent", res)
        return None

    def call_vector():
        res = vector_agent.search(query)
        if res:
            return ("VectorAgent", res)
        return None

    def call_recommendation():
        res = recommendation_agent.recommend(user_id)
        if res:
            return ("RecommendationAgent", res)
        return None

    agents = [call_chatbot, call_vector, call_recommendation]
    result = None
    agent_name = None

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(fn): fn for fn in agents}
        for future in as_completed(futures):
            res = future.result()
            if res:
                agent_name, result = res
                break

    # Stockage dans l'historique
    if result:
        history_col.insert_one({
            "user_id": user_id,
            "query": query,
            "response": result,
            "agent": agent_name
        })

        if agent_name == "VectorAgent":
            return jsonify({"results": result})
        elif agent_name == "RecommendationAgent":
            return jsonify({"results": [{"content": f"Je te recommande ces documents: {result}"}]})
        else:  # ChatbotAgent
            return jsonify({"results": [{"content": result}]})

    # Sinon réponse inconnue
    unknown_response = "Je ne comprends pas votre question."
    history_col.insert_one({
        "user_id": user_id,
        "query": query,
        "response": unknown_response,
        "agent": "None"
    })
    return jsonify({"results": [{"content": unknown_response}]})


# ---------------------------
# Endpoint : historique
# ---------------------------
@app.route("/history/<user_id>", methods=["GET"])
def get_history(user_id):
    history = list(history_col.find({"user_id": user_id}, {"_id": 0}))
    return jsonify({"history": history})

# ---------------------------
# Lancement du serveur
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
