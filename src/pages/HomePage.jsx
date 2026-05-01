import React from 'react';
import Header from '../components/Accueil/Header';
import APropos from '../components/Accueil/APropos';
import NosActions from '../components/Accueil/NosActions';
import NotreImpact from '../components/Accueil/NotreImpact';
import NosEvenements from '../components/Accueil/NosProjets';
import EvenementsAccueil from '../components/Accueil/EvenementsAccueil';
import CTABanner from '../components/Accueil/CTABanner';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="page-enter">
      <Header />
      <main>
        <APropos />
        <NosActions />
        <NotreImpact />
        <NosEvenements />
        <EvenementsAccueil />
      </main>
      <CTABanner />
      <Footer />
    </div>
  );
};

export default HomePage;
