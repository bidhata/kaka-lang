import { useState, useRef } from 'react'
import './App.css'
import { tokenize } from './core/tokenizer'
import { Parser } from './core/parser'
import { Interpreter } from './core/interpreter'
import BlockEditor from './BlockEditor'

function App() {
  const [mode, setMode] = useState<'text' | 'blocks'>('blocks');
  const [code, setCode] = useState(`ও কাকা
  কাকা রাখো a = 10;
  কাকা রাখো b = 20;
  
  কাকা বলো "যোগফল:";
  কাকা বলো a + b;

  যদি কাকা (a > 5) {
     কাকা বলো "a ৫ এর থেকে বড়";
  }

  কাকা রাখো i = 0;
  যতক্ষণ কাকা (i < 3) {
     কাকা বলো i;
     i = i + 1;
  }
আসি কাকা`)
  const [output, setOutput] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertKeyword = (kw: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value; // Use current value from DOM to avoid stale closure issues safely

    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    const newValue = before + kw + " " + after;
    setCode(newValue);

    // Defer cursor move to after render
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = start + kw.length + 1;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const runCode = () => {
    setOutput([]);
    setError(null);
    const logs: string[] = [];

    try {
      if (!code.trim()) {
        setError("Code is empty");
        return;
      }

      const tokens = tokenize(code);
      const parser = new Parser(tokens);
      const ast = parser.parse();

      const interpreter = new Interpreter((msg: any) => {
        logs.push(String(msg));
      });

      interpreter.interpret(ast);
      setOutput(logs);
    } catch (e: any) {
      setError(e.message);
      // Still show logs if any before error
      setOutput(logs);
    }
  }

  if (mode === 'blocks') {
    return <BlockEditor onBackToText={() => setMode('text')} />;
  }

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <h1>Kaka Lang Web Compiler (কাকা ল্যাঙ্গুয়েজ)</h1>
          <p>Bhai-lang inspired, localized in Bengali</p>
        </div>
        <div className="header-right">
          <button onClick={() => setMode('blocks')} className="mode-switch-btn">
            🧩 Block Mode
          </button>
        </div>
      </header>

      <div className="main-content">
        <div className="editor-section">
          <div className="editor-header">
            <span>Editor</span>
            <button onClick={runCode} className="run-btn">
              ▶ Run ( চালাও কাকা )
            </button>
          </div>
          <div className="keyboard-toolbar">
            {[
              "ও কাকা", "আসি কাকা",
              "কাকা রাখো", "কাকা বলো",
              "যদি কাকা", "নাহলে কাকা",
              "যতক্ষণ কাকা", "ব্যাস কাকা", "পরেরটা কাকা",
              "কাকা শোনো",
              "ফাংশন কাকা", "ফেরত নাও",
              "এবং", "অথবা",
              "ঠিক", "ভুল"
            ].map(kw => (
              <button
                key={kw}
                className="keyword-btn"
                onClick={() => insertKeyword(kw)}
              >
                {kw}
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="output-section">
          <div className="output-header">Output</div>
          <div className="output-console">
            {output.map((line, i) => (
              <div key={i} className="log-line">{line}</div>
            ))}
            {error && <div className="error-line">Error: {error}</div>}
            {!output.length && !error && <div className="placeholder">Result will appear here...</div>}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>
          Made with ❤️ by <a href="https://krishnendu.com" target="_blank" rel="noopener noreferrer">Krishnendu Paul</a>
          {' | '}
          <a href="https://github.com/bidhata/kaka-lang" target="_blank" rel="noopener noreferrer">
            ⭐ GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
