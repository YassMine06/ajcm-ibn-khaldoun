import React, { useState } from 'react';
import './PartnersManager.css';
import { Handshake, Plus, Trash2, Edit2, Search } from 'lucide-react';

const initialPartners = [
  { id: 1, name: 'Ministère de la Jeunesse', type: 'Institutionnel', logo: 'MDJ' },
  { id: 2, name: 'Commune de Mohammedia', type: 'Local', logo: 'CM' },
  { id: 3, name: 'Association Al Amal', type: 'Associatif', logo: 'AM' },
];

const TYPE_COLORS = {
  'Institutionnel': 'badge-info',
  'Local': 'badge-gold',
  'Associatif': 'badge-success',
};

export default function PartnersManager() {
  const [partners, setPartners] = useState(initialPartners);
  const [search, setSearch] = useState('');

  const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce partenaire ?')) {
      setPartners(p => p.filter(x => x.id !== id));
    }
  };

  return (
    <div>
      <h1 className="page-title"><Handshake size={24} /> Gestion des partenaires</h1>
      
      <div className="table-container">
        <div className="table-header">
          <h2>{filtered.length} partenaire(s)</h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
            <tr><th>Partenaire</th><th>Type</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyItems: 'center', fontWeight: 800, fontSize: '0.9rem', color: 'var(--gray-500)', flexShrink: 0, justifyContent: 'center' }}>
                      {p.logo}
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{p.name}</div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${TYPE_COLORS[p.type] || 'badge-info'}`}>{p.type}</span>
                </td>
                <td className="actions">
                  <button className="btn-icon" title="Modifier"><Edit2 size={16} /></button>
                  <button className="btn-icon danger" title="Supprimer" onClick={() => handleDelete(p.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
