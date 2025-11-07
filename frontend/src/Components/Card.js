import React from 'react';
import './Card.css';

export default function Card({ title, description, image }) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={image} alt={title} className="card-image" />
        <button className="card-button">COURSE</button>
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}
