import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, CornerDownLeft, GitBranch, GitCommit, Search, Lock, Smartphone, Monitor, Terminal, ArrowUpRight } from 'lucide-react';
import { SiNextdotjs, SiReact, SiNuxt, SiSvelte, SiAstro, SiVite } from 'react-icons/si';

export function Features() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black font-sans font-normal antialiased">
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto border-x border-white/[0.1]">
        
        {/* ───────────────── SECTION 1: AI APPS ───────────────── */}
        <section className="flex flex-col border-b border-white/[0.1]">
           <div className="py-24 md:py-32 flex flex-col items-center text-center px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                 CollabCode is the Home of AI Apps.
              </h1>
              <p className="text-[#888] text-lg md:text-xl max-w-2xl leading-relaxed">
                 When cutting-edge AI development requires more than just a platform, CollabCode stands out, delivering unprecedented tools and performance.
              </p>
           </div>

           {/* Grid of 2 AI Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.1]">
              
              {/* Card 1: Chatbot */}
              <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/[0.1] flex flex-col group cursor-pointer hover:bg-white/[0.02] transition-colors">
                 <div className="h-[250px] w-full border border-white/[0.1] rounded-lg bg-[#0a0a0a] flex flex-col p-6 mb-8 relative overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]">
                    <div className="flex-1 space-y-4">
                       <div className="flex items-start gap-3 w-4/5">
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black shrink-0"><User className="w-4 h-4 text-[#888]" /></div>
                          <div className="flex-1 rounded-2xl rounded-tl-none border border-white/10 bg-[#111] p-3 text-xs text-[#888]">
                             Can you help me write a custom React hook to fetch data?
                          </div>
                       </div>
                       <div className="flex items-start gap-3 w-4/5 ml-auto flex-row-reverse">
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black shrink-0"><Bot className="w-4 h-4 text-white" /></div>
                          <div className="flex-1 rounded-2xl rounded-tr-none border border-white/10 bg-[#1a1a1a] p-3 text-xs text-white">
                             Absolutely! Here is a secure `useData` hook utilizing SWR for automatic revalidation.
                          </div>
                       </div>
                    </div>
                    <div className="h-10 mt-4 rounded-full border border-white/10 bg-black flex items-center px-4 justify-between">
                       <span className="text-[#444] text-sm">Ask anything...</span>
                       <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center"><CornerDownLeft className="w-3 h-3 text-[#888]" /></div>
                    </div>
                 </div>
                 <h3 className="text-xl font-bold mb-2 tracking-tight">Next.js AI Chatbot</h3>
                 <p className="text-[#888] text-sm leading-relaxed mb-6">A full-featured, hackable Next.js AI chatbot built by CollabCode Labs. This template ships with AI SDK 3.0.</p>
              </div>

              {/* Card 2: Postgres pgvector */}
              <div className="p-10 md:p-14 flex flex-col group cursor-pointer hover:bg-white/[0.02] transition-colors">
                 <div className="h-[250px] w-full border border-white/[0.1] rounded-lg bg-[#0a0a0a] flex flex-col items-center justify-center p-6 mb-8 relative overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]">
                    <div className="w-3/4 max-w-sm rounded-xl border border-white/10 bg-black shadow-2xl p-2">
                       <div className="h-10 rounded-lg border border-white/5 bg-[#111] flex items-center px-3 gap-3 mb-2">
                          <Search className="w-4 h-4 text-[#888]" />
                          <span className="text-sm text-white">electric</span>
                       </div>
                       <div className="px-3 py-2 border border-white/5 bg-[#1a1a1a] rounded-lg flex justify-between items-center mb-1">
                          <span className="text-sm">Electabuzz</span>
                          <span className="text-xs text-[#888] font-mono">0.843</span>
                       </div>
                       <div className="px-3 py-2 flex justify-between items-center mb-1">
                          <span className="text-sm text-[#888]">Electrode</span>
                          <span className="text-xs text-[#444] font-mono">0.838</span>
                       </div>
                       <div className="px-3 py-2 flex justify-between items-center">
                          <span className="text-sm text-[#888]">Magneton</span>
                          <span className="text-xs text-[#444] font-mono">0.818</span>
                       </div>
                    </div>
                 </div>
                 <h3 className="text-xl font-bold mb-2 tracking-tight">Postgres pgvector Starter</h3>
                 <p className="text-[#888] text-sm leading-relaxed mb-6">A Next.js template that uses CollabCode Postgres as the database, pgvector for vector similarity search.</p>
              </div>

           </div>
        </section>

        {/* ───────────────── SECTION 2: ENTERPRISE TOOLS ───────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] border-b border-white/[0.1]">
           {/* Left Col */}
           <div className="p-12 md:p-16 lg:border-r border-white/[0.1] border-b lg:border-b-0 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
                 Introducing the latest Enterprise tools to power your workflow.
              </h2>
              <p className="text-[#888] text-lg leading-relaxed">
                 From the way teams collaborate on large codebases, to how apps get rendered—we're excited to announce these upcoming features.
              </p>
           </div>
           
           {/* Right Col */}
           <div className="flex flex-col">
              {/* Secure Compute */}
              <div className="p-10 md:p-16 border-b border-white/[0.1]">
                 <div className="flex items-center gap-2 text-[#888] text-sm mb-4">
                    <Lock className="w-4 h-4" /> Secure Compute
                 </div>
                 <h3 className="text-xl leading-relaxed mb-10">
                    <strong className="text-white">Limit your exposure.</strong> <span className="text-[#888]">Your internal APIs and databases are secure from the public internet. Builds and runtime traffic are funnelled through fully dedicated IP addresses.</span>
                 </h3>
                 
                 {/* Git Push to IPs Diagram */}
                 <div className="relative w-full h-[200px] border border-white/[0.1] rounded-xl bg-[#0a0a0a] flex items-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    
                    <div className="absolute z-10 left-[40px] top-[80px] flex items-center gap-2 border border-white/10 bg-black rounded-lg px-4 py-2 shadow-xl">
                       <GitBranch className="w-4 h-4 text-[#888]" />
                       <span className="text-sm font-mono text-[#888]">~ git push</span>
                    </div>

                    {/* SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                       <motion.path d="M 180 100 L 280 100" stroke="#444" strokeWidth="1" strokeDasharray="4 4" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
                       <motion.path d="M 320 100 C 380 100, 360 40, 460 40" stroke="#ef4444" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} />
                       <motion.path d="M 320 100 C 380 100, 360 100, 460 100" stroke="#10b981" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} />
                       <motion.path d="M 320 100 C 380 100, 360 160, 460 160" stroke="#3b82f6" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }} />
                    </svg>

                    <div className="absolute z-10 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold left-[280px] top-[80px] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                       Δ
                    </div>

                    <div className="absolute z-10 flex items-center gap-6 left-[465px] top-[24px]">
                          <Lock className="w-4 h-4 text-[#888]" />
                          <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center shadow-lg"><Monitor className="w-4 h-4 text-white" /></div>
                    </div>
                    <div className="absolute z-10 flex items-center gap-6 left-[465px] top-[84px]">
                          <Lock className="w-4 h-4 text-[#888]" />
                          <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center shadow-lg"><Smartphone className="w-4 h-4 text-white" /></div>
                    </div>
                    <div className="absolute z-10 flex items-center gap-6 left-[465px] top-[144px]">
                          <Lock className="w-4 h-4 text-[#888]" />
                          <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center shadow-lg"><Terminal className="w-4 h-4 text-white" /></div>
                    </div>
                 </div>
              </div>

              {/* Rolling Release */}
              <div className="p-10 md:p-16">
                 <div className="flex items-center gap-2 text-[#888] text-sm mb-4">
                    <GitBranch className="w-4 h-4" /> Rolling Release
                 </div>
                 <h3 className="text-xl leading-relaxed mb-10">
                    <strong className="text-white">Manage the rollout.</strong> <span className="text-[#888]">Minimize the risk by shipping to a fraction of users and monitoring performance before completing the rollout.</span>
                 </h3>
                 
                 {/* Canary Progress UI */}
                 <div className="w-full border border-white/[0.1] rounded-xl bg-[#0a0a0a] p-6 shadow-2xl">
                    <div className="flex justify-between items-end mb-4">
                       <span className="text-white font-medium text-sm">Canary: 25% of traffic</span>
                       <span className="text-[#888] text-xs">Next stage in 10m</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden mb-8 flex gap-1">
                       <div className="h-full bg-blue-500 w-[25%] rounded-full" />
                       <div className="h-full bg-[#333] w-[10%] rounded-full" />
                       <div className="h-full bg-[#333] w-[15%] rounded-full" />
                       <div className="h-full bg-[#333] w-[50%] rounded-full" />
                    </div>
                    {/* Commits */}
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <div className="text-xs text-[#888] mb-2 font-mono">Canary: 25%</div>
                          <div className="text-xs text-white flex items-center gap-2 mb-1"><GitCommit className="w-3 h-3 text-[#666]" /> b4c6756 <span className="text-[#888] truncate">Implement added & removed lin...</span></div>
                          <div className="text-xs text-[#666] ml-5 flex items-center gap-2">@ 8yoR9yx2o 10s ago by <div className="w-4 h-4 rounded-full bg-purple-500" /> mitulshah</div>
                       </div>
                       <div>
                          <div className="text-xs text-[#888] mb-2 font-mono">Current: 75%</div>
                          <div className="text-xs text-white flex items-center gap-2 mb-1"><GitCommit className="w-3 h-3 text-[#666]" /> DdoVx6kd7 <span className="text-[#888] truncate">Make Promotion Requiremen...</span></div>
                          <div className="text-xs text-[#666] ml-5 flex items-center gap-2">@ 6zjvumm8p 2h ago by <div className="w-4 h-4 rounded-full bg-orange-500" /> codybrouwers</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ───────────────── SECTION 3: OPTIMIZED RENDERING ───────────────── */}
        <section className="border-b border-white/[0.1] py-24 md:py-32 flex flex-col items-center">
           <div className="text-center px-6 max-w-3xl mb-24">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
                 Optimized, automated rendering for the web's favorite frameworks.
              </h2>
              <p className="text-[#888] text-lg leading-relaxed">
                 Leverage the power of serverless architecture to deliver your content globally, without added infrastructure overhead.
              </p>
           </div>

           {/* The Massive Framework Connection Diagram */}
           <div className="relative w-full max-w-4xl h-[400px]">
              {/* Framework Nodes */}
              <div className="absolute top-0 left-0 right-0 flex justify-between px-10">
                 {/* Next.js */}
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <SiNextdotjs className="w-6 h-6 text-white" />
                 </div>
                 {/* React */}
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <SiReact className="w-6 h-6 text-[#61DAFB]" />
                 </div>
                 {/* Nuxt */}
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <SiNuxt className="w-6 h-6 text-[#00DC82]" />
                 </div>
                 {/* Svelte */}
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                    <SiSvelte className="w-6 h-6 text-[#FF3E00]" />
                 </div>
                 {/* Astro */}
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
                    <SiAstro className="w-6 h-6 text-[#FF5D01]" />
                 </div>
                 {/* Vite */}
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                    <SiVite className="w-6 h-6 text-[#646CFF]" />
                 </div>
              </div>

              {/* Connecting Bezier Curves */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                 <motion.path d="M 60 48 C 60 180, 448 150, 448 250" stroke="#888" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} />
                 <motion.path d="M 215 48 C 215 180, 448 160, 448 250" stroke="#3b82f6" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }} />
                 <motion.path d="M 370 48 C 370 180, 448 170, 448 250" stroke="#10b981" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} />
                 <motion.path d="M 525 48 C 525 180, 448 180, 448 250" stroke="#ef4444" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }} />
                 <motion.path d="M 680 48 C 680 180, 448 190, 448 250" stroke="#ec4899" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} />
                 <motion.path d="M 835 48 C 835 180, 448 200, 448 250" stroke="#eab308" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }} />
                 
                 {/* Vertical line going down from Deploy pill */}
                 <motion.path d="M 448 300 L 448 500" stroke="#888" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} />
              </svg>

              {/* Deployed Pill */}
              <div className="absolute top-[250px] left-1/2 -translate-x-1/2 z-10">
                 <div className="bg-white text-black font-bold tracking-tight px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    ▲ Deployed.
                 </div>
              </div>
           </div>
        </section>

        {/* ───────────────── SECTION 4: COLLABORATION ───────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/[0.1]">
           {/* Left Col */}
           <div className="p-12 md:p-24 lg:border-r border-white/[0.1] border-b lg:border-b-0 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#888] text-sm mb-6"><GitBranch className="w-4 h-4" /> Collaboration</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
                 Faster iteration.<br/>More innovation.
              </h2>
              <p className="text-[#888] text-lg leading-relaxed">
                 The platform for rapid progress. Let your team focus on shipping features instead of managing infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
              </p>
           </div>

           {/* Right Col */}
           <div className="p-12 md:p-24 flex flex-col justify-center">
              <h3 className="text-xl leading-relaxed mb-10">
                 <strong className="text-white">Get to production faster.</strong> <span className="text-[#888]">Zero-config pre-production environments, integrating with your git workflow, with builds in minutes.</span>
              </h3>

              {/* Classic Deployment List Mockup */}
              <div className="w-full rounded-xl border border-white/[0.1] bg-[#050505] overflow-hidden shadow-2xl">
                 {/* Item 1 */}
                 <div className="flex items-center justify-between p-5 border-b border-white/[0.05] hover:bg-white/[0.02] cursor-pointer">
                    <div>
                       <div className="text-white text-sm font-mono mb-1">site-m55uez56h.collab.sh</div>
                       <div className="text-[#888] text-xs">Production</div>
                    </div>
                    <div className="text-xs">
                       <div className="flex items-center gap-2 mb-1"><span className="text-emerald-400">●</span> Ready</div>
                       <div className="text-[#888]">3m 16s</div>
                    </div>
                    <div className="text-xs text-[#888] font-mono">
                       <div className="flex items-center gap-2 mb-1"><GitBranch className="w-3 h-3" /> main</div>
                       <div className="flex items-center gap-2"><GitCommit className="w-3 h-3" /> 8128e41</div>
                    </div>
                 </div>
                 {/* Item 2 */}
                 <div className="flex items-center justify-between p-5 border-b border-white/[0.05] hover:bg-white/[0.02] cursor-pointer">
                    <div>
                       <div className="text-white text-sm font-mono mb-1">site-8raxf8ltz.collab.sh</div>
                       <div className="text-[#888] text-xs">Preview</div>
                    </div>
                    <div className="text-xs">
                       <div className="flex items-center gap-2 mb-1"><span className="text-orange-400">●</span> Building</div>
                       <div className="text-[#888]">2m 4s</div>
                    </div>
                    <div className="text-xs text-[#888] font-mono">
                       <div className="flex items-center gap-2 mb-1"><GitBranch className="w-3 h-3" /> new-slider</div>
                       <div className="flex items-center gap-2"><GitCommit className="w-3 h-3" /> 3439a08</div>
                    </div>
                 </div>
                 {/* Item 3 */}
                 <div className="flex items-center justify-between p-5 hover:bg-white/[0.02] cursor-pointer opacity-50">
                    <div>
                       <div className="text-white text-sm font-mono mb-1">site-7l20rftx5.collab.sh</div>
                       <div className="text-[#888] text-xs">Production</div>
                    </div>
                    <div className="text-xs">
                       <div className="flex items-center gap-2 mb-1"><span className="text-[#666]">●</span> Queued</div>
                       <div className="text-[#888]">Waiting</div>
                    </div>
                    <div className="text-xs text-[#888] font-mono">
                       <div className="flex items-center gap-2 mb-1"><GitBranch className="w-3 h-3" /> homepage</div>
                       <div className="flex items-center gap-2"><GitCommit className="w-3 h-3" /> 1c2cbd9</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ───────────────── Linear-Style Giant CTA Blocks ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
          {/* Block 1 (Cyan) */}
          <div className="h-[600px] lg:border-r border-b lg:border-b-0 border-white/[0.1] bg-[#22d3ee] p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden group">
             <div className="text-black text-5xl font-black italic tracking-tighter mix-blend-overlay opacity-30">SDK</div>
             
             {/* Decorative code block */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-sm rounded-xl bg-black/5 backdrop-blur-xl border border-black/10 p-6 transform group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                <div className="text-black/60 font-mono text-sm mb-4">terminal</div>
                <div className="text-black font-mono text-sm leading-relaxed">
                  npm install @collabcode/cli<br/><br/>
                  collab init --framework next
                </div>
             </div>

             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Developer First</h3>
                <p className="text-black/70 max-w-sm font-medium">Build, test, and deploy using our powerful CLI and native SDKs designed for modern workflows.</p>
             </div>
          </div>

          {/* Block 2 (Soft Purple) */}
          <div className="h-[600px] bg-[#c4b5fd] p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden">
             <div className="absolute -right-20 -top-20 opacity-5 text-black">
               <Terminal className="w-96 h-96" />
             </div>
             
             <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-md mt-12 relative z-10">
               "The infrastructure practically manages itself. Our shipping velocity doubled."
             </h3>

             <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                   <User className="w-5 h-5" />
                </div>
                <div>
                   <div className="font-bold text-lg">Sarah Jenkins</div>
                   <div className="text-[#0a0a0a]/70 font-medium">CTO, TechFlow</div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}
