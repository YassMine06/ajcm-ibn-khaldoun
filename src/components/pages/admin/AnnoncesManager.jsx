import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Megaphone } from 'lucide-react';

export default function AnnoncesManager() {
  const [annonces, setAnnonces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnonce, setCurrentAnnonce] = useState(null);

  const fetchAnnonces = async () => {
    try { const res = await axios.get('http://localhost:5000/api/annonces'); setAnnonces(res.data); } catch {}
  };

  useEffect(() => { fetchAnnonces(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette annonce ?')) {
      try { await axios.delete(`http://localhost:5000/api/annonces/${id}`); fetchAnnonces(); } catch {}
    }
  };

  const handleEdit = (annonce) => { setCurrentAnnonce(annonce); setIsEditing(true); };
  const handleAdd = () => { setCurrentAnnonce({ image: '', text: '' }); setIsEditing(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentAnnonce.id && annonces.find(a => a.id === currentAnnonce.id)) {
        await axios.put(`http://localhost:5000/api/annonces/${currentAnnonce.id}`, currentAnnonce);
      } else {
        await axios.post('http://localhost:5000/api/annonces', currentAnnonce);
      }
      setIsEditing(false); setCurrentAnnonce(null); fetchAnnonces();
    } catch {}
  };

  if (isEditing) {
    return (
      <div>
        <h1 className="page-title"><Megaphone size={24} /> {currentAnnonce.id ? 'Modifier' : 'Ajouter'} une annonce</h1>
        <div className="table-container" style={{ padding: '2rem', maxWidth: '600px' }}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Chemin de l'image</label>
              <input type="text" className="form-control" value={currentAnnonce.image}
                onChange={e => setCurrentAnnonce({ ...currentAnnonce, image: e.target.value })}
                placeholder="ex: Annonces/72.jpg" />
            </div>
            <div className="form-group">
              <label>Texte (Optionnel)</label>
              <textarea className="form-control" rows="6" value={currentAnnonce.text}
                onChange={e => setCurrentAnnonce({ ...currentAnnonce, text: e.target.value })} dir="rtl" />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
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
      <h1 className="page-title"><Megaphone size={24} /> Gestion des Annonces</h1>
      <div className="table-container">
        <div className="table-header">
          <h2>{annonces.length} annonce(s)</h2>
          <button className="btn-primary" onClick={handleAdd}><Plus size={16} /> Ajouter</button>
        </div>
        <table>
          <thead>
            <tr><th>ID</th><th>Image</th><th>Texte</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {annonces.map((annonce) => (
              <tr key={annonce.id}>
                <td><span className="badge badge-gold">#{annonce.id}</span></td>
                <td className="text-sm text-muted">{annonce.image}</td>
                <td style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--gray-500)', fontSize: '0.8rem' }}>
                  {annonce.text || <span style={{ color: 'var(--gray-300)' }}>Pas de texte</span>}
                </td>
                <td className="actions">
                  <button className="btn-icon" onClick={() => handleEdit(annonce)}><Edit2 size={16} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(annonce.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
