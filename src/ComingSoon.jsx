import styles from './ComingSoon.module.css'

const features = [
  'Package Booking',
  'As-Built Documentation',
  'Site Management',
  'Progress Tracking',
]

export default function ComingSoon() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <span className={styles.logoMain}>
            DBOT<span className={styles.logoDot}>.</span>ASBUILT
          </span>
          <span className={styles.logoSub}>Construction Package Platform</span>
        </div>
        <span className={styles.badge}>Launching Soon</span>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Construction Package Booking</p>

        <h1 className={styles.heading}>
          BUILD<br />
          <span className={styles.headingAccent}>SMARTER</span>
        </h1>

        <div className={styles.dividerRow}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>Platform in development</span>
        </div>

        <p className={styles.description}>
          DBot AsBuilt is a construction package booking platform
          that streamlines how teams plan, document, and deliver
          on-site work. From package selection to as-built sign-off —
          everything in one place.
        </p>

        <div className={styles.features}>
          {features.map((f) => (
            <div key={f} className={styles.feature}>
              <div className={styles.featureDot} />
              <span className={styles.featureText}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.status}>
          <span className={styles.statusDot} />
          In development
        </span>
        <span className={styles.copy}>© 2025 DBot AsBuilt</span>
      </div>

      <div className={styles.bgText} aria-hidden="true">AB</div>
    </div>
  )
}
