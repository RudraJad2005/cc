import { Server, Github, Terminal, GitBranch, ArrowRight, Check, Copy, Loader2, Globe, Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function getRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function ProjectDeployments() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [deployments, setDeployments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDeployments = async () => {
    if (!user || !projectId) return;
    try {
      const { data, error } = await supabase
        .from('deployments')
        .select('*')
        .eq('project_name', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code !== 'PGRST') {
          setErrorMsg(error.message);
        }
      } else if (data) {
        setDeployments(data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load deployments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeployments();
  }, [user, projectId]);

  // Live polling for in-progress builds
  useEffect(() => {
    const hasActiveBuilds = deployments.some(d => d.status === 'Building' || d.status === 'Queued');
    if (!hasActiveBuilds) return;

    const interval = setInterval(() => {
      fetchDeployments();
    }, 3000);

    return () => clearInterval(interval);
  }, [deployments]);

  const copyCommand = () => {
    navigator.clipboard.writeText('collabcode deploy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full pb-20 max-w-[1000px] mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-white tracking-tight">Deployments</h1>
        </div>
        {deployments.length > 0 && (
          <button 
            onClick={fetchDeployments} 
            className="px-3 py-1.5 bg-[#050505] hover:bg-white/[0.05] border border-white/[0.1] text-gray-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            Refresh
          </button>
        )}
      </div>

      {loading && deployments.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : deployments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-white/[0.08] rounded-2xl bg-[#050505] relative overflow-hidden mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.1] flex items-center justify-center mb-6 relative z-10">
            <Server className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-3 relative z-10">No deployments yet</h2>
          <p className="text-gray-400 max-w-md relative z-10 leading-relaxed text-sm">
            Your project is ready to go live. Connect a Git repository for continuous integration, or deploy manually from your terminal.
          </p>
          
          <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
        </div>
      ) : (
        /* List of Deployments */
        <div className="flex flex-col gap-4 mb-8">
          {deployments.map((dep) => (
            <div 
              key={dep.id} 
              className="p-5 rounded-xl border border-white/[0.08] bg-[#020202] hover:bg-[#050505] hover:border-white/[0.15] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-white/[0.1] bg-[#050505] flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-white">{dep.id}</span>
                    
                    {/* Status badges */}
                    {dep.status === 'Ready' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> Ready
                      </span>
                    )}
                    {dep.status === 'Building' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse"></div> Building
                      </span>
                    )}
                    {dep.status === 'Error' && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div> Error
                      </span>
                    )}
                    {dep.status === 'Queued' && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-medium flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> Queued
                      </span>
                    )}
                  </div>
                  
                  {dep.url && dep.status === 'Ready' ? (
                    <a 
                      href={dep.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-gray-400 hover:text-white flex items-center gap-1 hover:underline transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" /> {dep.url.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3 text-gray-600" />
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> {`http://${dep.project_name}-${dep.id}.localhost:5000`.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex sm:flex-col sm:items-end gap-2 justify-between pl-14 sm:pl-0">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <GitBranch className="w-3.5 h-3.5 text-gray-600" />
                  <span className="font-mono bg-white/[0.03] px-1.5 py-0.5 border border-white/[0.05] rounded">main</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" /> {getRelativeTime(dep.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: Git */}
        <div className="p-6 rounded-xl border border-white/[0.08] bg-[#050505] hover:bg-white/[0.02] transition-colors flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/[0.1] flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Connect Git Repository</h3>
              <p className="text-xs text-gray-500">Continuous deployment</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">
            Automatically deploy your project on every push to a branch. We'll build and deploy your app instantly.
          </p>
          
          <div className="flex items-center gap-2 mt-auto">
            <button 
              onClick={() => navigate(`/dashboard/projects/${projectId}/settings`)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Github className="w-4 h-4" /> Connect GitHub
            </button>
          </div>
        </div>

        {/* Option 2: CLI */}
        <div className="p-6 rounded-xl border border-white/[0.08] bg-[#050505] hover:bg-white/[0.02] transition-colors flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/[0.1] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Deploy from Terminal</h3>
              <p className="text-xs text-gray-500">Manual deployment</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">
            Run our CLI command from your project's root directory to deploy your current local environment.
          </p>
          
          <div className="border border-white/[0.1] rounded-lg bg-[#000] overflow-hidden mt-auto">
            <div className="flex items-center justify-between p-3">
              <code className="text-sm text-gray-300 font-mono">
                collabcode deploy
              </code>
              <button onClick={copyCommand} className="text-gray-500 hover:text-white transition-colors">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-white/[0.08] pt-8">
        <h3 className="text-sm font-medium text-white mb-4">Deployment Settings</h3>
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-gray-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Production Branch</span>
              <span className="text-xs text-gray-500">The branch used for your primary production deployments.</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#111] hover:bg-[#222] border border-white/[0.1] text-gray-300 text-sm font-medium rounded-lg transition-colors">
            main <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
