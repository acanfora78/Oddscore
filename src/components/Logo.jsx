export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 text-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.7)]"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 9.5 21.6 12.75v6.5L16 22.5l-5.6-3.25v-6.5z" strokeWidth="1.4" strokeLinejoin="round" opacity="0.8" />
        <circle cx="16" cy="16" r="1.9" fill="currentColor" stroke="none" />
      </svg>
      <span className="font-mono text-lg font-bold tracking-tight text-cyan">OddsCore</span>
    </span>
  )
}
