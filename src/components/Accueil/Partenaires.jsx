import React from 'react';
import './Partenaires.css';

const logos = [
  'alaml-sy.png',
  'fncv.png',
  'mjcc.png',
  'gorara.png',
  'hawass.png',
  'madacenter.png',
  'mjcc media.png',
  'utss.png',
];

const Partenaires = () => {
  return (
    <section className="partenaires-section" id="partenaires">
      <div className="partenaires-container">
        <div className="section-header center-align">
          <h2 className="section-title">NOS PARTENAIRES</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {logos.concat(logos).map((logo, idx) => (
              <div className="partner-logo" key={idx}>
                <img src={`/Partenaria/${encodeURIComponent(logo)}`} alt={`Partenaire ${idx}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partenaires;
