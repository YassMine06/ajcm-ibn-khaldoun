import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AnnoncesManager.css';
import axios from 'axios';
import { Plus, Check, X, Image as ImageIcon, Layout, Search, Megaphone, Clock } from 'lucide-react';
import AdminCard from '../../shared/AdminCard';
import TimePicker from '../../shared/TimePicker';

const initialAnnonce = { 
  title: '', type: 'actualite', date: '', startTime: '', location: '', text: '', guest: '', image: '', maxParticipants: '' 
};

export default function AnnoncesManager() {
  const [annonces, setAnnonces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnonce, setCurrentAnnonce] = useState(initialAnnonce);
  const [formErrors, setFormErrors] = useState({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAnnonces = async () => {
    try { 
      const res = await axios.get('http://localhost:5000/api/annonces'); 
      setAnnonces(res.data); 
    } catch (err) {
      console.error("Error fetching annonces", err);
    }
  };

  useEffect(() => { 
    fetchAnnonces(); 

    if (location.state?.openForm) {
      setCurrentAnnonce({
        ...initialAnnonce,
        date: location.state.initialDate || '',
        type: 'evenement'
      });
      setIsEditing(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette annonce ?')) {
      try { 
        await axios.delete(`http://localhost:5000/api/annonces/${id}`); 
        fetchAnnonces(); 
      } catch (err) { 
        alert('Erreur lors de la suppression'); 
      }
    }
  };

  const handleViewRegistrations = (annonce) => {
    // Naviguer vers l'URL spécifique des inscrits de cet événement
    navigate(`/admin/registrations/${encodeURIComponent(annonce.title)}`);
  };

  const handleEdit = (annonce) => { 
    setCurrentAnnonce({ ...initialAnnonce, ...annonce }); 
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
    try {
      if (currentAnnonce.id) {
        await axios.put(`http://localhost:5000/api/annonces/${currentAnnonce.id}`, currentAnnonce);
      } else {
        await axios.post('http://localhost:5000/api/annonces', currentAnnonce);
      }
      setIsEditing(false); 
      fetchAnnonces();
    } catch (err) {
      alert('Erreur lors de l\'enregistrement');
    }
  };

  if (isEditing) {
    return (
      <div className="page-enter">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', background: 'white', padding: '1.2rem 2rem', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{currentAnnonce.id ? 'Modifier' : 'Créer'} une Annonce</h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', margin: 0 }}>Remplissez les informations pour publier sur le site</p>
          </div>
          <button className="btn-ghost" onClick={() => setIsEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                  <input type="text" className="form-control" placeholder="Titre accrocheur..." value={currentAnnonce.title || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, title: e.target.value})} />
                  {formErrors.title && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.title}</span>}
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Type *</label>
                  <select className="form-control" value={currentAnnonce.type || 'actualite'} onChange={e => setCurrentAnnonce({...currentAnnonce, type: e.target.value})}>
                    <option value="actualite">Actualité</option>
                    <option value="evenement">Événement</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Date *</label>
                  <input type="date" className="form-control" value={currentAnnonce.date || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, date: e.target.value})} />
                  {formErrors.date && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.date}</span>}
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
                  <input type="text" className="form-control" placeholder="Lieu de l'événement" value={currentAnnonce.location || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, location: e.target.value})} />
                  {formErrors.location && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.location}</span>}
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Invités / Guests</label>
                  <input type="text" className="form-control" placeholder="Séparés par des virgules" value={currentAnnonce.guest || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, guest: e.target.value})} />
                </div>
                {currentAnnonce.type === 'evenement' && (
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Nombre Max de Participants *</label>
                    <input type="number" className="form-control" value={currentAnnonce.maxParticipants || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, maxParticipants: e.target.value})} />
                  </div>
                )}
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Description *</label>
                  <textarea className="form-control" rows="6" dir="rtl" placeholder="Détails de l'annonce..." value={currentAnnonce.text || ''} onChange={e => setCurrentAnnonce({...currentAnnonce, text: e.target.value})} />
                  {formErrors.text && <span style={{color:'var(--danger)', fontSize:'0.8rem'}}>{formErrors.text}</span>}
                </div>
              </div>
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 3rem' }}>Publier l'Annonce</button>
                <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="section-box" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ImageIcon size={18} /> Poster / Image *
              </h3>
              <div style={{ border: '2px dashed var(--gray-200)', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer', background: 'var(--gray-50)' }} 
                   onClick={() => document.getElementById('poster-upload').click()}>
                <input type="file" id="poster-upload" hidden accept="image/*" onChange={e => {
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

  const filteredAnnonces = annonces.filter(a => 
    a.title?.toLowerCase().includes(search.toLowerCase()) || 
    a.text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}><Megaphone size={24} /> Gestion des Annonces</h1>
          <p className="text-muted">{filteredAnnonces.length} annonce(s) au total</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input type="text" className="form-control" placeholder="Rechercher..." 
              style={{ paddingLeft: '2.5rem', width: '280px', height: '44px' }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={handleAdd} style={{ height: '44px' }}><Plus size={18} /> Nouvelle Annonce</button>
        </div>
      </div>

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
    </div>
  );
}
