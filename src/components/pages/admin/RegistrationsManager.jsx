import React from 'react';
import './RegistrationsManager.css';
import { CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';
import { useState } from 'react';

const init = [
  { id: 1, member: 'Ahmed Benali',      activity: 'Atelier Théâtre',      date: '01/05/2026', status: 'pending'  },
  { id: 2, member: 'Sara Moussaoui',    activity: 'Formation Anashid',     date: '30/04/2026', status: 'approved' },
  { id: 3, member: 'Youssef El Idrissi',activity: 'Camp Imouzzer',         date: '29/04/2026', status: 'rejected' },
  { id: 4, member: 'Amina Zahraoui',    activity: 'Soirée Coranique',      date: '28/04/2026', status: 'pending'  },
];

const badges = {
  pending:  <span className="badge badge-warning"><Clock size={11} />  En attente</span>,
  approved: <span className="badge badge-success"><CheckCircle size={11} /> Approuvée</span>,
  rejected: <span className="badge badge-danger"><XCircle size={11} />  Refusée</span>,
};

export default function RegistrationsManager() {
  const [rows, setRows] = useState(init);
  const update = (id, status) => setRows(p => p.map(r => r.id === id ? { ...r, status } : r));

  const counts = {
    pending:  rows.filter(r => r.status === 'pending').length,
    approved: rows.filter(r => r.status === 'approved').length,
    rejected: rows.filter(r => r.status === 'rejected').length,
  };

  return (
    <div>
      <h1 className="page-title"><UserCheck size={24} /> Contrôle des inscriptions</h1>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
        {[
          { label: 'En attente',  value: counts.pending,  color: 'var(--warning)', bg: 'var(--warning-bg)' },
          { label: 'Approuvées',  value: counts.approved, color: 'var(--success)', bg: 'var(--success-bg)' },
          { label: 'Refusées',    value: counts.rejected, color: 'var(--danger)',  bg: 'var(--danger-bg)'  },
        ].map((c, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ backgroundColor: c.bg, color: c.color }}>
              {i === 0 ? <Clock size={22} /> : i === 1 ? <CheckCircle size={22} /> : <XCircle size={22} />}
            </div>
            <div className="stat-info">
              <h3>{c.label}</h3>
              <p style={{ color: c.color }}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-header"><h2>Toutes les demandes ({rows.length})</h2></div>
        <table>
          <thead>
            <tr><th>Membre</th><th>Activité</th><th>Date</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.member}</td>
                <td className="text-muted text-sm">{r.activity}</td>
                <td className="text-muted text-sm">{r.date}</td>
                <td>{badges[r.status]}</td>
                <td className="actions">
                  <button className="btn-icon success" title="Approuver" onClick={() => update(r.id, 'approved')}><CheckCircle size={16} /></button>
                  <button className="btn-icon danger"  title="Refuser"   onClick={() => update(r.id, 'rejected')}><XCircle size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
