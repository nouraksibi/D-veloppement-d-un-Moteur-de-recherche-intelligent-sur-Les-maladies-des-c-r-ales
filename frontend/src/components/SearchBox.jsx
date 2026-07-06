import { useState } from "react";

const SearchBox = ({ onSend }) => {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (!query.trim()) return;
    onSend(query);
    setQuery(""); // 🔹 vider le champ après envoi
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Tapez votre message..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend} style={styles.button}>
        Envoyer
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    borderRadius: "20px",
    border: "1px solid #cbd5e0",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#2b6cb0",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default SearchBox;
