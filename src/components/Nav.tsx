import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

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
                <NavLink to={to} aria-current={pathname === to ? 'page' : undefined}>
                  {label}
                </NavLink>
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

      <style>{`
        /* Burger icon swap */
        .nav__burger { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: none; border: 1px solid var(--c-grey-200); border-radius: var(--r-relaxed); color: var(--c-black); cursor: pointer; flex-shrink: 0; transition: border-color .12s; }
        .nav__burger:hover { border-color: var(--c-grey-500); }
        .nav__burger svg { display: block; }
        .nav__burger .icon-close { display: none; }
        .nav__burger .icon-open  { display: block; }
        .nav--open .nav__burger .icon-close { display: block; }
        .nav--open .nav__burger .icon-open  { display: none; }
        @media (min-width: 768px) { .nav__burger { display: none; } }

        /* Nav drawer */
        .nav__drawer { display: none; overflow: hidden; background: var(--c-white); border-bottom: 1px solid var(--c-grey-200); max-height: 0; transition: max-height .25s ease; }
        @media (max-width: 767px) { .nav__drawer { display: block; } }
        .nav--open .nav__drawer { max-height: 480px; }
        .nav__drawer-inner { padding: var(--sp-md) var(--sp-lg) var(--sp-lg); display: flex; flex-direction: column; gap: 2px; }
        .nav__drawer-link { display: flex; align-items: center; justify-content: space-between; padding: 11px var(--sp-sm); font-family: var(--f-mono); font-size: var(--fs-md); font-weight: var(--fw-med); color: var(--c-grey-700); text-decoration: none; border-radius: var(--r-tight); transition: background .1s, color .1s; border-bottom: 1px solid var(--c-grey-100); }
        .nav__drawer-link:last-of-type { border-bottom: none; }
        .nav__drawer-link:hover, .nav__drawer-link[aria-current="page"] { background: var(--c-grey-100); color: var(--c-black); }
        .nav__drawer-link[aria-current="page"] { font-weight: var(--fw-semi); color: var(--c-accent); }
        .nav__drawer-link svg { color: var(--c-grey-400); flex-shrink: 0; }
        .nav__drawer-cta { margin-top: var(--sp-md); display: flex; gap: var(--sp-sm); }
        .nav__drawer-cta .btn { flex: 1; justify-content: center; }

        /* Desktop link active state */
        .nav__links a.active { color: var(--c-black); font-weight: var(--fw-semi); }
        .nav__actions .btn-ghost { display: none; }
        @media (min-width: 640px) { .nav__actions .btn-ghost { display: inline-flex; } }
      `}</style>
    </header>
  )
}
