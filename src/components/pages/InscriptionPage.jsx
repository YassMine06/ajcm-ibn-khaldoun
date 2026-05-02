import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './InscriptionPage.css';

const InscriptionPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('membre');

  // Check URL query parameters for initial tab selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'evenement' || tabParam === 'membre') {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Mock list of upcoming events for the dropdown
  const upcomingEvents = [
    "Atelier : Prise de parole en public (15 Juin 2024)",
    "Forum des citoyens (28 Juin 2024)",
    "Journée solidaire (10 Juillet 2024)"
  ];

  return (
    <div className="page-enter">
      <Navbar />
      
      <main className="inscription-main">
        <div className="inscription-header">
          <h1>Rejoignez l'A.J.C.M</h1>
          <p>Engagez-vous à nos côtés pour faire la différence.</p>
        </div>

        <div className="inscription-container">
          <div className="inscription-tabs">
            <button 
              className={`tab-btn ${activeTab === 'evenement' ? 'active' : ''}`}
              onClick={() => setActiveTab('evenement')}
            >
              S'inscrire à un Événement
            </button>
            <button 
              className={`tab-btn ${activeTab === 'membre' ? 'active' : ''}`}
              onClick={() => setActiveTab('membre')}
            >
              Devenir Membre / Bénévole
            </button>
          </div>

          <div className="form-wrapper">
            {activeTab === 'evenement' ? (
              <form className="inscription-form fade-in" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group full-width">
                  <label htmlFor="event-select">Événement *</label>
                  <select id="event-select" required defaultValue="">
                    <option value="" disabled>Sélectionnez un événement</option>
                    {upcomingEvents.map((evt, idx) => (
                      <option key={idx} value={evt}>{evt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="evt-nom">Nom *</label>
                    <input type="text" id="evt-nom" placeholder="Votre nom" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="evt-prenom">Prénom *</label>
                    <input type="text" id="evt-prenom" placeholder="Votre prénom" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="evt-email">Email *</label>
                    <input type="email" id="evt-email" placeholder="votre@email.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="evt-tel">Téléphone</label>
                    <input type="tel" id="evt-tel" placeholder="+212 600 000000" />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="evt-msg">Message ou Question (Optionnel)</label>
                  <textarea id="evt-msg" rows="3" placeholder="Avez-vous une attente particulière pour cet événement ?"></textarea>
                </div>
                <button type="submit" className="submit-btn">CONFIRMER MON INSCRIPTION</button>
              </form>
            ) : (
              <form className="inscription-form fade-in" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mem-nom">Nom *</label>
                    <input type="text" id="mem-nom" placeholder="Votre nom" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mem-prenom">Prénom *</label>
                    <input type="text" id="mem-prenom" placeholder="Votre prénom" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mem-email">Email *</label>
                    <input type="email" id="mem-email" placeholder="votre@email.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mem-tel">Téléphone *</label>
                    <input type="tel" id="mem-tel" placeholder="+212 600 000000" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mem-ville">Ville *</label>
                    <input type="text" id="mem-ville" placeholder="Votre ville" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mem-age">Âge *</label>
                    <input type="number" id="mem-age" placeholder="Ex: 22" min="15" max="99" required />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="mem-motivation">Pourquoi souhaitez-vous nous rejoindre ? *</label>
                  <textarea id="mem-motivation" rows="4" placeholder="Parlez-nous un peu de vos motivations, vos passions et de ce que vous aimeriez accomplir avec nous..." required></textarea>
                </div>
                <button type="submit" className="submit-btn">SOUMETTRE MA CANDIDATURE</button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InscriptionPage;
