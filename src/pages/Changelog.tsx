import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const LOGS = [
  {
    version: "v2.4.0",
    date: "November 12, 2026",
    changes: [
      { type: "Feature", text: "Introduced Edge Functions with sub-10ms cold starts." },
      { type: "Improvement", text: "Reduced core engine memory footprint by 40%." },
      { type: "Fix", text: "Resolved cursor desync issue in collaborative editor." }
    ]
  },
  {
    version: "v2.3.5",
    date: "October 28, 2026",
    changes: [
      { type: "Feature", text: "Added support for environment variable branching." },
      { type: "Fix", text: "Fixed race condition in preview deployment builder." }
    ]
  },
  {
    version: "v2.3.0",
    date: "October 15, 2026",
    changes: [
      { type: "Feature", text: "New global search interface using fuzzy matching." },
      { type: "Improvement", text: "Terminal startup time reduced to 300ms." },
      { type: "Feature", text: "Added native Next.js deployment caching." },
      { type: "Fix", text: "Corrected syntax highlighting for Rust macros." }
    ]
  },
  {
    version: "v2.2.1",
    date: "September 30, 2026",
    changes: [
      { type: "Fix", text: "Fixed WebSockets disconnecting on prolonged idle." },
      { type: "Improvement", text: "Updated base Node.js image to v20.x." }
    ]
  },
  {
    version: "v2.2.0",
    date: "September 10, 2026",
    changes: [
      { type: "Feature", text: "Launched Collab Code 2.0 Engine." },
      { type: "Feature", text: "Multiplayer workspace rewriting." },
      { type: "Improvement", text: "New visual identity and dark mode theme." }
    ]
  }
];

// Reusable Crosshair
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Changelog() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-white selection:text-black font-sans">
       {/* Hero Section */}
       <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.1] relative overflow-hidden min-h-[30vh]">
          {/* Strict Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
          
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
       <section className="border-b border-white/[0.1] bg-[#000] relative">
          <div className="max-w-[800px] mx-auto p-6 md:p-12 lg:p-20 relative border-x border-white/[0.1]">
             <Crosshair className="-top-1.5 -left-1.5" />
             <Crosshair className="-top-1.5 -right-1.5" />
             
             <div className="flex flex-col gap-16 relative">
                {/* Main strict timeline line */}
                <div className="hidden md:block absolute left-[140px] top-4 bottom-0 w-px bg-white/[0.1] z-0" />

                {LOGS.map((log, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="flex flex-col md:flex-row gap-8 md:gap-[50px] relative z-10"
                   >
                     {/* Date column */}
                     <div className="md:w-[120px] shrink-0 pt-2 text-right">
                        <span className="text-[#888] font-mono text-xs uppercase tracking-widest">{log.date}</span>
                     </div>
                     
                     <div className="flex-1 pb-16 border-b border-white/[0.05] last:border-0 last:pb-0">
                        <div className="flex items-center gap-6 mb-8 relative">
                           {/* Geometric node on timeline */}
                           <div className="hidden md:flex absolute -left-[54px] w-2 h-2 bg-[#000] border border-white items-center justify-center"></div>
                           <h2 className="text-3xl font-bold text-white tracking-tighter">{log.version}</h2>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                           {log.changes.map((change, j) => (
                              <div key={j} className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                                 <span className={`shrink-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border
                                    ${change.type === 'Feature' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 
                                      change.type === 'Improvement' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 
                                      'border-orange-500/30 text-orange-400 bg-orange-500/10'}
                                 `}>
                                    {change.type}
                                 </span>
                                 <span className="text-white/80 text-[15px] leading-relaxed pt-0.5">{change.text}</span>
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
