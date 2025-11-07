import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const RedirectToPreferredLanguage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('idUser');

    if (!userId) {
      console.error("User ID not found in localStorage.");
      navigate('/langages', { replace: true });
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8000/api/utilisateur-preference-langage/${userId}`, {
      withCredentials: true
    })
    .then(res => {
      const { langage_id, nom_langage } = res.data;

      if (langage_id) {
        navigate(`/home/${langage_id}`, { state: { nom_langage } });
      } else {
        // Pas de langue préférée, redirection vers sélection
        navigate('/langages', { replace: true });
      }
    })
    .catch(err => {
      console.error("Error fetching preferred language:", err);
      navigate('/langages', { replace: true });
    })
    .finally(() => setLoading(false));
  }, [navigate]);

  return loading ? <div><Loader/></div> : null;
};

export default RedirectToPreferredLanguage;
