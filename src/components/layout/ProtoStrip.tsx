import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

type Area = 'home' | 'estimator' | 'portal' | 'signin' | 'admin'

/** The floating "Demo menu" that jumps between prototype areas. */
export default function ProtoStrip() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openEstimator, openAuth, openBooking, setSignedIn } = useApp()
  const [open, setOpen] = useState(true)

  const isPortal = pathname.startsWith('/portal')
  const area: Area = isPortal ? 'portal' : 'home'
  const lifted = isPortal

  const link =
    'text-[12px] font-semibold text-white/70 px-3 py-[7px] rounded-pill cursor-pointer whitespace-nowrap transition-all hover:text-white hover:bg-white/10'
  const activeLink = 'text-ink bg-orange hover:bg-orange hover:text-ink'

  const items: { label: string; area: Area; onClick: () => void }[] = [
    { label: 'Home', area: 'home', onClick: () => navigate('/') },
    { label: 'Estimator', area: 'estimator', onClick: openEstimator },
    {
      label: 'Booking',
      area: 'portal',
      onClick: () => {
        setSignedIn(true)
        navigate('/portal')
        openBooking()
      },
    },
    { label: 'Sign in', area: 'signin', onClick: () => openAuth('login') },
    {
      label: 'Client portal',
      area: 'portal',
      onClick: () => {
        setSignedIn(true)
        navigate('/portal')
      },
    },
  ]

  if (!open) {
    return (
      <button
        className={`fixed right-4 z-[500] inline-flex items-center gap-1.5 bg-ink/90 text-white backdrop-blur-[12px] rounded-pill px-4 py-2.5 text-[12px] font-semibold cursor-pointer shadow-xl opacity-55 hover:opacity-100 transition-opacity ${
          lifted ? 'bottom-[92px]' : 'bottom-4'
        }`}
        onClick={() => setOpen(true)}
      >
        ⌃ Demo menu
      </button>
    )
  }

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-[500] flex items-center gap-1 px-2 py-[7px] bg-ink/90 backdrop-blur-[12px] rounded-pill shadow-xl overflow-x-auto ${
        lifted ? 'bottom-[92px]' : 'bottom-4'
      }`}
      style={{ maxWidth: 'calc(100vw - 24px)', scrollbarWidth: 'none' }}
    >
      <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-white/40 px-2 pl-1.5 whitespace-nowrap">
        Prototype
      </span>
      {items.map((it) => (
        <a key={it.label} onClick={it.onClick} className={`${link} ${it.area === area ? activeLink : ''}`}>
          {it.label}
        </a>
      ))}
      <span className="text-white/50 px-2.5 py-1.5 cursor-pointer text-[15px] leading-none hover:text-white" onClick={() => setOpen(false)}>
        ✕
      </span>
    </div>
  )
}
