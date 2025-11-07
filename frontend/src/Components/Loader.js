import React from "react";

const Loader = () => {
  return (
    <div style={{
      background: "#16042F",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
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
        `}
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.69 56.69" width="80">
        <defs>
          <style>
            {`.cls-1{fill:#804a97;}.cls-2{fill:#fff;}`}
          </style>
        </defs>

        <path className="cls-1" d="M7.28,17.47v5.89L29.79,8.78,52.3,23.36V17.18L32.54,4.05s-3-1.45-5.43.08Z"/>

        {/* Ears */}
        <polygon id="left-ear" className="cls-1" points="10.2 15.29 8.93 5.94 19.45 8.96 10.2 15.29"/>
        <polygon id="right-ear" className="cls-1" points="40.12 8.87 50.55 5.94 49.47 15.1 40.12 8.87"/>

        {/* Nose */}
        <polygon id="nose" className="cls-1" points="26.32 27.9 33.26 27.9 29.79 31.08 26.32 27.9"/>

        {/* Other parts */}
        <polygon className="cls-2" points="32.52 16.43 32.52 22.54 42.58 28.7 32.52 34.88 32.52 40.97 46.59 31.77 46.59 25.68 32.52 16.43"/>
        <polygon className="cls-2" points="27.1 16.43 27.1 22.52 17.04 28.7 27.1 34.86 27.1 40.97 13.03 31.72 13.03 25.63 27.1 16.43"/>
      </svg>
    </div>
  );
};

export default Loader;
