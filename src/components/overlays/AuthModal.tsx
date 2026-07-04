import { useEffect, useState } from 'react'
import DbotLogo from '../common/DbotLogo'
import { useApp } from '../../context/AppContext'

/** Login (phone → OTP) / signup modal. */
export default function AuthModal() {
  const { overlay, authMode, pendingBooking, setAuthMode, completeSignin, closeOverlays } = useApp()
  const open = overlay === 'auth'
  const [otpView, setOtpView] = useState(false)

  // reset to the phone step whenever the modal (re)opens or the mode flips
  useEffect(() => {
    if (open) setOtpView(false)
  }, [open, authMode])

  return (
    <div className={`modal ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="modal-card">
        <button className="modal-close" onClick={closeOverlays} aria-label="Close">
          ✕
        </button>
        <div className="flex justify-center mb-1">
          <DbotLogo variant="profile-setup" />
        </div>

        {authMode === 'login' ? (
          !otpView ? (
            <div>
              <h1>Sign in</h1>
              <p className="auth-sub">Enter your phone number to get a one-time code.</p>
              {pendingBooking && (
                <div className="flex items-center gap-2 bg-orange-soft text-orange-deep rounded-[10px] px-[13px] py-[11px] text-[13px] font-medium mb-4">
                  Sign in to confirm your booking.
                </div>
              )}
              <div className="field">
                <label>Phone number</label>
                <input className="input" placeholder="+91 98765 43210" />
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={() => setOtpView(true)}>
                Send code
              </button>
              <div className="auth-switch">
                New to Dbot? <a onClick={() => setAuthMode('signup')}>Create an account</a>
              </div>
            </div>
          ) : (
            <div>
              <h1>Enter code</h1>
              <p className="auth-sub">We sent a 6-digit code to your phone. (Demo — type anything.)</p>
              <div className="otp-row">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input key={i} className="otp-box" maxLength={1} />
                ))}
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={completeSignin}>
                Verify & continue
              </button>
              <div className="auth-switch">
                <a onClick={() => setOtpView(false)}>Change number</a>
              </div>
            </div>
          )
        ) : (
          <div>
            <h1>Create your account</h1>
            <p className="auth-sub">A few details and you're in.</p>
            <div className="field">
              <label>Full name</label>
              <input className="input" placeholder="e.g. Aarav Sharma" />
            </div>
            <div className="field">
              <label>Phone number</label>
              <input className="input" placeholder="+91 98765 43210" />
            </div>
            <div className="field">
              <label>Company / studio</label>
              <input className="input" placeholder="e.g. Studio Verse Architects" />
            </div>
            <div className="field">
              <label>Your role</label>
              <select className="input">
                <option>Architect</option>
                <option>Interior designer</option>
                <option>Developer</option>
                <option>Other</option>
              </select>
            </div>
            <button className="btn btn-primary btn-block btn-lg" onClick={completeSignin}>
              Create account
            </button>
            <div className="auth-switch">
              Already have an account? <a onClick={() => setAuthMode('login')}>Sign in</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
