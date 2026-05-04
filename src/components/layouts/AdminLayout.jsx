import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  ClipboardList, CalendarDays, Users, Handshake,
  Trophy, UserCheck, BarChart3, Bot, LogOut, Megaphone
} from 'lucide-react';
import logoAjcm from '../../assets/logo_ajcm.svg';
import './AdminLayout.css';

export default function AdminLayout({ onLogout, user }) {
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
              <span className="brand">PlatformeAJCM</span>
              <span className="sub">Administration</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Tableau de bord</span>
          <NavLink to="/admin/statistics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <BarChart3 size={18} /><span>Statistiques</span>
          </NavLink>

          <span className="nav-section-label">Gestion de Contenu</span>
          <NavLink to="/admin/activities" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ClipboardList size={20} /><span>Événements</span>
          </NavLink>
          <NavLink to="/admin/annonces" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Megaphone size={20} /><span>Annonces</span>
          </NavLink>
          <NavLink to="/admin/calendar" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <CalendarDays size={20} /><span>Calendrier</span>
          </NavLink>

          <span className="nav-section-label">Communauté</span>
          <NavLink to="/admin/members" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} /><span>Membres</span>
          </NavLink>
          <NavLink to="/admin/registrations" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <UserCheck size={20} /><span>Inscriptions</span>
          </NavLink>
          <NavLink to="/admin/partners" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Handshake size={20} /><span>Partenaires</span>
          </NavLink>

          <span className="nav-section-label">Système</span>
          <NavLink to="/admin/ai-module" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Bot size={20} /><span>Module IA</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">Administrateur</div>
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
            <h2>Espace Administrateur</h2>
            <p>AJCM Ibn Khaldoun — Mohammedia</p>
          </div>
          <div className="topbar-right">
            <div className="topbar-user-info">
              <div className="topbar-user-name">{user.name}</div>
              <div className="topbar-user-role">Admin</div>
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
