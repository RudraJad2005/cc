import React from 'react';
import { Bot, X, Sparkles } from 'lucide-react';
import { WebContainer } from '@webcontainer/api';

interface AIChatProps {
  onClose: () => void;
  webcontainer: WebContainer | null;
  onFileSystemChange: () => void;
  projectId: string;
}

export function AIChat({ onClose }: AIChatProps) {
  return (
    <div className="flex flex-col h-full bg-[var(--ide-panel)] border-l border-[var(--ide-border)]">
      {/* Header */}
      <div className="h-12 border-b border-[var(--ide-border)] flex items-center justify-between px-4 shrink-0 bg-[var(--ide-panel-darker)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-white">AI Assistant</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
          <Bot className="w-10 h-10 text-purple-400" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-purple-400 rounded-full"></div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">AI Coding Assistant</h3>
        <p className="text-gray-400 text-sm mb-8 max-w-[250px] leading-relaxed">
          We're training our models on millions of lines of code to bring you a magical pair programming experience.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-purple-400 uppercase tracking-widest shadow-inner">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
