import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import { UserPlus, Calendar, Mail, Phone, MapPin, Smile, Award, Send } from 'lucide-react';
import './InscriptionPage.css';
import { eventsData } from '../../../assets/eventsData';

const InscriptionPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('membre');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'evenement' || tabParam === 'membre') {
      setActiveTab(tabParam);
    }
    window.scrollTo(0, 0);
  }, [location]);

  const upcomingEvents = eventsData.map(e => `${e.title} (${e.date || 'À venir'})`);

  return (
    <div className="page-enter" style={{ backgroundColor: '#f8fafc' }}>
      <Navbar />
      
      <main className="inscription-main">
        <div className="inscription-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#eef2ff', color: '#3b82f6', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            <Award size={16} /> Rejoignez l'A.J.C.M
          </div>
          <h1>Faites le premier pas vers l'engagement</h1>
          <p>Choisissez votre mode de participation et contribuez au changement positif au sein de notre communauté.</p>
        </div>

        <div className="inscription-container">
          <div className="inscription-tabs">
            <button 
              className={`tab-btn ${activeTab === 'membre' ? 'active' : ''}`}
              onClick={() => setActiveTab('membre')}
            >
              <UserPlus size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Devenir Membre
            </button>
            <button 
              className={`tab-btn ${activeTab === 'evenement' ? 'active' : ''}`}
              onClick={() => setActiveTab('evenement')}
            >
              <Calendar size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              S'inscrire à un Événement
            </button>
          </div>

          <div className="form-wrapper">
            {activeTab === 'evenement' ? (
              <form className="inscription-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group full-width">
                  <label htmlFor="event-select">Événement de votre choix *</label>
                  <select id="event-select" required defaultValue="">
                    <option value="" disabled>Sélectionnez un événement</option>
                    {upcomingEvents.map((evt, idx) => (
                      <option key={idx} value={evt}>{evt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="evt-nom">Nom complet *</label>
                    <input type="text" id="evt-nom" placeholder="Votre nom" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="evt-tel">Téléphone *</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="tel" id="evt-tel" placeholder="+212 600..." style={{ paddingLeft: '2.75rem' }} required />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="evt-email">Email professionnel ou personnel *</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input type="email" id="evt-email" placeholder="votre@email.com" style={{ paddingLeft: '2.75rem' }} required />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="evt-msg">Message ou Question spécifique</label>
                  <textarea id="evt-msg" rows="3" placeholder="Une attente particulière ou une question ?"></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  CONFIRMER MON INSCRIPTION <Send size={18} style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }} />
                </button>
              </form>
            ) : (
              <form className="inscription-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mem-nom">Nom complet *</label>
                    <input type="text" id="mem-nom" placeholder="Votre nom complet" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mem-age">Âge *</label>
                    <input type="number" id="mem-age" placeholder="Ex: 22" min="15" max="99" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mem-email">Email *</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="email" id="mem-email" placeholder="votre@email.com" style={{ paddingLeft: '2.75rem' }} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mem-tel">Téléphone *</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="tel" id="mem-tel" placeholder="+212 600..." style={{ paddingLeft: '2.75rem' }} required />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="mem-ville">Ville de résidence *</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input type="text" id="mem-ville" placeholder="Ex: Casablanca" style={{ paddingLeft: '2.75rem' }} required />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="mem-motivation">Pourquoi souhaitez-vous nous rejoindre ? *</label>
                  <textarea id="mem-motivation" rows="4" placeholder="Partagez avec nous vos motivations et ce que vous aimeriez apporter à l'association..." required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  SOUMETTRE MA CANDIDATURE <Smile size={18} style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }} />
                </button>
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
