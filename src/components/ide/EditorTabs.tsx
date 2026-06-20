import { useState } from 'react';
import { X, LayoutPanelLeft } from 'lucide-react';
import { getFileIcon } from '../../utils/fileIcons';

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
      className={`flex items-end h-9 bg-surface-container-low border-b border-outline-variant shrink-0 px-2 gap-1 overflow-x-auto no-scrollbar glass-panel z-10 transition-colors ${isDragOver ? 'border-primary bg-primary/10' : ''}`}
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
            className={`group flex items-center h-8 px-3 cursor-pointer min-w-[120px] max-w-[200px] gap-2 transition-colors ${
              isActive 
                ? 'bg-surface-container-highest border-t-2 border-primary rounded-t-md' 
                : 'bg-surface-container border-t border-transparent hover:bg-surface-container-high rounded-t-md'
            }`}
          >
            {getFileIcon(filename, 'w-[15px] h-[15px] shrink-0' + (isActive ? '' : ' opacity-70'))}
            <span className={`font-ui-body text-[13px] truncate flex-1 ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`} title={tab}>{filename}</span>
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
