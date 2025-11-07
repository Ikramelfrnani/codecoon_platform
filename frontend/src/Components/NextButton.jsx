import { useProgress } from './ProgressContext';

const NextButton = ({ chapitreId, valeurSuivante }) => {
  const { updateProgression, refreshProgressionLangages } = useProgress();

  const handleClick = () => {
    updateProgression(chapitreId, valeurSuivante);

    // 🔁 Recharger les données de progression par langage
    setTimeout(() => {
      refreshProgressionLangages();
    }, 500); // petit délai si besoin
  };

  return <button onClick={handleClick}>Suivant</button>;
};
