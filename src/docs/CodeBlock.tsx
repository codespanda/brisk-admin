import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="brisk-docs__code">
      <div className="brisk-docs__code-head">
        <span className="brisk-docs__code-lang">{lang}</span>
        <button
          type="button"
          onClick={copy}
          className={`brisk-docs__copy${copied ? ' is-copied' : ''}`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
