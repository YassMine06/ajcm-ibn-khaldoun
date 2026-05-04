import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Handshake, Plus, Trash2, Edit2, Search, X, Globe, Image as ImageIcon } from 'lucide-react';
import './PartnersManager.css';

const initialPartner = { name: '', logo: '', url: '' };

export default function PartnersManager() {
  const [partners, setPartners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(initialPartner);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/partners');
      setPartners(res.data);
    } catch (err) {
      console.error("Error fetching partners:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleAdd = () => {
    setCurrentPartner(initialPartner);
    setIsEditing(true);
  };

  const handleEdit = (partner) => {
    setCurrentPartner(partner);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce partenaire ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/partners/${id}`);
        fetchPartners();
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentPartner.id) {
        await axios.put(`http://localhost:5000/api/partners/${currentPartner.id}`, currentPartner);
      } else {
        await axios.post('http://localhost:5000/api/partners', currentPartner);
      }
      setIsEditing(false);
      fetchPartners();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPartner({ ...currentPartner, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filtered = partners.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="page-enter">
        <div className="section-box" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
              {currentPartner.id ? 'Modifier le partenaire' : 'Nouveau partenaire'}
            </h2>
            <button className="btn-ghost" onClick={() => setIsEditing(false)}><X size={20} /></button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nom du partenaire *</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                value={currentPartner.name} 
                onChange={e => setCurrentPartner({...currentPartner, name: e.target.value})} 
                placeholder="Ex: Ministère de la Jeunesse"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Lien du site (URL)</label>
              <div style={{ position: 'relative' }}>
                <Globe size={16} style={{ position: 'absolute', top: '50%', left: '0.8rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input 
                  type="url" 
                  className="form-control" 
                  style={{ paddingLeft: '2.5rem' }}
                  value={currentPartner.url} 
                  onChange={e => setCurrentPartner({...currentPartner, url: e.target.value})} 
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Logo *</label>
              <div 
                style={{ 
                  border: '2px dashed var(--gray-200)', 
                  borderRadius: '12px', 
                  padding: '2rem', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  background: 'var(--gray-50)',
                  transition: 'all 0.2s'
                }}
                onClick={() => document.getElementById('logo-upload').click()}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--green-500)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
              >
                <input type="file" id="logo-upload" hidden accept="image/*" onChange={handleImageChange} />
                {currentPartner.logo ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={currentPartner.logo.startsWith('data:') ? currentPartner.logo : `/Partenaria/${currentPartner.logo}`} 
                      alt="Preview" 
                      style={{ maxHeight: '100px', maxWidth: '200px', borderRadius: '8px' }} 
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>Cliquez pour changer</div>
                  </div>
                ) : (
                  <div style={{ color: 'var(--gray-400)' }}>
                    <ImageIcon size={32} style={{ marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Cliquez pour télécharger le logo</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>Enregistrer</button>
              <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>
            <Handshake size={24} /> Gestion des Partenaires
          </h1>
          <p className="text-muted">{partners.length} partenaire(s) actifs</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '0.8rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher..." 
              style={{ paddingLeft: '2.5rem', width: '250px' }}
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={18} /> Ajouter un partenaire
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Partenaire</th>
              <th>Lien Website</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '8px', 
                      background: 'white', 
                      border: '1px solid var(--gray-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={p.logo?.startsWith('data:') ? p.logo : `/Partenaria/${p.logo}`} 
                        alt={p.name} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                      />
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{p.name}</span>
                  </div>
                </td>
                <td>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--green-600)', fontSize: '0.85rem' }}>
                      <Globe size={14} /> {p.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                    </a>
                  ) : (
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>Pas de lien</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="btn-icon" onClick={() => handleEdit(p)} title="Modifier">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon danger" onClick={() => handleDelete(p.id)} title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && !isLoading && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-400)' }}>
                  Aucun partenaire trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
