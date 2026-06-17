import { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { useParams, Link } from 'react-router-dom';
import { FileTree } from '../components/ide/FileTree';
import { MonacoEditor } from '../components/ide/MonacoEditor';
import { TerminalTabs } from '../components/ide/TerminalTabs';
import { AIChat } from '../components/ide/AIChat';
import { SearchPanel } from '../components/ide/SearchPanel';
import { ApiKeyModal } from '../components/ide/ApiKeyModal';
import { SourceControlPanel } from '../components/ide/SourceControlPanel';
import { ArrowLeft, Loader2, Globe, Users, Play, Save, Files, Search, GitBranch, Settings, TerminalSquare, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Singleton promise to prevent booting multiple times during React StrictMode or HMR
let bootPromise: Promise<WebContainer> | null = null;

const exportFileSystem = async (wc: WebContainer, dirPath = '/'): Promise<any> => {
  const entries = await wc.fs.readdir(dirPath, { withFileTypes: true });
  const tree: any = {};
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = dirPath === '/' ? `/${entry.name}` : `${dirPath}/${entry.name}`;
    if (entry.isDirectory()) {
      tree[entry.name] = {
        directory: await exportFileSystem(wc, fullPath)
      };
    } else {
      try {
        const contents = await wc.fs.readFile(fullPath, 'utf-8');
        tree[entry.name] = {
          file: { contents }
        };
      } catch (e) {
        // Skip binary or unreadable files for simple persistence
      }
    }
  }
  return tree;
};

export function NativeIDE() {
  const { projectId } = useParams();
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  type SidebarTab = 'explorer' | 'search' | 'git' | null;
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab>('explorer');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Resize State
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [terminalHeight, setTerminalHeight] = useState(256);
  const [aiChatWidth, setAiChatWidth] = useState(320);

  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [isResizingAiChat, setIsResizingAiChat] = useState(false);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const newWidth = Math.max(150, Math.min(600, e.clientX - 48)); // 48 is activity bar width
        setSidebarWidth(newWidth);
      }
      if (isResizingTerminal) {
        const newHeight = Math.max(100, Math.min(window.innerHeight - 200, window.innerHeight - e.clientY));
        setTerminalHeight(newHeight);
      }
      if (isResizingAiChat) {
        const newWidth = Math.max(200, Math.min(800, window.innerWidth - e.clientX));
        setAiChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      setIsResizingTerminal(false);
      setIsResizingAiChat(false);
    };

    if (isResizingSidebar || isResizingTerminal || isResizingAiChat) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizingTerminal ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizingSidebar, isResizingTerminal, isResizingAiChat]);

  const toggleSidebar = (tab: SidebarTab) => {
    setActiveSidebar(prev => prev === tab ? null : tab);
  };

  const handleAiChatClick = () => {
    if (isAiChatOpen) {
      setIsAiChatOpen(false);
      return;
    }
    const savedKey = localStorage.getItem('aiApiKey');
    if (!savedKey) {
      setShowApiKeyModal(true);
    } else {
      setIsAiChatOpen(true);
    }
  };

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('aiApiKey', key);
    setShowApiKeyModal(false);
    setIsAiChatOpen(true);
  };

  useEffect(() => {
    async function bootEngine() {
      if (!projectId) return;

      try {
        if (!bootPromise) {
          console.log("Booting WebContainer OS...");
          bootPromise = WebContainer.boot();
        }
        
        const instance = await bootPromise;
        
        // Listen for the dev server
        instance.on('server-ready', (port, url) => {
          console.log('Server ready on', url);
          setPreviewUrl(url);
        });
          
        // Check ownership
        const { data: authData } = await supabase.auth.getUser();
        const { data } = await supabase.from('projects').select('file_system, user_id').eq('name', projectId).single();
        
        const ownerStatus = authData.user && data && authData.user.id === data.user_id;
        if (ownerStatus) {
          setIsOwner(true);
        }
          
        try {
          if (data?.file_system) {
            console.log("Loading file system from Supabase...");
            await instance.mount(data.file_system);
          } else if (ownerStatus || !data) {
            console.log("Loading default template...");
            await instance.mount({
              'package.json': {
                file: {
                  contents: JSON.stringify({
                    name: "collab-code-project",
                    type: "module",
                    scripts: {
                      dev: "vite",
                      build: "vite build"
                    },
                    dependencies: {
                      "react": "^18.2.0",
                      "react-dom": "^18.2.0"
                    },
                    devDependencies: {
                      "@vitejs/plugin-react": "^4.2.1",
                      "vite": "^5.0.0"
                    }
                  }, null, 2)
                }
              },
              'index.html': {
                file: {
                  contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
                }
              },
              'src': {
                directory: {
                  'main.jsx': {
                    file: {
                      contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
                    }
                  },
                  'App.jsx': {
                    file: {
                      contents: `export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hello from Collab Code Native IDE!</h1>
      <p>Edit this file to see changes in real-time.</p>
    </div>
  )
}`
                    }
                  }
                }
              }
            });
          } else {
            console.log("Guest mode. Waiting for Host to sync file system...");
          }
        } catch (mountErr) {
          // If already mounted, it might throw, we can safely ignore
          console.log("Already mounted or mount error:", mountErr);
        }
        
        // Host-Guest File System Sync
        const fsChannel = supabase.channel(`collab-code-${projectId}-fs-sync`);
        
        fsChannel.on('broadcast', { event: 'request_full_fs' }, async () => {
           if (ownerStatus) {
              const tree = await exportFileSystem(instance);
              fsChannel.send({ type: 'broadcast', event: 'full_fs_sync', payload: { tree } });
           }
        });

        fsChannel.on('broadcast', { event: 'full_fs_sync' }, async ({ payload }) => {
           if (!ownerStatus) {
              await instance.mount(payload.tree);
              window.dispatchEvent(new Event('fs_synced'));
           }
        });

        fsChannel.subscribe((status) => {
           if (status === 'SUBSCRIBED' && !ownerStatus) {
              fsChannel.send({ type: 'broadcast', event: 'request_full_fs' });
           }
        });
        
        setWebcontainer(instance);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to boot WebContainer:", err);
        setError(err.message || "Failed to boot WebContainer OS. Make sure you are using a modern browser.");
        setLoading(false);
      }
    }

    bootEngine();
  }, [projectId]);

  // Presence Tracking
  useEffect(() => {
    if (!projectId) return;
    const presenceChannel = supabase.channel(`collab-code-${projectId}-presence`, {
      config: {
        presence: { key: Math.random().toString(36).substring(7) }
      }
    });

    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track({
          online_at: new Date().toISOString()
        });
      }
    });

    return () => {
      presenceChannel.untrack();
      presenceChannel.unsubscribe();
    };
  }, [projectId]);

  const handleFileSelect = (path: string, content: string) => {
    setSelectedFile(path);
    setFileContent(content);
  };

  const handleRunProject = async () => {
    if (!webcontainer) return;
    try {
      // Just start the dev server in the background, it will trigger server-ready
      await webcontainer.spawn('npm', ['install']);
      await webcontainer.spawn('npm', ['run', 'dev']);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (isBackground = false) => {
    if (!webcontainer || !projectId) return;
    if (!isBackground) setIsSaving(true);
    try {
      const tree = await exportFileSystem(webcontainer);
      await supabase.from('projects').update({ file_system: tree }).eq('name', projectId);
    } catch (err) {
      console.error("Save failed", err);
    }
    if (!isBackground) setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
        <h2 className="text-xl font-medium tracking-tight">Booting Native OS</h2>
        <p className="text-gray-500 mt-2 text-sm">Initializing Node.js in your browser...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl max-w-md text-center">
          <h2 className="text-red-400 font-medium mb-2">Engine Boot Failed</h2>
          <p className="text-sm text-red-300/80">{error}</p>
          <Link to={`/dashboard/projects/${projectId}`} className="mt-6 inline-block bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-[#000] text-white overflow-hidden">
      
      {/* IDE Header */}
      <div className="h-14 border-b border-white/[0.05] bg-[#050505] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            to={`/dashboard/projects/${projectId}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.1] transition-colors border border-white/[0.05]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <span className="font-medium text-sm">{projectId}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className={`p-1.5 rounded-md transition-colors ${isTerminalOpen ? 'bg-white/[0.1] text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
            title="Toggle Terminal"
          >
            <TerminalSquare className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-white text-xs font-medium border border-white/[0.1] hover:bg-white/[0.05] ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSaving ? 'Saving...' : 'Save Files'}
          </button>
          
          {!previewUrl && (
            <button 
              onClick={handleRunProject}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white text-xs font-medium shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run Project
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Users className="w-3.5 h-3.5" />
            Multiplayer Live
          </div>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Activity Bar */}
        <div className="w-12 shrink-0 border-r border-white/[0.05] bg-[#050505] flex flex-col items-center py-4 gap-4 z-20">
          <button 
            onClick={() => toggleSidebar('explorer')}
            className={`p-2 rounded-xl transition-colors ${activeSidebar === 'explorer' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            title="Explorer"
          >
            <Files className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button 
            onClick={() => toggleSidebar('search')}
            className={`p-2 rounded-xl transition-colors ${activeSidebar === 'search' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            title="Search"
          >
            <Search className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button 
            onClick={() => toggleSidebar('git')}
            className={`p-2 rounded-xl transition-colors ${activeSidebar === 'git' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            title="Source Control"
          >
            <GitBranch className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button 
            onClick={handleAiChatClick}
            className={`p-2 rounded-xl transition-colors ${isAiChatOpen ? 'text-purple-400 bg-purple-500/10' : 'text-gray-500 hover:text-gray-300'}`}
            title="AI Assistant"
          >
            <Sparkles className="w-6 h-6 stroke-[1.5]" />
          </button>
          <div className="flex-1"></div>
          <button className="p-2 text-gray-500 hover:text-gray-300 transition-colors mb-2" title="Settings">
            <Settings className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Sidebar */}
        {activeSidebar && (
          <>
            <div className="shrink-0 flex flex-col bg-[#0A0A0A] z-10" style={{ width: sidebarWidth }}>
              {activeSidebar === 'explorer' && (
                <FileTree 
                  projectId={projectId!}
                  webcontainer={webcontainer} 
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onFileSystemChange={() => handleSave(true)}
                  isOwner={isOwner}
                />
              )}
              {activeSidebar === 'search' && (
                <SearchPanel />
              )}
              {activeSidebar === 'git' && (
                <SourceControlPanel webcontainer={webcontainer} />
              )}
            </div>
            {/* Sidebar Splitter */}
            <div 
              className={`w-1 cursor-col-resize transition-colors z-20 shrink-0 ${isResizingSidebar ? 'bg-blue-500' : 'bg-white/[0.05] hover:bg-blue-500/50'}`}
              onMouseDown={() => setIsResizingSidebar(true)}
            />
          </>
        )}

        {/* Center: Editor, Preview & Terminal */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top: Editor & Preview Split */}
          <div className="flex-1 min-h-0 flex">
            
            {/* Editor Area */}
            <div className={`flex-1 min-w-0 relative ${previewUrl ? 'border-r border-white/[0.05]' : ''}`}>
              <MonacoEditor 
                projectId={projectId || 'default'}
                filePath={selectedFile}
                initialContent={fileContent}
                webcontainer={webcontainer}
              />
            </div>

            {/* Preview Area */}
            {previewUrl && (
              <div className="w-1/2 min-w-[300px] h-full bg-white flex flex-col relative">
                <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0 shadow-sm z-10">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5 text-xs text-gray-600 w-full max-w-sm truncate border border-gray-200">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{previewUrl}</span>
                  </div>
                  <button 
                    onClick={() => setPreviewUrl(null)}
                    className="text-gray-400 hover:text-red-500 text-xs px-2"
                  >
                    Close
                  </button>
                </div>
                <iframe src={previewUrl} className="w-full flex-1 border-none bg-white" />
              </div>
            )}
            
          </div>

          {/* Terminal Splitter */}
          {isTerminalOpen && (
            <div 
              className={`h-1 cursor-row-resize transition-colors z-20 shrink-0 ${isResizingTerminal ? 'bg-blue-500' : 'bg-white/[0.05] hover:bg-blue-500/50'}`}
              onMouseDown={() => setIsResizingTerminal(true)}
            />
          )}

          {/* Terminal Area */}
          {isTerminalOpen && (
            <div className="shrink-0 bg-[#050505] relative z-10 flex flex-col" style={{ height: terminalHeight }}>
              <TerminalTabs webcontainer={webcontainer} onClose={() => setIsTerminalOpen(false)} />
            </div>
          )}

        </div>

        {/* AI Chat Sidebar */}
        {isAiChatOpen && (
          <>
            {/* AI Chat Splitter */}
            <div 
              className={`w-1 cursor-col-resize transition-colors z-20 shrink-0 ${isResizingAiChat ? 'bg-blue-500' : 'bg-white/[0.05] hover:bg-blue-500/50'}`}
              onMouseDown={() => setIsResizingAiChat(true)}
            />
            <div className="shrink-0 h-full bg-[#0A0A0A] z-20" style={{ width: aiChatWidth }}>
              <AIChat onClose={() => setIsAiChatOpen(false)} />
            </div>
          </>
        )}

      </div>

      {/* Modals */}
      {showApiKeyModal && (
        <ApiKeyModal 
          onSave={handleSaveApiKey} 
          onClose={() => setShowApiKeyModal(false)} 
        />
      )}

    </div>
  );
}
