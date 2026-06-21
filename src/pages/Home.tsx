import React from 'react';
import { motion } from 'motion/react';
import {
  Plus, Terminal, GitBranch, FileCode, Package, Layout, ShieldCheck, Lock, Key, Server,
  Layers, Zap, Globe, ArrowRight, MessageSquare, Check, ChevronRight, Play, Search,
  CornerDownLeft, Cloud, Database, Gauge
} from 'lucide-react';

// Reusable Crosshair component
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Home() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black">
      
      <div className="relative z-10 flex flex-col w-full">
         
          {/* ═══════════════════════════════════════════════ */}
          {/* HERO SECTION                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="bg-black pt-32 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
             {/* Subtle grid background */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-50" />
             
             <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
                <div className="flex flex-col items-center text-center">
                   {/* Tagline pill */}
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] mb-8"
                   >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm text-[#a1a1aa]">Collab Code Environment 2.0 is Live</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#666]" />
                   </motion.div>

                   {/* Main heading */}
                   <motion.h1 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-white leading-[1.05] max-w-4xl mb-6"
                   >
                      Code at the speed of thought.
                   </motion.h1>

                   {/* Subtitle */}
                   <motion.p 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
                   >
                      A cloud development environment that gives every developer the power of a high-performance workstation. No local setup. No waiting. Just code.
                   </motion.p>

                   {/* CTA Buttons */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     className="flex items-center gap-4 mb-20"
                   >
                      <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                         Start Coding Now
                      </button>
                      <button className="px-6 py-3 border border-white/[0.2] text-white rounded-full text-sm font-medium hover:bg-white/[0.05] transition-colors">
                         View Documentation
                      </button>
                   </motion.div>

                   {/* IDE Mockup */}
                   <motion.div 
                     initial={{ opacity: 0, y: 40, scale: 0.97 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full max-w-5xl"
                   >
                      <div className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                         {/* Window chrome */}
                         <div className="h-10 border-b border-white/[0.1] flex items-center px-4 gap-2 bg-[#050505]">
                            <div className="w-3 h-3 rounded-full bg-[#ef4444]/40" />
                            <div className="w-3 h-3 rounded-full bg-[#eab308]/40" />
                            <div className="w-3 h-3 rounded-full bg-[#10b981]/40" />
                            <div className="ml-4 flex-1 h-6 bg-black/50 border border-white/[0.05] rounded text-center text-[#666] font-mono text-[10px] leading-6">
                               collabcode.dev — workspace
                            </div>
                         </div>
                         
                         <div className="flex">
                            {/* Sidebar */}
                            <div className="w-48 border-r border-white/[0.05] p-3 hidden md:block">
                               <div className="text-[10px] text-[#666] font-mono uppercase tracking-wider mb-3 px-2">Explorer</div>
                               <div className="flex flex-col gap-0.5 text-xs font-mono">
                                  <div className="px-2 py-1 text-[#888] flex items-center gap-2"><span className="text-[#666]">▼</span> src/</div>
                                  <div className="px-2 py-1 pl-6 text-white bg-white/[0.05] rounded flex items-center gap-2"><FileCode className="w-3 h-3 text-blue-400" /> server.ts</div>
                                  <div className="px-2 py-1 pl-6 text-[#888] flex items-center gap-2"><FileCode className="w-3 h-3 text-emerald-400" /> app.tsx</div>
                                  <div className="px-2 py-1 pl-6 text-[#888] flex items-center gap-2"><Layout className="w-3 h-3 text-purple-400" /> styles.css</div>
                                  <div className="px-2 py-1 text-[#888] flex items-center gap-2"><Package className="w-3 h-3 text-orange-400" /> package.json</div>
                               </div>
                            </div>

                            {/* Editor + Terminal */}
                            <div className="flex-1 flex flex-col">
                               {/* Code Editor */}
                               <div className="p-6 font-mono text-[13px] leading-6 flex-1 min-h-[200px]">
                                  <div><span className="text-[#c792ea]">import</span> <span className="text-[#82aaff]">{'{ createServer }'}</span> <span className="text-[#c792ea]">from</span> <span className="text-[#c3e88d]">'collab-engine'</span>;</div>
                                  <div className="h-6" />
                                  <div><span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">server</span> = <span className="text-[#82aaff]">createServer</span>({'{'}</div>
                                  <div className="pl-6"><span className="text-white">port</span>: <span className="text-[#f78c6c]">3000</span>,</div>
                                  <div className="pl-6"><span className="text-white">workers</span>: <span className="text-[#f78c6c]">4</span>,</div>
                                  <div className="pl-6"><span className="text-white">hotReload</span>: <span className="text-[#ff5370]">true</span>,</div>
                                  <div>{'}'});</div>
                                  <div className="h-6" />
                                  <div><span className="text-white">server</span>.<span className="text-[#82aaff]">listen</span>();</div>
                               </div>

                               {/* Terminal */}
                               <div className="border-t border-white/[0.05] p-4 font-mono text-xs bg-black/50">
                                  <div className="text-[#666] mb-1">Terminal</div>
                                  <div className="text-[#a1a1aa]">$ collab dev</div>
                                  <div className="text-emerald-400 mt-1">✓ Server running on port 3000</div>
                                  <div className="text-[#888]">✓ Hot reload enabled</div>
                                  <div className="text-[#888] flex items-center">Ready <span className="w-1.5 h-4 bg-white/50 ml-1 animate-pulse" /></div>
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
          <section className="bg-black border-t border-white/[0.1] relative">
             <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative">

                {/* ─── LOGO STRIP ─── */}
                <div className="flex flex-col relative border-b border-white/[0.1] py-16">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   <p className="text-center text-xs text-[#888] font-mono uppercase tracking-[0.2em] mb-12">Powering the best engineering teams</p>
                   <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 px-10 opacity-50">
                      <span className="text-xl font-bold tracking-tighter">▲ Vercel</span>
                      <span className="text-xl font-serif italic">Retool</span>
                      <span className="text-xl font-mono tracking-tight">Arc</span>
                      <span className="text-xl font-bold tracking-tight">Raycast</span>
                      <span className="text-xl font-black tracking-[0.15em] uppercase text-sm">RAMP</span>
                      <span className="text-xl font-bold">Loom</span>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 1: MULTIPLAYER                     */}
                {/* 2-col: Left heading, Right file mockup     */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center min-h-[550px]">
                      <div className="flex items-center gap-2 text-[#888] text-sm mb-6">
                         <Layers className="w-4 h-4" />
                         <span>Collaboration</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] mb-6">
                         Multiplayer by default.
                      </h2>
                      <p className="text-[#a1a1aa] text-lg leading-relaxed">
                         Every workspace is shared. See your teammates' cursors, edits, and terminal output in real time. No screen-sharing required.
                      </p>
                   </div>

                   {/* Right Col: File System Mockup */}
                   <div className="p-16 md:p-24 flex items-center justify-center bg-[#050505] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
                      
                      <div className="w-full max-w-lg bg-black border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                         <div className="p-4 border-b border-white/[0.1] flex items-center justify-between bg-[#0a0a0a]">
                            <h3 className="text-white text-sm font-medium flex items-center gap-2"><FileCode className="w-4 h-4" /> Workspace Files</h3>
                            <span className="text-xs text-[#888] font-mono">3 collaborators</span>
                         </div>
                         
                         <div className="divide-y divide-white/[0.05]">
                            {/* Active file */}
                            <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02]">
                               <div className="flex items-center gap-3">
                                  <Terminal className="w-4 h-4 text-emerald-400" />
                                  <span className="text-white text-sm font-mono">server.ts</span>
                               </div>
                               <div className="flex items-center gap-3">
                                  <span className="text-[10px] text-[#888] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
                                  <div className="flex -space-x-1.5">
                                     <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 border-2 border-black" />
                                     <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 border-2 border-black" />
                                  </div>
                               </div>
                            </div>
                            {/* File 2 */}
                            <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                               <div className="flex items-center gap-3">
                                  <FileCode className="w-4 h-4 text-blue-400" />
                                  <span className="text-[#888] text-sm font-mono">App.tsx</span>
                               </div>
                               <div className="flex items-center gap-3">
                                  <span className="text-[10px] text-[#666] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> feat/ui</span>
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 border-2 border-black" />
                               </div>
                            </div>
                            {/* File 3 */}
                            <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                               <div className="flex items-center gap-3">
                                  <Package className="w-4 h-4 text-orange-400" />
                                  <span className="text-[#888] text-sm font-mono">package.json</span>
                               </div>
                               <span className="text-[10px] text-[#666] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
                            </div>
                            {/* File 4 */}
                            <div className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                               <div className="flex items-center gap-3">
                                  <Layout className="w-4 h-4 text-purple-400" />
                                  <span className="text-[#888] text-sm font-mono">index.css</span>
                               </div>
                               <span className="text-[10px] text-[#666] font-mono flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 2: PERFORMANCE                     */}
                {/* 2-col: Left testimonial, Right metrics     */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Testimonial */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      <p className="text-2xl md:text-3xl font-medium text-white leading-snug mb-10 tracking-tight">
                         <span className="text-[#666]">"</span>Collab Code is the closest thing to teleporting your entire dev environment to the cloud. It's faster than local.<span className="text-[#666]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <div>
                            <div className="text-white font-medium mb-1">Guillermo Rauch</div>
                            <div className="text-[#888] text-sm">CEO, Vercel</div>
                         </div>
                         <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors cursor-pointer">
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                         </div>
                      </div>
                   </div>

                   {/* Right Col: Performance Metrics */}
                   <div className="p-16 md:p-24 lg:p-32 flex flex-col justify-center relative">
                      <div className="absolute left-16 md:left-24 lg:left-32 top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6] to-transparent" />
                      
                      <div className="relative z-10">
                         <div className="absolute -left-[4.5px] top-2 w-[10px] h-[10px] rounded-full border-[2px] border-[#3b82f6] bg-black" />
                         <div className="pl-6 mb-10">
                            <h3 className="text-xl font-medium text-white mb-3">
                               <strong>Faster than your local machine.</strong>{' '}
                               <span className="text-[#a1a1aa] font-normal">High-performance cloud compute with zero overhead.</span>
                            </h3>
                         </div>
                      </div>

                      {/* Metric Rows */}
                      <div className="ml-6 w-full rounded-xl border border-white/[0.1] bg-[#050505] overflow-hidden shadow-2xl">
                         <div className="divide-y divide-white/[0.05]">
                            <div className="flex items-center justify-between px-5 py-4">
                               <span className="text-[#888] text-sm">Cold Start</span>
                               <span className="text-white text-2xl font-medium tracking-tight">&lt;2s</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-4">
                               <span className="text-[#888] text-sm">Max RAM</span>
                               <span className="text-white text-2xl font-medium tracking-tight">64GB</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-4">
                               <span className="text-[#888] text-sm">Local Overhead</span>
                               <span className="text-white text-2xl font-medium tracking-tight">0ms</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-4">
                               <span className="text-[#888] text-sm">Global Regions</span>
                               <span className="text-white text-2xl font-medium tracking-tight">15+</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 3: COMMAND PALETTE                 */}
                {/* Centered floating UI + text                */}
                {/* ═══════════════════════════════════════════ */}
                <div className="flex flex-col items-center relative border-b border-white/[0.1] py-24 md:py-32 px-6">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Command Palette Mockup */}
                   <div className="w-full max-w-[380px] bg-[#0a0a0a] border border-white/[0.15] rounded-xl shadow-[0_0_80px_-20px_rgba(255,255,255,0.08)] overflow-hidden mb-12">
                      {/* Search input */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.1]">
                         <Search className="w-4 h-4 text-[#666]" />
                         <span className="text-sm text-[#888] flex-1 font-mono">&gt; Run</span>
                      </div>
                      {/* Command items */}
                      <div className="divide-y divide-white/[0.05]">
                         <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03]">
                            <div className="flex items-center gap-3">
                               <Play className="w-4 h-4 text-emerald-400" />
                               <span className="text-white text-sm">Start dev server (Port 3000)</span>
                            </div>
                            <kbd className="px-1.5 py-0.5 bg-white/[0.1] border border-white/[0.1] rounded text-[10px] text-[#888] font-mono"><CornerDownLeft className="w-3 h-3 inline" /></kbd>
                         </div>
                         <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                               <Terminal className="w-4 h-4 text-[#888]" />
                               <span className="text-[#888] text-sm">Run all tests</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <kbd className="px-1.5 py-0.5 bg-white/[0.05] border border-white/[0.05] rounded text-[10px] text-[#666] font-mono">⇧</kbd>
                               <kbd className="px-1.5 py-0.5 bg-white/[0.05] border border-white/[0.05] rounded text-[10px] text-[#666] font-mono">T</kbd>
                            </div>
                         </div>
                         <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                               <GitBranch className="w-4 h-4 text-[#888]" />
                               <span className="text-[#888] text-sm">Switch branch</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <kbd className="px-1.5 py-0.5 bg-white/[0.05] border border-white/[0.05] rounded text-[10px] text-[#666] font-mono">⌘</kbd>
                               <kbd className="px-1.5 py-0.5 bg-white/[0.05] border border-white/[0.05] rounded text-[10px] text-[#666] font-mono">B</kbd>
                            </div>
                         </div>
                      </div>
                   </div>

                   <h3 className="text-xl md:text-2xl text-center max-w-xl tracking-tight">
                      <strong className="text-white">A terminal at your fingertips.</strong>{' '}
                      <span className="text-[#a1a1aa]">Run commands, switch branches, and manage your entire workflow from a single keyboard shortcut.</span>
                   </h3>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 4: SECURITY                        */}
                {/* 2-col: Left text + checklist, Right mockup */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-[#888] text-sm mb-6">
                         <ShieldCheck className="w-4 h-4" />
                         <span>Enterprise Security</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] mb-6">
                         Secure by default. Zero trust.
                      </h2>
                      <p className="text-[#a1a1aa] text-lg leading-relaxed mb-8">
                         Your source code never touches a developer's local machine. Every workspace runs in an isolated MicroVM with encrypted storage and network isolation.
                      </p>
                      <ul className="flex flex-col gap-3">
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> No local source code exposure</li>
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> Isolated MicroVM per workspace</li>
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> Built-in secret management</li>
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> SOC2 & GDPR compliant</li>
                      </ul>
                   </div>

                   {/* Right Col: VM Console Mockup */}
                   <div className="p-16 md:p-24 flex items-center justify-center bg-[#050505] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent_60%)] pointer-events-none" />
                      
                      <div className="w-full max-w-lg bg-black border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                         <div className="p-4 border-b border-white/[0.1] flex items-center justify-between bg-[#0a0a0a]">
                            <h3 className="text-white text-sm font-medium flex items-center gap-2"><Lock className="w-4 h-4" /> Workspace Isolation</h3>
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                               <span className="text-xs text-[#888]">Secure</span>
                            </div>
                         </div>
                         
                         <div className="p-0">
                            <table className="w-full text-left text-sm">
                               <thead className="bg-black border-b border-white/[0.05] text-[#666]">
                                  <tr>
                                     <th className="font-normal px-4 py-3">Layer</th>
                                     <th className="font-normal px-4 py-3 text-right">Status</th>
                                  </tr>
                               </thead>
                               <tbody className="divide-y divide-white/[0.05] text-[#a1a1aa] font-mono text-xs">
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white flex items-center gap-2"><Server className="w-3.5 h-3.5 text-emerald-400" /> MicroVM Isolation</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">Active</td>
                                  </tr>
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Encrypted Storage</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">AES-256</td>
                                  </tr>
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white flex items-center gap-2"><Key className="w-3.5 h-3.5 text-emerald-400" /> Secret Vault</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">12 secrets</td>
                                  </tr>
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-emerald-400" /> Network Policy</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">Zero Trust</td>
                                  </tr>
                               </tbody>
                            </table>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* TESTIMONIAL                                */}
                {/* ═══════════════════════════════════════════ */}
                <div className="relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   <div className="p-16 md:p-24 lg:p-32">
                      <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white mb-12 max-w-4xl leading-tight">
                         <span className="text-[#666]">"</span>We moved our entire engineering team to Collab Code in a week. Onboarding went from 2 days to 15 minutes.<span className="text-[#666]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <div>
                            <div className="text-white font-medium mb-1">David Cramer, CTO</div>
                            <div className="text-2xl font-black tracking-[0.1em] text-[#888] uppercase">Sentry</div>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-white" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* 3-COLUMN FEATURES                          */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-3 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="col-span-1 border-r border-white/[0.1] p-12 lg:p-16">
                      <Layers className="w-6 h-6 text-white mb-6" />
                      <h3 className="text-xl font-medium text-white mb-4">Multiplayer editing</h3>
                      <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                         See your teammates' cursors and edits in real time. Pair program without screen sharing.
                      </p>
                   </div>
                   <div className="col-span-1 border-r border-white/[0.1] p-12 lg:p-16">
                      <Terminal className="w-6 h-6 text-white mb-6" />
                      <h3 className="text-xl font-medium text-white mb-4">Cloud compute</h3>
                      <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                         Every workspace runs on high-performance cloud hardware. No fan noise. No battery drain.
                      </p>
                   </div>
                   <div className="col-span-1 p-12 lg:p-16">
                      <GitBranch className="w-6 h-6 text-white mb-6" />
                      <h3 className="text-xl font-medium text-white mb-4">Git version control</h3>
                      <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                         Built-in git with branch management, conflict resolution, and one-click PRs.
                      </p>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* CTA SECTION                                */}
                {/* ═══════════════════════════════════════════ */}
                <div className="relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   <div className="py-32 md:py-48 flex flex-col items-center justify-center text-center px-6">
                      {/* Decorative diamond */}
                      <div className="w-10 h-10 border border-white/[0.2] rotate-45 flex items-center justify-center mb-10">
                         <div className="w-3 h-3 bg-white/30" />
                      </div>

                      <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tighter text-white leading-[1.05] mb-4 max-w-3xl">
                         Code the future.{' '}
                         <span className="text-[#666]">Together.</span>
                      </h2>

                      <div className="flex items-center gap-4 mt-10">
                         <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                            Start coding
                            <ArrowRight className="w-4 h-4" />
                         </button>
                         <button className="px-6 py-3 border border-white/[0.2] text-white rounded-full text-sm font-medium hover:bg-white/[0.05] transition-colors">
                            Contact sales
                         </button>
                      </div>
                   </div>
                </div>

             </div>
          </section>

      </div>
    </main>
  );
}
