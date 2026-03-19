import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import CodeBlock from '../../components/CodeBlock'

const sections = [
  {
    title: 'Getting started',
    links: [
      { href: '/docs', label: 'Overview' },
      { href: '/docs#installation', label: 'Installation' },
      { href: '/docs#first-project', label: 'First project' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { href: '/docs/tokens', label: 'Token schema' },
      { href: '/docs/tokens#top-level', label: 'Top-level structure', indent: true },
      { href: '/docs/tokens#color', label: 'color', indent: true },
      { href: '/docs/tokens#spacing', label: 'spacing', indent: true },
      { href: '/docs/tokens#typography', label: 'typography', indent: true },
      { href: '/docs/tokens#shadow', label: 'shadow', indent: true },
      { href: '/docs/tokens#border-radius', label: 'borderRadius', indent: true },
      { href: '/docs/tokens#layout', label: 'layout (optional)', indent: true },
      { href: '/docs/tokens#icons', label: 'icons (optional)', indent: true },
      { href: '/docs/tokens#full-example', label: 'Full example', indent: true },
      { href: '/docs/components', label: 'Component schema' },
      { href: '/docs/tools', label: 'MCP tools' },
    ],
  },
]

export default function Tokens() {
  return (
    <DocsLayout sections={sections}>
      <div className="breadcrumb">
        <Link to="/">inkboom</Link>
        <span>›</span>
        <Link to="/docs">Docs</Link>
        <span>›</span>
        <span>Token schema</span>
      </div>

      <h1>Token schema</h1>
      <p>The token artifact is a single JSON object validated by a Zod schema before being persisted. It is passed as the <code>tokens</code> argument to <code>set_tokens</code>.</p>

      <div className="callout callout--info">
        All five top-level categories — <code>color</code>, <code>spacing</code>, <code>typography</code>, <code>shadow</code>, <code>borderRadius</code> — are <strong>required</strong>. <code>layout</code> and <code>icons</code> are optional.
      </div>

      <h2 id="top-level">Top-level structure</h2>
      <table className="docs-table">
        <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>$schema</td><td>string</td><td>yes</td><td>Must be <code>"https://design-tokens.org/schema.json"</code></td></tr>
          <tr><td>_meta.version</td><td>string</td><td>yes</td><td>Semver string, e.g. <code>"1.0.0"</code></td></tr>
          <tr><td>_meta.generatedAt</td><td>string</td><td>yes</td><td>ISO 8601 timestamp</td></tr>
          <tr><td>color</td><td>ColorGroup</td><td>yes</td><td>Brand, semantic, text, background, border colours</td></tr>
          <tr><td>spacing</td><td>SpacingGroup</td><td>yes</td><td>xs → 2xl dimension scale (3xl optional)</td></tr>
          <tr><td>typography</td><td>TypographyGroup</td><td>yes</td><td>fontFamily, fontSize, fontWeight, lineHeight</td></tr>
          <tr><td>shadow</td><td>ShadowGroup</td><td>yes</td><td>subtle, prominent (focus optional)</td></tr>
          <tr><td>borderRadius</td><td>BorderRadiusGroup</td><td>yes</td><td>tight, relaxed (full optional)</td></tr>
          <tr><td>layout</td><td>LayoutGroup</td><td>no</td><td>containerMaxWidth plus sm/md/lg/xl breakpoints</td></tr>
          <tr><td>icons</td><td>IconsGroup</td><td>no</td><td>Icon library declaration with icon name list</td></tr>
        </tbody>
      </table>

      <h2 id="color">color</h2>
      <p>All colour values must be <strong>6-digit lowercase hex</strong> (<code>#rrggbb</code>). 3-digit shorthand is rejected.</p>

      <table className="docs-table">
        <thead><tr><th>Path</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>color.brand.primary</td><td>yes</td><td>Main brand colour</td></tr>
          <tr><td>color.brand.secondary</td><td>yes</td><td>Supporting brand colour</td></tr>
          <tr><td>color.semantic.error</td><td>yes</td><td>Error / destructive state</td></tr>
          <tr><td>color.semantic.warning</td><td>yes</td><td>Warning state</td></tr>
          <tr><td>color.semantic.success</td><td>yes</td><td>Success state</td></tr>
          <tr><td>color.semantic.neutral</td><td>yes</td><td>Neutral / informational</td></tr>
          <tr><td>color.text.*</td><td>yes</td><td>Open record — primary, secondary, inverse, etc.</td></tr>
          <tr><td>color.background.*</td><td>yes</td><td>Open record — base, surface, subtle, dark, etc.</td></tr>
          <tr><td>color.border.*</td><td>yes</td><td>Open record — default, strong, dark, etc.</td></tr>
        </tbody>
      </table>

      <div className="callout callout--warn">
        <strong>WCAG AA contrast:</strong> text colours must achieve ≥4.5:1 contrast ratio against their intended backgrounds.
      </div>

      <h2 id="spacing">spacing</h2>
      <p>All values must include a CSS unit (<code>px</code>, <code>rem</code>, or <code>em</code>). Must be strictly increasing: <code>xs &lt; sm &lt; md &lt; lg &lt; xl &lt; 2xl</code>.</p>

      <table className="docs-table">
        <thead><tr><th>Key</th><th>Required</th><th>Example</th></tr></thead>
        <tbody>
          {[['spacing.xs','yes','"4px"'],['spacing.sm','yes','"8px"'],['spacing.md','yes','"16px"'],['spacing.lg','yes','"24px"'],['spacing.xl','yes','"40px"'],['spacing.2xl','yes','"64px"'],['spacing.3xl','no','"96px"']].map(([k,r,e]) => (
            <tr key={k}><td>{k}</td><td>{r}</td><td><code>{e}</code></td></tr>
          ))}
        </tbody>
      </table>

      <h2 id="typography">typography</h2>
      <table className="docs-table">
        <thead><tr><th>Path</th><th>Required</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>typography.fontFamily.body</td><td>yes</td><td>Full font stack string</td></tr>
          <tr><td>typography.fontFamily.heading</td><td>yes</td><td>Full font stack string</td></tr>
          <tr><td>typography.fontSize.xs – 2xl</td><td>yes</td><td>Must have unit. <code>3xl</code> is optional.</td></tr>
          <tr><td>typography.fontWeight.*</td><td>yes</td><td>Open record. Values 100–900 or 3-digit string.</td></tr>
          <tr><td>typography.lineHeight.*</td><td>yes</td><td>Open record. Unitless numbers like <code>1.5</code>.</td></tr>
        </tbody>
      </table>

      <h2 id="shadow">shadow</h2>
      <p>Shadow values can be a raw CSS string or a structured object with <code>offsetX</code>, <code>offsetY</code>, <code>blur</code>, <code>spread</code>, <code>color</code>.</p>

      <h2 id="border-radius">borderRadius</h2>
      <table className="docs-table">
        <thead><tr><th>Key</th><th>Required</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>borderRadius.tight</td><td>yes</td><td><code>"2px"</code> or <code>"4px"</code></td></tr>
          <tr><td>borderRadius.relaxed</td><td>yes</td><td><code>"8px"</code></td></tr>
          <tr><td>borderRadius.full</td><td>no</td><td><code>"9999px"</code></td></tr>
        </tbody>
      </table>

      <h2 id="layout">layout (optional)</h2>
      <p>Breakpoints must be strictly increasing. If omitted the agent defaults to <code>sm: 640px / md: 768px / lg: 1024px / xl: 1280px</code>.</p>

      <CodeBlock>
        <span className="cd">"layout"</span><span className="cp">: {'{'}</span>{'\n'}
        {'  '}<span className="cd">"containerMaxWidth"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"dimension"</span><span className="cp">,</span> <span className="cd">"value"</span><span className="cp">:</span> <span className="cs">"1120px"</span> <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"sm"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"dimension"</span><span className="cp">,</span> <span className="cd">"value"</span><span className="cp">:</span> <span className="cs">"640px"</span>  <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"md"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"dimension"</span><span className="cp">,</span> <span className="cd">"value"</span><span className="cp">:</span> <span className="cs">"768px"</span>  <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"lg"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"dimension"</span><span className="cp">,</span> <span className="cd">"value"</span><span className="cp">:</span> <span className="cs">"1024px"</span> <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"xl"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"dimension"</span><span className="cp">,</span> <span className="cd">"value"</span><span className="cp">:</span> <span className="cs">"1280px"</span> <span className="cp">{'}'}</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      <h2 id="icons">icons (optional)</h2>
      <table className="docs-table">
        <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>library</td><td>yes</td><td><code>"lucide"</code> or <code>"heroicons"</code></td></tr>
          <tr><td>style</td><td>no</td><td><code>"outline"</code> | <code>"solid"</code> | <code>"mini"</code></td></tr>
          <tr><td>version</td><td>no</td><td>Pinned version string</td></tr>
          <tr><td>icons</td><td>yes</td><td>Array of icon names to inline</td></tr>
        </tbody>
      </table>

      <h2 id="full-example">Full example</h2>
      <CodeBlock filename="minimal valid token artifact">
        <span className="cp">{'{'}</span>{'\n'}
        {'  '}<span className="cd">"$schema"</span><span className="cp">:</span>    <span className="cs">"https://design-tokens.org/schema.json"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"_meta"</span><span className="cp">: {'{'}</span> <span className="cd">"version"</span><span className="cp">:</span> <span className="cs">"1.0.0"</span><span className="cp">,</span> <span className="cd">"generatedAt"</span><span className="cp">:</span> <span className="cs">"2026-01-01T00:00:00Z"</span> <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"color"</span><span className="cp">:</span>       <span className="cv">{'{ ... }'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"spacing"</span><span className="cp">:</span>    <span className="cv">{'{ xs:"4px", sm:"8px", md:"16px", lg:"24px", xl:"40px", "2xl":"64px" }'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"typography"</span><span className="cp">:</span> <span className="cv">{'{ ... }'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"shadow"</span><span className="cp">:</span>     <span className="cv">{'{ subtle: { type:"shadow", value:"0 1px 3px 0 rgba(0,0,0,.10)" }, prominent: { ... } }'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"borderRadius"</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">"tight"</span><span className="cp">:</span>   <span className="cv">{'{ "type":"borderRadius", "value":"2px" }'}</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">"relaxed"</span><span className="cp">:</span> <span className="cv">{'{ "type":"borderRadius", "value":"8px" }'}</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      <div style={{ marginTop: 'var(--sp-3xl)', paddingTop: 'var(--sp-lg)', borderTop: '1px solid var(--c-grey-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-md)' }}>
        <Link to="/docs" className="btn btn-ghost">← Getting started</Link>
        <Link to="/docs/components" className="btn btn-primary">Next: Components →</Link>
      </div>
    </DocsLayout>
  )
}
