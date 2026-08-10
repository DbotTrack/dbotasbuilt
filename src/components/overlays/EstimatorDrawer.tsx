import { useApp } from '../../context/AppContext'
import EstimatorPanel from '../estimator/EstimatorPanel'

/**
 * Slide-over wrapper around the estimator. `est-drawer` widens it to 960px and
 * keeps the two-column layout with a sticky quote card, matching the HTML
 * reference. All inputs, pricing and terms live in <EstimatorPanel/>, shared
 * with the /estimator page.
 */
export default function EstimatorDrawer() {
  const { overlay, closeOverlays } = useApp()
  const open = overlay === 'estimator'

  return (
    <aside className={`drawer est-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-head">
        <span className="drawer-title">Price estimator</span>
        <button className="drawer-close" onClick={closeOverlays} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="drawer-body">
        <div className="est-head">
          <h1>Price estimator</h1>
          <p>Configure your scope for an instant, indicative price. Final quote confirmed by our team.</p>
        </div>

        <EstimatorPanel variant="drawer" />
      </div>
    </aside>
  )
}
