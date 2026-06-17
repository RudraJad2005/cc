import { motion } from 'motion/react';

export function CtaSection() {
  return (
     <section className="flex flex-col items-center justify-center py-32 md:py-48 relative border-b border-white/[0.08] overflow-hidden text-center bg-[#050505]">
        <div className="absolute inset-0 bg-grid mask-fade opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="absolute inset-0 flex justify-center pointer-events-none opacity-20">
           <div className="w-[1px] h-full bg-white/[0.2] absolute left-1/4"></div>
           <div className="w-[1px] h-full bg-white/[0.2] absolute right-1/4"></div>
           <div className="h-[1px] w-full bg-white/[0.2] absolute top-1/2"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             viewport={{ once: true }}
             className="w-12 h-12 flex items-center justify-center mb-8"
           >
              <div className="w-full h-full rounded border-2 border-white/20 rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                 <div className="w-4 h-4 rounded-sm bg-white/40 -rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              </div>
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl lg:text-[5rem] tracking-tight font-medium mb-6 leading-[1] max-w-3xl"
           >
              <span className="text-gradient">Code the future.</span> <br/>
              <span className="text-[#666]">Together.</span>
           </motion.h2>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
             viewport={{ once: true }}
             className="flex flex-col sm:flex-row items-center gap-4 mt-8"
           >
              <button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2">
                 Start coding
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button className="bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white rounded-full px-8 py-3.5 text-[14px] font-medium transition-all">
                 Contact sales
              </button>
           </motion.div>
        </div>
     </section>
  );
}
