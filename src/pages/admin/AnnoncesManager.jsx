import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AnnoncesManager.css';
import { Plus, X, Image as ImageIcon, Layout, Search, Megaphone, AlertCircle, RefreshCw } from 'lucide-react';
import AdminCard from '../../components/common/AdminCard';
import TimePicker from '../../components/common/TimePicker';
import Spinner from '../../components/common/Spinner';
import annonceService from '../../api/annonceService';
import useAsync from '../../hooks/useAsync';

const initialAnnonce = { 
  title: '', type: 'actualite', date: '', endDate: '', startTime: '', location: '', text: '', guest: '', image: '', maxParticipants: '' 
};

export default function AnnoncesManager() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [annonces, setAnnonces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnonce, setCurrentAnnonce] = useState(initialAnnonce);
  const [formErrors, setFormErrors] = useState({});
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { execute: fetchAnnonces, isLoading, error } = useAsync(annonceService.getAll);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchAnnonces();
      setAnnonces(data);
    } catch (err) {}
  }, [fetchAnnonces]);

  useEffect(() => { 
    loadData(); 

    if (location.state?.openForm) {
      setCurrentAnnonce({
        ...initialAnnonce,
        date: location.state.initialDate || '',
        type: 'evenement'
      });
      setIsEditing(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, loadData]);

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette annonce ?')) {
      try { 
        await annonceService.delete(id); 
        loadData(); 
      } catch (err) { 
        alert('Erreur lors de la suppression: ' + err.message); 
      }
    }
  };

  const handleViewRegistrations = (annonce) => {
    navigate(`/admin/registrations/${encodeURIComponent(annonce.title)}`);
  };

  const handleEdit = (annonce) => { 
    const formatDate = (dateStr) => {
      if (!dateStr || !dateStr.includes('/')) return dateStr || '';
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      return dateStr;
    };

    setCurrentAnnonce({ 
      ...initialAnnonce, 
      ...annonce, 
      date: formatDate(annonce.date),
      endDate: formatDate(annonce.endDate)
    }); 
    setFormErrors({});
    setIsEditing(true); 
  };
  
  const handleAdd = () => { 
    setCurrentAnnonce(initialAnnonce); 
    setFormErrors({});
    setIsEditing(true); 
  };

  const validateForm = () => {
    const errors = {};
    if (!currentAnnonce.title) errors.title = 'Requis';
    if (!currentAnnonce.date) errors.date = 'Requis';
    if (!currentAnnonce.location) errors.location = 'Requis';
    if (!currentAnnonce.text) errors.text = 'Requis';
    if (!currentAnnonce.image) errors.image = "L'image est requise";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      if (currentAnnonce.id) {
        await annonceService.update(currentAnnonce.id, currentAnnonce);
      } else {
        await annonceService.create(currentAnnonce);
      }
      setIsEditing(false); 
      loadData();
    } catch (err) {
      alert('Erreur lors de l\'enregistrement: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredAnnonces = useMemo(() => {
    return (annonces || []).filter(a => 
      a.title?.toLowerCase().includes(search.toLowerCase()) || 
      a.text?.toLowerCase().includes(search.toLowerCase())
    );
  }, [annonces, search]);

  if (isEditing) {
    return (
      <div className="page-enter">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', background: 'white', padding: '1.2rem 2rem', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{currentAnnonce.id ? 'Modifier' : 'Créer'} une Annonce</h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', margin: 0 }}>Remplissez les informations pour publier sur le site</p>
          </div>
          <button className="btn-ghost" onClick={() => setIsEditing(false)} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <X size={18} /> Annuler
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          <div className="section-box" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--green-800)' }}>
              <Layout size={20} /> Détails de l'Annonce
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Titre de l'annonce *</label>
                  <input type="text" className="form-control" placeholder="Titre accrocheur..." value={currentAnnonce.title || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, title: e.target.value})} disabled={isSaving} />
                  {formErrors.title && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.title}</span>}
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Type *</label>
                  <select className="form-control" value={currentAnnonce.type || 'actualite'} onChange={e => setCurrentAnnonce({...currentAnnonce, type: e.target.value})} disabled={isSaving}>
                    <option value="actualite">Actualité</option>
                    <option value="evenement">Événement</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Date de début *</label>
                  <input type="date" className="form-control" value={currentAnnonce.date || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, date: e.target.value})} disabled={isSaving} />
                  {formErrors.date && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.date}</span>}
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Date de fin</label>
                  <input type="date" className="form-control" value={currentAnnonce.endDate || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, endDate: e.target.value})} disabled={isSaving} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Heure</label>
                  <TimePicker 
                    value={currentAnnonce.startTime} 
                    onChange={(time) => setCurrentAnnonce({ ...currentAnnonce, startTime: time })} 
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Lieu *</label>
                  <input type="text" className="form-control" placeholder="Lieu de l'événement" value={currentAnnonce.location || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, location: e.target.value})} disabled={isSaving} />
                  {formErrors.location && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.location}</span>}
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Invités / Guests</label>
                  <input type="text" className="form-control" placeholder="Séparés par des virgules" value={currentAnnonce.guest || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, guest: e.target.value})} disabled={isSaving} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Nombre Max de Participants</label>
                  <input type="number" className="form-control" value={currentAnnonce.maxParticipants || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, maxParticipants: e.target.value})} disabled={isSaving} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Description *</label>
                  <textarea className="form-control" rows="6" dir="rtl" placeholder="Détails de l'annonce..." value={currentAnnonce.text || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, text: e.target.value})} disabled={isSaving} />
                  {formErrors.text && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.text}</span>}
                </div>
              </div>
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 3rem' }} disabled={isSaving}>
                  {isSaving ? <><Spinner size={16} color="white" /> Publication...</> : 'Publier l\'Annonce'}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)} disabled={isSaving}>Annuler</button>
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="section-box" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ImageIcon size={18} /> Poster / Image *
              </h3>
              <div style={{ border: '2px dashed var(--gray-200)', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: isSaving ? 'not-allowed' : 'pointer', background: 'var(--gray-50)' }} 
                   onClick={() => !isSaving && document.getElementById('poster-upload').click()}>
                <input type="file" id="poster-upload" hidden accept="image/*" disabled={isSaving} onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setCurrentAnnonce({...currentAnnonce, image: reader.result});
                    reader.readAsDataURL(file);
                  }
                }} />
                {currentAnnonce.image ? (
                  <img src={currentAnnonce.image} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
                ) : (
                  <div>
                    <Plus size={32} style={{ color: 'var(--gray-400)', marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-500)' }}>Cliquez pour importer le poster</p>
                  </div>
                )}
              </div>
              {formErrors.image && <span style={{color:'var(--danger)', fontSize:'0.8rem', marginTop:'0.5rem', display:'block'}}>{formErrors.image}</span>}
            </div>

            <div className="section-box" style={{ padding: '1.5rem', background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '1rem' }}>Aperçu sur le site</h4>
              <div className="event-card" style={{ pointerEvents: 'none', margin: 0 }}>
                <div className="event-card-image" style={{ height: '150px' }}>
                  {currentAnnonce.image ? <img src={currentAnnonce.image} alt="" /> : <div style={{ background:'var(--green-900)', width:'100%', height:'100%' }} />}
                </div>
                <div className="event-card-content" style={{ padding: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{currentAnnonce.title || 'Titre de l\'annonce'}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                    📅 {currentAnnonce.date || '--/--/----'} {currentAnnonce.startTime ? `| 🕒 ${currentAnnonce.startTime}` : ''} | 📍 {currentAnnonce.location || 'Lieu'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}><Megaphone size={24} /> Gestion des Annonces</h1>
          <p className="text-muted">{filteredAnnonces.length} annonce(s) au total</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-icon" onClick={loadData} title="Actualiser" disabled={isLoading}>
            <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
          </button>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input type="text" className="form-control" placeholder="Rechercher..." 
              style={{ paddingLeft: '2.5rem', width: '280px', height: '44px' }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={handleAdd} style={{ height: '44px' }}><Plus size={18} /> Nouvelle Annonce</button>
        </div>
      </div>

      {error && (
        <div className="error-banner" style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: '8px', color: 'var(--red-700)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="btn-ghost" onClick={loadData} style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'inherit' }}>Réessayer</button>
        </div>
      )}

      {isLoading && annonces.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <Spinner size={40} />
          <p className="text-muted" style={{ marginTop: '1rem' }}>Chargement des annonces...</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredAnnonces.map(annonce => (
            <AdminCard 
              key={annonce.id}
              title={annonce.title}
              date={annonce.date}
              time={annonce.startTime}
              location={annonce.location}
              image={annonce.image}
              type={annonce.type}
              onEdit={() => handleEdit(annonce)}
              onDelete={() => handleDelete(annonce.id)}
              onViewRegistrations={(annonce.type === 'evenement' || !annonce.type) ? () => handleViewRegistrations(annonce) : null}
            />
          ))}
        </div>
      )}

      {filteredAnnonces.length === 0 && !isLoading && (
        <div className="section-box" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--gray-300)', marginBottom: '1rem' }}><Megaphone size={48} /></div>
          <h3 style={{ color: 'var(--gray-500)' }}>{search ? 'Aucune annonce ne correspond à votre recherche' : 'Aucune annonce publiée'}</h3>
          {!search && <button className="btn-primary" onClick={handleAdd} style={{ marginTop: '1rem' }}><Plus size={18} /> Publier la première annonce</button>}
        </div>
      )}
    </div>
  );
}

