import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/docs',            label: 'Docs' },
  { to: '/docs/tokens',     label: 'Tokens' },
  { to: '/docs/components', label: 'Components' },
  { to: '/docs/tools',      label: 'Tools' },
]

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Close on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <header className={`nav${open ? ' nav--open' : ''}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-mark" aria-hidden="true" />
          inkboom
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary">
          <ul className="nav__links">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={pathname === to ? 'active' : undefined}
                  aria-current={pathname === to ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer">GitHub</a>
            </li>
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div className="nav__actions">
          <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            <GithubIcon /> GitHub
          </a>
          <Link to="/docs" className="btn btn-primary">Get started</Link>
        </div>

        {/* Burger */}
        <button
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {/* hamburger */}
          <svg className="icon-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          {/* X */}
          <svg className="icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className="nav__drawer" role="navigation" aria-label="Mobile navigation">
        <div className="nav__drawer-inner">
          {LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="nav__drawer-link"
              aria-current={pathname === to ? 'page' : undefined}
            >
              {label} <ArrowRight />
            </Link>
          ))}
          <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer" className="nav__drawer-link">
            GitHub <ArrowRight />
          </a>
          <div className="nav__drawer-cta">
            <Link to="/docs" className="btn btn-primary">Get started</Link>
            <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
          </div>
        </div>
      </div>

    </header>
  )
}
