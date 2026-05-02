import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './components/pages/HomePage';
import DescriptionPage from './components/pages/DescriptionPage';
import EvenementsPage from './components/pages/EvenementsPage';
import EventDetailsPage from './components/pages/EventDetailsPage';
import InscriptionPage from './components/pages/InscriptionPage';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/description" element={<DescriptionPage />} />
          <Route path="/evenements" element={<EvenementsPage />} />
          <Route path="/evenements/:id" element={<EventDetailsPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
