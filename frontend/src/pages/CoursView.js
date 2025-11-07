import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useProgress } from '../Components/ProgressContext';
import './CoursView.css';
import SelectorEditor from '../Components/SelectorEditor';
import TextPropertiesEditor from '../Components/TextPropertiesEditor';
import CssUnitsEditor from '../Components/CssUnitsEditor';
import ColorPropertiesEditor from '../Components/ColorPropertiesEditor';
import BoxModelEditor from '../Components/BoxModelEditor';
import FlexboxEditor from '../Components/FlexboxEditor';
import Loader from '../Components/Loader'; // ✅ Import du loader

const CoursView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const chapitres = location.state?.chapitres || [];
  const nom_langage = location.state?.nom_langage || "Langage inconnu";

  const [contenus, setContenus] = useState([]);
  const [index, setIndex] = useState(0);
  const { progression, updateProgression } = useProgress();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cours/chapitre/${id}`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.ordre_contenu - b.ordre_contenu);
        setContenus(sorted);
        setIndex(0);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement du contenu:', error);
      });
  }, [id]);

  useEffect(() => {
    if (contenus.length === 0) return;
    const chapitreId = Number(id);
    const current = progression[chapitreId] || 0;
    const viewed = index + 1;
    if (viewed > current) {
      updateProgression(chapitreId, viewed);
    }
  }, [index, id, contenus.length, progression, updateProgression]);

  const next = () => {
    if (index + 1 < contenus.length) {
      setIndex((prev) => prev + 1);
    } else {
      const currentChapter = chapitres.find((chap) => chap.id === Number(id));
      const parentId = currentChapter?.parent_id;
      if (parentId) {
        const subchapters = chapitres.filter((chap) => chap.parent_id === parentId);
        const total = subchapters.length;
        const current = progression[parentId] || 0;
        const updated = Math.min(current + 1, total);
        updateProgression(parentId, updated);
      }
      const langageId = chapitres.find((chap) => chap.id === parentId)?.langage_id;
      navigate(`/home/${langageId}`, { state: { chapitres, nom_langage } });
    }
  };

  const previous = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  const renderContent = (contenu) => {
    console.log("📦 contenu.chemin:", contenu.chemin);
    switch (contenu.type_contenu) {
      case 'texte':
        return <p style={{width: '50%',marginTop:'7%'}}>{contenu.texte}</p>;
      case 'select editor':
        return <p><SelectorEditor /></p>;
      case 'text editor':
        return <p><TextPropertiesEditor /></p>;
      case 'unit editor':
        return <p><CssUnitsEditor /></p>;
      case 'color editor':
        return <p><ColorPropertiesEditor /></p>;
      case 'box editor':
        return <p><BoxModelEditor /></p>;
      case 'flex box editor':
        return <p><FlexboxEditor /></p>;
      case 'select video':
      case 'color video':
        return (
          <video
            controls
            width="50%"
            poster="/images/CodeCoon_Logo.svg"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              objectFit: "cover",
            }}
          >
            <source src={`http://localhost:8000/storage/video/${contenu.chemin}`} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        );
      case 'image':
        return (
          <img
            src={`http://localhost:8000/storage/image/${contenu.chemin}`}
            alt="Contenu"
            style={{ maxWidth: '100%' }}
          />
        );
      default:
        return <p>Type de contenu inconnu</p>;
    }
  };

  // 🔄 Loader tant que le contenu est vide
  if (contenus.length === 0) return <Loader />;

  return (
    <>
      <button
        className="header-close"
        onClick={() => {
          const currentChapter = chapitres.find((chap) => chap.id === Number(id));
          const langageId = currentChapter?.langage_id || 1;
          navigate(`/home/${langageId}`, { state: { chapitres, nom_langage } });
        }}
      >
        ✕
      </button>

      <div className="cours-container">
        {renderContent(contenus[index])}
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${((index + 1) / contenus.length) * 100}%` }}
        ></div>
      </div>

      <div className="bottom-bar">
        <div className="progress-line">
          ← {index + 1} / {contenus.length}
        </div>
        <div style={{marginRight:'5%'}}>
          <button className="previous-button" onClick={previous} disabled={index === 0}>
            ← Previous
          </button>
          <button className="continue-button" onClick={next}>
            Continue →
          </button>
        </div>
      </div>
    </>
  );
};

export default CoursView;
