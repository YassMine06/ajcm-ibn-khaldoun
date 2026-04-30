import React from 'react';
import './APropos.css';

/* SVG icons matching the design */
const MissionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
    <path d="M9 12l-4 4 4 4"/><path d="M15 12l4 4-4 4"/>
  </svg>
);

const VisionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
  </svg>
);

const ValeursIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const pillars = [
  {
    Icon: MissionIcon,
    title: 'NOTRE MISSION',
    text: 'Encourager et accompagner les jeunes à devenir des citoyens actifs et responsables.',
    color: '#4a7c59',
    bg: '#edf4ef',
  },
  {
    Icon: VisionIcon,
    title: 'NOTRE VISION',
    text: "Une société inclusive où chaque jeune a les moyens d'agir et de réussir.",
    color: '#C9A227',
    bg: '#fdf7e6',
  },
  {
    Icon: ValeursIcon,
    title: 'NOS VALEURS',
    text: 'Respect, solidarité, intégrité, engagement et innovation.',
    color: '#b03a2e',
    bg: '#fbeeed',
  },
];

const APropos = () => (
  <section className="apropos-section" id="apropos">
    <div className="apropos-container">

      {/* ── Left column ── */}
      <div className="apropos-left">
        <h2 className="apropos-title">À PROPOS DE NOUS</h2>
        <div className="apropos-title-line"></div>
        <p className="apropos-desc">
          A.J.C.M est une association engagée pour promouvoir la citoyenneté active, la culture
          du dialogue et l'inclusion des jeunes dans la vie de la société.
        </p>
        <p className="apropos-desc">
          Depuis notre création, nous accompagnons les jeunes à développer leurs compétences,
          à croire en leurs idées et à agir pour un impact positif et durable.
        </p>
        <a href="#historique" className="btn-savoir-plus">EN SAVOIR PLUS</a>
      </div>

      {/* ── Center image ── */}
      <div className="apropos-image">
        <img src="/apropos.png" alt="À propos AJCM" />
      </div>

      {/* ── Right pillars ── */}
      <div className="apropos-pillars">
        {pillars.map((p) => (
          <div className="pillar-card" key={p.title}>
            <div className="pillar-icon" style={{ background: p.bg, color: p.color }}>
              <p.Icon />
            </div>
            <div className="pillar-content">
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default APropos;
