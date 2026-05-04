import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './ActivitiesManager.css';
import { 
  Plus, Search, Image as ImageIcon, Video, X, Clock, ClipboardList,
  Edit2, Calendar, MapPin, UserPlus, AlertCircle, RefreshCw
} from 'lucide-react';
import AdminCard from '../../components/common/AdminCard';
import TimePicker from '../../components/common/TimePicker';
import Spinner from '../../components/common/Spinner';
import useEvents from '../../hooks/useEvents';

const initialEventState = { 
  folder: '', title: '', desc: '', date: '', startDate: '', endDate: '', 
  startTime: '', membres: '', guest: '', lieu: '', description_ar: '', 
  description_fr: '', categoryId: 'cat-1', media: [], maxParticipants: '' 
};

export default function ActivitiesManager() {
  const location = useLocation();
  const { events, isLoading, error, refresh, deleteEvent, saveEvent } = useEvents();
  
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(initialEventState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { 
    if (location.state?.openForm) {
      startAdd();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filtered = useMemo(() => {
    return (events || []).filter(e =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.lieu?.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const handleDelete = async (folder) => {
    if (window.confirm('Supprimer cet événement ?')) {
      try { 
        await deleteEvent(folder);
      } catch (err) {
        alert("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  const startEdit = (event) => { 
    // Format dates for <input type="date"> (expects YYYY-MM-DD)
    const formatDate = (dateStr) => {
      if (!dateStr || !dateStr.includes('/')) return dateStr || '';
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      return dateStr;
    };
    
    const formattedStart = formatDate(event.date || event.startDate);
    const formattedEnd = formatDate(event.endDate);
    
    setCurrentEvent({ 
      ...initialEventState, 
      ...event, 
      date: formattedStart, 
      startDate: formattedStart,
      endDate: formattedEnd
    }); 
    setIsEditing(true); 
  };

  const startAdd = () => {
    setCurrentEvent(initialEventState);
    setIsEditing(true);
  };

  const handleTitleChange = (title) => {
    const updates = { title };
    // Auto-generate folder ID if it's a new event and folder is empty or matches previous auto-gen
    const currentAutoFolder = currentEvent.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    if (!events.some(ev => ev.folder === currentEvent.folder) && (currentEvent.folder === '' || currentEvent.folder === currentAutoFolder)) {
      updates.folder = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    setCurrentEvent({ ...currentEvent, ...updates });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!currentEvent.title || !currentEvent.folder) {
      alert("Le titre et l'identifiant (ID Dossier) sont obligatoires.");
      return;
    }

    setIsSaving(true);
    try {
      // Clean up the object before sending
      const dataToSave = { ...currentEvent };
      delete dataToSave._posterPreview;
      delete dataToSave._posterFile;
      delete dataToSave._mediaPreviews;

      await saveEvent(currentEvent.folder, dataToSave);
      setIsEditing(false); 
    } catch (err) {
      alert("Erreur lors de l'enregistrement: " + (err.message || "Erreur serveur"));
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    const isNew = !events.some(ev => ev.folder === currentEvent.folder);

    return (
      <div className="page-enter">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0 }}>
              <div className="sidebar-logo-icon" style={{ display: 'inline-flex', marginRight: '0.75rem', width: '32px', height: '32px' }}>
                <Plus size={18} color="var(--green-700)" />
              </div>
              {!isNew ? 'Modifier' : 'Nouvel'} Événement
            </h1>
          </div>
          <button className="btn-ghost" onClick={() => setIsEditing(false)} disabled={isSaving}>Retour à la liste</button>
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
                        onChange={e => handleTitleChange(e.target.value)} 
                        placeholder="Ex: Conférence sur l'IA" required disabled={isSaving} />
                    </div>
                    <div className="form-group">
                      <label><Calendar size={14} style={{ marginRight: '4px' }} /> Date de début</label>
                      <input type="date" className="form-control" value={currentEvent.date || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value, startDate: e.target.value })} disabled={isSaving} />
                    </div>
                    <div className="form-group">
                      <label><Calendar size={14} style={{ marginRight: '4px' }} /> Date de fin</label>
                      <input type="date" className="form-control" value={currentEvent.endDate || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, endDate: e.target.value })} disabled={isSaving} />
                    </div>
                    <div className="form-group">
                      <label><Clock size={14} style={{ marginRight: '4px' }} /> Heure de début</label>
                      <TimePicker value={currentEvent.startTime} onChange={(time) => setCurrentEvent({ ...currentEvent, startTime: time })} />
                    </div>
                    <div className="form-group">
                      <label><MapPin size={14} style={{ marginRight: '4px' }} /> Lieu</label>
                      <input type="text" className="form-control" value={currentEvent.lieu}
                        onChange={e => setCurrentEvent({ ...currentEvent, lieu: e.target.value })} placeholder="Mohammedia" disabled={isSaving} />
                    </div>
                    <div className="form-group">
                      <label><UserPlus size={14} style={{ marginRight: '4px' }} /> Invités</label>
                      <input type="text" className="form-control" value={currentEvent.guest || ''}
                        onChange={e => setCurrentEvent({ ...currentEvent, guest: e.target.value })} 
                        placeholder="Ex: Ahmed, Sara" disabled={isSaving} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>ID Dossier (Identifiant unique) *</label>
                      <input type="text" className="form-control" value={currentEvent.folder}
                        onChange={e => setCurrentEvent({ ...currentEvent, folder: e.target.value })}
                        placeholder="Ex: conference-ia-2026"
                        required disabled={isSaving || !isNew} />
                      <small style={{ color: 'var(--gray-500)', fontSize: '0.7rem', marginTop: '0.25rem', display: 'block' }}>
                        {!isNew ? "L'identifiant ne peut pas être modifié une fois créé." : "Sera utilisé comme nom de dossier pour les fichiers."}
                      </small>
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
                        onChange={e => setCurrentEvent({ ...currentEvent, description_fr: e.target.value })} disabled={isSaving} />
                    </div>
                    <div className="form-group">
                      <label>Description (Arabe)</label>
                      <textarea className="form-control" rows="5" value={currentEvent.description_ar}
                        onChange={e => setCurrentEvent({ ...currentEvent, description_ar: e.target.value })} dir="rtl" disabled={isSaving} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid var(--gray-100)', paddingTop: '2rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2.5rem' }} disabled={isSaving}>
                  {isSaving ? <><Spinner size={16} color="white" /> Enregistrement...</> : 'Enregistrer'}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)} disabled={isSaving}>Annuler</button>
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="section-box" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-700)', marginBottom: '1rem' }}>Poster Principal *</h3>
              <div className="image-upload-wrapper">
                <input type="file" accept="image/*" id="activity-poster" style={{ display: 'none' }}
                  disabled={isSaving}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setCurrentEvent({ ...currentEvent, _posterPreview: reader.result, _posterFile: file });
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
                <label htmlFor="activity-poster" className="image-upload-dropzone" style={{ height: '180px', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
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
                  disabled={isSaving}
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
                <label htmlFor="activity-media" className="image-upload-dropzone" style={{ height: '80px', borderStyle: 'dashed', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
                  <div className="upload-placeholder"><Plus size={20} /><span style={{ fontSize: '0.75rem' }}>Ajouter des médias</span></div>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                  {(currentEvent._mediaPreviews || []).map((m, idx) => (
                    <div key={idx} style={{ position: 'relative', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                      {m.type === 'video' ? <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={16} color="white" /></div> : <img src={m.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      <button type="button" onClick={() => setCurrentEvent({ ...currentEvent, _mediaPreviews: currentEvent._mediaPreviews.filter((_, i) => i !== idx) })}
                        disabled={isSaving}
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
          <button className="btn-icon" onClick={refresh} title="Actualiser" disabled={isLoading}>
            <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
          </button>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '0.85rem', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input type="text" className="form-control" placeholder="Rechercher..." style={{ paddingLeft: '2.5rem', width: '280px', height: '44px' }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={startAdd} style={{ height: '44px' }}><Plus size={18} /> Ajouter événement</button>
        </div>
      </div>

      {error && (
        <div className="error-banner" style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: '8px', color: 'var(--red-700)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="btn-ghost" onClick={refresh} style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'inherit' }}>Réessayer</button>
        </div>
      )}

      {isLoading && events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <Spinner size={40} />
          <p className="text-muted" style={{ marginTop: '1rem' }}>Chargement des événements...</p>
        </div>
      ) : (
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
      )}
      
      {filtered.length === 0 && !isLoading && (
        <div className="section-box" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--gray-300)', marginBottom: '1rem' }}><Search size={48} /></div>
          <h3 style={{ color: 'var(--gray-500)' }}>{search ? 'Aucun événement ne correspond à votre recherche' : 'Aucun événement trouvé'}</h3>
          {!search && <button className="btn-primary" onClick={startAdd} style={{ marginTop: '1rem' }}><Plus size={18} /> Créer le premier événement</button>}
        </div>
      )}
    </div>
  );
}

