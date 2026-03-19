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
      { href: '/docs/tools', label: 'MCP tools' },
      { href: '/docs/tools#create-project', label: 'create_project', indent: true },
      { href: '/docs/tools#delete-project', label: 'delete_project', indent: true },
      { href: '/docs/tools#get-tokens', label: 'get_tokens', indent: true },
      { href: '/docs/tools#set-tokens', label: 'set_tokens', indent: true },
      { href: '/docs/tools#get-design-system', label: 'get_design_system', indent: true },
      { href: '/docs/tools#set-design-system', label: 'set_design_system', indent: true },
      { href: '/docs/tools#list-components', label: 'list_components', indent: true },
      { href: '/docs/tools#add-component', label: 'add_component', indent: true },
      { href: '/docs/tools#remove-component', label: 'remove_component', indent: true },
      { href: '/docs/tools#errors', label: 'Errors', indent: true },
    ],
  },
]

const ERRORS = [
  ['VALIDATION_FAILED', 'set_tokens, set_design_system, add_component', 'Schema or business validation failed. The errors array has details.'],
  ['NO_TOKENS', 'set_design_system, add_component', 'Tokens must be set before a design system can be written.'],
  ['NO_DESIGN_SYSTEM', 'add_component, remove_component', 'A design system must exist before components can be added or removed.'],
  ['COMPONENT_EXISTS', 'add_component', 'A component with this ID already exists.'],
  ['COMPONENT_NOT_FOUND', 'remove_component', 'No component with this ID exists.'],
  ['PROJECT_NOT_FOUND', 'any tool with projectId', 'No project with this slug was found on disk.'],
  ['PROJECT_EXISTS', 'create_project', 'A project with this slug exists. Pass overwrite: true to reset it.'],
  ['MISSING_REQUIRED_BINDING_KEY', 'set_design_system, add_component', 'A required binding key is absent from tokenBindings.'],
]

export default function Tools() {
  return (
    <DocsLayout sections={sections}>
      <div className="breadcrumb">
        <Link to="/">inkboom</Link>
        <span>›</span>
        <Link to="/docs">Docs</Link>
        <span>›</span>
        <span>MCP tools</span>
      </div>

      <h1>MCP tools</h1>
      <p>inkboom exposes 9 tools via the MCP Streamable HTTP transport on <code>POST http://localhost:4778/mcp</code>. All tools return structured JSON. Errors include a <code>code</code> field and a human-readable <code>message</code>.</p>

      <div className="callout callout--info">
        <strong>Call order:</strong> <code>create_project</code> → <code>set_tokens</code> → <code>set_design_system</code>. <code>add_component</code> and <code>remove_component</code> require an existing design system. <code>get_tokens</code> and <code>get_design_system</code> require tokens to have been set.
      </div>

      <table className="docs-table" style={{ marginBottom: 'var(--sp-xl)' }}>
        <thead><tr><th>Tool</th><th>Description</th></tr></thead>
        <tbody>
          {[['create_project','Create an empty project'],['delete_project','Delete a project permanently'],['get_tokens','Read the token artifact'],['set_tokens','Write and validate the token artifact'],['get_design_system','Read components with resolved token bindings'],['set_design_system','Write and validate all components'],['list_components','List component IDs, names, categories'],['add_component','Append a single component'],['remove_component','Remove a component by ID']].map(([t,d]) => (
            <tr key={t}><td>{t}</td><td>{d}</td></tr>
          ))}
        </tbody>
      </table>

      {/* ── create_project ── */}
      <h2 id="create-project">create_project</h2>
      <p>Creates an empty project at <code>~/.inkboom/projects/&lt;slug&gt;/project.json</code>.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>slug</td><td>string</td><td>yes</td><td>URL-safe identifier. Lowercase alphanumeric + hyphens.</td></tr>
          <tr><td>brief</td><td>string</td><td>yes</td><td>Plain-English description. 10–2000 chars.</td></tr>
          <tr><td>overwrite</td><td>boolean</td><td>no</td><td>Replace existing project. Defaults to <code>false</code>.</td></tr>
        </tbody>
      </table>
      <CodeBlock>
        <span className="cp">{'{'}</span>{'\n'}
        {'  '}<span className="cd">"projectId"</span><span className="cp">:</span>  <span className="cs">"my-site"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"createdAt"</span><span className="cp">:</span>  <span className="cs">"2026-01-01T12:00:00.000Z"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"message"</span><span className="cp">:</span>    <span className="cs">"Empty project created..."</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      {/* ── delete_project ── */}
      <h2 id="delete-project">delete_project</h2>
      <p>Deletes the project directory. <strong>Irreversible.</strong></p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th></tr></thead>
        <tbody><tr><td>projectId</td><td>string</td><td>yes</td></tr></tbody>
      </table>

      {/* ── get_tokens ── */}
      <h2 id="get-tokens">get_tokens</h2>
      <p>Returns the complete token artifact as stored — token references are <em>not</em> resolved.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th></tr></thead>
        <tbody><tr><td>projectId</td><td>string</td><td>yes</td></tr></tbody>
      </table>

      {/* ── set_tokens ── */}
      <h2 id="set-tokens">set_tokens</h2>
      <p>Validates and persists the token artifact. Replaces any existing tokens.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>projectId</td><td>string</td><td>yes</td><td>Target project slug</td></tr>
          <tr><td>tokens</td><td>TokenValuesArtifact</td><td>yes</td><td>Complete token object. See <Link to="/docs/tokens">Token schema</Link>.</td></tr>
        </tbody>
      </table>
      <CodeBlock>
        <span className="cc">// Success</span>{'\n'}
        <span className="cp">{'{'}</span> <span className="cd">"success"</span><span className="cp">:</span> <span className="ck">true</span> <span className="cp">{'}'}</span>{'\n\n'}
        <span className="cc">// Validation failure</span>{'\n'}
        <span className="cp">{'{'}</span>{'\n'}
        {'  '}<span className="cd">"error"</span><span className="cp">:</span>  <span className="cs">"VALIDATION_FAILED"</span><span className="cp">,</span>{'\n'}
        {'  '}<span className="cd">"errors"</span><span className="cp">: [{'{'}</span> <span className="cd">"code"</span><span className="cp">:</span> <span className="cs">"MISSING_REQUIRED_CATEGORY"</span><span className="cp">,</span> <span className="cd">"path"</span><span className="cp">:</span> <span className="cs">"/shadow"</span><span className="cp">,</span> <span className="cd">"message"</span><span className="cp">:</span> <span className="cs">"..."</span> <span className="cp">{'}]'}</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      {/* ── get_design_system ── */}
      <h2 id="get-design-system">get_design_system</h2>
      <p>Returns all components with <code>tokenBindings</code> fully resolved to raw values. This is the tool the agent calls before generating HTML.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th></tr></thead>
        <tbody><tr><td>projectId</td><td>string</td><td>yes</td></tr></tbody>
      </table>
      <CodeBlock>
        <span className="cp">{'{'}</span>{'\n'}
        {'  '}<span className="cd">"designSystem"</span><span className="cp">: {'{'}</span>{'\n'}
        {'    '}<span className="cd">"components"</span><span className="cp">: [{'{'}</span>{'\n'}
        {'      '}<span className="cd">"id"</span><span className="cp">:</span> <span className="cs">"feature-card"</span><span className="cp">,</span>{'\n'}
        {'      '}<span className="cd">"tokenBindings"</span><span className="cp">: {'{'}</span>{'\n'}
        {'        '}<span className="cd">"iconColor"</span><span className="cp">:</span> <span className="cs">"#4F46E5"</span><span className="cp">,</span>  <span className="cc">// was {'{color.brand.primary}'}</span>{'\n'}
        {'        '}<span className="cd">"padding"</span><span className="cp">:</span>   <span className="cs">"24px"</span>     <span className="cc">// was {'{spacing.lg}'}</span>{'\n'}
        {'      '}<span className="cp">{'}'}</span>{'\n'}
        {'    '}<span className="cp">{'}]'}</span>{'\n'}
        {'  '}<span className="cp">{'}'}</span>{'\n'}
        <span className="cp">{'}'}</span>
      </CodeBlock>

      {/* ── set_design_system ── */}
      <h2 id="set-design-system">set_design_system</h2>
      <p>Validates and persists all components. Requires tokens to exist first. Replaces any existing design system.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>projectId</td><td>string</td><td>yes</td><td>Target project slug</td></tr>
          <tr><td>designSystem</td><td>DesignSystem</td><td>yes</td><td>Complete design system. See <Link to="/docs/components">Component schema</Link>.</td></tr>
        </tbody>
      </table>

      {/* ── list_components ── */}
      <h2 id="list-components">list_components</h2>
      <p>Returns a lightweight list of all components — ID, displayName, category, description only.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th></tr></thead>
        <tbody><tr><td>projectId</td><td>string</td><td>yes</td></tr></tbody>
      </table>

      {/* ── add_component ── */}
      <h2 id="add-component">add_component</h2>
      <p>Appends a single component to the existing design system. Fails if a component with the same ID already exists.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>projectId</td><td>string</td><td>yes</td><td>Target project slug</td></tr>
          <tr><td>component</td><td>Component</td><td>yes</td><td>The component to add</td></tr>
        </tbody>
      </table>
      <CodeBlock>
        <span className="cp">{'{'}</span> <span className="cd">"success"</span><span className="cp">:</span> <span className="ck">true</span><span className="cp">,</span> <span className="cd">"componentId"</span><span className="cp">:</span> <span className="cs">"pricing-card"</span> <span className="cp">{'}'}</span>
      </CodeBlock>

      {/* ── remove_component ── */}
      <h2 id="remove-component">remove_component</h2>
      <p>Removes a component by ID. Fails if the component does not exist.</p>
      <table className="docs-table">
        <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>projectId</td><td>string</td><td>yes</td><td>Target project slug</td></tr>
          <tr><td>componentId</td><td>string</td><td>yes</td><td>ID of the component to remove</td></tr>
        </tbody>
      </table>

      {/* ── Errors ── */}
      <h2 id="errors">Error codes</h2>
      <table className="docs-table">
        <thead><tr><th>Code</th><th>Returned by</th><th>Meaning</th></tr></thead>
        <tbody>
          {ERRORS.map(([code, by, meaning]) => (
            <tr key={code}><td>{code}</td><td>{by}</td><td>{meaning}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>Debug mode</h3>
      <CodeBlock filename="terminal">
        <span className="sh-prompt">❯ </span><span className="sh-cmd">INKBOOM_DEBUG=1 pnpm mcp</span>
      </CodeBlock>

      <div style={{ marginTop: 'var(--sp-3xl)', paddingTop: 'var(--sp-lg)', borderTop: '1px solid var(--c-grey-200)' }}>
        <Link to="/docs/components" className="btn btn-ghost">← Component schema</Link>
      </div>
    </DocsLayout>
  )
}
