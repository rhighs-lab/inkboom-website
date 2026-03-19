import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-vis'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/* ─── inline stagger CSS injected once ─── */
const staggerCSS = `
[data-stagger]>*{opacity:0;transform:translateY(10px);transition:opacity .4s ease,transform .4s ease}
[data-stagger].is-vis>*:nth-child(1){opacity:1;transform:none;transition-delay:.04s}
[data-stagger].is-vis>*:nth-child(2){opacity:1;transform:none;transition-delay:.10s}
[data-stagger].is-vis>*:nth-child(3){opacity:1;transform:none;transition-delay:.16s}
[data-stagger].is-vis>*:nth-child(4){opacity:1;transform:none;transition-delay:.22s}
[data-stagger].is-vis>*:nth-child(5){opacity:1;transform:none;transition-delay:.28s}
[data-stagger].is-vis>*:nth-child(6){opacity:1;transform:none;transition-delay:.34s}
[data-reveal]{opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease}
[data-reveal].is-vis{opacity:1;transform:none}
`

function RevealDiv({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useReveal()
  return <div ref={ref} data-reveal="" className={className} style={style}>{children}</div>
}

function StaggerDiv({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-vis'); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} data-stagger="" className={className}>{children}</div>
}

const FEATURES = [
  {
    title: 'Token storage',
    desc: 'Validated token artifacts — colours, spacing, type, shadows, radii, icons. One file per project. Persistent across sessions.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  },
  {
    title: 'Component library',
    desc: '20 required base components plus unlimited custom ones. Each component defines props, slots, and token bindings.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>,
  },
  {
    title: 'Resolved bindings',
    desc: <><code>get_design_system</code> walks all <code>{'{token.path}'}</code> references and returns raw values. The agent writes <code>#4F46E5</code>, never a reference.</>,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    title: 'Schema validation',
    desc: <><code>set_tokens</code> and <code>set_design_system</code> validate with Zod before writing. Hex must be 6-digit, spacing must have units, breakpoints must be strictly increasing.</>,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'Icon props',
    desc: <><code>tokens.icons</code> declares a Lucide or Heroicons set. Components get <code>type: "icon"</code> props; the agent inlines correct SVG paths.</>,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: 'Incremental updates',
    desc: <><code>add_component</code> and <code>remove_component</code> patch the design system without rewriting everything. Iterate without blowing up your project.</>,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  },
]

const STEPS = [
  { n: '01', title: 'create_project', desc: <>Assign a URL-safe slug and a plain-English brief. Creates an empty project at <code>~/.inkboom/projects/&lt;slug&gt;/project.json</code>.</> },
  { n: '02', title: 'set_tokens', desc: 'Provide the full token artifact — colours (6-digit hex, WCAG-validated), spacing, typography, shadows, radii, layout breakpoints, icon library. Validated on write.' },
  { n: '03', title: 'set_design_system', desc: <>Define all components with <code>tokenBindings</code> referencing token paths like <code>{'{color.brand.primary}'}</code>. Must include the 20 required base components.</> },
  { n: '04', title: 'get_design_system → generate', desc: 'Returns components with all bindings resolved to raw values. The agent writes CSS custom properties directly from these values — never token references.' },
]

export default function Home() {
  const [copied, setCopied] = useState(false)
  const installCmd = 'git clone https://github.com/rhighs-lab/inkboom && cd inkboom && pnpm install && pnpm mcp'

  const copy = () => {
    navigator.clipboard.writeText(installCmd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  return (
    <>
      <style>{staggerCSS}</style>

      {/* HERO */}
      <section className="hero-bg" style={{ paddingTop: 'var(--sp-3xl)', paddingBottom: 'var(--sp-3xl)', borderBottom: '1px solid var(--c-grey-200)' }}>
        <div className="wrap">
          <div style={{ maxWidth: 740 }}>
            <div className="mb-lg">
              <span className="badge badge--accent">MCP server · open source · MIT</span>
            </div>
            <h1 className="h1 mb-lg">
              Your design<br />system,<br /><mark>inside the agent.</mark>
            </h1>
            <p className="body-lg mb-xl" style={{ maxWidth: 560 }}>
              inkboom is an MCP server for Claude Code. Store design tokens and component definitions once.
              Your agent reads them back as resolved values and generates consistent UI every time.
            </p>
            <div className="flex flex-wrap gap-sm mb-xl">
              <Link to="/docs" className="btn btn-primary">
                Read the docs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer" className="btn btn-ghost">View on GitHub</a>
            </div>
            <div className="install-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <code>{installCmd}</code>
              <button className="install-pill__copy" onClick={copy}>{copied ? 'copied!' : 'copy'}</button>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div style={{ borderBottom: '1px solid var(--c-grey-200)', paddingBlock: 'var(--sp-lg)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-xl)', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semi)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-grey-400)', whiteSpace: 'nowrap' }}>Works with</span>
          <div className="flex flex-wrap" style={{ gap: 'var(--sp-xl)' }}>
            {['Claude Code', 'MCP Protocol', 'Lucide Icons', 'Heroicons', 'Any HTML/CSS'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semi)', color: 'var(--c-grey-300)' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <StaggerDiv className="stats-row">
        {[['9', ' tools', 'MCP tools'], ['20', '+', 'Required components'], ['1', ' file', 'Per project on disk'], ['0', ' config', 'To write yourself']].map(([n, sup, label]) => (
          <div key={label} className="stat">
            <div className="stat__value">{n}<span>{sup}</span></div>
            <div className="stat__label">{label}</div>
          </div>
        ))}
      </StaggerDiv>

      {/* WHAT IS IT */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <RevealDiv>
              <span className="section__kicker">What is inkboom</span>
              <h2 className="h2 mb-md">A design memory<br />for your agent</h2>
              <p className="body-md mb-md">When an AI generates a UI, it starts from scratch every time — inventing colours, picking arbitrary spacing, using whatever font stack feels right in the moment. The result is inconsistent across pages and sessions.</p>
              <p className="body-md mb-md">inkboom fixes this. You define your palette, typography, spacing scale, and component library once. The agent reads it back as resolved values and writes CSS custom properties directly from your tokens.</p>
              <p className="body-md mb-xl">Every project lives at <code>~/.inkboom/projects/&lt;slug&gt;/project.json</code>. No database. No network. One file per project.</p>
              <div className="flex flex-wrap gap-sm">
                <Link to="/docs" className="btn btn-primary">Quick start</Link>
                <Link to="/docs/tokens" className="btn btn-ghost">Token schema</Link>
              </div>
            </RevealDiv>
            <RevealDiv>
              <CodeBlock filename="project.json (abbreviated)">
                <span className="cp">{'{'}</span>{'\n'}
                {'  '}<span className="cd">"slug"</span><span className="cp">:</span> <span className="cs">"my-saas"</span><span className="cp">,</span>{'\n'}
                {'  '}<span className="cd">"tokens"</span><span className="cp">: {'{'}</span>{'\n'}
                {'    '}<span className="cd">"color"</span><span className="cp">: {'{'}</span> <span className="cd">"brand"</span><span className="cp">: {'{'}</span> <span className="cd">"primary"</span><span className="cp">: {'{'}</span>{'\n'}
                {'      '}<span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"color"</span><span className="cp">,</span> <span className="cd">"value"</span><span className="cp">:</span> <span className="cs">"#4F46E5"</span>{'\n'}
                {'    '}<span className="cp">{'}'}</span><span className="cp">{'}}'}</span><span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
                {'    '}<span className="cd">"icons"</span><span className="cp">: {'{'}</span>{'\n'}
                {'      '}<span className="cd">"library"</span><span className="cp">:</span> <span className="cs">"lucide"</span><span className="cp">,</span>{'\n'}
                {'      '}<span className="cd">"icons"</span><span className="cp">: [</span><span className="cs">"lock"</span><span className="cp">,</span> <span className="cs">"zap"</span><span className="cp">,</span> <span className="cs">"globe"</span><span className="cp">]</span>{'\n'}
                {'    '}<span className="cp">{'}'}</span>{'\n'}
                {'  '}<span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
                {'  '}<span className="cd">"designSystem"</span><span className="cp">: {'{'}</span>{'\n'}
                {'    '}<span className="cd">"components"</span><span className="cp">: [{'{'}</span>{'\n'}
                {'      '}<span className="cd">"id"</span><span className="cp">:</span> <span className="cs">"feature-card"</span><span className="cp">,</span>{'\n'}
                {'      '}<span className="cd">"props"</span><span className="cp">: {'{'}</span> <span className="cd">"icon"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"icon"</span> <span className="cp">{'}'} {'}'}</span><span className="cp">,</span>{'\n'}
                {'      '}<span className="cd">"tokenBindings"</span><span className="cp">: {'{'}</span>{'\n'}
                {'        '}<span className="cd">"iconColor"</span><span className="cp">:</span> <span className="cs">"{'{color.brand.primary}'}"</span>{'\n'}
                {'      '}<span className="cp">{'}'}</span>{'\n'}
                {'    '}<span className="cp">{'}]'}</span>{'\n'}
                {'  '}<span className="cp">{'}'}</span>{'\n'}
                <span className="cp">{'}'}</span>
              </CodeBlock>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section--alt">
        <div className="wrap">
          <RevealDiv className="section__header">
            <span className="section__kicker">Workflow</span>
            <h2 className="h2">Four calls. A complete design system.</h2>
          </RevealDiv>
          <div className="split">
            <StaggerDiv className="steps">
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} className="step">
                  <div className="step__num">{n}</div>
                  <div>
                    <div className="step__title">{title}</div>
                    <p className="step__desc">{desc}</p>
                  </div>
                </div>
              ))}
            </StaggerDiv>
            <RevealDiv>
              <CodeBlock filename="terminal">
                <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm mcp</span>{'\n'}
                <span className="sh-out">inkboom MCP HTTP server started</span>{'\n'}
                <span className="sh-out">  port: 4778</span>{'\n'}
                {'\n'}
                <span className="cc"># 9 tools available:</span>{'\n'}
                <span className="cc">#   create_project   get_tokens</span>{'\n'}
                <span className="cc">#   set_tokens       get_design_system</span>{'\n'}
                <span className="cc">#   set_design_system list_components</span>{'\n'}
                <span className="cc">#   add_component    remove_component</span>{'\n'}
                <span className="cc">#   delete_project</span>{'\n'}
                {'\n'}
                <span className="cc"># Resolved bindings from get_design_system:</span>{'\n'}
                <span className="cc"># tokenBindings: {'{'}</span>{'\n'}
                <span className="cc">#   iconColor: "#4F46E5"  ← was {'{color.brand.primary}'}</span>{'\n'}
                <span className="cc">#   padding:   "24px"     ← was {'{spacing.lg}'}</span>{'\n'}
                <span className="cc"># {'}'}</span>
              </CodeBlock>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="wrap">
          <RevealDiv className="section__header">
            <span className="section__kicker">Features</span>
            <h2 className="h2">Everything the agent needs<br />to stay consistent</h2>
          </RevealDiv>
          <StaggerDiv className="feature-grid">
            {FEATURES.map(({ title, desc, icon }) => (
              <div key={title} className="feature-card">
                <div className="feature-card__icon">{icon}</div>
                <div className="feature-card__title">{title}</div>
                <p className="feature-card__desc">{desc}</p>
              </div>
            ))}
          </StaggerDiv>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="wrap">
          <RevealDiv style={{ maxWidth: 560 }}>
            <h2 className="h2 mb-md" style={{ color: 'var(--c-white)' }}>
              Give your agent<br />a <mark>design memory.</mark>
            </h2>
            <p className="body-lg mb-xl" style={{ color: 'var(--c-grey-500)' }}>
              Clone, install, start the server, and drop the SKILL.md into your Claude Code config.
              Under five minutes to your first validated design system.
            </p>
            <div className="flex flex-wrap gap-sm">
              <Link to="/docs" className="btn btn-primary">
                Get started
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a href="https://github.com/rhighs-lab/inkboom" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--c-mid)', color: 'var(--c-grey-400)' }}>View on GitHub</a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </>
  )
}
