import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, Mail, Phone, Calendar, 
  ChevronRight, ArrowLeft, ClipboardList, AlertCircle, RefreshCw
} from 'lucide-react';
import Spinner from '../../components/common/Spinner';
import registrationService from '../../api/registrationService';
import useAsync from '../../hooks/useAsync';
import { mockRegistrations } from '../../api/mockData';

export default function RegistrationsManager() {
  const location = useLocation();
  const { eventName } = useParams();
  const navigate = useNavigate();
  
  const [rows, setRows] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState('');

  const { execute: fetchRegistrations, isLoading, error } = useAsync(async () => {
    try {
      return await registrationService.getAll();
    } catch (err) {
      // Fallback to mock data if API fails (useful for development)
      console.warn("API failed, using mock data", err);
      return mockRegistrations;
    }
  });

  const loadData = useCallback(async () => {
    const data = await fetchRegistrations();
    setRows(data);
  }, [fetchRegistrations]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const events = useMemo(() => {
    const unique = Array.from(new Set(rows.map(r => r.activity)));
    return unique.map(title => ({
      title,
      count: rows.filter(r => r.activity === title).length
    }));
  }, [rows]);

  useEffect(() => {
    const titleToSelect = eventName || location.state?.autoSelect;
    if (titleToSelect) {
      const found = events.find(e => e.title.toLowerCase() === titleToSelect.toLowerCase());
      if (found) {
        setSelectedEvent(found);
      }
    }
  }, [events, eventName, location.state]);

  const filteredParticipants = useMemo(() => {
    if (!selectedEvent) return [];
    return rows.filter(r => 
      r.activity === selectedEvent.title && 
      (r.member.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [rows, selectedEvent, search]);

  const handleBack = () => {
    setSelectedEvent(null);
    navigate('/admin/registrations');
  };

  if (isLoading && rows.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem' }}>
        <Spinner size={40} />
        <p className="text-muted" style={{ marginTop: '1rem' }}>Chargement des inscriptions...</p>
      </div>
    );
  }

  if (selectedEvent) {
    return (
      <div className="page-enter">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button className="btn-icon" onClick={handleBack} style={{ backgroundColor: 'white', border: '1px solid var(--gray-200)' }}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 className="page-title" style={{ margin: 0 }}>{selectedEvent.title}</h1>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>{filteredParticipants.length} participants inscrits</p>
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher un membre..." 
              style={{ width: '250px', paddingLeft: '2.5rem' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Contact</th>
                <th>Message / Note</th>
                <th>Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.member}</td>
                  <td>
                    <div className="text-sm"><Mail size={12} /> {r.email}</div>
                    <div className="text-sm"><Phone size={12} /> {r.phone}</div>
                  </td>
                  <td className="text-sm text-muted">{r.message || '-'}</td>
                  <td className="text-sm">{r.date}</td>
                </tr>
              ))}
              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-400)' }}>
                    Aucun participant trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}><UserCheck size={24} /> Gestion des inscriptions</h1>
          <p className="text-muted">Sélectionnez un événement pour gérer les participants.</p>
        </div>
        <button className="btn-icon" onClick={loadData} title="Actualiser" disabled={isLoading}>
          <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="error-banner" style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: '8px', color: 'var(--red-700)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={20} />
          <span>Une erreur est survenue lors du chargement. Utilisation des données locales.</span>
        </div>
      )}

      <div className="events-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {events.map((ev, i) => (
          <div key={i} className="stat-card" onClick={() => setSelectedEvent(ev)} style={{ cursor: 'pointer', padding: '1.5rem', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div className="stat-icon" style={{ backgroundColor: 'var(--green-100)', color: 'var(--green-700)' }}>
                <ClipboardList size={20} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-success"><Users size={12} /> {ev.count}</span>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>{ev.title}</h3>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-700)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Voir les détails <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && !isLoading && (
        <div className="section-box" style={{ padding: '4rem', textAlign: 'center' }}>
          <ClipboardList size={48} style={{ color: 'var(--gray-200)', marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--gray-400)' }}>Aucune inscription trouvée</h3>
        </div>
      )}
    </div>
  );
}

