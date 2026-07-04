import { useNavigate } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'
import Pill from '../../components/common/Pill'

export default function FilesActivePage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  return (
    <>
      <div className="back-link" onClick={() => navigate('/portal/projects')}>
        ‹ Back to projects
      </div>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h1 className="portal-h1">Westwind — files</h1>
        <Pill state="attention">Files available</Pill>
      </div>
      <p className="portal-greet">Available until 18 Sep 2026. Download anytime before then.</p>
      <div className="file-row">
        <div className="ficn">360°</div>
        <div className="flex-1">
          <div className="fn">360° virtual model</div>
          <div className="fmeta">Leica TruView · 1.2 GB</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Downloading… (demo)')}>
          Download
        </button>
      </div>
      <div className="file-row">
        <div className="ficn">DWG</div>
        <div className="flex-1">
          <div className="fn">2D drawings</div>
          <div className="fmeta">AutoCAD DWG · 24 MB</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Downloading… (demo)')}>
          Download
        </button>
      </div>
      <div className="file-row">
        <div className="ficn">SKP</div>
        <div className="flex-1">
          <div className="fn">3D model</div>
          <div className="fmeta">SketchUp · 88 MB</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Downloading… (demo)')}>
          Download
        </button>
      </div>
      <div className="file-row">
        <div className="ficn">PTS</div>
        <div className="flex-1">
          <div className="fn">Point cloud</div>
          <div className="fmeta">E57 · 3.4 GB</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast('Downloading… (demo)')}>
          Download
        </button>
      </div>
    </>
  )
}
