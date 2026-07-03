import { useNavigate } from 'react-router-dom'
import Pill from '../../components/common/Pill'

export default function ProjectsPage() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="portal-h1">Projects</h1>
      <p className="portal-greet">All your scans, past and present.</p>
      <div className="flex gap-2 mb-[18px] flex-wrap">
        <Pill state="attention">All</Pill>
        <Pill state="passive" className="cursor-pointer">
          Active
        </Pill>
        <Pill state="passive" className="cursor-pointer">
          Delivered
        </Pill>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-023</div>
            <div className="pj-name">Westwind Residence</div>
          </div>
          <span className="pill pill-attention">Preview ready</span>
        </div>
        <div className="pj-bottom">
          <span>6,200 sqft</span>
          <span>Residential · ECR</span>
        </div>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-024</div>
            <div className="pj-name">Velocity Auto Plant</div>
          </div>
          <span className="pill pill-progress">Modelling</span>
        </div>
        <div className="pj-bottom">
          <span>15,000 sqft</span>
          <span>Plant &amp; machinery</span>
        </div>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-025</div>
            <div className="pj-name">The Lawn Wedding Venue</div>
          </div>
          <span className="pill pill-progress">Site visit</span>
        </div>
        <div className="pj-bottom">
          <span>5,800 sqft</span>
          <span>Venue mapping</span>
        </div>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/projects/DBT-CHN-024')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-018</div>
            <div className="pj-name">Anna Nagar Duplex</div>
          </div>
          <span className="pill pill-passive">Delivered</span>
        </div>
        <div className="pj-bottom">
          <span>4,100 sqft</span>
          <span>Residential · delivered 2 Jun</span>
        </div>
      </div>
      <div className="pj-card" onClick={() => navigate('/portal/files/expired')}>
        <div className="pj-top">
          <div>
            <div className="pj-id">DBT-CHN-012</div>
            <div className="pj-name">OMR Office Fitout</div>
          </div>
          <span className="pill pill-passive">Files expired</span>
        </div>
        <div className="pj-bottom">
          <span>12,000 sqft</span>
          <span>Commercial · delivered Mar</span>
        </div>
      </div>
    </>
  )
}
