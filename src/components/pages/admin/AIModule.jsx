import React, { useState } from 'react';
import { 
  Bot, Plus, Trash2, Save, Sparkles, Clock, 
  Wallet, Users, AlertCircle, CheckCircle2, ChevronRight 
} from 'lucide-react';
import './AIModule.css';

const EVENT_TYPES = [
  'Conférence', 'Atelier', 'Formation', 'Réunion', 
  'Compétition', 'Excursion', 'Social'
];

export default function AIModule() {
  const [events, setEvents] = useState([
    { id: Date.now(), type: 'Conférence', duration: '', budget: '', volunteers: '' }
  ]);
  const [isTraining, setIsTraining] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const addEvent = () => {
    setEvents([...events, { id: Date.now() + Math.random(), type: 'Conférence', duration: '', budget: '', volunteers: '' }]);
  };

  const removeEvent = (id) => {
    if (events.length > 1) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const updateEvent = (id, field, value) => {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const validate = () => {
    return events.every(e => e.duration && e.budget && e.volunteers);
  };

  const handleSave = async () => {
    if (!validate()) {
      alert("Veuillez remplir tous les champs numériques pour chaque événement.");
      return;
    }

    setIsTraining(true);
    setFeedback(null);

    // Mock API call for retraining XGBoost
    setTimeout(() => {
      setIsTraining(false);
      setFeedback({
        type: 'success',
        message: 'Modèle XGBoost réentraîné avec succès ! Les prédictions ont été mises à jour.'
      });
      // Clear feedback after 5 seconds
      setTimeout(() => setFeedback(null), 5000);
    }, 2000);
  };

  return (
    <div className="ia-module-page page-enter">
      <div className="ia-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', padding: '0 0 1rem 0', background: 'transparent', boxShadow: 'none', border: 'none', borderBottom: '1px solid var(--gray-100)', borderRadius: 0 }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--saas-text-main)', margin: 0 }}>Module IA</h1>
          <p style={{ color: 'var(--saas-text-muted)', margin: '0.25rem 0 0 0' }}>Alimentez le modèle avec de nouvelles données pour optimiser vos prédictions.</p>
        </div>
      </div>

      {feedback && (
        <div className={`ia-feedback ${feedback.type}`}>
          {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="ia-content">
        <div className="events-builder-section">
          <div className="builder-header">
            <h3>Configuration des Événements</h3>
            <button className="btn-add-event" onClick={addEvent}>
              <Plus size={18} /> Ajouter un événement
            </button>
          </div>

          <div className="ia-events-list">
            {events.map((event, index) => (
              <div key={event.id} className="ia-event-card">
                <div className="card-index">#{index + 1}</div>
                <div className="card-main-form">
                  <div className="form-row">
                    <div className="ia-form-group">
                      <label>Type d'événement</label>
                      <select 
                        value={event.type} 
                        onChange={(e) => updateEvent(event.id, 'type', e.target.value)}
                        className="ia-select"
                      >
                        {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="ia-form-group">
                      <label><Clock size={14} /> Durée (heures)</label>
                      <input 
                        type="number" 
                        placeholder="Ex: 80h" 
                        value={event.duration}
                        onChange={(e) => updateEvent(event.id, 'duration', e.target.value)}
                        className="ia-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="ia-form-group">
                      <label><Wallet size={14} /> Budget limite (DH)</label>
                      <input 
                        type="number" 
                        placeholder="Ex: 5000" 
                        value={event.budget}
                        onChange={(e) => updateEvent(event.id, 'budget', e.target.value)}
                        className="ia-input"
                      />
                    </div>

                    <div className="ia-form-group">
                      <label><Users size={14} /> Volontaires limite</label>
                      <input 
                        type="number" 
                        placeholder="Ex: 15" 
                        value={event.volunteers}
                        onChange={(e) => updateEvent(event.id, 'volunteers', e.target.value)}
                        className="ia-input"
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  className="btn-remove-ia" 
                  onClick={() => removeEvent(event.id)}
                  title="Supprimer"
                  disabled={events.length === 1}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="ia-sidebar-info">
          <button 
            className={`btn-primary ${isTraining ? 'loading' : ''}`} 
            onClick={handleSave}
            disabled={isTraining}
            style={{ 
              border: 'none', 
              borderRadius: '12px', 
              padding: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.75rem', 
              fontWeight: 700,
              width: '100%',
              marginBottom: '0.5rem',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)'
            }}
          >
            {isTraining ? (
              <>En cours...</>
            ) : (
              <><Save size={20} /> Sauvegarder & Réentraîner</>
            )}
          </button>

          <div className="ia-info-card glass">
            <div className="info-icon"><Sparkles size={20} /></div>
            <h4>Logique de Prédiction</h4>
            <p>Le modèle utilise ces paramètres pour calculer le choix optimal d'événements sur une période de 1 mois.</p>
            <ul className="ia-logic-list">
              <li><ChevronRight size={14} /> Optimisation du budget total</li>
              <li><ChevronRight size={14} /> Répartition des volontaires</li>
              <li><ChevronRight size={14} /> Analyse de la durée d'exécution</li>
            </ul>
          </div>

          <div className="ia-status-card">
            <div className="status-label">Statut du modèle</div>
            <div className="status-value active">Prêt pour prédiction</div>
            <div className="status-date">Dernière mise à jour: Aujourd'hui</div>
          </div>
        </div>
      </div>
    </div>
  );
}
