import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Handshake, Plus, Trash2, Edit2, Search, X, Globe, Image as ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';
import './PartnersManager.css';
import Spinner from '../../components/common/Spinner';
import partnerService from '../../api/partnerService';
import useAsync from '../../hooks/useAsync';

const initialPartner = { name: '', logo: '', url: '' };

export default function PartnersManager() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [partners, setPartners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(initialPartner);
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { execute: fetchPartners, isLoading, error } = useAsync(partnerService.getAll);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchPartners();
      setPartners(data);
    } catch (err) {}
  }, [fetchPartners]);

  useEffect(() => {
    loadData();
    if (location.state?.openForm) {
      handleAdd();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, loadData]);

  const handleAdd = () => {
    setCurrentPartner(initialPartner);
    setIsEditing(true);
  };

  const handleEdit = (partner) => {
    setCurrentPartner({ ...initialPartner, ...partner });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce partenaire ?')) {
      try {
        await partnerService.delete(id);
        loadData();
      } catch (err) {
        alert("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentPartner.name || !currentPartner.logo) {
      alert("Le nom et le logo sont obligatoires.");
      return;
    }

    setIsSaving(true);
    try {
      if (currentPartner.id) {
        await partnerService.update(currentPartner.id, currentPartner);
      } else {
        await partnerService.create(currentPartner);
      }
      setIsEditing(false);
      loadData();
    } catch (err) {
      alert("Erreur lors de l'enregistrement: " + err.message);
    } finally {
      setIsSaving(false);
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

  const filtered = useMemo(() => {
    return (partners || []).filter(p => 
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [partners, search]);

  if (isEditing) {
    return (
      <div className="page-enter">
        <div className="section-box" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
              {currentPartner.id ? 'Modifier le partenaire' : 'Nouveau partenaire'}
            </h2>
            <button className="btn-ghost" onClick={() => setIsEditing(false)} disabled={isSaving}><X size={20} /></button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nom du partenaire *</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                disabled={isSaving}
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
                  disabled={isSaving}
                  value={currentPartner.url || ''} 
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
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  background: 'var(--gray-50)',
                  transition: 'all 0.2s'
                }}
                onClick={() => !isSaving && document.getElementById('logo-upload').click()}
              >
                <input type="file" id="logo-upload" hidden accept="image/*" disabled={isSaving} onChange={handleImageChange} />
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
              <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={isSaving}>
                {isSaving ? <><Spinner size={16} color="white" /> Enregistrement...</> : 'Enregistrer'}
              </button>
              <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={() => setIsEditing(false)} disabled={isSaving}>Annuler</button>
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
          <button className="btn-icon" onClick={loadData} title="Actualiser" disabled={isLoading}>
            <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
          </button>
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

      {error && (
        <div className="error-banner" style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: '8px', color: 'var(--red-700)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="btn-ghost" onClick={loadData} style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'inherit' }}>Réessayer</button>
        </div>
      )}

      {isLoading && partners.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <Spinner size={40} />
          <p className="text-muted" style={{ marginTop: '1rem' }}>Chargement des partenaires...</p>
        </div>
      ) : (
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
                    {search ? 'Aucun partenaire ne correspond à votre recherche' : 'Aucun partenaire trouvé'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

