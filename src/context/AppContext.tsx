import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { AuthMode, OverlayKind } from '../types'
import { useToast } from './ToastContext'

/**
 * Central app state — the React equivalent of the prototype's global JS:
 * sign-in state, which overlay (estimator / booking / auth) is open, and the
 * cross-cutting actions (bookProject, logIn, signOut, scrollToSection).
 */
interface AppValue {
  signedIn: boolean
  setSignedIn: (v: boolean) => void

  overlay: OverlayKind
  authMode: AuthMode
  /** true when the auth modal was opened as a gate before booking */
  pendingBooking: boolean

  openEstimator: () => void
  openBooking: () => void
  openAuth: (mode: AuthMode, opts?: { pendingBooking?: boolean }) => void
  closeOverlays: () => void
  setAuthMode: (mode: AuthMode) => void

  /** primary CTA — books if signed in, else gates behind auth */
  bookProject: () => void
  logIn: () => void
  completeSignin: () => void
  signOut: () => void
  /** jump to the marketing home and scroll to a section id ("services", ...) */
  scrollToSection: (id: string) => void
}

const AppContext = createContext<AppValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [signedIn, setSignedIn] = useState(false)
  const [overlay, setOverlay] = useState<OverlayKind>(null)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [pendingBooking, setPendingBooking] = useState(false)

  // lock body scroll whenever an overlay is open
  useEffect(() => {
    document.body.style.overflow = overlay ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlay])

  const closeOverlays = useCallback(() => setOverlay(null), [])

  const openEstimator = useCallback(() => setOverlay('estimator'), [])
  const openBooking = useCallback(() => setOverlay('booking'), [])

  const openAuth = useCallback<AppValue['openAuth']>((mode, opts) => {
    setPendingBooking(!!opts?.pendingBooking)
    setAuthMode(mode)
    setOverlay('auth')
  }, [])

  const bookProject = useCallback(() => {
    if (signedIn) openBooking()
    else openAuth('login', { pendingBooking: true })
  }, [signedIn, openBooking, openAuth])

  // Log in lives in the separate client app — open it in a new tab.
  const logIn = useCallback(() => {
    window.open('https://app.dbotasbuilt.com', '_blank', 'noopener,noreferrer')
  }, [])

  const completeSignin = useCallback(() => {
    setSignedIn(true)
    const pend = pendingBooking
    setPendingBooking(false)
    navigate('/portal')
    if (pend) setOverlay('booking')
    else setOverlay(null)
  }, [pendingBooking, navigate])

  const signOut = useCallback(() => {
    setSignedIn(false)
    setPendingBooking(false)
    setOverlay(null)
    navigate('/')
    toast('Signed out')
  }, [navigate, toast])

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
    signedIn,
    setSignedIn,
    overlay,
    authMode,
    pendingBooking,
    openEstimator,
    openBooking,
    openAuth,
    closeOverlays,
    setAuthMode,
    bookProject,
    logIn,
    completeSignin,
    signOut,
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
