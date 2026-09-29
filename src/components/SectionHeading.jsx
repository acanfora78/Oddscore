// Section eyebrow + two-tone title + intro paragraph.
export default function SectionHeading({ label, title, titleMuted, text, align = 'center', labelClassName = 'text-cyan', className = '' }) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-4xl text-center' : 'max-w-2xl'} ${className}`}>
      <p className={`label ${labelClassName}`}>{label}</p>
      <h2 className="heading mt-5 text-4xl sm:text-5xl lg:text-6xl">
        <span className="block">{title}</span>
        {titleMuted && <span className="block text-slate-muted">{titleMuted}</span>}
      </h2>
      {text && <p className={`mt-6 text-base leading-relaxed sm:text-lg ${centered ? 'mx-auto max-w-2xl' : ''}`}>{text}</p>}
    </div>
  )
}
