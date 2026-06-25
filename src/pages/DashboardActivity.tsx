import { useState, useEffect } from 'react';
import { Loader2, Activity as ActivityIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

function getRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function DashboardActivity() {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'Developer';

  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      const activityRes = await supabase
        .from('activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (activityRes.data) setActivity(activityRes.data);
      setLoading(false);
    }
    
    fetchData();

    // Set up real-time subscription for live updates!
    const channel = supabase.channel('realtime:activity')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activity' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">Activity</h1>
         </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
           <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="flex-1 overflow-auto rounded-xl border border-white/[0.1] bg-[#000]">
           <table className="min-w-full divide-y divide-white/[0.08]">
             <thead className="bg-[#020202] sticky top-0 z-10 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
               <tr>
                 <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide">Timestamp</th>
                 <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide">Action</th>
                 <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide">Target</th>
                 <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide">User</th>
                 <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide">Status</th>
               </tr>
             </thead>
             <tbody className="bg-[#000] divide-y divide-white/[0.04]">
                {activity.length === 0 ? (
                   <tr>
                      <td colSpan={5} className="py-20 text-center">
                         <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-4">
                               <ActivityIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">No activity yet</h3>
                            <p className="text-sm text-gray-400 text-center max-w-sm">Activity will appear here once you interact with projects.</p>
                         </div>
                      </td>
                   </tr>
                ) : (
                   activity.map((event) => (
                      <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                         <td className="px-4 py-2.5 text-[13px] text-gray-400 font-mono border-r border-white/[0.08] whitespace-nowrap">
                            {new Date(event.created_at).toLocaleString()}
                         </td>
                         <td className="px-4 py-2.5 text-[13px] text-white border-r border-white/[0.08]">
                            {event.action}
                         </td>
                         <td className="px-4 py-2.5 text-[13px] text-gray-300 font-mono border-r border-white/[0.08]">
                            {event.target}
                         </td>
                         <td className="px-4 py-2.5 text-[13px] text-white border-r border-white/[0.08]">
                            <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                                  {userName.charAt(0).toUpperCase()}
                               </div>
                               {userName}
                            </div>
                         </td>
                         <td className="px-4 py-2.5 text-[13px] border-r border-white/[0.08]">
                            {event.status === 'success' && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-emerald-400 bg-emerald-400/10 border border-emerald-400/20"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Success</span>}
                            {event.status === 'building' && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-amber-400 bg-amber-400/10 border border-amber-400/20"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>Building</span>}
                            {event.status === 'failed' && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-red-400 bg-red-400/10 border border-red-400/20"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>Failed</span>}
                         </td>
                      </tr>
                   ))
                )}
             </tbody>
           </table>
        </div>
      )}

    </div>
  );
}
