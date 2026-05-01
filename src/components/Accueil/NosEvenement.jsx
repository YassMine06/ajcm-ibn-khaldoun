import React from 'react';
import { Link } from 'react-router-dom';
import './NosEvenement.css';

const evenementsRecents = [
  {
    folder: 'مهرجان الانشودة',
    title: "Festival de l'Anashid",
    desc: "Festival dédié à l'art de l'Anashid islamique, animé par des formateurs nationaux.",
    tag: 'Culture', color: '#4a7c59',
  },
  {
    folder: 'مخيم إيموزار',
    title: 'Camp Imouzzer',
    desc: "Colonie de vacances estivale pour les jeunes dans la région d'Imouzzer.",
    tag: 'Jeunesse', color: '#C9A227',
  },
  {
    folder: 'الجامعة لصيفية للشباب',
    title: "Université d'Été de la Jeunesse",
    desc: "Programme estival de formation et d'échange pour les jeunes militants associatifs.",
    tag: 'Formation', color: '#b03a2e',
  },
  {
    folder: 'masterclass',
    title: 'Masterclass',
    desc: "Sessions de formation intensive animées par des experts dans différents domaines.",
    tag: 'Formation', color: '#b03a2e',
  },
];

const NosEvenements = () => (
  <section className="projets-section" id="projets">
    <div className="section-header">
      <h2 className="section-title">NOS ÉVÉNEMENTS RÉCENTS</h2><br/>
      <div className="section-divider"></div>
    </div>
    <div className="projets-grid">
      {evenementsRecents.map((evt) => (
        <div className="projet-card" key={evt.folder}>
          <div className="projet-img-wrap">
            <img
              src={`/Evenements/${encodeURIComponent(evt.folder)}/poster.jpg`}
              alt={evt.title}
              onError={(e) => { e.target.src = '/logo_ajcm.svg'; }}
            />
            <span className="evt-tag-badge" style={{ background: evt.color }}>{evt.tag}</span>
          </div>
          <div className="projet-body">
            <h3 className="projet-title">{evt.title}</h3>
            <p className="projet-desc">{evt.desc}</p>
            <Link to="/evenements" className="projet-link">
              VOIR TOUS LES ÉVÉNEMENTS →
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default NosEvenements;
