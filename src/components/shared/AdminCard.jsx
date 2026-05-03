import React from 'react';
import { Calendar, Clock, MapPin, Edit2, Trash2, Users, Megaphone } from 'lucide-react';

export default function AdminCard({ 
  title, 
  date, 
  time, 
  location,
  lieu, // Alternative for location
  image, 
  type, // 'evenement' or 'actualite' or 'activite'
  onEdit, 
  onDelete, 
  onViewRegistrations 
}) {
  const displayLocation = location || lieu || 'AJCM';
  
  // Logic for badge styles based on type
  const getBadgeStyle = () => {
    switch(type) {
      case 'evenement': return { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe', label: 'Événement' };
      case 'actualite': return { bg: '#dcfce7', text: '#065f46', border: '#bbf7d0', label: 'Actualité' };
      default: return { bg: '#fef3c7', text: '#92400e', border: '#fde68a', label: 'Activité' };
    }
  };

  const style = getBadgeStyle();

  return (
    <div className="event-card">
      <div className="event-card-image">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { 
              e.target.style.display = 'none'; 
              if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; 
            }} 
          />
        ) : null}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
          width: '100%', 
          height: '100%', 
          display: image ? 'none' : 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Megaphone color="rgba(255,255,255,0.2)" size={48} />
        </div>
        <div className="event-badge">
          <span className="badge" style={{ 
            backgroundColor: style.bg, 
            color: style.text,
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: '0.6rem',
            letterSpacing: '0.5px',
            padding: '4px 12px',
            borderRadius: '20px',
            border: `1px solid ${style.border}`
          }}>
            {style.label}
          </span>
        </div>
      </div>
      
      <div className="event-card-content" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--gray-800)', minHeight: '3em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {title || 'Sans titre'}
        </h3>
        
        <div className="event-details" style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="event-detail-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
            <Calendar size={14} style={{ color: '#3b82f6' }} />
            <span>{date || '--/--/----'} {time ? `à ${time}` : ''}</span>
          </div>
          <div className="event-detail-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
            <MapPin size={14} style={{ color: '#ef4444' }} />
            <span>{displayLocation}</span>
          </div>
        </div>
        
        <div className="event-card-actions" style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: '0.5rem' }}>
          <button className="btn-ghost" onClick={onEdit} style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
            <Edit2 size={14} /> Modifier
          </button>
          {onViewRegistrations && (
            <button className="btn-ghost" onClick={onViewRegistrations} style={{ flex: 1, fontSize: '0.8rem', color: '#3b82f6', padding: '0.5rem' }}>
              <Users size={14} /> Inscriptions
            </button>
          )}
          <button className="btn-ghost" onClick={onDelete} style={{ color: 'var(--danger)', fontSize: '0.8rem', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
