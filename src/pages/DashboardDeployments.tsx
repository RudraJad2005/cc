import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Clock, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';

export function DashboardDeployments() {
  const [deployments, setDeployments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeployments() {
      const { data } = await supabase
        .from('deployments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setDeployments(data);
      setLoading(false);
    }
    
    fetchDeployments();

    // Set up real-time subscription for live updates!
    const channel = supabase.channel('realtime:deployments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deployments' }, () => {
        fetchDeployments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

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
            <div className="col-span-5">Commit / Info</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Time</div>
         </div>

         {/* List Items */}
         <div className="flex flex-col divide-y divide-white/[0.05]">
            {loading ? (
              <div className="p-8 flex justify-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : deployments.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-gray-500">
                <p>No deployments found.</p>
              </div>
            ) : (
              deployments.map((dep) => (
                <div key={dep.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors cursor-pointer group" onClick={() => window.open(`https://${dep.project_name}-${dep.id}.52.172.229.65.nip.io/`, '_blank')}>
                    
                    {/* Project & Env */}
                    <div className="col-span-1 md:col-span-3 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                          <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{dep.project_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-gray-500">{dep.id.slice(0, 12)}...</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20`}>
                            Production
                          </span>
                      </div>
                    </div>

                    {/* Commit Details */}
                    <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                      <span className="text-sm text-gray-300 truncate">Manual ZIP Upload Deployment</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-mono bg-white/[0.05] px-1 rounded">main</span>
                          <span>•</span>
                          <span className="font-mono">{dep.commit_hash || 'manual-build'}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 md:col-span-2 flex items-center">
                      {dep.status === 'Ready' && <span className="flex items-center gap-2 text-emerald-400 text-sm"><CheckCircle2 className="w-4 h-4" /> Ready</span>}
                      {dep.status === 'Building' && <span className="flex items-center gap-2 text-blue-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Building</span>}
                      {dep.status === 'Queued' && <span className="flex items-center gap-2 text-amber-400 text-sm"><AlertCircle className="w-4 h-4" /> Queued</span>}
                      {dep.status === 'Error' && <span className="flex items-center gap-2 text-red-400 text-sm"><XCircle className="w-4 h-4" /> Error</span>}
                    </div>

                    {/* Time & Actions */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-4">
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-1">
                        <span className="text-sm text-gray-400">{formatTimeAgo(dep.created_at)}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" /> {dep.updated_at ? `${Math.floor((new Date(dep.updated_at).getTime() - new Date(dep.created_at).getTime()) / 1000)}s` : '-'}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this deployment?')) {
                            supabase.from('deployments').delete().eq('id', dep.id).then(() => {
                              // Local state update or let real-time handle it
                            });
                          }
                        }}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                        title="Delete Deployment"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>

                </div>
              ))
            )}
         </div>
      </div>
    </div>
  );
}
