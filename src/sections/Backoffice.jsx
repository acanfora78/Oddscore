import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { IMAGES } from '../images'

export default function Backoffice() {
  const { t } = useTranslation()
  const modules = t('backoffice.modules', { returnObjects: true })

  return (
    <div className="relative overflow-hidden">
      <img
        src={IMAGES.dashboard}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-[0.12] blur-md [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />
      <Section id="backoffice">
        <SectionHeading
          label={t('backoffice.label')}
          title={t('backoffice.title')}
          titleMuted={t('backoffice.titleMuted')}
          text={t('backoffice.text')}
        />
        <div className="-mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {modules.map((m, i) => (
            <article
              key={m.title}
              className="card group relative w-[78%] shrink-0 snap-center p-6 text-left transition-colors hover:border-cyan/30 sm:w-[60%] sm:p-7 md:w-auto"
            >
              <span className="absolute right-6 top-6 h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_#00d4ff]" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                {String(i + 1).padStart(2, '0')} / {t('backoffice.module')}
              </p>
              <h3 className="mt-10 font-display text-2xl font-bold text-white">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{m.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  )
}
