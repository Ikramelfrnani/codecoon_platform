import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import NavBar from '../Components/Navbar';

function Badges() {
  const [badges, setBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [userName, setUserName] = useState('');
  const badgeRef = useRef(null);
  const utilisateur_id = localStorage.getItem('utilisateur_id');

  useEffect(() => {
    if (!utilisateur_id) return;

    fetch(`http://127.0.0.1:8000/api/utilisateur/${utilisateur_id}/badges`)
      .then(res => res.json())
      .then(data => setBadges(data))
      .catch(console.error);
  }, [utilisateur_id]);

  const downloadSnapshot = () => {
    if (!badgeRef.current) return;

    const imgElement = badgeRef.current.querySelector('img');
    if (!imgElement || !imgElement.complete || imgElement.naturalHeight === 0) {
      alert("Please wait for the image to load completely.");
      return;
    }

    // Delay slightly to ensure rendering
    setTimeout(() => {
      html2canvas(badgeRef.current, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: null, // Preserves transparency
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${selectedBadge.badge_nom.replace(/\s+/g, '_').toLowerCase()}_${userName || 'user'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }, 300); // Small delay to ensure render
  };

  return (
    <div>
      <NavBar />

      {/* Badge Gallery */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',marginTop:'4%',marginLeft:'5%',}}>
        {badges.map(badge => (
          <div
            key={badge.badge_id}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '10px',
              width: '28%',
              borderRadius: '15px',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
              marginLeft: '0.5%',
              color: 'white',
              transition: 'transform 0.2s',
            }}
            onClick={() => setSelectedBadge(badge)}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={badge.badge_image}
                alt={badge.badge_nom}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  flexShrink: 0,
                  marginRight: '15px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '5px',
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', color: 'white' }}>{badge.badge_nom}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'white' }}>{badge.badge_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Badge */}
      {selectedBadge && (
        <div
          onClick={() => setSelectedBadge(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            cursor: 'pointer',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(58, 25, 82, 0.95)',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '450px',
              maxHeight: '90%',
              overflow: 'auto',
              cursor: 'default',
            }}
          >
            <h2 style={{ color: 'white', marginTop: 0 }}>{selectedBadge.badge_nom}</h2>

            {/* Badge Image with Username Overlay */}
            <div
              ref={badgeRef}
              style={{
                position: 'relative',
                display: 'inline-block',
                margin: '0 auto',
                padding: '10px',
                borderRadius: '10px',
              }}
            >
              <img
                src={selectedBadge.badge_gif}
                alt={selectedBadge.badge_nom + ' gif'}
                crossOrigin="anonymous"
                style={{ maxWidth: '100%', maxHeight: '350px', display: 'block' }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textShadow: '2px 2px 6px black',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {userName || 'Your Name'}
              </div>
            </div>

            {/* Badge Description */}
            <p
              style={{
                color: 'white',
                fontFamily: '"inter", sans-serif',
                width: '80%',
                margin: '15px auto 10px',
                fontSize: '14px',
              }}
            >
              {selectedBadge.badge_description}
            </p>

            {/* Name Input */}
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.7rem',
                  borderRadius: '50px',
                  border: '1px solid #ccc',
                  width: '50%',
                  background: 'transparent',
                  color: 'white',
                }}
              />
            </div>

            {/* Buttons */}
            <button
              onClick={downloadSnapshot}
              style={{
                padding: '8px 16px',
                backgroundColor: '#29CC57',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                cursor: 'pointer',
                border: 'none',
                marginRight: '10px',
              }}
            >
              Download PNG
            </button>

            <button
              onClick={() => setSelectedBadge(null)}
              style={{
                padding: '8px 20px',
                cursor: 'pointer',
                background: '#8E44AD',
                borderRadius: '50px',
                color: 'white',
                border: 'none',
                marginLeft: '10px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Badges;