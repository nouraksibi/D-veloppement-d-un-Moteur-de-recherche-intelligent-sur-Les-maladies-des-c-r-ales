const UserProfile = ({ user }) => (
  <div style={styles.container}>
    <p style={styles.item}><strong>Nom :</strong> {user.nom}</p>
    <p style={styles.item}><strong>Rôle :</strong> {user.role}</p>
    <p style={styles.item}><strong>ID :</strong> {user._id}</p>
  </div>
);

const styles = {
  container: {
    backgroundColor: "#ffffff",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "15px",
    borderLeft: "4px solid #2f855a",
  },
  item: {
    margin: "5px 0",
    fontSize: "1rem",
    color: "#2d3748",
  },
};

export default UserProfile;
