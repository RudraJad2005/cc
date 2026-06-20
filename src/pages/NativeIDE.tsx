import React, { useState, useEffect, useRef } from 'react';
import { WebContainer } from '@webcontainer/api';
import { DockerContainer } from '../lib/DockerContainer';
import { useParams, Link } from 'react-router-dom';
import { FileTree } from '../components/ide/FileTree';
import { MonacoEditor } from '../components/ide/MonacoEditor';
import { TerminalTabs } from '../components/ide/TerminalTabs';
import { AIChat } from '../components/ide/AIChat';
import { SearchPanel } from '../components/ide/SearchPanel';
import { SettingsModal } from '../components/ide/SettingsModal';
import { SourceControlPanel } from '../components/ide/SourceControlPanel';
import { EditorTabs } from '../components/ide/EditorTabs';
import { ArrowLeft, Loader2, Globe, Users, Play, Save, Files, Search, GitBranch, Settings, TerminalSquare, Sparkles, Maximize2, Minimize2, Palette, Share2, X, ChevronRight } from 'lucide-react';
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
  const [showFileMenu, setShowFileMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Resize State
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [terminalHeight, setTerminalHeight] = useState(256);
  const [aiChatWidth, setAiChatWidth] = useState(320);

  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [isResizingAiChat, setIsResizingAiChat] = useState(false);

  const [isOwner, setIsOwner] = useState(false);

  // Theme State
  const [ideTheme, setIdeTheme] = useState(() => localStorage.getItem('cc-theme') || 'theme-dark');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem('cc-theme', ideTheme);
  }, [ideTheme]);

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
      setShowSettingsModal(true);
    } else {
      setIsAiChatOpen(true);
    }
  };

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('aiApiKey', key);
    setShowSettingsModal(false);
    setIsAiChatOpen(true);
  };

  useEffect(() => {
    async function bootEngine() {
      if (!projectId) return;

      try {
        // Check ownership
        const { data: authData } = await supabase.auth.getUser();
        const { data } = await supabase.from('projects').select('file_system, user_id, framework').eq('name', projectId).single();
        
        const ownerStatus = authData.user && data && authData.user.id === data.user_id;
        if (ownerStatus) {
          setIsOwner(true);
        }

        let instance;
        const dockerFrameworks = ['python', 'pandas', 'tensorflow', 'pytorch', 'scikit-learn', 'jupyter'];
        if (data?.framework && dockerFrameworks.includes(data.framework.toLowerCase())) {
          console.log("Booting Azure Docker OS...");
          instance = new DockerContainer(projectId);
        } else {
          if (!bootPromise) {
            console.log("Booting WebContainer OS...");
            bootPromise = WebContainer.boot();
          }
          instance = await bootPromise;
          
          // Listen for the dev server (WebContainer only)
          instance.on('server-ready', (port: number, url: string) => {
            console.log('Server ready on', url);
            setPreviewUrl(url);
          });
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
      const activeTab = getActiveGlobalTab();
      let cmd = 'npm install && npm run dev';
      
      if (activeTab) {
        if (activeTab.endsWith('.py')) {
          cmd = `python3 .${activeTab}`;
        } else if (activeTab.endsWith('.js')) {
          cmd = `node .${activeTab}`;
        }
      }
      
      window.dispatchEvent(new CustomEvent('terminal_run', { detail: { command: cmd } }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsStarting(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !webcontainer) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          const uint8Array = new Uint8Array(arrayBuffer);
          const path = `/${file.name}`;
          try {
            await webcontainer.fs.writeFile(path, uint8Array);
            // Local sync trigger
            window.dispatchEvent(new Event('fs_synced'));
          } catch (err) {
            console.error(`Failed to upload ${file.name}`, err);
          }
        }
      };
      
      reader.readAsArrayBuffer(file);
    }
    
    // Refresh the file tree
    window.dispatchEvent(new Event('fs_synced'));
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Close file menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#file-menu-container')) {
        setShowFileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Auto Save on Editor Changes
  useEffect(() => {
    if (!ydoc || !webcontainer || !projectId) return;

    let timeoutId: NodeJS.Timeout;

    const triggerSave = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleSave(true);
      }, 3000); // 3-second debounce for typing
    };

    ydoc.on('update', triggerSave);

    return () => {
      clearTimeout(timeoutId);
      ydoc.off('update', triggerSave);
    };
  }, [ydoc, webcontainer, projectId]);

  const getBreadcrumbs = (path: string | null) => {
    if (!path) return null;
    const parts = path.split('/').filter(Boolean);
    return (
      <div className="flex items-center px-4 h-8 bg-surface-container-low text-[13px] text-on-surface-variant font-ui-label-sm border-b border-outline-variant shrink-0 cursor-default select-none overflow-x-auto no-scrollbar gap-1.5">
        <span 
          className="hover:text-on-surface transition-colors cursor-pointer flex items-center"
          onClick={() => setActiveSidebar('explorer')}
        >
          {projectId || 'Project'}
        </span>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
            <span 
              className={`transition-colors cursor-pointer flex items-center ${index === parts.length - 1 ? 'text-on-surface' : 'hover:text-on-surface'}`}
              onClick={() => {
                const clickedPath = '/' + parts.slice(0, index + 1).join('/');
                window.dispatchEvent(new CustomEvent('expand_folder', { detail: { path: clickedPath } }));
                setActiveSidebar('explorer');
              }}
            >
              {part}
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-[var(--ide-base,#000)] ${ideTheme}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-[var(--ide-text-muted,#9ca3af)] font-medium animate-pulse">Initializing Virtual Workspace...</p>
        </div>
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
        <div className={`bg-background text-on-background font-ui-body text-[13px] h-screen w-screen overflow-hidden flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container ${ideTheme}`}>
      
      {/* TopNavBar */}
      <header className="bg-surface-container w-full h-[32px] border-b border-outline-variant flex items-center justify-between px-3 z-40 shrink-0 relative">
        <div className="flex items-center gap-4">
          <div className="font-ui-header text-[14px] font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>terminal</span>
            ProEditor
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Link to={`/dashboard/projects/${projectId}`} className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors">Dashboard</Link>
            <div id="file-menu-container" className="relative">
              <button 
                onClick={() => setShowFileMenu(!showFileMenu)}
                className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors"
              >
                File
              </button>
              {showFileMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50 py-1">
                  <button 
                    onClick={() => {
                      setShowFileMenu(false);
                      fileInputRef.current?.click();
                    }}
                    className="w-full text-left px-3 py-1.5 text-[13px] text-on-surface hover:bg-surface-variant transition-colors"
                  >
                    Upload Local File
                  </button>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <a href="#" className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors">Edit</a>
          </nav>
        </div>

        {/* Command Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block w-96 z-50">
          <div className="relative group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant w-3.5 h-3.5" />
            <input 
              type="text" 
              placeholder={`Search ${projectId || 'Project'}`}
              className="w-full bg-surface-variant/50 border border-outline-variant/30 text-on-surface text-[13px] rounded-md py-0.5 pl-8 pr-12 focus:outline-none focus:border-primary focus:bg-surface-variant transition-colors placeholder:text-on-surface-variant/50 h-6"
            />
          </div>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleSave()}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors text-white text-[11px] font-medium ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/[0.05]'}`}
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          
          {!previewUrl && (
            <button 
              onClick={handleRunProject}
              disabled={isStarting}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary text-on-primary transition-colors text-[11px] font-medium ${isStarting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
              {isStarting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
              {isStarting ? 'Installing...' : 'Run'}
            </button>
          )}

          <button onClick={() => setShowSettingsModal(true)} className="p-0.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden relative">
      
      {/* Activity Bar */}
        <aside className="w-12 h-full bg-surface-container-low border-r border-outline-variant flex flex-col items-center py-2 shrink-0 z-30">
          <nav className="flex flex-col gap-2 w-full items-center">
            <button 
              onClick={() => toggleSidebar('explorer')}
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative ${activeSidebar === 'explorer' ? 'text-primary border-l-2 border-primary bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="Explorer"
            >
              <Files className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={() => toggleSidebar('search')}
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative ${activeSidebar === 'search' ? 'text-primary border-l-2 border-primary bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={() => toggleSidebar('git')}
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative ${activeSidebar === 'git' ? 'text-primary border-l-2 border-primary bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="Source Control"
            >
              <GitBranch className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={handleAiChatClick}
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative ${isAiChatOpen ? 'text-tertiary-container border-l-2 border-tertiary-container bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="AI Assistant"
            >
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </button>
          </nav>
          
          <div className="mt-auto flex flex-col gap-2 w-full items-center pb-2 relative">
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all duration-200" 
              title="Themes"
            >
              <Palette className="w-5 h-5 stroke-[1.5]" />
            </button>
            {showThemeMenu && (
              <div className="absolute bottom-0 left-full ml-2 w-48 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50">
                <div className="px-3 py-2 border-b border-outline-variant">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Color Theme</span>
                </div>
                <div className="p-1 flex flex-col">
                  {[
                    { id: 'theme-obsidian', name: 'Obsidian Glass (Default)' },
                    { id: 'theme-dark', name: 'Dark' }
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => { setIdeTheme(theme.id); setShowThemeMenu(false); }}
                      className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${ideTheme === theme.id ? 'bg-primary-container/20 text-primary' : 'text-on-surface hover:bg-surface-variant'}`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Sidebar */}
        {activeSidebar && (
          <>
            <div className="shrink-0 flex flex-col bg-surface-container-low border-r border-outline-variant z-20 glass-panel" style={{ width: sidebarWidth }}>
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
                <SourceControlPanel 
                  webcontainer={webcontainer} 
                  ydoc={ydoc} 
                  onPullComplete={() => handleSave(true)}
                />
              )}
            </div>
            {/* Sidebar Splitter */}
            <div 
              className="w-1 cursor-col-resize hover:bg-outline-variant bg-transparent transition-colors z-20 shrink-0"
              onMouseDown={() => setIsResizingSidebar(true)}
            />
          </>
        )}

        {/* Center: Editor, Preview & Terminal */}
        <main className="flex-1 flex flex-col level-0 relative overflow-hidden">
          
          {/* Top: Editor & Preview Split */}
          <div className="flex-1 min-h-0 flex">
            
            {/* Editor Area */}
            <div className={`flex-1 min-w-0 flex bg-transparent relative ${previewUrl ? 'border-r border-outline-variant' : ''}`}>
              {editorGroups.map((group, index) => (
                <div 
                  key={group.id} 
                  className={`flex-1 flex flex-col min-w-0 ${index > 0 ? 'border-l border-outline-variant' : ''}`}
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
                  {getBreadcrumbs(group.activeTab)}
                  <div className={`flex-1 min-h-0 relative ${activeGroupId === group.id ? 'ring-1 ring-inset ring-blue-500/10' : ''}`}>
                    <MonacoEditor 
                      projectId={projectId || 'default'}
                      filePath={group.activeTab}
                      initialContent={""}
                      webcontainer={webcontainer}
                      ydoc={ydoc}
                      provider={provider}
                      theme={ideTheme}
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
              <div className={`${isPreviewFullscreen ? 'fixed inset-0 z-50' : 'w-1/2 min-w-[300px] h-full'} bg-surface-container-lowest flex flex-col relative`}>
                <div className="h-9 flex items-center justify-between px-3 border-b border-outline-variant bg-surface-container-low glass-panel shrink-0">
                  <div className="flex items-center gap-2 text-[var(--ide-text-muted)] text-xs font-medium">
                    <Globe className="w-4 h-4" />
                    Preview
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                      className="p-1 hover:bg-[var(--ide-hover)] rounded text-[var(--ide-text-muted)] hover:text-[var(--ide-text)] transition-colors"
                      title={isPreviewFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isPreviewFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                    <a 
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="p-1 hover:bg-[var(--ide-hover)] rounded text-[var(--ide-text-muted)] hover:text-[var(--ide-text)] transition-colors"
                      title="Open in new tab"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </a>
                    <button 
                      onClick={() => setPreviewUrl(null)}
                      className="p-1 hover:bg-red-500/20 rounded text-[var(--ide-text-muted)] hover:text-red-400 transition-colors"
                      title="Close Preview"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <iframe src={previewUrl} className="w-full flex-1 border-none bg-white" />
              </div>
            )}
            
          </div>

          {/* Terminal / Panel Area */}
          {isTerminalOpen && (
            <div className="flex flex-col shrink-0 border-t border-outline-variant bg-surface-container-low z-20 glass-panel" style={{ height: terminalHeight }}>
              <div 
                className="h-1 cursor-row-resize hover:bg-[var(--ide-border-hover)] bg-[var(--ide-border)] transition-colors -mt-1 z-20"
                onMouseDown={() => setIsResizingTerminal(true)}
              />
              <TerminalTabs webcontainer={webcontainer} onClose={() => setIsTerminalOpen(false)} theme={ideTheme} />
            </div>
          )}
        </main>

        {/* AI Chat Right Sidebar */}
        {isAiChatOpen && (
          <>
            <div 
              className="w-1 cursor-col-resize hover:bg-outline-variant bg-transparent transition-colors z-20 shrink-0"
              onMouseDown={() => setIsResizingAiChat(true)}
            />
            <div className="shrink-0 flex flex-col bg-surface-container-low border-r border-outline-variant z-20 glass-panel" style={{ width: aiChatWidth }}>
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
      
      {/* Footer Status Bar */}
      <footer className="bg-primary text-on-primary font-ui-label-sm text-[11px] w-full h-[24px] flex justify-between items-center px-2 z-50 shrink-0 cursor-default">
        <div className="flex items-center gap-3 h-full">
          <a href="#" className="font-bold hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">v1.0.0</a>
          <div className="flex items-center gap-1 hover:bg-on-primary-fixed-variant px-1.5 h-full transition-colors cursor-pointer opacity-90">
            <span className="material-symbols-outlined" style={{fontSize: '14px'}}>error</span>
            <span>0</span>
            <span className="material-symbols-outlined ml-1" style={{fontSize: '14px'}}>warning</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 h-full">
          <span className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">LF</span>
          <span className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">UTF-8</span>
          <span className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">TypeScript</span>
          <div className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 h-full transition-colors cursor-pointer flex items-center gap-1">
            <span className="material-symbols-outlined" style={{fontSize: '14px'}}>done_all</span>
            Prettier
          </div>
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="hover:bg-on-primary-fixed-variant px-1.5 h-full transition-colors cursor-pointer flex items-center"
            title="Toggle Terminal"
          >
            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>terminal</span>
          </button>
        </div>
      </footer>

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal 
          onClose={() => setShowSettingsModal(false)} 
        />
      )}
    </div>
  );
}
