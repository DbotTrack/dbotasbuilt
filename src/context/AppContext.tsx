import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { CLIENT_APP_URL, CLIENT_BOOK_URL } from '../lib/clientApp'
import type { OverlayKind } from '../types'

/**
 * Central app state — the React equivalent of the prototype's global JS:
 * which overlay is open, and the cross-cutting actions (bookProject, logIn,
 * scrollToSection). Sign-in, booking and the portal live in the client app.
 */
interface AppValue {
  overlay: OverlayKind

  openEstimator: () => void
  closeOverlays: () => void

  /** primary CTA — hands off to the client app's estimator (see lib/clientApp) */
  bookProject: () => void
  logIn: () => void
  /** jump to the marketing home and scroll to a section id ("services", ...) */
  scrollToSection: (id: string) => void
}

const AppContext = createContext<AppValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const [overlay, setOverlay] = useState<OverlayKind>(null)

  // lock body scroll whenever an overlay is open
  useEffect(() => {
    document.body.style.overflow = overlay ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlay])

  const closeOverlays = useCallback(() => setOverlay(null), [])

  const openEstimator = useCallback(() => setOverlay('estimator'), [])

  // The app decides signed-in vs signed-out from its own storage, which this
  // origin cannot see — so always go through its sign-in gate, in a new tab.
  const bookProject = useCallback(() => {
    window.open(CLIENT_BOOK_URL, '_blank', 'noopener,noreferrer')
  }, [])

  // Log in lives in the separate client app — open it in a new tab.
  const logIn = useCallback(() => {
    window.open(CLIENT_APP_URL, '_blank', 'noopener,noreferrer')
  }, [])

  const scrollToSection = useCallback(
    (id: string) => {
      setOverlay(null)
      navigate('/')
      // let the home route render before scrolling
      setTimeout(() => {
        document.getElementById('sec-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    },
    [navigate],
  )

  // Escape closes any overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverlay(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const value: AppValue = {
    overlay,
    openEstimator,
    closeOverlays,
    bookProject,
    logIn,
    scrollToSection,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
