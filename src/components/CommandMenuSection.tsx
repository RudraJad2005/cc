import { motion } from 'motion/react';
import { Search, Code2, Server } from 'lucide-react';

export function CommandMenuSection() {
  return (
    <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative">
      <div className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] relative min-h-[400px] overflow-hidden">
         <div className="absolute inset-0 bg-grid-sm mask-fade opacity-50 pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),_transparent_70%)] pointer-events-none" />

         <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-[340px] rounded-xl border border-white/[0.1] bg-[#141414]/90 backdrop-blur-xl glow-ring overflow-hidden relative z-10 flex flex-col animate-floaty"
         >
            <div className="flex items-center gap-3 p-4 border-b border-white/[0.08]">
                <Search className="w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Type a command or search..." 
                  className="bg-transparent border-none outline-none text-[14px] text-white placeholder-gray-500 w-full font-medium tracking-wide"
                  readOnly
                  value="> Run"
                />
            </div>
            <div className="p-2 flex flex-col gap-1">
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.06] text-white text-[13px] font-medium cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-white/[0.1] flex items-center justify-center">
                            <Server className="w-3 h-3 text-blue-400" />
                        </div>
                        Start dev server (Port 3000)
                    </div>
                    <kbd className="flex items-center gap-1 font-sans text-gray-500 bg-white/[0.05] border border-white/[0.05] rounded px-1.5 py-0.5 text-[10px]">
                         ↵
                    </kbd>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/[0.03] text-[13px] font-medium cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-white/[0.05] flex items-center justify-center text-gray-500">
                             <Code2 className="w-3 h-3" />
                        </div>
                        Run all tests
                    </div>
                    <div className="flex gap-1">
                       <kbd className="flex items-center justify-center w-5 h-5 font-sans text-gray-500 bg-white/[0.05] border border-white/[0.05] rounded text-[10px]">⇧</kbd>
                       <kbd className="flex items-center justify-center w-5 h-5 font-sans text-gray-500 bg-white/[0.05] border border-white/[0.05] rounded text-[10px]">T</kbd>
                    </div>
                </div>
            </div>
         </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full lg:w-[55%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center relative"
      >
        <h2 className="text-3xl md:text-4xl lg:text-[3rem] tracking-tight font-medium mb-6 leading-[1.1]">
          <span className="text-gradient">A terminal at your fingertips.</span> <br/>
          <span className="text-[#666]">Run workloads, <br/>just a keystroke away.</span>
        </h2>
        <p className="text-lg text-[#71717a] max-w-xl leading-relaxed tracking-wide">
          Complete any dev action in seconds with the global command menu. Stop hunting for CLI tools and navigating through complex scripts.
        </p>
      </motion.div>
    </section>
  );
}
