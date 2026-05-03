import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserCircle, Edit3, ClipboardList, LayoutDashboard, Calendar, History, Bell, LogOut } from 'lucide-react';
import logoAjcm from '../../assets/logo_ajcm.svg';
import './AdminLayout.css';

export default function MemberLayout({ onLogout, user }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <img src={logoAjcm} alt="Logo" />
            </div>
            <div className="sidebar-logo-text">
              <span className="brand">EspaceMembre</span>
              <span className="sub">AJCM Ibn Khaldoun</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Mon profil</span>
          <NavLink to="/membre/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <UserCircle size={18} /><span>Profil personnel</span>
          </NavLink>
          <NavLink to="/membre/edit-profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Edit3 size={18} /><span>Modifier mes infos</span>
          </NavLink>

          <span className="nav-section-label">Mes activités</span>
          <NavLink to="/membre/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={18} /><span>Tableau de bord</span>
          </NavLink>
          <NavLink to="/membre/register-activities" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ClipboardList size={18} /><span>Inscription activités</span>
          </NavLink>
          <NavLink to="/membre/history" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <History size={18} /><span>Historique</span>
          </NavLink>

          <span className="nav-section-label">Planning</span>
          <NavLink to="/membre/calendar" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Calendar size={18} /><span>Mon calendrier</span>
          </NavLink>
          <NavLink to="/membre/notifications" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Bell size={18} /><span>Notifications</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">Membre actif</div>
            </div>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h2>Espace Membre</h2>
            <p>AJCM Ibn Khaldoun — Mohammedia</p>
          </div>
          <div className="topbar-right">
            <div className="topbar-user-info">
              <div className="topbar-user-name">{user.name}</div>
              <div className="topbar-user-role">Membre actif</div>
            </div>
            <div className="topbar-avatar">{user.name.charAt(0).toUpperCase()}</div>
          </div>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
