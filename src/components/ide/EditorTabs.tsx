import { useState } from 'react';
import { X, LayoutPanelLeft } from 'lucide-react';

interface EditorTabsProps {
  tabs: string[];
  activeTab: string | null;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
  onSplitEditor?: () => void;
  showSplitButton?: boolean;
  onFileDrop?: (path: string) => void;
}

export function EditorTabs({ tabs, activeTab, onTabClick, onTabClose, onSplitEditor, showSplitButton, onFileDrop }: EditorTabsProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  if (tabs.length === 0 && !isDragOver) return null;

  return (
    <div 
      className={`flex bg-[var(--ide-panel-darker)] border-b overflow-x-auto no-scrollbar relative items-center min-h-[36px] transition-colors ${isDragOver ? 'border-blue-500 bg-blue-500/10' : 'border-[var(--ide-border)]'}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const path = e.dataTransfer.getData('text/plain');
        if (path && onFileDrop) onFileDrop(path);
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab;
        const filename = tab.split('/').pop() || tab;
        
        return (
          <div
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`group flex items-center gap-2 px-3 py-2 text-xs font-medium cursor-pointer border-r border-[var(--ide-border)] min-w-[120px] max-w-[200px] transition-colors ${
              isActive 
                ? 'bg-[var(--ide-base)] text-blue-400 border-t-2 border-t-blue-500' 
                : 'bg-[#0a0a0a] text-[var(--ide-text-muted)] hover:bg-[var(--ide-panel-lighter)] hover:text-[var(--ide-text)] border-t-2 border-t-transparent'
            }`}
          >
            <span className="truncate flex-1" title={tab}>{filename}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab);
              }}
              className={`p-0.5 rounded-md hover:bg-white/10 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
      
      {showSplitButton && onSplitEditor && (
        <button 
          onClick={onSplitEditor}
          className="absolute right-2 p-1.5 text-[var(--ide-text-muted)] hover:text-[var(--ide-text)] hover:bg-white/10 rounded-md transition-colors"
          title="Split Editor Right"
        >
          <LayoutPanelLeft className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
