import React, { useState } from 'react';
import './TrophiesManager.css';
import { Trophy, Plus, Trash2, Edit2, Search, Medal } from 'lucide-react';

const initialTrophies = [
  { id: 1, title: 'Prix de la Citoyenneté', year: '2024', event: 'Festival de la Jeunesse' },
  { id: 2, title: 'Meilleure Troupe Théâtrale', year: '2023', event: 'Compétition Nationale' },
];

export default function TrophiesManager() {
  const [trophies, setTrophies] = useState(initialTrophies);
  const [search, setSearch] = useState('');

  const filtered = trophies.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce trophée ?')) {
      setTrophies(t => t.filter(x => x.id !== id));
    }
  };

  return (
    <div>
      <h1 className="page-title"><Trophy size={24} /> Gestion des Trophées</h1>

      <div className="table-container">
        <div className="table-header">
          <h2>{filtered.length} trophée(s)</h2>
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
            <tr><th>Trophée</th><th>Année</th><th>Événement</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-600))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 2px 8px rgba(198,160,82,0.3)' }}>
                      <Medal size={18} />
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{t.title}</div>
                  </div>
                </td>
                <td><span className="badge badge-gold">{t.year}</span></td>
                <td className="text-sm text-muted">{t.event}</td>
                <td className="actions">
                  <button className="btn-icon" title="Modifier"><Edit2 size={16} /></button>
                  <button className="btn-icon danger" title="Supprimer" onClick={() => handleDelete(t.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
