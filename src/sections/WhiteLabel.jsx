import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'

const BRANDS = [
  { id: 'betcore', name: 'BetCore', color: '#00d4ff', area: '[grid-area:top]' },
  { id: 'tradefx', name: 'TradeFX', color: '#6366f1', area: '[grid-area:left]' },
  { id: 'wagerx', name: 'WagerX', color: '#f43f5e', area: '[grid-area:right]' },
  { id: 'sportspro', name: 'SportsPro', color: '#10b981', area: '[grid-area:bottom]' },
]

function BrandCard({ brand, text }) {
  return (
    <div className={`card flex flex-col gap-3 p-4 sm:p-5 ${brand.area}`}>
      {/* mini mockup */}
      <div className="rounded-lg border p-2.5" style={{ borderColor: `${brand.color}55`, background: `${brand.color}12` }}>
        <div className="h-1.5 w-3/4 rounded-full" style={{ background: brand.color }} />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full opacity-60" style={{ background: brand.color }} />
        <div className="mt-1.5 h-1.5 w-2/3 rounded-full opacity-30" style={{ background: brand.color }} />
      </div>
      <div>
        <p className="font-display text-lg font-bold" style={{ color: brand.color }}>
          {brand.name}
        </p>
        <p className="mt-1 text-xs leading-snug text-slate-muted sm:text-sm">{text}</p>
      </div>
    </div>
  )
}

export default function WhiteLabel() {
  const { t } = useTranslation()

  return (
    <Section id="white-label">
      <SectionHeading
        label={t('whiteLabel.label')}
        title={t('whiteLabel.title')}
        titleMuted={t('whiteLabel.titleMuted')}
        text={t('whiteLabel.text')}
      />

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 items-center gap-4 [grid-template-areas:'top_top''core_core''left_right''bottom_bottom'] sm:gap-6 md:grid-cols-[1fr_1.2fr_1fr] md:[grid-template-areas:'._top_.''left_core_right''._bottom_.']">
        {BRANDS.map((b) => (
          <BrandCard key={b.id} brand={b} text={t(`whiteLabel.brands.${b.id}`)} />
        ))}

        <div className="relative mx-auto my-6 flex aspect-square w-56 items-center justify-center [grid-area:core] sm:w-64 md:my-0">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-dashed border-cyan/35"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_10px_#00d4ff]" />
          </motion.div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-cyan/40 bg-[radial-gradient(circle,rgba(0,212,255,0.22),rgba(10,14,25,0.9)_70%)] shadow-[0_0_60px_rgba(0,212,255,0.35)] sm:h-40 sm:w-40">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan">{t('whiteLabel.core')}</span>
            <span className="mt-1.5 font-display text-xl font-extrabold text-white">OddsCore</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
