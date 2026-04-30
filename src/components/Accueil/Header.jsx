import React from 'react';
import Navbar from '../Navbar';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header" id="accueil">
      <Navbar />

      <div className="hero-section">
        <div className="hero-background">
          <img src="/background.png" alt="AJCM Association Background" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            CULTIVER LA <br />
            <span className="hero-title-highlight">CITOYENNETÉ.</span><br />
            INSPIRER LA <br />
            <span className="hero-title-highlight">JEUNESSE.</span>
          </h1>
          <p className="hero-subtitle">
            Nous œuvrons pour une société plus juste,<br />
            inclusive et engagée, en donnant aux jeunes<br />
            les clés pour construire le changement.
          </p>
          <div className="hero-buttons">
            <a href="#actions" className="btn-primary-hero">
              DÉCOUVRIR NOS ACTIONS
            </a>
            <a href="#rejoindre" className="btn-secondary-hero">
              NOUS REJOINDRE
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
