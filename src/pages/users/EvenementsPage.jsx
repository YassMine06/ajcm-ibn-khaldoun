import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './EvenementsPage.css';

import { eventsData as allEvenements } from '../../assets/eventsData';
import { categoriesData } from '../../assets/categoriesData';

const allCategories = [{ id: 'tous', name: 'Tous' }, ...categoriesData];

const EvenementsPage = () => {
  const [activeFilter, setActiveFilter] = useState('tous');

  const filtered = activeFilter === 'tous'
    ? allEvenements
    : allEvenements.filter(e => e.categoryId === activeFilter);

  return (
    <div className="evenements-page page-enter">
      <Navbar />

      <header className="desc-hero">
        <div className="desc-hero-bg">
          <div className="desc-hero-overlay"></div>
        </div>
        <div className="evts-container desc-hero-content">
          <div className="badge-identity">Agenda AJCM</div>
          <h1 className="animate-title">Nos Événements</h1>
          <p className="desc-subtitle animate-subtitle">
            Découvrez les {allEvenements.length} événements organisés par l'A.J.C.M.
          </p>
        </div>
      </header>

      <div className="evts-filters-bar">
        <div className="evts-container">
          <div className="evts-filters">
            {allCategories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="evts-main">
        <div className="evts-container">
          <div className="section-header center-align" style={{ marginBottom: '3rem' }}>
            <h2>Tous nos événements</h2>
            <div className="section-divider"></div>
          </div>
          <div className="evts-grid">
            {filtered.map((evt) => {
              const catInfo = categoriesData.find(c => c.id === evt.categoryId) || categoriesData[categoriesData.length - 1];
              return (
              <Link to={`/evenements/${encodeURIComponent(evt.folder)}`} className="evt-card" key={evt.folder} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="evt-card-img-wrap">
                  <img
                    src={`/Evenements/${encodeURIComponent(evt.folder)}/${evt.media && evt.media.length > 0 ? evt.media[0] : 'poster.jpg'}`}
                    alt={evt.title}
                    onError={(e) => { e.target.src = '/logo_ajcm.svg'; }}
                  />
                  <span className="evt-cat-badge" style={{ background: catInfo.color }}>
                    {catInfo.name}
                  </span>
                </div>
                <div className="evt-card-body">
                  <h3>{evt.title}</h3>
                  <p>{evt.desc}</p>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EvenementsPage;
