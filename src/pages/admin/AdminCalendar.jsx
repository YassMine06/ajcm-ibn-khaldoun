import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCalendar.css';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import eventService from '../../api/eventService';
import annonceService from '../../api/annonceService';
import useAsync from '../../hooks/useAsync';
import Spinner from '../../components/common/Spinner';

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

export default function AdminCalendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [today] = useState(new Date());
  const [current, setCurrent] = useState(new Date());
  const [active, setActive] = useState(null);

  const { execute: fetchCalendarData, isLoading, error } = useAsync(async () => {
    const [eventsData, annoncesData] = await Promise.all([
      eventService.getAll(),
      annonceService.getAll()
    ]);
    
    return [
      ...(eventsData || []).map(e => {
        const rawDate = e.date || e.startDate;
        if (!rawDate) return null;
        const d = new Date(rawDate);
        const localDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        return { ...e, calendarDate: localDate, isActivity: true };
      }).filter(Boolean),
      ...(annoncesData || [])
        .filter(a => a.type === 'evenement' || a.type === 'événement')
        .map(a => {
          const d = new Date(a.date);
          const localDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
          return { ...a, calendarDate: localDate, isAnnonce: true };
        })
    ];
  });

  const loadData = useCallback(async () => {
    try {
      const data = await fetchCalendarData();
      setEvents(data || []);
    } catch (err) {}
  }, [fetchCalendarData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => { setActive(null); setCurrent(new Date(year, month - 1, 1)); };
  const next = () => { setActive(null); setCurrent(new Date(year, month + 1, 1)); };

  const cells = useMemo(() => {
    const c = [];
    for (let i = 0; i < firstDay; i++) c.push(null);
    for (let d = 1; d <= daysInMonth; d++) c.push(d);
    return c;
  }, [firstDay, daysInMonth]);

  const getDayEvents = useCallback((day) => {
    return events.filter(e => {
      const d = e.calendarDate;
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  }, [events, month, year]);

  const panelEvents = useMemo(() => {
    if (active) return getDayEvents(active);
    return events.filter(e => {
      const d = e.calendarDate;
      return d.getMonth() === month && d.getFullYear() === year;
    }).sort((a, b) => a.calendarDate - b.calendarDate);
  }, [events, active, month, year, getDayEvents]);

  const handleDayClick = (day) => {
    if (!day) return;
    setActive(active === day ? null : day);
  };

  const handleNavigateToEdit = (evt) => {
    const route = evt.isAnnonce ? '/admin/annonces' : '/admin/activities';
    navigate(route, { state: { initialDate: evt.date || evt.startDate } });
  };

  return (
    <div style={{ width: '100%' }} className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}><CalendarIcon size={24} /> Gestion du Calendrier</h1>
        <button className="btn-icon" onClick={loadData} title="Actualiser" disabled={isLoading}>
          <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="error-banner" style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: '8px', color: 'var(--red-700)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button className="btn-ghost" onClick={loadData} style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'inherit' }}>Réessayer</button>
        </div>
      )}
      
      <div className="calendar-split">
        {/* LEFT - Mini Calendar Widget */}
        <div className="cal-left">
          <div className="cal-card">
            <div className="cal-header">
              <button className="cal-nav-btn" onClick={prev}><ChevronLeft size={18} /></button>
              
              <div className="cal-selectors">
                <select 
                  className="cal-select"
                  value={month} 
                  onChange={(e) => { setActive(null); setCurrent(new Date(year, parseInt(e.target.value), 1)); }}
                >
                  {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
                <select 
                  className="cal-select"
                  value={year} 
                  onChange={(e) => { setActive(null); setCurrent(new Date(parseInt(e.target.value), month, 1)); }}
                >
                  {[...Array(11)].map((_, i) => {
                    const y = new Date().getFullYear() - 2 + i;
                    return <option key={y} value={y}>{y}</option>
                  })}
                </select>
              </div>

              <button className="cal-nav-btn" onClick={next}><ChevronRight size={18} /></button>
            </div>

            <div className="cal-day-labels">
              {DAYS.map(d => <div key={d} className="cal-day-label">{d}</div>)}
            </div>

            <div className="cal-grid">
              {cells.map((day, i) => {
                const dayEvents = day ? getDayEvents(day) : [];
                const hasEvts = dayEvents.length > 0;
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const isActive = day === active;
                
                return (
                  <div 
                    key={i} 
                    className={`cal-cell ${!day ? 'cal-cell--empty' : ''} ${hasEvts ? 'cal-cell--has' : ''} ${isToday ? 'cal-cell--today' : ''} ${isActive ? 'cal-cell--active' : ''}`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day && <span className="cal-cell-num">{day}</span>}
                    {hasEvts && (
                      <div className="cal-dots">
                        {dayEvents.slice(0, 3).map((e, idx) => (
                          <span key={idx} className="cal-dot" style={{ backgroundColor: e.isActivity ? 'var(--success)' : 'var(--info)' }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="cal-footer">
              <div className="cal-stat">
                <strong>{panelEvents.length}</strong> {active ? 'événement(s) ce jour' : 'en ce mois'}
              </div>
              <button className="cal-today-btn" onClick={() => { setActive(today.getDate()); setCurrent(new Date()); }}>Aujourd'hui</button>
            </div>
          </div>
        </div>

        {/* RIGHT - Event List */}
        <div className="cal-right">
          <div className="cal-right-header">
            <h2 className="cal-right-title">
              {active ? `${active} ${MONTHS[month]} ${year}` : `${MONTHS[month]} ${year}`}
            </h2>
            <p className="cal-right-sub">{panelEvents.length} événement(s) au total</p>
          </div>

          {isLoading && events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <Spinner size={32} />
              <p className="text-muted" style={{ marginTop: '1rem' }}>Chargement...</p>
            </div>
          ) : panelEvents.length === 0 ? (
            <div className="cal-empty-state">
              <CalendarIcon size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <p>Aucun événement prévu pour cette période.</p>
            </div>
          ) : (
            <div className="cal-event-list">
              {panelEvents.map((evt, idx) => (
                <div key={idx} className="cal-evt-card" onClick={() => handleNavigateToEdit(evt)}>
                  <div className="cal-evt-poster">
                    {evt.image ? (
                      <img src={evt.image.startsWith('data:') ? evt.image : `/${evt.image}`} alt={evt.title} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
                        <CalendarIcon size={24} />
                      </div>
                    )}
                  </div>
                  <div className="cal-evt-body">
                    <span className="cal-evt-type-badge" style={{ 
                      backgroundColor: evt.isActivity ? 'var(--success-bg)' : 'var(--info-bg)',
                      color: evt.isActivity ? 'var(--success)' : 'var(--info)'
                    }}>
                      {evt.isActivity ? 'Activité' : 'Annonce'}
                    </span>
                    <h3 className="cal-evt-title">{evt.title}</h3>
                    <p className="cal-evt-desc">{evt.desc || evt.text || 'Pas de description.'}</p>
                    <div className="cal-evt-meta">
                      <div className="cal-meta-item">
                        <Clock size={14} /> {evt.startTime || 'Heure non spécifiée'}
                      </div>
                      <div className="cal-meta-item">
                        <MapPin size={14} /> {evt.location || evt.lieu || 'AJCM'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

