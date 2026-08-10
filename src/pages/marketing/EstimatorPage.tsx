import EstimatorPanel from '../../components/estimator/EstimatorPanel'

/**
 * Full-page estimator at /estimator — the same panel the drawer renders, but
 * two-column with a sticky quote card from 881px up.
 */
export default function EstimatorPage() {
  return (
    <div className="container-site est-page">
      <div className="est-head pt-9 pb-1.5">
        <h1>Price estimator</h1>
        <p>
          Configure your scope for an instant, indicative price. Priced on area × scope × the
          deliverables you choose — final quote confirmed by our team.
        </p>
      </div>

      <EstimatorPanel variant="page" />
    </div>
  )
}
