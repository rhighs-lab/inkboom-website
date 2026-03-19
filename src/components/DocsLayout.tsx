import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarSection {
  title: string
  links: { href: string; label: string; indent?: boolean }[]
}

interface DocsLayoutProps {
  children: React.ReactNode
  sections: SidebarSection[]
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`chevron${open ? ' chevron--open' : ''}`}
      width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}

function SidebarLinks({ sections, onLinkClick }: { sections: SidebarSection[]; onLinkClick?: () => void }) {
  const { pathname } = useLocation()
  return (
    <>
      {sections.map(section => (
        <div key={section.title} className="sidebar__section">
          <p className="sidebar__title">{section.title}</p>
          <ul className="sidebar__links">
            {section.links.map(({ href, label, indent }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={pathname === href ? 'active' : ''}
                  onClick={onLinkClick}
                >
                  {indent ? `\u00a0\u00a0${label}` : label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default function DocsLayout({ children, sections }: DocsLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="sidebar-toggle"
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen(o => !o)}
      >
        <ListIcon />
        <span>On this page</span>
        <ChevronIcon open={drawerOpen} />
      </button>

      {/* Mobile sidebar drawer */}
      <div className={`sidebar-drawer${drawerOpen ? ' sidebar-drawer--open' : ''}`}>
        <div className="sidebar-drawer__inner">
          {sections.map(section => (
            <div key={section.title}>
              <p className="sidebar-drawer__title">{section.title}</p>
              <ul className="sidebar-drawer__links">
                {section.links.map(({ href, label, indent }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      onClick={() => setDrawerOpen(false)}
                    >
                      {indent ? `  ${label}` : label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="docs-layout">
        {/* Desktop sidebar */}
        <aside className="sidebar" aria-label="Documentation navigation">
          <SidebarLinks sections={sections} />
        </aside>

        {/* Page content */}
        <article className="docs-content">
          {children}
        </article>
      </div>
    </>
  )
}
