import React from "react";
import "./ProgressCircle.css";

const badgeImages = {
  html: "/images/HTMLBadge.svg",
  javascript: "/images/JSBadge.svg",
  css: "/images/CSSBadge.svg",
  react: "/images/ReactBadge.svg",
  python: "/images/PythonBadge.svg",
  laravel: "/images/LaravelBadge.svg",
  php: "/images/PHPBadge.svg",
  sql: "/images/SQLBadge.svg",
};

const ProgressCircle = ({ percentage = 0, language = "html" }) => {
  const badgeSrc = badgeImages[language.toLowerCase()] || "/images/default.svg";

  const radius = 45;
  const strokeWidth = 6;
  const viewBoxSize = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-circle-wrapper">
      <svg
        width={viewBoxSize}
        height={viewBoxSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="progress-circle-svg"
      >
        {/* Fond */}
        <circle
          r={radius}
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          fill="none"
          stroke="var(--color-border-light)"
          strokeWidth={strokeWidth}
        />

        {/* Progression */}
        <circle
          r={radius}
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          fill="none"
          stroke="var(--color-highlight)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
          className="progress-circle-stroke"
        />
      </svg>

      <img src={badgeSrc} alt={`${language} badge`} className="badge-img" />
      <div className="progress-hover-overlay" />
      <div className="progress-percent">{percentage}%</div>
    </div>
  );
};

export default ProgressCircle;
