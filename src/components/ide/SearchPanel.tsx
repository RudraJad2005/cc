import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, ReplaceAll, Replace } from 'lucide-react';

export function SearchPanel() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');

  return (
    <div className="flex flex-col w-full h-full bg-[#0A0A0A] border-r border-white/[0.05] overflow-y-auto">
      
      {/* Search Header Accordion */}
      <button 
        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        className="flex items-center w-full px-2 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-wider bg-[#050505] sticky top-0 z-10"
      >
        {isSearchExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
        Search
      </button>

      {isSearchExpanded && (
        <div className="px-4 py-3 flex flex-col gap-3">
          
          {/* Search Input */}
          <div className="flex flex-col gap-1.5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-[#111] border border-white/[0.1] rounded px-3 py-1.5 pl-9 text-[13px] text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Replace Input */}
          <div className="flex flex-col gap-1.5">
            <div className="relative group flex items-center gap-1">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                  <Replace className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  placeholder="Replace"
                  className="w-full bg-[#111] border border-white/[0.1] rounded px-3 py-1.5 pl-9 text-[13px] text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <button className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-white/[0.05] rounded" title="Replace All">
                <ReplaceAll className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Details Toggle */}
          <button 
            onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            className="flex items-center text-[11px] text-gray-500 hover:text-gray-300 mt-2 font-medium"
          >
            {isDetailsExpanded ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
            ...
          </button>

          {/* Search Details Content */}
          {isDetailsExpanded && (
            <div className="flex flex-col gap-3 mt-1 animate-in slide-in-from-top-1 duration-200 fade-in">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-gray-500 font-medium">files to include</label>
                <input
                  type="text"
                  placeholder="e.g. *.ts, src/components/"
                  className="w-full bg-[#111] border border-white/[0.1] rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-gray-500 font-medium">files to exclude</label>
                <input
                  type="text"
                  placeholder="e.g. *.svg, node_modules/"
                  className="w-full bg-[#111] border border-white/[0.1] rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-8">
            <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">Search functionality</p>
            <p className="text-xs text-gray-600 mt-1">coming soon</p>
          </div>

        </div>
      )}
    </div>
  );
}
