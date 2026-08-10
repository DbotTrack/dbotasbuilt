/**
 * COST-FED PRICING ENGINE
 *
 * 1:1 port of `initEstimator()` in the `dbot-asbuilt-web.html` prototype
 * (the canonical reference). Anchored to the old estimator + a +15% step-up.
 *
 * This is the single source of truth for pricing: the estimator drawer and the
 * /estimator page both call `quote()`. It is intentionally pure — no DOM, no
 * React — so it can be unit-tested and reused server-side later.
 *
 * Pipeline:
 *   1. area of each space (elevation is derived from footprint × sides × height)
 *   2. pick a rate ladder from the chosen deliverables
 *   3. charge total area through CUMULATIVE slabs, cheapest bands last
 *   4. apply project-type + scope multipliers, then the price-level uplift
 *   5. enforce a 500-sqft floor price, round up to ₹100
 *   6. add the outstation allowance (road-hours × scan days)
 *   7. add 18% GST
 */

/* ════════════════════════════ tunable knobs ════════════════════════════ */

/**
 * Slab WIDTHS — not thresholds. Cumulative break points are therefore
 * 0–500 · 500–1500 · 1500–3000 · 3000–5000 · 5000+.
 */
export const BANDS: readonly number[] = [500, 1000, 1500, 2000, Infinity]

/** ₹/sqft per band. */
export const RATE_2D: readonly number[] = [4, 2, 1, 0.75, 0.75]
export const RATE_3D: readonly number[] = [4, 2.7, 1.35, 0.9, 0.75]
export const RATE_2D3D: readonly number[] = [4, 3, 1.5, 1, 0.75]

/** Discounts applied when no model is built (360°-only / point-cloud-only). */
export const F_360 = 0.8
export const F_PC = 0.85
/** How far a 2D-only job sits between the 3D and the 2D+3D ladder. */
export const TWOD_PREMIUM = 0.4
export const RATE_2D_ONLY: readonly number[] = RATE_3D.map(
  (r, i) => r + TWOD_PREMIUM * ((RATE_2D3D[i] ?? r) - r),
)

export const UPLIFT = 1.15
export const PRICE_LEVEL = 1.15
export const GST_RATE = 0.18

/** Open area and elevation are cheaper to capture than roofed interior. */
export const OPEN_FACTOR = 0.55
export const ELEV_FACTOR = 0.65
/** Assumed floor-to-floor height (ft) when deriving elevation area. */
export const FLOOR_HT = 10
/** Scannable sqft per crew-day, used only to size the outstation allowance. */
export const SCAN_PER_DAY = 25000
/** Minimum billable job = this many sqft at the top-band rate. */
export const FLOOR_SQFT = 500

export const HOME_CITY = 'Chennai'
/** Beyond these, the allowance is quoted manually by the team. */
export const MAX_ROAD_HOURS = 10
export const MAX_SCAN_DAYS = 2
/** Fallback for a city missing from CITY_HOURS — forces the manual path. */
export const UNKNOWN_CITY_HOURS = 99

/* ════════════════════════════ catalogues ════════════════════════════ */

export type ProjectTypeId = 'arch' | 'venue' | 'heritage' | 'plant' | 'projection'

export interface ProjectType {
  id: ProjectTypeId
  label: string
  mult: number
}

export const PROJECT_TYPES: readonly ProjectType[] = [
  { id: 'arch', label: 'Architecture / interior', mult: 1.0 },
  { id: 'venue', label: 'Venue mapping', mult: 1.15 },
  { id: 'heritage', label: 'Heritage documentation', mult: 1.75 },
  { id: 'plant', label: 'Plant & machinery', mult: 1.3 },
  { id: 'projection', label: 'Projection mapping', mult: 1.5 },
]

export type ScopeId = 'civil' | 'ep' | 'fitouts' | 'finishes'

export interface ScopeItem {
  id: ScopeId
  label: string
  /** Added to SCOPE_BASE_MULT when selected. */
  add: number
  /** Always included — not toggleable. */
  lock?: boolean
}

/** Civil-only sits at 0.9; every chip on takes it to 1.8. */
export const SCOPE_BASE_MULT = 0.9

export const SCOPE_ITEMS: readonly ScopeItem[] = [
  { id: 'civil', label: 'Civil & structural', add: 0, lock: true },
  { id: 'ep', label: 'Electrical & Plumbing', add: 0.1 },
  { id: 'fitouts', label: 'Interior fitouts', add: 0.3 },
  { id: 'finishes', label: 'Finishes', add: 0.5 },
]

export type DeliverableId = 'view360' | 'pointcloud' | 'drawings2d' | 'model3d'

export interface Deliverable {
  id: DeliverableId
  label: string
  lock?: boolean
}

export const DELIVERABLES: readonly Deliverable[] = [
  { id: 'view360', label: '360° view', lock: true },
  { id: 'pointcloud', label: 'Point cloud' },
  { id: 'drawings2d', label: '2D drawings' },
  { id: 'model3d', label: '3D model' },
]

/**
 * City → one-way ROAD travel time from Velachery, Chennai (hours).
 * Estimated — spot-check before relying on it for a real quote.
 */
export const CITY_HOURS: Readonly<Record<string, number>> = {
  Agartala: 55, Agra: 34, Ahmedabad: 30, Ajmer: 40, Aligarh: 38, Amritsar: 48,
  Aurangabad: 22, Bengaluru: 6, Bhopal: 26, Bhubaneswar: 22, Bikaner: 48,
  Chandigarh: 44, Chennai: 0, Coimbatore: 8.5, Cuttack: 23, Dehradun: 46, Delhi: 38,
  Dhanbad: 32, Durgapur: 30, Erode: 7, Faridabad: 37, Ghaziabad: 39, Guntur: 8,
  Gurugram: 38, Guwahati: 50, Gwalior: 32, Howrah: 28, Hubballi: 12, Hyderabad: 11,
  Indore: 28, Jabalpur: 26, Jaipur: 40, Jalandhar: 47, Jammu: 52, Jamshedpur: 30,
  Jodhpur: 44, Kanpur: 34, Kochi: 12, Kolkata: 28, Kota: 36, Kozhikode: 10.5,
  Lucknow: 34, Ludhiana: 46, Madurai: 8, Mangaluru: 13, Meerut: 40, Mumbai: 22,
  Mysuru: 8, Nagpur: 20, Nashik: 22, 'Navi Mumbai': 22, Nellore: 3.5, Noida: 39,
  Panaji: 15, Patna: 36, Puducherry: 3, Pune: 20, Raipur: 22, Rajkot: 34, Ranchi: 30,
  Salem: 6, Siliguri: 40, Srinagar: 58, Surat: 26, Thane: 22, Thiruvananthapuram: 12,
  Thrissur: 10.5, Tiruchirappalli: 5.5, Tirunelveli: 10.5, Tirupati: 3, Tiruppur: 8,
  Udaipur: 42, Ujjain: 28, Vadodara: 28, Varanasi: 34, Vellore: 2.5, Vijayawada: 8,
  Visakhapatnam: 13, Warangal: 12,
}

/** Alphabetical city list for the dropdown. */
export const CITIES: readonly string[] = Object.keys(CITY_HOURS).sort((a, b) =>
  a.localeCompare(b),
)

/* ════════════════════════════ formatters ════════════════════════════ */

export const fmtINR = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
export const fmtSqft = (n: number) => Math.round(n).toLocaleString('en-IN') + ' sqft'

/* ════════════════════════════ engine ════════════════════════════ */

const ceil100 = (n: number) => Math.ceil(n / 100) * 100

/** Per-day outstation allowance, stepped by one-way road hours. */
export function perDayAllowance(hours: number): number {
  if (hours <= 2) return 0
  if (hours <= 4) return 3000
  if (hours <= 7) return 5000
  if (hours <= 10) return 7000
  return 10000
}

/**
 * Elevation area from a footprint: √(building area) approximates one side of a
 * square plan, × the number of reachable faces × total building height.
 */
export function elevationArea(building: number, floors: number, sides: number): number {
  return Math.max(Math.round(sides * Math.sqrt(building) * floors * FLOOR_HT), 0)
}

/** Which ₹/sqft ladder applies for the selected deliverables. */
export function deliverableRates(
  has2D: boolean,
  has3D: boolean,
  hasPC: boolean,
): readonly number[] {
  if (has2D && has3D) return RATE_2D3D
  if (has2D) return RATE_2D_ONLY
  if (has3D) return RATE_3D
  const f = hasPC ? F_PC : F_360
  return RATE_2D.map((r) => r * f)
}

/**
 * Cost of `len` sqft entering the slab ladder at cumulative position `start`.
 * Positional on purpose: interior consumes the expensive bands first, so open
 * area and elevation land in the cheaper tail.
 */
export function slabSegment(start: number, len: number, rates: readonly number[]): number {
  if (len <= 0) return 0
  let cost = 0
  let pos = 0
  const end = start + len
  for (let i = 0; i < BANDS.length; i++) {
    const bandStart = pos
    const bandEnd = pos + (BANDS[i] ?? 0)
    const a = Math.max(start, bandStart)
    const b = Math.min(end, bandEnd)
    if (b > a) cost += (b - a) * (rates[i] ?? 0)
    pos = bandEnd
    if (pos >= end) break
  }
  return cost
}

export interface QuoteInput {
  projectType: ProjectTypeId
  city: string
  interior: { on: boolean; area: number }
  open: { on: boolean; area: number }
  elevation: { on: boolean; building: number; floors: number; sides: number }
  scope: ReadonlySet<ScopeId>
  deliverables: ReadonlySet<DeliverableId>
}

export interface Quote {
  typeLabel: string
  typeMult: number
  /** Derived elevation area — shown even when the elevation toggle is off. */
  elevationArea: number
  spaces: Array<{ label: string; area: number }>
  totalArea: number
  rates: readonly number[]
  scopeMult: number
  scopeLabels: string[]
  deliverableLabels: string[]
  /** Pre-GST, pre-allowance project value, rounded up to ₹100. */
  base: number
  /** Blended ₹/sqft implied by `base`. */
  effRate: number
  /** Whether the floor price beat the slab total. */
  floorApplied: boolean
  allowance: number
  /** True when the city is too far / job too long to auto-quote travel. */
  allowanceOnRequest: boolean
  scanDays: number
  /** Copy for the note under the city dropdown ('' when Chennai). */
  cityNote: string
  gst: number
  total: number
}

export function quote(input: QuoteInput): Quote {
  const type =
    PROJECT_TYPES.find((t) => t.id === input.projectType) ?? PROJECT_TYPES[0]!
  const typeMult = type.mult

  /* ── 1. areas ── */
  const intArea = input.interior.on ? Math.max(input.interior.area, 0) : 0
  const openArea = input.open.on ? Math.max(input.open.area, 0) : 0
  const elev = elevationArea(
    input.elevation.building,
    input.elevation.floors,
    input.elevation.sides,
  )
  const elevArea = input.elevation.on ? elev : 0

  /* ── 2. rate ladder from deliverables ── */
  const has2D = input.deliverables.has('drawings2d')
  const has3D = input.deliverables.has('model3d')
  const hasPC = input.deliverables.has('pointcloud')
  const rates = deliverableRates(has2D, has3D, hasPC)
  const modelBuilt = has2D || has3D

  /* ── 3. scope multiplier (only meaningful when a model is drawn) ── */
  const scopeLabels = SCOPE_ITEMS.filter((s) => input.scope.has(s.id)).map((s) => s.label)
  const scopeMult = modelBuilt
    ? SCOPE_ITEMS.reduce(
        (m, s) => m + (input.scope.has(s.id) ? s.add : 0),
        SCOPE_BASE_MULT,
      )
    : 1.0

  /* ── 4. cumulative slabs, each space discounted by difficulty ── */
  const intBase = slabSegment(0, intArea, rates)
  const openBase = slabSegment(intArea, openArea, rates) * OPEN_FACTOR
  const elevBase = slabSegment(intArea + openArea, elevArea, rates) * ELEV_FACTOR
  const totalArea = intArea + openArea + elevArea

  /* ── 5. multipliers, floor price, rounding ── */
  const multipliers = typeMult * scopeMult * UPLIFT * PRICE_LEVEL
  const rawBase = (intBase + openBase + elevBase) * multipliers
  const floorBase = FLOOR_SQFT * (rates[0] ?? 0) * multipliers
  const base = totalArea > 0 ? ceil100(Math.max(rawBase, floorBase)) : 0

  /* ── 6. outstation allowance ── */
  let allowance = 0
  let allowanceOnRequest = false
  let cityNote = ''
  const scanDays = Math.max(1, Math.ceil((intArea + openArea) / SCAN_PER_DAY))
  if (input.city !== HOME_CITY) {
    const hours = CITY_HOURS[input.city] ?? UNKNOWN_CITY_HOURS
    if (hours > MAX_ROAD_HOURS || scanDays > MAX_SCAN_DAYS) {
      allowanceOnRequest = true
      cityNote =
        'Allowance is not included in the quote. Contact Dbot Team to know the allowance.'
    } else {
      const perDay = perDayAllowance(hours)
      allowance = perDay * (1 + 0.7 * (scanDays - 1))
      cityNote =
        'Outstation allowance included · ' +
        scanDays +
        ' day' +
        (scanDays > 1 ? 's' : '') +
        ' @ ' +
        fmtINR(perDay) +
        '/day' +
        (scanDays > 1 ? ' (+0.7× per extra day)' : '') +
        '.'
    }
  }

  /* ── 7. GST ── */
  const gst = (base + allowance) * GST_RATE

  const spaces: Array<{ label: string; area: number }> = []
  if (input.interior.on) spaces.push({ label: 'Interior', area: intArea })
  if (input.open.on) spaces.push({ label: 'Open area', area: openArea })
  if (input.elevation.on) spaces.push({ label: 'Exterior elevation', area: elevArea })

  return {
    typeLabel: type.label,
    typeMult,
    elevationArea: elev,
    spaces,
    totalArea,
    rates,
    scopeMult,
    scopeLabels,
    deliverableLabels: DELIVERABLES.filter((d) => input.deliverables.has(d.id)).map(
      (d) => d.label,
    ),
    base,
    effRate: totalArea ? base / totalArea : 0,
    floorApplied: totalArea > 0 && floorBase > rawBase,
    allowance,
    allowanceOnRequest,
    scanDays,
    cityNote,
    gst,
    total: base + allowance + gst,
  }
}
