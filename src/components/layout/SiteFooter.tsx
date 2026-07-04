import { useNavigate } from 'react-router-dom'
import DbotLogo from '../common/DbotLogo'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

/** Shared dark marketing footer. */
export default function SiteFooter() {
  const navigate = useNavigate()
  const { scrollToSection, bookProject, openEstimator, logIn } = useApp()
  const { toast } = useToast()

  const link = 'block text-[13.5px] text-white/[0.66] mb-2.5 cursor-pointer transition-colors hover:text-orange leading-[1.5]'

  return (
    <footer className="bg-ink text-white/[0.66]">
      <div className="container-site grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-9 pt-14 pb-7 max-[860px]:grid-cols-2 max-[520px]:grid-cols-1">
        <div>
          <DbotLogo variant="footer" onClick={() => navigate('/')} />
          <p className="text-[13.5px] leading-[1.6] mt-4 max-w-[26em]">
            Dbot Asbuilt makes precise 3D scans of buildings using LiDAR — as-built documentation you can measure, model
            and trust.
          </p>
        </div>
        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.08em] mb-3.5 font-bold">Company</h4>
          <a className={link} onClick={() => scrollToSection('about')}>Who we are</a>
          <a className={link} onClick={() => scrollToSection('services')}>What we do</a>
          <a className={link} onClick={() => scrollToSection('types')}>What we handle</a>
          <a className={link} onClick={() => scrollToSection('pricing')}>Pricing</a>
        </div>
        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.08em] mb-3.5 font-bold">Get started</h4>
          <a className={link} onClick={bookProject}>Book a project</a>
          <a className={link} onClick={openEstimator}>Price estimator</a>
          <a className={link} onClick={logIn}>Log in</a>
          <a className={link} onClick={() => scrollToSection('contact')}>Contact us</a>
        </div>
        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.08em] mb-3.5 font-bold">Reach us</h4>
          <p className="text-[13.5px] text-white/[0.66] mb-2.5 leading-[1.5]">
            No. 7, Greams Road,
            <br />
            Thousand Lights, Chennai 600006
          </p>
          <a className={link} href="tel:+914440001234">+91 44 4000 1234</a>
          <a className={link} href="mailto:hello@dbot.co.in">hello@dbot.co.in</a>
        </div>
      </div>
      <div className="container-site border-t border-white/10 py-[18px] pb-[22px] flex items-center justify-between gap-3.5 flex-wrap text-[12.5px]">
        <span>© 2026 Dbot Asbuilt. A Chennai company.</span>
        <span
          className="text-white/50 cursor-pointer inline-flex items-center gap-1.5 hover:text-orange"
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
