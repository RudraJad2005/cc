import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import { MonacoBinding } from 'y-monaco';
import { WebContainer } from '@webcontainer/api';

const getLanguage = (path: string) => {
  if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
  if (path.endsWith('.js') || path.endsWith('.jsx')) return 'javascript';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.css')) return 'css';
  if (path.endsWith('.html')) return 'html';
  if (path.endsWith('.py')) return 'python';
  return 'plaintext';
};

interface MonacoEditorProps {
  projectId: string;
  filePath: string | null;
  initialContent: string;
  webcontainer: WebContainer | null;
  ydoc: Y.Doc | null;
  provider: { awareness: awarenessProtocol.Awareness } | null;
}

export function MonacoEditor({ projectId, filePath, initialContent, webcontainer, ydoc, provider }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const bindingRef = useRef<any>(null);

  const [isEditorReady, setIsEditorReady] = useState(false);



  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Add custom theme matching our dashboard
    monaco.editor.defineTheme('collab-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '000000' }
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
        'editorSuggestWidget.highlightForeground': '#3b82f6',
      }
    });
    monaco.editor.setTheme('collab-dark');
    
    // Explicitly set the language for the current file
    if (filePath) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, getLanguage(filePath));
      }
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
    
    // CRITICAL FIX: Prevent y-monaco from picking up old text from the editor model
    // when switching files, which caused the exponential text duplication bug.
    if (ytext.toString() === '') {
      // First time this file is opened by anyone. Initialize it.
      model.setValue(initialContent);
      ytext.insert(0, initialContent);
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
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-[#000]">
        <div className="w-16 h-16 border-2 border-white/[0.05] rounded-2xl flex items-center justify-center mb-4 bg-[#050505]">
          <svg className="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        Select a file from the explorer to start coding
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#000] flex flex-col">
      <div className="flex bg-[#050505] border-b border-white/[0.05]">
        <div className="px-4 py-2 border-r border-white/[0.05] border-t-2 border-t-blue-500 bg-[#000] text-xs font-medium text-gray-300 flex items-center gap-2">
          {filePath.split('/').pop()}
        </div>
      </div>
      <div className="flex-1 relative">
        <Editor
          path={filePath}
          height="100%"
          language={getLanguage(filePath)}
          theme="collab-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
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
