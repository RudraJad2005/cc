import React, { useState, useRef, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from './Terminal';
import { Plus, X, TerminalSquare, ChevronDown, MonitorPlay, GitBranch } from 'lucide-react';
interface TerminalTabsProps {
  webcontainer: WebContainer | null;
  onClose: () => void;
  theme?: string;
}

type TerminalType = 'bash' | 'node' | 'git';

export function TerminalTabs({ webcontainer, onClose, theme }: TerminalTabsProps) {
  const [tabs, setTabs] = useState<{ id: string, name: string, type: TerminalType }[]>([
    { id: 'term-1', name: 'Bash', type: 'bash' }
  ]);
  const [activeTab, setActiveTab] = useState('term-1');
  const [nextId, setNextId] = useState(2);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTab = (type: TerminalType = 'bash') => {
    const newId = `term-${nextId}`;
    let name = 'Bash';
    if (type === 'node') name = 'Node.js';
    if (type === 'git') name = 'Git Bash';
    
    setTabs([...tabs, { id: newId, name, type }]);
    setActiveTab(newId);
    setNextId(nextId + 1);
    setShowDropdown(false);
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== id);
    if (newTabs.length === 0) {
      onClose();
    } else {
      if (activeTab === id) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      }
      setTabs(newTabs);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-surface-container-low">
      {/* Header Tabs */}
      <div className="flex items-center h-8 px-4 gap-4 border-b border-outline-variant/30 font-ui-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider shrink-0 glass-panel">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar flex-1">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-1.5 cursor-pointer pb-1 transition-colors ${activeTab === tab.id ? 'text-on-surface border-b-2 border-primary font-bold' : 'hover:text-on-surface border-b-2 border-transparent'}`}
            >
              {tab.type === 'node' ? <MonitorPlay className="w-3.5 h-3.5 shrink-0" /> : tab.type === 'git' ? <GitBranch className="w-3.5 h-3.5 shrink-0" /> : <TerminalSquare className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">{tab.name}</span>
              <button 
                onClick={(e) => handleCloseTab(e, tab.id)}
                className={`p-0.5 rounded hover:bg-surface-variant transition-colors ${activeTab === tab.id ? 'text-on-surface-variant' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center shrink-0 ml-auto gap-2">
          <div className="relative flex items-center" ref={dropdownRef}>
            <button 
              onClick={() => handleAddTab('bash')}
              className="p-0.5 hover:bg-surface-variant rounded text-on-surface-variant transition-colors"
              title="New Terminal"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-0.5 hover:bg-surface-variant rounded text-on-surface-variant transition-colors"
              title="Launch Profile"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-surface-container border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50 normal-case">
                <button 
                  onClick={() => handleAddTab('bash')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-on-surface hover:bg-primary-container/20 hover:text-primary transition-colors text-left"
                >
                  <TerminalSquare className="w-4 h-4" />
                  Bash
                </button>
                <button 
                  onClick={() => handleAddTab('node')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-on-surface hover:bg-secondary-container/20 hover:text-secondary transition-colors text-left"
                >
                  <MonitorPlay className="w-4 h-4" />
                  Node.js
                </button>
              </div>
            )}
          </div>
          
          <button 
            onClick={onClose}
            className="p-0.5 hover:bg-surface-variant rounded text-on-surface-variant transition-colors"
            title="Close Terminal Area"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Instances */}
      <div className="flex-1 relative">
        {tabs.map(tab => (
          <div key={tab.id} className={`absolute inset-0 ${activeTab === tab.id ? 'z-10' : 'z-0 hidden'}`}>
            <Terminal webcontainer={webcontainer} hidden={activeTab !== tab.id} type={tab.type} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  );
}
