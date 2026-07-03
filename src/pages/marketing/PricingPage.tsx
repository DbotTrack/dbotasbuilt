import { useApp } from '../../context/AppContext'

export default function PricingPage() {
  const { openEstimator } = useApp()

  return (
    <>
      <div className="container-site page-head">
        <span className="eyebrow">Pricing</span>
        <h1>Pay for the scope you need.</h1>
        <p>
          Pricing is driven by area, project type, scope and the deliverables you choose. Get an
          instant indicative price with the estimator — your final quote is confirmed within 2
          hours.
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={openEstimator}>
            Open the estimator
          </button>
        </div>
      </div>

      <section className="section">
        <div className="container-site">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center font-semibold mb-3.5">
                1
              </div>
              <h3>50% advance</h3>
              <p>Half is payable before scanning begins, via UPI or net banking.</p>
            </div>
            <div className="feature-card">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-semibold mb-3.5">
                2
              </div>
              <h3>We scan &amp; model</h3>
              <p>We capture the site and prepare your deliverables in 5–7 days.</p>
            </div>
            <div className="feature-card">
              <div className="w-8 h-8 rounded-full bg-sage text-white flex items-center justify-center font-semibold mb-3.5">
                3
              </div>
              <h3>Balance on delivery</h3>
              <p>
                The remaining 50% is collected after delivery, adjusted to the final scanned area.
              </p>
            </div>
          </div>
          <div className="cta-band" style={{ marginTop: '40px' }}>
            <div>
              <h2>Not sure what it'll cost?</h2>
              <p>Configure your project and see a price in under a minute.</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={openEstimator}>
              Try the estimator
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
