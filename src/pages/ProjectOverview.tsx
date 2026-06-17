import { Link, useParams } from 'react-router-dom';
import { Code2, Users, FileCode2, Copy, Settings, Download, Trash2, ShieldCheck, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function ProjectOverview() {
  const { projectId } = useParams();
  const [copied, setCopied] = useState(false);
  const [projectOwner, setProjectOwner] = useState<string>('Loading...');
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchOwner = async () => {
      const { data } = await supabase.from('projects').select('user_id').eq('name', projectId).single();
      if (data?.user_id) {
        // Fetch user email or name if possible, for now just show ID or default
        const { data: authData } = await supabase.auth.admin?.getUserById(data.user_id) || { data: { user: null } };
        setProjectOwner(authData?.user?.email || 'RudraJad2005');
      }
    };
    fetchOwner();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;

    const presenceChannel = supabase.channel(`collab-code-${projectId}-presence`);

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        setActiveUsers(Object.keys(state).length);
      })
      .subscribe();

    return () => {
      presenceChannel.unsubscribe();
    };
  }, [projectId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/dashboard/projects/${projectId}/editor`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full text-[#a1a1aa] pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#050505]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[100px]"></div>

        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-[#050505] rounded-[11px] flex items-center justify-center">
                  <FileCode2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white tracking-tight">{projectId}</h1>
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Private Project
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              A real-time collaborative development environment. Open the Native IDE to start coding instantly in your browser.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link 
              to={`/dashboard/projects/${projectId}/editor`} 
              className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-semibold overflow-hidden transition-all hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite linear' }}></div>
              <Code2 className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Open Native IDE</span>
            </Link>
            <button 
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition-colors text-sm font-medium text-white"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied to Clipboard!' : 'Copy Invite Link'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Project Details */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-medium text-white">Project Details</h2>
          <div className="border border-white/[0.1] bg-[#020202] rounded-xl p-1 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-white/[0.05]">
              <span className="text-sm text-gray-500">Owner</span>
              <div className="flex items-center gap-2 text-sm text-white">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  {projectOwner.charAt(0).toUpperCase()}
                </div>
                {projectOwner}
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-white/[0.05]">
              <span className="text-sm text-gray-500">Framework</span>
              <span className="text-sm text-white flex items-center gap-1.5"><Cpu className="w-4 h-4 text-blue-400" /> Vite + React</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-white/[0.05]">
              <span className="text-sm text-gray-500">Created</span>
              <span className="text-sm text-white">Today</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-sm text-gray-500">Environment</span>
              <span className="text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md">Node.js 18.x</span>
            </div>
          </div>
        </div>

        {/* Multiplayer Status */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Collaboration
          </h2>
          <div className="border border-white/[0.1] bg-[#020202] rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 h-[218px]">
            <div className="relative flex items-center justify-center">
              {/* Pulsing dots */}
              <div className={`absolute w-16 h-16 rounded-full animate-ping ${activeUsers > 0 ? 'bg-emerald-500/20' : 'bg-gray-500/20'}`}></div>
              <div className={`relative w-12 h-12 bg-[#050505] border-2 rounded-full flex items-center justify-center z-10 ${activeUsers > 0 ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-gray-500'}`}>
                <Users className={`w-5 h-5 ${activeUsers > 0 ? 'text-emerald-400' : 'text-gray-400'}`} />
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">
                {activeUsers > 0 ? `${activeUsers} Editing Live` : 'Multiplayer is Ready'}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">
                {activeUsers > 0 
                  ? "Jump into the IDE to collaborate with them in real-time."
                  : "Share your invite link with others to code together in real-time."}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Danger Zone */}
      <div className="flex flex-col gap-6 mt-4">
        <h2 className="text-lg font-medium text-red-400 flex items-center gap-2">
          <Settings className="w-5 h-5" /> Advanced Options
        </h2>
        <div className="border border-red-500/20 bg-[#050505] rounded-xl overflow-hidden flex flex-col">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-white/[0.05] gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Export Project</span>
              <span className="text-xs text-gray-500">Download a .zip file of your source code.</span>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-xs font-medium text-white shrink-0">
              <Download className="w-3.5 h-3.5" /> Download ZIP
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Delete Project</span>
              <span className="text-xs text-gray-500">Permanently delete this project and all of its files.</span>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors text-xs font-medium text-red-400 shrink-0">
              <Trash2 className="w-3.5 h-3.5" /> Delete Project
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
