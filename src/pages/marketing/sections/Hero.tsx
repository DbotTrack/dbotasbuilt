import PointCloudRoom from '../../../components/common/PointCloudRoom'
import { useApp } from '../../../context/AppContext'

export default function Hero() {
  const { bookProject, openEstimator, logIn, scrollToSection, signedIn } = useApp()
  return (
    <section className="pt-16 pb-14 max-[600px]:py-10" id="sec-top">
      <div className="container-site grid grid-cols-1 min-[601px]:grid-cols-[1.05fr_0.95fr] gap-9 min-[601px]:gap-12 items-center">
        <div>
          <span className="eyebrow inline-flex items-center gap-2 mb-5">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" /> LiDAR 3D scanning
          </span>
          <h1 className="font-display font-semibold tracking-[-0.025em] leading-[1.04] text-ink text-[clamp(34px,5vw,56px)]">
            Your building,
            <br />
            captured to the <span className="text-orange">millimetre</span>.
          </h1>
          <p className="text-[clamp(16px,1.6vw,19px)] text-ink-2 mt-[22px] max-w-[30em] leading-[1.55]">
            Precise LiDAR scans of any space — turned into 360° walkthroughs, 2D drawings and 3D models. Built for
            architects, interior designers and developers.
          </p>
          <div className="flex gap-3 mt-8 flex-wrap">
            <button className="btn btn-primary btn-lg" onClick={bookProject}>
              Book a project
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <button className="btn btn-ghost btn-lg" onClick={openEstimator}>
              Get a price estimate
            </button>
          </div>
          <div className="mt-[18px] text-[14px] text-ink-3">
            {!signedIn && (
              <>
                Already a client?{' '}
                <a onClick={logIn} className="text-orange-deep cursor-pointer font-medium">
                  Log in
                </a>{' '}
                ·{' '}
              </>
            )}
            <a onClick={() => scrollToSection('contact')} className="text-orange-deep cursor-pointer font-medium">
              Talk to us
            </a>
          </div>
        </div>
        <div className="relative aspect-[1/0.92]">
          <div className="absolute inset-0 border border-grey-1 rounded-xl shadow-xl overflow-hidden bg-[linear-gradient(160deg,#fff,#faf8f6)]">
            <PointCloudRoom />
            <div className="viz-scan" aria-hidden="true" />
          </div>
          <span className="absolute left-[18px] bottom-[18px] z-[3] inline-flex items-center gap-2 bg-white/[0.92] border border-grey-1 rounded-pill px-[13px] py-[7px] text-[12px] font-semibold text-ink-2 shadow-md">
            <span className="w-[7px] h-[7px] rounded-full bg-orange shadow-[0_0_0_4px_rgba(255,143,31,0.18)]" /> Scanning ·
            point cloud
          </span>
          <span className="absolute right-[18px] top-[18px] z-[3] inline-flex items-center gap-2 bg-white/[0.92] border border-grey-1 rounded-pill px-[13px] py-[7px] text-[12px] font-semibold text-ink-2 shadow-md">
            ±10mm <span className="text-purple">accuracy</span>
          </span>
        </div>
      </div>
    </section>
  )
}
