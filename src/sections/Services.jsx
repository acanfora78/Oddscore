import { useTranslation } from 'react-i18next'
import { Cloud, Code, Compass, LifeBuoy, Plug, Smartphone } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { IMAGES } from '../images'

const ICONS = [Code, Smartphone, Plug, Cloud, Compass, LifeBuoy]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true })

  return (
    <div className="relative overflow-hidden">
      <img
        src={IMAGES.services}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
      />
      <Section id="services">
        <SectionHeading label={t('services.label')} title={t('services.title')} titleMuted={t('services.titleMuted')} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <article key={item.title} className="card group p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/25 bg-[#0e3a44]/60 text-cyan transition-shadow group-hover:shadow-[0_0_24px_rgba(0,212,255,0.3)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-slate-500">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
              </article>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
