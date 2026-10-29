import type { DeliverableId, ProjectTypeId, QuoteInput } from './pricing'

/**
 * HAND-OFF TO THE CLIENT APP
 *
 * Sign-in, booking and the live rate card all live at app.dbotasbuilt.com.
 * That is a separate origin, so its session — the JWT pair in ITS localStorage —
 * cannot be read from this site. Every "Book a project" therefore lands on the
 * app's `/book-project`, which checks its own storage: signed in, straight to
 * the estimator; signed out, to login first and then the estimator.
 *
 * `npm run dev` points it at the local app instead (`.env.development`).
 */
export const CLIENT_APP_URL = import.meta.env.VITE_CLIENT_APP_URL || 'https://app.dbotasbuilt.com'
export const CLIENT_BOOK_URL = `${CLIENT_APP_URL}/book-project`

/**
 * AES-256-GCM key shared with the app's `features/estimator/engine/handoff.ts`.
 * Change both together. NOT a secret — it ships in both public bundles. What it
 * buys is tamper-evidence: a link edited by hand fails GCM's authentication and
 * the app ignores it. The payload is inputs only, never a price; the app
 * re-prices from its own rate card and the server re-verifies on save.
 */
const HANDOFF_KEY = 'nZNtCU7zi66Hh_jvf9tM4vjTu0mAAx1S7RHyYraSxUI'
const IV_BYTES = 12

/* The app's catalogue codes, where they differ from the ids used here. */
const PROJECT_TYPE_CODES: Record<ProjectTypeId, string> = {
  arch: 'architecture',
  venue: 'venue',
  heritage: 'heritage',
  plant: 'plant',
  projection: 'projection',
}

const DELIVERABLE_CODES: Record<DeliverableId, string> = {
  view360: '360',
  pointcloud: 'pointcloud',
  drawings2d: '2d',
  model3d: '3d',
}

const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const fromBase64Url = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))

/** The scope as the app's `EstimatorConfig` JSON. */
function toAppConfig(input: QuoteInput) {
  return {
    projectType: PROJECT_TYPE_CODES[input.projectType],
    city: input.city,
    spaces: {
      interiorOn: input.interior.on,
      interiorArea: input.interior.area,
      openOn: input.open.on,
      openArea: input.open.area,
      elevationOn: input.elevation.on,
      buildingArea: input.elevation.building,
      floors: input.elevation.floors,
      sides: input.elevation.sides,
    },
    // scope ids are already the app's codes
    scope: [...input.scope],
    deliverables: [...input.deliverables].map((d) => DELIVERABLE_CODES[d]),
  }
}

/** `base64url(iv ‖ ciphertext+tag)` of the config JSON. */
async function seal(input: QuoteInput): Promise<string> {
  const key = await crypto.subtle.importKey('raw', fromBase64Url(HANDOFF_KEY), 'AES-GCM', false, [
    'encrypt',
  ])
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES))
  const body = new TextEncoder().encode(JSON.stringify(toAppConfig(input)))
  const sealed = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, body))
  const out = new Uint8Array(IV_BYTES + sealed.length)
  out.set(iv)
  out.set(sealed, IV_BYTES)
  return toBase64Url(out)
}

/** `CLIENT_BOOK_URL` carrying the scope configured here, sealed, as `?estimate=`. */
export async function bookUrlWith(input: QuoteInput): Promise<string> {
  const url = new URL(CLIENT_BOOK_URL)
  url.searchParams.set('estimate', await seal(input))
  return url.toString()
}
