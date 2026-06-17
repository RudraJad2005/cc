import React, { useState } from 'react';
import { Key, X, Sparkles, ChevronRight } from 'lucide-react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
  onClose: () => void;
}

export function ApiKeyModal({ onSave, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 pb-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Connect AI Assistant</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            To use the AI coding assistant, please enter your LLM API Key (e.g., OpenAI or Gemini). Your key is stored securely in your browser's local storage and is never sent to our servers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <Key className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key here..."
                className="w-full bg-[#050505] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={!apiKey.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
            >
              Connect API Key
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
