import { motion } from 'motion/react';
import { Search, Plus, MoreVertical, GitBranch, Clock } from 'lucide-react';

export function Projects() {
  const projects = [
    { name: "acme-corp-web", framework: "Next.js", status: "Ready", updated: "2m ago", url: "acme.collab.app" },
    { name: "internal-dashboard-v2", framework: "Vite/React", status: "Building", updated: "15m ago", url: "dash.collab.app" },
    { name: "payment-service", framework: "Express", status: "Ready", updated: "2h ago", url: "api.collab.app" },
    { name: "marketing-site", framework: "Astro", status: "Failed", updated: "1d ago", url: "marketing.collab.app" },
    { name: "auth-worker", framework: "Cloudflare Workers", status: "Ready", updated: "3d ago", url: "auth.collab.app" },
    { name: "legacy-app", framework: "Create React App", status: "Ready", updated: "1w ago", url: "old.collab.app" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto w-full flex flex-col min-h-full">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
         <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
         
         <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors"
              />
            </div>
            <button className="bg-white text-black px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shrink-0">
               <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New</span>
            </button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: i * 0.05 }}
               className="flex flex-col p-5 bg-white/[0.01] border border-white/[0.05] hover:border-white/[0.15] transition-all rounded-xl group cursor-pointer"
             >
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] flex items-center justify-center font-mono text-xs shadow-inner">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                         <span className="font-medium text-white text-sm group-hover:text-indigo-400 transition-colors">{p.name}</span>
                         <span className="text-xs text-[#888] font-mono hover:underline">{p.url}</span>
                      </div>
                   </div>
                   <button className="text-[#666] hover:text-white transition-colors p-1 rounded hover:bg-white/[0.05]">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </div>

                <div className="mt-2 mb-6">
                   <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[11px] text-[#a1a1aa] font-mono">
                      {p.framework}
                   </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.05]">
                   <div className="flex items-center gap-4 text-[11px] text-[#71717a] font-mono">
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {p.updated}</span>
                      <span className="flex items-center gap-1.5"><GitBranch className="w-3 h-3" /> main</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${p.status === 'Ready' ? 'bg-green-400' : p.status === 'Building' ? 'bg-blue-400' : 'bg-red-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${p.status === 'Ready' ? 'bg-green-500' : p.status === 'Building' ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                      </span>
                   </div>
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}
