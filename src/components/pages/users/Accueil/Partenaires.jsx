import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Partenaires.css';

const Partenaires = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/partners');
        setPartners(res.data);
      } catch (err) {
        console.error("Error fetching partners:", err);
      }
    };
    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  return (
    <section className="partenaires-section" id="partenaires">
      <div className="partenaires-container">
        <div className="section-header center-align">
          <h2 className="section-title">NOS PARTENAIRES</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {partners.concat(partners).map((partner, idx) => (
              <a 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="partner-logo" 
                key={idx}
              >
                <img 
                  src={partner.logo?.startsWith('data:') ? partner.logo : `/Partenaria/${encodeURIComponent(partner.logo)}`} 
                  alt={partner.name || `Partenaire ${idx}`} 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partenaires;
