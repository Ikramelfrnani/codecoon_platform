// GlobalQuiz.jsx
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

// Import your resultatSlice actions
import { createResultat} from '../slices/resultatSlice';

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 10rem;
  text-align: center;
  padding: 2rem;
`;

const Titre = styled.h1`
  color: white;
  text-align: center;
  color: #6b0a83;
  letter-spacing: 2px;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SubTitre = styled.h3`
  margin-top: 1rem;
  text-align: center;
  opacity: 0.8;
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background-color: #8E44AD;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: box-shadow 0.3s ease-in-out;
  margin-top: 1rem;

  ${(props) =>
    props.glow &&
    `
    box-shadow: 0 0 15px 5px rgba(142, 68, 173, 0.7);
  `}

  &:hover {
    background-color: #a45ee5;
  }
`;

const Logo = styled.div`
  svg {
    width: 100px;
  }

  #left-ear,
  #right-ear {
    transform-origin: center;
    animation: wiggle 1s ease-in-out infinite alternate;
  }

  #right-ear {
    animation-delay: 0.2s;
  }

  #nose {
    animation: bob 1.2s ease-in-out infinite alternate;
  }

  @keyframes wiggle {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(5deg); }
  }

  @keyframes bob {
    0% { transform: translateY(0); }
    100% { transform: translateY(-2px); }
  }

  @media (max-width: 768px) {
    svg {
      width: 60px !important;
      height: auto;
    }
  }
`;

export default function GlobalQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const quizId = location.state?.quizId;
  const nom_langage = location.state?.nom_langage || "Unknown";

  const [glow, setGlow] = useState(false);
  const glowTimeoutRef = useRef(null);
  const glowIntervalRef = useRef(null);

  // Start glowing effect
  useEffect(() => {
    glowTimeoutRef.current = setTimeout(() => {
      setGlow(true);
      setTimeout(() => setGlow(false), 1000);

      glowIntervalRef.current = setInterval(() => {
        setGlow(true);
        setTimeout(() => setGlow(false), 1000);
      }, 5000);
    }, 4000);

    return () => {
      clearTimeout(glowTimeoutRef.current);
      clearInterval(glowIntervalRef.current);
    };
  }, []);

  const handleBegin = () => {
    const utilisateur_id = localStorage.getItem('utilisateur_id');

    if (!quizId || !utilisateur_id) {
      alert("Missing quiz or user ID");
      return;
    }

    // Create initial result with score = 0
    dispatch(createResultat({ utilisateurId: utilisateur_id, quizId, score: 0 }));

    // Navigate to quiz page with state
    navigate(`/global-quiz/start/${id}`, {
      state: {
        quizId: quizId,
        nomLangage: nom_langage,
      },
    });
  };

  return (
    <>
      <Container>
        <Logo>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.69 56.69" width="80">
            <defs>
              <style>{`.cls-1{fill:#804a97;}.cls-2{fill:#fff;}`}</style>
            </defs>
            <path className="cls-1" d="M7.28,17.47v5.89L29.79,8.78,52.3,23.36V17.18L32.54,4.05s-3-1.45-5.43.08Z" />
            <polygon id="left-ear" className="cls-1" points="10.2 15.29 8.93 5.94 19.45 8.96 10.2 15.29" />
            <polygon id="right-ear" className="cls-1" points="40.12 8.87 50.55 5.94 49.47 15.1 40.12 8.87" />
            <polygon id="nose" className="cls-1" points="26.32 27.9 33.26 27.9 29.79 31.08 26.32 27.9" />
            <polygon className="cls-2" points="32.52 16.43 32.52 22.54 42.58 28.7 32.52 34.88 32.52 40.97 46.59 31.77 46.59 25.68 32.52 16.43" />
            <polygon className="cls-2" points="27.1 16.43 27.1 22.52 17.04 28.7 27.1 34.86 27.1 40.97 13.03 31.72 13.03 25.63 27.1 16.43" />
          </svg>
        </Logo>
        <Titre>Welcome to {nom_langage} Final Quiz</Titre>
        <SubTitre>
          One final challenge stands between you and your {nom_langage} badge. Ready to conquer it?
        </SubTitre>
        <Button onClick={handleBegin} glow={glow}>
          Begin
        </Button>
      </Container>
    </>
  );
}