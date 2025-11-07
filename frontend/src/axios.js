// src/axios.js ou ton fichier de configuration Axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL de ton API Laravel
  withCredentials: true, // Permet l'envoi des cookies avec chaque requête
});

export default api;

