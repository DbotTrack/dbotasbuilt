import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { signOut } = useApp()
  const { toast } = useToast()

  return (
    <>
      <h1 className="portal-h1">Profile</h1>
      <p className="portal-greet">Your account and settings.</p>
      <div className="pf-card">
        <div className="pf-avatar">AS</div>
        <div className="text-[18px] font-semibold">Aarav Sharma</div>
        <div className="text-ink-3 text-[14px] mt-[3px]">Studio Verse Architects</div>
        <div className="text-sage text-[13px] mt-0.5">aarav@studio.com</div>
      </div>
      <div className="list-card">
        <div className="lc-row" onClick={() => toast('Billing — demo')}>
          Billing details
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <div className="lc-row" onClick={() => navigate('/portal/invoices')}>
          Invoices &amp; statements
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <div className="lc-row" onClick={() => navigate('/portal/notifications')}>
          Notifications
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <div className="lc-row" onClick={() => toast('Policies — demo')}>
          Legal &amp; policies
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <div className="lc-row" style={{ color: '#e87a0f' }} onClick={signOut}>
          Sign out
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </>
  )
}
