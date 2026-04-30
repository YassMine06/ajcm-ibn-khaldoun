import React from 'react';
import './NosActions.css';

/* SVG icons matching design */
const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a6 6 0 0 1 9-5.196"/>
    <circle cx="17" cy="11" r="3"/><path d="M21 21v-2a4 4 0 0 0-6-3.46"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21h6m-6-3h6M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.1-3 5.2V18H9v-3.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/>
  </svg>
);

const actions = [
  {
    Icon: PeopleIcon,
    color: '#4a7c59',
    bg: '#edf4ef',
    title: 'ÉDUCATION &\nCITOYENNETÉ',
    desc: 'Nous sensibilisons et formons les jeunes aux valeurs citoyennes et au vivre-ensemble.',
    link: 'EN SAVOIR PLUS',
    href: '#education',
  },
  {
    Icon: LightbulbIcon,
    color: '#b03a2e',
    bg: '#fbeeed',
    title: 'INNOVATION &\nENTREPRENEURIAT',
    desc: "Nous accompagnons les jeunes porteurs de projets vers la réussite et l'impact.",
    link: 'EN SAVOIR PLUS',
    href: '#innovation',
  },
  {
    Icon: HandshakeIcon,
    color: '#C9A227',
    bg: '#fdf7e6',
    title: 'SOLIDARITÉ &\nINCLUSION',
    desc: "Nous agissons pour l'égalité des chances et l'inclusion sociale de tous.",
    link: 'EN SAVOIR PLUS',
    href: '#solidarite',
  },
  {
    Icon: CalendarIcon,
    color: '#4a7c59',
    bg: '#edf4ef',
    title: 'ÉVÉNEMENTS &\nATELIERS',
    desc: "Découvrez nos événements, ateliers et rencontres inspirantes tout au long de l'année.",
    link: "VOIR L'AGENDA",
    href: '#evenements',
  },
];

const NosActions = () => (
  <section className="actions-section" id="actions">
    <div className="actions-header">
      <h2 className="section-title-centered">NOS ACTIONS</h2>
      <div className="title-divider"></div>
    </div>
    <div className="actions-grid">
      {actions.map((a) => (
        <div className="action-card" key={a.title}>
          {/* Icon + Title row */}
          <div className="action-top">
            <div className="action-icon-wrap" style={{ background: a.bg, color: a.color }}>
              <a.Icon />
            </div>
            <h3 className="action-title" style={{ color: '#1a1a1a' }}>
              {a.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br/>}</span>
              ))}
            </h3>
          </div>
          <p className="action-desc">{a.desc}</p>
          <a href={a.href} className="action-link">
            {a.link} <span className="arrow">→</span>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default NosActions;
