import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const text = "Great !";
const fulltext = `Perfect! Now you can start your journey on our platform. Enjoy it!`;

const Qfinished = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showFullText, setShowFullText] = useState(false);

  const animationDuration = text.length * 40;

  useEffect(() => {
    const fullTextTimer = setTimeout(() => {
      setShowFullText(true);
    }, 1000 + animationDuration + 50);
    return () => clearTimeout(fullTextTimer);
  }, [animationDuration]);

  const finish = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem('idUser', user.id);
    navigate("/home");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16042F",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <style>
        {`
          @keyframes wiggle {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(5deg); }
          }

          @keyframes bob {
            0% { transform: translateY(0); }
            100% { transform: translateY(-2px); }
          }

          #left-ear, #right-ear {
            transform-origin: center;
            animation: wiggle 1s ease-in-out infinite alternate;
          }

          #right-ear {
            animation-delay: 0.2s;
          }

          #nose {
            animation: bob 1.2s ease-in-out infinite alternate;
          }

          .typing {
            color: #804a97;
            white-space: pre-wrap;
            font-family: 'Inter', sans-serif;
            font-weight: bold;
            font-size: 1.7rem;
            border-radius: 10px;
            padding: 1rem;
            user-select: none;
          }

          .typing2 {
            font-family: 'Inter', sans-serif;
            font-size: 1.2rem;
            color: #fff;
            white-space: pre-wrap;
            border-radius: 10px;
            padding: 1rem;
            user-select: none;
            max-width: 600px;
            margin-top: 1rem;
          }

          .typing span, .typing2 span {
            opacity: 0;
            animation: fadeIn 0.08s forwards;
            display: inline-block;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .go-button {
            background: linear-gradient(45deg, #804a97, #a165b8);
            border: none;
            color: white;
            padding: 12px 28px;
            font-size: 1.2rem;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 0 8px #804a97;
            transition: filter 0.3s ease, box-shadow 0.3s ease;
            animation: brighten 3s ease-in-out infinite alternate;
            user-select: none;
            margin-top: 2rem;
          }

          .go-button:hover {
            filter: brightness(1.2);
            box-shadow: 0 0 15px #b993d6;
          }

          @keyframes brighten {
            0% { filter: brightness(1); box-shadow: 0 0 8px #804a97; }
            100% { filter: brightness(1.15); box-shadow: 0 0 12px #b993d6; }
          }

          @media (max-width: 768px) {
            .typing {
              font-size: 1.3rem;
              padding: 0.5rem;
            }

            .typing2 {
              font-size: 1rem;
              padding: 0.5rem;
            }

            .go-button {
              width: 90%;
              font-size: 1rem;
              padding: 10px 20px;
            }

            svg {
              width: 60px !important;
              height: auto;
            }
          }
        `}
      </style>

      <div className="logo" style={{ marginBottom: "2rem" }}>
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
      </div>

      {showWelcome && (
        <div className="typing">
          {text.split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 100}ms` }}>{char}</span>
          ))}
        </div>
      )}

      {showFullText && (
        <div className="typing2">
          {fulltext.split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 40}ms` }}>{char}</span>
          ))}
        </div>
      )}

      <button className="go-button" onClick={finish}>
        Let&apos;s Go
      </button>
    </div>
  );
};

export default Qfinished;
