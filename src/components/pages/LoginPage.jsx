import React, { useState } from 'react';
import axios from 'axios';
import { User, Lock, LogIn, Shield, Leaf } from 'lucide-react';
import loginBg from '../../assets/login-bg.png';

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
    <div className="login-container">
      {/* Left panel */}
      <div className="login-left" style={{
        backgroundImage: `linear-gradient(rgba(7, 31, 22, 0.8), rgba(11, 61, 43, 0.85)), url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="login-left-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #c6a052, #b8873a)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={22} color="white" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>AJCM Ibn Khaldoun</span>
          </div>
          <h1>
            Plateforme de<br /><span>gestion associative</span>
          </h1>
          <p style={{ marginTop: '1.25rem' }}>
            Gérez vos événements, membres, partenaires et annonces depuis une interface centralisée, moderne et facile à utiliser.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              '✅ Gestion complète des activités et événements',
              '👥 Espace dédié pour chaque membre',
              '📊 Tableaux de bord et statistiques',
              '🤖 Module IA pour la génération de contenu',
            ].map((f, i) => (
              <div key={i} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{f}</div>
            ))}
          </div>
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
              className="btn-primary btn-block"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
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
