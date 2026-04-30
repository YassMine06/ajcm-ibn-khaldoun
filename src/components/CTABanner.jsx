import React from 'react';
import './CTABanner.css';

const CTABanner = () => (
  <section className="cta-banner" id="rejoindre">
    <div className="cta-inner">
      <div className="cta-left">
        <div className="cta-heart">♥</div>
        <div className="cta-text">
          <h3>ENVIE D'AGIR À NOS CÔTÉS ?</h3>
          <p>Rejoignez notre communauté de bénévoles et faites la différence.</p>
        </div>
      </div>
      <div className="cta-buttons">
        <a href="#benevole" className="btn-benevole">DEVENIR BÉNÉVOLE</a>
        <a href="#membre" className="btn-membre">DEVENIR MEMBRE</a>
      </div>
    </div>
  </section>
);

export default CTABanner;
