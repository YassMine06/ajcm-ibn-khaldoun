import React, { useState, useEffect } from 'react';
import './ActivitiesManager.css';
import axios from 'axios';
import { 
  Plus, Search, Image as ImageIcon, Video, X, Clock, ClipboardList,
  Edit2, Calendar, MapPin, UserPlus
} from 'lucide-react';
import AdminCard from '../../shared/AdminCard';
import TimePicker from '../../shared/TimePicker';

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
    setCurrentEvent({ folder: '', title: '', desc: '', date: '', startDate: '', endDate: '', startTime: '', membres: '', guest: '', lieu: '', description_ar: '', description_fr: '', categoryId: 'cat-1', media: [] });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!currentEvent._posterPreview && !currentEvent.media?.[0]) {
      alert("Le poster principal est obligatoire.");
      return;
    }

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
      <div className="page-enter">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 className="page-title" style={{ margin: 0 }}>
            <div className="sidebar-logo-icon" style={{ display: 'inline-flex', marginRight: '0.75rem', width: '32px', height: '32px' }}>
              <Plus size={18} color="var(--green-700)" />
            </div>
            {events.find(ev => ev.folder === currentEvent.folder) ? 'Modifier' : 'Nouvel'} Événement
          </h1>
          <button className="btn-ghost" onClick={() => setIsEditing(false)}>Retour à la liste</button>
        </div>

        <div className="dashboard-sections" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          {/* Main Form Area */}
          <div className="section-box" style={{ padding: '2rem' }}>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Section: Basic Info */}
                <div className="form-section">
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-800)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Edit2 size={16} /> Informations de base
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>Titre de l'événement</label>
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
                      <TimePicker 
                        value={currentEvent.startTime} 
                        onChange={(time) => setCurrentEvent({ ...currentEvent, startTime: time })} 
                      />
                    </div>
                    <div className="form-group">
                      <label><MapPin size={14} style={{ marginRight: '4px' }} /> Lieu</label>
                      <input type="text" className="form-control" value={currentEvent.lieu}
                        onChange={e => setCurrentEvent({ ...currentEvent, lieu: e.target.value })} placeholder="Mohammedia" />
                    </div>
                    <div className="form-group">
                      <label><UserPlus size={14} style={{ marginRight: '4px' }} /> Invités (Séparer par des virgules)</label>
                      <input type="text" className="form-control" value={currentEvent.guest || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, guest: e.target.value })} 
                        placeholder="Ex: Ahmed, Sara, Dr. Karim" />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>ID Dossier (Identifiant unique)</label>
                      <input type="text" className="form-control" value={currentEvent.folder}
                        onChange={e => setCurrentEvent({ ...currentEvent, folder: e.target.value })}
                        placeholder="Ex: conference-ia-2026"
                        required disabled={!!events.find(ev => ev.folder === currentEvent.folder)} />
                    </div>
                  </div>
                </div>

                <div className="divider" style={{ margin: 0 }}></div>

                {/* Section: Content */}
                <div className="form-section">
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-800)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardList size={16} /> Contenu & Description
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Description (Français) <span>🇫🇷</span>
                      </label>
                      <textarea className="form-control" rows="5" value={currentEvent.description_fr}
                        onChange={e => setCurrentEvent({ ...currentEvent, description_fr: e.target.value })} 
                        placeholder="Décrivez l'événement en français..." />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <span>🇲🇦</span> Description (Arabe)
                      </label>
                      <textarea className="form-control" rows="5" value={currentEvent.description_ar}
                        onChange={e => setCurrentEvent({ ...currentEvent, description_ar: e.target.value })} 
                        dir="rtl" placeholder="...صف الحدث باللغة العربية" />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid var(--gray-100)', paddingTop: '2rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2.5rem' }}>
                  Enregistrer l'activité
                </button>
                <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </form>
          </div>

          {/* Sidebar / Media Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Main Poster */}
            <div className="section-box" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-700)', marginBottom: '1rem' }}>Poster Principal <span style={{ color: 'var(--danger)' }}>*</span></h3>
              <div className="image-upload-wrapper">
                <input 
                  type="file" 
                  accept="image/*" 
                  id="activity-poster"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setCurrentEvent({ ...currentEvent, _posterPreview: reader.result, _posterFile: file });
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
                <label htmlFor="activity-poster" className="image-upload-dropzone" style={{ height: '180px' }}>
                  {(currentEvent._posterPreview || currentEvent.media?.[0]) ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <img src={currentEvent._posterPreview || currentEvent.media?.[0]} alt="Poster" className="image-preview" />
                      <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                        Changer
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <ImageIcon size={24} />
                      <span style={{ fontSize: '0.75rem' }}>Sélectionner le Poster</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Multimedia Gallery */}
            <div className="section-box" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-700)' }}>Galerie (Photos/Vidéos) <span style={{ color: 'var(--danger)' }}>*</span></h3>
                <span className="badge badge-danger">Obligatoire</span>
              </div>
              
              <div className="image-upload-wrapper">
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  id="activity-media"
                  multiple
                  style={{ display: 'none' }}
                  onChange={async e => {
                    const files = Array.from(e.target.files);
                    const newPreviews = await Promise.all(files.map(file => {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve({ url: reader.result, type: file.type.startsWith('video') ? 'video' : 'image', file });
                        reader.readAsDataURL(file);
                      });
                    }));
                    setCurrentEvent({ 
                      ...currentEvent, 
                      _mediaPreviews: [...(currentEvent._mediaPreviews || []), ...newPreviews] 
                    });
                  }} 
                />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label htmlFor="activity-media" className="image-upload-dropzone" style={{ height: '80px', borderStyle: 'dashed' }}>
                    <div className="upload-placeholder">
                      <Plus size={20} />
                      <span style={{ fontSize: '0.75rem' }}>Ajouter au flux</span>
                    </div>
                  </label>

                  {/* Media Previews Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {(currentEvent._mediaPreviews || []).map((m, idx) => (
                      <div key={idx} style={{ position: 'relative', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                        {m.type === 'video' ? (
                          <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Video size={16} color="white" />
                          </div>
                        ) : (
                          <img src={m.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        <button 
                          type="button"
                          onClick={() => {
                            const updated = currentEvent._mediaPreviews.filter((_, i) => i !== idx);
                            setCurrentEvent({ ...currentEvent, _mediaPreviews: updated });
                          }}
                          style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="section-box" style={{ padding: '1.5rem', background: 'var(--green-900)', color: 'white' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-400)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Format "Insta"</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.5', opacity: 0.8 }}>
                Les médias s'afficheront sous forme de carrousel balayable sur le site public, exactement comme sur Instagram.
              </p>
            </div> */}
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
          <p className="text-muted">{filtered.length} activités répertoriées</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input type="text" className="form-control" placeholder="Rechercher..." 
              style={{ paddingLeft: '2.5rem', width: '280px', height: '44px' }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={handleAdd} style={{ height: '44px' }}><Plus size={18} /> Ajouter une activité</button>
        </div>
      </div>

      <div className="events-grid">
        {filtered.map((event, i) => (
          <AdminCard 
            key={i}
            title={event.title}
            date={event.date}
            location={event.lieu}
            image={event.media?.[0]}
            type="activite"
            onEdit={() => handleEdit(event)}
            onDelete={() => handleDelete(event.folder)}
          />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="section-box" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--gray-300)', marginBottom: '1rem' }}><Search size={48} /></div>
          <h3 style={{ color: 'var(--gray-500)' }}>Aucun événement trouvé pour "{search}"</h3>
        </div>
      )}
    </div>
  );
}
