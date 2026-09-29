import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import { IMAGES } from '../images'

export default function AbstractImage() {
  const { t } = useTranslation()

  return (
    <Section className="!py-8 sm:!py-12">
      <div className="card overflow-hidden p-0 shadow-[0_0_80px_-20px_rgba(0,212,255,0.25)]">
        <img
          src={IMAGES.abstract}
          alt={t('abstract.alt')}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
        />
      </div>
    </Section>
  )
}
