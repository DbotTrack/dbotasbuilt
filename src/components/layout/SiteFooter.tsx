import { useNavigate } from 'react-router-dom'
import DbotLogo from '../common/DbotLogo'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

/** Shared dark marketing footer. */
export default function SiteFooter() {
  const navigate = useNavigate()
  const { scrollToSection, bookProject, openEstimator, logIn } = useApp()
  const { toast } = useToast()

  const link =
    'block text-[13.5px] text-ink/[0.85] mb-2.5 cursor-pointer transition-colors hover:text-ink hover:underline leading-[1.5]'
  const colHead = 'text-ink text-xs uppercase tracking-[0.08em] mb-3.5 font-bold'

  return (
    <footer className="bg-sage text-ink">
      <div className="container-site grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-9 pt-14 pb-7 max-[860px]:grid-cols-2 max-[860px]:gap-[30px] max-[520px]:grid-cols-1">
        <div>
          <DbotLogo variant="footer" onClick={() => navigate('/')} />
          <p className="text-[13.5px] leading-[1.6] mt-4 max-w-[26em]">
            Dbot Asbuilt makes precise 3D scans of buildings using LiDAR — as-built documentation you can measure, model
            and trust.
          </p>
        </div>
        <div>
          <h4 className={colHead}>Company</h4>
          <a className={link} onClick={() => scrollToSection('about')}>Who we are</a>
          <a className={link} onClick={() => scrollToSection('services')}>What we do</a>
          <a className={link} onClick={() => scrollToSection('types')}>What we handle</a>
          <a className={link} onClick={() => scrollToSection('pricing')}>Pricing</a>
        </div>
        <div>
          <h4 className={colHead}>Get started</h4>
          <a className={link} onClick={bookProject}>Book a project</a>
          <a className={link} onClick={openEstimator}>Price estimator</a>
          <a className={link} onClick={logIn}>Log in</a>
          <a className={link} onClick={() => scrollToSection('contact')}>Contact us</a>
        </div>
        <div>
          <h4 className={colHead}>Reach us</h4>
          <a className={link} href="tel:+919363520220">+91 93635 20220</a>
          <a className={link} href="mailto:service@dbot.co.in">service@dbot.co.in</a>
        </div>
      </div>
      <div className="container-site border-t border-ink/[0.22] py-[18px] pb-[22px] flex items-center justify-between gap-3.5 flex-wrap text-[12.5px]">
        <span>© 2026 Dbot Asbuilt.</span>
        <span
          className="text-ink/[0.74] cursor-pointer inline-flex items-center gap-1.5 hover:text-ink hover:underline"
          onClick={() => toast('“Admin portal” comes in a later build step')}
        >
          <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" stroke="currentColor" fill="none" strokeWidth={2}>
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>{' '}
          Admin login
        </span>
      </div>
    </footer>
  )
}
