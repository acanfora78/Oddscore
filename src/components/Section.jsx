import { motion } from 'framer-motion'

// Fade + slide-up on scroll, shared by every landing section.
export default function Section({ id, className = '', children, ...rest }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 ${className}`}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
