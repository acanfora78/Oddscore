import { useEffect, useRef } from 'react'

// Calls `callback` every `delay` ms (or a fresh delay from a function each tick).
export default function useInterval(callback, delay) {
  const saved = useRef(callback)
  saved.current = callback

  useEffect(() => {
    if (delay == null) return
    let timer
    const next = () => {
      const ms = typeof delay === 'function' ? delay() : delay
      timer = setTimeout(() => {
        saved.current()
        next()
      }, ms)
    }
    next()
    return () => clearTimeout(timer)
  }, [delay])
}
