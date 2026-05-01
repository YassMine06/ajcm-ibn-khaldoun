import React from 'react';
import Header from '../components/Accueil/Header';
import APropos from '../components/Accueil/APropos';
import NosEvenements from '../components/Accueil/NosEvenement';
import Annonces from '../components/Accueil/Annonces';
import Partenaires from '../components/Accueil/Partenaires';
import CTABanner from '../components/Accueil/CTABanner';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="page-enter">
      <Header />
      <main>
        <APropos />
        <Annonces />
        <NosEvenements />
        <Partenaires />
      </main>
      <CTABanner />
      <Footer />
    </div>
  );
};

export default HomePage;
