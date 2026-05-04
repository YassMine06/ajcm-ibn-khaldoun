import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, Mail, Phone, Calendar, 
  ChevronRight, ArrowLeft, ClipboardList
} from 'lucide-react';

const mockRegistrations = [
  { id: 1, member: 'Ahmed Benali', email: 'ahmed@mail.com', phone: '0612345678', activity: 'Atelier Théâtre', date: '01/05/2026', message: 'Accessible aux débutants?' },
  { id: 2, member: 'Sara Moussaoui', email: 'sara@mail.com', phone: '0698765432', activity: 'Formation Anashid', date: '30/04/2026' },
  { id: 3, member: 'Youssef El Idrissi', email: 'youssef@mail.com', phone: '0611223344', activity: 'Camp Imouzzer', date: '29/04/2026' },
  { id: 4, member: 'Amina Zahraoui', email: 'amina@mail.com', phone: '0655443322', activity: 'Soirée Coranique', date: '28/04/2026' },
];

export default function RegistrationsManager() {
  const location = useLocation();
  const { eventName } = useParams();
  const [rows, setRows] = useState(mockRegistrations);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState('');

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

  const navigate = useNavigate();

  const handleBack = () => {
    setSelectedEvent(null);
    navigate('/admin/registrations');
  };

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
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="page-title"><UserCheck size={24} /> Gestion des inscriptions</h1>
        <p className="text-muted">Sélectionnez un événement pour gérer les participants.</p>
      </div>

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

      {events.length === 0 && (
        <div className="section-box" style={{ padding: '4rem', textAlign: 'center' }}>
          <ClipboardList size={48} style={{ color: 'var(--gray-200)', marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--gray-400)' }}>Aucune inscription trouvée</h3>
        </div>
      )}
    </div>
  );
}