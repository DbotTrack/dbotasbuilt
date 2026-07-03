import type { ReactNode } from 'react'

export interface PortalNavItem {
  group: string
  label: string
  bottomLabel?: string
  path: string
  icon: ReactNode
}

export const PORTAL_NAV: PortalNavItem[] = [
  {
    group: 'home',
    label: 'Home',
    path: '/portal',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 11l9-8 9 8M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    group: 'projects',
    label: 'Projects',
    path: '/portal/projects',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 7h7l2 2h9v11H3z" />
      </svg>
    ),
  },
  {
    group: 'invoices',
    label: 'Invoices',
    path: '/portal/invoices',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6 2h9l3 3v17l-3-2-3 2-3-2-3 2V2z" />
        <path d="M9 8h6M9 12h6" />
      </svg>
    ),
  },
  {
    group: 'notifications',
    label: 'Notifications',
    bottomLabel: 'Alerts',
    path: '/portal/notifications',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10 21a2 2 0 004 0" />
      </svg>
    ),
  },
  {
    group: 'profile',
    label: 'Profile',
    path: '/portal/profile',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </svg>
    ),
  },
]

/** Maps a portal pathname to its active nav group. */
export function activeGroup(pathname: string): string {
  if (pathname === '/portal') return 'home'
  if (pathname.startsWith('/portal/invoices')) return 'invoices'
  if (pathname.startsWith('/portal/notifications')) return 'notifications'
  if (pathname.startsWith('/portal/profile')) return 'profile'
  // projects, projects/:id, preview-pay, files/* all live under the "projects" group
  return 'projects'
}
