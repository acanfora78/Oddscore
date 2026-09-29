import { useTranslation } from 'react-i18next'
import { ArrowRight, CircleCheck, CodeXml, Zap } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { useDemo } from '../components/DemoContext'

const VARIANTS = {
  iframe: {
    icon: Zap,
    badge: 'border-cyan/40 bg-cyan/10 text-cyan',
    dot: 'bg-cyan',
    box: 'border-cyan/30 bg-cyan/10 text-cyan',
    button: 'btn-primary',
    glow: 'hover:border-cyan/30',
  },
  api: {
    icon: CodeXml,
    badge: 'border-indigo/50 bg-indigo/15 text-[#a5b4fc]',
    dot: 'bg-indigo',
    box: 'border-indigo/40 bg-indigo/15 text-[#a5b4fc]',
    button: 'btn-outline-indigo',
    glow: 'hover:border-indigo/40',
  },
}

function OptionCard({ id }) {
  const { t } = useTranslation()
  const openDemo = useDemo()
  const v = VARIANTS[id]
  const Icon = v.icon

  return (
    <article className={`card flex flex-col p-6 text-left transition-colors sm:p-8 ${v.glow}`}>
      <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${v.badge}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${v.dot}`} />
        {t(`integration.${id}.badge`)}
      </span>
      <div className="mt-6 flex items-center gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${v.box}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-2xl font-bold text-white">{t(`integration.${id}.title`)}</h3>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed sm:text-base">{t(`integration.${id}.text`)}</p>
      <button type="button" onClick={() => openDemo(id)} className={`btn ${v.button} mt-8 w-full font-mono uppercase tracking-[0.15em] sm:w-fit`}>
        {t(`integration.${id}.cta`)} <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  )
}

export default function Integration() {
  const { t } = useTranslation()
  const benefits = t('integration.benefits', { returnObjects: true })

  return (
    <Section id="integration">
      <SectionHeading
        label={t('integration.label')}
        title={t('integration.title')}
        titleMuted={t('integration.titleMuted')}
        text={t('integration.text')}
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <OptionCard id="iframe" />
        <OptionCard id="api" />
      </div>
      <div className="card mt-6 p-6 text-left sm:p-8">
        <div className="flex items-center gap-3">
          <CircleCheck className="h-6 w-6 text-cyan" />
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{t('integration.benefitsTitle')}</h3>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_8px_#00d4ff]" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
