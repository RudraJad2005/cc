import { useEffect } from 'react';
import { Crosshair, ArrowRight, GitPullRequest, Eye, Accessibility, Sparkles, BrainCircuit, Activity, CheckCircle2, Search, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function SDK() {
  useEffect(() => {
    document.title = 'Collab SDK - Complete Control';
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-[#020202]">
      
      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full max-w-[1400px] border-b border-white/[0.1] pt-32 pb-48 flex flex-col items-center justify-center overflow-hidden">
        <Crosshair className="absolute -top-1.5 -left-1.5 text-white/20" />
        <Crosshair className="absolute -top-1.5 -right-1.5 text-white/20" />
        
        {/* Subtle Dot Noise Background */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full mb-10">
            <span className="text-xs font-mono font-bold text-blue-400 border border-blue-400/30 rounded px-1.5 py-0.5 uppercase tracking-widest">New</span>
            <span className="text-[#888] text-sm">Lower Costs with Active CPU Pricing</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white max-w-4xl leading-[1.05] mb-8">
            The power of our SDK, in serverless form
          </h1>
          
          <p className="text-[#888] text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed">
            Fluid compute combines the efficiency of servers and the flexibility of serverless, enabling real-time, dynamic workloads like APIs, streaming, and AI.
          </p>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Enable Fluid
            </button>
            <button className="px-8 py-3 bg-transparent text-white border border-white/20 font-semibold rounded-full hover:bg-white/5 transition-colors">
              Get a demo
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CONCURRENCY GANTT CHARTS SECTION             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full max-w-[1400px] border-b border-white/[0.1] grid grid-cols-1 lg:grid-cols-12">
        
        {/* Sticky Left */}
        <div className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-white/[0.1]">
          <div className="lg:sticky lg:top-32 h-auto p-12 md:p-20 flex flex-col justify-start">
            <div className="flex items-center gap-2 text-[#888] mb-6">
              <ZapIcon />
              <span className="text-xs font-mono tracking-widest uppercase">Efficiency gains that pay off</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-white mb-8">
              Server-like concurrency, in a serverless world
            </h2>
            <p className="text-[#888] text-lg leading-relaxed">
              In-function concurrency enables a single Collab Function to handle multiple invocations simultaneously, optimizing resource usage and turning efficiency gains into savings.
            </p>
          </div>
        </div>

        {/* Scrolling Right */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Traditional Serverless */}
          <div className="p-12 md:p-20 border-b border-white/[0.1]">
            <h3 className="text-2xl font-medium text-[#888] tracking-tight mb-12">
              <strong className="text-white font-bold">Traditional serverless wastes idle time.</strong> It fails to efficiently utilize available resources during periods of inactivity.
            </h3>
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 relative overflow-hidden flex flex-col gap-6 w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-6">
                <span className="text-[#666] font-mono text-xs w-24">serverless-1</span>
                <div className="h-1 flex-1 relative flex">
                  <div className="h-full w-2/5 bg-blue-500 rounded-l-full relative"><div className="w-2 h-2 rounded-full border border-blue-500 absolute -left-1 -top-0.5 bg-black" /></div>
                  <div className="h-full w-3/5 bg-blue-500/20 rounded-r-full relative border-y border-r border-blue-500/50"><div className="w-1.5 h-4 bg-blue-500 absolute right-0 -top-1.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[#666] font-mono text-xs w-24">serverless-2</span>
                <div className="h-1 flex-1 relative flex pl-12">
                  <div className="h-full w-2/5 bg-yellow-500 rounded-l-full relative"><div className="w-2 h-2 rounded-full border border-yellow-500 absolute -left-1 -top-0.5 bg-black" /></div>
                  <div className="h-full w-3/5 bg-yellow-500/20 rounded-r-full relative border-y border-r border-yellow-500/50"><div className="w-1.5 h-4 bg-yellow-500 absolute right-0 -top-1.5" /></div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[#666] font-mono text-xs w-24">serverless-3</span>
                <div className="h-1 flex-1 relative flex pl-24">
                  <div className="h-full w-2/5 bg-red-500 rounded-l-full relative"><div className="w-2 h-2 rounded-full border border-red-500 absolute -left-1 -top-0.5 bg-black" /></div>
                  <div className="h-full w-3/5 bg-red-500/20 rounded-r-full relative border-y border-r border-red-500/50"><div className="w-1.5 h-4 bg-red-500 absolute right-0 -top-1.5" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Fluid Compute */}
          <div className="p-12 md:p-20 border-b border-white/[0.1]">
            <h3 className="text-2xl font-medium text-[#888] tracking-tight mb-12">
              <strong className="text-white font-bold">Fluid runs invocations concurrently.</strong> Overall cloud resources provisioned are dramatically reduced while invocations are kept alive in-memory.
            </h3>
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 relative overflow-hidden flex flex-col gap-6 w-full max-w-2xl mx-auto h-[200px] justify-center">
              <div className="flex items-center gap-6 relative">
                <span className="text-[#666] font-mono text-xs w-24 flex items-center gap-2"><div className="w-3 h-3 border border-[#666] rounded-sm flex items-center justify-center"><div className="w-1 h-1 bg-[#666] rounded-full" /></div> fluid-1</span>
                <div className="h-1 flex-1 relative">
                  
                  {/* Layer 1: Blue */}
                  <div className="absolute top-0 left-0 w-4/5 h-1 flex">
                    <div className="h-full w-1/4 bg-blue-500 rounded-l-full relative"><div className="w-2 h-2 rounded-full border border-blue-500 absolute -left-1 -top-0.5 bg-black" /></div>
                    <div className="h-full w-3/4 bg-blue-500 border-y border-r border-blue-500 relative translate-y-2"><div className="w-1.5 h-4 bg-blue-500 absolute right-0 -top-1.5" /><div className="w-px h-2 bg-blue-500 absolute left-0 -top-2" /></div>
                  </div>

                  {/* Layer 2: Yellow */}
                  <div className="absolute top-0 left-12 w-4/5 h-1 flex">
                    <div className="h-full w-1/4 bg-yellow-500 rounded-l-full relative"><div className="w-2 h-2 rounded-full border border-yellow-500 absolute -left-1 -top-0.5 bg-black" /></div>
                    <div className="h-full w-3/4 bg-yellow-500 border-y border-r border-yellow-500 relative translate-y-4"><div className="w-1.5 h-4 bg-yellow-500 absolute right-0 -top-1.5" /><div className="w-px h-4 bg-yellow-500 absolute left-0 -top-4" /></div>
                  </div>

                  {/* Layer 3: Red */}
                  <div className="absolute top-0 left-24 w-4/5 h-1 flex">
                    <div className="h-full w-1/4 bg-red-500 rounded-l-full relative"><div className="w-2 h-2 rounded-full border border-red-500 absolute -left-1 -top-0.5 bg-black" /></div>
                    <div className="h-full w-3/4 bg-red-500 border-y border-r border-red-500 relative translate-y-6"><div className="w-1.5 h-4 bg-red-500 absolute right-0 -top-1.5" /><div className="w-px h-6 bg-red-500 absolute left-0 -top-6" /></div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="p-12 md:p-20 flex flex-col justify-center">
            <h3 className="text-2xl font-medium text-white tracking-tight mb-4">
              CPU that's charged when active, not idle.
            </h3>
            <p className="text-[#888] text-lg">No more paying for idle time.</p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* AI WORKLOADS & APIS GRID                     */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full max-w-[1400px] border-b border-white/[0.1] grid grid-cols-1 lg:grid-cols-2">
        <Crosshair className="absolute -top-1.5 -left-1.5 text-white/20" />
        
        {/* Left Column: AI Workloads */}
        <div className="p-12 md:p-20 border-b lg:border-b-0 lg:border-r border-white/[0.1] flex flex-col min-h-[700px]">
          <div className="flex items-center gap-2 text-[#888] mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest">AI workloads</span>
          </div>
          <h3 className="text-2xl font-medium text-white tracking-tight mb-16 max-w-md leading-relaxed">
            <strong className="font-bold">Efficient idle time.</strong> Run tasks with reduced latency and higher concurrency, delivering faster, scalable results for all users—regardless of the workload size.
          </h3>
          
          <div className="mt-auto relative w-full flex items-center justify-center">
            
            {/* Dark Chat UI Box */}
            <div className="w-48 h-32 border border-white/10 rounded-lg bg-[#0a0a0a] shadow-2xl relative z-20 flex flex-col p-4 gap-3 mr-4">
               <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20"/><div className="w-2 h-2 rounded-full bg-white/20"/><div className="w-2 h-2 rounded-full bg-white/20"/></div>
               <div className="w-3/4 h-3 rounded bg-white/10" />
               <div className="w-full h-3 rounded bg-white/5" />
               <div className="w-5/6 h-3 rounded bg-white/10 ml-auto" />
               <div className="w-full h-6 rounded border border-white/10 mt-auto bg-transparent" />
            </div>

            {/* Hub and Branching */}
            <div className="flex items-center">
               <div className="w-12 h-0 border-t border-[#444] shrink-0" />
               <div className="w-12 h-12 bg-black border border-white/10 rounded-md flex items-center justify-center shrink-0 z-20 shadow-xl">
                 <span className="text-white font-black text-lg">▲</span>
               </div>
               
               {/* Fixed SVG branches */}
               <div className="relative w-16 h-32 shrink-0 pointer-events-none">
                 <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 128">
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 64 C 32 64, 32 16, 64 16" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 64 L 64 64" stroke="#10b981" strokeWidth="2" fill="none" />
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 64 C 32 64, 32 112, 64 112" stroke="#f59e0b" strokeWidth="2" fill="none" />
                 </motion.svg>
               </div>

               {/* Right Nodes */}
               <div className="flex flex-col justify-between h-[128px] shrink-0">
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg translate-y-[2px]">
                   <Bot className="w-3 h-3 text-white" /> <span className="text-xs font-mono text-[#888]">Grok</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg">
                   <BrainCircuit className="w-3 h-3 text-[#10b981]" /> <span className="text-xs font-mono text-[#888]">o3-pro</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg -translate-y-[2px]">
                   <Sparkles className="w-3 h-3 text-[#f59e0b]" /> <span className="text-xs font-mono text-[#888]">Sonnet</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reliable APIs */}
        <div className="p-12 md:p-20 flex flex-col min-h-[700px]">
          <div className="flex items-center gap-2 text-[#888] mb-8">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest">Business-critical APIs</span>
          </div>
          <h3 className="text-2xl font-medium text-white tracking-tight mb-16 max-w-md leading-relaxed">
            <strong className="font-bold">Reliable APIs.</strong> Ensure fast, resilient API responses under heavy traffic, keeping smooth and consistent experiences.
          </h3>
          
          <div className="mt-auto relative w-full flex items-center justify-center">
            
            {/* Dark Graph UI Box */}
            <div className="w-48 h-32 border border-white/10 rounded-lg bg-[#0a0a0a] shadow-2xl relative z-20 p-4 mr-4 flex flex-col">
               <div className="flex gap-1.5 mb-4"><div className="w-2 h-2 rounded-full bg-white/20"/><div className="w-2 h-2 rounded-full bg-white/20"/><div className="w-2 h-2 rounded-full bg-white/20"/></div>
               <div className="flex-1 border-b border-l border-white/10 relative">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 0 40 L 20 20 L 40 30 L 60 10 L 80 45 L 100 5" stroke="#3b82f6" strokeWidth="2" fill="none" />
                  </svg>
               </div>
            </div>

            {/* Hub and Branching */}
            <div className="flex items-center">
               <div className="w-12 h-0 border-t border-[#444] shrink-0" />
               <div className="w-12 h-12 bg-black border border-white/10 rounded-md flex items-center justify-center shrink-0 z-20 shadow-xl">
                 <span className="text-white font-black text-lg">▲</span>
               </div>
               
               {/* Fixed SVG branches (4 nodes) */}
               <div className="relative w-16 h-48 shrink-0 pointer-events-none">
                 <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 192">
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 96 C 32 96, 32 16, 64 16" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 96 C 32 96, 32 68, 64 68" stroke="#ef4444" strokeWidth="2" fill="none" />
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 96 C 32 96, 32 124, 64 124" stroke="#eab308" strokeWidth="2" fill="none" />
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }} viewport={{ once: true }}
                      d="M 0 96 C 32 96, 32 176, 64 176" stroke="#10b981" strokeWidth="2" fill="none" />
                 </motion.svg>
               </div>

               {/* Right Nodes (4 items) */}
               <div className="flex flex-col justify-between h-[192px] shrink-0">
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg translate-y-[2px]">
                   <span className="text-[10px] font-bold text-[#888] bg-white/10 px-1 rounded">POST</span> <span className="text-xs font-mono text-[#888]">/api/auth</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg translate-y-[2px]">
                   <span className="text-[10px] font-bold text-[#888] bg-white/10 px-1 rounded">GET</span> <span className="text-xs font-mono text-[#888]">/api/users</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg -translate-y-[2px]">
                   <span className="text-[10px] font-bold text-[#888] bg-white/10 px-1 rounded">POST</span> <span className="text-xs font-mono text-[#888]">/api/billing</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-black shadow-lg -translate-y-[2px]">
                   <span className="text-[10px] font-bold text-[#888] bg-white/10 px-1 rounded">GET</span> <span className="text-xs font-mono text-[#888]">/api/subs</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TIMELINE / PREVIEWS SECTION                  */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 min-h-screen border-b border-white/[0.1]">
        
        {/* Left Testimonial & Line Core */}
        <div className="lg:col-span-4 relative border-r border-white/[0.1] p-12 md:p-20 flex flex-col items-end text-right">
           <div className="max-w-xs relative z-10 sticky top-32">
              <p className="text-[#888] text-lg font-medium leading-relaxed mb-6">"This has completely changed our workflow, we're able to ship more confidently with Collab."</p>
              <div className="text-white font-bold text-xl tracking-widest">SONOS</div>
              <ArrowRight className="w-5 h-5 text-[#444] mt-4 ml-auto" />
           </div>

           {/* Vertical Colored Line Timeline Component */}
           <div className="absolute top-0 right-[-1px] w-px h-full bg-gradient-to-b from-transparent via-pink-500 to-cyan-500 z-10" />
           
           {/* Timeline Nodes */}
           <div className="absolute top-48 right-0 translate-x-1/2 w-8 h-8 rounded-full bg-black border border-[#333] flex items-center justify-center z-20">
             <Eye className="w-4 h-4 text-[#888]" />
           </div>

           <div className="absolute top-[600px] right-0 translate-x-1/2 w-8 h-8 rounded-full bg-black border border-[#333] flex items-center justify-center z-20">
             <Accessibility className="w-4 h-4 text-[#888]" />
           </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-8 flex flex-col pb-32">
           
           {/* Commit History Block */}
           <div className="p-12 md:p-20 lg:pl-24 relative mt-16">
              <h3 className="text-2xl font-medium text-white tracking-tight mb-10 max-w-lg leading-relaxed">
                <strong className="font-bold">Keep pushing forward.</strong> When builds are fast and rollbacks are instant, every developer can ship small, iterative changes that keeps the team moving forward.
              </h3>

              <div className="bg-[#050505] border border-white/10 rounded-xl p-6 w-full max-w-xl shadow-2xl">
                 <div className="flex flex-col gap-6">
                    {/* Commit 1 */}
                    <div className="flex items-start justify-between">
                       <div className="flex gap-4">
                          <GitPullRequest className="w-5 h-5 text-[#888] mt-1 shrink-0" />
                          <div>
                             <div className="text-white font-medium mb-1">Migrate core pages to App Router</div>
                             <div className="flex items-center gap-2 text-sm text-[#888]">
                                <span className="font-mono text-emerald-400">rf/app-router</span>
                                <span>2m ago</span>
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold ml-2">R</div>
                                <span>rauno</span>
                             </div>
                          </div>
                       </div>
                       <div className="text-[#888] text-sm flex items-center gap-2">Comment <Search className="w-4 h-4" /></div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    {/* Commit 2 */}
                    <div className="flex items-start justify-between">
                       <div className="flex gap-4">
                          <div className="w-5 h-5 rounded-full border border-yellow-500/50 flex items-center justify-center mt-1 shrink-0"><div className="w-2 h-2 bg-yellow-500 rounded-full" /></div>
                          <div>
                             <div className="text-white font-medium mb-1">Add banner to conf website</div>
                             <div className="flex items-center gap-2 text-sm text-[#888]">
                                <span className="font-mono text-emerald-400">21342-banner</span>
                                <span>2h ago</span>
                                <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-white font-bold ml-2">T</div>
                                <span>timo</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-white">
                         <div className="flex -space-x-2"><div className="w-5 h-5 rounded-full bg-blue-500 border border-black z-10"/><div className="w-5 h-5 rounded-full bg-purple-500 border border-black z-0"/></div>
                         4/5 Resolved
                         <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    {/* Commit 3 */}
                    <div className="flex items-start justify-between">
                       <div className="flex gap-4">
                          <GitPullRequest className="w-5 h-5 text-[#888] mt-1 shrink-0" />
                          <div>
                             <div className="text-white font-medium mb-1 line-through decoration-white/30 text-white/50">Remove release takeover</div>
                             <div className="flex items-center gap-2 text-sm text-[#888]">
                                <span className="font-mono text-emerald-400">ff/new-flag</span>
                                <span>1d ago</span>
                                <div className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center text-[8px] text-white font-bold ml-2">M</div>
                                <span>mrncst</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-white">
                         <div className="flex -space-x-2"><div className="w-5 h-5 rounded-full bg-blue-500 border border-black z-10"/><div className="w-5 h-5 rounded-full bg-yellow-500 border border-black z-0"/></div>
                         5/5 Resolved
                         <CheckCircle2 className="w-4 h-4 text-blue-500" />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Connected Toolbar Mockup */}
              <div className="relative mt-24 w-full flex flex-col items-start">
                 {/* Connection SVG to left timeline */}
                 <motion.svg className="absolute -left-12 md:-left-20 lg:-left-24 -top-24 w-12 md:w-20 lg:w-24 h-24 pointer-events-none" viewBox="0 0 96 96" preserveAspectRatio="none">
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} viewport={{ once: true, margin: "-100px" }}
                      d="M 0 0 C 48 0, 48 96, 96 96" stroke="#ec4899" strokeWidth="2" fill="none" />
                 </motion.svg>

                 <div className="bg-[#1a1a1a] border border-white/10 rounded-full px-6 py-4 flex items-center gap-6 shadow-2xl z-20">
                    <Search className="w-5 h-5 text-white" />
                    <Eye className="w-5 h-5 text-[#888]" />
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-[#1a1a1a] z-30 flex items-center justify-center text-xs text-white font-bold">A</div>
                       <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#1a1a1a] z-20 flex items-center justify-center text-xs text-white font-bold">B</div>
                       <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-[#1a1a1a] z-10 flex items-center justify-center text-xs text-white font-bold">C</div>
                    </div>
                 </div>
                 
                 <div className="mt-8 text-left max-w-sm ml-4">
                    <h4 className="text-white font-bold mb-2">The Collab Toolbar. A toolbox for iteration.</h4>
                    <p className="text-[#888] text-sm">Your command center, wherever you work.</p>
                 </div>
              </div>
           </div>

           {/* Accessibility Block */}
           <div className="p-12 md:p-20 lg:pl-24 relative mt-16">
              <h3 className="text-2xl font-medium text-white tracking-tight mb-10 max-w-lg leading-relaxed">
                <strong className="font-bold">Audit your accessibility.</strong> Identify areas of improvement and ensure everyone can experience your application.
              </h3>

              <div className="bg-[#050505] border border-white/10 rounded-xl p-6 w-full max-w-xl shadow-2xl flex flex-col gap-6">
                 {/* Filters */}
                 <div className="flex gap-4 text-sm font-medium">
                    <button className="bg-white/10 text-white px-4 py-1.5 rounded-full border border-white/10">All</button>
                    <button className="text-[#888] px-4 py-1.5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Advisory</button>
                    <button className="text-[#888] px-4 py-1.5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Warning</button>
                    <button className="text-[#888] px-4 py-1.5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Serious</button>
                 </div>

                 {/* Warning Block */}
                 <div className="flex gap-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <p className="text-[#888] leading-relaxed">Contrast between foreground and background colors should meet WCAG 2 AA minimum contrast ratio threshold.</p>
                 </div>

                 {/* Code Snippets */}
                 <div className="bg-[#111] border border-white/5 rounded-lg p-4 font-mono text-xs overflow-x-auto relative">
                    <div className="text-blue-400">div[data-color="var(--ds-blue-600)"]</div>
                    <div className="text-[#888]">.cursor_cursorName__GrFiA</div>
                    <div className="absolute right-4 top-4 text-[#444] border border-[#444] rounded-full w-4 h-4 flex items-center justify-center font-sans text-[10px]">i</div>
                 </div>

                 <div className="bg-[#111] border border-white/5 rounded-lg p-4 font-mono text-xs overflow-x-auto relative">
                    <div className="text-red-400">div[data-color="var(--ds-red-700)"]</div>
                    <div className="text-[#888]">.cursor_cursorName__GrFiA</div>
                    <div className="absolute right-4 top-4 text-[#444] border border-[#444] rounded-full w-4 h-4 flex items-center justify-center font-sans text-[10px]">i</div>
                 </div>

              </div>
           </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CTA SECTION                                 */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full max-w-[1400px] border-t border-white/[0.1] bg-[#020202] py-32 flex flex-col items-center text-center px-6 overflow-hidden">
         
         {/* Technical Background: Dot Noise + Fading Gradient */}
         <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />
         
         <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
            
            {/* Terminal Mockup / Pill */}
            <div className="mb-8 p-[1px] rounded-full bg-gradient-to-r from-white/20 via-white/5 to-white/20">
               <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-[#888]">~ npm install @collab/sdk</span>
               </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
               Build without limits.
            </h2>
            <p className="text-[#888] text-xl max-w-2xl mb-12 leading-relaxed">
               Ship complex logic to the edge in seconds. The Collab SDK gives you complete control over your deployments with zero configuration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
               <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  Start Deploying <ArrowRight className="w-4 h-4" />
               </button>
               <button className="w-full sm:w-auto px-8 py-3.5 bg-[#0a0a0a] text-white border border-white/10 font-semibold rounded-md hover:bg-white/5 transition-colors">
                  Read the Documentation
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}

// Dummy Icon Component for Zap
function ZapIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}
