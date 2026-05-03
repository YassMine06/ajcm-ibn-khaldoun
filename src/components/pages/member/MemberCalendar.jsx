import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

const myActivities = [
  { day: 10, month: 4, title: 'Réunion générale' },
  { day: 15, month: 4, title: 'Formation Anashid' },
  { day: 22, month: 4, title: 'Soirée culturelle' },
];

export default function MemberCalendar() {
  const [today] = useState(new Date());
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getActivity = (day) => myActivities.find(a => a.day === day && a.month === month);

  return (
    <div>
      <h1 className="page-title"><Calendar size={24} /> Mon Calendrier</h1>
      
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
            const activity = day ? getActivity(day) : null;
            return (
              <div key={i} style={{
                minHeight: '100px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: day ? 'var(--white)' : 'transparent',
                border: day ? `1px solid ${isToday ? 'var(--green-600)' : activity ? 'var(--gold-400)' : 'var(--gray-200)'}` : 'none',
                padding: '0.5rem',
                position: 'relative',
                transition: 'var(--transition)',
                boxShadow: isToday ? '0 0 0 1px var(--green-600)' : activity ? '0 0 0 1px var(--gold-400)' : 'none',
                background: activity && !isToday ? 'rgba(198,160,82,0.05)' : day ? 'var(--white)' : 'transparent',
              }}>
                {day && (
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: isToday ? 'var(--green-700)' : activity ? 'var(--gold-500)' : 'transparent',
                    color: isToday || activity ? 'white' : 'var(--gray-500)',
                    fontWeight: isToday || activity ? 700 : 500, fontSize: '0.8rem',
                    marginBottom: '0.5rem'
                  }}>
                    {day}
                  </div>
                )}
                {activity && (
                  <div style={{ 
                    backgroundColor: 'var(--gold-100)', 
                    border: '1px solid var(--gold-400)',
                    color: 'var(--gold-600)',
                    padding: '0.3rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }} title={activity.title}>
                    {activity.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
