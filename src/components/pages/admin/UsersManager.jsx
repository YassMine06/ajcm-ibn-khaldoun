import React, { useState } from 'react';
import './UsersManager.css';
import { Plus, Edit2, Trash2, Users, Search, UserCheck, UserX } from 'lucide-react';

const mockMembers = [
  { id: 1, name: 'Ahmed Benali', username: 'ahmed.b', email: 'ahmed.b@ajcm.org', phone: '+212 661 123 456', joinDate: '01/01/2026', status: 'active' },
  { id: 2, name: 'Sara Moussaoui', username: 'sara.m', email: 'sara.m@ajcm.org', phone: '+212 662 987 654', joinDate: '15/02/2026', status: 'active' },
  { id: 3, name: 'Youssef El Idrissi', username: 'youssef.i', email: 'youssef.i@ajcm.org', phone: '+212 663 111 222', joinDate: '10/03/2026', status: 'inactive' },
];

const COLORS = ['#0b3d2b','#c6a052','#3b82f6','#8b5cf6','#ef4444','#10b981'];

export default function UsersManager() {
  const [members, setMembers] = useState(mockMembers);
  const [search, setSearch] = useState('');

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m));
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce membre ?')) setMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div>
      <h1 className="page-title"><Users size={24} /> Gestion des membres</h1>
      <div className="table-container">
        <div className="table-header">
          <h2>{filtered.length} membre(s)</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', top: '50%', left: '0.65rem', transform: 'translateY(-50%)', color: 'var(--gray-300)' }} />
              <input type="text" className="form-control" placeholder="Rechercher..." style={{ paddingLeft: '2.2rem', width: '200px', padding: '0.5rem 0.75rem 0.5rem 2.2rem' }}
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn-primary"><Plus size={16} /> Ajouter</button>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Membre</th><th>Email</th><th>Téléphone</th><th>Adhésion</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: COLORS[i % COLORS.length], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{m.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>@{m.username}</div>
                    </div>
                  </div>
                </td>
                <td className="text-sm text-muted">{m.email}</td>
                <td className="text-sm text-muted">{m.phone}</td>
                <td className="text-sm text-muted">{m.joinDate}</td>
                <td>
                  <span className={`badge ${m.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {m.status === 'active' ? '● Actif' : '● Inactif'}
                  </span>
                </td>
                <td className="actions">
                  <button className={`btn-icon ${m.status === 'active' ? 'danger' : 'success'}`} onClick={() => toggleStatus(m.id)} title={m.status === 'active' ? 'Désactiver' : 'Activer'}>
                    {m.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                  </button>
                  <button className="btn-icon" title="Modifier"><Edit2 size={16} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(m.id)} title="Supprimer"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
