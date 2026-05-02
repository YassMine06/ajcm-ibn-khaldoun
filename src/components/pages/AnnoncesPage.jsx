import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './AnnoncesPage.css';
import { annoncesData } from '../../assets/annoncesData';

const AnnoncesPage = () => {
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedAnnonce) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAnnonce]);

  const closeModal = () => {
    setSelectedAnnonce(null);
  };

  return (
    <div className="annonces-page page-enter">
      <Navbar />

      <header className="desc-hero">
        <div className="desc-hero-bg">
          <div className="desc-hero-overlay"></div>
        </div>
        <div className="evts-container desc-hero-content">
          <div className="badge-identity">Découvrez</div>
          <h1 className="animate-title">Nos Annonces</h1>
          <p className="desc-subtitle animate-subtitle">
            Retrouvez tous nos communiqués, affiches et déclarations officielles.
          </p>
        </div>
      </header>

      <main className="annonces-main">
        <div className="container">
          <div className="section-header center-align" style={{ marginBottom: '3rem' }}>
            <h2>Toutes les annonces</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="annonces-masonry-grid">
            {annoncesData.map((annonce) => (
              <div 
                key={annonce.id} 
                className="annonce-grid-item"
                onClick={() => setSelectedAnnonce(annonce)}
              >
                <div className="annonce-img-wrap">
                  <img src={`/${annonce.image}`} alt={`Annonce ${annonce.id}`} loading="lazy" />
                  <div className="annonce-hover-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                </div>
                {annonce.text && (
                  <div className="annonce-text-preview">
                    {annonce.text.substring(0, 60)}...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal / Lightbox */}
      {selectedAnnonce && (
        <div className="annonce-modal-overlay" onClick={closeModal}>
          <div className="annonce-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className={`modal-body ${selectedAnnonce.text ? 'has-text' : ''}`}>
              <div className="modal-img-container">
                <img src={`/${selectedAnnonce.image}`} alt={`Annonce ${selectedAnnonce.id}`} />
              </div>
              {selectedAnnonce.text && (
                <div className="modal-text-container">
                  <div className="modal-text-scroll">
                    <p className="arabic-text">{selectedAnnonce.text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AnnoncesPage;
