import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, ClipboardList, Search } from 'lucide-react';

export default function ActivitiesManager() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const fetchEvents = async () => {
    try { const res = await axios.get('http://localhost:5000/api/events'); setEvents(res.data); } catch {}
  };

  useEffect(() => { fetchEvents(); }, []);

  const filtered = events.filter(e =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.lieu?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (folder) => {
    if (window.confirm('Supprimer cet événement ?')) {
      try { await axios.delete(`http://localhost:5000/api/events/${encodeURIComponent(folder)}`); fetchEvents(); } catch {}
    }
  };

  const handleEdit = (event) => { setCurrentEvent(event); setIsEditing(true); };
  const handleAdd = () => {
    setCurrentEvent({ folder: '', title: '', desc: '', date: '', membres: '', lieu: '', description_ar: '', description_fr: '', categoryId: 'cat-1', media: [] });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (events.find(ev => ev.folder === currentEvent.folder)) {
        await axios.put(`http://localhost:5000/api/events/${encodeURIComponent(currentEvent.folder)}`, currentEvent);
      } else {
        await axios.post('http://localhost:5000/api/events', currentEvent);
      }
      setIsEditing(false); setCurrentEvent(null); fetchEvents();
    } catch {}
  };

  if (isEditing) {
    return (
      <div>
        <h1 className="page-title"><ClipboardList size={24} />
          {events.find(ev => ev.folder === currentEvent.folder) ? 'Modifier' : 'Ajouter'} une activité
        </h1>
        <div className="table-container" style={{ padding: '2rem', maxWidth: '700px' }}>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Dossier (ID unique)</label>
                <input type="text" className="form-control" value={currentEvent.folder}
                  onChange={e => setCurrentEvent({ ...currentEvent, folder: e.target.value })}
                  required disabled={!!events.find(ev => ev.folder === currentEvent.folder)} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Titre</label>
                <input type="text" className="form-control" value={currentEvent.title}
                  onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="text" className="form-control" value={currentEvent.date}
                  onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Lieu</label>
                <input type="text" className="form-control" value={currentEvent.lieu}
                  onChange={e => setCurrentEvent({ ...currentEvent, lieu: e.target.value })} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Description (Français)</label>
                <textarea className="form-control" rows="3" value={currentEvent.description_fr}
                  onChange={e => setCurrentEvent({ ...currentEvent, description_fr: e.target.value })} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Description (Arabe)</label>
                <textarea className="form-control" rows="3" value={currentEvent.description_ar}
                  onChange={e => setCurrentEvent({ ...currentEvent, description_ar: e.target.value })} dir="rtl" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary">Enregistrer</button>
              <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title"><ClipboardList size={24} /> Gestion des activités</h1>
      <div className="table-container">
        <div className="table-header">
          <h2>{filtered.length} activité(s)</h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', top: '50%', left: '0.65rem', transform: 'translateY(-50%)', color: 'var(--gray-300)' }} />
              <input type="text" className="form-control" placeholder="Rechercher..." style={{ paddingLeft: '2.2rem', width: '200px', padding: '0.5rem 0.75rem 0.5rem 2.2rem' }}
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={handleAdd}><Plus size={16} /> Ajouter</button>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>#</th><th>Titre</th><th>Date</th><th>Lieu</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((event, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--gray-300)', fontWeight: 700, fontSize: '0.75rem' }}>{String(i + 1).padStart(2, '0')}</td>
                <td style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{event.title}</td>
                <td>{event.date ? <span className="badge badge-info">{event.date}</span> : <span className="text-muted">—</span>}</td>
                <td className="text-muted text-sm">{event.lieu || '—'}</td>
                <td className="actions">
                  <button className="btn-icon" onClick={() => handleEdit(event)}><Edit2 size={16} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(event.folder)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
