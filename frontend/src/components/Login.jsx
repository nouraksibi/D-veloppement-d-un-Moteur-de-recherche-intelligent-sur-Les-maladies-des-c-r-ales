import { useState } from "react";
import { loginUser } from "../services/api";

const Login = ({ onLogin, onRegister }) => {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !password) return;

    try {
      const res = await loginUser(nom, password);

      if (res.data.user) {
        onLogin(nom, password); // 🔹 Appel de la fonction passée par App.js
      } else {
        alert(res.data.error || "Utilisateur non trouvé");
      }
    } catch (err) {
      console.error("Erreur login :", err);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Connexion</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>

      {/* Lien vers la page Register */}
      <p style={styles.registerText}>
        Don't have an account?{" "}
        <a
          href="#"
          style={{ color: "#4f46e5" }}
          onClick={(e) => {
            e.preventDefault();
            onRegister(); // 🔹 Naviguer vers la page Register
          }}
        >
          Sign up
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
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
  registerText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#718096",
    marginTop: "10px",
  },
};

export default Login;
