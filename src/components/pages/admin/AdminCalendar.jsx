import React, { useState, useEffect } from 'react';
import './AdminCalendar.css';
import axios from 'axios';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [today] = useState(new Date());
  const [current, setCurrent] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, annoncesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/events'),
          axios.get('http://localhost:5000/api/annonces')
        ]);
        
        // Fusionner activités et annonces de type événement
        const combined = [
          ...eventsRes.data.map(e => {
            const rawDate = e.date || e.startDate;
            if (!rawDate) return null;
            const d = new Date(rawDate);
            // Ajustement pour éviter le décalage de fuseau horaire sur les dates YYYY-MM-DD
            const localDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
            return { ...e, calendarDate: localDate, isActivity: true };
          }).filter(Boolean),
          ...annoncesRes.data
            .filter(a => a.type === 'evenement')
            .map(a => {
              const d = new Date(a.date);
              const localDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
              return { ...a, calendarDate: localDate, isAnnonce: true };
            })
        ];
        setEvents(combined);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
      }
    };
    fetchData();
  }, []);

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDayEvents = (day) => {
    return events.filter(e => {
      const d = e.calendarDate;
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  return (
    <div>
      <h1 className="page-title"><CalendarIcon size={24} /> Calendrier des événements</h1>
      
      <div className="table-container" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-icon" onClick={prev} style={{ border: '1px solid var(--gray-200)' }}><ChevronLeft size={18} /></button>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--gray-900)', minWidth: '180px', textAlign: 'center', letterSpacing: '-0.02em' }}>
              {MONTHS[month]} {year}
            </span>
            <button className="btn-icon" onClick={next} style={{ border: '1px solid var(--gray-200)' }}><ChevronRight size={18} /></button>
          </div>
          <button className="btn-ghost" onClick={() => setCurrent(new Date())}>Aujourd'hui</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {DAYS.map(d => (
            <div key={d} style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-500)', padding: '0.5rem' }}>{d}</div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {cells.map((day, i) => {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const dayEvents = day ? getDayEvents(day) : [];
            return (
              <div key={i} style={{
                minHeight: '120px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: day ? 'var(--white)' : 'transparent',
                border: day ? `1px solid ${isToday ? 'var(--green-600)' : 'var(--gray-200)'}` : 'none',
                padding: '0.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: isToday ? '0 0 0 1px var(--green-600)' : 'none',
              }}>
                {day && (
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '22px', height: '22px', borderRadius: '50%',
                    backgroundColor: isToday ? 'var(--green-700)' : 'transparent',
                    color: isToday ? 'white' : 'var(--gray-500)',
                    fontWeight: isToday ? 700 : 500, fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    {day}
                  </div>
                )}
                {dayEvents.map((ev, idx) => (
                  <div key={idx} style={{ 
                    backgroundColor: ev.isActivity ? 'var(--green-50)' : 'var(--info-bg)', 
                    borderLeft: `3px solid ${ev.isActivity ? 'var(--green-600)' : 'var(--info)'}`,
                    color: ev.isActivity ? 'var(--green-800)' : 'var(--info-text)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }} title={ev.title}>
                    {ev.isAnnonce ? '📢 ' : ''}{ev.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
