import React, { useState } from 'react';
import './Footer.css';


const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Logo */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <img src="/logo_ajcm.svg" alt="Logo AJCM" />
            <div>
              <span className="footer-logo-title">A.J.C.M</span>
              <span className="footer-logo-sub">ASSOCIATION JEUNESSE <br />DE LA CITOYENNETÉ MAROCAINE</span>
            </div>
          </div>
          <div className="footer-socials">
            <a href="https://web.facebook.com/profile.php?id=61572668484022" aria-label="Facebook" className="social-icon" target="_blank" rel="noopener noreferrer">f</a>
            <a href="https://www.instagram.com/ajcm_mohammedia" aria-label="Instagram" className="social-icon" target="_blank" rel="noopener noreferrer">ig</a>
            {/* <a href="#li" aria-label="LinkedIn" className="social-icon">in</a> */}
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">CONTACTEZ-NOUS</h4>
          <ul className="footer-list">
            <li>✉ ajcmmohammedia@gmail.com</li>
            <li>📞 0667015703 - 0773275830</li>
            <li>📍 Mohammedia, Maroc</li>
          </ul>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4 className="footer-heading">LIENS RAPIDES</h4>
          <ul className="footer-list links">
            <li><a href="/">Accueil</a></li>
            <li><a href="/description">Description</a></li>
            <li><a href="/evenements">Événements</a></li>
            <li><a href="/annonces">Annonces</a></li>
            <li><a href="/calendrier">Calendrier</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* <div className="footer-col">
          <h4 className="footer-heading">NEWSLETTER</h4>
          <p className="footer-newsletter-text">Inscrivez-vous pour ne rien manquer.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">→</button>
          </form>
        </div> */}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} A.J.C.M — Tous droits réservés.</span>
        <div className="footer-legal">
          <a href="#mentions">Mentions légales</a>
          <a href="#confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
