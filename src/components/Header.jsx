import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ onRequestDemo }) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <a href="#top" aria-label={t('header.home')} className="shrink-0">
          <Logo />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <button type="button" onClick={onRequestDemo} className="btn btn-primary px-4 py-2.5 sm:px-5">
            {t('header.requestDemo')}
          </button>
        </div>
      </div>
    </header>
  )
}
