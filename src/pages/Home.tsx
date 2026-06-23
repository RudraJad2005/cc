import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Terminal, GitBranch, FileCode, Package, Layout, ShieldCheck, Lock, Key, Server,
  Layers, Zap, Globe, ArrowRight, MessageSquare, Check, ChevronRight, Play, Search,
  CornerDownLeft, Cloud, Database, Gauge, Activity, Code2, Cpu, Globe2, Network
} from 'lucide-react';
import { SiNextdotjs, SiReact, SiNuxt, SiSvelte, SiVite, SiPython, SiNodedotjs, SiRust } from 'react-icons/si';

// Reusable Crosshair component
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Home() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-cyan-500/30 selection:text-white font-sans">
      
      <div className="relative z-10 flex flex-col w-full">
         
          {/* ═══════════════════════════════════════════════ */}
          {/* HERO SECTION                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="bg-[#000] pt-32 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
             {/* Stark grid background with subtle cyan glow */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
             {/* Removed background glow */}
             
             <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
                <div className="flex flex-col items-center text-center">
                   {/* Tagline pill */}
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     className="flex items-center gap-3 px-4 py-1.5 border border-cyan-500/30 bg-cyan-500/5 mb-8 rounded-none"
                   >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Environment 2.0 is Live</span>
                   </motion.div>

                   {/* Main heading */}
                   <motion.h1 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-5xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tighter text-white leading-[1] max-w-5xl mb-6"
                   >
                      Code at the speed of thought.
                   </motion.h1>

                   {/* Subtitle */}
                   <motion.p 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     className="text-[#888] text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
                   >
                      A cloud development environment that gives every developer the power of a high-performance workstation. No local setup. No waiting. Just code.
                   </motion.p>

                   {/* CTA Buttons */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     className="flex items-center gap-4 mb-24"
                   >
                      <button className="bg-white text-black px-8 py-3.5 rounded-none text-[14px] font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                         Start Coding <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="px-8 py-3.5 border border-white/[0.2] text-white rounded-none text-[14px] font-medium hover:bg-white/[0.05] transition-colors">
                         View Documentation
                      </button>
                   </motion.div>

                   {/* Brutalist IDE Mockup with Syntax Colors */}
                   <motion.div 
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full max-w-5xl relative group"
                   >
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />
                      <Crosshair className="-bottom-1.5 -left-1.5" />
                      <Crosshair className="-bottom-1.5 -right-1.5" />

                      <div className="w-full bg-[#000] border border-white/[0.1] overflow-hidden relative z-10">
                         {/* Window chrome */}
                         <div className="h-10 border-b border-white/[0.1] flex items-center justify-between px-4 bg-[#050505]">
                            <div className="flex items-center gap-2 text-[#666]">
                               <Terminal className="w-4 h-4 text-cyan-400" />
                               <span className="font-mono text-xs uppercase tracking-widest text-[#888]">Collab Code</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono text-[#666]">
                               <span>main</span>
                               <span className="w-px h-3 bg-white/[0.1]" />
                               <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> 30ms</span>
                            </div>
                         </div>
                         
                         <div className="flex">
                            {/* Sidebar */}
                            <div className="w-48 border-r border-white/[0.1] p-3 hidden md:block bg-[#000]">
                               <div className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-3 px-2">Explorer</div>
                               <div className="flex flex-col gap-0.5 text-xs font-mono">
                                  <div className="px-2 py-1 text-[#888] flex items-center gap-2"><span className="text-[#666]">▼</span> src/</div>
                                  <div className="px-2 py-1 pl-6 text-white bg-white/[0.05] flex items-center gap-2 border border-white/[0.05]"><FileCode className="w-3 h-3 text-cyan-400" /> server.ts</div>
                                  <div className="px-2 py-1 pl-6 text-[#888] flex items-center gap-2"><FileCode className="w-3 h-3 text-emerald-400" /> app.tsx</div>
                                  <div className="px-2 py-1 pl-6 text-[#888] flex items-center gap-2"><Layout className="w-3 h-3 text-purple-400" /> styles.css</div>
                                  <div className="px-2 py-1 text-[#888] flex items-center gap-2 mt-2"><Package className="w-3 h-3 text-yellow-400" /> package.json</div>
                               </div>
                            </div>

                            {/* Editor + Terminal */}
                            <div className="flex-1 flex flex-col bg-[#020202]">
                               {/* Code Editor with proper Syntax Highlighting */}
                               <div className="p-6 font-mono text-[13px] leading-6 flex-1 min-h-[240px] text-left">
                                  <div className="flex"><span className="w-8 text-[#444] select-none">1</span><span className="text-[#c678dd]">import</span> <span className="text-white">{'{ createServer }'}</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'collab-engine'</span>;</div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">2</span></div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">3</span><span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">server</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#61afef]">createServer</span>({'{'}</div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">4</span><span className="pl-6"><span className="text-[#e06c75]">port</span>: <span className="text-[#d19a66]">3000</span>,</span></div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">5</span><span className="pl-6"><span className="text-[#e06c75]">workers</span>: <span className="text-[#d19a66]">4</span>,</span></div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">6</span><span className="pl-6"><span className="text-[#e06c75]">hotReload</span>: <span className="text-[#d19a66]">true</span>,</span></div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">7</span><div className="text-white">{'}'});</div></div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">8</span></div>
                                  <div className="flex"><span className="w-8 text-[#444] select-none">9</span><div><span className="text-[#e5c07b]">server</span>.<span className="text-[#61afef]">listen</span>();</div></div>
                               </div>

                               {/* Terminal */}
                               <div className="border-t border-white/[0.1] p-4 font-mono text-xs bg-[#000] text-left">
                                  <div className="text-[#444] mb-2 uppercase tracking-widest text-[10px]">Terminal</div>
                                  <div className="text-[#888] mb-1"><span className="text-emerald-400">~/project</span> $ collab dev</div>
                                  <div className="text-white mt-1">✓ Server running on port <span className="text-cyan-400">3000</span></div>
                                  <div className="text-[#888]">✓ Hot reload enabled</div>
                                  <div className="text-[#888] flex items-center mt-2">Ready <span className="w-1.5 h-3 bg-cyan-400 ml-2 animate-pulse" /></div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* GRID ARCHITECTURE CONTAINER                     */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="bg-[#000] border-t border-white/[0.1] relative">
             <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative">

                {/* ─── LOGO STRIP ─── */}
                <div className="flex flex-col relative border-b border-white/[0.1] py-16">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   <p className="text-center text-xs text-[#666] font-mono uppercase tracking-widest mb-12">Powering the best engineering teams</p>
                   <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 px-10 opacity-60 text-white">
                      <span className="text-xl font-bold tracking-tighter hover:opacity-100 hover:text-white transition-opacity cursor-pointer">▲ Vercel</span>
                      <span className="text-xl font-serif italic hover:opacity-100 hover:text-white transition-opacity cursor-pointer">Retool</span>
                      <span className="text-xl font-mono tracking-tight hover:opacity-100 hover:text-white transition-opacity cursor-pointer">Arc</span>
                      <span className="text-xl font-bold tracking-tight hover:opacity-100 hover:text-white transition-opacity cursor-pointer">Raycast</span>
                      <span className="text-xl font-black tracking-[0.15em] uppercase text-sm hover:opacity-100 hover:text-white transition-opacity cursor-pointer">RAMP</span>
                      <span className="text-xl font-bold hover:opacity-100 hover:text-white transition-opacity cursor-pointer">Loom</span>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* NEW SECTION: FRAMEWORKS MARQUEE            */}
                {/* ═══════════════════════════════════════════ */}
                <div className="relative border-b border-white/[0.1] bg-[#020202] py-20 overflow-hidden">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
                   <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />
                   
                   <p className="text-center text-xs text-[#888] font-mono uppercase tracking-widest mb-12 relative z-20">Works with your entire stack</p>
                   
                   <div className="flex items-center justify-center gap-12 lg:gap-20 opacity-80 overflow-hidden relative z-20 whitespace-nowrap">
                      {/* Flex row serving as a static marquee representation */}
                      <SiNextdotjs className="w-10 h-10 text-white hover:text-white hover:scale-110 transition-all cursor-pointer" />
                      <SiReact className="w-10 h-10 text-[#61DAFB] hover:scale-110 transition-all cursor-pointer" />
                      <SiNuxt className="w-10 h-10 text-[#00DC82] hover:scale-110 transition-all cursor-pointer" />
                      <SiSvelte className="w-10 h-10 text-[#FF3E00] hover:scale-110 transition-all cursor-pointer" />
                      <SiPython className="w-10 h-10 text-[#3776AB] hover:scale-110 transition-all cursor-pointer" />
                      <SiNodedotjs className="w-10 h-10 text-[#339933] hover:scale-110 transition-all cursor-pointer" />
                      <SiRust className="w-10 h-10 text-[#DEA584] hover:scale-110 transition-all cursor-pointer" />
                      <SiVite className="w-10 h-10 text-[#646CFF] hover:scale-110 transition-all cursor-pointer" />
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 1: MULTIPLAYER                     */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center min-h-[550px]">
                      <div className="flex items-center gap-2 text-purple-400 text-[10px] font-mono uppercase tracking-widest mb-8">
                         <Layers className="w-4 h-4" />
                         <span>Collaboration</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] mb-6">
                         Multiplayer by default.
                      </h2>
                      <p className="text-[#888] text-lg leading-relaxed">
                         Every workspace is shared. See your teammates' cursors, edits, and terminal output in real time. No screen-sharing required.
                      </p>
                   </div>

                   {/* Right Col: Brutalist File System Mockup */}
                   <div className="p-16 md:p-24 flex items-center justify-center bg-[#050505] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(168,85,247,0.15)_1px,transparent_1px)] bg-[size:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="w-full max-w-lg bg-[#000] border border-white/[0.1] overflow-hidden relative z-10">
                         <div className="p-4 border-b border-white/[0.1] flex items-center justify-between bg-[#000]">
                            <h3 className="text-[#888] text-xs font-mono uppercase tracking-widest flex items-center gap-2"><FileCode className="w-4 h-4 text-white" /> Workspace Files</h3>
                            <span className="text-xs text-white font-mono">3 connected</span>
                         </div>
                         
                         <div className="divide-y divide-white/[0.1]">
                            {/* Active file */}
                            <div className="flex items-center justify-between px-5 py-4 bg-purple-500/5">
                               <div className="flex items-center gap-4">
                                  <Terminal className="w-4 h-4 text-purple-400" />
                                  <span className="text-white text-sm font-mono">server.ts</span>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-[10px] text-[#888] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
                                  <div className="flex -space-x-1.5">
                                     <div className="w-5 h-5 border border-white/[0.2] bg-cyan-500 text-black text-[10px] flex items-center justify-center font-mono font-bold">A</div>
                                     <div className="w-5 h-5 border border-white/[0.2] bg-emerald-500 text-black text-[10px] flex items-center justify-center font-mono font-bold">B</div>
                                  </div>
                               </div>
                            </div>
                            {/* File 2 */}
                            <div className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                               <div className="flex items-center gap-4">
                                  <FileCode className="w-4 h-4 text-[#666]" />
                                  <span className="text-[#888] text-sm font-mono">App.tsx</span>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-[10px] text-[#666] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> feat/ui</span>
                                  <div className="w-5 h-5 border border-white/[0.2] bg-purple-500 text-white text-[10px] flex items-center justify-center font-mono font-bold">C</div>
                               </div>
                            </div>
                            {/* File 3 */}
                            <div className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                               <div className="flex items-center gap-4">
                                  <Package className="w-4 h-4 text-[#666]" />
                                  <span className="text-[#888] text-sm font-mono">package.json</span>
                               </div>
                               <span className="text-[10px] text-[#666] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* NEW SECTION: GLOBAL EDGE NETWORK           */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1] bg-[#020202]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Network Visualization */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(16,185,129,0.05)_0,rgba(16,185,129,0.05)_1px,transparent_1px,transparent_16px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                      
                      <div className="relative z-10 w-full aspect-square max-w-sm rounded-none border border-emerald-500/20 bg-[#020202] flex items-center justify-center">
                         <Globe2 className="w-32 h-32 text-emerald-500 opacity-80" />
                         <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-20" />
                         
                         {/* Nodes */}
                         <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-400 rounded-none border border-emerald-500" />
                         <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-none border border-emerald-500" />
                         <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-emerald-400 rounded-none border border-emerald-500" />
                         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-none border border-emerald-500" />
                      </div>
                   </div>

                   {/* Right Col: Network Content */}
                   <div className="p-16 md:p-24 lg:p-32 flex flex-col justify-center min-h-[550px] bg-[#000]">
                      <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-8">
                         <Network className="w-4 h-4" />
                         <span>Infrastructure</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] mb-6">
                         Global edge network.
                      </h2>
                      <p className="text-[#888] text-lg leading-relaxed mb-10">
                         Your code runs where you are. Collab Code dynamically routes your workspace to the closest region, ensuring incredibly low latency worldwide.
                      </p>
                      
                      <div className="flex gap-12">
                         <div>
                            <div className="text-3xl font-medium text-white mb-1">15+</div>
                            <div className="text-[#888] font-mono text-xs uppercase tracking-widest">Global Regions</div>
                         </div>
                         <div>
                            <div className="text-3xl font-medium text-white mb-1">&lt;50ms</div>
                            <div className="text-[#888] font-mono text-xs uppercase tracking-widest">Avg Latency</div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 2: PERFORMANCE                     */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Testimonial */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      <p className="text-2xl md:text-3xl font-medium text-white leading-snug mb-12 tracking-tight">
                         <span className="text-[#444]">"</span>Collab Code is the closest thing to teleporting your entire dev environment to the cloud. It's faster than local.<span className="text-[#444]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <div>
                            <div className="text-white font-medium mb-1">Guillermo Rauch</div>
                            <div className="text-[#888] text-xs font-mono uppercase tracking-widest">CEO, Vercel</div>
                         </div>
                         <div className="w-10 h-10 border border-white/[0.1] flex items-center justify-center hover:bg-white text-white hover:text-black transition-colors cursor-pointer">
                            <ArrowRight className="w-4 h-4" />
                         </div>
                      </div>
                   </div>

                   {/* Right Col: Performance Metrics */}
                   <div className="p-16 md:p-24 lg:p-32 flex flex-col justify-center bg-[#000]">
                      <div className="pl-6 mb-12 border-l border-cyan-500/50">
                         <h3 className="text-xl font-medium text-white mb-2">
                            Faster than local.
                         </h3>
                         <p className="text-[#888]">High-performance cloud compute with zero overhead.</p>
                      </div>

                      {/* Brutalist Metric Rows */}
                      <div className="w-full border border-white/[0.1] bg-[#050505] overflow-hidden">
                         <div className="divide-y divide-white/[0.1]">
                            <div className="flex items-center justify-between px-6 py-5 bg-[#000]">
                               <span className="text-[#888] font-mono text-xs uppercase tracking-widest">Cold Start</span>
                               <span className="text-cyan-400 text-2xl font-mono">&lt;2s</span>
                            </div>
                            <div className="flex items-center justify-between px-6 py-5 bg-[#000]">
                               <span className="text-[#888] font-mono text-xs uppercase tracking-widest">Max RAM</span>
                               <span className="text-cyan-400 text-2xl font-mono">64GB</span>
                            </div>
                            <div className="flex items-center justify-between px-6 py-5 bg-[#000]">
                               <span className="text-[#888] font-mono text-xs uppercase tracking-widest">Local Overhead</span>
                               <span className="text-cyan-400 text-2xl font-mono">0ms</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 3: COMMAND PALETTE                 */}
                {/* ═══════════════════════════════════════════ */}
                <div className="flex flex-col items-center relative border-b border-white/[0.1] py-24 md:py-32 px-6 overflow-hidden">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,black_10%,transparent_60%)] pointer-events-none" />

                   {/* Command Palette Mockup */}
                   <div className="w-full max-w-[420px] bg-[#000] border border-white/[0.1] overflow-hidden mb-16 relative">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />
                      <Crosshair className="-bottom-1.5 -left-1.5" />
                      <Crosshair className="-bottom-1.5 -right-1.5" />

                      {/* Search input */}
                      <div className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.1] bg-[#050505]">
                         <Search className="w-4 h-4 text-white" />
                         <span className="text-sm text-[#888] flex-1 font-mono">Run command...</span>
                      </div>
                      {/* Command items */}
                      <div className="divide-y divide-white/[0.1]">
                         <div className="flex items-center justify-between px-5 py-3.5 bg-indigo-500/10">
                            <div className="flex items-center gap-4">
                               <Play className="w-4 h-4 text-indigo-400" />
                               <span className="text-indigo-400 font-medium text-sm">Start dev server</span>
                            </div>
                            <kbd className="px-2 py-1 bg-[#000] border border-indigo-500/30 text-[10px] text-indigo-400 font-mono"><CornerDownLeft className="w-3 h-3 inline" /></kbd>
                         </div>
                         <div className="flex items-center justify-between px-5 py-3.5">
                            <div className="flex items-center gap-4">
                               <Terminal className="w-4 h-4 text-[#666]" />
                               <span className="text-[#888] text-sm">Run all tests</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <kbd className="px-2 py-1 bg-[#000] border border-white/[0.1] text-[10px] text-[#666] font-mono">⇧</kbd>
                               <kbd className="px-2 py-1 bg-[#000] border border-white/[0.1] text-[10px] text-[#666] font-mono">T</kbd>
                            </div>
                         </div>
                         <div className="flex items-center justify-between px-5 py-3.5">
                            <div className="flex items-center gap-4">
                               <GitBranch className="w-4 h-4 text-[#666]" />
                               <span className="text-[#888] text-sm">Switch branch</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <kbd className="px-2 py-1 bg-[#000] border border-white/[0.1] text-[10px] text-[#666] font-mono">⌘</kbd>
                               <kbd className="px-2 py-1 bg-[#000] border border-white/[0.1] text-[10px] text-[#666] font-mono">B</kbd>
                            </div>
                         </div>
                      </div>
                   </div>

                   <h3 className="text-2xl md:text-3xl text-center max-w-2xl tracking-tight leading-[1.2] relative z-10">
                      <strong className="text-white font-medium">A terminal at your fingertips.</strong>{' '}
                      <br/>
                      <span className="text-[#888]">Run commands, switch branches, and manage your entire workflow from a single keyboard shortcut.</span>
                   </h3>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* 3-COLUMN FEATURES                          */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-3 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="col-span-1 md:border-r border-b md:border-b-0 border-white/[0.1] p-12 lg:p-16 flex flex-col bg-[#050505] hover:bg-[#0a0a0a] transition-colors">
                      <Layers className="w-6 h-6 text-purple-400 mb-6" />
                      <h3 className="text-xl font-medium text-white mb-3">Multiplayer editing</h3>
                      <p className="text-[#888] text-[15px] leading-relaxed">
                         See your teammates' cursors and edits in real time. Pair program without screen sharing.
                      </p>
                   </div>
                   <div className="col-span-1 md:border-r border-b md:border-b-0 border-white/[0.1] p-12 lg:p-16 flex flex-col bg-[#000] hover:bg-[#050505] transition-colors">
                      <Terminal className="w-6 h-6 text-cyan-400 mb-6" />
                      <h3 className="text-xl font-medium text-white mb-3">Cloud compute</h3>
                      <p className="text-[#888] text-[15px] leading-relaxed">
                         Every workspace runs on high-performance cloud hardware. No fan noise. No battery drain.
                      </p>
                   </div>
                   <div className="col-span-1 p-12 lg:p-16 flex flex-col bg-[#050505] hover:bg-[#0a0a0a] transition-colors">
                      <GitBranch className="w-6 h-6 text-emerald-400 mb-6" />
                      <h3 className="text-xl font-medium text-white mb-3">Git version control</h3>
                      <p className="text-[#888] text-[15px] leading-relaxed">
                         Built-in git with branch management, conflict resolution, and one-click PRs.
                      </p>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* GIANT 2-COLUMN FINAL CTA                   */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Block: Deep Indigo */}
                   <div className="h-[600px] lg:border-r border-b lg:border-b-0 border-white/[0.1] bg-[#4f46e5] p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden group">
                      <div className="text-black text-5xl font-black italic tracking-tighter mix-blend-overlay opacity-30">CORE</div>
                      
                      {/* Decorative Element */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-sm border border-white/20 bg-[#050505] p-6 transform group-hover:scale-105 transition-transform duration-500">
                         <div className="flex items-center gap-3 mb-4 border-b border-white/20 pb-4">
                            <Terminal className="w-6 h-6 text-white" />
                            <span className="font-bold tracking-tight">collab-cli</span>
                         </div>
                         <div className="flex items-center justify-between font-mono text-sm">
                            <span className="font-medium text-white/70">v2.0.4</span>
                            <span className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest">Stable</span>
                         </div>
                      </div>

                      <div className="relative z-10">
                         <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 leading-[1.1]">Start coding now.</h3>
                         <div className="flex items-center gap-4">
                            <button className="bg-white text-black px-8 py-3.5 text-[14px] font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                               Create Workspace <ArrowRight className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </div>

                   {/* Right Block: Neon Cyan */}
                   <div className="h-[600px] bg-[#06b6d4] p-12 lg:p-16 flex flex-col justify-between text-black relative overflow-hidden group">
                      <div className="absolute -right-10 -top-10 opacity-20 text-black">
                        <Activity className="w-80 h-80" />
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-md mt-12 relative z-10">
                        "Collab Code has completely eliminated 'it works on my machine' from our vocabulary."
                      </h3>

                      <div className="flex items-center gap-4 relative z-10">
                         <div className="w-12 h-12 border border-black/20 bg-black flex items-center justify-center text-cyan-400">
                            <Code2 className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="font-bold text-lg tracking-tight">Sarah Chen</div>
                            <div className="text-black/70 font-mono text-xs uppercase tracking-widest font-bold">VP Engineering, Acme</div>
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          </section>

      </div>
    </main>
  );
}
