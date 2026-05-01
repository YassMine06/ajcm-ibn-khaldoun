import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import DescriptionPage from './pages/DescriptionPage';
import EvenementsPage from './pages/EvenementsPage';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
