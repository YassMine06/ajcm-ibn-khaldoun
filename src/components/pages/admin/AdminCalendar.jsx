import React, { useState, useEffect } from 'react';
import './AdminCalendar.css';
import axios from 'axios';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

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
  // Ajustement pour commencer la semaine le Lundi (getDay() : 0=Dim, 1=Lun...)
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
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
    <div style={{ width: '100%' }}>
      <h1 className="page-title"><CalendarIcon size={24} /> Calendrier des événements</h1>
      
      <div className="table-container" style={{ width: '100%', padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn-icon" onClick={prev} style={{ border: '1px solid #E2E8F0', width: '32px', height: '32px', backgroundColor: '#FFFFFF' }}><ChevronLeft size={16} color="#64748B" /></button>
            
            <div style={{ display: 'flex', gap: '6px' }}>
              <select 
                value={month} 
                onChange={(e) => setCurrent(new Date(year, parseInt(e.target.value), 1))}
                style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.4rem 0.75rem', fontWeight: 600, fontSize: '0.85rem', color: '#1E293B', cursor: 'pointer', background: '#FFFFFF', outline: 'none' }}
              >
                {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              
              <select 
                value={year} 
                onChange={(e) => setCurrent(new Date(parseInt(e.target.value), month, 1))}
                style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.4rem 0.75rem', fontWeight: 600, fontSize: '0.85rem', color: '#1E293B', cursor: 'pointer', background: '#FFFFFF', outline: 'none' }}
              >
                {[...Array(11)].map((_, i) => {
                  const y = 2020 + i;
                  return <option key={y} value={y}>{y}</option>
                })}
              </select>
            </div>

            <button className="btn-icon" onClick={next} style={{ border: '1px solid #E2E8F0', width: '32px', height: '32px', backgroundColor: '#FFFFFF' }}><ChevronRight size={16} color="#64748B" /></button>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', color: '#64748B' }} onClick={() => setCurrent(new Date())}>Aujourd'hui</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '0.5rem' }}>
          {DAYS.map(d => (
            <div key={d} style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', padding: '0.15rem' }}>{d}</div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {cells.map((day, i) => {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const dayEvents = day ? getDayEvents(day) : [];
            return (
              <div key={i} style={{
                minHeight: '85px',
                borderRadius: '10px',
                backgroundColor: day ? '#FFFFFF' : 'transparent',
                border: day ? `1px solid ${isToday ? '#3B82F6' : '#E2E8F0'}` : 'none',
                padding: '0.4rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                boxShadow: day ? '0 1px 2px rgba(0,0,0,0.03)' : 'none',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                cursor: day ? 'pointer' : 'default'
              }}
              onMouseEnter={(e) => { if(day) e.currentTarget.style.backgroundColor = '#EFF6FF'; }}
              onMouseLeave={(e) => { if(day) e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                {day && (
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '18px', height: '18px', borderRadius: '5px',
                    backgroundColor: isToday ? '#3B82F6' : 'transparent',
                    color: isToday ? '#FFFFFF' : '#64748B',
                    fontWeight: 700, fontSize: '0.65rem',
                    marginBottom: '0.25rem'
                  }}>
                    {day}
                  </div>
                )}
                {dayEvents.map((ev, idx) => (
                  <div key={idx} style={{ 
                    backgroundColor: ev.isActivity ? '#dcfce7' : '#dbeafe', 
                    borderLeft: `3px solid ${ev.isActivity ? '#22c55e' : '#3b82f6'}`,
                    color: ev.isActivity ? '#166534' : '#1e40af',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4',
                    marginBottom: '1px'
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
