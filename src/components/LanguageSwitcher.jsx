import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { LANGUAGES } from '../i18n'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = LANGUAGES.some((l) => l.code === i18n.language) ? i18n.language : 'en'

  useEffect(() => {
    if (!open) return
    function onPointer(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function select(code) {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('header.language')}
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs font-semibold tracking-wider text-white transition-colors hover:border-cyan/40 hover:text-cyan"
      >
        {current.toUpperCase()}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t('header.language')}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="card absolute right-0 top-full mt-2 w-52 origin-top-right overflow-hidden p-1.5 shadow-2xl shadow-black/60"
          >
            {LANGUAGES.map((lang) => {
              const active = lang.code === current
              return (
                <li key={lang.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => select(lang.code)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active ? 'bg-cyan/10 text-cyan' : 'text-body hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className={`font-mono text-xs ${active ? 'text-cyan' : 'text-slate-500'}`}>
                      {lang.code.toUpperCase()}
                    </span>
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
