import { useNavigate } from 'react-router-dom'
import Pill from '../../components/common/Pill'

export default function ProjectDetailPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="back-link" onClick={() => navigate('/portal/projects')}>
        ‹ Back to projects
      </div>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="pj-id">DBT-CHN-024</div>
          <h1 className="portal-h1 mt-1">Velocity Auto Plant</h1>
        </div>
        <Pill state="progress">Modelling</Pill>
      </div>
      <p className="portal-greet mt-2">15,000 sqft · Plant &amp; machinery · Chennai</p>

      <p className="glabel font-semibold my-[18px] mb-3">Progress</p>
      <div className="tracker">
        <div className="trk done">
          <div className="trk-line">
            <div className="trk-dot">
              <svg viewBox="0 0 24 24">
                <path d="M4 13l5 5L20 6" />
              </svg>
            </div>
            <div className="trk-bar"></div>
          </div>
          <div className="trk-body">
            <div className="trk-t">Booked</div>
            <div className="trk-d">Token paid · 2 Jun</div>
          </div>
        </div>
        <div className="trk done">
          <div className="trk-line">
            <div className="trk-dot">
              <svg viewBox="0 0 24 24">
                <path d="M4 13l5 5L20 6" />
              </svg>
            </div>
            <div className="trk-bar"></div>
          </div>
          <div className="trk-body">
            <div className="trk-t">Site visit</div>
            <div className="trk-d">Scanned on-site · 6 Jun</div>
          </div>
        </div>
        <div className="trk current">
          <div className="trk-line">
            <div className="trk-dot"></div>
            <div className="trk-bar"></div>
          </div>
          <div className="trk-body">
            <div className="trk-t">Modelling</div>
            <div className="trk-d">In progress · ETA 22 Jun</div>
          </div>
        </div>
        <div className="trk">
          <div className="trk-line">
            <div className="trk-dot"></div>
            <div className="trk-bar"></div>
          </div>
          <div className="trk-body">
            <div className="trk-t">Preview &amp; pay</div>
            <div className="trk-d">Approve, then pay balance</div>
          </div>
        </div>
        <div className="trk">
          <div className="trk-line">
            <div className="trk-dot"></div>
          </div>
          <div className="trk-body">
            <div className="trk-t">Files delivered</div>
            <div className="trk-d">Download your deliverables</div>
          </div>
        </div>
      </div>

      <p className="glabel font-semibold my-[18px] mb-3">Configuration</p>
      <div className="data-card">
        <div className="data-row">
          <span className="dl">Project type</span>
          <span className="dv">Plant &amp; machinery</span>
        </div>
        <div className="data-row">
          <span className="dl">Spaces</span>
          <span className="dv">Interior 15,000 sqft</span>
        </div>
        <div className="data-row">
          <span className="dl">Scope</span>
          <span className="dv">Civil, electrical, plumbing</span>
        </div>
        <div className="data-row">
          <span className="dl">Deliverables</span>
          <span className="dv">360° · 2D · 3D · point cloud</span>
        </div>
        <div className="data-row">
          <span className="dl">Booked</span>
          <span className="dv">2 Jun 2026</span>
        </div>
      </div>
    </>
  )
}
