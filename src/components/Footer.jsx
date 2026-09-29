import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] font-mono text-xs text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="#privacy" className="transition-colors hover:text-cyan">{t('footer.privacy')}</a>
          <span aria-hidden="true">·</span>
          <a href="#terms" className="transition-colors hover:text-cyan">{t('footer.terms')}</a>
          <span aria-hidden="true">·</span>
          <a href="#contact" className="transition-colors hover:text-cyan">{t('footer.contact')}</a>
        </nav>
        <p className="leading-relaxed text-slate-600">
          © {year} XCodeTech S.H.P.K. · Tiranë, Albania · NUIS: M41609009P · {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
