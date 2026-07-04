import { useCountUp } from '../../../hooks/useCountUp'

interface StatDef {
  count: number | null
  prefix?: string
  suffix?: string
  staticText?: string
  label: string
  icon: React.ReactNode
}

const STATS: StatDef[] = [
  {
    count: 1000,
    suffix: '+',
    label: 'projects delivered',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l9 5v8l-9 5-9-5V8z" />
        <path d="M12 12l9-5M12 12v9M12 12L3 7" />
      </svg>
    ),
  },
  {
    count: 10,
    prefix: '±',
    suffix: 'mm',
    label: 'interior accuracy',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      </svg>
    ),
  },
  {
    count: null,
    staticText: '5–7',
    label: 'days to deliver',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    count: 70,
    suffix: '+',
    label: 'cities served',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

function Stat({ def }: { def: StatDef }) {
  const { ref, value } = useCountUp(def.count)
  const text =
    def.count == null
      ? def.staticText
      : `${def.prefix ?? ''}${value.toLocaleString('en-IN')}${def.suffix ?? ''}`
  return (
    <div className="stat" ref={ref}>
      <div className="stat-ic">{def.icon}</div>
      <div className="stat-num">{text}</div>
      <div className="stat-lab">{def.label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="section" id="sec-stats">
      <div className="container-site">
        <div className="stats-band">
          {STATS.map((s) => (
            <Stat key={s.label} def={s} />
          ))}
        </div>
        <blockquote className="stats-quote">
          “We had as-built drawings of a 40-year-old building in a week — the accuracy saved us months of site visits.”
          <cite>— Principal Architect, Chennai studio</cite>
        </blockquote>
      </div>
    </section>
  )
}
