import React from 'react';
import './MemberProfile.css';
import { User, MapPin, Calendar, Mail, Phone, Shield } from 'lucide-react';

export default function MemberProfile({ user }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Profile Hero Card */}
      <div className="table-container" style={{ padding: '2rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-600))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800, color: 'white', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{user.name}</h1>
            <p style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '0.75rem' }}>@{user.username}</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', backgroundColor: 'rgba(198,160,82,0.25)', color: 'var(--gold-400)', border: '1px solid rgba(198,160,82,0.35)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
              <Shield size={12} /> MEMBRE ACTIF
            </span>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="table-container" style={{ padding: '2rem' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--gray-900)', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.75rem' }}>
          Informations personnelles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { icon: <User size={16} />, label: 'Nom complet', value: user.name },
            { icon: <Mail size={16} />, label: 'Email', value: 'membre@ajcm.org' },
            { icon: <Phone size={16} />, label: 'Téléphone', value: '+212 600 000 000' },
            { icon: <MapPin size={16} />, label: 'Ville', value: 'Mohammedia' },
            { icon: <Calendar size={16} />, label: "Date d'adhésion", value: '01 Janvier 2026' },
            { icon: <Shield size={16} />, label: 'Rôle', value: 'Membre actif' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--gray-100)' }}>
              <div style={{ color: 'var(--green-700)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
