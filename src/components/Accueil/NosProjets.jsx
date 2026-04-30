import React from 'react';
import './NosProjets.css';

const projets = [
  {
    img: '/projet1.png',
    title: 'Leadership des jeunes',
    desc: 'Formation en leadership pour développer la confiance en soi et l\'esprit d\'initiative.',
    href: '#projet1',
  },
  {
    img: '/projet2.png',
    title: 'Éco-citoyenneté',
    desc: 'Actions de sensibilisation et projets écologiques menés par les jeunes.',
    href: '#projet2',
  },
  {
    img: '/projet3.png',
    title: 'Entreprendre pour demain',
    desc: 'Programme d\'accompagnement pour jeunes entrepreneurs et porteurs d\'idées.',
    href: '#projet3',
  },
  {
    img: '/projet4.png',
    title: 'Solidarité en action',
    desc: 'Initiatives solidaires pour soutenir les communautés locales.',
    href: '#projet4',
  },
];

const NosProjets = () => (
  <section className="projets-section" id="projets">
    <div className="section-header">
      <h2 className="section-title">NOS PROJETS RÉCENTS</h2>
      <div className="section-divider"></div>
    </div>
    <div className="projets-grid">
      {projets.map((p) => (
        <div className="projet-card" key={p.title}>
          <div className="projet-img-wrap">
            <img src={p.img} alt={p.title} />
          </div>
          <div className="projet-body">
            <h3 className="projet-title">{p.title}</h3>
            <p className="projet-desc">{p.desc}</p>
            <a href={p.href} className="projet-link">VOIR LE PROJET →</a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default NosProjets;
