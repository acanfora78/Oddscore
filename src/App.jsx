import { useCallback, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DemoModal from './components/DemoModal'
import { DemoContext } from './components/DemoContext'
import ParticleBackground from './components/ParticleBackground'
import Hero from './sections/Hero'
import Company from './sections/Company'
import AbstractImage from './sections/AbstractImage'
import Backoffice from './sections/Backoffice'
import WhiteLabel from './sections/WhiteLabel'
import FrontSkins from './sections/FrontSkins'
import Integration from './sections/Integration'
import RiskEngine from './sections/RiskEngine'
import LiveFeed from './sections/LiveFeed'
import Cloud from './sections/Cloud'
import Services from './sections/Services'
import FinalCta from './sections/FinalCta'

export default function App() {
  const [demo, setDemo] = useState({ open: false, interest: null })
  const openDemo = useCallback((interest = null) => setDemo({ open: true, interest }), [])
  const closeDemo = useCallback(() => setDemo((d) => ({ ...d, open: false })), [])

  return (
    <DemoContext.Provider value={openDemo}>
      <div id="top" className="relative isolate min-h-screen">
        <ParticleBackground />
        <Header onRequestDemo={() => openDemo()} />
        <main>
          <Hero />
          <Company />
          <AbstractImage />
          <Backoffice />
          <WhiteLabel />
          <FrontSkins />
          <Integration />
          <RiskEngine />
          <LiveFeed />
          <Cloud />
          <Services />
          <FinalCta />
        </main>
        <Footer />
        <DemoModal open={demo.open} interest={demo.interest} onClose={closeDemo} />
      </div>
    </DemoContext.Provider>
  )
}
