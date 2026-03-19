import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import CodeBlock from '../../components/CodeBlock'

const sections = [
  {
    title: 'Getting started',
    links: [
      { href: '/docs', label: 'Overview' },
      { href: '/docs#installation', label: 'Installation' },
      { href: '/docs#mcp-clients', label: 'MCP clients' },
      { href: '/docs#skill-md', label: 'SKILL.md' },
      { href: '/docs#first-project', label: 'First project' },
      { href: '/docs#env', label: 'Environment variables' },
      { href: '/docs#development', label: 'Development' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { href: '/docs/tokens', label: 'Token schema' },
      { href: '/docs/components', label: 'Component schema' },
      { href: '/docs/tools', label: 'MCP tools' },
    ],
  },
]

export default function GettingStarted() {
  return (
    <DocsLayout sections={sections}>
      <div className="breadcrumb">
        <Link to="/">inkboom</Link>
        <span>›</span>
        <span>Getting started</span>
      </div>

      <h1>Getting started</h1>
      <p>inkboom is an MCP server that gives your AI agent a persistent design system — validated tokens, component definitions, and resolved token bindings — so that every page it generates is visually consistent.</p>

      <div className="callout callout--info">
        <strong>Prerequisites:</strong> Node 22+, pnpm. The server runs on <code>localhost:4778/mcp</code> using the MCP Streamable HTTP transport.
      </div>

      <h2 id="installation">Installation</h2>
      <p>Clone the repository and install dependencies:</p>

      <CodeBlock filename="terminal">
        <span className="sh-prompt">❯ </span><span className="sh-cmd">git clone https://github.com/rhighs-lab/inkboom</span>{'\n'}
        <span className="sh-prompt">❯ </span><span className="sh-cmd">cd inkboom</span>{'\n'}
        <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm install</span>
      </CodeBlock>

      <p>Start the MCP server:</p>

      <CodeBlock filename="terminal">
        <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm mcp</span>{'\n'}
        <span className="sh-out">{'{"level":"info","port":4778,"msg":"inkboom MCP HTTP server started"}'}</span>
      </CodeBlock>

      <p>The server runs at <code>http://localhost:4778/mcp</code>. Projects are stored at <code>~/.inkboom/projects/&lt;slug&gt;/project.json</code>.</p>

      <h2 id="mcp-clients">MCP clients</h2>

      <h3>Claude Code (recommended)</h3>
      <p>Add to your <code>claude_desktop_config.json</code>:</p>

      <CodeBlock filename="claude_desktop_config.json">
        <span className="cp">{'{'}</span>{'\n'}
        {'  '}<span className="cd">"mcpServers"</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">"inkboom"</span><span className="cp">: {'{'}</span>{'\n'}
        {'      '}<span className="cd">"command"</span><span className="cp">:</span> <span className="cs">"npx"</span><span className="cp">,</span>{'\n'}
        {'      '}<span className="cd">"args"</span><span className="cp">: [</span><span className="cs">"tsx"</span><span className="cp">,</span> <span className="cs">"/path/to/inkboom/src/mcp/http-server.ts"</span><span className="cp">]</span>{'\n'}
        {'    '}<span className="cp">{'}'}</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      <h3>Cursor / other MCP clients</h3>
      <p>Start the server with <code>pnpm mcp</code>, then point your client at <code>http://localhost:4778/mcp</code>. The server uses the MCP Streamable HTTP transport (POST to <code>/mcp</code>).</p>

      <h2 id="skill-md">SKILL.md</h2>
      <p>inkboom ships a <code>SKILL.md</code> designed to be loaded as a Claude Code skill. It instructs the agent on the designer workflow, token rules, component guidelines, and icon rendering strategy.</p>

      <p>Reference it from your <code>CLAUDE.md</code>:</p>

      <CodeBlock filename="CLAUDE.md">
        <span className="cc"># Load the inkboom design skill</span>{'\n'}
        <span className="cv">Read /path/to/inkboom/SKILL.md before any design or UI work.</span>
      </CodeBlock>

      <p>The SKILL.md covers:</p>
      <ul>
        <li>The correct tool call order (<code>create_project</code> → <code>set_tokens</code> → <code>set_design_system</code>)</li>
        <li>Token constraints: 6-digit hex, unit-suffixed dimensions, WCAG AA contrast</li>
        <li>Component requirements: which 20 base components must always exist</li>
        <li>Icon rendering: inline SVG from <code>tokens.icons</code>, never emoji</li>
        <li>Breakpoint usage from <code>tokens.layout</code></li>
      </ul>

      <h2 id="first-project">First project</h2>

      <CodeBlock filename="agent conversation (abbreviated)">
        <span className="cc">// 1 — create an empty project</span>{'\n'}
        <span className="cf">create_project</span><span className="cp">({'{'}</span>{'\n'}
        {'  '}<span className="cd">slug</span><span className="cp">:</span> <span className="cs">"my-site"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">brief</span><span className="cp">:</span> <span className="cs">"SaaS landing. Minimal, light, indigo accent."</span>{'\n'}
        <span className="cp">{'})'}</span>{'\n'}
        {'\n'}
        <span className="cc">// 2 — set tokens</span>{'\n'}
        <span className="cf">set_tokens</span><span className="cp">({'{'}</span> <span className="cd">projectId</span><span className="cp">:</span> <span className="cs">"my-site"</span><span className="cp">,</span> <span className="cd">tokens</span><span className="cp">:</span> <span className="cv">{'{ ... }'}</span> <span className="cp">{'})'}</span>{'\n'}
        {'\n'}
        <span className="cc">// 3 — define components</span>{'\n'}
        <span className="cf">set_design_system</span><span className="cp">({'{'}</span> <span className="cd">projectId</span><span className="cp">:</span> <span className="cs">"my-site"</span><span className="cp">,</span> <span className="cd">designSystem</span><span className="cp">:</span> <span className="cv">{'{ ... }'}</span> <span className="cp">{'})'}</span>{'\n'}
        {'\n'}
        <span className="cc">// 4 — get resolved values, generate HTML</span>{'\n'}
        <span className="cf">get_design_system</span><span className="cp">({'{'}</span> <span className="cd">projectId</span><span className="cp">:</span> <span className="cs">"my-site"</span> <span className="cp">{'})'}</span>{'\n'}
        <span className="cc">// tokenBindings: {'{ iconColor: "#4F46E5" }'} ← resolved</span>
      </CodeBlock>

      <div className="callout callout--warn">
        <strong>Ordering constraint:</strong> <code>set_tokens</code> must be called before <code>set_design_system</code>. <code>add_component</code> and <code>remove_component</code> require an existing design system.
      </div>

      <h3>Incremental updates</h3>

      <CodeBlock>
        <span className="cf">add_component</span><span className="cp">({'{'}</span>{'\n'}
        {'  '}<span className="cd">projectId</span><span className="cp">:</span> <span className="cs">"my-site"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">component</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">id</span><span className="cp">:</span> <span className="cs">"pricing-card"</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">displayName</span><span className="cp">:</span> <span className="cs">"Pricing Card"</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">category</span><span className="cp">:</span> <span className="cs">"data-display"</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">tokenBindings</span><span className="cp">: {'{'}</span> <span className="cd">padding</span><span className="cp">:</span> <span className="cs">"{'{spacing.lg}'}"</span> <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">requiredBindingKeys</span><span className="cp">: [</span><span className="cs">"padding"</span><span className="cp">]</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span>{'\n'}
        <span className="cp">{'})'}</span>
      </CodeBlock>

      <h2 id="env">Environment variables</h2>
      <table className="docs-table">
        <thead><tr><th>Variable</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr>
            <td>INKBOOM_DEBUG</td>
            <td>—</td>
            <td>Set to any value to log raw token/component output on validation failure.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="development">Development</h2>

      <CodeBlock filename="terminal">
        <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm test</span>{'       '}<span className="cc"># run tests with vitest</span>{'\n'}
        <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm typecheck</span>{'  '}<span className="cc"># tsc --noEmit</span>{'\n'}
        <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm format</span>{'     '}<span className="cc"># prettier --write .</span>{'\n'}
        <span className="sh-prompt">❯ </span><span className="sh-cmd">pnpm build</span>{'      '}<span className="cc"># tsc (emits to dist/)</span>
      </CodeBlock>

      <div style={{ marginTop: 'var(--sp-3xl)', paddingTop: 'var(--sp-lg)', borderTop: '1px solid var(--c-grey-200)', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/docs/tokens" className="btn btn-primary">
          Next: Token schema
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </div>
    </DocsLayout>
  )
}
