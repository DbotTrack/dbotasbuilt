import type { PillState } from '../../types'

const CLASS: Record<PillState, string> = {
  attention: 'pill-attention',
  progress: 'pill-progress',
  passive: 'pill-passive',
}

/** 3-state status pill (attention / progress / passive). */
export default function Pill({
  state,
  children,
  className = '',
  onClick,
}: {
  state: PillState
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <span className={`pill ${CLASS[state]} ${className}`} onClick={onClick}>
      {children}
    </span>
  )
}
