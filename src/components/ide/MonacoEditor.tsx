import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import { MonacoBinding } from 'y-monaco';
import { WebContainer } from '@webcontainer/api';
import { supabase } from '../../lib/supabase';

interface MonacoEditorProps {
  projectId: string;
  filePath: string | null;
  initialContent: string;
  webcontainer: WebContainer | null;
}

export function MonacoEditor({ projectId, filePath, initialContent, webcontainer }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const bindingRef = useRef<any>(null);
  const providerRef = useRef<any>(null);
  const ydocRef = useRef<Y.Doc | null>(null);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [yProvider, setYProvider] = useState<any>(null);

  // Initialize Yjs and Supabase Realtime
  useEffect(() => {
    const doc = new Y.Doc();
    const awareness = new awarenessProtocol.Awareness(doc);

    // Generate random color for this user
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    awareness.setLocalStateField('user', {
      name: `User ${Math.floor(Math.random() * 1000)}`,
      color: color
    });

    const channel = supabase.channel(`collab-code-${projectId}`);
    let receivedSync = false;

    // 1. When local doc changes, broadcast update
    doc.on('update', (update, origin) => {
      if (origin !== 'remote') {
        channel.send({
          type: 'broadcast',
          event: 'update',
          payload: { update: Array.from(update) }
        });
      }
    });

    // 2. When local awareness changes, broadcast awareness
    awareness.on('update', ({ added, updated, removed }, origin) => {
      if (origin !== 'remote') {
        const changedClients = added.concat(updated, removed);
        const encode = awarenessProtocol.encodeAwarenessUpdate(awareness, changedClients);
        channel.send({
          type: 'broadcast',
          event: 'awareness',
          payload: { update: Array.from(encode) }
        });
      }

      // Hack to inject the user's name label onto the y-monaco cursor element
      setTimeout(() => {
        const states = Array.from(awareness.getStates().values());
        const heads = document.querySelectorAll('.yRemoteSelectionHead');
        heads.forEach((head: any) => {
          const color = head.style.borderColor;
          const user = states.find((s: any) => s.user?.color === color)?.user;
          if (user && !head.querySelector('.cursor-name')) {
            const nameDiv = document.createElement('div');
            nameDiv.className = 'cursor-name';
            nameDiv.textContent = user.name;
            nameDiv.style.backgroundColor = color;
            nameDiv.style.color = '#fff';
            nameDiv.style.position = 'absolute';
            nameDiv.style.top = '-18px';
            nameDiv.style.left = '-2px';
            nameDiv.style.fontSize = '11px';
            nameDiv.style.padding = '2px 6px';
            nameDiv.style.borderRadius = '4px';
            nameDiv.style.whiteSpace = 'nowrap';
            nameDiv.style.zIndex = '100';
            nameDiv.style.pointerEvents = 'none';
            nameDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            head.appendChild(nameDiv);
          }
        });
      }, 50);
    });

    // 3. Handle incoming remote updates
    channel.on('broadcast', { event: 'update' }, ({ payload }) => {
      receivedSync = true;
      Y.applyUpdate(doc, new Uint8Array(payload.update), 'remote');
    });

    // 4. Handle incoming remote awareness
    channel.on('broadcast', { event: 'awareness' }, ({ payload }) => {
      awarenessProtocol.applyAwarenessUpdate(awareness, new Uint8Array(payload.update), 'remote');
    });

    // 5. Handle sync requests from new peers
    channel.on('broadcast', { event: 'request_sync' }, ({ payload }) => {
      const update = Y.encodeStateAsUpdate(doc, new Uint8Array(payload.stateVector));
      channel.send({
        type: 'broadcast',
        event: 'update',
        payload: { update: Array.from(update) }
      });
      // Also send our awareness state to the new peer
      const encode = awarenessProtocol.encodeAwarenessUpdate(awareness, Array.from(awareness.getStates().keys()));
      channel.send({
        type: 'broadcast',
        event: 'awareness',
        payload: { update: Array.from(encode) }
      });
    });

    // 6. When we successfully subscribe, ask peers for the current state
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        const stateVector = Y.encodeStateVector(doc);
        channel.send({
          type: 'broadcast',
          event: 'request_sync',
          payload: { stateVector: Array.from(stateVector) }
        });
      }
    });

    // 7. Cleanup ghost cursors (Ping & Timeout system)
    const pingInterval = setInterval(() => {
      if (awareness.getLocalState() !== null) {
        const encode = awarenessProtocol.encodeAwarenessUpdate(awareness, [doc.clientID]);
        channel.send({ type: 'broadcast', event: 'awareness', payload: { update: Array.from(encode) } });
      }
    }, 15000);

    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      const toRemove: number[] = [];
      awareness.meta.forEach((meta, clientID) => {
        if (clientID !== doc.clientID && now - meta.lastUpdated > 35000) {
          toRemove.push(clientID);
        }
      });
      if (toRemove.length > 0) {
        awarenessProtocol.removeAwarenessStates(awareness, toRemove, 'local');
      }
    }, 10000);

    // Attempt to broadcast leave instantly on tab close
    const handleBeforeUnload = () => {
      awarenessProtocol.removeAwarenessStates(awareness, [doc.clientID], 'local');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    ydocRef.current = doc;
    providerRef.current = { awareness };
    setYProvider(channel);

    return () => {
      clearInterval(pingInterval);
      clearInterval(cleanupInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      channel.unsubscribe();
      awareness.destroy();
      doc.destroy();
    };
  }, [projectId]); // IMPORTANT: Only run once per project! Never destroy on file switch.

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
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

    setIsEditorReady(true);
  };

  const bindEditor = () => {
    if (!editorRef.current || !ydocRef.current || !providerRef.current || !filePath) return;

    // Clean up previous file binding
    if (bindingRef.current) {
      bindingRef.current.destroy();
    }

    const ytext = ydocRef.current.getText(filePath);
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
      providerRef.current.awareness
    );
  };

  // Rebind when file changes or editor becomes ready
  useEffect(() => {
    if (!isEditorReady || !yProvider) return;
    
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
  }, [filePath, webcontainer, isEditorReady, yProvider]);

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

  const getLanguage = (path: string) => {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
    if (path.endsWith('.js') || path.endsWith('.jsx')) return 'javascript';
    if (path.endsWith('.json')) return 'json';
    if (path.endsWith('.css')) return 'css';
    if (path.endsWith('.html')) return 'html';
    if (path.endsWith('.py')) return 'python';
    return 'plaintext';
  };

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
          defaultLanguage="typescript"
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
