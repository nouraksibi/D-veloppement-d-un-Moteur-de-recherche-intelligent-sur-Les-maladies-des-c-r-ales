from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["cereal_ai"]

documents_col = db["documents"]
users_col = db["users"]
history_col = db["historique_consultation"]
