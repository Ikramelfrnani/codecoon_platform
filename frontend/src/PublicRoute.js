// src/PublicRoute.js
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem('idUser');

  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;