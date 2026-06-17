import { motion } from 'motion/react';

const LOGS = [
  {
    version: "v2.4.0",
    date: "November 12, 2023",
    changes: [
      { type: "Feature", text: "Introduced Edge Functions with sub-10ms cold starts." },
      { type: "Improvement", text: "Reduced core engine memory footprint by 40%." },
      { type: "Fix", text: "Resolved cursor desync issue in collaborative editor." }
    ]
  },
  {
    version: "v2.3.5",
    date: "October 28, 2023",
    changes: [
      { type: "Feature", text: "Added support for environment variable branching." },
      { type: "Fix", text: "Fixed race condition in preview deployment builder." }
    ]
  },
  {
    version: "v2.3.0",
    date: "October 15, 2023",
    changes: [
      { type: "Feature", text: "New global search interface using fuzzy matching." },
      { type: "Improvement", text: "Terminal startup time reduced to 300ms." },
      { type: "Feature", text: "Added native Next.js deployment caching." },
      { type: "Fix", text: "Corrected syntax highlighting for Rust macros." }
    ]
  },
  {
    version: "v2.2.1",
    date: "September 30, 2023",
    changes: [
      { type: "Fix", text: "Fixed WebSockets disconnecting on prolonged idle." },
      { type: "Improvement", text: "Updated base Node.js image to v20.x." }
    ]
  },
  {
    version: "v2.2.0",
    date: "September 10, 2023",
    changes: [
      { type: "Feature", text: "Launched Collab Code 2.0 Engine." },
      { type: "Feature", text: "Multiplayer workspace rewriting." },
      { type: "Improvement", text: "New visual identity and dark mode theme." }
    ]
  }
];

export function Changelog() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000]">
       {/* Hero Section */}
       <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.08] relative overflow-hidden min-h-[30vh]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-slate-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[5rem] tracking-tighter font-semibold text-white mb-6 leading-[1.05] relative z-10 max-w-4xl"
          >
             Changelog
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             New updates and improvements to Collab Code.
          </motion.p>
       </section>

       {/* Logs */}
       <section className="border-b border-white/[0.08] bg-[#000]">
          <div className="max-w-[800px] mx-auto p-6 md:p-12 lg:p-20">
             <div className="flex flex-col gap-16">
                {LOGS.map((log, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="flex flex-col md:flex-row gap-8 md:gap-16 relative"
                   >
                     {/* Timeline element */}
                     <div className="hidden md:block absolute left-[120px] top-2 bottom-0 w-px bg-white/[0.05] -z-10" />
                     
                     <div className="md:w-[120px] shrink-0 pt-1">
                        <span className="text-[#888] text-sm tabular-nums">{log.date}</span>
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                           <h2 className="text-2xl font-medium text-white tracking-tight">{log.version}</h2>
                           <div className="hidden md:block w-2 h-2 rounded-full bg-white relative -left-[80px]" />
                        </div>
                        <div className="flex flex-col gap-4">
                           {log.changes.map((change, j) => (
                              <div key={j} className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                                 <span className={`px-2 py-1 text-[10px] uppercase font-mono tracking-widest rounded border ${change.type === 'Feature' ? 'border-green-500/30 text-green-400 bg-green-500/10' : change.type === 'Fix' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-slate-500/30 text-slate-400 bg-slate-500/10'}`}>
                                    {change.type}
                                 </span>
                                 <p className="text-[#a1a1aa] text-sm leading-relaxed mt-0.5">{change.text}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </section>
    </main>
  );
}
