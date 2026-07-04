import Hero from './sections/Hero'
import Stats from './sections/Stats'
import VizThumb from '../../components/common/VizThumb'
import DbotLogo from '../../components/common/DbotLogo'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

const SERVICES = [
  {
    title: '360° walkthrough',
    blurb: 'Stand inside the space on your screen and measure as you go.',
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

const PROCESS = [
  {
    n: 1,
    title: 'Book & pay a token',
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
    blurb: 'Our team captures the whole space with LiDAR — usually in a day.',
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
    blurb: 'We turn the scan into your chosen deliverables, ready in 5–7 days.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l9 5v10l-9 5-9-5V7z" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" />
      </svg>
    ),
  },
  {
    n: 4,
    title: 'Preview & download',
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
    title: '±10mm accuracy',
    blurb: 'Survey-grade LiDAR you can build on with confidence.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      </svg>
    ),
  },
  {
    title: '5–7 day delivery',
    blurb: 'Most projects scanned and modelled inside a week.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'One scan, every output',
    blurb: '360°, 2D, 3D and point cloud from a single visit.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: '1,000+ projects',
    blurb: 'A track record across homes, plants, heritage and venues.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 19.6 6.9 22.6l1.2-5.6L4 13.2l5.6-.6z" />
      </svg>
    ),
  },
]

const CATEGORIES = [
  { title: 'Architecture & interior', blurb: 'Homes, offices and fit-outs, as-built.', seed: 4 },
  { title: 'Venue mapping', blurb: 'Event spaces, halls and showrooms.', seed: 9 },
  { title: 'Heritage documentation', blurb: 'Old and irreplaceable buildings.', seed: 14 },
  { title: 'Plant & machinery', blurb: 'Factories, utilities and equipment.', seed: 19 },
  { title: 'Projection mapping', blurb: 'Accurate surfaces for projection art.', seed: 25 },
]

const PRICING_STEPS = [
  { n: '1', title: '50% advance', blurb: 'Payable before scanning, via UPI or net banking.', bg: 'bg-orange' },
  { n: '2', title: 'We scan & model', blurb: 'Captured and prepared in 5–7 days.', bg: 'bg-purple' },
  { n: '3', title: 'Balance on delivery', blurb: 'Collected after delivery, adjusted to final area.', bg: 'bg-purple' },
  { n: '₹', title: 'See your price', blurb: 'Instant indicative quote in under a minute.', bg: 'bg-orange' },
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
            <h2>A Chennai company measuring the built world.</h2>
            <p>
              Dbot Asbuilt was founded to fix a stubborn problem — nobody really knows the exact dimensions of buildings
              that already exist. We capture spaces with survey-grade LiDAR, down to the millimetre, so you can plan
              with confidence instead of guesswork.
            </p>
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
              <div className="feature-card" key={f.title}>
                <div className="fic">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.blurb}</p>
              </div>
            ))}
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
          <div className="feature-grid">
            {WHY.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="fic">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.blurb}</p>
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
            <p>Whatever the space, we capture it precisely. Hover a category to book it.</p>
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
              <div>
                <h3>Something else?</h3>
                <p>Tell us about your space →</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Pricing */}
      <section className="section-tight" id="sec-pricing">
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow">Pricing</span>
            <h2>Transparent pricing, no surprises</h2>
            <p>
              Price is driven by area, project type, scope and deliverables. 50% advance to begin, balance after
              delivery — adjusted to the final scanned area.
            </p>
          </div>
          <div className="steps-grid">
            {PRICING_STEPS.map((s) => (
              <div className="step-card" key={s.title}>
                <div className={`snum ${s.bg}`}>{s.n}</div>
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
                  <div className="v">+91 44 4000 1234</div>
                </div>
              </div>
              <div className="ci-row">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 6l8 6 8-6" />
                </svg>
                <div>
                  <div className="l">Email</div>
                  <div className="v">hello@dbot.co.in</div>
                </div>
              </div>
              <div className="ci-row">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div className="l">Studio</div>
                  <div className="v">
                    No. 7, Greams Road, Thousand Lights,
                    <br />
                    Chennai 600006
                  </div>
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
              <div className="field">
                <label>Your name</label>
                <input className="input" placeholder="e.g. Aarav Sharma" />
              </div>
              <div className="field">
                <label>Phone</label>
                <input className="input" placeholder="+91" />
              </div>
              <div className="field">
                <label>What do you need scanned?</label>
                <textarea className="input" rows={4} placeholder="Tell us about the space, location and timeline." />
              </div>
              <button
                className="btn btn-primary btn-block btn-lg"
                onClick={() => toast("Thanks — this is a demo form. We'd be in touch within a few hours.")}
              >
                Send enquiry
              </button>
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
