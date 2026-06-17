import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI coding assistant. How can I help you with your project today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I am currently running in a simulated demo mode. To connect me to a real LLM like OpenAI or Gemini, you just need to add your API key to the backend!

But if I were connected, I could definitely help you write code for:
\`\`\`javascript
// Implementation for: ${userMsg.content}
const feature = "${userMsg.content}";
console.log("Building " + feature);
\`\`\``
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full shrink-0 h-full bg-[#0A0A0A] z-20">
      {/* Header */}
      <div className="h-14 border-b border-white/[0.05] flex items-center justify-between px-4 shrink-0 bg-[#050505]">
        <div className="flex items-center gap-2 text-gray-200 font-medium text-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          AI Assistant
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/[0.1] rounded text-gray-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className="flex gap-3 text-sm">
            <div className="shrink-0 mt-0.5">
              {msg.role === 'assistant' ? (
                <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded bg-white/[0.1] flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-gray-300" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1.5 overflow-hidden text-gray-300">
              <div className="font-medium text-gray-500 text-[10px] uppercase tracking-wider">
                {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
              </div>
              <div className="whitespace-pre-wrap break-words leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 text-sm">
            <div className="shrink-0 mt-0.5">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="flex-1 text-gray-400 mt-1">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/[0.05] bg-[#050505]">
        <form onSubmit={handleSubmit} className="relative flex items-end bg-[#111] border border-white/[0.1] focus-within:border-purple-500/50 rounded-xl overflow-hidden transition-colors">
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask AI to write code..."
            className="w-full bg-transparent text-sm text-white p-3 pr-10 resize-none max-h-32 focus:outline-none placeholder-gray-600 no-scrollbar"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-1.5 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center mt-2 text-[10px] text-gray-600">
          AI can make mistakes. Check its code.
        </div>
      </div>
    </div>
  );
}
