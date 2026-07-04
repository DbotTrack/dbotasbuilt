import { useToast } from '../../context/ToastContext'

export default function ContactPage() {
  const { toast } = useToast()

  return (
    <>
      <div className="container-site page-head">
        <span className="eyebrow">Contact</span>
        <h1>Let's talk about your project.</h1>
      </div>

      <section className="section">
        <div className="container-site contact-grid">
          <div className="contact-info">
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
            <div className="ci-row" style={{ border: 'none' }}>
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
              <textarea
                className="input"
                rows={4}
                placeholder="Tell us about the space, location and timeline."
              />
            </div>
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={() =>
                toast("Thanks — this is a demo form. We'd be in touch within a few hours.")
              }
            >
              Send enquiry
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
