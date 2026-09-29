import { useState } from 'react'
import Header from './components/Header'
import ParticleBackground from './components/ParticleBackground'

export default function App() {
  // Wired to the Request Demo modal in a later step.
  const [, setDemoOpen] = useState(false)

  return (
    <div id="top" className="relative isolate min-h-screen">
      <ParticleBackground />
      <Header onRequestDemo={() => setDemoOpen(true)} />
      <main className="min-h-[200vh]" />
    </div>
  )
}
