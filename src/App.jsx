import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import HomePage from './pages/users/HomePage';
import DescriptionPage from './pages/users/DescriptionPage';
import EvenementsPage from './pages/users/EvenementsPage';
import EventDetailsPage from './pages/users/EventDetailsPage';
import AnnoncesPage from './pages/users/AnnoncesPage';
import InscriptionPage from './pages/users/InscriptionPage';
import CalendrierPage from './pages/users/CalendrierPage';
import ContactPage from './pages/users/ContactPage';
import './App.css';
import './platform.css';

// Platform pages
import LoginPage from './pages/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import MemberLayout from './layouts/MemberLayout';

import Statistics from './pages/admin/Statistics';
import ActivitiesManager from './pages/admin/ActivitiesManager';
import AnnoncesManager from './pages/admin/AnnoncesManager';
import UsersManager from './pages/admin/UsersManager';
import AdminCalendar from './pages/admin/AdminCalendar';
import PartnersManager from './pages/admin/PartnersManager';
import RegistrationsManager from './pages/admin/RegistrationsManager';
import AIModule from './pages/admin/AIModule';

import MemberProfile from './pages/member/MemberProfile';
import EditProfile from './pages/member/EditProfile';
import RegisterActivities from './pages/member/RegisterActivities';

import MemberCalendar from './pages/member/MemberCalendar';
import MemberHistory from './pages/member/MemberHistory';
import MemberNotifications from './pages/member/MemberNotifications';


function App() {
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem('user');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleUpdateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div className="app-container"><HomePage /></div>} />
        <Route path="/description" element={<div className="app-container"><DescriptionPage /></div>} />
        <Route path="/evenements" element={<div className="app-container"><EvenementsPage /></div>} />
        <Route path="/evenements/:id" element={<div className="app-container"><EventDetailsPage /></div>} />
        <Route path="/annonces" element={<div className="app-container"><AnnoncesPage /></div>} />
        <Route path="/calendrier" element={<div className="app-container"><CalendrierPage /></div>} />
        <Route path="/contact" element={<div className="app-container"><ContactPage /></div>} />
        <Route path="/inscription" element={<div className="app-container"><InscriptionPage /></div>} />

        {/* Platform Routes */}
        <Route path="/login" element={
          <div className="platform-app">
            {!user ? <LoginPage onLogin={handleLogin} /> :
            <Navigate to={user.role === 'admin' ? '/admin/statistics' : '/membre/profile'} />}
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          user && user.role === 'admin' ?
          <div className="platform-app"><AdminLayout onLogout={handleLogout} user={user} /></div> :
          <Navigate to="/login" />
        }>
          <Route path="statistics" element={<Statistics />} />
          <Route path="activities" element={<ActivitiesManager />} />
          <Route path="annonces" element={<AnnoncesManager />} />
          <Route path="members" element={<UsersManager />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="partners" element={<PartnersManager />} />
          <Route path="registrations" element={<RegistrationsManager />} />
          <Route path="registrations/:eventName" element={<RegistrationsManager />} />
          <Route path="ai-module" element={<AIModule />} />
          <Route index element={<Navigate to="statistics" />} />
        </Route>

        {/* Member Routes */}
        <Route path="/membre" element={
          user && user.role === 'member' ?
          <div className="platform-app"><MemberLayout onLogout={handleLogout} user={user} /></div> :
          <Navigate to="/login" />
        }>
          <Route path="profile" element={<MemberProfile user={user} />} />
          <Route path="edit-profile" element={<EditProfile user={user} onUpdateUser={handleUpdateUser} />} />
          <Route path="register-activities" element={<RegisterActivities />} />

          <Route path="calendar" element={<MemberCalendar />} />
          <Route path="history" element={<MemberHistory />} />
          <Route path="notifications" element={<MemberNotifications />} />
          <Route index element={<Navigate to="profile" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
