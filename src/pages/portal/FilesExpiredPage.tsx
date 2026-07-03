import { useNavigate } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'
import Pill from '../../components/common/Pill'

export default function FilesExpiredPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  return (
    <>
      <div className="back-link" onClick={() => navigate('/portal/projects')}>
        ‹ Back to projects
      </div>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h1 className="portal-h1">OMR Office — files</h1>
        <Pill state="passive">Files expired</Pill>
      </div>
      <p className="portal-greet">These files expired on 12 Jun 2026. Request a re-share to download again.</p>
      <div className="file-row exp">
        <div className="ficn">360°</div>
        <div className="flex-1">
          <div className="fn">360° virtual model</div>
          <div className="fmeta">Expired</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Re-share requested (demo)')}>
          Request
        </button>
      </div>
      <div className="file-row exp">
        <div className="ficn">DWG</div>
        <div className="flex-1">
          <div className="fn">2D drawings</div>
          <div className="fmeta">Expired</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Re-share requested (demo)')}>
          Request
        </button>
      </div>
      <div className="file-row exp">
        <div className="ficn">SKP</div>
        <div className="flex-1">
          <div className="fn">3D model</div>
          <div className="fmeta">Expired</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Re-share requested (demo)')}>
          Request
        </button>
      </div>
      <div className="mt-[18px]">
        <button
          className="btn btn-primary btn-block"
          onClick={() => toast('Re-share requested for all files (demo)')}
        >
          Request re-share of all files
        </button>
      </div>
    </>
  )
}
