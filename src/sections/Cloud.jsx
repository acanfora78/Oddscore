import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import useInterval from '../hooks/useInterval'

const LINKS = [
  'M60 74 V98 H120 V123',
  'M180 74 V123',
  'M300 74 V98 H240 V123',
  'M130 181 V205 H100 V230',
  'M230 181 V205 H260 V230',
]

function Box({ x, y, w, h, title, sub, indigo }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill="rgba(10,14,25,0.9)"
        stroke={indigo ? '#6366f1' : 'rgba(0,212,255,0.45)'}
        strokeWidth={indigo ? 1.4 : 1}
        style={{ filter: `drop-shadow(0 0 8px ${indigo ? 'rgba(99,102,241,0.45)' : 'rgba(0,212,255,0.2)'})` }}
      />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 3 : -4)} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" letterSpacing="1.2">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fill="#94a3b8" fontSize="8.5" letterSpacing="0.5">
          {sub}
        </text>
      )}
    </g>
  )
}

function Diagram() {
  const { t } = useTranslation()
  return (
    <svg viewBox="0 0 360 300" className="w-full font-mono" role="img" aria-label={t('cloud.label')}>
      <g fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1">
        {LINKS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {LINKS.map((d, i) => (
        <circle key={d} r="2.6" fill="#00d4ff" style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }}>
          <animateMotion dur={`${2.2 + i * 0.35}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
      <Box x={10} y={20} w={100} h={54} title="AUTH" sub={t('cloud.diagram.auth')} />
      <Box x={130} y={20} w={100} h={54} title="CORE" sub={t('cloud.diagram.core')} />
      <Box x={250} y={20} w={100} h={54} title="CDN" sub={t('cloud.diagram.cdn')} />
      <Box x={70} y={123} w={220} h={58} title={t('cloud.diagram.db').toUpperCase()} sub={t('cloud.diagram.dbSub')} indigo />
      <Box x={40} y={230} w={120} h={54} title={t('cloud.diagram.backup').toUpperCase()} />
      <Box x={200} y={230} w={120} h={54} title={t('cloud.diagram.analytics').toUpperCase()} />
    </svg>
  )
}

const SERVICES = [
  { key: 'apiGateway', base: 12 },
  { key: 'database', base: 4 },
  { key: 'cache', base: 1 },
  { key: 'cdn', base: 18 },
  { key: 'backup', base: null },
  { key: 'loadBalancer', base: 3 },
]

function StatusCard() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const active = useInView(ref)
  const [latency, setLatency] = useState(() => SERVICES.map((s) => s.base))

  useInterval(
    () => setLatency(SERVICES.map((s) => (s.base == null ? null : Math.max(1, s.base + Math.round((Math.random() - 0.5) * Math.max(2, s.base * 0.3)))))),
    active ? 2000 : null,
  )

  return (
    <ul ref={ref} className="card mt-10 divide-y divide-white/[0.06] px-5 font-mono text-xs sm:px-6 sm:text-sm">
      {SERVICES.map((s, i) => {
        const backup = s.base == null
        return (
          <li key={s.key} className="grid grid-cols-[auto_1fr_auto_3.5rem] items-center gap-3 py-3.5">
            <span className={`h-2 w-2 rounded-full ${backup ? 'bg-cyan shadow-[0_0_8px_#00d4ff]' : 'bg-emerald shadow-[0_0_8px_#10b981]'}`} />
            <span className="truncate text-white">{t(`cloud.services.${s.key}`)}</span>
            <span className={`uppercase tracking-wider ${backup ? 'text-cyan' : 'text-emerald'}`}>
              {t(backup ? 'cloud.status.active' : 'cloud.status.healthy')}
            </span>
            <span className="text-right tabular-nums text-slate-muted">{backup ? '—' : `${latency[i]}ms`}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default function Cloud() {
  const { t } = useTranslation()

  return (
    <Section id="cloud" className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="card p-4 sm:p-8">
        <Diagram />
      </div>
      <div>
        <SectionHeading
          align="left"
          label={t('cloud.label')}
          title={t('cloud.title')}
          titleMuted={t('cloud.titleMuted')}
          text={t('cloud.text')}
        />
        <StatusCard />
      </div>
    </Section>
  )
}
