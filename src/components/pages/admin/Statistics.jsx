import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardList, Megaphone, Users, UserCheck, TrendingUp } from 'lucide-react';

import dashPattern from '../../../assets/dash-pattern.png';

export default function Statistics() {
  const [stats, setStats] = useState({ events: 0, annonces: 0, members: 2, registrations: 3 });
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [ev, an] = await Promise.all([
          axios.get('http://localhost:5000/api/events'),
          axios.get('http://localhost:5000/api/annonces'),
        ]);
        setStats(s => ({ ...s, events: ev.data.length, annonces: an.data.length }));
        setRecentEvents(ev.data.slice(0, 6));
      } catch {}
    };
    fetch();
  }, []);

  const cards = [
    { label: 'Activités totales', value: stats.events,       icon: <ClipboardList size={22} />, color: 'var(--green-700)', bg: 'var(--green-100)' },
    { label: 'Annonces publiées', value: stats.annonces,    icon: <Megaphone size={22} />,     color: 'var(--gold-600)',   bg: 'var(--gold-100)'  },
    { label: 'Membres inscrits',  value: stats.members,     icon: <Users size={22} />,         color: '#3b82f6',           bg: '#eff6ff'          },
    { label: 'Inscriptions',      value: stats.registrations, icon: <UserCheck size={22} />,   color: '#ef4444',           bg: '#fef2f2'          },
  ];

  return (
    <div>
      <div style={{
        backgroundImage: `linear-gradient(rgba(11, 61, 43, 0.7), rgba(7, 31, 22, 0.85)), url(${dashPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2.5rem 2rem',
        borderRadius: 'var(--radius-lg)',
        color: 'white',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
          <TrendingUp size={32} color="var(--gold-400)" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Statistiques Globales</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Vue d'ensemble de l'activité de la plateforme AJCM</p>
        </div>
      </div>

      <div className="stats-grid">
        {cards.map((c, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ backgroundColor: c.bg, color: c.color }}>{c.icon}</div>
            <div className="stat-info">
              <h3>{c.label}</h3>
              <p style={{ color: c.color }}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>Dernières activités</h2>
          <span className="badge badge-gold">{recentEvents.length} affiché(s)</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Titre</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {recentEvents.map((ev, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--gray-300)', fontWeight: 700, fontSize: '0.75rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{ev.title}</td>
                <td>{ev.date ? <span className="badge badge-info">{ev.date}</span> : <span style={{ color: 'var(--gray-300)' }}>—</span>}</td>
                <td className="text-muted">{ev.lieu || '—'}</td>
                <td><span className="badge badge-success">{ev.categoryId || '—'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
