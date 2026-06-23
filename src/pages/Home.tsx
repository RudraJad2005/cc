import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Globe2, ArrowRight, Zap, GitBranch, Search, Play, CornerDownLeft, Layers, Plus, Network, FileCode, Package, LayoutDashboard, Database, Lock, Box, Cpu, Sparkles, Bot, BrainCircuit, Shield, Share2, GitCommit, ArrowUpCircle, Monitor, Smartphone, Activity, Layout, ShieldCheck, Key, Server, MessageSquare, Check, ChevronRight, Cloud, Gauge } from 'lucide-react';
import { SiNextdotjs, SiReact, SiNuxt, SiSvelte, SiVite, SiPython, SiNodedotjs, SiRust } from 'react-icons/si';
import { SiGithub, SiGitlab, SiLinear, SiVercel, SiPostgresql } from 'react-icons/si';

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
          <section className="bg-black pt-40 pb-0 relative overflow-hidden flex flex-col items-center w-full min-h-[90vh]">
             
             {/* Dot grid background */}
             <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
             
             {/* Soft center glow */}
             <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

             <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col lg:flex-row items-start justify-between flex-1">
                
                {/* Left — Heading & CTAs */}
                <div className="flex flex-col items-start text-left pt-16 lg:pt-24 z-20 max-w-[520px]">
                   
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                     className="text-[13px] font-mono text-white/40 uppercase tracking-[0.2em] mb-8"
                   >
                      Collab Code
                   </motion.div>

                   <motion.h1 
                     initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                     className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] text-white leading-[1] mb-8"
                   >
                      Ship code,{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/60 to-white bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
                        together.
                      </span>
                   </motion.h1>

                   <motion.p 
                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                     className="text-[#71717a] text-lg leading-relaxed mb-12 max-w-[440px]"
                   >
                      The development platform for teams that move fast. Real-time collaboration, instant environments, zero config.
                   </motion.p>

                   <motion.div 
                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                     className="flex items-center gap-3"
                   >
                      <button className="px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                         Start Building
                      </button>
                      <button className="px-5 py-2.5 border border-white/15 text-white/80 rounded-full text-sm font-medium hover:bg-white/5 hover:text-white transition-all">
                         Request Demo
                      </button>
                   </motion.div>
                </div>

                {/* Center — Animated Logo Mark */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
                >
                   {/* Outer glow */}
                   <div className="absolute -inset-16 bg-white/[0.03] blur-[80px] rounded-full" />
                   
                   {/* Interlocking brackets — representing collaboration */}
                   <svg width="180" height="200" viewBox="0 0 180 200" className="relative z-10">
                      {/* Left bracket */}
                      <motion.path 
                        d="M 75 30 L 40 55 L 40 145 L 75 170" 
                        stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.6 }}
                      />
                      {/* Right bracket */}
                      <motion.path 
                        d="M 105 30 L 140 55 L 140 145 L 105 170" 
                        stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }}
                      />
                      {/* Center connecting line */}
                      <motion.line 
                        x1="60" y1="100" x2="120" y2="100" 
                        stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 6"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.4 }}
                      />
                      {/* Left node */}
                      <motion.circle cx="55" cy="100" r="3" fill="rgba(255,255,255,0.15)"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                      />
                      {/* Right node */}
                      <motion.circle cx="125" cy="100" r="3" fill="rgba(255,255,255,0.15)"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
                      />
                   </svg>
                </motion.div>

                {/* Right — Descriptor Labels */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
                  className="hidden lg:flex flex-col items-end text-right gap-4 pt-16 lg:pt-24 z-20"
                >
                   <span className="text-[13px] font-mono text-white/40 uppercase tracking-[0.15em]">Real-Time Editing</span>
                   <span className="text-[13px] font-mono text-white/40 uppercase tracking-[0.15em]">Instant Environments</span>
                   <span className="text-[13px] font-mono text-white/40 uppercase tracking-[0.15em]">Built for Teams</span>
                </motion.div>

             </div>

             {/* Bottom stats row */}
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}
               className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 pb-16 pt-20 flex items-center justify-between z-10"
             >
                <div className="flex items-center gap-16">
                   <div>
                      <div className="text-2xl font-bold text-white tracking-tight">50K+</div>
                      <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider mt-1">Developers</div>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div>
                      <div className="text-2xl font-bold text-white tracking-tight">99.9%</div>
                      <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider mt-1">Uptime</div>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div>
                      <div className="text-2xl font-bold text-white tracking-tight">&lt;50ms</div>
                      <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider mt-1">Latency</div>
                   </div>
                </div>
             </motion.div>

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
                {/* NEW SECTION: UNIFIED ARCHITECTURE          */}
                {/* ═══════════════════════════════════════════ */}
                <section className="border-b border-white/[0.1] py-24 md:py-32 flex flex-col items-center bg-[#000]">
                   <div className="text-center px-6 max-w-3xl mb-24 relative z-20">
                      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
                         Everything connects. Seamlessly.
                      </h2>
                      <p className="text-[#888] text-lg leading-relaxed">
                         From your source code to your production deployment, CollabCode acts as the ultimate central engine, seamlessly orchestrating your entire developer toolchain.
                      </p>
                   </div>

                   {/* The Connection Diagram */}
                   <div className="relative w-full max-w-[896px] h-[400px]">
                      {/* Source Code Nodes (Left) */}
                      <div className="absolute left-0 top-[60px] w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                         <SiGithub className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute left-0 top-[176px] w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(226,67,41,0.15)]">
                         <SiGitlab className="w-6 h-6 text-[#E24329]" />
                      </div>
                      <div className="absolute left-0 top-[292px] w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(94,106,210,0.15)]">
                         <SiLinear className="w-6 h-6 text-[#5E6AD2]" />
                      </div>

                      {/* Central Node (Collab Engine) */}
                      <div className="absolute left-[424px] top-[176px] w-12 h-12 rounded-full bg-white flex items-center justify-center z-20 shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                         <span className="text-black font-black text-xl leading-none">Δ</span>
                      </div>

                      {/* Output Nodes (Right) */}
                      <div className="absolute right-0 top-[60px] w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                         <SiVercel className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute right-0 top-[176px] w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,153,0,0.15)]">
                         <Cloud className="w-6 h-6 text-[#FF9900]" />
                      </div>
                      <div className="absolute right-0 top-[292px] w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(51,103,145,0.15)]">
                         <SiPostgresql className="w-6 h-6 text-[#336791]" />
                      </div>

                      {/* Connecting Bezier Curves */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 896 400" preserveAspectRatio="xMidYMid meet">
                         {/* Left to Center */}
                         <motion.path d="M 48 84 C 200 84, 300 200, 424 200" stroke="#fff" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} />
                         <motion.path d="M 48 200 L 424 200" stroke="#E24329" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} />
                         <motion.path d="M 48 316 C 200 316, 300 200, 424 200" stroke="#5E6AD2" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} />
                         
                         {/* Center to Right */}
                         <motion.path d="M 472 200 C 600 200, 700 84, 848 84" stroke="#fff" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} />
                         <motion.path d="M 472 200 L 848 200" stroke="#FF9900" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} />
                         <motion.path d="M 472 200 C 600 200, 700 316, 848 316" stroke="#336791" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }} />
                      </svg>
                   </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* THE AI CLOUD SECTION                       */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   {/* Left Sticky Column */}
                   <div className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-white/[0.1]">
                      <div className="lg:sticky lg:top-32 h-auto p-12 md:p-20 flex flex-col justify-start">
                         <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-4 h-4 text-[#888]" />
                            <span className="text-[#888] font-mono text-xs font-bold tracking-widest">The AI Cloud</span>
                         </div>
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-white max-w-sm">
                            The end-to-end platform for AI workloads.
                         </h2>
                      </div>
                   </div>

                   {/* Right Scrolling Column */}
                   <div className="lg:col-span-8 flex flex-col">
                      
                      {/* Block 1: AI Gateway */}
                      <div className="p-12 md:p-20 border-b border-white/[0.1] bg-[#000] relative overflow-hidden flex flex-col items-start min-h-[600px]">
                         <div className="w-full text-left mb-16 relative z-10">
                            <h3 className="text-2xl font-medium text-[#888] tracking-tight mb-6 max-w-lg leading-relaxed">
                               <strong className="font-bold text-white">AI Gateway.</strong> Switch between AI models without needing to manage API keys, rate limits, or provider accounts.
                            </h3>
                            <button className="px-4 py-1.5 bg-white text-black font-medium text-sm rounded-full hover:bg-gray-200 transition-colors">Read the docs</button>
                         </div>
                         
                         {/* Semi-Circle SVG Diagram */}
                         <div className="w-full flex justify-center mt-auto">
                            <div className="relative w-[500px] h-[250px] shrink-0 pointer-events-none">
                               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 250">
                                  {/* Track lines */}
                                  <path d="M 50 250 A 200 200 0 0 1 450 250" stroke="#333" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                                  <path d="M 100 250 A 150 150 0 0 1 400 250" stroke="#333" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                                  <path d="M 150 250 A 100 100 0 0 1 350 250" stroke="#444" strokeWidth="1" fill="none" />
                                  
                                  {/* Animated Connection Lines */}
                                  <motion.path d="M 50 250 A 200 200 0 0 1 450 250" stroke="#fff" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 0.5, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} />
                                  <motion.path d="M 100 250 A 150 150 0 0 1 400 250" stroke="#a855f7" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 0.3, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} />
                               </svg>
                               
                               {/* Central Gateway Node */}
                               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center z-20 shadow-[0_0_30px_rgba(255,255,255,0.3)] pointer-events-auto">
                                  <span className="text-black text-2xl font-black">▲</span>
                               </div>
                               
                               {/* Orbital Nodes */}
                               {/* Outer Track */}
                               <div className="absolute w-8 h-8 rounded-full border border-[#333] bg-black flex items-center justify-center text-[#888] z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: '77px', top: '150px' }}><Bot className="w-4 h-4" /></div>
                               <div className="absolute w-8 h-8 rounded-full border border-[#333] bg-black flex items-center justify-center text-[#888] z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: '250px', top: '50px' }}><BrainCircuit className="w-4 h-4" /></div>
                               <div className="absolute w-8 h-8 rounded-full border border-[#333] bg-black flex items-center justify-center text-[#888] z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: '423px', top: '150px' }}><Sparkles className="w-4 h-4" /></div>
                               {/* Inner Track */}
                               <div className="absolute w-8 h-8 rounded-full border border-[#444] bg-black flex items-center justify-center text-purple-400 z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: '144px', top: '144px' }}><Cpu className="w-4 h-4" /></div>
                               <div className="absolute w-8 h-8 rounded-full border border-[#444] bg-black flex items-center justify-center text-white z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: '356px', top: '144px' }}><Share2 className="w-4 h-4" /></div>
                            </div>
                         </div>
                      </div>

                      {/* Block 2: Fluid Compute */}
                      <div className="p-12 md:p-20 border-b lg:border-b-0 border-white/[0.1] bg-[#000] flex flex-col justify-center min-h-[400px]">
                         <div className="flex items-start justify-between">
                            <h3 className="text-2xl font-medium text-white tracking-tight max-w-sm leading-tight">
                               <strong className="font-bold text-white">Fluid Compute.</strong> <span className="text-[#888]">Framework-defined compute platform designed for AI workloads.</span>
                            </h3>
                            <button className="px-4 py-1.5 bg-white text-black font-medium text-sm rounded-full hover:bg-gray-200 transition-colors">Read the docs</button>
                         </div>
                      </div>

                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* AI SDK FULL WIDTH BREAKOUT                   */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 relative border-b border-white/[0.1] bg-[#020202]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Giant SDK Header */}
                   <div className="col-span-1 lg:col-span-12 p-12 md:p-32 flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/[0.1]">
                      <div className="max-w-xl mb-12 lg:mb-0">
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Build with our <span className="inline-block border border-white/20 rounded px-2 py-0.5 text-sm align-middle tracking-widest font-mono mx-1">AI SDK</span> today.
                         </h2>
                         <p className="text-[#888] text-xl">The open source toolkit for building AI-native frontend apps with JavaScript or TypeScript.</p>
                      </div>
                      
                      {/* npm pill */}
                      <div className="flex items-center bg-white rounded-full px-6 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] max-w-fit">
                         <span className="font-mono text-black font-bold text-lg mr-8">$ npm i ai</span>
                         <svg className="w-5 h-5 text-[#888] cursor-pointer hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </div>
                   </div>

                   {/* Split Content Below */}
                   <div className="col-span-1 lg:col-span-6 p-12 md:p-24 lg:border-r border-b lg:border-b-0 border-white/[0.1] flex flex-col justify-between min-h-[400px]">
                      <p className="text-xl md:text-2xl text-[#888] leading-relaxed font-medium tracking-tight mb-12">
                         <span className="text-white">"</span>In the age of AI, getting your product into the market needs to be incredibly fast. We were able to launch Director.ai quickly thanks to Collab Code's primitives like functions, Fluid Compute, AI SDK, and Observability. Launch day was smooth thanks to Collab Code.<span className="text-white">"</span>
                      </p>
                      <div className="flex items-center justify-end w-full">
                         <div className="text-right">
                            <div className="text-white font-medium text-sm">Paul Klein IV, CEO</div>
                            <div className="text-[#666] font-mono text-xs uppercase tracking-widest flex justify-end items-center gap-2 mt-1"><div className="w-4 h-4 bg-white text-black font-bold flex items-center justify-center text-[10px]">B</div> Browserbox</div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="col-span-1 lg:col-span-6 p-12 md:p-24 flex flex-col justify-center min-h-[400px]">
                      <h3 className="text-4xl md:text-[3.5rem] font-bold tracking-tighter text-white mb-6 leading-tight">Security by default.</h3>
                      <div className="grid grid-cols-2 gap-12 mt-8">
                         <div>
                            <div className="text-white font-medium mb-2 flex items-center gap-2">Global Defense <ArrowRight className="w-4 h-4 text-[#444]" /></div>
                            <p className="text-[#666] text-sm">DDoS mitigation and WAF built into every deployment.</p>
                         </div>
                         <div>
                            <div className="text-white font-medium mb-2 flex items-center gap-2">Granular Control <ArrowRight className="w-4 h-4 text-[#444]" /></div>
                            <p className="text-[#666] text-sm">Role-based access control and strict audit logs.</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* ENTERPRISE STICKY SECTION                  */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   {/* Left Sticky Column */}
                   <div className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-white/[0.1]">
                      <div className="lg:sticky lg:top-32 h-auto p-12 md:p-20 flex flex-col justify-start">
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-white">
                            Introducing the latest Enterprise tools to power your workflow.
                         </h2>
                         <p className="mt-8 text-[#888] text-lg leading-relaxed max-w-sm">
                            From the way teams collaborate on large codebases, to how apps get rendered—we're excited to announce these upcoming features.
                         </p>
                      </div>
                   </div>

                   {/* Right Scrolling Column */}
                   <div className="lg:col-span-8 flex flex-col">
                      
                      {/* Block 1: Secure Compute */}
                      <div className="p-12 md:p-20 border-b border-white/[0.1] bg-[#000] relative overflow-hidden flex flex-col min-h-[600px]">
                         <div className="flex items-center gap-2 text-[#888] text-xs font-mono tracking-widest mb-4">
                            <Shield className="w-4 h-4" />
                            <span>Secure Compute</span>
                         </div>
                         <h3 className="text-2xl font-medium text-[#888] tracking-tight mb-16 max-w-lg leading-relaxed">
                            <strong className="font-bold text-white">Limit your exposure.</strong> Your internal APIs and databases are secure from the public internet. Builds and runtime traffic are funnelled through fully dedicated IP addresses.
                         </h3>
                         
                          {/* Diagram Mockup */}
                          <div className="w-full max-w-2xl mx-auto flex items-center justify-center relative mt-auto border border-white/10 rounded-xl p-8 bg-[#050505] shadow-2xl overflow-hidden">
                             <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                             <div className="relative z-10 w-full flex items-center justify-center gap-0">
                                {/* Left Side */}
                                <div className="flex items-center gap-4 shrink-0">
                                   <div className="bg-[#111] border border-white/10 rounded-md px-4 py-2 flex items-center gap-3">
                                      <span className="text-[#888] font-black tracking-widest leading-none">...</span>
                                      <span className="text-emerald-400 font-mono text-sm">~ git push</span>
                                   </div>
                                   <div className="w-8 border-t border-dashed border-[#444]" />
                                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20 shrink-0">
                                      <span className="text-black font-black text-xl">▲</span>
                                   </div>
                                </div>

                                {/* Branching SVG Paths (Fixed size) */}
                                <div className="relative w-[150px] h-[160px] shrink-0 pointer-events-none">
                                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 150 160">
                                      <path d="M 0 80 C 50 80, 50 20, 150 20" stroke="#E24329" strokeWidth="2" fill="none" />
                                      <path d="M 0 80 C 50 80, 50 80, 150 80" stroke="#10b981" strokeWidth="2" fill="none" />
                                      <path d="M 0 80 C 50 80, 50 140, 150 140" stroke="#3b82f6" strokeWidth="2" fill="none" />
                                   </svg>
                                </div>

                                {/* Output Nodes */}
                                <div className="flex flex-col justify-between h-[160px] z-20 shrink-0">
                                   <div className="w-10 h-10 rounded-md border border-[#444] bg-black flex items-center justify-center relative">
                                      <div className="absolute -left-3 w-6 h-6 bg-black flex items-center justify-center"><div className="w-3 h-3 rounded-sm border border-[#888] flex items-center justify-center"><div className="w-1 h-1 bg-[#888] rounded-full" /></div></div>
                                      <Monitor className="w-4 h-4 text-white" />
                                   </div>
                                   <div className="w-10 h-10 rounded-md border border-[#444] bg-black flex items-center justify-center relative">
                                      <div className="absolute -left-3 w-6 h-6 bg-black flex items-center justify-center"><div className="w-3 h-3 rounded-sm border border-[#888] flex items-center justify-center"><div className="w-1 h-1 bg-[#888] rounded-full" /></div></div>
                                      <Smartphone className="w-4 h-4 text-white" />
                                   </div>
                                   <div className="w-10 h-10 rounded-md border border-[#444] bg-black flex items-center justify-center relative">
                                      <div className="absolute -left-3 w-6 h-6 bg-black flex items-center justify-center"><div className="w-3 h-3 rounded-sm border border-[#888] flex items-center justify-center"><div className="w-1 h-1 bg-[#888] rounded-full" /></div></div>
                                      <Database className="w-4 h-4 text-white" />
                                   </div>
                                </div>
                             </div>
                          </div>
                      </div>

                      {/* Block 2: Rolling Release */}
                      <div className="p-12 md:p-20 border-b lg:border-b-0 border-white/[0.1] bg-[#000] flex flex-col min-h-[600px]">
                         <div className="flex items-center gap-2 text-[#888] text-xs font-mono tracking-widest mb-4">
                            <ArrowUpCircle className="w-4 h-4" />
                            <span>Rolling Release</span>
                         </div>
                         <h3 className="text-2xl font-medium text-[#888] tracking-tight mb-16 max-w-lg leading-relaxed">
                            <strong className="font-bold text-white">Manage the rollout.</strong> Minimize the risk by shipping to a fraction of users and monitoring performance before completing the rollout.
                         </h3>
                         
                         {/* Dashboard UI Mockup */}
                         <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden mt-auto">
                            <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
                               <div className="flex items-center justify-between mb-4">
                                  <span className="text-white font-medium text-sm">Canary: 25% of traffic</span>
                                  <span className="text-[#888] text-xs">Next stage in 10m</span>
                               </div>
                               <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                                  <div className="w-1/4 h-full bg-blue-500 rounded-full" />
                               </div>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-white/10 p-6">
                               <div className="pr-6">
                                  <div className="text-xs text-[#888] mb-4 uppercase tracking-widest font-mono">Canary: 25%</div>
                                  <div className="flex items-start gap-3">
                                     <GitCommit className="w-4 h-4 text-[#666] mt-0.5" />
                                     <div>
                                        <div className="text-white text-sm font-medium">b4c6756 Implement added & removed lin...</div>
                                        <div className="text-[#666] text-xs mt-1 font-mono">@ 8yoR9yx2o 10s ago by <span className="text-white">mitulshah</span></div>
                                     </div>
                                  </div>
                               </div>
                               <div className="pl-6">
                                  <div className="text-xs text-[#888] mb-4 uppercase tracking-widest font-mono">Current: 75%</div>
                                  <div className="flex items-start gap-3">
                                     <GitCommit className="w-4 h-4 text-[#666] mt-0.5" />
                                     <div>
                                        <div className="text-white text-sm font-medium">DdovX6kd7 Make Promotion Requiremen...</div>
                                        <div className="text-[#666] text-xs mt-1 font-mono">@ 6zjvumm6p 2h ago by <span className="text-white">codybrouwers</span></div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

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
