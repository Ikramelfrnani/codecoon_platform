import React from 'react';
import { Navigate } from 'react-router-dom';

export default function UserOnlyRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  // Si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est un admin, il ne doit PAS accéder aux pages utilisateurs
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  // Si c’est un utilisateur normal, on autorise l’accès
  return children;
}
