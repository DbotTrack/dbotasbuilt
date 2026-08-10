import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DbotLogo from '../common/DbotLogo'
import { useApp } from '../../context/AppContext'

const LINKS: { label: string; section: string }[] = [
  { label: 'What we do', section: 'services' },
  { label: 'What we handle', section: 'types' },
  { label: 'How it works', section: 'how' },
  { label: 'Pricing', section: 'pricing' },
  { label: 'Contact', section: 'contact' },
]

/** Fixed marketing top-nav with a frosted background + mobile drawer. */
export default function SiteNav() {
  const navigate = useNavigate()
  const { logIn, bookProject, scrollToSection } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = (section: string) => {
    setMobileOpen(false)
    scrollToSection(section)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200] h-nav-h bg-page/80 backdrop-blur-[14px] backdrop-saturate-[180%] border-b border-black/5">
        <div className="container-site h-full flex items-center justify-between gap-5">
          <DbotLogo variant="nav" withAsbuilt onClick={() => navigate('/')} />
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.section}
                onClick={() => go(l.section)}
                className="whitespace-nowrap text-sm font-medium text-ink-2 px-3.5 py-2 rounded-sm cursor-pointer transition-colors hover:text-ink hover:bg-white/70"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button className="btn btn-ghost btn-sm hidden lg:inline-flex" onClick={logIn}>
              Log in
            </button>
            <button className="btn btn-primary btn-sm" onClick={bookProject}>
              Book a project
            </button>
            <button
              className="lg:hidden w-[42px] h-[42px] flex flex-col gap-[5px] items-center justify-center bg-transparent cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className="w-[22px] h-0.5 bg-ink rounded-sm" />
              <span className="w-[22px] h-0.5 bg-ink rounded-sm" />
              <span className="w-[22px] h-0.5 bg-ink rounded-sm" />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`lg:hidden fixed top-nav-h left-0 right-0 z-[199] bg-page/95 backdrop-blur-[14px] border-b border-black/[0.06] px-5 pt-3 pb-5 transition-all duration-200 ${
          mobileOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.section}
            onClick={() => go(l.section)}
            className="block py-3 px-1.5 text-base font-medium border-b border-black/5 cursor-pointer"
          >
            {l.label}
          </a>
        ))}
        <button className="btn btn-ghost btn-block mt-3.5" onClick={() => { setMobileOpen(false); logIn() }}>
          Log in
        </button>
        <button className="btn btn-primary btn-block mt-3.5" onClick={() => { setMobileOpen(false); bookProject() }}>
          Book a project
        </button>
      </div>
    </>
  )
}
