import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import DbotLogo from '../common/DbotLogo'
import { useApp } from '../../context/AppContext'
import { PORTAL_NAV, activeGroup } from './portalNav'

/** Chrome for the client portal: fixed sidebar (desktop), bottom nav + topbar (mobile). */
export default function PortalLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { bookProject } = useApp()
  const group = activeGroup(pathname)

  return (
    <div className="animate-view">
      {/* desktop sidebar */}
      <aside className="hidden min-[861px]:flex fixed top-0 left-0 bottom-0 w-60 bg-white border-r border-grey-1 z-[150] flex-col px-4 py-[22px]">
        <div className="px-2 pt-1.5 pb-[22px]">
          <DbotLogo variant="sidebar" onClick={() => navigate('/portal')} />
        </div>
        <button className="btn btn-primary btn-block mb-[18px]" onClick={bookProject}>
          Book a project
        </button>
        <nav className="flex flex-col gap-[3px]">
          {PORTAL_NAV.map((item) => (
            <div
              key={item.group}
              className={`side-item ${group === item.group ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-grey-1">
          <button className="btn btn-ghost btn-block btn-sm" onClick={() => navigate('/')}>
            Exit to website
          </button>
        </div>
      </aside>

      {/* main content column */}
      <main className="min-h-screen min-[861px]:ml-60 min-[861px]:px-10 min-[861px]:pt-[34px] min-[861px]:pb-[70px] px-[18px] pb-[100px]">
        {/* mobile topbar */}
        <div className="min-[861px]:hidden flex items-center justify-between sticky top-0 z-[100] bg-white/[0.92] backdrop-blur-[12px] px-[18px] py-3 -mx-[18px] mb-[18px] border-b border-grey-1">
          <DbotLogo variant="sidebar" onClick={() => navigate('/portal')} />
          <span
            className="w-[34px] h-[34px] rounded-full bg-purple-soft text-purple flex items-center justify-center text-[13px] font-semibold cursor-pointer"
            onClick={() => navigate('/portal/profile')}
          >
            AS
          </span>
        </div>
        <div className="portal-inner">
          <Outlet />
        </div>
      </main>

      {/* mobile bottom nav */}
      <nav className="min-[861px]:hidden flex fixed bottom-0 left-0 right-0 bg-white border-t border-grey-1 z-[150] px-2 pt-2.5 pb-[22px]">
        <button className="bn-item" data-group="home" onClick={() => navigate('/portal')}>
          {PORTAL_NAV[0].icon}
          <span>Home</span>
        </button>
        <button className={`bn-item ${group === 'projects' ? 'active' : ''}`} onClick={() => navigate('/portal/projects')}>
          {PORTAL_NAV[1].icon}
          <span>Projects</span>
        </button>
        <button className="bn-fab" onClick={bookProject} aria-label="Book a project">
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          className={`bn-item ${group === 'notifications' ? 'active' : ''}`}
          onClick={() => navigate('/portal/notifications')}
        >
          {PORTAL_NAV[3].icon}
          <span>Alerts</span>
        </button>
        <button className={`bn-item ${group === 'profile' ? 'active' : ''}`} onClick={() => navigate('/portal/profile')}>
          {PORTAL_NAV[4].icon}
          <span>Profile</span>
        </button>
      </nav>
    </div>
  )
}
