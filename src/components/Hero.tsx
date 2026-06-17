import { motion } from 'motion/react';
import { Terminal, Zap, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-24 md:pt-44 md:pb-32 px-6 flex flex-col items-center text-center relative overflow-hidden bg-[#080808] border-b border-white/[0.08]">
      {/* Faint engineering grid, faded toward edges */}
      <div className="absolute inset-0 bg-grid mask-fade opacity-60 pointer-events-none" />

      {/* Abstract Glowing Nebula Background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[640px] pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/25 via-purple-500/5 to-transparent blur-[110px] rounded-full" />
      </div>
      {/* Thin top light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      <motion.a
        href="/changelog"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="group inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-[13px] text-gray-300 mb-8 relative z-10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 text-indigo-300 px-2 py-0.5 text-[11px] font-medium border border-indigo-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          New
        </span>
        Collab Code Environment 2.0 is Live
        <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </motion.a>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-gradient text-4xl md:text-[5rem] lg:text-[7rem] tracking-tighter font-semibold mb-8 leading-[0.95] relative z-10"
      >
        Code at the <br className="hidden md:block"/> speed of thought.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10 mb-10"
      >
        A deeply integrated, multiplayer cloud IDE that connects your team directly to instant edge compute. Stop fighting local setups.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
      >
        <button className="group bg-white text-black px-7 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-8px_rgba(255,255,255,0.6)]">
          <Terminal className="w-[18px] h-[18px]" />
          Start Coding Now
          <ArrowRight className="w-4 h-4 -ml-0.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <button className="bg-white/[0.04] border border-white/[0.1] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
          View Documentation
        </button>
      </motion.div>

      {/* Abstract Dashboard/Engine Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 w-full max-w-[1000px] h-auto aspect-video relative z-10 rounded-2xl border border-white/[0.08] bg-[#000] glow-ring overflow-hidden flex flex-col"
      >
        {/* Gradient frame highlight */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.12] to-transparent opacity-60 pointer-events-none [mask:linear-gradient(#000,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.06),_transparent_70%)] pointer-events-none" />

        {/* Top Bar */}
        <div className="h-12 border-b border-white/[0.05] bg-[#020202] flex items-center px-4 justify-between relative z-10">
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-white/[0.1] hover:bg-red-500/80 transition-colors" />
             <div className="w-3 h-3 rounded-full bg-white/[0.1] hover:bg-yellow-500/80 transition-colors" />
             <div className="w-3 h-3 rounded-full bg-white/[0.1] hover:bg-green-500/80 transition-colors" />
           </div>
           <div className="text-[#888] text-xs font-mono tracking-widest uppercase">Collab Engine // Active</div>
           <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20"><Zap className="w-3 h-3" /></div>
           </div>
        </div>
        
        {/* IDE Mockup Internals */}
        <div className="flex flex-1 h-full overflow-hidden relative z-10">
           {/* Sidebar */}
           <div className="hidden md:flex w-56 border-r border-white/[0.05] bg-[#000] flex-col">
              <div className="px-4 py-3 text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center justify-between">
                 <span>EXPLORER</span>
                 <span className="text-gray-600">...</span>
              </div>
              <div className="flex flex-col p-2 gap-0.5 text-[13px] font-mono select-none">
                 <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-400 cursor-pointer hover:bg-white/[0.02]">
                    <span className="text-gray-500 text-[10px]">▼</span> src
                 </div>
                 <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.05] text-indigo-300 cursor-pointer ml-4">
                    <span className="text-indigo-400">📄</span> server.ts
                 </div>
                 <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] cursor-pointer ml-4 transition-colors">
                    <span className="text-blue-400">📄</span> app.tsx
                 </div>
                 <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] cursor-pointer ml-4 transition-colors">
                    <span className="text-teal-400">📄</span> styles.css
                 </div>
                 <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-400 hover:bg-white/[0.02] cursor-pointer mt-1 transition-colors">
                    <span className="text-gray-500 text-[10px]">▶</span> public
                 </div>
                 <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-400 hover:bg-white/[0.02] cursor-pointer transition-colors mt-2">
                    <span className="text-yellow-500">⚙️</span> package.json
                 </div>
              </div>
           </div>

           {/* Main Edior Context */}
           <div className="flex-1 flex flex-col relative bg-[#000]">
              
              {/* Code Tab */}
              <div className="flex h-10 border-b border-white/[0.05] bg-[#020202]">
                 <div className="flex items-center justify-between gap-4 px-4 border-r border-white/[0.05] bg-[#000] text-[13px] font-mono text-gray-300 min-w-[120px]">
                    <div className="flex items-center gap-2">
                       <span className="text-indigo-400">📄</span> server.ts
                    </div>
                    <span className="text-gray-600 hover:text-white cursor-pointer hover:bg-white/[0.1] rounded-full w-4 h-4 flex items-center justify-center">×</span>
                 </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 p-4 font-mono text-[13px] md:text-[14px] leading-relaxed overflow-hidden">
                 <div className="flex text-gray-500 select-none h-full">
                    <div className="flex flex-col text-right pr-4 border-r border-white/[0.05] mr-4 text-gray-600">
                       <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                    </div>
                    <div className="flex text-left flex-col w-full text-white">
                       <p><span className="text-pink-400">import</span> {'{'} CollabEngine {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-400">'@collab/core'</span>;</p>
                       <p className="h-6"></p>
                       <p><span className="text-pink-400">const</span> engine = <span className="text-pink-400">new</span> <span className="text-amber-200">CollabEngine</span>({'{'}</p>
                       <p>&nbsp;&nbsp;region: <span className="text-emerald-400">'global'</span>,</p>
                       <p>&nbsp;&nbsp;scaling: <span className="text-emerald-400">'auto'</span>,</p>
                       <p>&nbsp;&nbsp;auth: <span className="text-purple-400">true</span></p>
                       <p>{'}'});</p>
                       <p className="h-6"></p>
                       <p>engine.<span className="text-blue-400">start</span>().<span className="text-blue-400">then</span>(() <span className="text-pink-400">=&gt;</span> <span className="text-amber-200">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-400">'🚀 Ready.'</span>));</p>
                    </div>
                 </div>
              </div>

              {/* Terminal */}
              <div className="h-40 border-t border-white/[0.05] bg-[#020202] flex flex-col relative">
                <div className="flex border-b border-white/[0.05] text-[11px] font-mono text-gray-500 px-4 h-8 items-center gap-4">
                   <span className="text-white uppercase tracking-widest border-b border-white py-1">Terminal</span>
                   <span className="hover:text-white uppercase tracking-widest cursor-pointer py-1">Problems (0)</span>
                   <span className="hover:text-white uppercase tracking-widest cursor-pointer py-1">Output</span>
                </div>
                <div className="px-4 py-3 space-y-1.5 font-mono text-[12px] md:text-[13px] text-gray-400 overflow-hidden flex-1 relative">
                  <p><span className="text-emerald-400 mr-2">✓</span> Compiled successfully in <span className="text-white">124ms</span></p>
                  <p><span className="text-indigo-400 mr-2">ℹ</span> Watch mode activated. Waiting for file changes...</p>
                  <p className="flex items-center gap-2 mt-4"><span className="text-emerald-400">~/collab-app</span> <span className="text-white">❯</span> <span className="animate-pulse w-2 h-4 bg-white/70 inline-block"></span></p>
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}

