import { X, LayoutPanelLeft } from 'lucide-react';

interface EditorTabsProps {
  tabs: string[];
  activeTab: string | null;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
  onSplitEditor?: () => void;
  showSplitButton?: boolean;
}

export function EditorTabs({ tabs, activeTab, onTabClick, onTabClose, onSplitEditor, showSplitButton }: EditorTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <div className="flex bg-[#050505] border-b border-white/[0.05] overflow-x-auto no-scrollbar relative items-center">
      {tabs.map(tab => {
        const isActive = activeTab === tab;
        const filename = tab.split('/').pop() || tab;
        
        return (
          <div
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`group flex items-center gap-2 px-3 py-2 text-xs font-medium cursor-pointer border-r border-white/[0.05] min-w-[120px] max-w-[200px] transition-colors ${
              isActive 
                ? 'bg-[#000] text-blue-400 border-t-2 border-t-blue-500' 
                : 'bg-[#0a0a0a] text-gray-500 hover:bg-[#111] hover:text-gray-300 border-t-2 border-t-transparent'
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
          className="absolute right-2 p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          title="Split Editor Right"
        >
          <LayoutPanelLeft className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
