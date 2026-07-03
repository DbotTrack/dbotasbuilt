interface DbotLogoProps {
  /** size variant maps to the .dbot-logo--* classes */
  variant?: 'nav' | 'footer' | 'sidebar' | 'profile-setup'
  /** hide the "bot" wordmark (icon only) */
  iconOnly?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Brand lockup: the PNG "d" icon + the Comfortaa "bot" wordmark.
 * Styling (icon data-URI, sizes) lives in index.css under .dbot-logo.
 */
export default function DbotLogo({ variant = 'nav', iconOnly = false, onClick, className = '' }: DbotLogoProps) {
  return (
    <span
      className={`dbot-logo dbot-logo--${variant} ${className}`}
      aria-label="dbot"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <span className="dl-icon" />
      {!iconOnly && <span className="dl-wordmark">bot</span>}
    </span>
  )
}
