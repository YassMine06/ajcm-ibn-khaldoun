import React from 'react';
import Header from '../components/Accueil/Header';
import APropos from '../components/Accueil/APropos';
import NosActions from '../components/Accueil/NosActions';
import NotreImpact from '../components/Accueil/NotreImpact';
import NosProjets from '../components/Accueil/NosProjets';
import EvenementsAccueil from '../components/Accueil/EvenementsAccueil';
import CTABanner from '../components/Accueil/CTABanner';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <APropos />
        <NosActions />
        <NotreImpact />
        <NosProjets />
        <EvenementsAccueil />
      </main>
      <CTABanner />
      <Footer />
    </>
  );
};

export default HomePage;
