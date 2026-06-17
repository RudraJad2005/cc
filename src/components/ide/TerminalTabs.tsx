import React, { useState, useRef, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from './Terminal';
import { Plus, X, TerminalSquare, ChevronDown, MonitorPlay, GitBranch } from 'lucide-react';

interface TerminalTabsProps {
  webcontainer: WebContainer | null;
  onClose: () => void;
}

type TerminalType = 'bash' | 'node' | 'git';

export function TerminalTabs({ webcontainer, onClose }: TerminalTabsProps) {
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
    <div className="flex flex-col w-full h-full bg-[#050505]">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#0A0A0A] pr-2 shrink-0">
        <div className="flex items-center overflow-x-auto no-scrollbar flex-1">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-2 px-3 py-2 cursor-pointer border-r border-white/[0.05] min-w-[120px] max-w-[200px] text-xs font-medium transition-colors ${activeTab === tab.id ? 'bg-[#050505] text-blue-400 border-t-2 border-t-blue-500' : 'bg-[#0A0A0A] text-gray-500 hover:bg-[#111] border-t-2 border-t-transparent'}`}
            >
              {tab.type === 'node' ? <MonitorPlay className="w-3.5 h-3.5 shrink-0" /> : tab.type === 'git' ? <GitBranch className="w-3.5 h-3.5 shrink-0" /> : <TerminalSquare className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate flex-1">{tab.name}</span>
              <button 
                onClick={(e) => handleCloseTab(e, tab.id)}
                className={`p-0.5 rounded hover:bg-white/[0.1] hover:text-white transition-colors ${activeTab === tab.id ? 'text-gray-400' : 'text-gray-600 opacity-0 group-hover:opacity-100'}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center shrink-0">
          <div className="relative flex items-center mr-2" ref={dropdownRef}>
            <button 
              onClick={() => handleAddTab('bash')}
              className="p-1.5 text-gray-500 hover:text-white hover:bg-white/[0.1] rounded transition-colors"
              title="New Terminal"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1.5 text-gray-500 hover:text-white hover:bg-white/[0.1] rounded transition-colors"
              title="Launch Profile"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-[#111] border border-white/[0.1] rounded-lg shadow-xl overflow-hidden z-50">
                <button 
                  onClick={() => handleAddTab('bash')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 transition-colors text-left"
                >
                  <TerminalSquare className="w-4 h-4" />
                  Bash
                </button>
                <button 
                  onClick={() => handleAddTab('node')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-green-500/20 transition-colors text-left"
                >
                  <MonitorPlay className="w-4 h-4" />
                  Node.js
                </button>
              </div>
            )}
          </div>
          
          <div className="w-px h-4 bg-white/[0.1] mx-1 mr-2" />

          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-white/[0.1] text-gray-500 hover:text-white transition-colors"
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
            <Terminal webcontainer={webcontainer} hidden={activeTab !== tab.id} type={tab.type} />
          </div>
        ))}
      </div>
    </div>
  );
}
