import { useNavigate } from 'react-router-dom'
import VizThumb from '../../components/common/VizThumb'

export default function PreviewPayPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="back-link" onClick={() => navigate('/portal/projects')}>
        ‹ Back to projects
      </div>
      <div className="pp-hero">
        <div className="text-[13px] text-lavender">Westwind Residence · preview ready</div>
        <div className="pp-amt">₹60,446</div>
        <div className="text-[13px] text-white/[0.72] mt-1">Balance due to unlock your final files</div>
        <button className="btn btn-primary mt-[18px]" onClick={() => navigate('/portal/files/active')}>
          Pay &amp; unlock files
        </button>
      </div>
      <div className="pp-thumb">
        <VizThumb seed={8} width={320} height={180} />
      </div>
      <div className="data-card">
        <div className="data-row">
          <span className="dl">Project total</span>
          <span className="dv">₹1,20,892</span>
        </div>
        <div className="data-row">
          <span className="dl">Advance paid</span>
          <span className="dv">−₹60,446</span>
        </div>
        <div className="data-row">
          <span className="dl">Balance now</span>
          <span className="dv">₹60,446</span>
        </div>
      </div>
    </>
  )
}
