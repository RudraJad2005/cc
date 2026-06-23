import { motion } from 'framer-motion';
import { ArrowRight, Plus, Terminal } from 'lucide-react';
import { SiReact, SiNextdotjs, SiTailwindcss, SiRust, SiTypescript, SiVuedotjs } from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function OSS() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-teal-500/30 selection:text-white font-sans">
      
      {/* ───────────────── Hero Section (Vercel Style) ───────────────── */}
      <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-32 text-center border-b border-white/[0.1] relative overflow-hidden bg-[#000] w-full">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
         <div className="max-w-[1400px] w-full border-x border-white/[0.1] absolute inset-0 mx-auto pointer-events-none" />
         
         <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-[#888] text-[12px] font-mono tracking-[0.2em] mb-6 uppercase relative z-10"
         >
             Open Source
         </motion.p>
         <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10"
          >
             Built on Open Source. <br/>
             <span className="text-[#888]">Built for Open Source.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             We are deeply committed to the open source ecosystem. We actively sponsor and contribute to the frameworks and languages that power the web.
          </motion.p>
      </section>

      {/* ───────────────── Foundation Marquee ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center py-12 overflow-hidden relative">
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
         
         <div className="flex gap-24 items-center animate-[marquee_20s_linear_infinite] whitespace-nowrap opacity-40 grayscale">
            {/* Repeated for seamless scrolling */}
            {[...Array(2)].map((_, i) => (
               <div key={i} className="flex gap-24 items-center">
                  <span className="text-2xl font-bold tracking-tighter">Linux Foundation</span>
                  <span className="text-2xl font-bold tracking-tighter">Apache Software</span>
                  <span className="text-2xl font-bold tracking-tighter">CNCF</span>
                  <span className="text-2xl font-bold tracking-tighter">OpenJS</span>
                  <span className="text-2xl font-bold tracking-tighter">Mozilla</span>
               </div>
            ))}
         </div>
         <style>{`
            @keyframes marquee {
               0% { transform: translateX(0); }
               100% { transform: translateX(-50%); }
            }
         `}</style>
      </section>

      {/* ───────────────── Vercel Quote Layout ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-3 border-x border-white/[0.1]">
            
            {/* The Quote (Takes up 2 columns) */}
            <div className="p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/[0.1] lg:col-span-2 flex flex-col justify-center">
               <p className="text-2xl md:text-3xl lg:text-4xl text-[#fff] leading-relaxed font-normal tracking-tight">
                  "Maintaining an open source framework used by millions requires immense infrastructure. Collab Code stepped up and provided the compute we needed, completely free, zero questions asked."
               </p>
            </div>

            {/* The Author (Takes up 1 column) */}
            <div className="p-8 md:p-16 flex flex-col justify-center items-start lg:items-center text-left lg:text-center">
               <div className="text-[#888] text-sm font-medium mb-4">Evan Vue, Creator</div>
               <div className="text-3xl font-bold tracking-tighter text-white">Vue.js</div>
            </div>

         </div>
      </section>

      {/* ───────────────── Impact Metrics Grid ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-3 border-x border-white/[0.1]">
            <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/[0.1]">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">$1M+</div>
               <p className="text-[#888] text-[15px] leading-relaxed">Donated directly to independent open-source maintainers through GitHub Sponsors and Open Collective.</p>
            </div>
            <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/[0.1]">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">500+</div>
               <p className="text-[#888] text-[15px] leading-relaxed">Core contributions merged upstream into the frameworks and libraries that power our infrastructure.</p>
            </div>
            <div className="p-12 md:p-16">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">10k+</div>
               <p className="text-[#888] text-[15px] leading-relaxed">Open source projects currently hosted entirely for free on Collab Code's enterprise-grade infrastructure.</p>
            </div>
         </div>
      </section>

      {/* ───────────────── Terminal Mockup / Core OSS ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 border-x border-white/[0.1]">
            
            <div className="p-12 md:p-20 border-b lg:border-b-0 lg:border-r border-white/[0.1] flex flex-col justify-center">
               <div className="text-white font-mono text-sm mb-4">⌘ Collab Code Core</div>
               <h3 className="text-4xl font-semibold tracking-tighter text-white mb-6">Contribute to the engine.</h3>
               <p className="text-[#888] text-lg leading-relaxed mb-8">
                  The core engine powering Collab Code workspaces is completely open source. We believe in building in public and welcome PRs from the community.
               </p>
               <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-3 w-fit hover:bg-gray-200 transition-colors">
                  View on GitHub <ArrowRight className="w-4 h-4" />
               </a>
            </div>

            <div className="p-12 md:p-20 flex flex-col justify-center relative bg-[#050505]">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
               
               <div className="w-full bg-[#000] border border-white/[0.2] overflow-hidden relative z-10 shadow-2xl">
                  {/* Window chrome */}
                  <div className="h-10 border-b border-white/[0.2] flex items-center px-4 bg-[#0a0a0a]">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                     </div>
                  </div>
                  {/* Terminal body */}
                  <div className="p-6 font-mono text-sm leading-relaxed whitespace-pre overflow-x-auto">
                     <span className="text-emerald-400">$</span> <span className="text-white">git clone https://github.com/collabcode/core.git</span><br/>
                     <span className="text-[#888]">Cloning into 'core'...</span><br/>
                     <span className="text-[#888]">remote: Enumerating objects: 1452, done.</span><br/>
                     <span className="text-[#888]">Receiving objects: 100% (1452/1452), 4.2 MB | 12.1 MB/s, done.</span><br/><br/>
                     <span className="text-emerald-400">$</span> <span className="text-white">cd core && pnpm install</span><br/>
                     <span className="text-cyan-400">Lockfile is up to date, resolution step is skipped</span><br/>
                     <span className="text-[#888]">Packages: +1204</span><br/>
                     <span className="text-[#888]">Done in 2.4s</span><br/><br/>
                     <span className="text-emerald-400">$</span> <span className="text-white">pnpm dev</span><br/>
                     <span className="text-emerald-400">ready</span> <span className="text-[#888]">- started server on 0.0.0.0:3000, url: http://localhost:3000</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* ───────────────── Sponsored Projects Grid ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-x border-white/[0.1]"
         >
            {[
               { name: 'React', icon: SiReact, desc: 'A JavaScript library for building user interfaces.', color: 'text-[#61DAFB]', hoverColor: 'group-hover:text-[#61DAFB]', glow: 'from-[#61DAFB]/20' },
               { name: 'Next.js', icon: SiNextdotjs, desc: 'The React Framework for the Web.', color: 'text-white', hoverColor: 'group-hover:text-white', glow: 'from-white/20' },
               { name: 'Tailwind CSS', icon: SiTailwindcss, desc: 'A utility-first CSS framework for rapid UI development.', color: 'text-[#06B6D4]', hoverColor: 'group-hover:text-[#06B6D4]', glow: 'from-[#06B6D4]/20' },
               { name: 'Rust', icon: SiRust, desc: 'A language empowering everyone to build reliable and efficient software.', color: 'text-[#DEA584]', hoverColor: 'group-hover:text-[#DEA584]', glow: 'from-[#DEA584]/20' },
               { name: 'TypeScript', icon: SiTypescript, desc: 'JavaScript with syntax for types.', color: 'text-[#3178C6]', hoverColor: 'group-hover:text-[#3178C6]', glow: 'from-[#3178C6]/20' },
               { name: 'Vue.js', icon: SiVuedotjs, desc: 'The Progressive JavaScript Framework.', color: 'text-[#4FC08D]', hoverColor: 'group-hover:text-[#4FC08D]', glow: 'from-[#4FC08D]/20' }
            ].map((project, i) => {
               const Icon = project.icon;
               return (
                  <motion.div 
                     key={i} 
                     variants={fadeUp} 
                     className={`group overflow-hidden p-12 border-white/[0.1] flex flex-col relative hover:bg-[#050505] transition-colors cursor-pointer
                        ${i % 3 !== 2 ? 'lg:border-r' : ''} 
                        ${i < 3 ? 'border-b' : 'border-b lg:border-b-0'}
                     `}
                  >
                     <Crosshair className="-top-1.5 -left-1.5" />
                     <Crosshair className="-top-1.5 -right-1.5" />
                     
                     {/* Unique Background Glow */}
                     <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />

                     {/* Background watermark hover effect */}
                     <div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-[0.08] transform group-hover:scale-[1.1] group-hover:-rotate-6 transition-all duration-700 pointer-events-none z-0">
                        <Icon className={`w-40 h-40 ${project.color}`} />
                     </div>
                     
                     <div className="w-16 h-16 border border-white/[0.1] bg-[#050505] flex items-center justify-center mb-8 relative z-10 transition-colors duration-500 group-hover:border-white/[0.2]">
                        <Icon className={`w-8 h-8 text-white transition-colors duration-500 ${project.hoverColor}`} />
                     </div>
                     <h3 className="text-2xl font-bold tracking-tighter text-white mb-4 relative z-10">{project.name}</h3>
                     <p className="text-[#888] leading-relaxed relative z-10">
                        {project.desc}
                     </p>
                  </motion.div>
               );
            })}
         </motion.div>
      </section>

      {/* ───────────────── Giant Split CTA ───────────────── */}
      <section className="w-full">
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            {/* Left: Teal */}
            <div className="bg-[#14b8a6] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Contribution<br/>Guidelines.</h2>
                  <p className="text-teal-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Read our philosophy on open source contributions and how to submit PRs to our core engine.</p>
                  
                  <a href="#" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-[15px] hover:bg-gray-100 transition-colors shadow-2xl">
                     Read Guidelines <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
            </div>

            {/* Right: Fuchsia */}
            <div className="bg-[#d946ef] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Apply for<br/>Sponsorship.</h2>
                  <p className="text-fuchsia-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Building something incredible for the community? We want to help fund your work.</p>
                  
                  <a href="#" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-[15px] hover:bg-[#111] transition-colors border border-white/[0.2] shadow-2xl">
                     Submit Application <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
