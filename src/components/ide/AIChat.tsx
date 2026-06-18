import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, X, Trash2, Settings } from 'lucide-react';
import { WebContainer } from '@webcontainer/api';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DiffViewer } from './DiffViewer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  fileChanges?: {
    path: string;
    oldContent: string;
    newContent: string;
  }[];
  deletedFiles?: string[];
  thought?: string;
}

interface AIChatProps {
  onClose: () => void;
  webcontainer: WebContainer | null;
  onFileSystemChange: () => void;
  projectId: string;
}

const SYSTEM_PROMPT = `You are a helpful AI coding assistant inside an in-browser IDE called "Collab Code".
You have access to the user's file system context.

**WRITING FILES:**
When you need to create or modify a file, you MUST output the new file contents wrapped in a special markdown block with the EXACT format below.
DO NOT use generic markdown like \`\`\`javascript. You must use the exact filename like \`\`\`/src/App.jsx

Example of creating or editing a file:
\`\`\`/src/components/Button.jsx
export function Button() {
  return <button>Click me</button>;
}
\`\`\`

If you are modifying an existing file, provide the ENTIRE file content in the block. Do not provide partial snippets.
You can create multiple files in one response. Just include multiple blocks.

**DELETING FILES:**
When you need to delete a file or directory, you MUST output a special markdown block with the EXACT format below.
Example:
\`\`\`delete
/src/old_file.js
\`\`\`

**AGENTIC BEHAVIOR (CRITICAL):**
If the user's request is vague, ambiguous, or lacks specific direction (e.g., "Build a landing page", "Add a new feature", "Refactor this"), DO NOT just start writing code. 
You MUST proactively ask the user to clarify by providing 2-3 specific multiple-choice options for them to pick from. 
Example: "I can build that! Would you prefer A) A dark-themed tech landing page, B) A colorful modern portfolio, or C) A minimal text-based page?"
Only write code once the user has given a clear, specific direction. Keep your explanations concise.

**HIGH-QUALITY DESIGN GUIDELINES (CRITICAL):**
Whenever you generate or update UI code, you MUST follow these constraints:
1. **Aesthetics:** Always use modern, premium designs. Never use plain HTML styling. Utilize modern typography (e.g., Google Fonts like Inter or Roboto), rich harmonious color palettes (like sleek dark modes or vibrant gradients), and glassmorphism where appropriate.
2. **Interactivity:** Make the design dynamic. Add subtle micro-animations, hover effects, and responsive layout transitions. 
3. **Completeness:** Never use placeholder UI. If creating a component, make it look stunning right out of the gate. If you need images, use Unsplash placeholders.
If you fail to produce a stunning, premium aesthetic, you have failed the prompt.

**THINKING PROCESS:**
Before you output any code or responses, you MUST explicitly write out your internal reasoning, step-by-step plan, and thoughts inside <think>...</think> tags.
Example:
<think>
The user wants a button component. I will create a new file at /src/Button.jsx, add basic styling, and then explain it.
</think>
`;

export function AIChat({ onClose, webcontainer, onFileSystemChange, projectId }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(`ai-chat-${projectId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your AI coding assistant. I'm connected to your codebase. How can I help you today?"
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aiProvider, setAiProvider] = useState<'openai' | 'google'>(() => (localStorage.getItem('aiProvider') as 'openai' | 'google') || 'openai');
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('aiModel') || 'gpt-4o');
  const [settingsApiKey, setSettingsApiKey] = useState(() => localStorage.getItem('aiApiKey') || '');
  const [customBaseUrl, setCustomBaseUrl] = useState(() => localStorage.getItem('aiBaseUrl') || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem(`ai-chat-${projectId}`, JSON.stringify(messages));
  }, [messages, projectId]);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      const defaultMessage: Message = {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your AI coding assistant. I'm connected to your codebase. How can I help you today?"
      };
      setMessages([defaultMessage]);
    }
  };

  const getProjectContext = async () => {
    if (!webcontainer) return 'WebContainer not booted.';
    let context = 'Project Files:\n\n';
    
    const readDirRecursive = async (dir: string) => {
      const entries = await webcontainer.fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.')) continue;
        const fullPath = dir === '/' ? `/${entry.name}` : `${dir}/${entry.name}`;
        
        if (entry.isDirectory()) {
          await readDirRecursive(fullPath);
        } else {
          try {
            const contents = await webcontainer.fs.readFile(fullPath, 'utf-8');
            context += `--- ${fullPath} ---\n${contents}\n\n`;
          } catch (e) {
            // ignore binary files
          }
        }
      }
    };
    
    await readDirRecursive('/');
    return context;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !webcontainer) return;

    const apiKey = localStorage.getItem('aiApiKey');
    if (!apiKey) {
      alert(`Please enter a valid ${aiProvider === 'openai' ? 'OpenAI' : 'Google Gemini'} API key in settings to use the AI Assistant.`);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const fileContext = await getProjectContext();
      
      const conversationHistory = messages
        .filter(m => m.id !== '1') // Skip default welcome message
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}:\n${m.content}`)
        .join('\n\n');

      const fullPrompt = `${SYSTEM_PROMPT}\n\n${fileContext}\n\nConversation History:\n${conversationHistory}\n\nUser Request: ${userMsg.content}`;

      let responseText = "";

      if (aiProvider === 'openai') {
        const openaiConfig: any = { apiKey, dangerouslyAllowBrowser: true };
        if (customBaseUrl.trim()) {
          openaiConfig.baseURL = customBaseUrl.trim();
        }
        const openai = new OpenAI(openaiConfig);
        const response = await openai.chat.completions.create({
          model: selectedModel,
          messages: [{ role: "user", content: fullPrompt }]
        });
        responseText = response.choices[0].message.content || "";
      } else {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: selectedModel });
        const result = await model.generateContent(fullPrompt);
        responseText = result.response.text();
      }
      
      let cleanResponseText = responseText;
      let filesUpdated = 0;
      
      // Parse thought process
      const thinkRegex = /<think>([\s\S]*?)<\/think>/gi;
      let matchThink;
      let thoughts: string[] = [];
      
      while ((matchThink = thinkRegex.exec(cleanResponseText)) !== null) {
        thoughts.push(matchThink[1].trim());
        cleanResponseText = cleanResponseText.replace(matchThink[0], '');
      }

      // Parse file deletions
      const deleteRegex = /```delete\n([\w\.\/\-]+)\n```/g;
      let matchDelete;
      const deletedFiles: string[] = [];
      
      while ((matchDelete = deleteRegex.exec(responseText)) !== null) {
        let filePath = matchDelete[1].trim();
        if (!filePath.startsWith('/')) {
          filePath = '/' + filePath;
        }
        
        try {
          await webcontainer.fs.rm(filePath, { recursive: true });
          filesUpdated++;
          deletedFiles.push(filePath);
        } catch(e) {
          console.error("Failed to delete", filePath, e);
        }
        cleanResponseText = cleanResponseText.replace(matchDelete[0], '');
      }

      // Parse response to find code blocks and execute them
      const codeBlockRegex = /```([\w\.\/\-]+)\n([\s\S]*?)```/g;
      let match;
      const fileChanges: { path: string; oldContent: string; newContent: string }[] = [];
      
      while ((match = codeBlockRegex.exec(responseText)) !== null) {
        let filePath = match[1].trim();
        const fileContent = match[2];
        
        if (!filePath.startsWith('/')) {
          filePath = '/' + filePath;
        }

        // Get old content
        let oldContent = '';
        try {
          oldContent = await webcontainer.fs.readFile(filePath, 'utf-8');
        } catch (e) {
          // File might not exist
        }

        fileChanges.push({
          path: filePath,
          oldContent,
          newContent: fileContent
        });

        // Strip the block from the response text
        cleanResponseText = cleanResponseText.replace(match[0], '');

        // Ensure parent directories exist
        const parts = filePath.split('/').filter(Boolean);
        let currentPath = '';
        for (let i = 0; i < parts.length - 1; i++) {
          currentPath += '/' + parts[i];
          try {
            await webcontainer.fs.mkdir(currentPath);
          } catch(e) {} // ignore if exists
        }
        
        await webcontainer.fs.writeFile(filePath, fileContent);
        filesUpdated++;
      }
      
      if (filesUpdated > 0) {
        onFileSystemChange();
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanResponseText.trim(),
        thought: thoughts.length > 0 ? thoughts.join('\n\n') : undefined,
        fileChanges: fileChanges.length > 0 ? fileChanges : undefined,
        deletedFiles: deletedFiles.length > 0 ? deletedFiles : undefined
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Error: ${error.message || 'Something went wrong.'}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col w-full shrink-0 h-full bg-[#0A0A0A] z-20">
      {/* Header */}
      <div className="h-14 border-b border-white/[0.05] flex items-center justify-between px-4 shrink-0 bg-[#050505]">
        <div className="flex items-center gap-2 text-gray-200 font-medium text-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          AI Assistant
          <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] uppercase tracking-wider font-semibold border border-purple-500/30">
            {selectedModel}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleClearChat} 
            title="Clear Chat History"
            className="p-1 hover:bg-white/[0.1] rounded text-gray-500 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            title="Settings"
            className={`p-1 rounded transition-colors ${showSettings ? 'bg-white/[0.1] text-white' : 'text-gray-500 hover:bg-white/[0.1] hover:text-white'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={onClose} title="Close AI Chat" className="p-1 hover:bg-white/[0.1] rounded text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="bg-[#0f0f0f] border-b border-white/[0.05] p-4 flex flex-col gap-3 text-sm shrink-0">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-gray-400 text-xs mb-1">Provider</label>
              <select 
                value={aiProvider}
                onChange={e => {
                  const newProvider = e.target.value as 'openai' | 'google';
                  setAiProvider(newProvider);
                  localStorage.setItem('aiProvider', newProvider);
                  // Set default models when switching providers
                  const defaultModel = newProvider === 'openai' ? 'gpt-4o' : 'gemini-2.5-flash';
                  setSelectedModel(defaultModel);
                  localStorage.setItem('aiModel', defaultModel);
                }}
                className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-gray-200 outline-none focus:border-purple-500/50"
              >
                <option value="openai">OpenAI</option>
                <option value="google">Google Gemini</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-400 text-xs mb-1">Model</label>
              <input 
                type="text"
                list="model-options"
                value={selectedModel}
                onChange={e => {
                  setSelectedModel(e.target.value);
                  localStorage.setItem('aiModel', e.target.value);
                }}
                className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-gray-200 outline-none focus:border-purple-500/50"
              />
              <datalist id="model-options">
                {aiProvider === 'openai' ? (
                  <>
                    <option value="gpt-4o" />
                    <option value="gpt-4o-mini" />
                    <option value="gpt-4-turbo" />
                    <option value="meta-llama/llama-3-70b-instruct" />
                    <option value="deepseek/deepseek-coder" />
                  </>
                ) : (
                  <>
                    <option value="gemini-2.5-flash" />
                    <option value="gemini-2.5-pro" />
                    <option value="gemini-1.5-flash" />
                  </>
                )}
              </datalist>
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">API Key</label>
            <input 
              type="password"
              value={settingsApiKey}
              onChange={e => {
                setSettingsApiKey(e.target.value);
                localStorage.setItem('aiApiKey', e.target.value);
              }}
              className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-gray-200 outline-none focus:border-purple-500/50"
              placeholder={aiProvider === 'openai' ? 'sk-...' : 'AIza...'}
            />
          </div>
          {aiProvider === 'openai' && (
            <div>
              <label className="block text-gray-400 text-xs mb-1">Custom Base URL (Optional, for OpenRouter/Groq)</label>
              <input 
                type="text"
                value={customBaseUrl}
                onChange={e => {
                  setCustomBaseUrl(e.target.value);
                  localStorage.setItem('aiBaseUrl', e.target.value);
                }}
                className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-gray-200 outline-none focus:border-purple-500/50"
                placeholder="https://openrouter.ai/api/v1"
              />
            </div>
          )}
        </div>
      )}

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
                {msg.thought && (
                  <details className="mb-3 group">
                    <summary className="cursor-pointer text-[10px] uppercase tracking-wider text-gray-500 hover:text-purple-400 select-none flex items-center gap-1 transition-colors">
                      <Bot className="w-3 h-3" />
                      <span>Thought Process</span>
                    </summary>
                    <div className="mt-2 text-xs text-gray-400 border-l-2 border-purple-500/30 pl-3 py-1 italic">
                      {msg.thought}
                    </div>
                  </details>
                )}
                {msg.content}
                {msg.fileChanges && msg.fileChanges.map((change, idx) => (
                  <DiffViewer 
                    key={idx}
                    filePath={change.path}
                    oldContent={change.oldContent}
                    newContent={change.newContent}
                  />
                ))}
                {msg.deletedFiles && msg.deletedFiles.map((path, idx) => (
                  <div key={`del-${idx}`} className="mt-3 border border-red-500/20 bg-red-500/10 rounded-lg p-2.5 flex items-center gap-2 text-xs text-red-400 font-medium">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Deleted: <span className="font-mono opacity-80">{path}</span></span>
                  </div>
                ))}
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
