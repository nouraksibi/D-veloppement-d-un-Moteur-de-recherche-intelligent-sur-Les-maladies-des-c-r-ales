import { useState, useRef, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Results from "./components/Results";
import { loginUser, registerUser, searchQuery } from "./services/api";
import "./App.css"; // Assurez-vous d'avoir ce CSS

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // 🔹 Scroll automatique
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  // ----------------- Login -----------------
  const handleLogin = async (nom, password) => {
    try {
      const res = await loginUser(nom, password);
      if (res.data.user) {
        setUser(res.data.user);
        setPage("chat");
      } else {
        alert(res.data.error || "Utilisateur non trouvé");
        setPage("register");
      }
    } catch (err) {
      console.error("Erreur login :", err);
    }
  };

  // ----------------- Register -----------------
  const handleRegister = async (nom, password, role = "agriculteur") => {
    try {
      const res = await registerUser(nom, password, role);
      setUser(res.data.user);
      setPage("chat");
    } catch (err) {
      console.error("Erreur inscription :", err);
    }
  };

  // ----------------- Envoyer message -----------------
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Ajouter message utilisateur
    setMessages((prev) => [...prev, { type: "user", content: message, user: user.nom }]);
    setMessage("");

    try {
      const res = await searchQuery(message, user._id);

      // 🔹 Retourner uniquement les noms des maladies
      const botMessage = res.data.results
        .map((r) => r.name || r.content)
        .join(", ");

      setMessages((prev) => [...prev, { type: "bot", content: botMessage, user: "Bot" }]);
    } catch (err) {
      setMessages((prev) => [...prev, { type: "bot", content: "Erreur lors de l'envoi.", user: "Bot" }]);
      console.error(err);
    }
  };

  const handleClear = () => setMessages([]);

  return (
    <div className="container">
      {/* Login */}
      {page === "login" && <Login onLogin={handleLogin} onRegister={() => setPage("register")} />}

      {/* Register */}
      {page === "register" && <Register onRegister={handleRegister} onLoginPage={() => setPage("login")} />}

      {/* Chat */}
      {page === "chat" && (
        <div className="chat-container" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <div className="chat-header">
            <h2>🌾 Maladies des céréales</h2>
            <button
              className="logout-button"
              onClick={() => {
                setUser(null);
                setMessages([]);
                setPage("login");
              }}
            >
              Déconnexion
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            <Results results={messages} />
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Tapez un message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => { if(e.key === "Enter") handleSendMessage(); }}
            />
            <button onClick={handleSendMessage}>Envoyer</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
