import Header from './components/Accueil/Header'
import APropos from './components/Accueil/APropos'
import NosActions from './components/Accueil/NosActions'
import NotreImpact from './components/Accueil/NotreImpact'
import NosProjets from './components/Accueil/NosProjets'
import EvenementsAccueil from './components/Accueil/EvenementsAccueil'
import CTABanner from './components/Accueil/CTABanner'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app-container">
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
    </div>
  )
}

export default App
