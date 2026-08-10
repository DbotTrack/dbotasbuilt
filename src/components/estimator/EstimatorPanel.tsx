import { useMemo, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import {
  CITIES,
  DELIVERABLES,
  HOME_CITY,
  PROJECT_TYPES,
  SCOPE_ITEMS,
  fmtINR,
  fmtSqft,
  quote,
  type DeliverableId,
  type ProjectTypeId,
  type ScopeId,
} from '../../lib/pricing'

/**
 * The estimator itself — config column + live quote card + terms.
 *
 * Rendered in two places, hence the `variant`:
 *  - `drawer` — inside the 560px slide-over, always a single column
 *  - `page`   — the /estimator route, two columns from 881px up with a sticky
 *               quote card, plus a compact sticky total bar on phones
 *
 * All pricing lives in `src/lib/pricing.ts`; this file only collects inputs.
 */

const TERMS: Array<{ h: string; body: string[] }> = [
  {
    h: 'General terms',
    body: [
      'Pricing is based on the tentative sqft considered and may vary with the actual scanned area; the builtup area is the billable area.',
      'Only elements visible at the time of documentation are captured.',
      'Output files carry all visible architectural, structural, electrical and plumbing points. Exposed conduits are added on request, at additional cost and time.',
      'Payments are accepted via net banking or UPI. 50% is payable in advance before scanning begins; the balance is collected after delivery, adjusted to the final value.',
      'Projects outside Chennai attract an outstation allowance based on the city and number of days required.',
    ],
  },
  {
    h: '360° view file',
    body: [
      'A complimentary 360° view file is shared with your 2D and/or 3D output; bought on its own, it is chargeable.',
      'The viewer software setup is provided and installs on Windows PCs only.',
      'The file is measurable for quick references, though measurements are indicative as it uses a sparse point cloud.',
    ],
  },
  {
    h: '2D drawings',
    body: [
      'The 2D full package includes floor plans, ceiling plans and all wall elevations, as per the documented scope.',
    ],
  },
  {
    h: '3D model',
    body: [
      'The 3D file is delivered in Sketchup format with default materials and finishes; it will not match on-site materials.',
      'Site-matched 3D materials, dimensioned 2D drawings and PDF plans are available on request and will alter pricing and timeline.',
    ],
  },
  {
    h: 'Exterior elevation',
    body: [
      'Exterior scanning depends on available clearance; a narrower setback means fewer details can be captured.',
      'Final billing is adjusted to the actual scope captured.',
    ],
  },
  {
    h: 'Price validity',
    body: [
      'The quoted price is valid for up to 90 days from the date of booking.',
      'Pricing revisions are made and updated here periodically.',
    ],
  },
  {
    h: 'Output tolerance',
    body: [
      '±10mm is inevitable for interior projects.',
      '±50mm is inevitable for ortho-adjusted projects.',
      '±75mm is inevitable for outdoor projects over 10,000 sqft.',
    ],
  },
]

const lockIcon = (
  <svg
    className="w-[11px] h-[11px] text-sage flex-none"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

/** Empty / malformed input reads as 0, matching the prototype's parseFloat||0. */
const num = (s: string) => {
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 ? n : 0
}

export default function EstimatorPanel({ variant = 'page' }: { variant?: 'drawer' | 'page' }) {
  const { bookProject } = useApp()
  const { toast } = useToast()
  const quoteRef = useRef<HTMLDivElement>(null)

  const [projectType, setProjectType] = useState<ProjectTypeId>('arch')
  const [city, setCity] = useState(HOME_CITY)

  const [intOn, setIntOn] = useState(true)
  const [intArea, setIntArea] = useState('2000')
  const [openOn, setOpenOn] = useState(true)
  const [openArea, setOpenArea] = useState('800')
  const [elevOn, setElevOn] = useState(true)
  const [bld, setBld] = useState('2000')
  const [floors, setFloors] = useState('2')
  const [sides, setSides] = useState('3')

  const [scope, setScope] = useState<Set<ScopeId>>(new Set<ScopeId>(['civil']))
  const [deliv, setDeliv] = useState<Set<DeliverableId>>(
    new Set<DeliverableId>(['view360', 'drawings2d', 'model3d']),
  )
  const [openTerms, setOpenTerms] = useState<Set<number>>(new Set([0]))

  const q = useMemo(
    () =>
      quote({
        projectType,
        city,
        interior: { on: intOn, area: num(intArea) },
        open: { on: openOn, area: num(openArea) },
        elevation: {
          on: elevOn,
          building: num(bld),
          floors: num(floors),
          sides: num(sides),
        },
        scope,
        deliverables: deliv,
      }),
    [projectType, city, intOn, intArea, openOn, openArea, elevOn, bld, floors, sides, scope, deliv],
  )

  function toggle<T>(set: Set<T>, key: T, setter: (s: Set<T>) => void) {
    const next = new Set(set)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setter(next)
  }

  /** Hand the configured scope to the booking flow, like the prototype did. */
  function book() {
    try {
      localStorage.setItem(
        'dbot_estimate',
        JSON.stringify({
          type: q.typeLabel,
          city,
          area: q.totalArea,
          scope: q.scopeLabels,
          deliverables: q.deliverableLabels,
          base: q.base,
          allowance: q.allowanceOnRequest ? 'on-request' : q.allowance,
          total: q.total,
        }),
      )
    } catch {
      /* storage blocked (private mode) — booking still proceeds */
    }
    bookProject()
  }

  const isDrawer = variant === 'drawer'

  return (
    <>
      <div className="est">
        {/* ───────────── config column ───────────── */}
        <div>
          <p className="glabel">Project type</p>
          <div className="ecard">
            {PROJECT_TYPES.map((t) => (
              <div
                key={t.id}
                className={`prow ${t.id === projectType ? 'on' : ''}`}
                onClick={() => setProjectType(t.id)}
                role="radio"
                aria-checked={t.id === projectType}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setProjectType(t.id)
                  }
                }}
              >
                <span className={`radio-dot ${t.id === projectType ? 'on' : ''}`} />
                {t.label}
              </div>
            ))}
          </div>

          <p className="glabel">City</p>
          <div className="ecard">
            <div className="row">
              <span className="rlabel">Project city</span>
              <select
                className="est-select max-w-[62%]"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Project city"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {city !== HOME_CITY && <div className="citynote">{q.cityNote}</div>}
          </div>

          <p className="glabel">Spaces to capture</p>
          <div className="ecard">
            <div className="sblock">
              <div className="row" style={{ opacity: intOn ? 1 : 0.5 }}>
                <div>
                  <div className="rlabel">Interior</div>
                  <div className="rsub">Anything with a roof, incl. sitouts &amp; balcony</div>
                </div>
                <div
                  className={`sw ${intOn ? 'on' : ''}`}
                  onClick={() => setIntOn((v) => !v)}
                  role="switch"
                  aria-checked={intOn}
                  aria-label="Capture interior"
                />
              </div>
              {intOn && (
                <div className="awrap">
                  <div className="fld">
                    <label htmlFor="est-int">Interior area (sqft)</label>
                    <input
                      id="est-int"
                      className="mini"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={intArea}
                      onChange={(e) => setIntArea(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="sblock">
              <div className="row" style={{ opacity: openOn ? 1 : 0.5 }}>
                <div>
                  <div className="rlabel">Open area</div>
                  <div className="rsub">Without roof — terrace, setback, open balcony</div>
                </div>
                <div
                  className={`sw ${openOn ? 'on' : ''}`}
                  onClick={() => setOpenOn((v) => !v)}
                  role="switch"
                  aria-checked={openOn}
                  aria-label="Capture open area"
                />
              </div>
              {openOn && (
                <div className="awrap">
                  <div className="fld">
                    <label htmlFor="est-open">Open area (sqft)</label>
                    <input
                      id="est-open"
                      className="mini"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={openArea}
                      onChange={(e) => setOpenArea(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="sblock">
              <div className="row" style={{ opacity: elevOn ? 1 : 0.5 }}>
                <div>
                  <div className="rlabel">Exterior elevation</div>
                  <div className="rsub">Depends on site clearance / feasibility</div>
                </div>
                <div
                  className={`sw ${elevOn ? 'on' : ''}`}
                  onClick={() => setElevOn((v) => !v)}
                  role="switch"
                  aria-checked={elevOn}
                  aria-label="Capture exterior elevation"
                />
              </div>
              {elevOn && (
                <div className="awrap">
                  <div className="fld">
                    <label htmlFor="est-bld">Building area (sqft)</label>
                    <input
                      id="est-bld"
                      className="mini"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={bld}
                      onChange={(e) => setBld(e.target.value)}
                    />
                  </div>
                  <div className="fld fld-sm">
                    <label htmlFor="est-floors">Floors</label>
                    <input
                      id="est-floors"
                      className="mini"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={floors}
                      onChange={(e) => setFloors(e.target.value)}
                    />
                  </div>
                  <div className="fld fld-sm">
                    <label htmlFor="est-sides">Sides</label>
                    <input
                      id="est-sides"
                      className="mini"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={sides}
                      onChange={(e) => setSides(e.target.value)}
                    />
                  </div>
                  <div className="elev">
                    Elevation area: <strong>{q.elevationArea.toLocaleString('en-IN')}</strong> sqft
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="glabel">Scope</p>
          <div className="ecard">
            <div className="chips">
              {SCOPE_ITEMS.map((s) => (
                <span
                  key={s.id}
                  className={`chip ${scope.has(s.id) ? 'on' : ''} ${s.lock ? 'lock' : ''}`}
                  title={s.lock ? 'Always included' : undefined}
                  onClick={() => !s.lock && toggle(scope, s.id, setScope)}
                >
                  <span className="cdot" />
                  {s.label}
                  {s.lock && lockIcon}
                </span>
              ))}
            </div>
          </div>

          <p className="glabel">Deliverables</p>
          <div className="ecard">
            <div className="chips">
              {DELIVERABLES.map((d) => (
                <span
                  key={d.id}
                  className={`chip ${deliv.has(d.id) ? 'on' : ''} ${d.lock ? 'lock' : ''}`}
                  title={d.lock ? 'Always included' : undefined}
                  onClick={() => !d.lock && toggle(deliv, d.id, setDeliv)}
                >
                  <span className="cdot" />
                  {d.label}
                  {d.lock && lockIcon}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ───────────── quote column ───────────── */}
        <div>
          <div className="qwrap" ref={quoteRef}>
            <p className="glabel">Estimated total</p>
            <div className="q">
              <div className="qtot">{fmtINR(q.total)}</div>
              <div className="qgst">Inclusive of 18% GST</div>
              <div className="qsep" />

              <div className="qd">
                <div className="qd-lab">Project type</div>
                <div className="qd-val">{q.typeLabel}</div>
              </div>
              <div className="qd">
                <div className="qd-lab">Spaces &amp; area</div>
                <div>
                  {q.spaces.length ? (
                    <>
                      {q.spaces.map((s) => (
                        <div className="qsl" key={s.label}>
                          <span className="l2">{s.label}</span>
                          <span className="v2">{fmtSqft(s.area)}</span>
                        </div>
                      ))}
                      <div className="qsl subtot">
                        <span className="l2">Total area</span>
                        <span className="v2">{fmtSqft(q.totalArea)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="qd-val">No spaces selected</div>
                  )}
                </div>
              </div>
              <div className="qd">
                <div className="qd-lab">Scope</div>
                <div className="qd-val">
                  {q.scopeLabels.length ? q.scopeLabels.join(', ') : 'None selected'}
                </div>
              </div>
              <div className="qd">
                <div className="qd-lab">Deliverables</div>
                <div className="qd-val">
                  {q.deliverableLabels.length ? q.deliverableLabels.join(', ') : 'None selected'}
                </div>
              </div>

              <div className="qsep" />
              <div className="qrow">
                <span className="l">Base unit</span>
                <span className="v">₹{q.effRate.toFixed(1)}/sqft</span>
              </div>
              <div className="qrow">
                <span className="l">Base total</span>
                <span className="v">{fmtINR(q.base)}</span>
              </div>
              <div className="qrow">
                <span className="l">Outstation allowance</span>
                <span className="v">
                  {q.allowanceOnRequest ? 'Contact Dbot Team' : fmtINR(q.allowance)}
                </span>
              </div>
              <div className="qrow">
                <span className="l">GST (18%)</span>
                <span className="v">{fmtINR(q.gst)}</span>
              </div>

              <button className="btn btn-primary btn-block mt-4" onClick={book}>
                Book this project
              </button>
              <div className="qnote">Indicative placeholder pricing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-[60px]">
        <p className="est-sec">Try it yourself</p>
        <div className="ecard block p-[15px] px-4">
          <p className="res">
            Explore a sample <a onClick={() => toast('Demo link — sample 360° model')}>360° virtual model</a>,{' '}
            <a onClick={() => toast('Demo link — sample DWG')}>2D drawings (DWG)</a> and{' '}
            <a onClick={() => toast('Demo link — sample SketchUp')}>3D model (SketchUp)</a>. To view the
            360° model with live measurement, download{' '}
            <a onClick={() => toast('Demo link — Leica TruView')}>Leica’s TruView</a>.
          </p>
        </div>

        <p className="est-sec">Terms &amp; conditions</p>
        <div className="ecard block">
          {TERMS.map((t, i) => (
            <div key={t.h} className={`acc ${openTerms.has(i) ? 'open' : ''}`}>
              <div className="acc-h" onClick={() => toggle(openTerms, i, setOpenTerms)}>
                {t.h}
                <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <div className="acc-b">
                {t.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* phones: keep the running total in view while the form is scrolled */}
      {!isDrawer && (
        <div className="est-mobile-total">
          <div>
            <div className="emt-lab">Estimated total · incl. GST</div>
            <div className="emt-val">{fmtINR(q.total)}</div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => quoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Breakdown
          </button>
        </div>
      )}
    </>
  )
}
