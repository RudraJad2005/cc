import { Search, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export function DashboardDeployments() {
  const deployments = [
    { id: 'dpl_98s7df98sd', project: 'collab-marketing', env: 'Production', branch: 'main', commit: 'Update hero section text', hash: 'a1b2c3d', status: 'Ready', duration: '45s', time: '2m ago' },
    { id: 'dpl_12k3j123kl', project: 'docs-site', env: 'Preview', branch: 'feat/new-api', commit: 'Add authentication docs', hash: '8f92js9', status: 'Building', duration: '-', time: 'Just now' },
    { id: 'dpl_m123m12km3', project: 'auth-service', env: 'Production', branch: 'main', commit: 'Fix OAuth token refresh bug', hash: 'c9d8e7f', status: 'Ready', duration: '1m 12s', time: '5h ago' },
    { id: 'dpl_987asdf89s', project: 'dashboard-ui', env: 'Preview', branch: 'fix/sidebar-bug', commit: 'Revert sidebar changes', hash: '1a2b3c4', status: 'Error', duration: '22s', time: '1d ago' },
    { id: 'dpl_k1j23k123j', project: 'collab-marketing', env: 'Preview', branch: 'staging', commit: 'Test new pricing grid', hash: '4d5e6f7', status: 'Ready', duration: '41s', time: '3d ago' },
    { id: 'dpl_z9x8c7v6b5', project: 'auth-service', env: 'Production', branch: 'main', commit: 'Merge pull request #42', hash: '0p9o8i7', status: 'Ready', duration: '1m 05s', time: '1w ago' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Deployments</h1>
            <p className="text-sm text-gray-400">View and manage all deployments across your workspace.</p>
         </div>
         <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
               type="text" 
               placeholder="Search deployments..." 
               className="w-full bg-[#050505] border border-white/[0.1] rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors placeholder:text-[#666]"
            />
         </div>
      </div>

      {/* Deployments Table/List */}
      <div className="rounded-xl border border-white/[0.1] bg-[#020202] overflow-hidden flex flex-col">
         {/* Table Header (hidden on mobile) */}
         <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/[0.1] text-xs font-medium text-gray-500 bg-[#050505]">
            <div className="col-span-3">Project & Environment</div>
            <div className="col-span-5">Commit</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Time</div>
         </div>

         {/* List Items */}
         <div className="flex flex-col divide-y divide-white/[0.05]">
            {deployments.map((dep) => (
               <div key={dep.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  
                  {/* Project & Env */}
                  <div className="col-span-1 md:col-span-3 flex flex-col gap-1">
                     <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{dep.project}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500">{dep.id}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${dep.env === 'Production' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-white/[0.05] text-gray-400 border border-white/[0.1]'}`}>
                           {dep.env}
                        </span>
                     </div>
                  </div>

                  {/* Commit Details */}
                  <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                     <span className="text-sm text-gray-300 truncate">{dep.commit}</span>
                     <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-mono bg-white/[0.05] px-1 rounded">{dep.branch}</span>
                        <span>•</span>
                        <span className="font-mono">{dep.hash}</span>
                     </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 md:col-span-2 flex items-center">
                     {dep.status === 'Ready' && <span className="flex items-center gap-2 text-emerald-400 text-sm"><CheckCircle2 className="w-4 h-4" /> Ready</span>}
                     {dep.status === 'Building' && <span className="flex items-center gap-2 text-amber-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Building</span>}
                     {dep.status === 'Error' && <span className="flex items-center gap-2 text-red-400 text-sm"><XCircle className="w-4 h-4" /> Error</span>}
                  </div>

                  {/* Time & Duration */}
                  <div className="col-span-1 md:col-span-2 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-1">
                     <span className="text-sm text-gray-400">{dep.time}</span>
                     <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" /> {dep.duration}
                     </div>
                  </div>

               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
