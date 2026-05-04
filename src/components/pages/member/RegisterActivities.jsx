import React, { useState, useEffect } from 'react';
import './RegisterActivities.css';
import { ClipboardList, CheckCircle, Clock, XCircle } from 'lucide-react';
import axios from 'axios';

export default function RegisterActivities() {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then(r => setEvents(r.data)).catch(() => {});
  }, []);

  const handleRegister = (folder) => setRegistered(prev => ({ ...prev, [folder]: 'pending' }));

  const statusBadge = {
    pending:  <span className="badge badge-warning"><Clock size={11} /> En attente</span>,
    approved: <span className="badge badge-success"><CheckCircle size={11} /> Approuvée</span>,
    rejected: <span className="badge badge-danger"><XCircle size={11} /> Refusée</span>,
  };

  return (
    <div>
      <h1 className="page-title"><ClipboardList size={24} /> Inscription aux événements</h1>
      <div className="cards-grid">
        {events.slice(0, 12).map((ev, i) => {
          const status = registered[ev.folder];
          return (
            <div key={i} className="event-card">
              <div className="event-card-title">{ev.title}</div>
              {ev.date && <div className="event-card-meta"><Clock size={12} /> {ev.date}</div>}
              {ev.lieu && <div className="event-card-meta"><span>📍</span> {ev.lieu}</div>}
              <div className="event-card-footer">
                {status ? statusBadge[status] : (
                  <button className="btn-primary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }} onClick={() => handleRegister(ev.folder)}>
                    S'inscrire
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
