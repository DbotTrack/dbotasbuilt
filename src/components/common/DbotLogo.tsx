interface DbotLogoProps {
  /** size variant maps to the .dbot-logo--* classes */
  variant?: 'nav' | 'footer' | 'sidebar' | 'profile-setup'
  /** hide the "bot" wordmark (icon only) */
  iconOnly?: boolean
  /** append the orange "asbuilt" wordmark — the full marketing-nav lockup */
  withAsbuilt?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Brand lockup: the PNG "d" icon + the Comfortaa "bot" wordmark, optionally
 * followed by the orange "asbuilt" wordmark.
 * Styling (icon data-URI, sizes) lives in index.css under .dbot-logo.
 */
export default function DbotLogo({
  variant = 'nav',
  iconOnly = false,
  withAsbuilt = false,
  onClick,
  className = '',
}: DbotLogoProps) {
  return (
    <span
      className={`dbot-logo dbot-logo--${variant} ${className}`}
      aria-label={withAsbuilt ? 'dbot asbuilt' : 'dbot'}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <span className="dl-icon" />
      {!iconOnly && <span className="dl-wordmark">bot</span>}
      {!iconOnly && withAsbuilt && <span className="dl-wordmark dl-asbuilt">asbuilt</span>}
    </span>
  )
}
