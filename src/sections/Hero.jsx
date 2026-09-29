import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useDemo } from '../components/DemoContext'

const SPHERES = [
  { size: 'h-24 w-24 sm:h-36 sm:w-36', pos: 'left-[4%] top-[18%]', delay: 0, duration: 9 },
  { size: 'h-14 w-14 sm:h-20 sm:w-20', pos: 'right-[8%] top-[12%]', delay: 1.2, duration: 7 },
  { size: 'h-20 w-20 sm:h-28 sm:w-28', pos: 'right-[3%] top-[52%]', delay: 0.6, duration: 10 },
  { size: 'h-10 w-10 sm:h-14 sm:w-14', pos: 'left-[14%] top-[62%]', delay: 2, duration: 8 },
]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { t } = useTranslation()
  const openDemo = useDemo()

  const lines = [
    { key: 'line1', color: 'text-white' },
    { key: 'line2', color: 'text-white' },
    { key: 'line3', color: 'text-sky' },
    { key: 'line4', color: 'text-sky' },
    { key: 'line5', color: 'text-white' },
  ]

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-16 text-center sm:px-6 sm:pt-20">
      {/* blurred teal polygon + floating spheres behind the title */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.svg
          viewBox="0 0 600 600"
          className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-3xl sm:h-[48rem] sm:w-[48rem]"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="hero-poly" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#0f766e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <polygon points="300,40 520,150 560,380 380,560 140,520 40,300 120,110" fill="url(#hero-poly)" />
        </motion.svg>
        {SPHERES.map((s, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full border border-cyan/20 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,255,0.35),rgba(13,19,48,0.2)_60%,transparent)] backdrop-blur-sm ${s.size} ${s.pos}`}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.p {...fadeUp(0)} className="label">
        {t('hero.label')}
      </motion.p>

      <motion.h1 {...fadeUp(0.1)} className="heading mt-6 text-[2.9rem] leading-[0.98] min-[400px]:text-[3.3rem] sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
        {lines.map(({ key, color }) => (
          <span key={key} className={`block ${color}`}>
            {t(`hero.${key}`)}
          </span>
        ))}
      </motion.h1>

      <motion.div {...fadeUp(0.25)} className="card mt-10 max-w-2xl px-6 py-5 sm:px-8 sm:py-6">
        <p className="text-base leading-relaxed sm:text-lg">{t('hero.description')}</p>
      </motion.div>

      <motion.div {...fadeUp(0.35)} className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <button type="button" onClick={() => openDemo()} className="btn btn-primary w-full sm:w-auto">
          {t('hero.requestDemo')}
        </button>
        <a href="#backoffice" className="btn btn-outline w-full sm:w-auto">
          {t('hero.explore')} <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>

      <a href="#company" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">{t('hero.scroll')}</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-5 w-5 text-cyan" />
        </motion.span>
      </a>
    </section>
  )
}
