import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-vis')
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
