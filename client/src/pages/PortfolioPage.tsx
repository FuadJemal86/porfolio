import { Hero } from './sections/Hero'
import { PortfolioSection } from './sections/PortfolioSection'
import { Contact } from './sections/Contact'
import { ThemeToggle } from '../components/ThemeToggle'

export function PortfolioPage() {
  return (
    <div className="page-shell text-[color:var(--text-color)] antialiased">
      {/* Top horizontal bar — end to end */}
      <div className="page-frame" aria-hidden="true">
        <span className="page-frame-top" />
      </div>

      <div className="site-card">
        <div className="site-card-inner relative">
          <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-10">
            <ThemeToggle />
          </div>

          <main>
            <Hero />
            <PortfolioSection />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  )
}
