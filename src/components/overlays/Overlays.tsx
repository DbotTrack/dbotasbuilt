import { useApp } from '../../context/AppContext'
import EstimatorDrawer from './EstimatorDrawer'

/**
 * Renders the scrim + the estimator drawer at app root. The drawer stays
 * mounted and toggles its `.open` class so the slide/fade transitions play.
 */
export default function Overlays() {
  const { overlay, closeOverlays } = useApp()
  return (
    <>
      <div className={`scrim ${overlay ? 'show' : ''}`} onClick={closeOverlays} />
      <EstimatorDrawer />
    </>
  )
}
