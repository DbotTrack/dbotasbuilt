import { useEffect, useRef, useState } from 'react'

/**
 * Counts a number up from 0 to `target` (cubic ease-out) the first time the
 * returned ref scrolls into view. Ported from the prototype's stats counter.
 * When `target` is null the value never animates (for "5–7"-style static stats).
 */
export function useCountUp(target: number | null, durationMs = 1300) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const ran = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || target == null) return

    const run = () => {
      if (ran.current) return
      ran.current = true
      let start: number | null = null
      const step = (ts: number) => {
        if (start === null) start = ts
        const p = Math.min((ts - start) / durationMs, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(Math.floor(eased * target))
        if (p < 1) requestAnimationFrame(step)
        else setValue(target)
      }
      requestAnimationFrame(step)
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run()
              obs.disconnect()
            }
          })
        },
        { threshold: 0.35 },
      )
      obs.observe(el)
      return () => obs.disconnect()
    }
    run()
  }, [target, durationMs])

  return { ref, value }
}
