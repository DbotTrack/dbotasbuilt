import { useCountUp } from '../../../hooks/useCountUp'

interface StatDef {
  count: number
  suffix?: string
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
    count: 9,
    suffix: 'M+',
    label: 'sq ft scanned',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" />
      </svg>
    ),
  },
  {
    count: 150,
    suffix: '+',
    label: 'clients served',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    count: 40,
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
  return (
    <div className="stat" ref={ref}>
      <div className="stat-ic">{def.icon}</div>
      <div className="stat-num">
        {value.toLocaleString('en-IN')}
        {def.suffix ?? ''}
      </div>
      <div className="stat-lab">{def.label}</div>
    </div>
  )
}

/** Animated counter band — sits inside the "Why Dbot" section. */
export default function Stats() {
  return (
    <div className="stats-band">
      {STATS.map((s) => (
        <Stat key={s.label} def={s} />
      ))}
    </div>
  )
}
