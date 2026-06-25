import React, { useState } from 'react';
import { Database, HardDrive, Zap, Copy, Check, Terminal, Search, MessageSquare, ChevronRight, Shield, Globe, Activity, Code2 } from 'lucide-react';

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
  </div>
);

const Dot = ({ color }: { color: 'green' | 'yellow' | 'red' }) => {
  const colors = {
    green: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    yellow: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
    red: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
  };
  return <div className={`w-2 h-2 rounded-full ${colors[color]}`} />;
};

export function StorageSDK() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm i @collabcode/storage');
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
                <Database className="w-3.5 h-3.5" />
                <span>Collab Storage</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                The end-to-end<br />platform for<br />data workloads.
              </h1>
            </div>

            {/* Right Hero */}
            <div className="bg-black p-12 md:p-16 flex flex-col justify-center items-center relative min-h-[400px]">
               <Crosshair className="-top-1.5 -right-1.5" />
               <div className="w-full max-w-md">
                 <h2 className="text-2xl font-bold text-white mb-4">Build with our Storage <span className="inline-flex items-center justify-center border border-white/20 rounded-md px-1.5 text-xs ml-1 bg-white/5">SDK</span> today.</h2>
                 <p className="text-[#888] mb-8 text-sm leading-relaxed">
                   The open source toolkit for connecting highly-available data primitives to your frontend applications with JavaScript or TypeScript.
                 </p>
                 <div className="flex items-center gap-3">
                   <div className="flex-1 flex items-center justify-between bg-white text-black px-4 py-3 rounded-full font-mono text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                     <span>$ npm i @collabcode/storage</span>
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
                "In the age of modern data, getting your product into the market needs to be incredibly fast. We were able to launch Director.ai quickly thanks to Collab's primitives like KV caching, Postgres DB, and Blob storage. Launch day was perfectly smooth."
              </p>
            </div>
            <div className="bg-black p-12 md:p-16 flex flex-col justify-end items-end relative text-right">
              <Crosshair className="-top-1.5 -right-1.5" />
              <div className="text-white font-medium text-lg">Paul Klein IV, CEO</div>
              <div className="flex items-center gap-2 mt-2 border border-white/20 rounded px-2 py-1 bg-white/5">
                <div className="w-3 h-3 bg-white text-black text-[9px] font-bold flex items-center justify-center rounded-sm">B</div>
                <span className="text-sm text-white font-medium">Browserbase</span>
              </div>
            </div>
          </div>

          {/* Features Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            
            {/* Blob Storage */}
            <div className="bg-black p-12 relative flex flex-col overflow-hidden min-h-[500px]">
              <Crosshair className="-left-1.5 -top-1.5" />
              <div className="flex items-center justify-between mb-8 z-10">
                <div className="text-[#888] flex items-center gap-2 text-sm"><HardDrive className="w-4 h-4" /> Blob Storage</div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Read the docs
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 z-10">
                Global Asset Delivery.<br />
                <span className="text-[#888] font-normal">Store files seamlessly with built-in CDN caching and client-side uploads.</span>
              </h3>
              
              {/* Concrete UI Mockup */}
              <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-12 z-10">
                <div className="w-full max-w-[280px] bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-colors cursor-pointer mb-3 bg-black">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                      <HardDrive className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-xs text-white font-medium mb-1">Click to upload</span>
                    <span className="text-[10px] text-[#666]">SVG, PNG, JPG or GIF (max. 8MB)</span>
                  </div>
                  
                  {/* Uploading File Item */}
                  <div className="border border-white/10 rounded-lg p-2.5 bg-[#111] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#222] flex items-center justify-center">
                        <span className="text-[8px] text-[#888] font-mono">PNG</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white">hero-image.png</span>
                        <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-blue-500 w-[70%]"></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-blue-400 font-mono">70%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KV Database */}
            <div className="bg-black p-12 relative flex flex-col overflow-hidden min-h-[500px]">
              <Crosshair className="-right-1.5 -top-1.5" />
              <div className="flex items-center justify-between mb-8 z-10">
                <div className="text-[#888] flex items-center gap-2 text-sm"><Zap className="w-4 h-4" /> KV Caching</div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Read the docs
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 z-10">
                Single-Digit Latency.<br />
                <span className="text-[#888] font-normal">Redis-compatible key-value store globally replicated to the edge.</span>
              </h3>
              
              {/* Abstract Visual */}
              <div className="flex-1 w-full flex items-center justify-center relative mt-12">
                <div className="w-full max-w-[280px]">
                   <div className="border border-white/10 rounded-lg p-3 bg-[#0a0a0a] flex items-center justify-between mb-3 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                     <span className="text-xs text-[#888] font-mono">GET user:123</span>
                     <span className="text-xs text-green-400 font-mono">2ms (HIT)</span>
                   </div>
                   <div className="border border-white/10 rounded-lg p-3 bg-[#0a0a0a] flex items-center justify-between mb-3 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                     <span className="text-xs text-[#888] font-mono">SET session:xyz</span>
                     <span className="text-xs text-white font-mono">OK</span>
                   </div>
                   <div className="border border-white/10 rounded-lg p-3 bg-[#0a0a0a] flex items-center justify-between shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                     <span className="text-xs text-[#888] font-mono">GET rate:ip</span>
                     <span className="text-xs text-green-400 font-mono">1ms (HIT)</span>
                   </div>
                </div>
              </div>
            </div>

          </div>

          {/* Table Header Section */}
          <div className="bg-black p-12 md:px-16 text-center relative">
            <Crosshair className="-left-1.5 -top-1.5" />
            <Crosshair className="-right-1.5 -top-1.5" />
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-md text-xs text-[#888] mb-6">
              <Database className="w-3 h-3" /> Collab Postgres
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Bridging servers and serverless.</h2>
            <p className="text-[#888] text-lg max-w-2xl mx-auto">
              Taking the best of servers and serverless to create a new model in computing, scaling business-critical workloads efficiently across global environments.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-4 gap-[1px]">
            {/* Row 1 Headers */}
            <div className="bg-[#050505] p-6 text-sm font-semibold text-white">Features</div>
            <div className="bg-[#050505] p-6 text-sm font-semibold text-[#888] text-center">Self-Hosted DB</div>
            <div className="bg-[#050505] p-6 text-sm font-semibold text-[#888] text-center">Cloud DB</div>
            <div className="bg-[#050505] p-6 text-sm font-semibold text-white text-center">Collab Postgres</div>

            {/* Row 2 */}
            <div className="bg-black p-6 text-sm text-white font-medium flex items-center">Connection Pooling</div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="red" /><span className="text-xs text-[#888]">Manual setup</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="yellow" /><span className="text-xs text-[#888]">Proxy required</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="green" /><span className="text-xs text-white">Built-in edge pooling</span>
            </div>

            {/* Row 3 */}
            <div className="bg-black p-6 text-sm text-white font-medium flex items-center">Scaling</div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="red" /><span className="text-xs text-[#888]">Manual provisioning</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="yellow" /><span className="text-xs text-[#888]">Step scaling</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="green" /><span className="text-xs text-white">Serverless auto-scaling</span>
            </div>

            {/* Row 4 */}
            <div className="bg-black p-6 text-sm text-white font-medium flex items-center">Dev Environments</div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="red" /><span className="text-xs text-[#888]">Shared DB</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="yellow" /><span className="text-xs text-[#888]">Slow cloning</span>
            </div>
            <div className="bg-black p-6 flex flex-col items-center justify-center gap-2">
              <Dot color="green" /><span className="text-xs text-white">Branch per PR (100ms)</span>
            </div>
          </div>

          {/* New Section: Security & Network */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            <div className="bg-black p-12 relative min-h-[300px] flex flex-col justify-center text-center items-center">
               <Crosshair className="-left-1.5 -top-1.5" />
               <Shield className="w-10 h-10 text-white mb-6 stroke-[1.5px] opacity-80" />
               <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Enterprise Security</h3>
               <p className="text-[#888] max-w-sm text-[15px] leading-relaxed">All storage options are encrypted at rest and in transit. SOC2 Type II compliance ensures your data is strictly protected.</p>
            </div>
            <div className="bg-black p-12 relative min-h-[300px] flex flex-col justify-center text-center items-center">
               <Crosshair className="-right-1.5 -top-1.5" />
               <Globe className="w-10 h-10 text-white mb-6 stroke-[1.5px] opacity-80" />
               <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Global Edge Network</h3>
               <p className="text-[#888] max-w-sm text-[15px] leading-relaxed">Your data replicates across 35+ edge regions globally, guaranteeing single-digit latency anywhere your users are.</p>
            </div>
          </div>

          {/* New Section: DX & Observability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            <div className="bg-black p-12 relative min-h-[400px] flex flex-col justify-center overflow-hidden">
               <Crosshair className="-left-1.5 -top-1.5" />
               <div className="flex items-center justify-between mb-8 z-10">
                 <div className="text-[#888] flex items-center gap-2 text-sm"><Code2 className="w-4 h-4" /> Framework Agnostic</div>
               </div>
               <h3 className="text-2xl font-bold text-white mb-4 z-10 tracking-tight">Deploy anywhere.</h3>
               <p className="text-[#888] mb-8 text-[15px] leading-relaxed z-10">Use our unified TypeScript SDK in Next.js, SvelteKit, Nuxt, Astro, or any Node.js/Edge environment with zero config.</p>
               
               <div className="grid grid-cols-2 gap-3 max-w-sm mt-4 z-10">
                 <div className="border border-white/10 bg-[#0a0a0a] rounded-lg p-4 flex flex-col items-center justify-center text-center">
                   <div className="w-6 h-6 rounded-full bg-white mb-2 flex items-center justify-center text-black font-bold text-[10px]">N</div>
                   <span className="text-xs text-[#888]">Next.js</span>
                 </div>
                 <div className="border border-white/10 bg-[#0a0a0a] rounded-lg p-4 flex flex-col items-center justify-center text-center">
                   <div className="w-6 h-6 rounded-full bg-orange-500 mb-2 flex items-center justify-center text-white font-bold text-[10px]">S</div>
                   <span className="text-xs text-[#888]">SvelteKit</span>
                 </div>
               </div>
            </div>
            
            <div className="bg-black p-12 relative min-h-[400px] flex flex-col justify-center overflow-hidden">
               <Crosshair className="-right-1.5 -top-1.5" />
               <div className="flex items-center justify-between mb-8 z-10">
                 <div className="text-[#888] flex items-center gap-2 text-sm"><Activity className="w-4 h-4" /> Observability</div>
               </div>
               <h3 className="text-2xl font-bold text-white mb-4 z-10 tracking-tight">Built-in Analytics.</h3>
               <p className="text-[#888] mb-8 text-[15px] leading-relaxed z-10">Monitor bandwidth, compute time, and request rates in real-time from your dashboard.</p>
               
               <div className="w-full max-w-sm border border-white/10 bg-[#0a0a0a] rounded-lg p-4 z-10">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-xs text-[#888]">Requests / sec</span>
                   <span className="text-xs text-green-400 font-mono">14,230</span>
                 </div>
                 <div className="flex items-end gap-1 h-20">
                   {[40, 70, 45, 90, 65, 85, 55, 100, 75, 60, 80, 50].map((h, i) => (
                     <div key={i} className="flex-1 bg-white/10 hover:bg-white/30 transition-colors rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Bottom Callouts like AI Apps section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            <div className="bg-black p-12 relative border-b-0 min-h-[400px]">
               <Crosshair className="-left-1.5 -bottom-1.5" />
               <div className="border border-white/10 bg-[#0a0a0a] rounded-lg p-6 max-w-sm w-full mx-auto mt-8 mb-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <MessageSquare className="w-16 h-16" />
                 </div>
                 <div className="flex gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Search className="w-4 h-4 text-white" /></div>
                   <div className="flex-1 h-8 bg-white/5 rounded px-3 flex items-center text-xs text-[#666]">Search data...</div>
                 </div>
                 <div className="space-y-2">
                   <div className="h-6 bg-white/5 rounded w-full flex items-center px-2 text-[10px] text-white/50">PgVector Query 1</div>
                   <div className="h-6 bg-white/5 rounded w-[80%] flex items-center px-2 text-[10px] text-white/50">PgVector Query 2</div>
                 </div>
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Vector Search ready</h3>
               <p className="text-sm text-[#888] leading-relaxed">
                 A full-featured PostgreSQL database out of the box, with built-in pgvector support for your AI applications and RAG architectures.
               </p>
            </div>
            <div className="bg-black p-12 relative border-b-0 flex flex-col justify-center">
               <Crosshair className="-right-1.5 -bottom-1.5" />
               <h3 className="text-3xl font-bold text-white mb-4">
                 Get started with Data integrations.
               </h3>
               <p className="text-[#888] text-lg mb-8">
                 From Next.js edge caching to complex relational queries, commence your data projects with a running start.
               </p>
               <div>
                 <button className="bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                   View all Templates
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
