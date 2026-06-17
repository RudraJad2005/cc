import { motion } from 'motion/react';

export function CompaniesSection() {
  return (
    <section className="py-24 flex flex-col items-center justify-center border-b border-white/[0.08] relative overflow-hidden bg-[#080808]">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),_transparent_50%)] pointer-events-none" />
       
       <motion.p 
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         viewport={{ once: true }}
         className="text-[#71717a] text-[12px] font-medium tracking-[0.2em] mb-12 text-center uppercase"
       >
         Powering the world's best engineering teams
       </motion.p>
       
       <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale pointer-events-none px-6 items-center"
       >
          <div className="text-2xl font-bold font-sans tracking-tighter hover:text-white transition-colors duration-500">Vercel</div>
          <div className="text-2xl font-bold font-serif italic hover:text-white transition-colors duration-500">Retool</div>
          <div className="text-2xl font-bold font-mono tracking-tighter hover:text-white transition-colors duration-500">Arc</div>
          <div className="text-xl flex items-center gap-2 font-bold tracking-tight hover:text-white transition-colors duration-500">
            <div className="w-5 h-5 bg-white rounded-sm transition-colors duration-500"></div>
            Raycast
          </div>
          <div className="text-2xl font-bold tracking-[0.1em] hover:text-white transition-colors duration-500">RAMP</div>
          <div className="text-2xl font-bold flex items-center gap-1 hover:text-white transition-colors duration-500">
             <div className="w-5 h-5 border-4 border-white rounded-full transition-colors duration-500"></div>
             Loom
          </div>
       </motion.div>
    </section>
  );
}
