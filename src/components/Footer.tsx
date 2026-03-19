import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__inner">
          <div>
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark" aria-hidden="true" />
              inkboom
            </Link>
            <p className="footer__tagline">Design system MCP for Claude Code.</p>
          </div>
          <div className="footer__cols">
            <div>
              <p className="footer__col-title">Docs</p>
              <ul className="footer__links">
                <li><Link to="/docs">Getting started</Link></li>
                <li><Link to="/docs/tokens">Token schema</Link></li>
                <li><Link to="/docs/components">Components</Link></li>
                <li><Link to="/docs/tools">MCP tools</Link></li>
              </ul>
            </div>
            <div>
              <p className="footer__col-title">Project</p>
              <ul className="footer__links">
                <li><a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://github.com/rhighs-lab/inkboom/blob/main/SKILL.md" target="_blank" rel="noreferrer">SKILL.md</a></li>
                <li><a href="https://github.com/rhighs-lab/inkboom/blob/main/README.md" target="_blank" rel="noreferrer">README</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">MIT License. Open source.</p>
          <ul className="footer__legal">
            <li><a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://github.com/rhighs-lab/inkboom/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
