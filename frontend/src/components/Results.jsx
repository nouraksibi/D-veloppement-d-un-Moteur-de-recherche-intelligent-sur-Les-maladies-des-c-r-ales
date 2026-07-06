import React from "react";

const Results = ({ results }) => {
  return (
    <div style={styles.container}>
      {results.length === 0 && <p style={styles.noResults}>Aucun message</p>}

      {results.map((res, index) => (
        <div
          key={index}
          style={{
            ...styles.message,
            alignSelf: res.type === "user" ? "flex-end" : "flex-start",
            backgroundColor: res.type === "user" ? "#0b93f6" : "#f1f0f0",
            color: res.type === "user" ? "white" : "black",
            borderBottomRightRadius: res.type === "user" ? 0 : 18,
            borderBottomLeftRadius: res.type === "bot" ? 0 : 18,
          }}
        >
          <p style={styles.userName}>{res.user}</p>
          <p style={styles.messageContent}>{res.content}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#e5ddd5", // fond style WhatsApp
  },
  message: {
    padding: "8px 12px",
    borderRadius: 18,
    maxWidth: "70%",
    wordBreak: "break-word",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    display: "inline-block",
  },
  userName: {
    fontSize: "0.7rem",
    fontWeight: "bold",
    marginBottom: "3px",
  },
  messageContent: {
    margin: 0,
  },
  noResults: {
    textAlign: "center",
    color: "#555",
    fontStyle: "italic",
  },
};

export default Results;
