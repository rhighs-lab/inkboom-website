import { useState } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'

const STEPS = [
  {
    n: '01',
    title: 'create_project',
    desc: <>Create an empty project at <code>~/.inkboom/projects/&lt;slug&gt;/project.json</code>.</>,
  },
  {
    n: '02',
    title: 'set_tokens',
    desc: 'Define colours, spacing, typography, shadows, radii, and an optional icon library. Validated by Zod on write.',
  },
  {
    n: '03',
    title: 'set_design_system',
    desc: <>Define components with <code>tokenBindings</code> referencing token paths like <code>{'{color.brand.primary}'}</code>.</>,
  },
  {
    n: '04',
    title: 'get_design_system',
    desc: 'Returns all components with bindings resolved to raw values. The agent writes CSS directly from these — no token references in the output.',
  },
]

export default function Home() {
  const [copied, setCopied] = useState(false)
  const installCmd = 'git clone https://github.com/rhighs-lab/inkboom && cd inkboom && pnpm install && pnpm mcp'

  const copy = () => {
    navigator.clipboard.writeText(installCmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      {/* HERO */}
      <section className="hero-bg" style={{ paddingTop: 'var(--sp-3xl)', paddingBottom: 'var(--sp-3xl)', borderBottom: '1px solid var(--c-grey-200)' }}>
        <div className="wrap">
          <div style={{ maxWidth: 640 }}>
            <h1 className="h1 mb-lg">inkboom</h1>
            <p className="body-lg mb-xl" style={{ maxWidth: 520 }}>
              An MCP server for Claude Code. Store design tokens and component definitions once —
              the agent reads them back as resolved values on every generation.
            </p>
            <div className="flex flex-wrap gap-sm mb-xl">
              <Link to="/docs" className="btn btn-primary">Get started</Link>
              <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
            </div>
            <div className="install-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <code>{installCmd}</code>
              <button className="install-pill__copy" onClick={copy}>{copied ? 'copied!' : 'copy'}</button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="steps">
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} className="step">
                  <div className="step__num">{n}</div>
                  <div>
                    <div className="step__title">{title}</div>
                    <p className="step__desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <CodeBlock filename="terminal">
              <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm mcp</span>{'\n'}
              <span className="sh-out">inkboom MCP HTTP server started  port: 4778</span>{'\n'}
              {'\n'}
              <span className="cc"># 9 tools: create_project, set_tokens,</span>{'\n'}
              <span className="cc"># set_design_system, get_design_system,</span>{'\n'}
              <span className="cc"># get_tokens, list_components,</span>{'\n'}
              <span className="cc"># add_component, remove_component,</span>{'\n'}
              <span className="cc"># delete_project</span>{'\n'}
              {'\n'}
              <span className="cc"># get_design_system resolves bindings:</span>{'\n'}
              <span className="cc">#   iconColor: "#4F46E5"</span>{'\n'}
              <span className="cc">#             ↑ was {'{color.brand.primary}'}</span>
            </CodeBlock>
          </div>
        </div>
      </section>
    </>
  )
}
