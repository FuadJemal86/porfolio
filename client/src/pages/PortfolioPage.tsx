import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { WhatIDo } from './sections/WhatIDo'
import { MyResume } from './sections/MyResume'
import { PortfolioSection } from './sections/PortfolioSection'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0f1729] text-white antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <WhatIDo />
        <MyResume />
        <PortfolioSection />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
