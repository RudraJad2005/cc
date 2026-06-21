import { Key, Plus, Search, Eye, EyeOff, Copy, MoreVertical, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export function ProjectEnv() {
  const [showSecret, setShowSecret] = useState<string | null>(null);

  const envVars = [
    { id: '1', key: 'DATABASE_URL', value: 'postgresql://postgres:secret@db.collab.app:5432/main', env: 'Production, Preview, Development' },
    { id: '2', key: 'NEXT_PUBLIC_SUPABASE_URL', value: 'https://xyz.supabase.co', env: 'Production, Preview' },
    { id: '3', key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3Mi...', env: 'Production, Preview, Development' },
    { id: '4', key: 'STRIPE_SECRET_KEY', value: 'sk_test_51Nx...8kK9', env: 'Development' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3 mb-2">
              <Key className="w-6 h-6 text-gray-400" /> Environment Variables
           </h1>
           <p className="text-sm text-gray-400">Manage environment variables for your application environments.</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            <Plus className="w-4 h-4" /> Add Variable
         </button>
      </div>

      <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.02] flex items-start gap-3 mt-2">
         <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
         <div className="flex flex-col">
            <h3 className="text-sm font-medium text-white mb-1">Keep your secrets secure</h3>
            <p className="text-sm text-yellow-500/80 leading-relaxed">
               Environment variables are encrypted at rest. Variables marked for Production are injected at build time and runtime. Do not store plain-text secrets in your repository.
            </p>
         </div>
      </div>

      <div className="flex flex-col border border-white/[0.1] rounded-xl bg-[#050505] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-white/[0.1] bg-[#0a0a0a]">
           <div className="relative w-full max-w-sm">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Search variables..." className="w-full bg-[#000] border border-white/[0.1] rounded-md pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/[0.3] placeholder:text-[#666]" />
           </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.1] text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#020202]">
           <div className="col-span-4">Key</div>
           <div className="col-span-4">Value</div>
           <div className="col-span-3">Environments</div>
           <div className="col-span-1"></div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-white/[0.05]">
           {envVars.map((env) => (
             <div key={env.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-4 flex items-center">
                   <span className="font-mono text-sm text-white">{env.key}</span>
                </div>
                
                <div className="col-span-4 flex items-center gap-2 pr-4">
                   <div className="flex-1 font-mono text-sm text-gray-400 truncate bg-black px-2 py-1 rounded border border-white/[0.05]">
                      {showSecret === env.id ? env.value : '••••••••••••••••••••••••'}
                   </div>
                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                         onClick={() => setShowSecret(showSecret === env.id ? null : env.id)}
                         className="p-1.5 hover:bg-white/[0.1] rounded text-gray-400 hover:text-white transition-colors"
                      >
                         {showSecret === env.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 hover:bg-white/[0.1] rounded text-gray-400 hover:text-white transition-colors">
                         <Copy className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                
                <div className="col-span-3 flex items-center gap-2 flex-wrap">
                   {env.env.split(', ').map(e => (
                      <span key={e} className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-gray-300">
                         {e}
                      </span>
                   ))}
                </div>
                
                <div className="col-span-1 flex items-center justify-end">
                   <button className="p-1.5 hover:bg-white/[0.1] rounded text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
