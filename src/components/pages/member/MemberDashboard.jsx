import React, { useState, useEffect } from 'react';
import './MemberDashboard.css';
import { LayoutDashboard, ClipboardList, Clock, Trophy, Bell, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

import dashPattern from '../../../assets/dash-pattern.png';

export default function MemberDashboard() {
  const [eventCount, setEventCount] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then(r => setEventCount(r.data.length)).catch(() => {});
  }, []);

  const cards = [
    { label: 'Événements disponibles', value: eventCount, icon: <ClipboardList size={22} />, color: 'var(--green-700)', bg: 'var(--green-100)' },
    { label: 'Mes inscriptions',      value: 2,           icon: <Calendar size={22} />,      color: 'var(--gold-600)',   bg: 'var(--gold-100)'  },
    { label: 'Heures de bénévolat',   value: 14,          icon: <Clock size={22} />,         color: 'var(--info)',         bg: 'var(--info-bg)'    },
    { label: 'Badges obtenus',        value: 3,           icon: <Trophy size={22} />,        color: 'var(--gold-600)',     bg: 'var(--gold-100)'   },
  ];

  const notifications = [
    { msg: 'Votre inscription à "Atelier Théâtre" a été approuvée.', time: 'Il y a 2h', type: 'success' },
    { msg: 'Nouveau événement : Formation Anashid Éducatif.', time: 'Hier', type: 'info' },
    { msg: 'Rappel : Réunion générale le 10 mai 2026.', time: 'Il y a 3 jours', type: 'warning' },
  ];

  const typeStyle = {
    success: { bg: 'var(--success-bg)', dot: 'var(--success)' },
    info:    { bg: 'var(--info-bg)',    dot: 'var(--info)'    },
    warning: { bg: 'var(--warning-bg)', dot: 'var(--warning)' },
  };

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
          <LayoutDashboard size={32} color="var(--gold-400)" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Mon Tableau de Bord</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Bienvenue dans votre espace membre interactif</p>
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

      <div className="table-container" style={{ padding: '1.5rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>
            <Bell size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle', color: 'var(--gold-500)' }} />
            Notifications récentes
          </h2>
          <span className="badge badge-gold">{notifications.length}</span>
        </div>
        {notifications.map((n, i) => {
          const s = typeStyle[n.type];
          return (
            <div key={i} className="notif-card" style={{ backgroundColor: s.bg, marginBottom: '0.5rem' }}>
              <div className="notif-dot" style={{ backgroundColor: s.dot }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-800)' }}>{n.msg}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--gray-500)', marginTop: '0.2rem' }}>{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
