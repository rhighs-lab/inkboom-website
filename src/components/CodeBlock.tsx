interface CodeBlockProps {
  filename?: string
  children: React.ReactNode
}

export default function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__dot" />
        <span className="code-block__dot" />
        <span className="code-block__dot" />
        {filename && <span className="code-block__fname">{filename}</span>}
      </div>
      <div className="code-block__body">
        <pre>{children}</pre>
      </div>
    </div>
  )
}
