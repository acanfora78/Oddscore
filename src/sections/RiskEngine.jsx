import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import useInterval from '../hooks/useInterval'

const MARKETS = ['EVT#23', 'BTC/USD', 'ARS-PSG', 'LAL-GSW']

const rand = (min, max) => Math.random() * (max - min) + min
const pick = (list) => list[Math.floor(Math.random() * list.length)]
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const clock = () => new Date().toLocaleTimeString('en-GB', { hour12: false })
const alertDelay = () => rand(2000, 4000)

let uid = 0
const nextId = () => ++uid

function Dot({ color }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${color}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  )
}

function Panel({ title, dot, className = '', children }) {
  return (
    <div className={`card p-5 text-left sm:p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">{title}</p>
        {dot && <Dot color={dot} />}
      </div>
      {children}
    </div>
  )
}

/* ---------- Position feed ---------- */

const INITIAL_POSITIONS = [
  ['SELL', 'EVT#23', 43063],
  ['SELL', 'BTC/USD', 37220],
  ['BUY', 'BTC/USD', 38903],
  ['BUY', 'ARS-PSG', 16633],
  ['BUY', 'ARS-PSG', 18587],
  ['SELL', 'ARS-PSG', 42350],
  ['BUY', 'LAL-GSW', 14123],
  ['SELL', 'BTC/USD', 3927],
  ['BUY', 'EVT#23', 23875],
].map(([action, market, amount]) => ({ id: nextId(), action, market, amount }))

function PositionFeed({ active }) {
  const { t } = useTranslation()
  const [rows, setRows] = useState(INITIAL_POSITIONS)

  useInterval(
    () =>
      setRows((prev) => [
        { id: nextId(), action: pick(['BUY', 'SELL']), market: pick(MARKETS), amount: Math.round(rand(1500, 49000)) },
        ...prev.slice(0, INITIAL_POSITIONS.length - 1),
      ]),
    active ? 1500 : null,
  )

  return (
    <Panel title={t('risk.feed')} dot="bg-emerald">
      <ul className="mt-4 overflow-hidden font-mono text-sm">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, y: -16, backgroundColor: 'rgba(0,212,255,0.12)' }}
              animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(0,212,255,0)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-2 rounded-md border-b border-white/[0.05] px-1 py-2 last:border-0"
            >
              <span className={r.action === 'BUY' ? 'font-semibold text-emerald' : 'font-semibold text-rose'}>
                {t(r.action === 'BUY' ? 'risk.buy' : 'risk.sell')}
              </span>
              <span className="text-slate-muted">{r.market}</span>
              <span className="text-white">${r.amount}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Panel>
  )
}

/* ---------- Liability gauge ---------- */

function ExposureGauge({ active }) {
  const { t } = useTranslation()
  const [value, setValue] = useState(78.4)

  useInterval(() => setValue((v) => clamp(v + rand(-0.9, 0.9), 76, 80)), active ? 1200 : null)

  const angle = -90 + (value / 100) * 180

  return (
    <Panel title={t('risk.exposure')}>
      <svg viewBox="0 0 200 118" className="mx-auto mt-4 w-full max-w-[280px]" aria-hidden="true">
        <defs>
          <linearGradient id="gauge-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#gauge-arc)" strokeWidth="14" strokeLinecap="round" />
        {Array.from({ length: 11 }, (_, i) => {
          const a = Math.PI - (i / 10) * Math.PI
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 64}
              y1={100 - Math.sin(a) * 64}
              x2={100 + Math.cos(a) * 58}
              y2={100 - Math.sin(a) * 58}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
            />
          )
        })}
        {/* invisible circle keeps the group's box centred on the pivot so rotation happens around it */}
        <motion.g initial={false} animate={{ rotate: angle }} transition={{ type: 'spring', stiffness: 60, damping: 12 }}>
          <circle cx="100" cy="100" r="66" fill="none" />
          <line x1="100" y1="100" x2="100" y2="40" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <circle cx="100" cy="100" r="7" fill="#00d4ff" style={{ filter: 'drop-shadow(0 0 6px #00d4ff)' }} />
        <circle cx="100" cy="100" r="2.5" fill="#05070d" />
      </svg>
      <p className="mt-2 text-center font-mono text-4xl font-bold text-[#f97316] tabular-nums sm:text-5xl">{value.toFixed(1)}%</p>
      <p className="mt-1 text-center text-xs text-slate-500">{t('risk.updated')}</p>
    </Panel>
  )
}

/* ---------- Alert system ---------- */

const PRIORITY_STYLES = {
  low: { border: 'border-l-emerald', text: 'text-emerald' },
  med: { border: 'border-l-[#f97316]', text: 'text-[#f97316]' },
  high: { border: 'border-l-rose', text: 'text-rose' },
}

function randomAlert() {
  const kind = pick(['liabilitySpike', 'autoSettlement', 'userFlagged', 'limitReached', 'oddsShift'])
  const priority = {
    liabilitySpike: pick(['med', 'high']),
    autoSettlement: 'low',
    userFlagged: pick(['med', 'high']),
    limitReached: pick(['low', 'med']),
    oddsShift: pick(['low', 'med', 'high']),
  }[kind]
  const params = { market: pick(MARKETS), count: Math.round(rand(120, 1400)), id: Math.round(rand(1000, 9999)) }
  return { id: nextId(), kind, priority, params, time: clock() }
}

function AlertSystem({ active }) {
  const { t } = useTranslation()
  const [alerts, setAlerts] = useState(() => [
    { id: nextId(), kind: 'liabilitySpike', priority: 'med', params: { market: 'BTC/USD' }, time: clock() },
    { id: nextId(), kind: 'autoSettlement', priority: 'low', params: { count: 847 }, time: clock() },
    { id: nextId(), kind: 'userFlagged', priority: 'med', params: { id: 4827 }, time: clock() },
  ])

  useInterval(() => setAlerts((prev) => [randomAlert(), ...prev.slice(0, 3)]), active ? alertDelay : null)

  return (
    <Panel title={t('risk.alerts')} dot="bg-rose">
      <ul className="mt-4 space-y-2.5 overflow-hidden">
        <AnimatePresence initial={false}>
          {alerts.map((a) => (
            <motion.li
              key={a.id}
              layout
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className={`rounded-lg border border-l-[3px] border-white/[0.06] bg-white/[0.02] px-3.5 py-3 ${PRIORITY_STYLES[a.priority].border}`}
            >
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                <span className={PRIORITY_STYLES[a.priority].text}>{t(`risk.priority.${a.priority}`)}</span>
                <span className="text-slate-500">{a.time}</span>
              </div>
              <p className="mt-1.5 text-sm text-white">{t(`risk.alertMessages.${a.kind}`, a.params)}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Panel>
  )
}

/* ---------- KPIs ---------- */

function KpiGrid({ active }) {
  const { t } = useTranslation()
  const [auto, setAuto] = useState(98.7)
  const [manual, setManual] = useState(1.8)

  useInterval(() => {
    setAuto((v) => clamp(v + rand(-0.15, 0.15), 98.4, 99))
    setManual((v) => clamp(v + rand(-0.15, 0.15), 1.5, 2.1))
  }, active ? 2000 : null)

  const kpis = [
    { key: 'activeLimits', value: '2850', color: 'text-white' },
    { key: 'flaggedUsers', value: '12', color: 'text-rose' },
    { key: 'autoSettled', value: `${auto.toFixed(1)}%`, color: 'text-emerald' },
    { key: 'manualReview', value: `${manual.toFixed(1)}%`, color: 'text-[#f97316]' },
    { key: 'systemLoad', value: '65%', color: 'text-white' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {kpis.map((k, i) => (
        <div key={k.key} className={`card p-4 text-left ${i === kpis.length - 1 ? 'col-span-2' : ''}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{t(`risk.kpi.${k.key}`)}</p>
          <p className={`mt-2 font-mono text-2xl font-bold tabular-nums sm:text-3xl ${k.color}`}>{k.value}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Multi-market grid ---------- */

const INITIAL_QUOTES = [
  ['EUR/USD', 3.32, 0.55],
  ['GBP/USD', 2.3, 0.46],
  ['BTC/USD', 4.13, -1.72],
  ['ETH/USD', 4.27, 0.14],
  ['ARS-PSG', 1.63, 0.7],
  ['LAL-GSW', 1.14, 1.56],
  ['MIL-INT', 1.12, -1.63],
  ['RMA-BAR', 3.9, -0.7],
].map(([market, odds, change]) => ({ market, odds, change }))

function MarketGrid({ active }) {
  const { t } = useTranslation()
  const [quotes, setQuotes] = useState(INITIAL_QUOTES)

  useInterval(
    () =>
      setQuotes((prev) =>
        prev.map((q) => {
          if (Math.random() < 0.4) return q
          const change = Number(rand(-2, 2).toFixed(2)) || 0.1
          const odds = clamp(q.odds * (1 + change / 100), 1.01, 9.99)
          return { market: q.market, odds, change }
        }),
      ),
    active ? 2000 : null,
  )

  return (
    <Panel title={t('risk.grid')}>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quotes.map((q) => {
          const up = q.change >= 0
          return (
            <div key={q.market} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 sm:p-4">
              <p className="font-mono text-xs text-slate-500">{q.market}</p>
              <motion.p
                key={q.odds}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className={`mt-1.5 font-mono text-2xl font-bold tabular-nums sm:text-3xl ${up ? 'text-emerald' : 'text-rose'}`}
              >
                {q.odds.toFixed(2)}
              </motion.p>
              <p className={`mt-0.5 font-mono text-xs tabular-nums ${up ? 'text-emerald' : 'text-rose'}`}>
                {up ? '▲' : '▼'}
                {Math.abs(q.change).toFixed(2)}%
              </p>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

export default function RiskEngine() {
  const { t } = useTranslation()
  const ref = useRef(null)
  // live widgets only tick while the section is on screen
  const active = useInView(ref, { margin: '200px 0px' })

  return (
    <Section id="risk">
      <SectionHeading
        label={t('risk.label')}
        labelClassName="!text-rose"
        title={t('risk.title')}
        titleMuted={t('risk.titleMuted')}
        text={t('risk.text')}
      />
      <div ref={ref} className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
        <PositionFeed active={active} />
        <div className="flex flex-col gap-5 lg:gap-6">
          <ExposureGauge active={active} />
          <KpiGrid active={active} />
        </div>
        <AlertSystem active={active} />
        <div className="lg:col-span-3">
          <MarketGrid active={active} />
        </div>
      </div>
    </Section>
  )
}
