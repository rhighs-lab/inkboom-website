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
      { href: '/docs/components', label: 'Component schema' },
      { href: '/docs/components#design-system-object', label: 'DesignSystem', indent: true },
      { href: '/docs/components#component-object', label: 'Component', indent: true },
      { href: '/docs/components#props', label: 'Props', indent: true },
      { href: '/docs/components#token-bindings', label: 'Token bindings', indent: true },
      { href: '/docs/components#required-components', label: 'Required components', indent: true },
      { href: '/docs/components#categories', label: 'Categories', indent: true },
      { href: '/docs/tools', label: 'MCP tools' },
    ],
  },
]

const REQUIRED = ['button','input','text','heading','container','card','image','divider','badge','link','checkbox','select','textarea','table','avatar','alert','tabs','dialog','progress','spinner']

const CATEGORIES = [
  ['action', 'Interactive elements', 'button, link'],
  ['form', 'User input', 'input, select, checkbox, textarea'],
  ['layout', 'Structural wrappers', 'container, card, hero, grid'],
  ['data-display', 'Content presentation', 'heading, text, badge, table, feature-card'],
  ['navigation', 'Wayfinding', 'nav, tabs, breadcrumb'],
  ['feedback', 'Status & notifications', 'alert, progress, spinner'],
  ['overlay', 'Modal & floating', 'dialog, drawer, popover'],
  ['utility', 'Helpers', 'divider, spacer'],
]

export default function Components() {
  return (
    <DocsLayout sections={sections}>
      <div className="breadcrumb">
        <Link to="/">inkboom</Link>
        <span>›</span>
        <Link to="/docs">Docs</Link>
        <span>›</span>
        <span>Component schema</span>
      </div>

      <h1>Component schema</h1>
      <p>The design system is a JSON object containing an array of component definitions, passed as the <code>designSystem</code> argument to <code>set_design_system</code>.</p>
      <p>Tokens must exist before a design system can be saved. Token binding references are resolved to raw values only when <code>get_design_system</code> is called.</p>

      <h2 id="design-system-object">DesignSystem</h2>
      <table className="docs-table">
        <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>$schema</td><td>string</td><td>yes</td><td><code>"https://design-tokens.org/schema.json"</code></td></tr>
          <tr><td>_meta.version</td><td>string</td><td>yes</td><td>Semver string</td></tr>
          <tr><td>_meta.generatedAt</td><td>string</td><td>yes</td><td>ISO 8601 timestamp</td></tr>
          <tr><td>components</td><td>Component[]</td><td>yes</td><td>Maximum 60 components.</td></tr>
        </tbody>
      </table>

      <h2 id="component-object">Component</h2>
      <table className="docs-table">
        <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>id</td><td>string</td><td>yes</td><td>Kebab-case, starts with a letter. Pattern: <code>/^[a-z][a-z0-9-]*$/</code></td></tr>
          <tr><td>displayName</td><td>string</td><td>yes</td><td>Human-readable name</td></tr>
          <tr><td>category</td><td>enum</td><td>yes</td><td>See categories below</td></tr>
          <tr><td>description</td><td>string</td><td>yes</td><td>At least 1 character</td></tr>
          <tr><td>isContainer</td><td>boolean</td><td>yes</td><td>Whether this component can hold others</td></tr>
          <tr><td>allowedChildren</td><td><code>"*" | string[] | "none"</code></td><td>yes</td><td>Which component IDs can be nested inside</td></tr>
          <tr><td>allowedParents</td><td><code>"*" | string[] | "root"</code></td><td>yes</td><td>Which component IDs can contain this</td></tr>
          <tr><td>props</td><td>Record&lt;string, Prop&gt;</td><td>yes</td><td>Can be empty <code>{'{}'}</code></td></tr>
          <tr><td>slots</td><td>string[]</td><td>yes</td><td>Named content slots. Can be empty <code>[]</code></td></tr>
          <tr><td>tokenBindings</td><td>Record&lt;string, string | VariantBinding&gt;</td><td>yes</td><td>Maps property names to token paths or literals</td></tr>
          <tr><td>requiredBindingKeys</td><td>BindingKey[]</td><td>no</td><td>Spacing keys enforced by the validator. Defaults to <code>[]</code></td></tr>
        </tbody>
      </table>

      <h2 id="props">Props</h2>
      <table className="docs-table">
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>type</td><td>enum</td><td><code>"string"</code> | <code>"number"</code> | <code>"boolean"</code> | <code>"enum"</code> | <code>"color"</code> | <code>"size"</code> | <code>"slot"</code> | <code>"icon"</code></td></tr>
          <tr><td>required</td><td>boolean</td><td>Default <code>false</code></td></tr>
          <tr><td>default</td><td>string | number | boolean | null</td><td>Default value when not provided</td></tr>
          <tr><td>description</td><td>string</td><td>Documentation string</td></tr>
          <tr><td>values</td><td>string[]</td><td>Allowed values when <code>type === "enum"</code></td></tr>
          <tr><td>content</td><td>ContentDef</td><td><code>"text"</code> | <code>"richText"</code> | <code>"image"</code> | <code>"link"</code> | <code>"number"</code> | <code>"date"</code></td></tr>
        </tbody>
      </table>

      <h3>The icon prop type</h3>
      <p>Props with <code>type: "icon"</code> signal to the agent that this prop receives an icon name from <code>tokens.icons.icons[]</code>. The agent inlines the correct SVG path data — no CDN, no icon sprite.</p>

      <h2 id="token-bindings">Token bindings</h2>

      <h3>Static binding</h3>
      <CodeBlock>
        <span className="cd">"tokenBindings"</span><span className="cp">: {'{'}</span>{'\n'}
        {'  '}<span className="cd">"backgroundColor"</span><span className="cp">:</span> <span className="cs">"{'{color.brand.primary}'}"</span><span className="cp">,</span>  <span className="cc">// → "#4F46E5"</span>{'\n'}
        {'  '}<span className="cd">"padding"</span><span className="cp">:</span>          <span className="cs">"{'{spacing.lg}'}"</span><span className="cp">,</span>           <span className="cc">// → "24px"</span>{'\n'}
        {'  '}<span className="cd">"borderWidth"</span><span className="cp">:</span>      <span className="cs">"1px"</span>                    <span className="cc">// literal pass-through</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      <h3>Variant binding</h3>
      <CodeBlock>
        <span className="cd">"tokenBindings"</span><span className="cp">: {'{'}</span>{'\n'}
        {'  '}<span className="cd">"fontSize"</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">"sm"</span><span className="cp">:</span> <span className="cs">"{'{typography.fontSize.sm}'}"</span><span className="cp">,</span>  <span className="cc">// → "13px"</span>{'\n'}
        {'    '}<span className="cd">"md"</span><span className="cp">:</span> <span className="cs">"{'{typography.fontSize.md}'}"</span>   <span className="cc">// → "15px"</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      <h2 id="required-components">Required components</h2>
      <p>The design system must include these 20 component IDs. <code>set_design_system</code> fails if any are missing:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-xs)', marginBottom: 'var(--sp-xl)' }}>
        {REQUIRED.map(id => <code key={id}>{id}</code>)}
      </div>

      <h2 id="categories">Categories</h2>
      <table className="docs-table">
        <thead><tr><th>Category</th><th>Intended use</th><th>Examples</th></tr></thead>
        <tbody>
          {CATEGORIES.map(([cat, use, ex]) => (
            <tr key={cat}><td>{cat}</td><td>{use}</td><td>{ex}</td></tr>
          ))}
        </tbody>
      </table>

      <h2 id="full-example">Full component example</h2>
      <CodeBlock filename="feature-card definition">
        <span className="cp">{'{'}</span>{'\n'}
        {'  '}<span className="cd">"id"</span><span className="cp">:</span>           <span className="cs">"feature-card"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"displayName"</span><span className="cp">:</span>  <span className="cs">"Feature Card"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"category"</span><span className="cp">:</span>     <span className="cs">"data-display"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"isContainer"</span><span className="cp">:</span>  <span className="ck">false</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"allowedChildren"</span><span className="cp">:</span> <span className="cs">"none"</span><span className="cp">,</span>  <span className="cd">"allowedParents"</span><span className="cp">:</span> <span className="cs">"*"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"props"</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">"icon"</span><span className="cp">:  {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"icon"</span><span className="cp">,</span>   <span className="cd">"required"</span><span className="cp">:</span> <span className="ck">true</span>  <span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">"title"</span><span className="cp">: {'{'}</span> <span className="cd">"type"</span><span className="cp">:</span> <span className="cs">"string"</span><span className="cp">,</span> <span className="cd">"required"</span><span className="cp">:</span> <span className="ck">true</span>  <span className="cp">{'}'}</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"slots"</span><span className="cp">: []</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"tokenBindings"</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">"backgroundColor"</span><span className="cp">:</span> <span className="cs">"{'{color.background.surface}'}"</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">"padding"</span><span className="cp">:</span>         <span className="cs">"{'{spacing.lg}'}"</span><span className="cp">,</span>{'\n'}
        {'    '}<span className="cd">"iconColor"</span><span className="cp">:</span>       <span className="cs">"{'{color.brand.primary}'}"</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"requiredBindingKeys"</span><span className="cp">: [</span><span className="cs">"padding"</span><span className="cp">]</span>{'\n'}
        <span className="cp">{'}'}</span>{'\n'}
        {'\n'}
        <span className="cc">// After get_design_system — bindings resolved:</span>{'\n'}
        <span className="cp">{'{'}</span> <span className="cd">"backgroundColor"</span><span className="cp">:</span> <span className="cs">"#FAFAFA"</span><span className="cp">,</span> <span className="cd">"padding"</span><span className="cp">:</span> <span className="cs">"24px"</span><span className="cp">,</span> <span className="cd">"iconColor"</span><span className="cp">:</span> <span className="cs">"#4F46E5"</span> <span className="cp">{'}'}</span>
      </CodeBlock>

      <div style={{ marginTop: 'var(--sp-3xl)', paddingTop: 'var(--sp-lg)', borderTop: '1px solid var(--c-grey-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-md)' }}>
        <Link to="/docs/tokens" className="btn btn-ghost">← Token schema</Link>
        <Link to="/docs/tools" className="btn btn-primary">Next: MCP tools →</Link>
      </div>
    </DocsLayout>
  )
}
