import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progression, setProgression] = useState({});
  const [progressParLangage, setProgressParLangage] = useState({});
  const [miniQuizScores, setMiniQuizScores] = useState({});
  const [globalQuizScores, setGlobalQuizScores] = useState({}); // ✅ new
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });
  const hasFetched = useRef(false);

  // Sync with localStorage changes across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        try {
          const newUser = event.newValue ? JSON.parse(event.newValue) : null;
          if (JSON.stringify(newUser) !== JSON.stringify(user)) {
            setUser(newUser);
          }
        } catch (error) {
          console.error("Error parsing user data from storage event:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  // Handle in-tab changes with periodic check
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const currentUser = localStorage.getItem('user');
        const parsedUser = currentUser ? JSON.parse(currentUser) : null;
        if (JSON.stringify(parsedUser) !== JSON.stringify(user)) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error checking user data:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  // Main progress data fetching effect
  useEffect(() => {
    if (!user?.id) {
      if (
        Object.keys(progression).length > 0 ||
        Object.keys(progressParLangage).length > 0 ||
        Object.keys(miniQuizScores).length > 0 ||
        Object.keys(globalQuizScores).length > 0
      ) {
        setProgression({});
        setProgressParLangage({});
        setMiniQuizScores({});
        setGlobalQuizScores({}); // ✅ clear if logged out
      }
      hasFetched.current = false;
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProgressData = async () => {
      console.log(`Fetching progress for user ${user.id}`);
      try {
        const [resChapitres, resLangages, resResultats] = await Promise.all([
          axios.get(`http://localhost:8000/api/progressions?user_id=${user.id}`),
          axios.get(`http://localhost:8000/api/progressions/langage/${user.id}`),
          axios.get(`http://localhost:8000/api/resultats/by-user-with-quiz?utilisateur_id=${user.utilisateur_id}`)
        ]);

        // Build progression map
        const progObj = {};
        resChapitres.data.forEach(p => {
          progObj[p.chapitre_id] = p.valeur;
        });

        // Build mini and global quiz score maps
        const quizScoreMap = {};
        const globalQuizMap = {};

        resResultats.data.forEach(result => {
          if (!result.quiz) return;

          if (result.quiz.chapitre_id) {
            quizScoreMap[result.quiz.chapitre_id] = result.score;
          }

          if (result.quiz.type === 'global' && result.score > 0) {
            globalQuizMap[result.quiz.langage_id] = result.score;
          }
        });

        setProgression(progObj);
        setProgressParLangage(resLangages.data);
        setMiniQuizScores(quizScoreMap);
        setGlobalQuizScores(globalQuizMap); // ✅ set global quiz scores
      } catch (err) {
        console.error("Error loading progress:", err);
        hasFetched.current = false;
      }
    };

    fetchProgressData();
  }, [user?.id]);

  const updateProgression = (chapitreId, valeur) => {
    if (!user?.id) {
      console.error("No user logged in, cannot update progression");
      return;
    }

    setProgression(prev => ({
      ...prev,
      [chapitreId]: valeur,
    }));

    axios.post('http://localhost:8000/api/progressions', {
      user_id: user.id,
      chapitre_id: chapitreId,
      valeur: valeur,
    })
      .then(() => {
        axios.get(`http://localhost:8000/api/progressions/langage/${user.id}`)
          .then(res => setProgressParLangage(res.data))
          .catch(err => console.error("Error refreshing language progress:", err));
      })
      .catch(err => {
        console.error("Error updating progression:", err);
        setProgression(prev => ({
          ...prev,
          [chapitreId]: prev[chapitreId]
        }));
      });
  };

  const refreshProgressionLangages = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/progressions/langage/${user.id}`);
      setProgressParLangage(res.data);
    } catch (err) {
      console.error("Error refreshing language progress:", err);
    }
  };

  return (
    <ProgressContext.Provider value={{
      progression,
      progressParLangage,
      updateProgression,
      refreshProgressionLangages,
      currentUserId: user?.id,
      miniQuizScores,
      globalQuizScores // ✅ exposed here
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
