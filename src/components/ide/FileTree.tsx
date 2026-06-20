import React, { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Folder, FolderOpen, File as FileIcon, ChevronRight, ChevronDown, FileCode2, FileJson, Image as ImageIcon, FilePlus, FolderPlus, Trash2, FileText, Code, Braces, Terminal, Settings, Layout, FileType2, Database } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FileTreeProps {
  projectId: string;
  webcontainer: WebContainer | null;
  onFileSelect: (path: string, content: string) => void;
  selectedFile: string | null;
  onFileSystemChange?: () => void;
  isOwner?: boolean;
}

interface TreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: TreeNode[];
}

export function FileTree({ projectId, webcontainer, onFileSelect, selectedFile, onFileSystemChange, isOwner = true }: FileTreeProps) {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));
  const [channel, setChannel] = useState<any>(null);
  
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [createName, setCreateName] = useState('');
  const [createParentPath, setCreateParentPath] = useState('/');

  const buildTree = async (dirPath: string, currentExpanded: Set<string>): Promise<TreeNode[]> => {
    if (!webcontainer) return [];
    try {
      const entries = await webcontainer.fs.readdir(dirPath, { withFileTypes: true });
      const nodes: TreeNode[] = [];
      
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        
        const fullPath = dirPath === '/' ? `/${entry.name}` : `${dirPath}/${entry.name}`;
        if (entry.isDirectory()) {
          const node: TreeNode = {
            name: entry.name,
            path: fullPath,
            isDirectory: true,
          };
          // If the folder is expanded, recursively fetch its children
          if (currentExpanded.has(fullPath)) {
            node.children = await buildTree(fullPath, currentExpanded);
          }
          nodes.push(node);
        } else {
          nodes.push({
            name: entry.name,
            path: fullPath,
            isDirectory: false
          });
        }
      }
      
      nodes.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
      
      return nodes;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const refreshRoot = (currentExpanded = expandedFolders) => {
    // Without a booted container there is nothing to read — clear the spinner
    // instead of leaving "Loading filesystem..." up forever.
    if (!webcontainer) {
      setIsLoading(false);
      return;
    }
    buildTree('/', currentExpanded)
      .then(setTree)
      .catch((e) => console.error('Failed to build file tree', e))
      // .finally guarantees the loading state resolves whether the read
      // succeeds, fails, or the tree comes back empty.
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!webcontainer || !projectId) return;

    // Initial load
    setIsLoading(true);
    refreshRoot();
    
    const handleFsSynced = () => refreshRoot();
    window.addEventListener('fs_synced', handleFsSynced);
    
    const ch = supabase.channel(`collab-code-${projectId}-fs`);
    
    ch.on('broadcast', { event: 'fs_update' }, async ({ payload }) => {
      try {
        if (payload.action === 'mkdir') await webcontainer.fs.mkdir(payload.path);
        else if (payload.action === 'writeFile') await webcontainer.fs.writeFile(payload.path, payload.content || '');
        else if (payload.action === 'rm') await webcontainer.fs.rm(payload.path, { recursive: true });
        
        refreshRoot();
        
        // ONLY the project owner should save remote changes to the database to prevent race conditions
        if (isOwner && onFileSystemChange) {
          onFileSystemChange();
        }
      } catch (e) {
        console.error("Remote FS update failed", e);
      }
    });

    ch.subscribe();
    setChannel(ch);

    return () => { 
      ch.unsubscribe(); 
      window.removeEventListener('fs_synced', handleFsSynced);
    };
  }, [webcontainer, projectId]);

  const handleToggleFolder = async (node: TreeNode) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(node.path)) {
      newExpanded.delete(node.path);
    } else {
      newExpanded.add(node.path);
    }
    setExpandedFolders(newExpanded);
    refreshRoot(newExpanded);
  };

  const handleFileClick = async (node: TreeNode) => {
    if (!webcontainer) return;
    try {
      const content = await webcontainer.fs.readFile(node.path, 'utf-8');
      onFileSelect(node.path, content);
    } catch (e) {
      console.error("Failed to read file", e);
    }
  };

  const handleDelete = async (e: React.MouseEvent, node: TreeNode) => {
    e.stopPropagation();
    if (!webcontainer) return;
    if (confirm(`Are you sure you want to delete ${node.name}?`)) {
      try {
        await webcontainer.fs.rm(node.path, { recursive: true });
        
        // Broadcast delete
        if (channel) {
          channel.send({ type: 'broadcast', event: 'fs_update', payload: { action: 'rm', path: node.path } });
        }

        refreshRoot();
        if (onFileSystemChange) onFileSystemChange();
        if (selectedFile === node.path) {
          onFileSelect('', ''); // Deselect if deleted
        }
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webcontainer || !createName) return;
    
    const targetPath = createParentPath === '/' ? `/${createName}` : `${createParentPath}/${createName}`;
    
    try {
      if (isCreating === 'folder') {
        await webcontainer.fs.mkdir(targetPath);
        if (channel) channel.send({ type: 'broadcast', event: 'fs_update', payload: { action: 'mkdir', path: targetPath } });
      } else {
        await webcontainer.fs.writeFile(targetPath, '');
        if (channel) channel.send({ type: 'broadcast', event: 'fs_update', payload: { action: 'writeFile', path: targetPath, content: '' } });
      }
      setIsCreating(null);
      setCreateName('');
      refreshRoot();
      if (onFileSystemChange) onFileSystemChange();
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (name === 'package.json') return <Braces className="w-4 h-4 text-red-400" />;
    if (name.startsWith('.env')) return <Settings className="w-4 h-4 text-[var(--ide-text-muted)]" />;
    
    switch (ext) {
      case 'ts':
      case 'tsx':
        return <FileType2 className="w-4 h-4 text-blue-400" />;
      case 'js':
      case 'jsx':
        return <FileCode2 className="w-4 h-4 text-yellow-400" />;
      case 'py':
      case 'pyw':
        return <FileCode2 className="w-4 h-4 text-blue-500" />;
      case 'json':
        return <Braces className="w-4 h-4 text-yellow-200" />;
      case 'css':
      case 'scss':
      case 'less':
        return <Layout className="w-4 h-4 text-pink-400" />;
      case 'html':
        return <Code className="w-4 h-4 text-orange-400" />;
      case 'md':
      case 'txt':
        return <FileText className="w-4 h-4 text-[var(--ide-text-muted)]" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
      case 'gif':
      case 'ico':
        return <ImageIcon className="w-4 h-4 text-green-400" />;
      default:
        return <FileIcon className="w-4 h-4 text-[var(--ide-text-muted)]" />;
    }
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path} className="flex flex-col">
        <div 
          draggable={!node.isDirectory}
          onDragStart={(e) => {
            if (!node.isDirectory) {
              e.dataTransfer.setData('text/plain', node.path);
              e.dataTransfer.effectAllowed = 'copyMove';
            }
          }}
          className={`group flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[var(--ide-hover)] transition-colors ${isSelected ? 'bg-blue-500/10 text-blue-400' : 'text-[var(--ide-text)]'}`}
          style={{ paddingLeft: `${(depth * 12) + 8}px` }}
          onClick={() => node.isDirectory ? handleToggleFolder(node) : handleFileClick(node)}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {node.isDirectory ? (
              <>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-[var(--ide-text-muted)] shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-[var(--ide-text-muted)] shrink-0" />}
                {isExpanded ? <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" /> : <Folder className="w-4 h-4 text-blue-400 shrink-0" />}
              </>
            ) : (
              <>
                <span className="w-3.5 shrink-0"></span>
                {getFileIcon(node.name)}
              </>
            )}
            <span className="text-[13px] truncate">{node.name}</span>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 flex items-center pr-2 gap-0.5">
            {node.isDirectory && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreating('file');
                    setCreateParentPath(node.path);
                    if (!isExpanded) handleToggleFolder(node);
                  }}
                  className="p-1 hover:bg-[var(--ide-hover)] rounded transition-colors text-[var(--ide-text-muted)] hover:text-[var(--ide-text)]"
                  title="New File"
                >
                  <FilePlus className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreating('folder');
                    setCreateParentPath(node.path);
                    if (!isExpanded) handleToggleFolder(node);
                  }}
                  className="p-1 hover:bg-[var(--ide-hover)] rounded transition-colors text-[var(--ide-text-muted)] hover:text-[var(--ide-text)]"
                  title="New Folder"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <button 
              onClick={(e) => handleDelete(e, node)}
              className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors text-[var(--ide-text-muted)]"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {node.isDirectory && isExpanded && node.children && (
          <div className="flex flex-col">
            {node.children.map(child => renderNode(child, depth + 1))}
            
            {/* Inline creation input for this specific folder if selected as parent */}
            {isCreating && createParentPath === node.path && (
               <div className="py-1 px-2 flex items-center gap-1.5" style={{ paddingLeft: `${((depth + 1) * 12) + 8}px` }}>
                 <span className="w-3.5 shrink-0"></span>
                 {isCreating === 'folder' ? <Folder className="w-4 h-4 text-blue-400" /> : <FileIcon className="w-4 h-4 text-[var(--ide-text-muted)]" />}
                 <form onSubmit={handleCreateSubmit} className="flex-1">
                   <input 
                     autoFocus
                     type="text" 
                     value={createName}
                     onChange={e => setCreateName(e.target.value)}
                     onKeyDown={(e) => { if (e.key === 'Escape') setIsCreating(null) }}
                     className="w-full bg-[var(--ide-panel-lighter)] border border-blue-500/50 rounded px-1.5 py-0.5 text-[13px] text-[var(--ide-text)] focus:outline-none"
                     placeholder={isCreating === 'folder' ? 'Folder name...' : 'File name...'}
                   />
                 </form>
               </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const [isExplorerExpanded, setIsExplorerExpanded] = useState(true);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden bg-[var(--ide-panel)] border-r border-[var(--ide-border)]">
      
      {/* Explorer Header Accordion */}
      <button 
        onClick={() => setIsExplorerExpanded(!isExplorerExpanded)}
        className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold text-[var(--ide-text-muted)] hover:text-[var(--ide-text)] transition-colors uppercase tracking-wider bg-[var(--ide-panel-darker)] sticky top-0 z-10 group"
      >
        <div className="flex items-center">
          {isExplorerExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
          Explorer
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div 
            onClick={(e) => { e.stopPropagation(); setIsCreating('file'); setCreateParentPath('/'); if(!isExplorerExpanded) setIsExplorerExpanded(true); }}
            className="p-1 hover:bg-[var(--ide-hover)] rounded text-[var(--ide-text-muted)] hover:text-[var(--ide-text)] transition-colors"
            title="New File"
          >
            <FilePlus className="w-3.5 h-3.5" />
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); setIsCreating('folder'); setCreateParentPath('/'); if(!isExplorerExpanded) setIsExplorerExpanded(true); }}
            className="p-1 hover:bg-[var(--ide-hover)] rounded text-[var(--ide-text-muted)] hover:text-[var(--ide-text)] transition-colors"
            title="New Folder"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </div>
        </div>
      </button>

      {isExplorerExpanded && (
        <div className="flex flex-col py-2">
      
      {/* Root level creation input */}
      {isCreating && createParentPath === '/' && (
        <div className="py-1 px-2 flex items-center gap-1.5 pl-[8px]">
          <span className="w-3.5 shrink-0"></span>
          {isCreating === 'folder' ? <Folder className="w-4 h-4 text-blue-400" /> : <FileIcon className="w-4 h-4 text-[var(--ide-text-muted)]" />}
          <form onSubmit={handleCreateSubmit} className="flex-1">
            <input 
              autoFocus
              type="text" 
              value={createName}
              onChange={e => setCreateName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') setIsCreating(null) }}
              className="w-full bg-[var(--ide-panel-lighter)] border border-blue-500/50 rounded px-1.5 py-0.5 text-[13px] text-[var(--ide-text)] focus:outline-none"
              placeholder={isCreating === 'folder' ? 'Folder name...' : 'File name...'}
            />
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="px-4 py-2 text-xs text-[var(--ide-text-muted)]">Loading filesystem...</div>
      ) : tree.length === 0 ? (
        <div className="px-4 py-2 text-xs text-[var(--ide-text-muted)]">This folder is empty. Create a file to get started.</div>
      ) : (
        tree.map(node => renderNode(node, 0))
      )}
      </div>
      )}
    </div>
  );
}
