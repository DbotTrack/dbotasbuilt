import { useNavigate } from 'react-router-dom'
import Pill from '../../components/common/Pill'

export default function InvoicesPage() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className="portal-h1">Invoices</h1>
      <p className="portal-greet">Your billing history with Dbot.</p>
      <div className="inv-row" onClick={() => navigate('/portal/preview-pay')}>
        <div>
          <div className="iv-amt">₹60,446</div>
          <div className="iv-meta">Westwind Residence · balance due</div>
        </div>
        <Pill state="attention">Payment due</Pill>
      </div>
      <div className="inv-row">
        <div>
          <div className="iv-amt">₹76,110</div>
          <div className="iv-meta">Velocity Auto Plant · 50% advance</div>
        </div>
        <Pill state="passive">Paid</Pill>
      </div>
      <div className="inv-row">
        <div>
          <div className="iv-amt">₹88,000</div>
          <div className="iv-meta">Anna Nagar Duplex · final</div>
        </div>
        <Pill state="passive">Paid</Pill>
      </div>
      <div className="inv-row">
        <div>
          <div className="iv-amt">₹2,000</div>
          <div className="iv-meta">The Lawn · booking token</div>
        </div>
        <Pill state="passive">Paid</Pill>
      </div>
    </>
  )
}
