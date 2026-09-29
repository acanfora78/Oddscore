import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { useDemo } from '../components/DemoContext'
import useInterval from '../hooks/useInterval'
import { IMAGES } from '../images'

const SLIDE_IMAGES = [IMAGES.kanban, IMAGES.office]

function Carousel() {
  const { t } = useTranslation()
  const slides = t('skins.slides', { returnObjects: true })
  const [index, setIndex] = useState(0)

  useInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)

  function onDragEnd(_, info) {
    if (Math.abs(info.offset.x) < 60) return
    setIndex((i) => (i + (info.offset.x < 0 ? 1 : -1) + slides.length) % slides.length)
  }

  const slide = slides[index]

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* stacked card peeking behind the active one */}
      <div aria-hidden="true" className="card absolute inset-x-6 -bottom-3 top-3 -z-10 opacity-60 sm:inset-x-10 sm:-bottom-5" />
      <div className="card relative aspect-[4/3] overflow-hidden p-0 sm:aspect-[16/8]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
          >
            <img src={SLIDE_IMAGES[index]} alt={slide.alt} draggable="false" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-8">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
                {index === 0 && <span className="h-2 w-2 animate-pulse rounded-full bg-cyan shadow-[0_0_10px_#00d4ff]" />}
                {slide.label}
              </p>
              {slide.title && <p className="mt-2 font-display text-2xl font-bold text-white sm:text-4xl">{slide.title}</p>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t('skins.slideNav', { n: i + 1 })}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-cyan' : 'w-3 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, accent, title, items }) {
  const styles = accent === 'cyan'
    ? { box: 'border-cyan/30 bg-cyan/10 text-cyan', dot: 'bg-cyan' }
    : { box: 'border-indigo/40 bg-indigo/15 text-[#a5b4fc]', dot: 'bg-indigo' }
  return (
    <div className="card p-6 text-left sm:p-8">
      <div className="flex items-center gap-4">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.box}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h3>
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed sm:text-base">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FrontSkins() {
  const { t } = useTranslation()
  const openDemo = useDemo()

  return (
    <Section id="skins">
      <SectionHeading label={t('skins.label')} title={t('skins.title')} titleMuted={t('skins.titleMuted')} text={t('skins.text')} />
      <div className="mt-14">
        <Carousel />
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
        <FeatureCard icon={Check} accent="cyan" title={t('skins.offerTitle')} items={t('skins.offer', { returnObjects: true })} />
        <FeatureCard icon={Sparkles} accent="indigo" title={t('skins.whyTitle')} items={t('skins.why', { returnObjects: true })} />
      </div>
      <div className="mt-16 text-center">
        <p className="heading mx-auto max-w-3xl text-3xl sm:text-5xl">{t('skins.tagline')}</p>
        <button type="button" onClick={() => openDemo('skin')} className="btn btn-primary mt-8">
          {t('skins.cta')} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Section>
  )
}
