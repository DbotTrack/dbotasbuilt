import { Outlet } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/** Chrome for all public/marketing routes: fixed nav + footer. */
export default function MarketingLayout() {
  return (
    <>
      <SiteNav />
      <div className="pt-nav-h animate-view">
        <Outlet />
      </div>
      <SiteFooter />
    </>
  )
}
