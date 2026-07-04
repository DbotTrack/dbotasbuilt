import { useToast } from '../../context/ToastContext'

/** Bottom-center transient toast (rendered once at app root). */
export default function Toast() {
  const { message } = useToast()
  return (
    <div
      className={`fixed left-1/2 bottom-[92px] z-[600] bg-ink text-white px-[18px] py-3 rounded-pill text-[13.5px] font-medium shadow-xl max-w-[88vw] text-center transition-all duration-[260ms] ${
        message ? 'opacity-100 -translate-x-1/2 translate-y-0' : 'opacity-0 pointer-events-none -translate-x-1/2 translate-y-5'
      }`}
    >
      {message}
    </div>
  )
}
