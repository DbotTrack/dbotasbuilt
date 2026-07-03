import { useMemo } from 'react'

const COLORS = ['#ff8f1f', '#4a304d', '#869897']

/**
 * Seeded point-cloud thumbnail used on work cards, category tiles and the
 * preview screen. Ported from the prototype's buildThumbs() — same LCG so a
 * given data-seed always yields the same picture.
 */
export default function VizThumb({
  seed = 1,
  width = 320,
  height = 200,
  className = '',
}: {
  seed?: number
  width?: number
  height?: number
  className?: string
}) {
  const { edges, dots } = useMemo(() => {
    let s = seed * 7 + 13
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    const W = width,
      H = height
    const cx = W / 2,
      cy = H / 2
    const p: [number, number][] = [
      [cx - W * 0.22, cy + H * 0.18],
      [cx, cy + H * 0.27],
      [cx + W * 0.22, cy + H * 0.18],
      [cx + W * 0.22, cy - H * 0.05],
      [cx, cy - H * 0.15],
      [cx - W * 0.22, cy - H * 0.05],
    ]
    const pairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [0, 5],
      [4, 5],
      [4, 3],
    ]
    const edges = pairs.map(([a, b]) => ({ a: p[a], b: p[b] }))

    const dots = Array.from({ length: 78 }, () => ({
      cx: +(cx + (rnd() - 0.5) * W * 0.72).toFixed(1),
      cy: +(cy + (rnd() - 0.5) * H * 0.72).toFixed(1),
      r: +(rnd() * 1.5 + 0.6).toFixed(2),
      fill: COLORS[Math.floor(rnd() * 3)],
      op: +(rnd() * 0.5 + 0.35).toFixed(2),
    }))
    return { edges, dots }
  }, [seed, width, height])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full h-full ${className}`} aria-hidden="true">
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.a[0].toFixed(1)}
          y1={e.a[1].toFixed(1)}
          x2={e.b[0].toFixed(1)}
          y2={e.b[1].toFixed(1)}
          stroke="#869897"
          strokeWidth="1"
          opacity="0.5"
          strokeLinecap="round"
        />
      ))}
      {dots.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} opacity={c.op} />
      ))}
    </svg>
  )
}
