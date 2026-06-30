import { Link, useParams } from 'react-router-dom';
import { Code2, Users, FileCode2, Copy, Settings, Download, Trash2, ShieldCheck, Cpu, Package, Github, GitCommit, RefreshCw, Link as LinkIcon, CheckCircle2, Loader2, Key, Eye, EyeOff, Plus, Save, Lock, Globe, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { InviteUserModal } from '../components/InviteUserModal';
import { getTemplate } from '../lib/templates';

const getEnvironmentName = (framework: string) => {
  const fw = framework.toLowerCase();
  if (fw.includes('python') || fw.includes('django') || fw.includes('flask') || fw.includes('pytorch') || fw.includes('tensorflow') || fw.includes('scikit') || fw.includes('pandas') || fw.includes('jupyter') || fw.includes('openai')) return 'Python 3.10';
  if (fw.includes('go')) return 'Go 1.21';
  if (fw.includes('flutter')) return 'Dart / Flutter';
  if (fw.includes('swift')) return 'Swift 5';
  if (fw.includes('kotlin')) return 'Kotlin / JVM';
  return 'Node.js 18.x';
};

export function ProjectOverview() {
  const { projectId } = useParams();
  const { session } = useAuth();
  
  const [copied, setCopied] = useState(false);
  const [projectOwner, setProjectOwner] = useState<string>('Loading...');
  const [activeUsers, setActiveUsers] = useState(0);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [dependencies, setDependencies] = useState<Record<string, string>>({});
  const [framework, setFramework] = useState<string>('Vite + React');
  const [createdAt, setCreatedAt] = useState<string>('Today');
  
  const [fileSystem, setFileSystem] = useState<any>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data } = await supabase.from('projects').select('user_id, file_system, framework, created_at').eq('name', projectId).single();
      if (data) {
        if (data.user_id) {
          const { data: authData } = await supabase.auth.admin?.getUserById(data.user_id) || { data: { user: null } };
          setProjectOwner(authData?.user?.email || 'Unknown Owner');
        } else {
          setProjectOwner('Unknown Owner');
        }

        if (data.framework) setFramework(data.framework);
        if (data.created_at) {
          const date = new Date(data.created_at);
          setCreatedAt(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        }

        if (data.file_system) {
          setFileSystem(data.file_system);
          
          // Find README.md (case insensitive)
          const readmeKey = Object.keys(data.file_system).find(k => k.toLowerCase() === 'readme.md');
          if (readmeKey && data.file_system[readmeKey].file?.contents) {
            setReadmeContent(data.file_system[readmeKey].file.contents);
          }

          // Find package.json and extract dependencies
          const packageJsonKey = Object.keys(data.file_system).find(k => k.toLowerCase() === 'package.json');
          if (packageJsonKey && data.file_system[packageJsonKey].file?.contents) {
            try {
              const pkg = JSON.parse(data.file_system[packageJsonKey].file.contents);
              const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
              setDependencies(allDeps);
            } catch (e) {
              console.error('Failed to parse package.json:', e);
            }
          }
        }
      }
    };
    fetchProjectData();
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

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition-colors text-sm font-medium text-white"
            >
              <UserPlus className="w-4 h-4" />
              Invite
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] hover:bg-white/[0.05] transition-colors text-sm font-medium text-white"
            >
              <Download className="w-4 h-4" />
              Export
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
              <span className="text-sm text-white flex items-center gap-1.5"><Cpu className="w-4 h-4 text-blue-400" /> {framework}</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-white/[0.05]">
              <span className="text-sm text-gray-500">Created</span>
              <span className="text-sm text-white">{createdAt}</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-sm text-gray-500">Environment</span>
              <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md">{getEnvironmentName(framework)}</span>
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
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto mb-3">
                {activeUsers > 0 
                  ? "Jump into the IDE to collaborate with them in real-time."
                  : "Invite others to code together in real-time."}
              </p>
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                + Send an Invite
              </button>
            </div>
          </div>
        </div>



      </div>

      {/* Dependencies Viewer */}
      {Object.keys(dependencies).length > 0 && (
        <div className="flex flex-col gap-6 mt-4">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-400" /> Dependencies
          </h2>
          <div className="border border-white/[0.1] bg-[#020202] rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/[0.05]">
              {Object.entries(dependencies).map(([name, version]) => (
                <div key={name} className="flex items-center justify-between p-3 bg-[#050505] hover:bg-[#0a0a0a] transition-colors">
                  <span className="text-sm font-medium text-gray-300 truncate mr-2" title={name}>{name}</span>
                  <span className="text-xs font-mono text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded shrink-0">{version}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* README Preview */}
      <div className="flex flex-col gap-6 mt-4">
        <div className="border border-white/[0.1] bg-[#020202] rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-white/[0.05] bg-[#050505]">
            <FileCode2 className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-white">README.md</span>
          </div>
          <div className="p-6 md:p-8">
            {readmeContent ? (
              <article className="prose prose-invert prose-blue max-w-none prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-headings:font-bold prose-a:text-blue-400 hover:prose-a:text-blue-300 transition-colors">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readmeContent}
                </ReactMarkdown>
              </article>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-white/5 rounded-xl bg-white/[0.02]">
                <FileCode2 className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No README.md found</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Create a <code className="text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">README.md</code> file in your project's root directory and save it to see it beautifully rendered here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>


      
      {isInviteModalOpen && (
        <InviteUserModal 
          projectId={projectId} 
          onClose={() => setIsInviteModalOpen(false)} 
        />
      )}
    </div>
  );
}
