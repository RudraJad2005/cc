import React, { useState } from 'react';
import { diffLines } from 'diff';
import { ChevronDown, ChevronUp, FileCode } from 'lucide-react';

interface DiffViewerProps {
  filePath: string;
  oldContent: string;
  newContent: string;
}

export function DiffViewer({ filePath, oldContent, newContent }: DiffViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const differences = diffLines(oldContent, newContent);
  const additions = differences.filter(d => d.added).reduce((acc, d) => acc + (d.count || 0), 0);
  const deletions = differences.filter(d => d.removed).reduce((acc, d) => acc + (d.count || 0), 0);

  return (
    <div className="mt-3 border border-[var(--ide-border)] rounded-lg overflow-hidden bg-[var(--ide-panel-darker)] flex flex-col">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-2.5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors border-b border-white/[0.1] text-xs font-medium text-gray-300"
      >
        <div className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-blue-400" />
          <span>{filePath}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 text-[10px]">
            <span className="text-green-400">+{additions}</span>
            <span className="text-red-400">-{deletions}</span>
          </div>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="overflow-x-auto text-[11px] font-mono leading-tight max-h-[300px] overflow-y-auto no-scrollbar">
          {differences.map((part, index) => {
            const lines = part.value.split('\n');
            if (lines[lines.length - 1] === '') lines.pop(); // Remove trailing empty line from split
            
            return (
              <div 
                key={index} 
                className={`
                  ${part.added ? 'bg-green-500/10 text-green-300' : ''}
                  ${part.removed ? 'bg-red-500/10 text-red-300' : ''}
                  ${!part.added && !part.removed ? 'text-gray-400' : ''}
                `}
              >
                {lines.map((line, i) => (
                  <div key={i} className="flex px-3 py-0.5 hover:bg-white/[0.02]">
                    <span className="w-4 shrink-0 opacity-50 select-none">
                      {part.added ? '+' : part.removed ? '-' : ' '}
                    </span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
