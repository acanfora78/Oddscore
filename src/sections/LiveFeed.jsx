import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'

const STATS = [
  { key: 'latency', prefix: '< ', to: 2, suffix: ' ms' },
  { key: 'uptime', to: 99.99, decimals: 2, suffix: ' %' },
  { key: 'sources', to: 200, suffix: ' +' },
  { key: 'events', to: 48000 },
]

function Counter({ to, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setValue })
    return () => controls.stop()
  }, [inView, to])

  const formatted = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix && <span className="text-cyan/70">{suffix}</span>}
    </span>
  )
}

const R = 150
const PARALLELS = [-0.75, -0.45, -0.15, 0.15, 0.45, 0.75]
const MERIDIANS = 6
const ARCS = [
  { d: 'M70 150 Q140 40 250 110', dur: '3.2s' },
  { d: 'M110 230 Q200 120 280 200', dur: '4s' },
  { d: 'M60 120 Q170 170 230 60', dur: '3.6s' },
  { d: 'M150 60 Q260 130 200 250', dur: '4.4s' },
]

function Globe() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="globe-fill" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0d1330" stopOpacity="0" />
        </radialGradient>
        <filter id="arc-glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(10 10)" fill="none" stroke="#00d4ff" strokeOpacity="0.28" strokeWidth="0.8">
        <circle cx={R} cy={R} r={R} fill="url(#globe-fill)" strokeOpacity="0.5" />
        {PARALLELS.map((p) => (
          <ellipse key={p} cx={R} cy={R + p * R} rx={R * Math.sqrt(1 - p * p)} ry={R * Math.sqrt(1 - p * p) * 0.18} />
        ))}
        {/* meridians breathing in and out give a slow-rotation illusion */}
        {Array.from({ length: MERIDIANS }, (_, i) => (
          <ellipse key={i} cx={R} cy={R} rx={R} ry={R}>
            <animate attributeName="rx" values={`${R};0;${R}`} dur="12s" begin={`${(-12 / MERIDIANS) * i}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </g>
      <g transform="translate(10 10)" filter="url(#arc-glow)">
        {ARCS.map((a) => (
          <g key={a.d}>
            <path d={a.d} fill="none" stroke="#00d4ff" strokeOpacity="0.15" strokeWidth="1" />
            <path d={a.d} fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="40 260">
              <animate attributeName="stroke-dashoffset" from="300" to="0" dur={a.dur} repeatCount="indefinite" />
            </path>
            <circle r="2.6" fill="#00d4ff">
              <animateMotion dur={a.dur} repeatCount="indefinite" path={a.d} />
            </circle>
          </g>
        ))}
      </g>
    </svg>
  )
}

export default function LiveFeed() {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden">
      <Section id="live-feed" className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            label={t('liveFeed.label')}
            title={t('liveFeed.title')}
            titleMuted={t('liveFeed.titleMuted')}
            text={t('liveFeed.text')}
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.key} className="card p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">{t(`liveFeed.stats.${s.key}`)}</p>
                <p className="mt-3 font-mono text-2xl font-bold text-cyan sm:text-4xl">
                  <Counter {...s} />
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative -mb-40 h-[340px] sm:h-[480px] lg:-mb-0 lg:h-[640px] lg:translate-x-1/4 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:[mask-image:linear-gradient(to_right,black_60%,transparent)]">
          <Globe />
        </div>
      </Section>
    </div>
  )
}
