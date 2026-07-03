import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

const TYPES = [
  { mult: 1.0, label: 'Architecture / interior' },
  { mult: 1.1, label: 'Venue mapping' },
  { mult: 1.25, label: 'Heritage documentation' },
  { mult: 1.3, label: 'Plant & machinery' },
  { mult: 1.2, label: 'Projection mapping' },
]

const CITIES = [
  'Chennai',
  'Bengaluru',
  'Coimbatore',
  'Hyderabad',
  'Madurai',
  'Mumbai',
  'Delhi',
  'Kochi',
  'Pune',
  'Puducherry',
]

const SCOPE = [
  { l: 'Civil & structural', lock: true },
  { l: 'Electrical' },
  { l: 'Plumbing' },
  { l: 'Interior fitouts' },
  { l: 'Finishes' },
]

const DELIV = [
  { rate: 6, l: '360° view', lock: true },
  { rate: 4, l: 'Point cloud' },
  { rate: 10, l: '2D drawings' },
  { rate: 14, l: '3D model' },
]

const TERMS = [
  {
    h: 'General terms',
    body: [
      'Pricing is based on tentative sqft and may vary with the actual scanned area; the builtup area is the billable area.',
      'Only elements visible at the time of documentation are captured.',
      '50% is payable in advance before scanning begins; the balance is collected after delivery, adjusted to the final value.',
      'Projects outside Chennai attract an outstation allowance based on the city and days required.',
    ],
  },
  {
    h: '360° view file',
    body: [
      'A complimentary 360° view file is shared with your 2D and/or 3D output; bought on its own, it is chargeable.',
      'The viewer software installs on Windows PCs only.',
    ],
  },
  { h: 'Price validity', body: ['The quoted price is valid for up to 90 days from the date of booking.'] },
  {
    h: 'Output tolerance',
    body: ['±10mm is inevitable for interior projects.', '±75mm is inevitable for outdoor projects over 10,000 sqft.'],
  },
]

const lockIcon = (
  <svg className="w-[11px] h-[11px] text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
const sqft = (n: number) => Math.round(n).toLocaleString('en-IN') + ' sqft'

export default function EstimatorDrawer() {
  const { overlay, closeOverlays, bookProject } = useApp()
  const { toast } = useToast()
  const open = overlay === 'estimator'

  const [typeIdx, setTypeIdx] = useState(0)
  const [city, setCity] = useState('Chennai')
  const [intOn, setIntOn] = useState(true)
  const [intArea, setIntArea] = useState(2000)
  const [openOn, setOpenOn] = useState(true)
  const [openArea, setOpenArea] = useState(800)
  const [elevOn, setElevOn] = useState(true)
  const [bld, setBld] = useState(2000)
  const [floors, setFloors] = useState(2)
  const [sides, setSides] = useState(3)
  const [scope, setScope] = useState<Set<string>>(new Set(['Civil & structural']))
  const [deliv, setDeliv] = useState<Set<string>>(new Set(['360° view', '2D drawings', '3D model']))
  const [openTerms, setOpenTerms] = useState<Set<number>>(new Set([0]))

  const elev = Math.max(Math.round((bld * sides) / 4), 0)
  const cityMult = city === 'Chennai' ? 1.0 : 1.1

  const q = useMemo(() => {
    const type = TYPES[typeIdx]
    const spaces: [string, number][] = []
    let area = 0
    if (intOn) {
      spaces.push(['Interior', intArea])
      area += intArea
    }
    if (openOn) {
      spaces.push(['Open area', openArea])
      area += openArea
    }
    if (elevOn) {
      spaces.push(['Exterior elevation', elev])
      area += elev
    }
    let unit = 0
    const dl: string[] = []
    DELIV.forEach((d) => {
      if (deliv.has(d.l)) {
        unit += d.rate
        dl.push(d.l)
      }
    })
    const sc = SCOPE.filter((s) => scope.has(s.l)).map((s) => s.l)
    const scopeMult = 1 + 0.06 * Math.max(sc.length - 1, 0)
    const base = unit * area * type.mult * scopeMult
    const allow = base * Math.max(cityMult - 1, 0)
    const gst = (base + allow) * 0.18
    const total = base + allow + gst
    return { type, spaces, area, unit, dl, sc, base, allow, gst, total }
  }, [typeIdx, intOn, intArea, openOn, openArea, elevOn, elev, deliv, scope, cityMult])

  const toggleSet = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setter(next)
  }

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-head">
        <span className="drawer-title">Price estimator</span>
        <button className="drawer-close" onClick={closeOverlays} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="drawer-body">
        <div className="est-head pb-1">
          <h1 className="text-[22px] font-display font-semibold tracking-[-0.02em]">Price estimator</h1>
          <p className="text-ink-2 mt-2 text-[15px]">
            Configure your scope for an instant, indicative price. Final quote confirmed within 2 hours.
          </p>
        </div>

        <div className="est !grid-cols-1 pt-3.5">
          {/* config column */}
          <div>
            <p className="glabel">Project type</p>
            <div className="ecard">
              {TYPES.map((t, i) => (
                <div key={t.label} className={`prow ${i === typeIdx ? 'on' : ''}`} onClick={() => setTypeIdx(i)}>
                  <span className={`radio-dot ${i === typeIdx ? 'on' : ''}`} />
                  {t.label}
                </div>
              ))}
            </div>

            <p className="glabel">City</p>
            <div className="ecard">
              <div className="row">
                <span className="rlabel">Project city</span>
                <select className="est-select" value={city} onChange={(e) => setCity(e.target.value)}>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {city !== 'Chennai' && (
                <div className="citynote">An outstation allowance is added for projects outside Chennai.</div>
              )}
            </div>

            <p className="glabel">Spaces to capture</p>
            <div className="ecard">
              <div className="sblock">
                <div className="row" style={{ opacity: intOn ? 1 : 0.5 }}>
                  <div>
                    <div className="rlabel">Interior</div>
                    <div className="rsub">Anything with a roof, incl. sitouts & balcony</div>
                  </div>
                  <div className={`sw ${intOn ? 'on' : ''}`} onClick={() => setIntOn((v) => !v)} />
                </div>
                {intOn && (
                  <div className="awrap">
                    <div className="fld">
                      <label>Interior area (sqft)</label>
                      <input className="mini" type="number" min={0} value={intArea} onChange={(e) => setIntArea(+e.target.value || 0)} />
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
                  <div className={`sw ${openOn ? 'on' : ''}`} onClick={() => setOpenOn((v) => !v)} />
                </div>
                {openOn && (
                  <div className="awrap">
                    <div className="fld">
                      <label>Open area (sqft)</label>
                      <input className="mini" type="number" min={0} value={openArea} onChange={(e) => setOpenArea(+e.target.value || 0)} />
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
                  <div className={`sw ${elevOn ? 'on' : ''}`} onClick={() => setElevOn((v) => !v)} />
                </div>
                {elevOn && (
                  <div className="awrap">
                    <div className="fld">
                      <label>Building area (sqft)</label>
                      <input className="mini" type="number" min={0} value={bld} onChange={(e) => setBld(+e.target.value || 0)} />
                    </div>
                    <div className="fld">
                      <label>Floors</label>
                      <input className="mini w-[78px]" type="number" min={0} value={floors} onChange={(e) => setFloors(+e.target.value || 0)} />
                    </div>
                    <div className="fld">
                      <label>Sides</label>
                      <input className="mini w-[78px]" type="number" min={0} value={sides} onChange={(e) => setSides(+e.target.value || 0)} />
                    </div>
                    <div className="elev">
                      Elevation area: <strong>{elev.toLocaleString('en-IN')}</strong> sqft
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="glabel">Scope</p>
            <div className="ecard">
              <div className="chips">
                {SCOPE.map((s) => (
                  <span
                    key={s.l}
                    className={`chip ${scope.has(s.l) ? 'on' : ''} ${s.lock ? 'lock' : ''}`}
                    title={s.lock ? 'Always included' : undefined}
                    onClick={() => !s.lock && toggleSet(scope, s.l, setScope)}
                  >
                    <span className="cdot" />
                    {s.l}
                    {s.lock && lockIcon}
                  </span>
                ))}
              </div>
            </div>

            <p className="glabel">Deliverables</p>
            <div className="ecard">
              <div className="chips">
                {DELIV.map((d) => (
                  <span
                    key={d.l}
                    className={`chip ${deliv.has(d.l) ? 'on' : ''} ${d.lock ? 'lock' : ''}`}
                    title={d.lock ? 'Always included' : undefined}
                    onClick={() => !d.lock && toggleSet(deliv, d.l, setDeliv)}
                  >
                    <span className="cdot" />
                    {d.l}
                    {d.lock && lockIcon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* quote column */}
          <div>
            <div className="qwrap !static">
              <p className="glabel">Estimated total</p>
              <div className="q">
                <div className="qtot">{fmt(q.total)}</div>
                <div className="qgst">Inclusive of 18% GST</div>
                <div className="qsep" />
                <div className="qd">
                  <div className="qd-lab">Project type</div>
                  <div className="qd-val">{q.type.label}</div>
                </div>
                <div className="qd">
                  <div className="qd-lab">Spaces & area</div>
                  <div>
                    {q.spaces.length ? (
                      <>
                        {q.spaces.map((s) => (
                          <div className="qsl" key={s[0]}>
                            <span className="l2">{s[0]}</span>
                            <span className="v2">{sqft(s[1])}</span>
                          </div>
                        ))}
                        <div className="qsl subtot">
                          <span className="l2">Total area</span>
                          <span className="v2">{sqft(q.area)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="qd-val">No spaces selected</div>
                    )}
                  </div>
                </div>
                <div className="qd">
                  <div className="qd-lab">Scope</div>
                  <div className="qd-val">{q.sc.length ? q.sc.join(', ') : 'None selected'}</div>
                </div>
                <div className="qd">
                  <div className="qd-lab">Deliverables</div>
                  <div className="qd-val">{q.dl.length ? q.dl.join(', ') : 'None selected'}</div>
                </div>
                <div className="qsep" />
                <div className="qrow">
                  <span className="l">Base unit</span>
                  <span className="v">₹{Math.round(q.unit)}/sqft</span>
                </div>
                <div className="qrow">
                  <span className="l">Base total</span>
                  <span className="v">{fmt(q.base)}</span>
                </div>
                <div className="qrow">
                  <span className="l">Outstation allowance</span>
                  <span className="v">{fmt(q.allow)}</span>
                </div>
                <div className="qrow">
                  <span className="l">GST (18%)</span>
                  <span className="v">{fmt(q.gst)}</span>
                </div>
                <button className="btn btn-primary btn-block mt-4" onClick={bookProject}>
                  Book this project
                </button>
                <div className="qnote">Indicative placeholder pricing</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-[60px]">
          <p className="glabel ml-[3px]">Try it yourself</p>
          <div className="ecard block p-[15px] px-4">
            <p className="res">
              Explore a sample <a onClick={() => toast('Demo link — sample 360° model')}>360° virtual model</a>,{' '}
              <a onClick={() => toast('Demo link — sample DWG')}>2D drawings (DWG)</a> and{' '}
              <a onClick={() => toast('Demo link — sample SketchUp')}>3D model (SketchUp)</a>. To view the 360° model
              with live measurement, download <a onClick={() => toast('Demo link — Leica TruView')}>Leica’s TruView</a>.
            </p>
          </div>
          <p className="glabel ml-[3px]">Terms & conditions</p>
          <div className="ecard block">
            {TERMS.map((t, i) => (
              <div key={t.h} className={`acc ${openTerms.has(i) ? 'open' : ''}`}>
                <div
                  className="acc-h"
                  onClick={() => {
                    const next = new Set(openTerms)
                    next.has(i) ? next.delete(i) : next.add(i)
                    setOpenTerms(next)
                  }}
                >
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
      </div>
    </aside>
  )
}
