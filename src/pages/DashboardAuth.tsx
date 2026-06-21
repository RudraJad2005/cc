import { useState, useEffect, useRef } from 'react';
import { Loader2, Search, Users, ChevronDown, Check, Plus, Unplug, ShieldAlert, Key, LogIn, Mail } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseInstances, getActiveInstance, setActiveInstanceId, removeSupabaseInstance, SupabaseInstance } from '../utils/supabaseInstances';

export function DashboardAuth() {
  const [instances, setInstances] = useState<SupabaseInstance[]>([]);
  const [activeInstance, setActiveInstance] = useState<SupabaseInstance | null>(null);
  
  const [showInstanceDropdown, setShowInstanceDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [users, setUsers] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState('');

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowInstanceDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const insts = getSupabaseInstances();
    setInstances(insts);
    const active = getActiveInstance();
    setActiveInstance(active);
    
    if (active) {
       fetchUsers(active);
    }
  }, []);

  const handleSwitchInstance = (inst: SupabaseInstance) => {
    setActiveInstanceId(inst.id);
    setActiveInstance(inst);
    setShowInstanceDropdown(false);
    fetchUsers(inst);
  };

  const fetchUsers = async (instance: SupabaseInstance) => {
    setLoadingData(true);
    setError('');
    setUsers([]);
    try {
       const client = createClient(instance.url, instance.key);
       const { data, error } = await client.auth.admin.listUsers();
       if (error) throw error;
       if (data && data.users) {
          setUsers(data.users);
       }
    } catch (err: any) {
       setError(err.message || 'Failed to fetch users');
    } finally {
       setLoadingData(false);
    }
  };

  if (!activeInstance) {
    return (
       <div className="flex-1 flex items-center justify-center bg-[#000]">
          <div className="text-gray-500">Please connect a Supabase instance first.</div>
       </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen overflow-hidden bg-[#000]">
      {/* Inner Sidebar */}
      <aside className="w-64 border-r border-white/[0.08] bg-[#020202] flex flex-col shrink-0">
        <div className="p-3 border-b border-white/[0.08]">
           <button onClick={() => window.location.href = '/dashboard/backend'} className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/[0.05]">
                 <Users className="w-3 h-3" />
              </div>
              Back to Projects
           </button>
        </div>
        <div className="h-14 flex items-center px-4 border-b border-white/[0.08] relative" ref={dropdownRef}>
           <button 
              onClick={() => setShowInstanceDropdown(!showInstanceDropdown)}
              className="flex items-center justify-between w-full hover:bg-white/[0.02] p-1.5 -ml-1.5 rounded-md transition-colors"
           >
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
                    <Users className="w-3 h-3 text-indigo-400" />
                 </div>
                 <span className="text-sm font-semibold tracking-tight text-white">{activeInstance.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
           </button>

           {showInstanceDropdown && (
              <div className="absolute top-full left-4 right-4 mt-1 bg-[#0a0a0a] border border-white/[0.08] rounded-lg shadow-xl overflow-hidden z-50">
                 <div className="max-h-64 overflow-y-auto">
                    {instances.map(inst => (
                       <div key={inst.id} className="flex items-center group">
                          <button 
                             onClick={() => handleSwitchInstance(inst)}
                             className="flex-1 flex items-center gap-2 px-3 py-2 hover:bg-white/[0.04] transition-colors text-left"
                          >
                             {inst.id === activeInstance.id ? <Check className="w-3.5 h-3.5 text-indigo-400" /> : <div className="w-3.5 h-3.5" />}
                             <span className="text-sm text-white truncate">{inst.name}</span>
                          </button>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
           <button onClick={() => window.location.href = '/dashboard/backend/editor'} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors text-left">
              Table Editor
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white bg-white/[0.08] rounded-md transition-colors text-left font-medium">
              Authentication
           </button>
           <button onClick={() => window.location.href = '/dashboard/backend/editor/storage'} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors text-left">
              Storage
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000]">
         {/* Top Toolbar */}
         <div className="h-14 border-b border-white/[0.08] flex items-center justify-between px-4 bg-[#020202] shrink-0">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-sm text-white font-medium">
                  <Users className="w-4 h-4 text-gray-400" />
                  Users
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => fetchUsers(activeInstance)} className="flex items-center gap-2 text-xs text-white hover:bg-white/[0.08] px-2 py-1.5 rounded-md transition-colors">
                  Refresh
               </button>
               <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm ml-2">
                  Add User <Plus className="w-3 h-3" />
               </button>
            </div>
         </div>

         {/* Data Grid */}
         <div className="flex-1 overflow-auto bg-[#000]">
            {loadingData ? (
               <div className="h-full flex items-center justify-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : error ? (
               <div className="h-full flex flex-col items-center justify-center text-red-500 gap-3">
                  <ShieldAlert className="w-12 h-12" />
                  <span className="text-sm">{error}</span>
               </div>
            ) : users.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                  <Users className="w-12 h-12 text-[#111]" />
                  <span className="text-sm">No users found</span>
               </div>
            ) : (
               <table className="min-w-full divide-y divide-white/[0.08] border-b border-white/[0.08]">
                 <thead className="bg-[#020202] sticky top-0 z-10 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
                   <tr>
                     <th className="w-10 px-4 py-2 border-r border-white/[0.08]">
                        <input type="checkbox" className="rounded border-white/[0.2] bg-[#050505] checked:bg-indigo-500" />
                     </th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] group hover:bg-white/[0.02] cursor-pointer">
                        <div className="flex items-center gap-2">
                           <Key className="w-3.5 h-3.5 text-yellow-500" />
                           <span className="text-[13px] font-medium text-white tracking-wide">id</span>
                           <span className="text-[10px] text-gray-500 font-mono tracking-tighter">uuid</span>
                        </div>
                     </th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] group hover:bg-white/[0.02] cursor-pointer">
                        <div className="flex items-center gap-2">
                           <Mail className="w-3.5 h-3.5 text-gray-400" />
                           <span className="text-[13px] font-medium text-white tracking-wide">email</span>
                           <span className="text-[10px] text-gray-500 font-mono tracking-tighter">text</span>
                        </div>
                     </th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] group hover:bg-white/[0.02] cursor-pointer">
                        <div className="flex items-center gap-2">
                           <span className="text-[13px] font-medium text-white tracking-wide">provider</span>
                           <span className="text-[10px] text-gray-500 font-mono tracking-tighter">text</span>
                        </div>
                     </th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] group hover:bg-white/[0.02] cursor-pointer">
                        <div className="flex items-center gap-2">
                           <span className="text-[13px] font-medium text-white tracking-wide">created_at</span>
                           <span className="text-[10px] text-gray-500 font-mono tracking-tighter">timestamptz</span>
                        </div>
                     </th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] group hover:bg-white/[0.02] cursor-pointer">
                        <div className="flex items-center gap-2">
                           <LogIn className="w-3.5 h-3.5 text-gray-400" />
                           <span className="text-[13px] font-medium text-white tracking-wide">last_sign_in_at</span>
                           <span className="text-[10px] text-gray-500 font-mono tracking-tighter">timestamptz</span>
                        </div>
                     </th>
                     <th className="px-4 py-2 w-full"></th>
                   </tr>
                 </thead>
                 <tbody className="bg-[#000] divide-y divide-white/[0.04]">
                   {users.map((user) => (
                     <tr key={user.id} className="hover:bg-white/[0.02] group">
                        <td className="px-4 py-1.5 border-r border-white/[0.08] bg-[#020202] group-hover:bg-white/[0.02]">
                           <input type="checkbox" className="rounded border-white/[0.2] bg-[#050505] checked:bg-indigo-500" />
                        </td>
                        <td className="px-4 py-1.5 border-r border-white/[0.08] text-[13px] text-gray-400 font-mono whitespace-nowrap">
                           {user.id}
                        </td>
                        <td className="px-4 py-1.5 border-r border-white/[0.08] text-[13px] text-white whitespace-nowrap">
                           {user.email || '—'}
                        </td>
                        <td className="px-4 py-1.5 border-r border-white/[0.08] text-[13px] text-gray-300 font-mono whitespace-nowrap">
                           {user.app_metadata?.provider || 'email'}
                        </td>
                        <td className="px-4 py-1.5 border-r border-white/[0.08] text-[13px] text-gray-400 font-mono whitespace-nowrap">
                           {user.created_at ? new Date(user.created_at).toLocaleString() : '—'}
                        </td>
                        <td className="px-4 py-1.5 border-r border-white/[0.08] text-[13px] text-gray-400 font-mono whitespace-nowrap">
                           {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—'}
                        </td>
                        <td className="px-4 py-1.5 w-full"></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
         </div>
      </main>
    </div>
  );
}
