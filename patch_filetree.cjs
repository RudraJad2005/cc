const fs = require('fs');
let code = fs.readFileSync('src/components/ide/FileTree.tsx', 'utf-8');

// 1. Add Pencil to lucide-react import
code = code.replace(
  /Trash2, FileText, Code, Braces, Terminal, Settings, Layout, FileType2, Database } from 'lucide-react';/,
  `Trash2, FileText, Code, Braces, Terminal, Settings, Layout, FileType2, Database, Pencil } from 'lucide-react';`
);

// 2. Add renaming state
code = code.replace(
  /  const \[createParentPath, setCreateParentPath\] = useState\('\/'\);/,
  `  const [createParentPath, setCreateParentPath] = useState('/');
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');`
);

// 3. Add handleRenameSubmit
code = code.replace(
  /  const handleCreateSubmit = async \(e: React.FormEvent\) => \{/,
  `  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webcontainer || !renamingPath || !renameValue.trim()) {
      setRenamingPath(null);
      return;
    }
    
    // Calculate new path
    const pathParts = renamingPath.split('/');
    pathParts.pop(); // Remove old name
    const newPath = pathParts.length > 0 && pathParts[0] !== '' 
      ? \`\${pathParts.join('/')}/\${renameValue.trim()}\`
      : \`/\${renameValue.trim()}\`;

    try {
      if (renamingPath !== newPath) {
        // webcontainer.fs.rename handles both files and directories
        await webcontainer.fs.rename(renamingPath, newPath);
        
        // Broadcast rename
        if (channel) {
          channel.send({ type: 'broadcast', event: 'fs_update', payload: { action: 'rename', oldPath: renamingPath, newPath: newPath } });
        }
        
        refreshRoot();
        if (onFileSystemChange) onFileSystemChange();
        
        // If the renamed file was selected, we might want to update it, but let's just deselect for now to be safe
        if (selectedFile === renamingPath) {
          onFileSelect('', '');
        }
      }
    } catch (err) {
      console.error("Rename failed", err);
    }
    
    setRenamingPath(null);
    setRenameValue('');
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {`
);

// 4. Update the event listener in useEffect for rename
code = code.replace(
  /        else if \(payload\.action === 'rm'\) await webcontainer\.fs\.rm\(payload\.path, \{ recursive: true \}\);/,
  `        else if (payload.action === 'rm') await webcontainer.fs.rm(payload.path, { recursive: true });
        else if (payload.action === 'rename') await webcontainer.fs.rename(payload.oldPath, payload.newPath);`
);

// 5. Update renderNode to show input if renaming
code = code.replace(
  /          <div className="flex items-center gap-1\.5 min-w-0">/,
  `          {renamingPath === node.path ? (
            <div className="flex items-center gap-1.5 w-full mr-2" onClick={e => e.stopPropagation()}>
              <span className="w-3.5 shrink-0"></span>
              {node.isDirectory ? <Folder className="w-4 h-4 text-blue-400 shrink-0" /> : getFileIcon(node.name)}
              <form onSubmit={handleRenameSubmit} className="flex-1 min-w-0">
                <input 
                  autoFocus
                  type="text" 
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setRenamingPath(null) }}
                  onBlur={() => setRenamingPath(null)}
                  className="w-full bg-[var(--ide-panel-lighter)] border border-blue-500/50 rounded px-1.5 py-0.5 text-[13px] text-[var(--ide-text)] focus:outline-none"
                />
              </form>
            </div>
          ) : (
          <div className="flex items-center gap-1.5 min-w-0">`
);

// 6. Close the original block
code = code.replace(
  /            <span className="text-\[13px\] truncate">\{node\.name\}<\/span>\n          <\/div>/,
  `            <span className="text-[13px] truncate">{node.name}</span>
          </div>
          )}`
);

// 7. Add Pencil icon button
code = code.replace(
  /            <button \n              onClick=\{\(e\) => handleDelete\(e, node\)\}/,
  `            <button 
              onClick={(e) => {
                e.stopPropagation();
                setRenamingPath(node.path);
                setRenameValue(node.name);
              }}
              className="p-1 hover:bg-[var(--ide-hover)] hover:text-[var(--ide-text)] rounded transition-colors text-[var(--ide-text-muted)]"
              title="Rename"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={(e) => handleDelete(e, node)}`
);

fs.writeFileSync('src/components/ide/FileTree.tsx', code);
