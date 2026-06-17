import { Plus, GitBranch, Terminal, Activity, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
         <Link to="/dashboard/projects" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
         </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         {[
           { label: "Active Deployments", value: "14", trend: "+2 this week" },
           { label: "Compute Hours", value: "342h", trend: "-12% vs last month" },
           { label: "Collaborators", value: "8", trend: "+1 this week" },
         ].map((stat, i) => (
           <div key={i} className="flex flex-col p-5 bg-white/[0.01] border border-white/[0.08] rounded-xl hover:bg-white/[0.03] transition-colors">
              <span className="text-[#888] text-sm mb-2 font-medium">{stat.label}</span>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
                <span className="text-xs text-[#888] mb-1">{stat.trend}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-lg font-medium tracking-tight">Recent Projects</h2>
          
          <div className="flex flex-col gap-3">
            {[
               { name: "acme-corp-web", status: "Ready", time: "2m ago", env: "Production", icon: <GitBranch className="w-4 h-4" /> },
               { name: "internal-dashboard-v2", status: "Building", time: "15m ago", env: "Preview", icon: <Terminal className="w-4 h-4" /> },
               { name: "payment-service", status: "Ready", time: "2h ago", env: "Production", icon: <Activity className="w-4 h-4" /> }
            ].map((p, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl hover:border-white/[0.15] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.status === 'Ready' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                        {p.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className="font-medium text-sm text-white group-hover:text-indigo-400 transition-colors">{p.name}</span>
                        <div className="flex items-center gap-2 text-xs text-[#666] mt-1 hover:cursor-pointer">
                           <span>alex-rivera/main</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex flex-col items-end hidden sm:flex">
                     <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-[10px] uppercase tracking-wider text-[#a1a1aa] font-mono">
                           {p.env}
                        </div>
                        <span className="text-xs text-[#71717a] font-mono">{p.time}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${p.status === 'Ready' ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${p.status === 'Ready' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                        </span>
                        <span className="text-xs text-white capitalize">{p.status}</span>
                     </div>
                  </div>
                  
                  <div className="sm:hidden text-[#888]">
                     <MoreHorizontal className="w-5 h-5" />
                  </div>
               </div>
            ))}
          </div>
          
          <div className="mt-2">
            <Link to="/dashboard/projects" className="text-sm text-[#888] hover:text-white transition-colors flex items-center gap-2 w-max">
              View all projects <span>&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
           <h2 className="text-lg font-medium tracking-tight">Activity Log</h2>
           
           <div className="p-5 border border-white/[0.05] rounded-xl bg-white/[0.01] flex flex-col gap-6">
              {[
                 { action: "Deployed to Production", project: "acme-corp-web", time: "2m ago" },
                 { action: "Pushed commit to main", project: "acme-corp-web", time: "5m ago" },
                 { action: "Added environment variable", project: "payment-service", time: "1h ago" },
                 { action: "Invited user sarah@example.com", project: "internal-dashboard-v2", time: "3h ago" },
              ].map((log, i) => (
                 <div key={i} className="flex gap-4 relative">
                    {i !== 3 && <div className="absolute left-[3px] top-6 bottom-[-24px] w-px bg-white/[0.05]" />}
                    <div className="w-2 h-2 rounded-full bg-[#333] shrink-0 mt-1.5 z-10 box-content border-4 border-[#010101]" />
                    <div className="flex flex-col gap-1 w-full">
                       <span className="text-sm text-gray-300">{log.action}</span>
                       <div className="flex items-center justify-between">
                         <span className="text-[11px] text-[#666] font-mono">{log.project}</span>
                         <span className="text-[11px] text-[#555] font-mono">{log.time}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
