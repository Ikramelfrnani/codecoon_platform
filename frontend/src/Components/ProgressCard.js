import React from "react";
import "./ProgressCard.css";

const ProgressCard = ({ type, language, progress, total, badgeSrc }) => {
const percent = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <div className="progress-card">
      <div className="card-header">
        <div className="header-texts">
          <span className="course-type">{type}</span>
          <span className="language-name">{language}</span>
        </div>
        {badgeSrc && <img src={badgeSrc} alt={`${language} icon`} className="badge" />}
      </div>

      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${percent}%` }} />
      </div>

      <div className="progress-info">
        <span>{percent}% complete</span>
      </div>
    </div>
  );
};

export default ProgressCard;
