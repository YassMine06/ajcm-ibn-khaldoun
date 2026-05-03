import React, { useState } from 'react';
import axios from 'axios';
import { User, Lock, LogIn, Shield, Leaf } from 'lucide-react';
import loginBg from '../../assets/login-bg.png';
import backgroundHome from '../../assets/background0.png';
import logoAjcm from '../../assets/logo_ajcm.svg';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      onLogin(response.data);
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ '--login-bg': `url(${backgroundHome})` }}>
      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-header-mini">
            <div className="login-logo-mini">
              <img src={logoAjcm} alt="Logo AJCM" />
            </div>
            <div className="nav-logo-text">
            <span className="nav-logo-title">A.J.C.M</span>
            <span className="nav-logo-sub">
              ASSOCIATION JEUNESSE <br />DE LA CITOYENNETÉ MAROCAINE<br />MOHAMMEDIA IBN KHALDOUN
            </span>
          </div>
          </div>
          <h1>
            Plateforme de <span>gestion</span>
          </h1>
          <p>
            Gérez vos événements, membres, partenaires et annonces depuis une interface centralisée, moderne et facile à utiliser.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-logo">
            <div className="login-card-icon">
              <Shield size={28} />
            </div>
            <h2>Connexion à <span>AJCM</span></h2>
            <p>Entrez vos identifiants pour accéder à la plateforme</p>
          </div>

          {error && (
            <div className="error-msg">
              <Lock size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom d'utilisateur</label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <div className="input-wrapper">
                <Lock size={16} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn-primary btn-block ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              <LogIn size={18} />
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="login-hint">
            <strong>Démo :</strong> admin / password &nbsp;·&nbsp; member1 / password
          </div>
        </div>
      </div>
    </div>
  );
}
