import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import { MonacoBinding } from 'y-monaco';
import { WebContainer } from '@webcontainer/api';
import { GoogleGenerativeAI } from '@google/generative-ai';

const getLanguage = (path: string) => {
  if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
  if (path.endsWith('.js') || path.endsWith('.jsx')) return 'javascript';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.css')) return 'css';
  if (path.endsWith('.html')) return 'html';
  if (path.endsWith('.py')) return 'python';
  return 'plaintext';
};

const getFontFamily = (theme: string) => {
  switch (theme) {
    case 'theme-dark': return "'Roboto Mono', Menlo, Monaco, monospace";
    case 'theme-light': return "'Fira Code', Menlo, Monaco, monospace";
    case 'theme-dracula': return "'Cascadia Code', 'Fira Code', Menlo, Monaco, monospace";
    case 'theme-oceanic': return "'JetBrains Mono', Menlo, Monaco, monospace";
    case 'theme-monokai': return "'Source Code Pro', Menlo, Monaco, monospace";
    case 'theme-github-dark': return "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace";
    case 'theme-solarized-light': return "'Inconsolata', Menlo, Monaco, monospace";
    default: return 'Menlo, Monaco, "Courier New", monospace';
  }
};

interface MonacoEditorProps {
  projectId: string;
  filePath: string | null;
  initialContent: string;
  webcontainer: WebContainer | null;
  ydoc: Y.Doc | null;
  provider: { awareness: awarenessProtocol.Awareness } | null;
  theme?: string;
}

export function MonacoEditor({ projectId, filePath, initialContent, webcontainer, ydoc, provider, theme = 'theme-dark' }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const bindingRef = useRef<any>(null);
  const webcontainerRef = useRef<any>(webcontainer);

  useEffect(() => {
    webcontainerRef.current = webcontainer;
  }, [webcontainer]);

  const [isEditorReady, setIsEditorReady] = useState(false);



  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Add custom theme matching our dashboard
    monaco.editor.defineTheme('theme-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '000000' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'string', foreground: '98c379' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'function', foreground: '61afef' },
        { token: 'type', foreground: 'e5c07b' },
        { token: 'identifier', foreground: 'abb2bf' }
      ],
      colors: {
        'editor.background': '#000000',
        'editor.lineHighlightBackground': '#ffffff05',
        'editorLineNumber.foreground': '#555555',
        'editorLineNumber.activeForeground': '#ffffff',
        'editorIndentGuide.background': '#ffffff10',
        'editorIndentGuide.activeBackground': '#ffffff30',
        'scrollbarSlider.background': '#ffffff10',
        'scrollbarSlider.hoverBackground': '#ffffff20',
        'scrollbarSlider.activeBackground': '#ffffff30',
        'editorSuggestWidget.background': '#0A0A0A',
        'editorSuggestWidget.border': '#ffffff10',
        'editorSuggestWidget.foreground': '#cccccc',
        'editorSuggestWidget.selectedBackground': '#ffffff15',
      }
    });

    monaco.editor.defineTheme('theme-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { background: 'f3f4f6' },
        { token: 'keyword', foreground: 'a626a4' },
        { token: 'string', foreground: '50a14f' },
        { token: 'number', foreground: '986801' },
        { token: 'comment', foreground: 'a0a1a7', fontStyle: 'italic' },
        { token: 'function', foreground: '4078f2' },
        { token: 'type', foreground: 'c18401' },
        { token: 'identifier', foreground: '383a42' }
      ],
      colors: {
        'editor.background': '#f3f4f6',
        'editor.lineHighlightBackground': '#00000005',
        'editorLineNumber.foreground': '#999999',
        'editorLineNumber.activeForeground': '#000000',
        'editorSuggestWidget.background': '#ffffff',
      }
    });

    monaco.editor.defineTheme('theme-dracula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '282a36' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'function', foreground: '50fa7b' },
        { token: 'type', foreground: '8be9fd' },
        { token: 'identifier', foreground: 'f8f8f2' }
      ],
      colors: {
        'editor.background': '#282a36',
        'editor.lineHighlightBackground': '#44475a80',
        'editorLineNumber.foreground': '#6272a4',
        'editorLineNumber.activeForeground': '#f8f8f2',
        'editorSuggestWidget.background': '#21222c',
        'editorSuggestWidget.border': '#44475a',
      }
    });

    monaco.editor.defineTheme('theme-oceanic', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '0f172a' },
        { token: 'keyword', foreground: 'c594c5' },
        { token: 'string', foreground: '99c794' },
        { token: 'number', foreground: 'f99157' },
        { token: 'comment', foreground: '65737e', fontStyle: 'italic' },
        { token: 'function', foreground: '6699cc' },
        { token: 'type', foreground: 'fac863' },
        { token: 'identifier', foreground: 'd8dee9' }
      ],
      colors: {
        'editor.background': '#0f172a',
        'editor.lineHighlightBackground': '#ffffff0a',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#f8fafc',
        'editorSuggestWidget.background': '#1e293b',
        'editorSuggestWidget.border': '#334155',
      }
    });

    monaco.editor.defineTheme('theme-monokai', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '272822' },
        { token: 'keyword', foreground: 'F92672' },
        { token: 'string', foreground: 'E6DB74' },
        { token: 'number', foreground: 'AE81FF' },
        { token: 'comment', foreground: '75715E', fontStyle: 'italic' },
        { token: 'function', foreground: 'A6E22E' },
        { token: 'type', foreground: '66D9EF' },
        { token: 'identifier', foreground: 'F8F8F2' }
      ],
      colors: {
        'editor.background': '#272822',
        'editor.lineHighlightBackground': '#3e3d32',
        'editorLineNumber.foreground': '#90908a',
        'editorLineNumber.activeForeground': '#f8f8f2',
        'editorSuggestWidget.background': '#272822',
        'editorSuggestWidget.border': '#75715e',
      }
    });

    monaco.editor.defineTheme('theme-github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '0d1117' },
        { token: 'keyword', foreground: 'ff7b72' },
        { token: 'string', foreground: 'a5d6ff' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
        { token: 'function', foreground: 'd2a8ff' },
        { token: 'type', foreground: 'ff7b72' },
        { token: 'identifier', foreground: 'c9d1d9' }
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.lineHighlightBackground': '#161b22',
        'editorLineNumber.foreground': '#484f58',
        'editorLineNumber.activeForeground': '#c9d1d9',
        'editorSuggestWidget.background': '#161b22',
        'editorSuggestWidget.border': '#30363d',
      }
    });

    monaco.editor.defineTheme('theme-solarized-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { background: 'fdf6e3' },
        { token: 'keyword', foreground: '859900' },
        { token: 'string', foreground: '2aa198' },
        { token: 'number', foreground: 'd33682' },
        { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
        { token: 'function', foreground: '268bd2' },
        { token: 'type', foreground: 'b58900' },
        { token: 'identifier', foreground: '657b83' }
      ],
      colors: {
        'editor.background': '#fdf6e3',
        'editor.lineHighlightBackground': '#eee8d5',
        'editorLineNumber.foreground': '#93a1a1',
        'editorLineNumber.activeForeground': '#586e75',
        'editorSuggestWidget.background': '#fdf6e3',
        'editorSuggestWidget.border': '#eee8d5',
      }
    });

    monaco.editor.setTheme(theme);
    
    // Explicitly set the language for the current file
    if (filePath) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, getLanguage(filePath));
      }
    }

    // Register AI Copilot Ghost Text (unconditionally, fetch API key dynamically)
    if (!monaco.languages.getLanguages().some((l: any) => l.id === 'ai_copilot_registered')) {
      monaco.languages.register({ id: 'ai_copilot_registered' });

      const aiProvider = {
        provideInlineCompletions: async (textModel: any, position: any, context: any, token: any) => {
          const apiKey = localStorage.getItem('aiApiKey');
          if (!apiKey) return { items: [] };

          // DEBOUNCE: Wait 750ms before calling the AI. 
          // If the user types another character, Monaco cancels the token!
          await new Promise(resolve => setTimeout(resolve, 750));
          if (token.isCancellationRequested) return { items: [] };

          const genAI = new GoogleGenerativeAI(apiKey);
          const aiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
          const textBeforePointer = textModel.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });
          const textAfterPointer = textModel.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: textModel.getLineCount(),
            endColumn: textModel.getLineMaxColumn(textModel.getLineCount())
          });

          if (textBeforePointer.trim() === '') return { items: [] };

          try {
            const prompt = `You are a code completion AI like GitHub Copilot. 
Code before cursor:
\`\`\`
${textBeforePointer.slice(-1000)}
\`\`\`
Code after cursor:
\`\`\`
${textAfterPointer.slice(0, 500)}
\`\`\`
Respond ONLY with the exact code that should be inserted at the cursor to complete the thought. Do not include markdown formatting or explanations. Do not repeat code that is already there. If no completion is needed, respond with an empty string.`;

            const result = await aiModel.generateContent(prompt);
            let completion = result.response.text();
            
            // Clean up any markdown blocks if the AI accidentally adds them
            completion = completion.replace(/^```[a-z]*\n?/i, '').replace(/```$/i, '').trimEnd();

            if (!completion) return { items: [] };

            return {
              items: [{
                insertText: completion,
                range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column)
              }]
            };
          } catch (e) {
            console.error("Copilot error:", e);
            return { items: [] };
          }
        },
        freeInlineCompletions: () => {}
      };

      // Register for all supported languages
      ['javascript', 'typescript', 'python', 'html', 'css', 'json'].forEach(lang => {
        monaco.languages.registerInlineCompletionsProvider(lang, aiProvider);
      });
    }

    // Register simple Python completions and Jedi System Intellisense
    if (!monaco.languages.getLanguages().some((l: any) => l.id === 'python_custom_registered')) {
      monaco.languages.register({ id: 'python_custom_registered' }); // just a marker
      monaco.languages.registerCompletionItemProvider('python', {
        triggerCharacters: ['.'],
        provideCompletionItems: async (textModel: any, position: any) => {
          const word = textModel.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };

          const wc = webcontainerRef.current;
          if (wc && 'getCompletions' in wc) {
            try {
               const sourceCode = textModel.getValue();
               const completions = await wc.getCompletions(sourceCode, position.lineNumber, position.column);
               if (completions && completions.length > 0) {
                 return {
                   suggestions: completions.map((c: any) => ({
                     label: c.label,
                     detail: c.detail,
                     kind: monaco.languages.CompletionItemKind.Method,
                     insertText: c.label,
                     range: range
                   }))
                 };
               }
            } catch (e) {
               console.error("Jedi completion error", e);
            }
          }

          // Fallback basic snippets
          return {
            suggestions: [
              {
                label: 'print',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'print(${1:text})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Print to standard output',
                range
              },
              {
                label: 'def',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'def ${1:name}(${2:args}):\n\t${3:pass}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Define a function',
                range
              },
              {
                label: 'class',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'class ${1:Name}:\n\tdef __init__(self):\n\t\t${2:pass}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Define a class',
                range
              },
              {
                label: 'if',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'if ${1:condition}:\n\t${2:pass}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'If statement',
                range
              },
              {
                label: 'for',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'For loop',
                range
              },
              {
                label: 'import',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'import ${1:module}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Import a module',
                range
              }
            ]
          };
        }
      });
    }

    setIsEditorReady(true);
  };

  const bindEditor = () => {
    if (!editorRef.current || !ydoc || !provider || !filePath) return;

    // Clean up previous file binding
    if (bindingRef.current) {
      bindingRef.current.destroy();
    }

    const ytext = ydoc.getText(filePath);
    const model = editorRef.current.getModel();
    
    if (ytext.toString() === '') {
      // Clear the model synchronously so y-monaco doesn't copy old file's text into ytext
      model.setValue('');

      // First time this file is opened by anyone. It might exist in FS (templates)
      webcontainer.fs.readFile(filePath, 'utf-8').then(content => {
        if (ytext.toString() === '') {
          if (content) {
            ytext.insert(0, content);
          } else if (initialContent) {
            ytext.insert(0, initialContent);
          }
        }
      }).catch(() => {
        if (ytext.toString() === '') {
          if (initialContent) ytext.insert(0, initialContent);
        }
      });
    } else {
      // File already exists in the shared Y.Doc. Load it.
      if (model.getValue() !== ytext.toString()) {
        model.setValue(ytext.toString());
      }
    }

    bindingRef.current = new MonacoBinding(
      ytext,
      model,
      new Set([editorRef.current]),
      provider.awareness
    );
  };

  // Rebind when file changes or editor becomes ready
  useEffect(() => {
    if (!isEditorReady || !ydoc || !provider) return;
    
    bindEditor();
    
    // Listen for local changes and sync to WebContainer FS
    if (editorRef.current && webcontainer && filePath) {
       const model = editorRef.current.getModel();
       const disposable = model.onDidChangeContent(() => {
          const value = model.getValue();
          webcontainer.fs.writeFile(filePath, value).catch(console.error);
        });
        return () => disposable.dispose();
    }
  }, [filePath, webcontainer, isEditorReady, ydoc, provider]);

  // Update theme and font when it changes
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme);
    }
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontFamily: getFontFamily(theme) });
    }
    // Fix cursor misalignment by forcing Monaco to remeasure char widths once web fonts load
    document.fonts.ready.then(() => {
      if (monacoRef.current) {
        monacoRef.current.editor.remeasureFonts();
      }
    });
  }, [theme]);

  // Force language update whenever filePath changes
  useEffect(() => {
    if (editorRef.current && monacoRef.current && filePath) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, getLanguage(filePath));
      }
    }
  }, [filePath]);

  if (!filePath) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[var(--ide-text-muted)] bg-[var(--ide-base)]">
        <div className="w-16 h-16 border-2 border-[var(--ide-border)] rounded-2xl flex items-center justify-center mb-4 bg-[var(--ide-panel-darker)]">
          <svg className="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        Select a file from the explorer to start coding
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[var(--ide-base)] flex flex-col">
      <div className="flex-1 relative">
        <Editor
          path={filePath}
          height="100%"
          language={getLanguage(filePath)}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: getFontFamily(theme),
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
            inlineSuggest: { enabled: true },
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8
            }
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
