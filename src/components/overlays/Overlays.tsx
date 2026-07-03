import { useApp } from '../../context/AppContext'
import EstimatorDrawer from './EstimatorDrawer'
import AuthModal from './AuthModal'
import BookingDrawer from './BookingDrawer'

/**
 * Renders the scrim + all three overlays at app root. Each stays mounted and
 * toggles its `.open` class so the slide/fade transitions play.
 */
export default function Overlays() {
  const { overlay, closeOverlays } = useApp()
  return (
    <>
      <div className={`scrim ${overlay ? 'show' : ''}`} onClick={closeOverlays} />
      <EstimatorDrawer />
      <AuthModal />
      <BookingDrawer />
    </>
  )
}
