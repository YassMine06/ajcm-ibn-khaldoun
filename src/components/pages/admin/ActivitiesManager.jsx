import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './ActivitiesManager.css';
import axios from 'axios';
import { 
  Plus, Search, Image as ImageIcon, Video, X, Clock, ClipboardList,
  Edit2, Calendar, MapPin, UserPlus
} from 'lucide-react';
import AdminCard from '../../shared/AdminCard';
import TimePicker from '../../shared/TimePicker';

const initialEventState = { 
  folder: '', title: '', desc: '', date: '', startDate: '', endDate: '', 
  startTime: '', membres: '', guest: '', lieu: '', description_ar: '', 
  description_fr: '', categoryId: 'cat-1', media: [], maxParticipants: '' 
};

export default function ActivitiesManager() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(initialEventState);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try { 
      const res = await axios.get('http://localhost:5000/api/events'); 
      setEvents(res.data); 
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchEvents(); 
    if (location.state?.openForm) {
      startAdd();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filtered = useMemo(() => {
    return events.filter(e =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.lieu?.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const handleDelete = async (folder) => {
    if (window.confirm('Supprimer cet événement ?')) {
      try { 
        await axios.delete(`http://localhost:5000/api/events/${encodeURIComponent(folder)}`); 
        fetchEvents(); 
      } catch (err) {
        console.error("Deletion failed:", err);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const startEdit = (event) => { 
    setCurrentEvent({ ...initialEventState, ...event }); 
    setIsEditing(true); 
  };

  const startAdd = () => {
    setCurrentEvent(initialEventState);
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Comprehensive Validation
    if (!currentEvent.title || !currentEvent.folder) {
      alert("Le titre et l'identifiant (ID Dossier) sont obligatoires.");
      return;
    }

    if (!currentEvent._posterPreview && (!currentEvent.media || currentEvent.media.length === 0)) {
      alert("Le poster principal est obligatoire.");
      return;
    }

    try {
      const isExisting = events.some(ev => ev.folder === currentEvent.folder);
      if (isExisting) {
        await axios.put(`http://localhost:5000/api/events/${encodeURIComponent(currentEvent.folder)}`, currentEvent);
      } else {
        await axios.post('http://localhost:5000/api/events', currentEvent);
      }
      setIsEditing(false); 
      fetchEvents();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  if (isEditing) {
    return (
      <div className="page-enter">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0 }}>
              <div className="sidebar-logo-icon" style={{ display: 'inline-flex', marginRight: '0.75rem', width: '32px', height: '32px' }}>
                <Plus size={18} color="var(--green-700)" />
              </div>
              {events.some(ev => ev.folder === currentEvent.folder) ? 'Modifier' : 'Nouvel'} Événement
            </h1>
          </div>
          <button className="btn-ghost" onClick={() => setIsEditing(false)}>Retour à la liste</button>
        </div>

        <div className="dashboard-sections" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          <div className="section-box" style={{ padding: '2rem' }}>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="form-section">
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-800)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Edit2 size={16} /> Informations de base
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>Titre de l'événement *</label>
                      <input type="text" className="form-control" value={currentEvent.title}
                        onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })} 
                        placeholder="Ex: Conférence sur l'IA" required />
                    </div>
                    <div className="form-group">
                      <label><Calendar size={14} style={{ marginRight: '4px' }} /> Date</label>
                      <input type="date" className="form-control" value={currentEvent.date || currentEvent.startDate || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value, startDate: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label><Clock size={14} style={{ marginRight: '4px' }} /> Heure de début</label>
                      <TimePicker value={currentEvent.startTime} onChange={(time) => setCurrentEvent({ ...currentEvent, startTime: time })} />
                    </div>
                    <div className="form-group">
                      <label><MapPin size={14} style={{ marginRight: '4px' }} /> Lieu</label>
                      <input type="text" className="form-control" value={currentEvent.lieu}
                        onChange={e => setCurrentEvent({ ...currentEvent, lieu: e.target.value })} placeholder="Mohammedia" />
                    </div>
                    <div className="form-group">
                      <label><UserPlus size={14} style={{ marginRight: '4px' }} /> Invités</label>
                      <input type="text" className="form-control" value={currentEvent.guest || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, guest: e.target.value })} 
                        placeholder="Ex: Ahmed, Sara" />
                    </div>
                    <div className="form-group">
                      <label><Plus size={14} style={{ marginRight: '4px' }} /> Nombre Max Participants</label>
                      <input type="number" className="form-control" value={currentEvent.maxParticipants || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, maxParticipants: e.target.value })} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>ID Dossier (Identifiant unique) *</label>
                      <input type="text" className="form-control" value={currentEvent.folder}
                        onChange={e => setCurrentEvent({ ...currentEvent, folder: e.target.value })}
                        placeholder="Ex: conference-ia-2026"
                        required disabled={events.some(ev => ev.folder === currentEvent.folder)} />
                    </div>
                  </div>
                </div>

                <div className="divider" style={{ margin: 0 }}></div>

                <div className="form-section">
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-800)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardList size={16} /> Contenu & Description
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label>Description (Français)</label>
                      <textarea className="form-control" rows="5" value={currentEvent.description_fr}
                        onChange={e => setCurrentEvent({ ...currentEvent, description_fr: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Description (Arabe)</label>
                      <textarea className="form-control" rows="5" value={currentEvent.description_ar}
                        onChange={e => setCurrentEvent({ ...currentEvent, description_ar: e.target.value })} dir="rtl" />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid var(--gray-100)', paddingTop: '2rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2.5rem' }}>Enregistrer</button>
                <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="section-box" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-700)', marginBottom: '1rem' }}>Poster Principal *</h3>
              <div className="image-upload-wrapper">
                <input type="file" accept="image/*" id="activity-poster" style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setCurrentEvent({ ...currentEvent, _posterPreview: reader.result, _posterFile: file });
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
                <label htmlFor="activity-poster" className="image-upload-dropzone" style={{ height: '180px' }}>
                  {(currentEvent._posterPreview || (currentEvent.media && currentEvent.media[0])) ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <img src={currentEvent._posterPreview || currentEvent.media[0]} alt="Poster" className="image-preview" />
                    </div>
                  ) : (
                    <div className="upload-placeholder"><ImageIcon size={24} /><span style={{ fontSize: '0.75rem' }}>Poster Principal</span></div>
                  )}
                </label>
              </div>
            </div>

            <div className="section-box" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-700)', marginBottom: '1rem' }}>Galerie Multimédia</h3>
              <div className="image-upload-wrapper">
                <input type="file" accept="image/*,video/*" id="activity-media" multiple style={{ display: 'none' }}
                  onChange={async e => {
                    const files = Array.from(e.target.files);
                    const newPreviews = await Promise.all(files.map(file => {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve({ url: reader.result, type: file.type.startsWith('video') ? 'video' : 'image', file });
                        reader.readAsDataURL(file);
                      });
                    }));
                    setCurrentEvent({ ...currentEvent, _mediaPreviews: [...(currentEvent._mediaPreviews || []), ...newPreviews] });
                  }} 
                />
                <label htmlFor="activity-media" className="image-upload-dropzone" style={{ height: '80px', borderStyle: 'dashed' }}>
                  <div className="upload-placeholder"><Plus size={20} /><span style={{ fontSize: '0.75rem' }}>Ajouter des médias</span></div>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                  {(currentEvent._mediaPreviews || []).map((m, idx) => (
                    <div key={idx} style={{ position: 'relative', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                      {m.type === 'video' ? <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={16} color="white" /></div> : <img src={m.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      <button type="button" onClick={() => setCurrentEvent({ ...currentEvent, _mediaPreviews: currentEvent._mediaPreviews.filter((_, i) => i !== idx) })}
                        style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={10} /></button>
                    </div>
                  ))}
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
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}><ClipboardList size={24} /> Gestion des événements</h1>
          <p className="text-muted">{filtered.length} événements répertoriés</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input type="text" className="form-control" placeholder="Rechercher..." style={{ paddingLeft: '2.5rem', width: '280px', height: '44px' }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={startAdd} style={{ height: '44px' }}><Plus size={18} /> Ajouter</button>
        </div>
      </div>

      <div className="events-grid">
        {filtered.map((event) => (
          <AdminCard 
            key={event.folder}
            title={event.title}
            date={event.date}
            location={event.lieu}
            image={event.media?.[0]}
            type="activite"
            onEdit={() => startEdit(event)}
            onDelete={() => handleDelete(event.folder)}
          />
        ))}
      </div>
      
      {filtered.length === 0 && !isLoading && (
        <div className="section-box" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--gray-300)', marginBottom: '1rem' }}><Search size={48} /></div>
          <h3 style={{ color: 'var(--gray-500)' }}>Aucun événement trouvé</h3>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Chargement...</div>
      )}
    </div>
  );
}
