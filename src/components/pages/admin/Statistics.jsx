import React, { useState, useEffect } from 'react';
import './Statistics.css';
import axios from 'axios';
import { 
  ClipboardList, Megaphone, Users, UserCheck, TrendingUp, 
  Plus, Calendar, ShieldCheck, ArrowRight, BarChart, Handshake 
} from 'lucide-react';

import dashPattern from '../../../assets/dash-pattern.png';

import { useNavigate } from 'react-router-dom';

export default function Statistics() {
  const navigate = useNavigate();
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
    { label: 'Événements', value: stats.events, icon: <Calendar size={24} />, color: 'var(--green-700)', bg: 'var(--green-100)', path: '/admin/activities' },
    { label: 'Annonces',  value: stats.annonces, icon: <Megaphone size={24} />, color: 'var(--gold-600)', bg: 'var(--gold-100)', path: '/admin/annonces' },
    { label: 'Membres',   value: stats.members, icon: <Users size={24} />, color: 'var(--info)', bg: 'var(--info-bg)', path: '/admin/members' },
    { label: 'Inscriptions', value: stats.registrations, icon: <UserCheck size={24} />, color: 'var(--danger)', bg: 'var(--danger-bg)', path: '/admin/registrations' },
  ];

  return (
    <div className="statistics-page">
      {/* Hero Section */}
      <div className="stats-hero" style={{ backgroundImage: `linear-gradient(rgba(11, 61, 43, 0.8), rgba(7, 31, 22, 0.9)), url(${dashPattern})` }}>
        <div className="stats-hero-content">
          <div className="hero-icon">
            <ShieldCheck size={40} color="var(--gold-400)" />
          </div>
          <div className="hero-text">
            <h1>Tableau de bord</h1>
            <p>Bienvenue sur votre espace de gestion AJCM. Voici l'état actuel de votre association.</p>
          </div>
        </div>
        <div className="hero-badge">
          <span className="badge badge-gold" style={{ padding: '0.5rem 1rem' }}>Saison 2026 — Actif</span>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="stats-grid">
        {cards.map((c, i) => (
          <div className="stat-card" key={i} onClick={() => navigate(c.path)} style={{ cursor: 'pointer' }}>
            <div className="stat-icon" style={{ backgroundColor: c.bg, color: c.color }}>{c.icon}</div>
            <div className="stat-info">
              <h3>{c.label}</h3>
              <p style={{ color: 'var(--gray-900)' }}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        {/* Left Column: Recent Activity & Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="section-box">
            <div className="section-header">
              <h2><BarChart size={18} color="var(--green-700)" /> Analyse de croissance</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>+12.5%</span>
                <span className="text-muted text-sm">Derniers 7 jours</span>
              </div>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
                <div className="chart-wrapper">
                  <div className="chart-container" style={{ height: '180px', alignItems: 'flex-end', paddingBottom: '1.5rem' }}>
                    {[
                      { h: 40, d: 'Lun' }, { h: 70, d: 'Mar' }, { h: 45, d: 'Mer' }, 
                      { h: 90, d: 'Jeu' }, { h: 65, d: 'Ven' }, { h: 80, d: 'Sam' }, { h: 55, d: 'Dim' }
                    ].map((item, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%' }}>
                        <div className="chart-bar" style={{ height: `${item.h}%`, width: '100%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                          <div className="chart-tooltip">{item.h}</div>
                        </div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--gray-400)', fontWeight: 600 }}>{item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="growth-details" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--green-50)', borderRadius: '10px', border: '1px solid var(--green-100)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--green-700)', fontWeight: 600, marginBottom: '2px' }}>Nouveaux membres</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green-900)' }}>+24</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--gold-50)', borderRadius: '10px', border: '1px solid var(--gold-100)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-700)', fontWeight: 600, marginBottom: '2px' }}>Taux d'engagement</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold-900)' }}>68%</div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0, lineHeight: 1.5 }}>
                    La tendance actuelle montre une forte activité les jeudis et samedis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <div className="table-header">
              <h2><ClipboardList size={18} color="var(--green-700)" /> Événements récents</h2>
              <button className="btn-ghost" onClick={() => navigate('/admin/activities')} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>Voir tout</button>
            </div>
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Lieu</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.length > 0 ? recentEvents.map((ev, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{ev.title}</td>
                      <td>
                        <span className="badge badge-info">
                          {ev.date || ev.startDate || '—'}
                        </span>
                      </td>
                      <td className="text-muted text-sm">{ev.lieu || ev.location || '—'}</td>
                      <td><span className="badge badge-success">Publié</span></td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="text-center text-muted" style={{ padding: '2rem' }}>Aucun événement récent</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="section-box">
            <div className="section-header">
              <h2><Plus size={18} color="var(--green-700)" /> Actions Rapides</h2>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className="quick-actions-grid" style={{ padding: 0 }}>
                <div className="action-card" onClick={() => navigate('/admin/activities', { state: { openForm: true } })}>
                  <Calendar size={20} />
                  <span>Nouvel Event</span>
                </div>
                <div className="action-card" onClick={() => navigate('/admin/annonces', { state: { openForm: true } })}>
                  <Megaphone size={20} />
                  <span>Publier Annonce</span>
                </div>
                <div className="action-card" onClick={() => navigate('/admin/members')}>
                  <Users size={20} />
                  <span>Gérer Membres</span>
                </div>
                <div className="action-card" onClick={() => navigate('/admin/partners', { state: { openForm: true } })}>
                  <Handshake size={20} />
                  <span>Nouv. Partenaire</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
