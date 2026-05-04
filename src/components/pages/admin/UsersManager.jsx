import React, { useState, useMemo } from 'react';
import './UsersManager.css';
import { 
  Plus, Edit2, Trash2, Users, Search, UserCheck, 
  Mail, Phone, Calendar, ShieldCheck, X, Camera, MapPin, CreditCard, Award,
  Cake
} from 'lucide-react';

const initialMember = {
  id: '', name: '', birthDate: '', email: '', password: '', phone: '', 
  cin: '', address: '', role: 'membre', photo: '', status: 'active'
};

const mockMembers = [
  { id: 'M-2026-001', name: 'Ahmed Benali', birthDate: '2002-05-15', email: 'ahmed.b@ajcm.org', phone: '+212 661 123 456', cin: 'AB123456', address: 'Casablanca, Oasis', joinDate: '01 Jan 2026', status: 'active', role: 'bureau' },
  { id: 'M-2026-002', name: 'Sara Moussaoui', birthDate: '2005-11-20', email: 'sara.m@ajcm.org', phone: '+212 662 987 654', cin: 'CD654321', address: 'Mohammedia, Parc', joinDate: '15 Fév 2026', status: 'active', role: 'membre' },
];

export default function UsersManager() {
  const [members, setMembers] = useState(mockMembers);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(initialMember);
  const [activeTab, setActiveTab] = useState('all');

  const calculateAge = (birthDate) => {
    if (!birthDate) return '--';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const filtered = useMemo(() => {
    return members.filter(m => {
      const term = search.toLowerCase();
      const matchesSearch = 
        m.name.toLowerCase().includes(term) || 
        m.email.toLowerCase().includes(term) || 
        m.id.toLowerCase().includes(term) ||
        m.cin?.toLowerCase().includes(term);
      
      if (activeTab === 'all') return matchesSearch;
      return matchesSearch && m.role === activeTab;
    });
  }, [members, search, activeTab]);

  const stats = useMemo(() => ({
    total: members.length,
    bureau: members.filter(m => m.role === 'bureau').length,
    membres: members.filter(m => m.role === 'membre').length,
  }), [members]);

  const handleSave = (e) => {
    e.preventDefault();
    if (currentMember._isNew) {
      const { _isNew, ...memberToSave } = currentMember;
      setMembers([...members, { ...memberToSave, joinDate: new Date().toLocaleDateString('fr-FR') }]);
    } else {
      setMembers(members.map(m => m.id === currentMember.id ? currentMember : m));
    }
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const startAdd = () => {
    const nextNum = members.length > 0 ? Math.max(...members.map(m => parseInt(m.id.split('-').pop()) || 0)) + 1 : 1;
    const newId = `M-2026-${String(nextNum).padStart(3, '0')}`;
    setCurrentMember({ ...initialMember, id: newId, _isNew: true });
    setIsEditing(true);
  };

  const startEdit = (m) => {
    setCurrentMember({ ...m, _isNew: false });
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="members-page page-enter">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--saas-text-main)', margin: 0 }}>
              {currentMember._isNew ? 'Nouveau' : 'Modifier'} Membre
            </h1>
            <p style={{ color: 'var(--saas-text-muted)' }}>Remplissez les informations détaillées ci-dessous.</p>
          </div>
          <button className="btn-ghost" onClick={() => setIsEditing(false)}>Annuler</button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div className="data-table-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <div 
              style={{ 
                width: '120px', height: '120px', borderRadius: '50%', 
                backgroundColor: '#F3F4F6', margin: '0 auto 1.5rem', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                border: '2px dashed #E2E8F0', position: 'relative',
                overflow: 'hidden', cursor: 'pointer'
              }}
              onClick={() => document.getElementById('photo-upload').click()}
            >
              {currentMember.photo ? (
                <img src={currentMember.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Camera size={32} color="#94A3B8" />
              )}
              <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.65rem', padding: '4px 0' }}>
                Changer
              </div>
            </div>
            <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setCurrentMember({...currentMember, photo: reader.result});
                  reader.readAsDataURL(file);
                }
              }} 
            />
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'left' }}>Type de membre</label>
            <select className="search-input" value={currentMember.role} onChange={e => setCurrentMember({...currentMember, role: e.target.value})} style={{ marginBottom: '1.5rem' }}>
              <option value="membre">Membre Standard</option>
              <option value="bureau">Membre de Bureau</option>
            </select>
            <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '10px', fontSize: '0.8rem', color: '#64748B', textAlign: 'left' }}>
              <ShieldCheck size={14} style={{ marginRight: '0.5rem' }} />
              Le rôle "Bureau" est une distinction interne.
            </div>
          </div>

          <div className="data-table-container" style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: '1/-1', backgroundColor: '#EEF2FF', padding: '1rem', borderRadius: '10px', border: '1px solid #C7D2FE' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--saas-primary)' }}>Identifiant de connexion (ID)</label>
                <input type="text" className="search-input" placeholder="Ex: M-2026-001" style={{ fontWeight: 800, letterSpacing: '0.05em' }} value={currentMember.id || ''} onChange={e => setCurrentMember({...currentMember, id: e.target.value})} />
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#6366F1' }}>Cet ID est unique et sert à la connexion.</p>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Nom complet</label>
                <input required type="text" className="search-input" value={currentMember.name} onChange={e => setCurrentMember({...currentMember, name: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Date de naissance</label>
                <input required type="date" className="search-input" value={currentMember.birthDate} onChange={e => setCurrentMember({...currentMember, birthDate: e.target.value})} />
                <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--saas-text-muted)' }}>Âge calculé : {calculateAge(currentMember.birthDate)} ans</p>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>CIN</label>
                <input type="text" className="search-input" value={currentMember.cin} onChange={e => setCurrentMember({...currentMember, cin: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
                <input required type="email" className="search-input" value={currentMember.email} onChange={e => setCurrentMember({...currentMember, email: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Mot de passe</label>
                <input required type="password" placeholder="••••••••" className="search-input" value={currentMember.password} onChange={e => setCurrentMember({...currentMember, password: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Téléphone</label>
                <input type="text" className="search-input" value={currentMember.phone} onChange={e => setCurrentMember({...currentMember, phone: e.target.value})} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Adresse</label>
                <textarea className="search-input" style={{ minHeight: '80px' }} value={currentMember.address} onChange={e => setCurrentMember({...currentMember, address: e.target.value})} />
              </div>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>Annuler</button>
              <button type="submit" className="btn-primary" style={{ border: 'none', borderRadius: '10px', padding: '0.75rem 2rem' }}>Enregistrer</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="members-page page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--saas-text-main)', margin: 0 }}>Membres AJCM</h1>
          <p style={{ color: 'var(--saas-text-muted)', margin: '0.25rem 0 0 0' }}>Gestion de la communauté et des accès.</p>
        </div>
        <button className="btn-primary" onClick={startAdd} style={{ border: 'none', borderRadius: '10px', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <Plus size={18} /> Ajouter un membre
        </button>
      </div>

      <div className="stats-row">
        {[{ tab: 'all', label: 'Total', count: stats.total, icon: Users, color: '#6366F1', bg: '#EEF2FF' },
          { tab: 'bureau', label: 'Bureau', count: stats.bureau, icon: Award, color: '#D97706', bg: '#FEF3C7' },
          { tab: 'membre', label: 'Membres', count: stats.membres, icon: UserCheck, color: '#10B981', bg: '#ECFDF5' }
        ].map((s, i) => (
          <div key={i} className="stat-card" onClick={() => setActiveTab(s.tab)} style={{ cursor: 'pointer', border: activeTab === s.tab ? `2px solid ${s.color}` : '1px solid var(--saas-border)' }}>
            <div className="stat-icon-wrapper" style={{ backgroundColor: s.bg, color: s.color }}><s.icon size={24} /></div>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--saas-text-muted)', fontWeight: 500 }}>{s.label}</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{s.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="controls-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--saas-text-muted)' }} />
          <input type="text" className="search-input" placeholder="Rechercher par nom, ID ou CIN..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Identifiants</th>
              <th>Informations</th>
              <th>Contact</th>
              <th>Statut</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="user-identity">
                    <div className="user-avatar" style={{ backgroundColor: m.role === 'bureau' ? '#FEF3C7' : '#F3F4F6', color: m.role === 'bureau' ? '#D97706' : 'var(--saas-primary)', overflow: 'hidden' }}>
                      {m.photo ? <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (m.role === 'bureau' ? <Award size={20} /> : m.name.charAt(0))}
                    </div>
                    <div className="user-info">
                      <div style={{ backgroundColor: '#EEF2FF', color: 'var(--saas-primary)', fontWeight: 800, fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', width: 'fit-content', border: '1px solid #C7D2FE' }}>{m.id}</div>
                      <h4 style={{ fontSize: '0.95rem', margin: '4px 0 2px' }}>{m.name}</h4>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', color: 'var(--saas-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Cake size={12} /> {calculateAge(m.birthDate)} ans</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CreditCard size={12} /> {m.cin}</div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.8rem', color: 'var(--saas-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {m.email}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {m.phone}</div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${m.status === 'active' ? 'status-active' : 'status-inactive'}`}>{m.status === 'active' ? 'Actif' : 'Inactif'}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="action-btn" onClick={() => startEdit(m)}><Edit2 size={16} /></button>
                    <button className="action-btn delete" onClick={() => handleDelete(m.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--saas-text-muted)' }}>
            <Search size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} /><br />
            Aucun membre trouvé pour votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}
