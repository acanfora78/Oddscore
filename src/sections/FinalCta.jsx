import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import Section from '../components/Section'
import { useDemo } from '../components/DemoContext'

export default function FinalCta() {
  const { t } = useTranslation()
  const openDemo = useDemo()

  return (
    <Section id="contact" className="text-center">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-full max-w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.16),rgba(99,102,241,0.08)_45%,transparent_70%)] blur-2xl" />
      <p className="label">{t('cta.label')}</p>
      <h2 className="heading mt-6 text-[2.75rem] leading-[1] min-[400px]:text-5xl sm:text-7xl lg:text-8xl">
        <span className="block">{t('cta.line1')}</span>
        <span className="block">{t('cta.line2')}</span>
        <span className="block bg-gradient-to-r from-cyan to-sky bg-clip-text pb-1 text-transparent">{t('cta.line3')}</span>
        <span className="block bg-gradient-to-r from-[#0ea5e9] to-indigo bg-clip-text pb-2 text-transparent">{t('cta.line4')}</span>
      </h2>
      <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed sm:text-lg">{t('cta.text')}</p>
      <button type="button" onClick={() => openDemo()} className="btn btn-primary mt-10">
        {t('cta.button')} <ArrowRight className="h-4 w-4" />
      </button>
    </Section>
  )
}
