import Hero from './sections/Hero'
import Stats from './sections/Stats'
import VizThumb from '../../components/common/VizThumb'
import DbotLogo from '../../components/common/DbotLogo'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

const PAIN_POINTS = [
  'A decades-old building with no drawings anywhere.',
  'Plans that stopped matching reality three renovations ago.',
  "A new apartment that doesn't match the drawings.",
  "A heritage façade you can't afford to get wrong.",
  'A factory floor packed wall-to-wall with equipment.',
]

const SERVICES = [
  {
    title: '360° walkthrough',
    blurb: 'Stand inside the space on your screen and measure as you go.',
    alt: '360° walkthrough sample — placeholder',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: '2D drawings (DWG)',
    blurb: 'Floor plans, ceiling plans and wall elevations, as-built.',
    alt: '2D drawings sample — placeholder',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 4h16v16H4z" />
        <path d="M4 9h16M9 9v11" />
      </svg>
    ),
  },
  {
    title: '3D model (SketchUp)',
    blurb: 'An editable model of the space exactly as it stands.',
    alt: '3D model sample — placeholder',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l9 5v10l-9 5-9-5V7z" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" />
      </svg>
    ),
  },
  {
    title: 'Point cloud',
    blurb: 'The raw, millimetre-accurate scan data to build from.',
    alt: 'Point cloud sample — placeholder',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="6" cy="7" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="18" cy="8" r="1" />
        <circle cx="8" cy="13" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="6" cy="18" r="1" />
        <circle cx="13" cy="18" r="1" />
        <circle cx="19" cy="16" r="1" />
      </svg>
    ),
  },
]

const CATEGORIES = [
  { title: 'Architecture & interior', blurb: 'Apartments, Villas, Offices, Showrooms, etc.', seed: 4 },
  { title: 'Venue mapping', blurb: 'Ballrooms, Lawns, Destination venues, etc.', seed: 9 },
  { title: 'Heritage documentation', blurb: 'Historic Buildings, Monuments, etc.', seed: 14 },
  { title: 'Plant & machinery', blurb: 'Factories, utilities and equipment.', seed: 19 },
  { title: 'Projection mapping', blurb: 'Accurate surfaces for projection art.', seed: 25 },
]

const PROCESS = [
  {
    n: 1,
    title: 'Pay a token & Book',
    blurb: 'Sign in, configure your scope, and pay a small token to lock a slot.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M8 2v4M16 2v4M3 10h18M5 6h14v14H5z" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
  {
    n: 2,
    title: 'We scan on-site',
    blurb: 'Our team strategically captures the whole space with LiDAR.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    n: 3,
    title: 'We model it',
    blurb: 'We turn the scanned data into your chosen deliverables.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l9 5v10l-9 5-9-5V7z" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" />
      </svg>
    ),
  },
  {
    n: 4,
    title: 'Preview, Pay & Download',
    blurb: 'Approve the preview, pay the balance, and download your files.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
  },
]

const WHY = [
  {
    title: 'Survey-grade, not guesswork',
    blurb: 'Millimetre-accurate LiDAR you can build on with confidence.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      </svg>
    ),
  },
  {
    title: 'One capture, every output',
    blurb: '360°, 2D, 3D and point cloud from a single visit.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: 'Billed to what we scan',
    blurb: 'You pay for the area actually captured, adjusted to the final scope.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Files that fit your workflow',
    blurb: 'Ready to use workable 2D Drawings and 3D Models',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'Timelines & tracking',
    blurb: 'Know your ETAs upfront and track projects seamlessly.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
]

const PRICING_STEPS = [
  {
    n: '1',
    title: 'What you pay for',
    blurb:
      'Priced on area (sq ft) × your scope and chosen deliverables, plus an outstation allowance beyond Chennai. GST included.',
  },
  {
    n: '2',
    title: 'Token now, balance on delivery',
    blurb:
      'A small token locks your slot; the balance — adjusted to the area we actually scan — is due just before we hand over your files.',
  },
  {
    n: '3',
    title: 'Know the price upfront',
    blurb: 'See an indicative price in seconds with the estimator; our team confirms the final quote.',
  },
]

export default function HomePage() {
  const { bookProject, openEstimator, scrollToSection } = useApp()
  const { toast } = useToast()

  return (
    <div>
      <Hero />

      {/* Who we are */}
      <section className="section" id="sec-about">
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow">Who we are</span>
            <h2>Measuring the built world.</h2>
          </div>
          <div className="about-split">
            <ul className="about-list">
              {PAIN_POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="about-body">
              <p>
                We've walked into every one of them. So whatever state your space is in, you don't have to figure it out
                alone — <strong>we've been there, and we've got you.</strong> Show us the site, and we'll hand back an
                accurate digital replica in <strong>2D and 3D</strong> — precise enough to design, cost and build from
                with total confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section-tight" id="sec-services" style={{ background: 'rgba(134,152,151,0.05)' }}>
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow eyebrow-sage">What we do</span>
            <h2>One scan. Every deliverable you need.</h2>
            <p>
              We capture the space once, with survey-grade LiDAR — then give you exactly the outputs your project runs
              on.
            </p>
          </div>
          <div className="feature-grid">
            {SERVICES.map((f) => (
              <div className="output-card" key={f.title}>
                <div className="fc-shot" role="img" aria-label={f.alt}>
                  {f.icon}
                </div>
                <div className="fc-body">
                  <h3>{f.title}</h3>
                  <p>{f.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we handle */}
      <section className="section" id="sec-types">
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow">What we handle</span>
            <h2>From a flat to a factory</h2>
            <p>Whatever the space, we capture it precisely.</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <div className="cat-card" key={c.title} onClick={bookProject}>
                <div className="cat-thumb">
                  <VizThumb seed={c.seed} width={320} height={200} />
                </div>
                <div className="cat-body">
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                </div>
                <div className="cat-hover">
                  <span>Book your project →</span>
                </div>
              </div>
            ))}
            <div className="cat-card cat-cta" onClick={() => scrollToSection('contact')}>
              <div className="cat-cta-inner">
                <h3>Something else?</h3>
                <p>Tell us about your space →</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="sec-how">
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow">How it works</span>
            <h2>From booking to files in four steps</h2>
            <p>A simple, guided process from your first click to final download.</p>
          </div>
          <div className="process">
            {PROCESS.map((s) => (
              <div className="proc-step" key={s.n}>
                <div className="proc-ico">
                  {s.icon}
                  <span className="proc-num">{s.n}</span>
                </div>
                <div className="proc-body">
                  <h3>{s.title}</h3>
                  <p>{s.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-tight" id="sec-why" style={{ background: 'rgba(134,152,151,0.05)' }}>
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow eyebrow-sage">Why Dbot</span>
            <h2>Why teams choose us</h2>
          </div>
          <div className="reason-grid">
            {WHY.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="fic">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.blurb}</p>
              </div>
            ))}
          </div>
          <Stats />
        </div>
      </section>

      {/* Pricing */}
      <section className="section-tight" id="sec-pricing">
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow">Pricing</span>
            <h2>Transparent pricing, no surprises</h2>
            <p>Priced on what we actually scan — see it upfront, with no hidden extras.</p>
          </div>
          <div className="steps-grid">
            {PRICING_STEPS.map((s) => (
              <div className="step-card" key={s.title}>
                <div className="snum">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-[34px]">
            <button className="btn btn-primary btn-lg" onClick={openEstimator}>
              Open the price estimator
            </button>
          </div>
        </div>
      </section>

      {/* App banner */}
      <section className="section-tight" id="sec-app">
        <div className="container-site">
          <div className="app-banner">
            <div className="app-banner-icon">
              <DbotLogo variant="profile-setup" iconOnly />
            </div>
            <div className="app-banner-copy">
              <h2>Dbot in your pocket</h2>
              <p>Download our mobile app to track projects, approve previews and pay — on the go.</p>
            </div>
            <div className="flex gap-3 flex-wrap max-[640px]:w-full">
              <button className="store-btn max-[640px]:flex-1 max-[640px]:justify-center" onClick={() => toast('Demo — App Store link')}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.4 12.6c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.5 2 1 0 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6 1 0 1.7-1 2.4-2 .5-.7.7-1.4.7-1.4s-1.9-.7-1.9-2.6zM14.5 6.2c.5-.7.9-1.6.8-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.5 2.4-1.2z" />
                </svg>
                <span>
                  <small>Download on the</small>App Store
                </span>
              </button>
              <button className="store-btn max-[640px]:flex-1 max-[640px]:justify-center" onClick={() => toast('Demo — Google Play link')}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 3l11 9-11 9z" />
                </svg>
                <span>
                  <small>Get it on</small>Google Play
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="sec-contact">
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow">Talk to us</span>
            <h2>Let's scope your project</h2>
          </div>
          <div className="contact-grid">
            <div>
              <div className="ci-row">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <div>
                  <div className="l">Phone</div>
                  <div className="v">+91 93635 20220</div>
                </div>
              </div>
              <div className="ci-row">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 6l8 6 8-6" />
                </svg>
                <div>
                  <div className="l">Email</div>
                  <div className="v">service@dbot.co.in</div>
                </div>
              </div>
              <div className="ci-row border-none">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <div>
                  <div className="l">Hours</div>
                  <div className="v">Mon–Sat · 9:30am – 6:30pm</div>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  toast('Thanks — this is a demo form. Our team will be in touch.')
                }}
              >
                <div className="field">
                  <label>Your name</label>
                  <input className="input" placeholder="e.g. Aarav Sharma" required />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input className="input" type="email" placeholder="you@studio.com" required />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input className="input" type="tel" placeholder="+91" required />
                </div>
                <div className="field">
                  <label>What do you need scanned?</label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Tell us about the space, location and timeline."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  Send enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-tight">
        <div className="container-site">
          <div className="cta-band">
            <div>
              <h2>Ready to scan your space?</h2>
              <p>Book a project and lock a slot in minutes.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="btn btn-primary btn-lg" onClick={bookProject}>
                Book a project
              </button>
              <button className="btn btn-ghost btn-lg" onClick={openEstimator}>
                Get a price estimate
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
