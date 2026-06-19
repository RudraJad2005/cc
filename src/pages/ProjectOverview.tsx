import { Link, useParams } from 'react-router-dom';
import { Code2, Users, FileCode2, Copy, Settings, Download, Trash2, ShieldCheck, Cpu, Package, Github, GitCommit, RefreshCw, Link as LinkIcon, CheckCircle2, Loader2, Key, Eye, EyeOff, Plus, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [copied, setCopied] = useState(false);
  const [projectOwner, setProjectOwner] = useState<string>('Loading...');
  const [activeUsers, setActiveUsers] = useState(0);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [dependencies, setDependencies] = useState<Record<string, string>>({});
  const [framework, setFramework] = useState<string>('Vite + React');
  const [createdAt, setCreatedAt] = useState<string>('Today');
  
  // GitHub Integration States
  const [fileSystem, setFileSystem] = useState<any>(null);
  const [githubRepo, setGithubRepo] = useState<string | null>(null);
  const [githubInput, setGithubInput] = useState('');
  const [isLinkingGithub, setIsLinkingGithub] = useState(false);
  const [latestCommit, setLatestCommit] = useState<{ message: string; author: string; date: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Environment Variables States
  const [envVars, setEnvVars] = useState<{id: string, key: string, value: string}[]>([]);
  const [showEnvValues, setShowEnvValues] = useState<Record<string, boolean>>({});
  const [isSavingEnv, setIsSavingEnv] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data } = await supabase.from('projects').select('user_id, file_system, framework, created_at').eq('name', projectId).single();
      if (data) {
        if (data.user_id) {
          const { data: authData } = await supabase.auth.admin?.getUserById(data.user_id) || { data: { user: null } };
          setProjectOwner(authData?.user?.email || 'RudraJad2005');
        }

        if (data.framework) setFramework(data.framework);
        if (data.created_at) {
          const date = new Date(data.created_at);
          setCreatedAt(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        }

        if (data.file_system) {
          setFileSystem(data.file_system);
          
          // Check for GitHub config
          const githubConfigKey = Object.keys(data.file_system).find(k => k.toLowerCase() === '.cc-github.json');
          if (githubConfigKey && data.file_system[githubConfigKey].file?.contents) {
            try {
              const config = JSON.parse(data.file_system[githubConfigKey].file.contents);
              if (config.repo) {
                setGithubRepo(config.repo);
                fetchGithubData(config.repo);
              }
            } catch(e) {}
          }

          // Check for .env file
          const envConfigKey = Object.keys(data.file_system).find(k => k.toLowerCase() === '.env');
          if (envConfigKey && data.file_system[envConfigKey].file?.contents) {
            try {
              const rawEnv = data.file_system[envConfigKey].file.contents;
              const parsedEnv = rawEnv.split('\n').filter((l: string) => l.trim() && !l.startsWith('#')).map((line: string) => {
                const [k, ...v] = line.split('=');
                let value = v.join('=');
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                return { id: Math.random().toString(36).substr(2, 9), key: k.trim(), value: value.trim() };
              });
              setEnvVars(parsedEnv);
            } catch(e) {}
          }
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

  const fetchGithubData = async (repo: string) => {
    setIsSyncing(true);
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/commits`);
      if (response.ok) {
        const commits = await response.json();
        if (commits.length > 0) {
          const latest = commits[0];
          setLatestCommit({
            message: latest.commit.message,
            author: latest.commit.author.name,
            date: new Date(latest.commit.author.date).toLocaleDateString()
          });
        }
      }
    } catch (e) {
      console.error('Failed to fetch github data:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLinkGithub = async () => {
    if (!githubInput || !githubInput.includes('/')) return;
    
    setIsLinkingGithub(true);
    const repo = githubInput.trim();
    
    try {
      // Create new config file
      const newFileSystem = {
        ...fileSystem,
        '.cc-github.json': {
          file: {
            contents: JSON.stringify({ repo })
          }
        }
      };
      
      // Save to Supabase
      await supabase.from('projects').update({ file_system: newFileSystem }).eq('name', projectId);
      
      setFileSystem(newFileSystem);
      setGithubRepo(repo);
      setIsLinkingGithub(false);
      setGithubInput('');
      
      fetchGithubData(repo);
    } catch (e) {
      console.error('Failed to save github link:', e);
      setIsLinkingGithub(false);
    }
  };

  const handleSaveEnvVars = async () => {
    setIsSavingEnv(true);
    try {
      const envString = envVars.filter(e => e.key.trim()).map(e => `${e.key}="${e.value}"`).join('\n');
      
      const newFileSystem = {
        ...fileSystem,
        '.env': {
          file: {
            contents: envString
          }
        }
      };
      
      await supabase.from('projects').update({ file_system: newFileSystem }).eq('name', projectId);
      setFileSystem(newFileSystem);
    } catch (e) {
      console.error('Failed to save env vars:', e);
    } finally {
      setIsSavingEnv(false);
    }
  };

  const updateEnvVar = (id: string, field: 'key'|'value', val: string) => {
    setEnvVars(envVars.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const removeEnvVar = (id: string) => {
    setEnvVars(envVars.filter(e => e.id !== id));
  };

  const addEnvVar = () => {
    setEnvVars([...envVars, { id: Math.random().toString(36).substr(2, 9), key: '', value: '' }]);
  };

  const toggleShowEnv = (id: string) => {
    setShowEnvValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">
                {activeUsers > 0 
                  ? "Jump into the IDE to collaborate with them in real-time."
                  : "Share your invite link with others to code together in real-time."}
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Github className="w-5 h-5 text-gray-300" /> GitHub Integration
          </h2>
          <div className="border border-white/[0.1] bg-[#020202] rounded-xl p-6">
            {!githubRepo ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 py-4">
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1]">
                  <Github className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Connect Repository</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    Link a public GitHub repository to view live commit statuses and sync code directly into your IDE.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 w-full max-w-md">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="e.g. facebook/react" 
                      value={githubInput}
                      onChange={(e) => setGithubInput(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <button 
                    onClick={handleLinkGithub}
                    disabled={isLinkingGithub || !githubInput}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isLinkingGithub ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Connect'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/[0.1] shrink-0">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium text-sm">{githubRepo}</h3>
                      <span className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </span>
                    </div>
                    {latestCommit ? (
                      <div className="flex flex-col mt-2 gap-1.5">
                        <p className="text-sm text-gray-400 line-clamp-1 border-l-2 border-white/[0.1] pl-3 py-0.5">
                          {latestCommit.message}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 pl-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {latestCommit.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitCommit className="w-3 h-3" /> {latestCommit.date}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                        {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetching latest commit...'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => fetchGithubData(githubRepo)}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.1] hover:bg-white/[0.05] transition-colors text-sm text-white disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} /> Sync
                  </button>
                  <button 
                    onClick={() => { setGithubRepo(null); setLatestCommit(null); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Environment Variables */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-yellow-400" /> Environment Variables
            </h2>
            <button 
              onClick={handleSaveEnvVars}
              disabled={isSavingEnv}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isSavingEnv ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Variables</>}
            </button>
          </div>
          
          <div className="border border-white/[0.1] bg-[#020202] rounded-xl overflow-hidden flex flex-col">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-white/[0.05] bg-[#050505] text-sm font-medium text-gray-400">
              <div>Key</div>
              <div>Value</div>
              <div className="w-8"></div>
            </div>
            
            <div className="flex flex-col">
              {envVars.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  No environment variables added yet. Click "Add Variable" to get started.
                </div>
              ) : (
                envVars.map((env) => (
                  <div key={env.id} className="grid grid-cols-[1fr_2fr_auto] gap-4 p-4 border-b border-white/[0.05] items-center group">
                    <input 
                      type="text" 
                      placeholder="e.g. API_KEY"
                      value={env.key}
                      onChange={(e) => updateEnvVar(env.id, 'key', e.target.value)}
                      className="bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 font-mono"
                    />
                    <div className="relative flex items-center">
                      <input 
                        type={showEnvValues[env.id] ? "text" : "password"}
                        placeholder="Value"
                        value={env.value}
                        onChange={(e) => updateEnvVar(env.id, 'value', e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 font-mono pr-10"
                      />
                      <button 
                        onClick={() => toggleShowEnv(env.id)}
                        className="absolute right-3 text-gray-500 hover:text-white transition-colors"
                      >
                        {showEnvValues[env.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button 
                      onClick={() => removeEnvVar(env.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-[#050505] border-t border-white/[0.05]">
              <button 
                onClick={addEnvVar}
                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Variable
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
