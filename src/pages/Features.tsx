import React from 'react';
import { motion } from 'motion/react';
import {
  Terminal, ShieldCheck, ChevronRight, Zap, Globe, Cpu, Database, Activity, Code, Server, Github, BarChart3, LineChart, Plus, ArrowRight, MessageSquare, ExternalLink, Play, Cloud, Check, GitBranch, GitCommit, Eye, Settings, Share2, Menu, MessageCircle, Image
} from 'lucide-react';

// Reusable Crosshair component
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Features() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black">
      
      <div className="relative z-10 flex flex-col w-full">
         
          {/* ═══════════════════════════════════════════════ */}
          {/* HERO SECTION                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="bg-black pt-32 pb-20 relative">
             <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                   <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-white leading-[1.05] max-w-3xl">
                      The complete platform to build the web.
                   </h1>
                   <div className="flex flex-col gap-8 max-w-sm lg:pb-4">
                      <p className="text-[#a1a1aa] text-lg leading-relaxed">
                         Your team's toolkit to stop configuring and start innovating. Securely build, deploy, and scale the best web experiences with Collab Code.
                      </p>
                      <div className="flex items-center gap-4">
                         <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                            Get a demo
                         </button>
                         <button className="px-6 py-3 border border-white/[0.2] text-white rounded-full text-sm font-medium hover:bg-white/[0.05] transition-colors">
                            Explore the Product
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* GRID ARCHITECTURE CONTAINER                     */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="bg-black border-t border-white/[0.1] relative mt-10">
             <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative">

                {/* ─── LOGO STRIP ─── */}
                <div className="flex flex-col relative border-b border-white/[0.1] py-16">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   <p className="text-center text-sm text-[#888] font-medium mb-12">Trusted by the best enterprise teams</p>
                   <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 px-10 opacity-70">
                      <span className="text-xl font-bold font-serif tracking-tighter flex items-center gap-2"><Cloud className="w-6 h-6"/> The Weather Company</span>
                      <span className="text-xl font-black tracking-tight flex items-center gap-1"><Database className="w-5 h-5"/> databricks</span>
                      <span className="text-2xl font-serif italic">Johnson & Johnson</span>
                      <span className="text-xl font-bold tracking-tighter">Mercado Libre</span>
                      <span className="text-2xl font-serif">Callaway</span>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 1: DEPLOY                          */}
                {/* 2-col: Left heading, Right timeline + bot  */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Massive Heading */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center min-h-[600px]">
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] max-w-[400px]">
                         Zero-config to deploy. Instantly share your work.
                      </h2>
                   </div>

                   {/* Right Col: Timeline & Bot UI */}
                   <div className="relative p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      {/* The Timeline Line */}
                      <div className="absolute left-16 md:left-24 lg:left-32 top-0 bottom-0 w-px bg-gradient-to-b from-[#e24329] to-[#ff0080]" />

                      {/* Timeline Node 1: Develop */}
                      <div className="relative z-10 flex items-start gap-8 mb-24">
                         <div className="absolute -left-[5px] top-1 flex flex-col gap-2 bg-black py-2">
                            <div className="w-3 h-3 rounded-full border border-blue-500 bg-black flex items-center justify-center"><div className="w-1 h-1 bg-blue-500 rounded-full"/></div>
                            <div className="w-3 h-3 rounded border border-orange-500 bg-black flex items-center justify-center"><div className="w-1 h-1 bg-orange-500"/></div>
                            <div className="w-3 h-3 rounded-full border border-[#e24329] bg-[#e24329] flex items-center justify-center"><Play className="w-1.5 h-1.5 text-white ml-[1px]"/></div>
                         </div>
                         <div className="pl-6">
                            <h3 className="text-xl font-medium text-white mb-2">Develop.</h3>
                            <p className="text-[#a1a1aa] leading-relaxed">
                               GitHub, Bitbucket, GitLab, Azure DevOps or our CLI.
                            </p>
                         </div>
                      </div>

                      {/* Timeline Node 2: Push to preview + Bot Mockup */}
                      <div className="relative z-10 flex items-start gap-8">
                         <div className="absolute -left-[4.5px] top-2 w-[10px] h-[10px] rounded-full border-[2px] border-[#ff0080] bg-black" />
                         <div className="pl-6 w-full">
                            <h3 className="text-xl font-medium text-white mb-2">Push to preview.</h3>
                            <p className="text-[#a1a1aa] leading-relaxed mb-8">
                               Setting up staging shouldn't be a separate step. With Collab Code's DX Platform, every PR gets its own, fully-functional, evergreen environment.
                            </p>

                            {/* The Bot UI Mockup */}
                            <div className="w-full rounded-xl border border-white/[0.1] bg-[#050505] p-5 shadow-2xl">
                               <div className="flex items-center gap-2 mb-6">
                                  <div className="px-2 py-0.5 rounded border border-white/[0.1] text-xs font-medium text-white bg-white/[0.05]">collab-bot</div>
                                  <span className="text-[#888] text-xs">commented just now</span>
                               </div>
                               <p className="text-sm text-white mb-4">
                                  <strong>The latest updates on your project.</strong> <a href="#" className="text-blue-400 hover:underline">Learn more about Deployments ↗</a>
                               </p>
                               
                               <div className="w-full rounded-lg border border-white/[0.1] overflow-hidden">
                                  <table className="w-full text-left text-sm">
                                     <thead className="bg-[#0a0a0a] border-b border-white/[0.1] text-[#888]">
                                        <tr>
                                           <th className="font-normal px-4 py-3">Name</th>
                                           <th className="font-normal px-4 py-3">Status</th>
                                           <th className="font-normal px-4 py-3">Preview</th>
                                           <th className="font-normal px-4 py-3">Comments</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-white/[0.1] text-white">
                                        <tr className="hover:bg-white/[0.02]">
                                           <td className="px-4 py-3 font-mono text-[13px]">app</td>
                                           <td className="px-4 py-3 text-[#a1a1aa]"><span className="text-emerald-400">● Ready</span> <span className="text-[#666] hover:text-white cursor-pointer transition-colors">(Inspect)</span></td>
                                           <td className="px-4 py-3 text-blue-400 hover:underline cursor-pointer">Visit Preview</td>
                                           <td className="px-4 py-3 text-emerald-400 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> 3 Resolved</td>
                                        </tr>
                                        <tr className="hover:bg-white/[0.02]">
                                           <td className="px-4 py-3 font-mono text-[13px]">site</td>
                                           <td className="px-4 py-3 text-[#a1a1aa]"><span className="text-emerald-400">● Ready</span> <span className="text-[#666] hover:text-white cursor-pointer transition-colors">(Inspect)</span></td>
                                           <td className="px-4 py-3 text-blue-400 hover:underline cursor-pointer">Visit Preview</td>
                                           <td className="px-4 py-3 text-[#888] flex items-center gap-1 hover:text-white cursor-pointer transition-colors"><MessageSquare className="w-3.5 h-3.5"/> Comment</td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 2: ITERATE                         */}
                {/* 2-col: Left testimonial, Right commit list */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Testimonial */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      <p className="text-2xl md:text-3xl font-medium text-white leading-snug mb-10 tracking-tight">
                         <span className="text-[#666]">"</span> This has completely changed our workflow, we're able to ship more confidently with Collab Code.<span className="text-[#666]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <span className="text-2xl font-black tracking-[0.15em] text-white uppercase">SONOS</span>
                         <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors cursor-pointer">
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                         </div>
                      </div>
                   </div>

                   {/* Right Col: "Keep pushing forward" + Commit List */}
                   <div className="p-16 md:p-24 lg:p-32 flex flex-col justify-center relative">
                      <div className="absolute left-16 md:left-24 lg:left-32 top-0 bottom-0 w-px bg-gradient-to-b from-[#a855f7] to-transparent" />
                      
                      <div className="relative z-10">
                         <div className="absolute -left-[4.5px] top-2 w-[10px] h-[10px] rounded-full border-[2px] border-[#a855f7] bg-black" />
                         <div className="pl-6">
                            <h3 className="text-xl font-medium text-white mb-3">
                               <strong>Keep pushing forward.</strong> <span className="text-[#a1a1aa] font-normal">When builds are fast and rollbacks are instant, every developer can ship small, iterative changes that keeps the team moving forward.</span>
                            </h3>
                         </div>
                      </div>

                      {/* Commit List Mockup */}
                      <div className="mt-12 w-full rounded-xl border border-white/[0.1] bg-[#050505] overflow-hidden shadow-2xl">
                         {/* Commit 1 */}
                         <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-emerald-500" />
                               <div>
                                  <div className="text-white text-sm font-medium">Migrate core pages to App Router</div>
                                  <div className="text-[#666] text-xs font-mono mt-0.5 flex items-center gap-2">
                                     <GitBranch className="w-3 h-3" /> rf/app-router
                                     <span className="text-[#444]">·</span>
                                     2m ago
                                     <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 ml-1" />
                                     <span>rauno</span>
                                  </div>
                               </div>
                            </div>
                            <span className="text-[#666] text-xs hover:text-white cursor-pointer transition-colors">Comment</span>
                         </div>
                         {/* Commit 2 */}
                         <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-orange-500" />
                               <div>
                                  <div className="text-white text-sm font-medium">Add banner to conf website</div>
                                  <div className="text-[#666] text-xs font-mono mt-0.5 flex items-center gap-2">
                                     <GitBranch className="w-3 h-3" /> 21342-banner
                                     <span className="text-[#444]">·</span>
                                     2h ago
                                     <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 ml-1" />
                                     <span>timo</span>
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="flex -space-x-1">
                                  <div className="w-4 h-4 rounded-full bg-blue-500 border border-black" />
                                  <div className="w-4 h-4 rounded-full bg-pink-500 border border-black" />
                               </div>
                               <span className="text-[#888] text-xs">4/5 Resolved</span>
                               <Check className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                         </div>
                         {/* Commit 3 */}
                         <div className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-emerald-500" />
                               <div>
                                  <div className="text-white text-sm font-medium">Remove release takeover</div>
                                  <div className="text-[#666] text-xs font-mono mt-0.5 flex items-center gap-2">
                                     <GitBranch className="w-3 h-3" /> ff/new-flag
                                     <span className="text-[#444]">·</span>
                                     1d ago
                                     <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 ml-1" />
                                     <span>mrnest</span>
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="flex -space-x-1">
                                  <div className="w-4 h-4 rounded-full bg-emerald-500 border border-black" />
                                  <div className="w-4 h-4 rounded-full bg-purple-500 border border-black" />
                               </div>
                               <span className="text-[#888] text-xs">5/5 Resolved</span>
                               <Check className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* THE TOOLBAR                                */}
                {/* Centered floating pill with icons          */}
                {/* ═══════════════════════════════════════════ */}
                <div className="flex flex-col items-center relative border-b border-white/[0.1] py-24 px-6">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Floating Toolbar Pill */}
                   <div className="flex items-center gap-1 bg-[#1a1a1a] border border-white/[0.15] rounded-full px-3 py-2.5 shadow-[0_0_60px_-10px_rgba(255,255,255,0.1)] mb-10">
                      <button className="w-9 h-9 rounded-full hover:bg-white/[0.1] flex items-center justify-center transition-colors text-[#888] hover:text-white"><MessageCircle className="w-4 h-4" /></button>
                      <button className="w-9 h-9 rounded-full hover:bg-white/[0.1] flex items-center justify-center transition-colors text-[#888] hover:text-white"><Image className="w-4 h-4" /></button>
                      <button className="w-9 h-9 rounded-full hover:bg-white/[0.1] flex items-center justify-center transition-colors text-[#888] hover:text-white"><Eye className="w-4 h-4" /></button>
                      <button className="w-9 h-9 rounded-full hover:bg-white/[0.1] flex items-center justify-center transition-colors text-[#888] hover:text-white"><Settings className="w-4 h-4" /></button>
                      {/* Avatar group */}
                      <div className="flex -space-x-1.5 mx-2">
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-[#1a1a1a]" />
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 border-2 border-[#1a1a1a]" />
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 border-2 border-[#1a1a1a]" />
                      </div>
                      <button className="w-9 h-9 rounded-full hover:bg-white/[0.1] flex items-center justify-center transition-colors text-[#888] hover:text-white"><Share2 className="w-4 h-4" /></button>
                      <button className="w-9 h-9 rounded-full hover:bg-white/[0.1] flex items-center justify-center transition-colors text-[#888] hover:text-white"><Menu className="w-4 h-4" /></button>
                   </div>

                   <h3 className="text-xl md:text-2xl text-center max-w-xl tracking-tight">
                      <strong className="text-white">The Collab Code Toolbar.</strong>{' '}
                      <span className="text-[#a1a1aa]">A toolbox for iteration. Your command center, wherever you work.</span>
                   </h3>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 3: COLLABORATION                   */}
                {/* 2-col: Left heading+text, Right deploy list*/}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Category + Heading + Text */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-[#888] text-sm mb-6">
                         <Zap className="w-4 h-4" />
                         <span>Collaboration</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] mb-6">
                         Faster iteration. More innovation.
                      </h2>
                      <p className="text-[#a1a1aa] text-lg leading-relaxed">
                         The platform for rapid progress. Let your team focus on shipping features instead of managing infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
                      </p>
                   </div>

                   {/* Right Col: Deployment List Mockup */}
                   <div className="p-16 md:p-24 flex flex-col justify-center">
                      {/* "Get to production faster" text block */}
                      <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                         <strong>Get to production faster.</strong>{' '}
                         <span className="text-[#a1a1aa] font-normal">Zero-config pre-production environments, integrating with your git workflow, with builds in minutes.</span>
                      </h3>

                      {/* Deployment List */}
                      <div className="mt-10 w-full rounded-xl border border-white/[0.1] bg-[#050505] overflow-hidden shadow-2xl">
                         {/* Deploy 1 - Production */}
                         <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                            <div>
                               <div className="text-white text-sm font-mono">site-m55uez56h.collabcode.sh</div>
                               <div className="text-[#666] text-xs mt-0.5">Production</div>
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                               <span className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> <span className="text-white">Ready</span><br/></span>
                               <span className="text-[#666]">3m 16s</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[#666] font-mono">
                               <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> main</span>
                               <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" /> 812be41</span>
                            </div>
                         </div>
                         {/* Deploy 2 - Preview */}
                         <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                            <div>
                               <div className="text-white text-sm font-mono">site-8raxf9ltz.collabcode.sh</div>
                               <div className="text-[#666] text-xs mt-0.5">Preview</div>
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                               <span className="flex items-center gap-1.5"><span className="text-orange-400">●</span> <span className="text-white">Building</span></span>
                               <span className="text-[#666]">2m 4s</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[#666] font-mono">
                               <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> new-slider</span>
                               <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" /> 3439a08</span>
                            </div>
                         </div>
                         {/* Deploy 3 - Queued */}
                         <div className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors opacity-50">
                            <div>
                               <div className="text-white text-sm font-mono">site-7l20rftx5.collabcode.sh</div>
                               <div className="text-[#666] text-xs mt-0.5">Production</div>
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                               <span className="flex items-center gap-1.5"><span className="text-[#666]">●</span> <span className="text-[#888]">Queued</span></span>
                               <span className="text-[#666]">Waiting</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[#666] font-mono">
                               <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> homepage</span>
                               <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" /> k3ho81l</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* TESTIMONIAL 1 (Washington Post)            */}
                {/* ═══════════════════════════════════════════ */}
                <div className="relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   <div className="p-16 md:p-24 lg:p-32">
                      <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white mb-12 max-w-4xl leading-tight">
                         <span className="text-[#666]">"</span>All of our results pages were developed and deployed on Collab Code, and it was the smoothest election night anyone could remember.<span className="text-[#666]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <div>
                            <div className="text-white font-medium mb-1">Jeremy Bowers, Director of Newsroom Engineering</div>
                            <div className="text-2xl font-serif italic text-[#888]">The Washington Post</div>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-white" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 4: OBSERVABILITY                    */}
                {/* Full-width analytics chart + 3-col features*/}
                {/* ═══════════════════════════════════════════ */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Section header text */}
                   <div className="p-16 md:p-24 lg:p-32 pb-0 md:pb-0 lg:pb-0 border-b border-white/[0.1]">
                      <p className="text-[#a1a1aa] text-lg leading-relaxed max-w-4xl mx-auto text-center">
                         Fully managed infrastructure designed to scale dynamically with your traffic, a global edge to ensure your site is fast for every customer, and the tools to monitor every aspect of your app.
                      </p>
                   </div>

                   {/* The Chart */}
                   <div className="w-full h-[500px] relative overflow-hidden bg-black border-b border-white/[0.1]">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                      
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
                         <defs>
                            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="#000" stopOpacity="0" />
                               <stop offset="100%" stopColor="#000" stopOpacity="1" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                         </defs>

                         <motion.path 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 3, ease: "easeInOut" }}
                           d="M 0 120 L 40 135 L 80 150 L 120 132 L 160 83 L 200 37 L 240 20 L 280 20 L 320 20 L 360 20 L 400 20 L 440 21 L 480 38 L 520 50 L 560 37 L 600 20 L 640 35 L 680 82 L 720 130 L 760 149 L 800 151 L 840 169 L 880 217 L 920 265 L 960 280 L 1000 264 L 1040 250 L 1080 261 L 1120 279 L 1160 268 L 1200 223" 
                           fill="none" stroke="#3b82f6" strokeWidth="2" filter="url(#glow)" 
                         />
                         <motion.path 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                           d="M 0 250 L 40 261 L 80 244 L 120 215 L 160 212 L 200 188 L 240 162 L 280 172 L 320 168 L 360 166 L 400 198 L 440 212 L 480 220 L 520 253 L 560 258 L 600 250 L 640 261 L 680 243 L 720 214 L 760 211 L 800 186 L 840 162 L 880 172 L 920 167 L 960 167 L 1000 199 L 1040 212 L 1080 221 L 1120 254 L 1160 258 L 1200 250" 
                           fill="none" stroke="#10b981" strokeWidth="2" filter="url(#glow)" 
                         />
                         <motion.path 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
                           d="M 0 380 L 40 381 L 80 368 L 120 360 L 160 354 L 200 354 L 240 365 L 280 369 L 320 383 L 360 380 L 400 376 L 440 368 L 480 360 L 520 356 L 560 354 L 600 365 L 640 370 L 680 383 L 720 380 L 760 376 L 800 368 L 840 359 L 880 356 L 920 354 L 960 366 L 1000 370 L 1040 383 L 1080 380 L 1120 376 L 1160 368 L 1200 359" 
                           fill="none" stroke="#ef4444" strokeWidth="2" filter="url(#glow)" 
                         />

                         <rect width="100%" height="100%" fill="url(#fade)" className="opacity-80" />
                      </svg>

                      {/* Technical Badges */}
                      <div className="absolute top-[80px] left-[250px] px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] tracking-widest">MAX</div>
                      <div className="absolute top-[220px] left-[150px] flex items-center px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] gap-2 tracking-widest">
                         WHERE <span className="text-white">cache='hit'</span>
                      </div>
                      <div className="absolute top-[120px] left-[750px] px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] tracking-widest">SUM</div>
                      <div className="absolute top-[160px] left-[800px] flex items-center px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] gap-2 tracking-widest">
                         VISUALIZE <span className="text-white">bandwidth_incoming</span>
                      </div>
                      <div className="absolute top-[250px] left-[750px] px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] tracking-widest">AVG</div>
                      <div className="absolute top-[290px] left-[350px] flex items-center px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] gap-2 tracking-widest">
                         GROUP BY <span className="text-white">source_path</span>
                      </div>
                      <div className="absolute top-[320px] left-[800px] flex items-center px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-[#888] font-mono text-[10px] gap-2 tracking-widest">
                         WHERE <span className="text-white">status {`>`} 500</span>
                      </div>
                   </div>

                   {/* Features Grid below the chart */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative">
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />

                      <div className="col-span-1 border-r border-white/[0.1] p-12 lg:p-16">
                         <h3 className="text-2xl font-medium text-white mb-4 pr-8">Infinite scalability, zero config.</h3>
                         <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                            Enable code to run on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware.
                         </p>
                      </div>
                      <div className="col-span-1 border-r border-white/[0.1] p-12 lg:p-16">
                         <h3 className="text-2xl font-medium text-white mb-4 pr-8">Real-time insights and controls.</h3>
                         <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                            Get granular, first-party, real-user metrics on site performance per deployment, and controls to instantly update or revert.
                         </p>
                      </div>
                      <div className="col-span-1 p-12 lg:p-16">
                         <h3 className="text-2xl font-medium text-white mb-4 pr-8">Efficient compute for high-demand workloads.</h3>
                         <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                            Fluid compute optimizes resources to deliver powerful performance while minimizing waste.
                         </p>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* TESTIMONIAL 2 (Developer quote)            */}
                {/* ═══════════════════════════════════════════ */}
                <div className="relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   <div className="p-16 md:p-24 lg:p-32">
                      <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white mb-12 max-w-4xl leading-tight">
                         <span className="text-[#666]">"</span>Our developers are happier, we get to market faster. Collab Code lets us move with confidence.<span className="text-[#666]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <div>
                            <div className="text-white font-medium mb-1">Sarah Chen, VP of Engineering</div>
                            <div className="text-2xl font-black tracking-[0.1em] text-[#888] uppercase">Stripe</div>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-white" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 5: INFRASTRUCTURE                   */}
                {/* 2-col: Left edge + security, Right console */}
                {/* ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Left Col: Category + Heading + Text */}
                   <div className="lg:border-r border-white/[0.1] p-16 md:p-24 lg:p-32 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-[#888] text-sm mb-6">
                         <Globe className="w-4 h-4" />
                         <span>Infrastructure</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] mb-6">
                         Global by default. Secure at every layer.
                      </h2>
                      <p className="text-[#a1a1aa] text-lg leading-relaxed mb-8">
                         Serve your site from 100+ global edge locations with automatic DDoS mitigation, SSL, and a Web Application Firewall. Enterprise-grade security, zero configuration.
                      </p>
                      <ul className="flex flex-col gap-3">
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> SOC2 Type II Certified</li>
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> Automated SSL/TLS</li>
                         <li className="flex items-center gap-3 text-[#888] text-sm"><Check className="w-4 h-4 text-[#10b981]" /> BGP Anycast Routing</li>
                      </ul>
                   </div>

                   {/* Right Col: Edge Console Mockup */}
                   <div className="p-16 md:p-24 flex items-center justify-center bg-[#050505] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04),transparent_60%)] pointer-events-none" />
                      
                      <div className="w-full max-w-lg bg-black border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                         <div className="p-4 border-b border-white/[0.1] flex items-center justify-between bg-[#0a0a0a]">
                            <h3 className="text-white text-sm font-medium flex items-center gap-2"><Globe className="w-4 h-4" /> Edge Routing</h3>
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                               <span className="text-xs text-[#888]">104 Regions Active</span>
                            </div>
                         </div>
                         
                         <div className="p-0">
                            <table className="w-full text-left text-sm">
                               <thead className="bg-black border-b border-white/[0.05] text-[#666]">
                                  <tr>
                                     <th className="font-normal px-4 py-3">Region</th>
                                     <th className="font-normal px-4 py-3">Latency</th>
                                     <th className="font-normal px-4 py-3 text-right">Status</th>
                                  </tr>
                               </thead>
                               <tbody className="divide-y divide-white/[0.05] text-[#a1a1aa] font-mono text-xs">
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white">iad1 (Washington, D.C.)</td>
                                     <td className="px-4 py-3 flex items-center gap-2"><div className="w-16 h-1 bg-white/[0.1] rounded-full overflow-hidden"><div className="h-full w-[12%] bg-blue-500" /></div> 12ms</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">Optimal</td>
                                  </tr>
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white">fra1 (Frankfurt)</td>
                                     <td className="px-4 py-3 flex items-center gap-2"><div className="w-16 h-1 bg-white/[0.1] rounded-full overflow-hidden"><div className="h-full w-[18%] bg-emerald-500" /></div> 18ms</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">Optimal</td>
                                  </tr>
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-white">hnd1 (Tokyo)</td>
                                     <td className="px-4 py-3 flex items-center gap-2"><div className="w-16 h-1 bg-white/[0.1] rounded-full overflow-hidden"><div className="h-full w-[15%] bg-blue-500" /></div> 15ms</td>
                                     <td className="px-4 py-3 text-right text-emerald-400">Optimal</td>
                                  </tr>
                                  <tr className="hover:bg-white/[0.02]">
                                     <td className="px-4 py-3 text-[#666]">sin1 (Singapore)</td>
                                     <td className="px-4 py-3 flex items-center gap-2"><div className="w-16 h-1 bg-white/[0.1] rounded-full overflow-hidden"><div className="h-full w-[85%] bg-orange-500" /></div> 85ms</td>
                                     <td className="px-4 py-3 text-right text-orange-400">Rerouted</td>
                                  </tr>
                               </tbody>
                            </table>
                         </div>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 6: FRAMEWORKS                      */}
                {/* 3-col equal grid of framework support      */}
                {/* ═══════════════════════════════════════════ */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   {/* Section heading */}
                   <div className="p-16 md:p-24 lg:p-32 text-center border-b border-white/[0.1]">
                      <div className="flex items-center gap-2 text-[#888] text-sm mb-6 justify-center">
                         <Code className="w-4 h-4" />
                         <span>Framework Support</span>
                      </div>
                      <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tighter text-white leading-[1.05] max-w-3xl mx-auto">
                         Your framework, our infrastructure.
                      </h2>
                   </div>

                   {/* 3-col framework features */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative">
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />

                      <div className="col-span-1 border-r border-white/[0.1] p-12 lg:p-16">
                         <h3 className="text-xl font-medium text-white mb-4 pr-8">Zero Configuration</h3>
                         <p className="text-[#a1a1aa] text-[15px] leading-relaxed mb-6">
                            Push your code. We automatically detect Next.js, React, Nuxt, SvelteKit, Astro, and 30+ more frameworks.
                         </p>
                         <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded text-xs text-[#888] font-mono">Next.js</span>
                            <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded text-xs text-[#888] font-mono">React</span>
                            <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded text-xs text-[#888] font-mono">Vue</span>
                            <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded text-xs text-[#888] font-mono">Svelte</span>
                            <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded text-xs text-[#888] font-mono">Angular</span>
                            <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded text-xs text-[#888] font-mono">Astro</span>
                         </div>
                      </div>
                      <div className="col-span-1 border-r border-white/[0.1] p-12 lg:p-16">
                         <h3 className="text-xl font-medium text-white mb-4 pr-8">Native Optimizations</h3>
                         <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                            Images, fonts, and scripts are automatically optimized to deliver perfect Core Web Vitals out of the box. No manual tuning required.
                         </p>
                      </div>
                      <div className="col-span-1 p-12 lg:p-16">
                         <h3 className="text-xl font-medium text-white mb-4 pr-8">Bring Your Own</h3>
                         <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
                            Using a custom build process or a framework we don't explicitly support? Just provide your build command and output directory. We handle the rest.
                         </p>
                      </div>
                   </div>
                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* FINAL TESTIMONIAL                          */}
                {/* ═══════════════════════════════════════════ */}
                <div className="relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   <div className="p-16 md:p-24 lg:p-32">
                      <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white mb-12 max-w-4xl leading-tight">
                         <span className="text-[#666]">"</span>The speed at which we can iterate now is unmatched. We deploy 50 times a day with total confidence.<span className="text-[#666]">"</span>
                      </p>
                      <div className="flex items-center justify-between">
                         <div>
                            <div className="text-white font-medium mb-1">Alex Rivera, CTO</div>
                            <div className="text-2xl font-black tracking-[0.1em] text-[#888] uppercase">Linear</div>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-white" />
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
