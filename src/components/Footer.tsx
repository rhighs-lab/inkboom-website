import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <Link to="/" className="site-footer__logo">
          <span className="nav__logo-mark" aria-hidden="true" />
          inkboom
        </Link>
        <nav aria-label="Footer">
          <ul className="site-footer__links">
            <li><Link to="/docs">Docs</Link></li>
            <li><Link to="/docs/tokens">Tokens</Link></li>
            <li><Link to="/docs/components">Components</Link></li>
            <li><Link to="/docs/tools">Tools</Link></li>
            <li><a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
