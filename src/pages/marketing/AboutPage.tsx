export default function AboutPage() {
  return (
    <>
      <div className="container-site page-head">
        <span className="eyebrow">About</span>
        <h1>
          A Chennai company,
          <br />
          measuring the built world.
        </h1>
        <p>
          Dbot Asbuilt was founded to fix a stubborn problem: nobody really knows the exact
          dimensions of buildings that already exist. We use LiDAR to capture spaces down to the
          millimetre, so architects, designers and developers can plan with confidence instead of
          guesswork.
        </p>
      </div>

      <section className="section">
        <div className="container-site">
          <div className="trust" style={{ border: 'none', padding: 0 }}>
            <div className="trust-inner">
              <div className="trust-item">
                <span className="n">1,000+</span>
                <span className="l">projects</span>
              </div>
              <div className="trust-sep"></div>
              <div className="trust-item">
                <span className="n">70+</span>
                <span className="l">cities</span>
              </div>
              <div className="trust-sep"></div>
              <div className="trust-item">
                <span className="n">±10mm</span>
                <span className="l">accuracy</span>
              </div>
              <div className="trust-sep"></div>
              <div className="trust-item">
                <span className="n">5–7</span>
                <span className="l">day turnaround</span>
              </div>
            </div>
          </div>
          <div className="sec-head" style={{ marginTop: '48px', maxWidth: '680px' }}>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px' }}>
              We work across architecture and interiors, venue mapping, heritage documentation,
              plant &amp; machinery and projection mapping. Every scan is delivered as a measurable
              360° model, with 2D drawings, 3D models and point clouds available on request.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
