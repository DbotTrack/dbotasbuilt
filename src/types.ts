/** Shared domain + UI types for the Dbot Asbuilt web app. */

export type PillState = 'attention' | 'progress' | 'passive'

export type OverlayKind = 'estimator' | 'booking' | 'auth' | null

export type AuthMode = 'login' | 'signup'

/** Marketing project categories (used by "What we handle"). */
export interface Category {
  title: string
  blurb: string
  seed: number
}

/** A portal project row. */
export interface Project {
  id: string
  name: string
  area: string
  meta: string
  pill: { label: string; state: PillState }
  /** where the card routes to */
  href: string
}
