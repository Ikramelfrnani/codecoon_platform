// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../Components/Navbar';
// import ProgressCard from '../Components/ProgressCard';
// import { useProgress } from '../Components/ProgressContext';
// import './LangageCard.css';

// const LangageCards = () => {
//   const { progression, progressParLangage } = useProgress();
//   const [languages, setLanguages] = useState([]);
//   const [openedLangs, setOpenedLangs] = useState([]);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   axios.get('http://localhost:8000/api/langages')
//   //     .then(response => setLanguages(response.data))
//   //     .catch(error => console.error("Erreur fetch langages:", error));

//   //   const savedOpened = JSON.parse(localStorage.getItem('openedLangs')) || [];
//   //   setOpenedLangs(savedOpened);
//   // }, []);
// useEffect(() => {
//   axios.get('http://localhost:8000/api/langages')
//     .then(response => setLanguages(response.data))
//     .catch(error => console.error("Erreur fetch langages:", error));

//   const userId = localStorage.getItem('utilisateur_id');
//   const savedOpened = JSON.parse(localStorage.getItem(`openedLangs_${userId}`)) || [];
//   setOpenedLangs(savedOpened);
// }, []);

//   const getLevelIcon = (level) => {
//     switch (level) {
//       case 'Beginner friendly':
//         return '/images/network-cellular-signal-weak-svgrepo-com (1).svg';
//       case 'Intermediate':
//         return '/images/network-cellular-signal-ok-svgrepo-com (1).svg';
//       case 'Exellent': // Vérifie si c'est "Excellent" et corrige si besoin
//         return '/images/network-cellular-signal-excellent-svgrepo-com (2).svg';
//       default:
//         return null;
//     }
//   };

//   const handleClick = async (langId, langName) => {
//     const userId = localStorage.getItem('utilisateur_id');
//     if (!userId) {
//       console.error("Utilisateur non connecté.");
//       return;
//     }

//     // setOpenedLangs(prev => {
//     //   if (prev.includes(langId)) return prev;
//     //   const updated = [...prev, langId];
//     //   localStorage.setItem('openedLangs', JSON.stringify(updated));
//     //   return updated;
//     // });
// setOpenedLangs(prev => {
//   if (prev.includes(langId)) return prev;
//   const updated = [...prev, langId];
//   const userId = localStorage.getItem('utilisateur_id');
//   localStorage.setItem(`openedLangs_${userId}`, JSON.stringify(updated));
//   return updated;
// });

//     try {
//       await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
//       await axios.post('http://localhost:8000/api/utilisateur/langue', {
//         utilisateur_id: userId,
//         langue_choisi: langName,
//       }, { withCredentials: true });

//       navigate(`/home/${langId}`, { state: { nom_langage: langName } });
//     } catch (error) {
//       console.error("Erreur mise à jour langage choisi:", error);
//       navigate(`/home/${langId}`, { state: { nom_langage: langName } });
//     }
//   };

//   const openedLanguagesData = languages.filter(lang => openedLangs.includes(lang.id));

//   return (
//     <>
//       <NavBar />
//       <h1 className="page-title">Courses</h1>

//       {openedLanguagesData.length > 0 && (
//         <div
//           className="progress-cards-top"
//           style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}
//         >
//           {openedLanguagesData.map(lang => (
//             <ProgressCard
//               key={lang.id}
//               type="COURSE"
//               language={lang.nom_langage}
//               progress={progressParLangage[lang.id] || 0}
//               total={100} 
//               badgeSrc={lang.image_badge}
//             />
//           ))}
//         </div>
//       )}

//       <div className="langage-cards-container">
//         {languages.map(language => (
//           <div
//             key={language.id}
//             className="langage-card"
//             onClick={() => handleClick(language.id, language.nom_langage)}
//             style={{ cursor: 'pointer' }}
//           >
//             <div className="langage-card-header">
//               <div className="langage-card-header-text">
//                 <span className="langage-card-label">COURSE</span>
//                 <h3 className="langage-card-title">{language.nom_langage}</h3>
//               </div>
//               <img
//                 src={language.image_badge}
//                 alt={language.nom_langage}
//                 className="langage-card-image"
//               />
//             </div>

//             <p className="langage-card-description">{language.description_langage}</p>

//             <div className="langage-card-footer">
//               <div className="langage-card-badge">
//                 {getLevelIcon(language.niveau) && (
//                   <img
//                     src={getLevelIcon(language.niveau)}
//                     alt={language.niveau}
//                     className="langage-card-icon-image"
//                   />
//                 )}
//                 <span>{language.niveau}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default LangageCards;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/Navbar';
import ProgressCard from '../Components/ProgressCard';
import { useProgress } from '../Components/ProgressContext';
import './LangageCard.css';
import Loader from '../Components/Loader';

const LangageCards = () => {
  const { progression, progressParLangage ,refreshProgressionLangages} = useProgress();
  const [languages, setLanguages] = useState([]);
  const [openedLangs, setOpenedLangs] = useState([]);
  const navigate = useNavigate();

  // Mapping des badges à utiliser uniquement pour les ProgressCard (progression en haut)
  const badgeMap = {
    HTML: "/images/HTMLBadge.svg",
    CSS: "/images/CSSBadge.svg",
    JavaScript: "/images/JSBadge.svg",
    Python: "/images/PythonBadge.svg",
    PHP: "/images/PHPBadge.svg",
    Laravel: "/images/LaravelBadge.svg",
    React: "/images/ReactBadge.svg",
    SQL: "/images/SQLBadge.svg",
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/langages')
      .then(response => setLanguages(response.data))
      .catch(error => console.error("Erreur fetch langages:", error));
refreshProgressionLangages();
    const userId = localStorage.getItem('utilisateur_id');
    const savedOpened = JSON.parse(localStorage.getItem(`openedLangs_${userId}`)) || [];
    setOpenedLangs(savedOpened);
  }, []);

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Beginner friendly':
        return '/images/network-cellular-signal-weak-svgrepo-com (1).svg';
      case 'Intermediate':
        return '/images/network-cellular-signal-ok-svgrepo-com (1).svg';
      case 'Excellent':
        return '/images/network-cellular-signal-excellent-svgrepo-com (2).svg';
      default:
        return null;
    }
  };

  const handleClick = async (langId, langName) => {
    const userId = localStorage.getItem('utilisateur_id');
    if (!userId) {
      console.error("Utilisateur non connecté.");
      return;
    }

    setOpenedLangs(prev => {
      if (prev.includes(langId)) return prev;
      const updated = [...prev, langId];
      localStorage.setItem(`openedLangs_${userId}`, JSON.stringify(updated));
      return updated;
    });

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
      await axios.post('http://localhost:8000/api/utilisateur/langue', {
        utilisateur_id: userId,
        langue_choisi: langName,
      }, { withCredentials: true });

      navigate(`/home/${langId}`, { state: { nom_langage: langName } });
    } catch (error) {
      console.error("Erreur mise à jour langage choisi:", error);
      navigate(`/home/${langId}`, { state: { nom_langage: langName } });
    }
  };

  // Filtrer les langages déjà ouverts pour la barre de progression
  const openedLanguagesData = languages.filter(lang => openedLangs.includes(lang.id));
  if (languages.length === 0) { //loader
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  return (
    <>
      <NavBar />
      
      {openedLanguagesData.length > 0 && (
        <div
          className="progress-cards-top"
          
        >
          {openedLanguagesData.map(lang => (
            <ProgressCard
              key={lang.id}
              type="COURSE"
              language={lang.nom_langage}
              progress={progressParLangage[lang.id] || 0}
              total={100}
              // Ici on utilise badgeMap pour remplacer badgeSrc dans les ProgressCard seulement
              badgeSrc={badgeMap[lang.nom_langage] || lang.image_badge || '/image/default-badge.svg'}
            />
          ))}
        </div>
      )}
      <h1 className="h1">Courses</h1>

      <div className="langage-cards-container">
        {languages.map(language => (
          <div
            key={language.id}
            className="langage-card"
            onClick={() => handleClick(language.id, language.nom_langage)}
            style={{ cursor: 'pointer' }}
          >
            <div className="langage-card-header">
              <div className="langage-card-header-text">
                <span className="langage-card-label">COURSE</span>
                <h3 className="langage-card-title">{language.nom_langage}</h3>
              </div>
              <img
                src={language.image_badge}
                alt={language.nom_langage}
                className="langage-card-image"
              />
            </div>

            <p className="langage-card-description">{language.description_langage}</p>

            <div className="langage-card-footer">
              <div className="langage-card-badge">
                {getLevelIcon(language.niveau) && (
                  <img
                    src={getLevelIcon(language.niveau)}
                    alt={language.niveau}
                    className="langage-card-icon-image"
                  />
                )}
                <span>{language.niveau}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LangageCards;
