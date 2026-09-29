import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CircleCheck, Send, X } from 'lucide-react'

const SELECT_ARROW =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2300d4ff' stroke-width='2'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E\")"

const INTERESTS = ['iframe', 'api', 'whiteLabel', 'skin', 'other']

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-cyan/60 focus:bg-white/[0.05]'

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-muted">{label}</span>
      {children}
    </label>
  )
}

function DemoForm({ interest, onClose }) {
  const { t } = useTranslation()
  const titleId = useId()
  const [sent, setSent] = useState(false)

  // UI only for now: a real submission would POST the form data here.
  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="card relative my-auto w-full max-w-xl !bg-[#0a0e19]/95 p-6 shadow-2xl shadow-black/60 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t('demo.close')}
        className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      {sent ? (
        <div className="py-8 text-center">
          <CircleCheck className="mx-auto h-14 w-14 text-cyan drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
          <h2 id={titleId} className="heading mt-5 text-3xl">{t('demo.successTitle')}</h2>
          <p className="mx-auto mt-3 max-w-sm">{t('demo.successText')}</p>
          <button type="button" onClick={onClose} className="btn btn-primary mt-8">
            {t('demo.done')}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h2 id={titleId} className="heading pr-10 text-3xl">{t('demo.title')}</h2>
          <p className="mt-2 text-sm">{t('demo.subtitle')}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label={t('demo.name')}>
              <input name="name" required autoComplete="name" autoFocus className={inputClass} />
            </Field>
            <Field label={t('demo.company')}>
              <input name="company" required autoComplete="organization" className={inputClass} />
            </Field>
            <Field label={t('demo.email')}>
              <input name="email" type="email" required autoComplete="email" className={inputClass} />
            </Field>
            <Field label={t('demo.phone')}>
              <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
            </Field>
            <Field label={t('demo.interest')} className="sm:col-span-2">
              <select name="interest" required defaultValue={interest ?? ''} className={`${inputClass} appearance-none bg-no-repeat pr-10 invalid:text-slate-500`}
                style={{ backgroundImage: SELECT_ARROW, backgroundPosition: 'right 1rem center' }}
              >
                <option value="" disabled className="bg-[#0a0e19]">{t('demo.interestPlaceholder')}</option>
                {INTERESTS.map((key) => (
                  <option key={key} value={key} className="bg-[#0a0e19] text-white">
                    {t(`demo.interests.${key}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('demo.message')} className="sm:col-span-2">
              <textarea name="message" rows={4} className={`${inputClass} resize-none`} />
            </Field>
          </div>
          <button type="submit" className="btn btn-primary mt-6 w-full">
            {t('demo.submit')} <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </motion.div>
  )
}

export default function DemoModal({ open, interest, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
        >
          <div className="m-auto flex w-full justify-center">
            <DemoForm interest={interest} onClose={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
