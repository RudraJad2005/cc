import React, { useState } from 'react';
import { Cpu, Terminal, Copy, Check, MessageSquare, Bot, Sparkles, Workflow, ArrowRight, Shield, Database } from 'lucide-react';

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
  </div>
);

export function AI() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm i @collabcode/ai');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full bg-black text-white selection:bg-white/20 selection:text-white font-sans min-h-screen pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Outer Container with grid lines */}
        <div className="relative border border-white/10 bg-white/10 flex flex-col gap-[1px]">
          
          {/* Top Hero Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            
            {/* Left Hero */}
            <div className="bg-black p-12 md:p-16 flex flex-col justify-center relative min-h-[400px]">
              <Crosshair className="-top-1.5 -left-1.5" />
              <div className="flex items-center gap-2 text-xs font-mono text-[#888] mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Collab AI</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                The end-to-end<br />platform for<br />AI workloads.
              </h1>
            </div>

            {/* Right Hero */}
            <div className="bg-black p-12 md:p-16 flex flex-col justify-center items-center relative min-h-[400px]">
               <Crosshair className="-top-1.5 -right-1.5" />
               <div className="w-full max-w-md">
                 <h2 className="text-2xl font-bold text-white mb-4">Build with our AI <span className="inline-flex items-center justify-center border border-white/20 rounded-md px-1.5 text-xs ml-1 bg-white/5">SDK</span> today.</h2>
                 <p className="text-[#888] mb-8 text-sm leading-relaxed">
                   The open source toolkit for building AI-native frontend applications with streaming UIs in JavaScript and TypeScript.
                 </p>
                 <div className="flex items-center gap-3">
                   <div className="flex-1 flex items-center justify-between bg-white text-black px-4 py-3 rounded-full font-mono text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                     <span>$ npm i @collabcode/ai</span>
                     <button onClick={handleCopy} className="text-[#666] hover:text-black transition-colors">
                       {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                     </button>
                   </div>
                 </div>
               </div>
            </div>

          </div>

          {/* Quote Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]">
            <div className="md:col-span-2 bg-black p-12 md:p-16 relative">
              <Crosshair className="-top-1.5 -left-1.5" />
              <p className="text-xl md:text-2xl text-[#ddd] leading-relaxed font-medium">
                "Speed of execution is important for AI companies. We are able to ship faster with Collab's primitives. After migrating to the Edge, our time-to-first-token dropped from 800ms to just 40ms."
              </p>
            </div>
            <div className="bg-black p-12 md:p-16 flex flex-col justify-end items-end relative text-right">
              <Crosshair className="-top-1.5 -right-1.5" />
              <div className="text-white font-medium text-lg">Elena Rostova, CTO</div>
              <div className="flex items-center gap-2 mt-2 border border-white/20 rounded px-2 py-1 bg-white/5">
                <div className="w-3 h-3 bg-white text-black text-[9px] font-bold flex items-center justify-center rounded-sm">R</div>
                <span className="text-sm text-white font-medium">RunwayML</span>
              </div>
            </div>
          </div>

          {/* Features Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            
            {/* AI Gateway */}
            <div className="bg-black p-12 relative flex flex-col overflow-hidden min-h-[500px]">
              <Crosshair className="-left-1.5 -top-1.5" />
              <div className="flex items-center justify-between mb-8 z-10">
                <div className="text-[#888] flex items-center gap-2 text-sm"><Workflow className="w-4 h-4" /> AI Gateway</div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Read the docs
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 z-10">
                Model switching made easy.<br />
                <span className="text-[#888] font-normal">Switch between AI models without needing to manage API keys or provider accounts.</span>
              </h3>
              
              {/* Concrete UI Mockup */}
              <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-12 z-10">
                <div className="w-full max-w-[320px] bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  
                  {/* Gateway config mockup */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="text-xs text-white font-medium">Gateway Route</span>
                    <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">Active</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 border-l-2 border-l-blue-500">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center"><Sparkles className="w-2.5 h-2.5 text-blue-400"/></div>
                        <span className="text-xs text-white">GPT-4o</span>
                      </div>
                      <span className="text-[10px] text-[#888]">Primary</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-transparent border border-white/5">
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-4 h-4 rounded bg-orange-500/20 flex items-center justify-center"><Sparkles className="w-2.5 h-2.5 text-orange-400"/></div>
                        <span className="text-xs text-white">Claude 3.5</span>
                      </div>
                      <span className="text-[10px] text-[#888]">Fallback</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-transparent border border-white/5">
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-4 h-4 rounded bg-purple-500/20 flex items-center justify-center"><Sparkles className="w-2.5 h-2.5 text-purple-400"/></div>
                        <span className="text-xs text-white">Llama 3</span>
                      </div>
                      <span className="text-[10px] text-[#888]">Fallback</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Edge Streaming */}
            <div className="bg-black p-12 relative flex flex-col overflow-hidden min-h-[500px]">
              <Crosshair className="-right-1.5 -top-1.5" />
              <div className="flex items-center justify-between mb-8 z-10">
                <div className="text-[#888] flex items-center gap-2 text-sm"><Cpu className="w-4 h-4" /> Fluid Compute</div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Read the docs
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 z-10">
                Streaming UI components.<br />
                <span className="text-[#888] font-normal">Stream React Server Components directly to the client as the LLM generates them.</span>
              </h3>
              
              {/* Concrete UI Mockup */}
              <div className="flex-1 w-full flex items-center justify-center relative mt-12 z-10">
                <div className="w-full max-w-[320px] bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col gap-3">
                  
                  {/* Chat mockup */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center shrink-0">
                       <MessageSquare className="w-3 h-3 text-[#888]" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-[#ddd] w-full">
                      Show me a weather widget for NYC.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                       <Bot className="w-3 h-3 text-black" />
                    </div>
                    <div className="w-full">
                      <div className="text-xs text-[#888] mb-2 font-mono flex items-center gap-2">
                        Streaming component... <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      </div>
                      {/* Streaming Widget Mockup */}
                      <div className="border border-white/10 bg-black rounded-lg p-3 w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">New York</span>
                          <span className="text-xs text-yellow-400">Sunny</span>
                        </div>
                        <div className="text-2xl font-bold text-white">72°</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* New Section: Code Playground */}
          <div className="bg-black p-12 md:p-16 border-t border-white/10 relative">
            <Crosshair className="-left-1.5 -top-1.5" />
            <Crosshair className="-right-1.5 -top-1.5" />
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 w-full">
                <div className="text-[#888] flex items-center gap-2 text-sm mb-4"><Terminal className="w-4 h-4" /> Developer Experience</div>
                <h3 className="text-3xl font-bold text-white mb-4">Three lines of code.</h3>
                <p className="text-[#888] text-lg mb-8 leading-relaxed">
                  Integrate powerful streaming LLMs into your React application without managing websockets, complex state, or manual parsing.
                </p>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-sm shadow-[0_0_50px_rgba(255,255,255,0.02)] relative group">
                  <div className="absolute top-4 right-4 text-[#444] group-hover:text-white transition-colors cursor-pointer"><Copy className="w-4 h-4"/></div>
                  <div className="text-[#c678dd] inline">import</div> <div className="text-white inline">{'{'} useChat {'}'}</div> <div className="text-[#c678dd] inline">from</div> <div className="text-[#98c379] inline">'@collabcode/ai/react'</div>;
                  <br/><br/>
                  <div className="text-[#c678dd] inline">export default function</div> <div className="text-[#61afef] inline">Chat</div>() {'{'}
                  <br/>
                  &nbsp;&nbsp;<div className="text-[#c678dd] inline">const</div> {'{'} messages, input, handleInputChange, handleSubmit {'}'} = <div className="text-[#61afef] inline">useChat</div>();
                  <br/><br/>
                  &nbsp;&nbsp;<div className="text-[#c678dd] inline">return</div> (
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-[#e06c75] inline">&lt;div&gt;</div>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}messages.<div className="text-[#61afef] inline">map</div>(<div className="text-[#d19a66] inline">m</div> =&gt; (
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="text-[#e06c75] inline">&lt;div <span className="text-[#d19a66]">key</span>=<span className="text-[#98c379]">{'{m.id}'}</span>&gt;</div>{'{m.content}'}<div className="text-[#e06c75] inline">&lt;/div&gt;</div>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)){'}'}
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="text-[#e06c75] inline">&lt;form <span className="text-[#d19a66]">onSubmit</span>=<span className="text-[#98c379]">{'{handleSubmit}'}</span>&gt;</div>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="text-[#e06c75] inline">&lt;input <span className="text-[#d19a66]">value</span>=<span className="text-[#98c379]">{'{input}'}</span> <span className="text-[#d19a66]">onChange</span>=<span className="text-[#98c379]">{'{handleInputChange}'}</span> /&gt;</div>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="text-[#e06c75] inline">&lt;/form&gt;</div>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-[#e06c75] inline">&lt;/div&gt;</div>
                  <br/>
                  &nbsp;&nbsp;);
                  <br/>
                  {'}'}
                </div>
              </div>
              <div className="flex-1 w-full flex items-center justify-center">
                 <div className="w-full max-w-sm border border-white/10 bg-[#050505] rounded-2xl p-4 h-[400px] flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                   <div className="flex-1 overflow-y-auto space-y-4 p-2">
                     <div className="bg-[#111] border border-white/10 rounded-lg rounded-tr-sm p-3 ml-8 text-xs text-[#ddd]">What's the meaning of life?</div>
                     <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg rounded-tl-sm p-3 mr-8 text-xs text-[#ddd] flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 shrink-0"/>
                        <span>42, according to Douglas Adams. But practically, it's about finding purpose and connecting with others. ▋</span>
                     </div>
                   </div>
                   <div className="mt-4 bg-[#111] border border-white/10 rounded-full py-2 px-4 flex items-center gap-2">
                     <div className="flex-1 text-[#666] text-xs">Type a message...</div>
                     <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"><ArrowRight className="w-3 h-3"/></div>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* New Section: Enterprise AI Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            <div className="bg-black p-12 md:p-16 relative flex flex-col justify-center min-h-[500px]">
              <Crosshair className="-left-1.5 -top-1.5" />
              <Crosshair className="-left-1.5 -bottom-1.5" />
              <div className="text-[#888] flex items-center gap-2 text-sm mb-4"><Shield className="w-4 h-4" /> Enterprise Controls</div>
              <h3 className="text-3xl font-bold text-white mb-4">Govern your AI usage.</h3>
              <p className="text-[#888] text-lg mb-8 leading-relaxed">
                Protect your users and your budget. Implement strict controls over token usage, redact PII before it hits third-party LLMs, and cache frequent queries.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-white font-medium text-sm">PII Redaction</div>
                    <div className="text-[#666] text-xs">Automatically scrub emails, SSNs, and credit cards.</div>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-white font-medium text-sm">Semantic Caching</div>
                    <div className="text-[#666] text-xs">Return cached responses for similar queries.</div>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </li>
                <li className="flex items-center justify-between pb-2">
                  <div>
                    <div className="text-white font-medium text-sm">Strict Rate Limiting</div>
                    <div className="text-[#666] text-xs">Limit requests by IP or user ID.</div>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Semantic Cache Visualization */}
            <div className="bg-black p-12 md:p-16 relative flex items-center justify-center min-h-[500px]">
              <Crosshair className="-right-1.5 -top-1.5" />
              <Crosshair className="-right-1.5 -bottom-1.5" />
              <div className="w-full max-w-sm flex flex-col gap-6 relative">
                 {/* Visual connection line */}
                 <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-white/10 -translate-x-1/2 z-0"></div>
                 
                 <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl relative z-10 flex flex-col items-center">
                   <div className="text-xs text-[#888] mb-2">User 1 asks:</div>
                   <div className="text-sm text-white text-center">"How do I reset my password?"</div>
                   <div className="mt-3 bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded font-mono border border-blue-500/20">LLM Generation (800ms)</div>
                 </div>
                 
                 <div className="bg-[#111] border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] p-3 rounded-xl relative z-10 flex items-center justify-center">
                   <Database className="w-5 h-5 text-green-400 mr-2" />
                   <span className="text-xs font-bold text-white">Semantic Cache Stored</span>
                 </div>

                 <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl relative z-10 flex flex-col items-center">
                   <div className="text-xs text-[#888] mb-2">User 2 asks:</div>
                   <div className="text-sm text-white text-center">"I forgot my password, what do I do?"</div>
                   <div className="mt-3 bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded font-mono border border-green-500/20">Cache Hit (12ms)</div>
                 </div>
              </div>
            </div>
          </div>

          {/* Table Header Section */}
          <div className="bg-black p-12 md:px-16 text-center relative">
            <Crosshair className="-left-1.5 -top-1.5" />
            <Crosshair className="-right-1.5 -top-1.5" />
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-md text-xs text-[#888] mb-6">
              <Sparkles className="w-3 h-3" /> Collab AI Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Taking AI to the Edge.</h2>
            <p className="text-[#888] text-lg max-w-2xl mx-auto">
              Traditional AI applications suffer from long TTFB (Time to First Byte) due to heavy node servers. Fluid compute changes everything.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-3 gap-[1px]">
            {/* Row 1 Headers */}
            <div className="bg-[#050505] p-6 text-sm font-semibold text-white">Metric</div>
            <div className="bg-[#050505] p-6 text-sm font-semibold text-[#888] text-center">Traditional Server</div>
            <div className="bg-[#050505] p-6 text-sm font-semibold text-white text-center">Collab Edge AI</div>

            {/* Row 2 */}
            <div className="bg-black p-6 text-sm text-white font-medium flex items-center">Time to First Token</div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-1">
              <span className="text-red-400 font-mono text-sm">~800ms</span>
              <span className="text-[10px] text-[#666]">Cold boot + Network hop</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-1">
              <span className="text-green-400 font-mono text-sm">~40ms</span>
              <span className="text-[10px] text-[#666]">Instant boot at edge</span>
            </div>

            {/* Row 3 */}
            <div className="bg-black p-6 text-sm text-white font-medium flex items-center">UI Streaming</div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-1">
              <span className="text-[#888] text-sm">Text-only</span>
              <span className="text-[10px] text-[#666]">Markdown parsing</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-1">
              <span className="text-white text-sm">Rich Components</span>
              <span className="text-[10px] text-[#666]">React Server Components</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
