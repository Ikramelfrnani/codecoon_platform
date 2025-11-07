import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);  // <-- ajoute cette ligne

  useEffect(() => {
    axios.get("http://localhost:8000/api/users")
      .then((response) => {
        console.log("Réponse API:", response.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Erreur inconnue"); // corrige l’accès à message
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (error) return <div style={{ color: "red", padding: "2rem" }}>Erreur : {error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
