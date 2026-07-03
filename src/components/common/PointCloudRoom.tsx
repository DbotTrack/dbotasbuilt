import { useMemo } from 'react'

const SAGE = '#869897'
const COLORS = ['#ff8f1f', '#4a304d', '#869897']
const WEIGHTS = [0.5, 0.22, 0.28]

/** Simple LCG so the hero looks lively but stays stable within a render. */
function makeRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

type Pt = [number, number]

interface Line {
  p1: Pt
  p2: Pt
  sw: number
  op: number
}
interface Dot {
  cx: number
  cy: number
  r: number
  fill: string
  op: number
}

/**
 * On-brand isometric wireframe "room" + point cloud, drawn in code.
 * Ported from the prototype's buildHeroViz(); seeded so it renders once.
 */
export default function PointCloudRoom({ seed = 7 }: { seed?: number }) {
  const { lines, floor, dots } = useMemo(() => {
    const rng = makeRng(seed * 31 + 5)
    const cx = 200,
      cy = 196,
      w = 96,
      d = 58,
      h = 116
    const iso = (sx: number, sy: number, sz: number): Pt => [cx + (sx - sy), cy + (sx + sy) * 0.5 - sz]

    const B = {
      fb: iso(0, w, 0),
      fl: iso(-d, 0, 0),
      fr: iso(w, 0, 0),
      bk: iso(w - d, w, 0),
      Fb: iso(0, w, h),
      Fl: iso(-d, 0, h),
      Fr: iso(w, 0, h),
      Bk: iso(w - d, w, h),
    }

    const lines: Line[] = [
      { p1: B.fl, p2: B.bk, sw: 1, op: 0.28 },
      { p1: B.fr, p2: B.bk, sw: 1, op: 0.28 },
      { p1: B.bk, p2: B.Bk, sw: 1, op: 0.28 },
      { p1: B.fb, p2: B.fl, sw: 1.4, op: 0.85 },
      { p1: B.fb, p2: B.fr, sw: 1.4, op: 0.85 },
      { p1: B.fb, p2: B.Fb, sw: 1.4, op: 0.85 },
      { p1: B.fl, p2: B.Fl, sw: 1.4, op: 0.7 },
      { p1: B.fr, p2: B.Fr, sw: 1.4, op: 0.7 },
      { p1: B.Fb, p2: B.Fl, sw: 1.4, op: 0.8 },
      { p1: B.Fb, p2: B.Fr, sw: 1.4, op: 0.8 },
      { p1: B.Fl, p2: B.Bk, sw: 1, op: 0.45 },
      { p1: B.Fr, p2: B.Bk, sw: 1, op: 0.45 },
    ]

    const floor = [B.fb, B.fl, B.bk, B.fr].map((p) => p.join(',')).join(' ')

    const pick = () => {
      const r = rng()
      let a = 0
      for (let i = 0; i < COLORS.length; i++) {
        a += WEIGHTS[i]
        if (r <= a) return COLORS[i]
      }
      return COLORS[0]
    }

    const dots: Dot[] = []
    for (let i = 0; i < 150; i++) {
      const sx = rng() * (w + d) - d
      const sy = rng() * w
      const sz = rng() * h
      const p = iso(sx, sy, sz)
      const jitter = (rng() - 0.5) * 10
      dots.push({
        cx: +(p[0] + jitter).toFixed(1),
        cy: +(p[1] + (rng() - 0.5) * 6).toFixed(1),
        r: +(rng() * 1.6 + 0.7).toFixed(2),
        fill: pick(),
        op: +(rng() * 0.5 + 0.35).toFixed(2),
      })
    }
    for (let k = 0; k < 5; k++) {
      const pp = iso(rng() * w, rng() * w, rng() * h)
      dots.push({ cx: +pp[0].toFixed(1), cy: +pp[1].toFixed(1), r: 2.6, fill: '#ff8f1f', op: 1 })
    }

    return { lines, floor, dots }
  }, [seed])

  return (
    <svg viewBox="0 0 400 368" preserveAspectRatio="xMidYMid meet" aria-label="Point-cloud scan of a room" className="w-full h-full">
      <polygon points={floor} fill="rgba(134,152,151,0.07)" />
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.p1[0].toFixed(1)}
          y1={l.p1[1].toFixed(1)}
          x2={l.p2[0].toFixed(1)}
          y2={l.p2[1].toFixed(1)}
          stroke={SAGE}
          strokeWidth={l.sw}
          strokeLinecap="round"
          opacity={l.op}
        />
      ))}
      {dots.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} opacity={c.op} />
      ))}
    </svg>
  )
}
