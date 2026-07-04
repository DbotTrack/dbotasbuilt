import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function PortalHome() {
  const navigate = useNavigate()
  const { bookProject, openEstimator } = useApp()

  return (
    <>
      <h1 className="portal-h1">Good morning, Aarav.</h1>
      <p className="portal-greet">Here's where your projects stand today.</p>
      <div className="attn-banner" onClick={() => navigate('/portal/preview-pay')}>
        <div className="ab-ic">
          <svg viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="ab-t">Westwind preview is ready</div>
          <div className="ab-s">Pay ₹60,446 to unlock your files</div>
        </div>
        <span className="pill pill-attention">Preview ready</span>
      </div>
      <div className="book-cta">
        <div>
          <h3>Book a scan</h3>
          <p>Site documentation · ready in 5–7 days</p>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <button className="btn btn-primary" onClick={bookProject}>
            Start booking
          </button>
          <button className="btn btn-ghost" onClick={openEstimator}>
            Check price
          </button>
        </div>
      </div>
      <div className="psec-title">
        <h2>Active projects</h2>
        <a onClick={() => navigate('/portal/projects')}>View all</a>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-023</div>
            <div className="pj-name">Westwind Residence</div>
          </div>
          <span className="pill pill-attention">Preview ready</span>
        </div>
        <div className="pj-bottom">
          <span>6,200 sqft</span>
          <span>Residential · ECR</span>
        </div>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-024</div>
            <div className="pj-name">Velocity Auto Plant</div>
          </div>
          <span className="pill pill-progress">Modelling</span>
        </div>
        <div className="pj-bottom">
          <span>15,000 sqft</span>
          <span>Plant &amp; machinery · ETA 22 Jun</span>
        </div>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-025</div>
            <div className="pj-name">The Lawn Wedding Venue</div>
          </div>
          <span className="pill pill-progress">Site visit</span>
        </div>
        <div className="pj-bottom">
          <span>5,800 sqft</span>
          <span>Venue mapping · 16 Jun, AM</span>
        </div>
      </div>
    </>
  )
}
