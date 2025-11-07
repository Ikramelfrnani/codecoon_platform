import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from '../Components/ProgressContext';
import './Learn.css';
import NavBar from '../Components/Navbar';
import ProgressCircle from '../Components/ProgressCircle';
import { useDispatch } from 'react-redux';
import { fetchScoreByUserAndQuiz } from '../slices/resultatSlice';
import Loader from '../Components/Loader';

const Learn = () => {
  const { id } = useParams();
  const location = useLocation();
  const languageName = location.state?.nom_langage || "Unknown";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [completedSubchapters, setCompletedSubchapters] = useState(new Set());

  const { progression, miniQuizScores, globalQuizScores } = useProgress();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chapitres/langage/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setChapters(response.data);
        } else {
          setError('Unexpected data format');
        }
      })
      .catch(() => {
        setError('Failed to load chapters');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setActiveChapter(null);
  }, [id]);

  const getSubChapters = useMemo(() => {
    const map = {};
    chapters.forEach(chap => {
      if (!map[chap.parent_id]) map[chap.parent_id] = [];
      map[chap.parent_id].push(chap);
    });
    return (parentId) => map[parentId] || [];
  }, [chapters]);

  const updateUserEnergy = async (pointsToAdd) => {
    try {
      const utilisateur_id = localStorage.getItem('utilisateur_id');
      if (!utilisateur_id) return;

      const response = await axios.get(`http://localhost:8000/api/utilisateurs/${utilisateur_id}`);
      const currentUser = response.data;
      const currentEnergy = currentUser.points_energie || 0;

      await axios.put(`http://localhost:8000/api/utilisateurs/${utilisateur_id}`, {
        ...currentUser,
        points_energie: currentEnergy + pointsToAdd
      });
    } catch (err) {
      console.error('Error updating user energy:', err);
    }
  };

  const handleChapterClick = (chapterId) => {
    setActiveChapter((prevId) => (prevId === chapterId ? null : chapterId));
  };

  const handleSubChapterClick = async (chapterId) => {
    if (!completedSubchapters.has(chapterId)) {
      await updateUserEnergy(10);
      setCompletedSubchapters(prev => new Set(prev).add(chapterId));
    }

    navigate(`/cours/${chapterId}`, { state: { chapitres: chapters, nom_langage: languageName } });
  };

  const handleQuizClick = async () => {
    try {
      const utilisateur_id = localStorage.getItem('utilisateur_id');
      if (!utilisateur_id) {
        alert('Please login to take the quiz');
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/quizzes/langage/${id}`);
      const quiz = response.data.quiz;
      const nomLangage = response.data.nom_langage;

      const resultAction = await dispatch(fetchScoreByUserAndQuiz({
        utilisateurId: utilisateur_id,
        quizId: quiz.id
      }));

      if (fetchScoreByUserAndQuiz.fulfilled.match(resultAction)) {
        navigate(`/global-quiz/review/${id}`, {
          state: {
            quizId: quiz.id,
            nom_langage: nomLangage,
            score: resultAction.payload.score
          },
        });
      } else {
        navigate(`/global-quiz/${id}`, {
          state: {
            quizId: quiz.id,
            nom_langage: nomLangage
          }
        });
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to proceed to quiz. Please try again.');
    }
  };

  const calculateTotalProgress = () => {
    const parents = chapters.filter(chap => chap.parent_id === null);
    let total = 0;
    let completed = 0;

    parents.forEach(parent => {
      const subChaps = getSubChapters(parent.id);
      const done = progression[parent.id] || 0;
      const quizScore = miniQuizScores[parent.id] || 0;
      const quizDone = quizScore === 100 ? 1 : 0;
      completed += done + quizDone;
      total += subChaps.length + 1;
    });

    total += 1;

    const globalQuizEntered = globalQuizScores[id] !== undefined;
    if (globalQuizEntered) {
      completed += 1;
    }

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const totalProgress = useMemo(() => calculateTotalProgress(), [progression, chapters]);

  const renderChapters = () => {
    const parents = chapters.filter((chap) => chap.parent_id === null);
    return parents.map((chap, index) => {
      const chapterNumber = (index + 1).toString().padStart(2, '0');
      const subChapters = getSubChapters(chap.id);
      const prevChap = parents[index - 1];
      const prevProgress = prevChap ? (progression[prevChap.id] || 0) : Infinity;
      const prevTotal = prevChap ? getSubChapters(prevChap.id).length : 0;
      const prevMiniQuizScore = prevChap ? miniQuizScores[prevChap.id] || 0 : 100;
      const isPrevQuizPassed = prevMiniQuizScore === 100;
      const isLocked = index > 0 && (prevProgress < prevTotal || !isPrevQuizPassed);
      const isActive = activeChapter === chap.id;

      return (
        <div key={chap.id} className="chapitre-card">
          <div
            className={`chapitre-header ${isLocked ? 'locked' : ''}`}
            onClick={() => !isLocked && handleChapterClick(chap.id)}
            style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
          >
            <span className="ordre-number">{chapterNumber}</span>
            <h4>{chap.titre_chapitre}</h4>
            <div className="status-container">
              {isLocked ? (
                <span className="lock-icon" title="Chapter locked">🔒</span>
              ) : (
                (() => {
                  const quizCompleted = miniQuizScores[chap.id] === 100 ? 1 : 0;
                  const totalItems = subChapters.length + 1;
                  const currentProgressWithQuiz = (progression[chap.id] || 0) + quizCompleted;
                  return (
                    <span className="progress">{`${currentProgressWithQuiz} / ${totalItems}`}</span>
                  );
                })()
              )}
            </div>
          </div>
          {!isLocked && isActive && subChapters.length > 0 && (
            <div className="subchapitres">
              {subChapters.map((sub) => (
                <div
                  key={sub.id}
                  className="subchapitre"
                  onClick={() => handleSubChapterClick(sub.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="subchapitre-title">{sub.titre_chapitre}</span>
                </div>
              ))}
              <div
                className="subchapitre"
                style={{ cursor: 'pointer' }}
                onClick={async () => {
                  try {
                    const response = await axios.get(`http://localhost:8000/api/quizzes/chapitre/${chap.id}`);
                    const quiz = response.data;
                    navigate('/mini-quiz', {
                      state: {
                        quizId: quiz.id,
                        nom_chapitre: chap.titre_chapitre,
                        langage_id: id
                      }
                    });
                  } catch (err) {
                    console.error('Failed to fetch mini quiz:', err);
                    alert('Mini quiz is not available for this chapter.');
                  }
                }}
              >
                <span className="subchapitre-title">Mini quiz</span>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <NavBar />
      <div className="learn-container">
        <div className="learn-header">
          <h2 className="learn-title">Language: {languageName}</h2>
          <div className="progress-circle-wrapper">
            <ProgressCircle percentage={totalProgress} language={languageName} />
          </div>
        </div>
        <h6 className="learn-subtitle">LESSONS</h6>
        {chapters.length === 0 ? <p>No chapters found.</p> : renderChapters()}
        <h6 className="learn-subtitle">FINAL QUIZ</h6>
        {(() => {
          const parents = chapters.filter(chap => chap.parent_id === null);
          const allChaptersComplete = parents.every(parent => {
            const totalSubs = getSubChapters(parent.id).length;
            const doneSubs = progression[parent.id] || 0;
            const quizScore = miniQuizScores[parent.id] || 0;
            return totalSubs > 0 && doneSubs === totalSubs && quizScore === 100;
          });
          const isGlobalQuizLocked = !allChaptersComplete;
          return (
            <div
              className={`chapitre-header ${isGlobalQuizLocked ? 'locked' : ''}`}
              style={{ cursor: isGlobalQuizLocked ? 'not-allowed' : 'pointer' }}
              onClick={() => {
                if (!isGlobalQuizLocked) handleQuizClick();
              }}
            >
              <span className="ordre-number">05</span>
              <h4>Global Quiz</h4>
              <div className="status-container">
                {isGlobalQuizLocked ? (
                  <span className="lock-icon" title="Finish all chapters first">🔒</span>
                ) : (
                  <span className="progress"></span>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
};

export default Learn;
