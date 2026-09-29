import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'

export default function Company() {
  const { t } = useTranslation()

  return (
    <Section id="company" className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
      <SectionHeading
        align="left"
        label={t('company.label')}
        title={t('company.title')}
        titleMuted={t('company.titleMuted')}
        text={t('company.text')}
      />
      <address className="card p-6 font-mono not-italic sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">{t('company.officeLabel')}</p>
        <p className="mt-4 text-lg font-bold text-white">XCodeTech S.H.P.K.</p>
        <p className="mt-3 text-sm leading-relaxed text-body">{t('company.addressLine1')}</p>
        <p className="text-sm leading-relaxed text-body">{t('company.addressLine2')}</p>
        <p className="mt-5 border-t border-white/[0.08] pt-5 text-sm tracking-wider text-cyan">NUIS: M41609009P</p>
      </address>
    </Section>
  )
}
