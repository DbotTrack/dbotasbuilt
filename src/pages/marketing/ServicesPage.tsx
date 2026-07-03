import { useApp } from '../../context/AppContext'

export default function ServicesPage() {
  const { openEstimator } = useApp()

  return (
    <>
      <div className="container-site page-head">
        <span className="eyebrow">What we do</span>
        <h1>As-built documentation, done precisely.</h1>
        <p>
          We scan existing buildings and spaces with survey-grade LiDAR, then deliver the exact
          outputs your project needs — measured, modelled and ready to build on.
        </p>
      </div>

      <section className="section">
        <div className="container-site">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="fic">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                </svg>
              </div>
              <h3>360° walkthrough</h3>
              <p>An interactive virtual tour you can measure inside, on any Windows PC.</p>
            </div>
            <div className="feature-card">
              <div className="fic">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 9h16M9 9v11" />
                </svg>
              </div>
              <h3>2D drawings</h3>
              <p>Floor plans, ceiling plans and wall elevations in DWG, true to site.</p>
            </div>
            <div className="feature-card">
              <div className="fic">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l9 5v10l-9 5-9-5V7z" />
                  <path d="M12 12l9-5M12 12v10M12 12L3 7" />
                </svg>
              </div>
              <h3>3D model</h3>
              <p>An editable SketchUp model of the space exactly as it stands today.</p>
            </div>
            <div className="feature-card">
              <div className="fic">
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
              </div>
              <h3>Point cloud</h3>
              <p>The raw, millimetre-accurate dataset for your own workflows.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'rgba(134,152,151,0.05)' }}>
        <div className="container-site">
          <div className="sec-head center">
            <span className="eyebrow-sage">Who we serve</span>
            <h2>Built for the people who shape spaces</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Architects</h3>
              <p>Accurate as-builts for renovation, restoration and additions.</p>
            </div>
            <div className="feature-card">
              <h3>Interior designers</h3>
              <p>Exact dimensions so fit-outs land right the first time.</p>
            </div>
            <div className="feature-card">
              <h3>Developers</h3>
              <p>Reliable records across large and ageing portfolios.</p>
            </div>
            <div className="feature-card">
              <h3>Heritage &amp; venues</h3>
              <p>Documentation of buildings that can't be measured by hand.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button className="btn btn-primary btn-lg" onClick={openEstimator}>
              Get an estimate
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
