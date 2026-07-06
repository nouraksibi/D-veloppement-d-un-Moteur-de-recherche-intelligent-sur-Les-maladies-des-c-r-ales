import { useState } from "react";
import { registerUser } from "../services/api";

const Register = ({ onLoginPage }) => { // 🔹 on ne passe plus onRegister
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nom || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      await registerUser(nom, password, "agriculteur"); // enregistrement
      alert("Inscription réussie ! Veuillez vous connecter.");
      onLoginPage(); // 🔹 redirige vers Login après inscription
    } catch (err) {
      console.error("Erreur inscription :", err);
      alert(err.response?.data?.error || "Erreur inscription");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📝 Inscription</h3>
      <input
        type="text"
        placeholder="Nom de l'utilisateur"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>
        S'inscrire
      </button>

      {/* Lien vers la page login */}
      <p style={styles.loginText}>
        Already have an account?{" "}
        <a
          href="#"
          style={{ color: "#4f46e5" }}
          onClick={(e) => {
            e.preventDefault();
            onLoginPage();
          }}
        >
          Login
        </a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#ffffff",
    padding: "30px 25px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    margin: "50px auto",
  },
  title: {
    textAlign: "center",
    color: "#2f855a",
    fontSize: "1.8rem",
    marginBottom: "10px",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid #cbd5e0",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#2f855a",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s",
  },
  loginText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#718096",
    marginTop: "10px",
  },
};

export default Register;
