import Header from './components/Header'
import APropos from './components/APropos'
import NosActions from './components/NosActions'
import NotreImpact from './components/NotreImpact'
import NosProjets from './components/NosProjets'
import EvenementsTestimonials from './components/EvenementsTestimonials'
import CTABanner from './components/CTABanner'
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
        <EvenementsTestimonials />
      </main>
      <CTABanner />
      <Footer />
    </div>
  )
}

export default App
