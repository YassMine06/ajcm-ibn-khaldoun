import React, { useState, useEffect } from 'react';
import './Statistics.css';
import axios from 'axios';
import { 
  ClipboardList, Megaphone, Users, UserCheck, TrendingUp, 
  Plus, Calendar, Mail, ShieldCheck, ArrowRight, BarChart 
} from 'lucide-react';

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
    { label: 'Événements', value: stats.events, icon: <Calendar size={24} />, color: 'var(--green-700)', bg: 'var(--green-100)' },
    { label: 'Annonces',  value: stats.annonces, icon: <Megaphone size={24} />, color: 'var(--gold-600)', bg: 'var(--gold-100)' },
    { label: 'Membres',   value: stats.members, icon: <Users size={24} />, color: 'var(--info)', bg: 'var(--info-bg)' },
    { label: 'Inscriptions', value: stats.registrations, icon: <UserCheck size={24} />, color: 'var(--danger)', bg: 'var(--danger-bg)' },
  ];

  return (
    <div className="statistics-page">
      {/* Hero Section */}
      <div className="stats-hero" style={{ backgroundImage: `linear-gradient(rgba(11, 61, 43, 0.8), rgba(7, 31, 22, 0.9)), url(${dashPattern})` }}>
        <div className="hero-content">
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
          <div className="stat-card" key={i}>
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
              <span className="text-muted text-sm">Derniers 7 jours</span>
            </div>
            <div className="chart-container">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <div className="table-header">
              <h2><ClipboardList size={18} color="var(--green-700)" /> Activités récentes</h2>
              <button className="btn-ghost" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>Voir tout</button>
            </div>
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
                  <tr><td colSpan="4" className="text-center text-muted">Aucune activité récente</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Actions & Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="section-box">
            <div className="section-header">
              <h2><Plus size={18} color="var(--green-700)" /> Actions Rapides</h2>
            </div>
            <div className="quick-actions-grid">
              <div className="action-card">
                <Calendar size={20} />
                <span>Nouvel Event</span>
              </div>
              <div className="action-card">
                <Megaphone size={20} />
                <span>Publier Annonce</span>
              </div>
              <div className="action-card">
                <Users size={20} />
                <span>Gérer Membres</span>
              </div>
              <div className="action-card">
                <Mail size={20} />
                <span>Envoyer Email</span>
              </div>
            </div>
          </div>

          <div className="section-box">
            <div className="section-header">
              <h2><TrendingUp size={18} color="var(--green-700)" /> Flux d'activité</h2>
            </div>
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-marker green"></div>
                <div className="activity-content">
                  <h4>Nouvelle inscription</h4>
                  <p>Ahmed Alami s'est inscrit à l'association.</p>
                  <div className="activity-time">Il y a 12 minutes</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-marker gold"></div>
                <div className="activity-content">
                  <h4>Annonce publiée</h4>
                  <p>L'annonce "Camp d'été" est maintenant en ligne.</p>
                  <div className="activity-time">Il y a 2 heures</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-marker info"></div>
                <div className="activity-content">
                  <h4>Mise à jour système</h4>
                  <p>La base de données a été synchronisée.</p>
                  <div className="activity-time">Hier à 18:30</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '1rem', borderTop: '1px solid var(--gray-100)', textAlign: 'center' }}>
              <button className="btn-ghost" style={{ width: '100%', fontSize: '0.8rem' }}>Plus d'activités <ArrowRight size={14} /></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
