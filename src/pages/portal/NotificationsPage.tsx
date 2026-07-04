import { useNavigate } from 'react-router-dom'

export default function NotificationsPage() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="portal-h1">Notifications</h1>
      <p className="portal-greet">Updates on your projects.</p>
      <div className="notif-row attn" onClick={() => navigate('/portal/preview-pay')}>
        <div className="ni">
          <svg viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="nt">Westwind preview is ready</div>
          <div className="nd">Review and pay ₹60,446 to unlock files</div>
        </div>
        <span className="ntime">2h</span>
      </div>
      <div className="notif-row">
        <div className="ni">
          <svg viewBox="0 0 24 24">
            <path d="M8 2v4M16 2v4M3 10h18M5 6h14v14H5z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="nt">Site visit scheduled</div>
          <div className="nd">The Lawn — 16 Jun, morning slot</div>
        </div>
        <span className="ntime">1d</span>
      </div>
      <div className="notif-row">
        <div className="ni">
          <svg viewBox="0 0 24 24">
            <path d="M4 13l5 5L20 6" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="nt">Payment received</div>
          <div className="nd">₹76,110 advance for Velocity Auto Plant</div>
        </div>
        <span className="ntime">3d</span>
      </div>
      <div className="notif-row attn">
        <div className="ni">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="nt">Files expiring soon</div>
          <div className="nd">OMR Office Fitout files expire in 3 days</div>
        </div>
        <span className="ntime">5d</span>
      </div>
    </>
  )
}
