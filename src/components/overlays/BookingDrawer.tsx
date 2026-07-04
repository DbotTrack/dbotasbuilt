import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TYPES = [
  'Architecture / interior',
  'Venue mapping',
  'Heritage documentation',
  'Plant & machinery',
  'Projection mapping',
]
const SCOPE = [
  { l: 'Civil & structural', lock: true },
  { l: 'Electrical' },
  { l: 'Plumbing' },
  { l: 'Interior fitouts' },
  { l: 'Finishes' },
]
const DELIV = [{ l: '360° view', lock: true }, { l: 'Point cloud' }, { l: '2D drawings' }, { l: '3D model' }]
const PAY = [
  { pm: 'UPI', ic: 'UPI', nm: 'UPI', sb: 'GPay · PhonePe · Paytm' },
  { pm: 'Card', ic: 'CARD', nm: 'Credit / Debit card', sb: 'Visa · Mastercard · RuPay' },
  { pm: 'Net banking', ic: 'NB', nm: 'Net banking', sb: '50+ banks supported' },
  { pm: 'Wallet', ic: 'W', nm: 'Wallets', sb: 'Paytm · Mobikwik · Amazon Pay' },
]
const lockIcon = (
  <svg className="w-[11px] h-[11px] text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

type Avail = 'both' | 'one' | 'full'
function dayAvail(d: number): Avail {
  return d % 6 === 0 ? 'full' : d % 4 === 0 ? 'one' : 'both'
}

export default function BookingDrawer() {
  const { overlay, closeOverlays } = useApp()
  const { toast } = useToast()
  const navigate = useNavigate()
  const open = overlay === 'booking'

  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const [projName, setProjName] = useState('Sunset Café — Anna Nagar')
  const [typeIdx, setTypeIdx] = useState(0)
  const [intOn, setIntOn] = useState(true)
  const [intArea, setIntArea] = useState(2000)
  const [openOn, setOpenOn] = useState(false)
  const [openArea, setOpenArea] = useState(800)
  const [elevOn, setElevOn] = useState(false)
  const [bld, setBld] = useState(2000)
  const [floors, setFloors] = useState(2)
  const [sides, setSides] = useState(3)
  const [scope, setScope] = useState<Set<string>>(new Set(['Civil & structural']))
  const [deliv, setDeliv] = useState<Set<string>>(new Set(['360° view', '2D drawings', '3D model']))
  const [notes, setNotes] = useState(
    'Lift access via service entry — security issues passes. Coordinate with SPOC 30 min before arrival.',
  )
  const [bkDate, setBkDate] = useState(16)
  const [bkSlot, setBkSlot] = useState<'Morning' | 'Afternoon'>('Morning')
  const [payMethod, setPayMethod] = useState('UPI')

  // reset wizard whenever it opens fresh
  useEffect(() => {
    if (open) {
      setStep(1)
      setConfirmed(false)
    }
  }, [open])

  // scroll the body to top on step change
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [step, confirmed])

  const elev = Math.max(Math.round((bld * sides) / 4), 0)
  const selectedAvail = dayAvail(bkDate)

  const spaceLabels = useMemo(() => {
    const s: string[] = []
    if (intOn) s.push(`Interior ${intArea.toLocaleString('en-IN')} sqft`)
    if (openOn) s.push(`Open area ${openArea.toLocaleString('en-IN')} sqft`)
    if (elevOn) s.push(`Exterior elevation ${elev.toLocaleString('en-IN')} sqft`)
    return s
  }, [intOn, intArea, openOn, openArea, elevOn, elev])

  const slotText = `${WD[bkDate % 7]}, ${bkDate} Jun · ${bkSlot}`
  const scopeText = SCOPE.filter((s) => scope.has(s.l)).map((s) => s.l)
  const delivText = DELIV.filter((d) => deliv.has(d.l)).map((d) => d.l)

  const toggleSet = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set)
    next.has(key) ? next.delete(key) : next.add(key)
    setter(next)
  }

  const next = () => {
    if (step < 5) setStep(step + 1)
    else setConfirmed(true)
  }
  const back = () => {
    if (step > 1) setStep(step - 1)
    else closeOverlays()
  }

  const eta = bkDate + 7
  const etaText = eta <= 30 ? `${eta} Jun` : `${eta - 30} Jul`

  // calendar cells
  const cells: React.ReactNode[] = []
  for (let i = 0; i < 1; i++) cells.push(<div key={`e${i}`} className="cal-cell empty" />)
  for (let d = 1; d <= 30; d++) {
    if (d < 14) {
      cells.push(
        <div key={d} className="cal-cell disabled">
          <span>{d}</span>
        </div>,
      )
      continue
    }
    const av = dayAvail(d)
    if (av === 'full') {
      cells.push(
        <div key={d} className="cal-cell fullday">
          <span>{d}</span>
          <span className={`availdot ld full`} />
        </div>,
      )
    } else {
      const sel = d === bkDate
      cells.push(
        <div
          key={d}
          className={`cal-cell avail ${sel ? 'sel' : ''}`}
          onClick={() => {
            setBkDate(d)
            if (dayAvail(d) === 'one') setBkSlot('Morning')
          }}
        >
          <span>{d}</span>
          <span className={`availdot ld ${av}`} />
        </div>,
      )
    }
  }

  const pmBooked = selectedAvail === 'one'

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-head">
        <span className="drawer-title">New booking</span>
        <button className="drawer-close" onClick={closeOverlays} aria-label="Close">
          ✕
        </button>
      </div>

      {!confirmed && (
        <div className="bk-prog">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`sbar ${i < step - 1 ? 'done' : ''} ${i === step - 1 ? 'current' : ''}`} />
          ))}
          <span className="snum">{step} / 5</span>
        </div>
      )}

      <div className="drawer-body" ref={bodyRef}>
        {confirmed ? (
          <div className="bk-confirmed animate-view">
            <div className="cc">
              <svg viewBox="0 0 24 24">
                <path d="M4 13l5 5L20 6" />
              </svg>
            </div>
            <h2>You're booked.</h2>
            <p>Our LiDAR team will reach your site on time. You'll get a WhatsApp confirmation shortly.</p>
            <div className="order-id">
              <div className="ol">Order ID</div>
              <div className="oi">DBT-CHN-026</div>
            </div>
            <div className="summary-strip">
              <div className="ss-item">
                <div className="ssl">Date</div>
                <div className="ssv">{bkDate} Jun</div>
              </div>
              <div className="ss-item">
                <div className="ssl">Slot</div>
                <div className="ssv">{bkSlot}</div>
              </div>
              <div className="ss-item">
                <div className="ssl">ETA delivery</div>
                <div className="ssv">{etaText}</div>
              </div>
            </div>
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={() => {
                closeOverlays()
                navigate('/portal/projects/DBT-CHN-024')
              }}
            >
              Track this project
            </button>
            <button
              className="btn btn-ghost btn-block mt-2.5"
              onClick={() => {
                closeOverlays()
                navigate('/portal')
              }}
            >
              Go to dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Step 1 */}
            {step === 1 && (
              <div className="animate-view">
                <div className="step-label">Project configuration</div>
                <h2>Tell us about your project.</h2>
                <div className="step-sub">These match the price estimator — tweak anything.</div>
                <div className="bk-sect">
                  <div className="sect-label">Project name</div>
                  <input className="input" value={projName} onChange={(e) => setProjName(e.target.value)} />
                </div>
                <div className="bk-sect">
                  <div className="sect-label">Project type</div>
                  <div className="bk-radio-card">
                    {TYPES.map((t, i) => (
                      <div key={t} className={`bk-radio ${i === typeIdx ? 'sel' : ''}`} onClick={() => setTypeIdx(i)}>
                        <span className="rc" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bk-sect">
                  <div className="sect-label">
                    Spaces to capture <span className="sect-hint">toggle what applies</span>
                  </div>
                  <div className={`bk-space ${intOn ? '' : 'off'}`}>
                    <div className="bk-space-head">
                      <div>
                        <div className="nm">Interior</div>
                        <div className="sub">Anything with a roof, incl. sitouts & balcony</div>
                      </div>
                      <div className={`bk-sw sw ${intOn ? 'on' : ''}`} onClick={() => setIntOn((v) => !v)} />
                    </div>
                    <div className="bk-space-areas">
                      <div className="bk-fld">
                        <label>Interior area (sqft)</label>
                        <input type="number" min={0} value={intArea} onChange={(e) => setIntArea(+e.target.value || 0)} />
                      </div>
                    </div>
                  </div>
                  <div className={`bk-space ${openOn ? '' : 'off'}`}>
                    <div className="bk-space-head">
                      <div>
                        <div className="nm">Open area</div>
                        <div className="sub">Without roof — terrace, setback, balcony</div>
                      </div>
                      <div className={`bk-sw sw ${openOn ? 'on' : ''}`} onClick={() => setOpenOn((v) => !v)} />
                    </div>
                    <div className="bk-space-areas">
                      <div className="bk-fld">
                        <label>Open area (sqft)</label>
                        <input type="number" min={0} value={openArea} onChange={(e) => setOpenArea(+e.target.value || 0)} />
                      </div>
                    </div>
                  </div>
                  <div className={`bk-space ${elevOn ? '' : 'off'}`}>
                    <div className="bk-space-head">
                      <div>
                        <div className="nm">Exterior elevation</div>
                        <div className="sub">Depends on site clearance</div>
                      </div>
                      <div className={`bk-sw sw ${elevOn ? 'on' : ''}`} onClick={() => setElevOn((v) => !v)} />
                    </div>
                    <div className="bk-space-areas">
                      <div className="bk-fld">
                        <label>Building (sqft)</label>
                        <input type="number" min={0} value={bld} onChange={(e) => setBld(+e.target.value || 0)} />
                      </div>
                      <div className="bk-fld">
                        <label>Floors</label>
                        <input type="number" min={0} value={floors} className="!w-[68px]" onChange={(e) => setFloors(+e.target.value || 0)} />
                      </div>
                      <div className="bk-fld">
                        <label>Sides</label>
                        <input type="number" min={0} value={sides} className="!w-[68px]" onChange={(e) => setSides(+e.target.value || 0)} />
                      </div>
                      <div className="bk-elev">
                        Elev: <b>{elev.toLocaleString('en-IN')}</b> sqft
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bk-sect">
                  <div className="sect-label">
                    Scope <span className="sect-hint">what's documented · multi-select</span>
                  </div>
                  <div className="bk-chips">
                    {SCOPE.map((s) => (
                      <span
                        key={s.l}
                        className={`chip ${scope.has(s.l) ? 'on' : ''} ${s.lock ? 'lock' : ''}`}
                        title={s.lock ? 'Always included' : undefined}
                        onClick={() => !s.lock && toggleSet(scope, s.l, setScope)}
                      >
                        {!s.lock && <span className="cdot" />}
                        {s.l}
                        {s.lock && lockIcon}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bk-sect">
                  <div className="sect-label">
                    Deliverables <span className="sect-hint">files you get · multi-select</span>
                  </div>
                  <div className="bk-chips">
                    {DELIV.map((d) => (
                      <span
                        key={d.l}
                        className={`chip ${deliv.has(d.l) ? 'on' : ''} ${d.lock ? 'lock' : ''}`}
                        title={d.lock ? 'Always included' : undefined}
                        onClick={() => !d.lock && toggleSet(deliv, d.l, setDeliv)}
                      >
                        {!d.lock && <span className="cdot" />}
                        {d.l}
                        {d.lock && lockIcon}
                      </span>
                    ))}
                  </div>
                  <div className="bk-chip-meta">360° view always included · viewable in Leica TruView</div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="animate-view">
                <div className="step-label">Site details</div>
                <h2>Where's the site?</h2>
                <div className="step-sub">We'll send our LiDAR team to this exact location.</div>
                <div className="bk-ig">
                  <label>Property name</label>
                  <input className="input" defaultValue="The Sunset Building" />
                </div>
                <div className="bk-ig">
                  <label>Pin on map</label>
                  <div className="map-field" onClick={() => toast('Demo — map picker')}>
                    <div className="pin" />
                    <div className="pin-label">2nd Ave, Anna Nagar, Chennai · tap to change</div>
                  </div>
                  <div className="detected-city">
                    <svg viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <div className="dcl">Detected city</div>
                      <div className="dcv">Chennai</div>
                    </div>
                  </div>
                </div>
                <div className="bk-ig">
                  <label>Full address</label>
                  <textarea className="input" rows={3} defaultValue="12, 2nd Avenue, Anna Nagar West, Chennai — 600040" />
                </div>
                <div className="bk-ig">
                  <label>Site SPOC name</label>
                  <input className="input" defaultValue="Karthik R." />
                </div>
                <div className="bk-ig">
                  <label>Site SPOC number</label>
                  <div className="bk-prefix">
                    <span className="pfx">+91</span>
                    <input type="tel" maxLength={10} defaultValue="9842156703" />
                  </div>
                </div>
                <div className="bk-ig">
                  <label>
                    Site notes for our team <span className="opt">· optional</span>
                  </label>
                  <textarea
                    className="input"
                    rows={3}
                    maxLength={500}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="char-meta">
                    <span>{notes.length}</span> / 500
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="animate-view">
                <div className="step-label">Pick a slot</div>
                <h2>When should we scan?</h2>
                <div className="step-sub">Choose a date, then AM or PM. Each slot is ~4 hours.</div>
                <div className="cal">
                  <div className="bk-cal-head">
                    <span className="mn">June 2026</span>
                    <div className="nv">
                      <button onClick={() => toast('Demo — previous month')} aria-label="Previous">
                        ‹
                      </button>
                      <button onClick={() => toast('Demo — next month')} aria-label="Next">
                        ›
                      </button>
                    </div>
                  </div>
                  <div className="cal-grid">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <div key={i} className="cal-dow">
                        {d}
                      </div>
                    ))}
                    {cells}
                  </div>
                </div>
                <div className="cal-legend">
                  <span className="lg">
                    <span className="ld both" />
                    Both slots
                  </span>
                  <span className="lg">
                    <span className="ld one" />1 slot
                  </span>
                  <span className="lg">
                    <span className="ld full" />
                    Full
                  </span>
                </div>
                <div className="sect-label mt-1.5">
                  Slots for{' '}
                  <b>
                    {WD[bkDate % 7]}, {bkDate} Jun
                  </b>
                </div>
                <div className="flex gap-3 mt-2.5">
                  <div className={`slot-card ${bkSlot === 'Morning' ? 'on' : ''}`} onClick={() => setBkSlot('Morning')}>
                    <div className="sn">Morning</div>
                    <div className="stime">9:00 – 1:00</div>
                    <span className="sstatus">Available</span>
                  </div>
                  <div
                    className={`slot-card ${pmBooked ? 'booked' : bkSlot === 'Afternoon' ? 'on' : ''}`}
                    onClick={() => !pmBooked && setBkSlot('Afternoon')}
                  >
                    <div className="sn">Afternoon</div>
                    <div className="stime">2:00 – 6:00</div>
                    <span className="sstatus">{pmBooked ? 'Booked' : 'Available'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="animate-view">
                <div className="step-label">Review & lock slot</div>
                <h2>Almost there.</h2>
                <div className="step-sub">Confirm details, then pay the token to lock your slot.</div>
                <div className="bk-review">
                  <div className="rr">
                    <span className="rl">Project</span>
                    <span className="rv">{projName || '—'}</span>
                  </div>
                  <div className="rr">
                    <span className="rl">Type</span>
                    <span className="rv">{TYPES[typeIdx]}</span>
                  </div>
                  <div className="rr">
                    <span className="rl">Spaces</span>
                    <span className="rv">{spaceLabels.length ? spaceLabels.join(' · ') : 'None selected'}</span>
                  </div>
                  <div className="rr">
                    <span className="rl">Scope</span>
                    <span className="rv">{scopeText.length ? scopeText.join(' · ') : 'None'}</span>
                  </div>
                  <div className="rr">
                    <span className="rl">Deliverables</span>
                    <span className="rv">{delivText.length ? delivText.join(' · ') : 'None'}</span>
                  </div>
                  <div className="rr">
                    <span className="rl">Slot</span>
                    <span className="rv">{slotText}</span>
                  </div>
                  <div className="rr">
                    <span className="rl">Address</span>
                    <span className="rv">Anna Nagar W, Chennai</span>
                  </div>
                </div>
                <div className="bill-to">
                  <div className="bt-head flex items-center justify-between mb-2">
                    <span className="text-[11.5px] text-sage uppercase tracking-[0.05em]">Bill to</span>
                    <span className="bt-pill">Account default</span>
                  </div>
                  <div className="bt-firm">Studio Verse Architects</div>
                  <div className="bt-line">GSTIN 33AABCS1234F1Z5</div>
                  <div className="bt-line">Cathedral Rd, Chennai — 600086</div>
                  <div className="bt-link" onClick={() => toast('Demo — use different billing for this project')}>
                    Use different billing for this project
                  </div>
                </div>
                <div className="token-banner">
                  <div>
                    <div className="tb-eyebrow">Token advance</div>
                    <div className="tb-amt">₹2,000</div>
                    <div className="tb-sub">Flat · incl. GST · locks your slot</div>
                  </div>
                  <div className="tb-ic">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                </div>
                <div className="disc-row">
                  <span className="dd" />
                  <span>
                    <b>Final quote within 2 hours</b>, confirmed by our team based on type, area & outputs.
                  </span>
                </div>
                <div className="disc-row">
                  <span className="dd" />
                  <span>
                    <b>Files release after full payment</b> — you'll see a preview before paying the balance.
                  </span>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="animate-view">
                <div className="step-label">Secure checkout</div>
                <h2>Pay token to lock slot</h2>
                <div className="step-sub">Refundable up to 24 hours before your slot.</div>
                <div className="amount-banner">
                  <div className="abl">Token amount · flat (incl. GST)</div>
                  <div className="aba">₹2,000</div>
                  <div className="abs">Balance confirmed within 2 hours · payable after preview</div>
                </div>
                <div>
                  {PAY.map((p) => (
                    <div key={p.pm} className={`pay-method ${payMethod === p.pm ? 'sel' : ''}`} onClick={() => setPayMethod(p.pm)}>
                      <div className="pm-ic">{p.ic}</div>
                      <div>
                        <div className="pm-nm">{p.nm}</div>
                        <div className="pm-sb">{p.sb}</div>
                      </div>
                      <span className="pm-rd" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!confirmed && (
        <div className="drawer-foot">
          <button className="btn btn-ghost" onClick={back}>
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button className="btn btn-primary flex-1" onClick={next}>
            {step === 5 ? 'Pay ₹2,000 token' : 'Continue'}
          </button>
        </div>
      )}
    </aside>
  )
}
