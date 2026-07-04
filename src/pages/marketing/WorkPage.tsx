import VizThumb from '../../components/common/VizThumb'

export default function WorkPage() {
  return (
    <>
      <div className="container-site page-head">
        <span className="eyebrow">Our work</span>
        <h1>1,000+ spaces, captured.</h1>
        <p>
          A sample of recent scans across homes, plants, heritage buildings and venues.
          (Placeholder visuals — swap in real project imagery later.)
        </p>
      </div>

      <section className="section">
        <div className="container-site">
          <div className="work-grid">
            <div className="work-card">
              <div className="work-thumb">
                <VizThumb seed={2} width={320} height={240} />
              </div>
              <div className="work-body">
                <div className="wtag">Plant &amp; machinery</div>
                <h3>Velocity Auto Plant</h3>
                <p>15,000 sqft · Chennai</p>
              </div>
            </div>
            <div className="work-card">
              <div className="work-thumb">
                <VizThumb seed={5} width={320} height={240} />
              </div>
              <div className="work-body">
                <div className="wtag">Heritage</div>
                <h3>Chettinad Villa</h3>
                <p>8,400 sqft · Karaikudi</p>
              </div>
            </div>
            <div className="work-card">
              <div className="work-thumb">
                <VizThumb seed={8} width={320} height={240} />
              </div>
              <div className="work-body">
                <div className="wtag">Residential</div>
                <h3>Westwind Residence</h3>
                <p>6,200 sqft · ECR</p>
              </div>
            </div>
            <div className="work-card">
              <div className="work-thumb">
                <VizThumb seed={13} width={320} height={240} />
              </div>
              <div className="work-body">
                <div className="wtag">Venue mapping</div>
                <h3>The Lawn</h3>
                <p>5,800 sqft · Chennai</p>
              </div>
            </div>
            <div className="work-card">
              <div className="work-thumb">
                <VizThumb seed={17} width={320} height={240} />
              </div>
              <div className="work-body">
                <div className="wtag">Commercial</div>
                <h3>OMR Office Fitout</h3>
                <p>12,000 sqft · Chennai</p>
              </div>
            </div>
            <div className="work-card">
              <div className="work-thumb">
                <VizThumb seed={21} width={320} height={240} />
              </div>
              <div className="work-body">
                <div className="wtag">Residential</div>
                <h3>Anna Nagar Duplex</h3>
                <p>4,100 sqft · Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
