import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EvenementsAccueil.css';

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

const EvenementsTestimonials = () => {
  const [slide, setSlide] = useState(0);

  return (
    <section className="evt-section" id="evenements">
      <div className="evt-container">
        {/* ── Événements ── */}
        <div className="evt-left">
          <div className="section-header left-align">
            <h2 className="section-title">PROCHAINS ÉVÉNEMENTS</h2>
            <div className="section-divider left"></div>
          </div>
          <div className="evt-list">
            {evenements.map((e) => (
              <div className="evt-item" key={e.title}>
                <div className="evt-date-box" style={{ background: e.color }}>
                  <span className="evt-day">{e.day}</span>
                  <span className="evt-month">{e.month}</span>
                </div>
                <div className="evt-info">
                  <h4 className="evt-title">{e.title}</h4>
                  <span className="evt-meta">{e.date}</span>
                  <p className="evt-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/evenements" className="btn-agenda">VOIR TOUS LES ÉVÉNEMENTS →</Link>
        </div>

        {/* ── Testimonials ── */}
        <div className="evt-right">
          <div className="section-header left-align">
            <h2 className="section-title">ILS NOUS FONT CONFIANCE</h2>
            <div className="section-divider left"></div>
          </div>
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">{testimonials[slide].text}</p>
            <div className="testimonial-author">
              <strong>{testimonials[slide].author}</strong>
              <span>{testimonials[slide].role}</span>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
            ))}
          </div>
          <div className="partenaires-row">
            <img src="/partenaria/FNCV.jpg" alt="FNCV" className="partner-logo" />
            <div className="partner-placeholder">OCP</div>
            <div className="partner-placeholder fond-hassan">Fondation BMCE Bank</div>
            <div className="partner-placeholder enactus">enactus</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvenementsTestimonials;
