import React, { useState, useEffect } from 'react';
import { Settings, Key, X, Sparkles, Check, ToggleLeft, ToggleRight } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isCopilotEnabled, setIsCopilotEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('aiApiKey');
    if (savedKey) setApiKey(savedKey);
    
    const savedCopilot = localStorage.getItem('aiCopilotEnabled');
    if (savedCopilot !== null) {
      setIsCopilotEnabled(savedCopilot === 'true');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('aiApiKey', apiKey.trim());
    localStorage.setItem('aiCopilotEnabled', isCopilotEnabled.toString());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--ide-panel-darker)] border border-[var(--ide-border)] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
               <Settings className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">IDE Settings</h2>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* AI Copilot Toggle */}
            <div className="bg-[var(--ide-panel-lighter)] border border-[var(--ide-border)] rounded-xl p-4 flex items-center justify-between">
              <div>
                 <h3 className="text-sm font-medium text-white flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-purple-400" />
                   AI Copilot (Ghost Text)
                 </h3>
                 <p className="text-xs text-[var(--ide-text-muted)] mt-1">
                   Automatically suggest code completions as you type.
                 </p>
              </div>
              <button 
                onClick={() => setIsCopilotEnabled(!isCopilotEnabled)}
                className={`transition-colors ${isCopilotEnabled ? 'text-blue-500' : 'text-gray-500'}`}
              >
                {isCopilotEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>

            {/* API Key Input */}
            <div>
              <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-400" />
                Gemini API Key
              </h3>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key here..."
                className="w-full bg-[var(--ide-panel-lighter)] border border-[var(--ide-border)] rounded-xl px-4 py-3 text-sm text-[var(--ide-text)] placeholder-[var(--ide-text-muted)] focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <p className="text-xs text-[var(--ide-text-muted)] mt-2">
                Stored securely in your local browser storage.
              </p>
            </div>
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              className={`w-full font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                saved 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved Successfully!
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
