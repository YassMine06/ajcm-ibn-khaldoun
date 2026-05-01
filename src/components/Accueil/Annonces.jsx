import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Annonces.css';

const evenements = [
  {
    day: '15', month: 'JUN', color: '#4a7c59',
    title: 'Atelier : Prise de parole en public',
    date: '15 Juin 2024 • Rabat',
    desc: 'Un atelier pratique pour gagner en confiance et mieux communiquer.',
  },
  {
    day: '28', month: 'JUN', color: '#C9A227',
    title: 'Forum des citoyens',
    date: '28 Juin 2024 • Casablanca',
    desc: "Rencontre et échanges autour de l'engagement citoyen des jeunes.",
  },
  {
    day: '10', month: 'JUL', color: '#c0392b',
    title: 'Journée solidaire',
    date: '10 Juillet 2024 • Marrakech',
    desc: "Une journée d'action solidaire au service de la communauté.",
  },
];

const testimonials = [
  {
    text: "Grâce à A.J.C.M, j'ai découvert ma passion pour l'entrepreneuriat et j'ai lancé mon projet. Merci pour votre soutien !",
    author: '— Salma Benaïli',
    role: 'Entrepreneuse & membre',
  },
  {
    text: "Cette association m'a permis de m'engager concrètement dans ma communauté. Une expérience transformatrice !",
    author: '— Youssef El Amrani',
    role: 'Bénévole & étudiant',
  },
  {
    text: "Les formations en leadership ont changé ma façon de voir les choses. Je suis fière de faire partie de cette famille.",
    author: '— Fatima Zahra',
    role: 'Membre active',
  },
];

const Annonces = () => {
  const [slide, setSlide] = useState(0);

  return (
    <section className="evt-section" id="annonces">
      <div className="evt-container-full">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">ANNONCES & PROCHAINS ÉVÉNEMENTS</h2>
          <div className="section-divider" style={{ margin: '15px auto 0' }}></div>
        </div>
        
        <div className="annonces-grid">
          {evenements.map((e) => (
            <div className="annonce-card" key={e.title}>
              <div className="annonce-date-ribbon" style={{ background: e.color }}>
                <span className="annonce-day">{e.day}</span>
                <span className="annonce-month">{e.month}</span>
              </div>
              <div className="annonce-content">
                <h4 className="annonce-title">{e.title}</h4>
                <div className="annonce-meta">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {e.date}
                </div>
                <p className="annonce-desc">{e.desc}</p>
                <div className="annonce-footer">
                  <Link to="/inscription?tab=evenement" className="btn-inscrire-card">S'inscrire à l'événement</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/annonces" className="btn-agenda">VOIR TOUTES LES ANNONCES →</Link>
        </div>
      </div>
    </section>
  );
};

export default Annonces;
