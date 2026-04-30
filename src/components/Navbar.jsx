import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Accueil');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Historique', href: '#historique' },
    { name: 'Description', href: '#description' },
    { name: 'Événements', href: '#evenements' },
    { name: 'Calendrier', href: '#calendrier' },
    { name: 'Membres', href: '#membres' },
    { name: 'Trophées', href: '#trophees' },
    { name: 'Partenaires', href: '#partenaires' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="nav-container">

        {/* ── Logo ── */}
        <a href="#accueil" className="nav-logo">
          <img src="/logo_ajcm.svg" alt="Logo AJCM" className="nav-logo-img" />
          <div className="nav-logo-text">
            <span className="nav-logo-title">A.J.C.M</span>
            <span className="nav-logo-sub">ASSOCIATION JEUNESSE <br />DE LA CITOYENNET MAROCAINE<br />MOHAMMEDIA IBN KHALDOUN</span>
          </div>
        </a>

        {/* ── Links ── */}
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={activeLink === link.name ? 'active' : ''}
                  onClick={() => { setActiveLink(link.name); setMobileMenuOpen(false); }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        <div className="nav-actions">
            <button className="btn-enroll">S'inscrire</button>
          </div>
        </div>

        {/* ── Mobile burger ── */}
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
