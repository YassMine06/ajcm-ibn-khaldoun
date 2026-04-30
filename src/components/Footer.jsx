import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Logo column */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <img src="/logo_ajcm.svg" alt="Logo AJCM" />
            <div>
              <span className="footer-logo-title">A.J.C.M</span>
              <span className="footer-logo-sub">ASSOCIATION AJCM POUR<br />LA CULTURE &amp; LA MÉDIATION</span>
            </div>
          </div>
          <div className="footer-socials">
            <a href="#fb" aria-label="Facebook" className="social-icon">f</a>
            <a href="#ig" aria-label="Instagram" className="social-icon">ig</a>
            <a href="#li" aria-label="LinkedIn" className="social-icon">in</a>
            <a href="#yt" aria-label="YouTube" className="social-icon">▶</a>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">CONTACTEZ-NOUS</h4>
          <ul className="footer-list">
            <li>✉ contact@ajcm.ma</li>
            <li>📞 +212 6 12 34 56 78</li>
            <li>📍 Rabat, Maroc</li>
          </ul>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4 className="footer-heading">LIENS RAPIDES</h4>
          <ul className="footer-list links">
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#evenements">Événements</a></li>
            <li><a href="#apropos">À propos</a></li>
            <li><a href="#actualites">Actualités</a></li>
            <li><a href="#actions">Nos actions</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4 className="footer-heading">NEWSLETTER</h4>
          <p className="footer-newsletter-text">Inscrivez-vous à notre newsletter pour ne rien manquer.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">→</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 A.J.C.M — Tous droits réservés.</span>
        <div className="footer-legal">
          <a href="#mentions">Mentions légales</a>
          <a href="#confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
