import React from 'react';
import './Partenaires.css';

const partners = [
  { logo: 'alaml-sy.png', url: 'https://alaml-sy.com' },
  { logo: 'fncv.png', url: 'https://fncv.ma/' },
  { logo: 'mjcc.png', url: 'https://mjcc.gov.ma/' },
  { logo: 'gorara.png', url: 'https://gorara.org' },
  { logo: 'hawass.png', url: 'https://web.facebook.com/Hawass.ART.Ghir.Blfen' },
  { logo: 'madacenter.png', url: 'https://www.madacenter.ma' },
  { logo: 'mjcc media.png', url: 'https://web.facebook.com/dpmjccmohammedia' },
  { logo: 'utss.png', url: 'http://www.utss.org.tn/' },
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
            {partners.concat(partners).map((partner, idx) => (
              <a 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="partner-logo" 
                key={idx}
              >
                <img src={`/Partenaria/${encodeURIComponent(partner.logo)}`} alt={`Partenaire ${idx}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partenaires;
