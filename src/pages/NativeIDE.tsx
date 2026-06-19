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
import { EditorTabs } from '../components/ide/EditorTabs';
import { ArrowLeft, Loader2, Globe, Users, Play, Save, Files, Search, GitBranch, Settings, TerminalSquare, Sparkles, Maximize, Minimize } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getTemplate } from '../lib/templates';
import { useCollab } from '../hooks/useCollab';

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
  
  type EditorGroup = {
    id: string;
    tabs: string[];
    activeTab: string | null;
  };
  
  const [editorGroups, setEditorGroups] = useState<EditorGroup[]>([
    { id: '1', tabs: [], activeTab: null }
  ]);
  const [activeGroupId, setActiveGroupId] = useState<string>('1');
  const [dragOverSplitGroupId, setDragOverSplitGroupId] = useState<string | null>(null);
  const { ydoc, provider } = useCollab(projectId);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  
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
        const { data } = await supabase.from('projects').select('file_system, user_id, framework').eq('name', projectId).single();
        
        const ownerStatus = authData.user && data && authData.user.id === data.user_id;
        if (ownerStatus) {
          setIsOwner(true);
        }
          
        try {
          if (data?.file_system) {
            console.log("Loading file system from Supabase...");
            await instance.mount(data.file_system);
          } else if (ownerStatus) {
            console.log("Loading default template...");
            await instance.mount(getTemplate(data?.framework || 'react'));
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

  const handleFileSelect = (path: string, _content: string) => {
    setEditorGroups(groups => groups.map(group => {
      if (group.id === activeGroupId) {
        const tabs = group.tabs.includes(path) ? group.tabs : [...group.tabs, path];
        return { ...group, tabs, activeTab: path };
      }
      return group;
    }));
  };

  const handleTabClick = (groupId: string, path: string) => {
    setActiveGroupId(groupId);
    setEditorGroups(groups => groups.map(g => g.id === groupId ? { ...g, activeTab: path } : g));
  };

  const handleTabClose = (groupId: string, path: string) => {
    setEditorGroups(groups => {
      const newGroups = groups.map(g => {
        if (g.id === groupId) {
          const newTabs = g.tabs.filter(t => t !== path);
          const newActiveTab = g.activeTab === path 
            ? (newTabs.length > 0 ? newTabs[newTabs.length - 1] : null) 
            : g.activeTab;
          return { ...g, tabs: newTabs, activeTab: newActiveTab };
        }
        return g;
      });

      // Filter out empty groups, UNLESS it's the very last group standing
      const filteredGroups = newGroups.filter(g => g.tabs.length > 0 || newGroups.length === 1);
      
      // If the active group was closed, switch active group to the first available one
      if (!filteredGroups.find(g => g.id === activeGroupId)) {
        setActiveGroupId(filteredGroups[0]?.id || '1');
      }

      return filteredGroups;
    });
  };

  const handleSplitEditor = (groupId: string) => {
    const groupToSplit = editorGroups.find(g => g.id === groupId);
    if (!groupToSplit || !groupToSplit.activeTab) return;
    
    const newGroupId = Math.random().toString(36).substring(7);
    setEditorGroups(groups => [
      ...groups,
      { id: newGroupId, tabs: [groupToSplit.activeTab!], activeTab: groupToSplit.activeTab }
    ]);
    setActiveGroupId(newGroupId);
  };

  const getActiveGlobalTab = () => {
    const activeGroup = editorGroups.find(g => g.id === activeGroupId);
    return activeGroup?.activeTab || null;
  };

  const handleRunProject = async () => {
    if (!webcontainer) return;
    setIsStarting(true);
    try {
      // Install dependencies first and WAIT for it to finish
      const installProcess = await webcontainer.spawn('npm', ['install']);
      const exitCode = await installProcess.exit;
      
      if (exitCode === 0) {
        // Only run dev server after successful installation
        await webcontainer.spawn('npm', ['run', 'dev']);
      } else {
        console.error('Installation failed with exit code', exitCode);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsStarting(false);
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
              disabled={isStarting}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500 transition-colors text-white text-xs font-medium shadow-[0_0_15px_rgba(59,130,246,0.2)] ${isStarting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              {isStarting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              {isStarting ? 'Installing...' : 'Run Project'}
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
                  selectedFile={getActiveGlobalTab()}
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
            <div className={`flex-1 min-w-0 flex bg-[#050505] relative ${previewUrl ? 'border-r border-white/[0.05]' : ''}`}>
              {editorGroups.map((group, index) => (
                <div 
                  key={group.id} 
                  className={`flex-1 flex flex-col min-w-0 ${index > 0 ? 'border-l border-white/[0.05]' : ''}`}
                  onClick={() => setActiveGroupId(group.id)}
                >
                  <EditorTabs
                    tabs={group.tabs}
                    activeTab={group.activeTab}
                    onTabClick={(path) => handleTabClick(group.id, path)}
                    onTabClose={(path) => handleTabClose(group.id, path)}
                    showSplitButton={index === editorGroups.length - 1}
                    onSplitEditor={() => handleSplitEditor(group.id)}
                    onFileDrop={(path) => {
                      setActiveGroupId(group.id);
                      setEditorGroups(groups => groups.map(g => {
                        if (g.id === group.id) {
                          const tabs = g.tabs.includes(path) ? g.tabs : [...g.tabs, path];
                          return { ...g, tabs, activeTab: path };
                        }
                        return g;
                      }));
                    }}
                  />
                  <div className={`flex-1 min-h-0 relative ${activeGroupId === group.id ? 'ring-1 ring-inset ring-blue-500/10' : ''}`}>
                    <MonacoEditor 
                      projectId={projectId || 'default'}
                      filePath={group.activeTab}
                      initialContent={""}
                      webcontainer={webcontainer}
                      ydoc={ydoc}
                      provider={provider}
                    />
                    
                    {/* Drag Drop Zone */}
                    <div 
                      className={`absolute top-0 right-0 h-full z-10 ${group.activeTab ? 'w-1/2' : 'w-full'}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (dragOverSplitGroupId !== group.id) setDragOverSplitGroupId(group.id);
                      }}
                      onDragLeave={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setDragOverSplitGroupId(null);
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverSplitGroupId(null);
                        const path = e.dataTransfer.getData('text/plain');
                        if (path) {
                          if (!group.activeTab) {
                            // If empty pane, just open it here
                            setActiveGroupId(group.id);
                            setEditorGroups(groups => groups.map(g => g.id === group.id ? { ...g, tabs: [path], activeTab: path } : g));
                          } else {
                            // Split
                            const newGroupId = Math.random().toString(36).substring(7);
                            setEditorGroups(groups => [
                              ...groups,
                              { id: newGroupId, tabs: [path], activeTab: path }
                            ]);
                            setActiveGroupId(newGroupId);
                          }
                        }
                      }}
                    >
                      {dragOverSplitGroupId === group.id && (
                        <div className={`absolute inset-0 bg-blue-500/20 backdrop-blur-[1px] flex items-center justify-center ${group.activeTab ? 'border-l-2 border-blue-500' : 'border-2 border-blue-500 border-dashed m-4 rounded-xl'}`}>
                          <div className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg pointer-events-none">
                            {group.activeTab ? 'Split Editor' : 'Open File Here'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Area */}
            {previewUrl && (
              <div className={`${isPreviewFullscreen ? 'fixed inset-0 z-50' : 'w-1/2 min-w-[300px] h-full'} bg-white flex flex-col relative`}>
                <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0 shadow-sm z-10">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5 text-xs text-gray-600 w-full max-w-sm truncate border border-gray-200">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{previewUrl}</span>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                      className="text-gray-400 hover:text-black hover:bg-black/10 rounded p-1.5 transition-colors mr-1"
                      title="Toggle Fullscreen"
                    >
                      {isPreviewFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setPreviewUrl(null)}
                      className="text-gray-400 hover:text-red-500 text-xs px-2 font-medium"
                    >
                      Close
                    </button>
                  </div>
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
              <AIChat 
                onClose={() => setIsAiChatOpen(false)} 
                webcontainer={webcontainer}
                onFileSystemChange={() => handleSave(true)}
                projectId={projectId!}
              />
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
