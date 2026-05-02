import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
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

      <header className="evenements-hero">
        <div className="evts-container">
          <h1>Nos Événements</h1>
          <p className="evts-subtitle">
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
          <div className="evts-grid">
            {filtered.map((evt) => {
              const catInfo = categoriesData.find(c => c.id === evt.categoryId) || categoriesData[categoriesData.length - 1];
              return (
              <Link to={`/evenements/${encodeURIComponent(evt.folder)}`} className="evt-card" key={evt.folder} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="evt-card-img-wrap">
                  <img
                    src={`/Evenements/${encodeURIComponent(evt.folder)}/poster.jpg`}
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
