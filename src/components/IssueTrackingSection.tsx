import { motion } from 'motion/react';
import { TerminalSquare, FileCode2, PackageOpen, LayoutTemplate } from 'lucide-react';

export function IssueTrackingSection() {
  return (
    <section className="flex flex-col border-b border-white/[0.08] relative">
      <div className="w-full flex-col p-8 md:p-12 lg:p-20 xl:p-[100px] text-center flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-sm mask-fade-b opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.05),_transparent_60%)] pointer-events-none" />
        <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-3xl md:text-4xl lg:text-[3.5rem] tracking-tight font-medium mb-6 leading-[1.1] max-w-4xl relative z-10 mt-8"
        >
          <span className="text-gradient">Multiplayer workspaces</span> <br/>
          <span className="text-[#666]">you'll actually enjoy using.</span>
        </motion.h2>
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-lg text-[#71717a] max-w-2xl leading-relaxed tracking-wide mb-16 relative z-10"
        >
          Code alongside your teammates in real-time, request reviews in the same window, and see active file changes effortlessly.
        </motion.p>
        
        {/* Mock File System Interface */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="w-full max-w-[900px] rounded-xl border border-white/[0.1] bg-[#161616]/80 backdrop-blur-md shadow-2xl overflow-hidden relative z-10 flex flex-col text-left mb-8"
        >
           <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-white/[0.01]">
              <div className="flex items-center gap-4">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30"></div>
                    <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/30"></div>
                    <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30"></div>
                 </div>
                 <div className="text-[12px] font-medium text-gray-500 flex items-center gap-2">
                    <span className="bg-white/[0.06] text-white px-2 py-1 rounded text-[11px]">project-root/src/</span>
                    <span className="hover:text-gray-300 cursor-pointer transition-colors">components</span>
                    <span className="hover:text-gray-300 cursor-pointer transition-colors">api</span>
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col">
              <FileRow name="server.ts" tag="Express" branch="feature/auth" active={true} icon={<TerminalSquare className="w-4 h-4 text-green-400" />} />
              <FileRow name="App.tsx" tag="React" branch="main" active={false} icon={<FileCode2 className="w-4 h-4 text-blue-400" />} />
              <FileRow name="package.json" tag="Config" branch="main" active={false} icon={<PackageOpen className="w-4 h-4 text-orange-400" />} />
              <FileRow name="index.css" tag="Styling" branch="fix/layout" active={false} icon={<LayoutTemplate className="w-4 h-4 text-purple-400" />} />
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function FileRow({ name, tag, branch, active, icon }: { name: string, tag: string, branch: string, active: boolean, icon: React.ReactNode }) {
   return (
      <div className="flex items-center gap-4 py-3 px-4 border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition-colors group">
         <div className="w-5 opacity-70 group-hover:opacity-100 transition-opacity">
            {icon}
         </div>
         <div className={`text-[14px] font-mono flex-1 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-200 transition-colors'}`}>{name}</div>
         
         <div className="flex gap-3 items-center">
            <div className="text-[11px] text-gray-500 border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 rounded font-mono tracking-wide flex items-center gap-1.5">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 18h6" /></svg>
               {branch}
            </div>
            
            {/* Active editing avatars */}
            <div className={`flex -space-x-1.5 ${active ? 'opacity-100' : 'opacity-30'}`}>
               <div className="w-[20px] h-[20px] rounded-full ring-2 ring-[#161616] overflow-hidden bg-white/[0.1]">
                  <img src={`https://ui-avatars.com/api/?background=random&color=fff&name=${name}`} className="w-full h-full object-cover" alt="user" />
               </div>
               {active && (
                 <div className="w-[20px] h-[20px] rounded-full ring-2 ring-[#161616] overflow-hidden bg-white/[0.1]">
                    <img src={`https://ui-avatars.com/api/?background=random&color=fff&name=team`} className="w-full h-full object-cover" alt="user2" />
                 </div>
               )}
            </div>
         </div>
      </div>
   );
}
