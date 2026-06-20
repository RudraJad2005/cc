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

export function ProjectSettings() {
  const { projectId } = useParams();
  const { session } = useAuth();
  
  const [framework, setFramework] = useState<string>('Vite + React');
  
  // GitHub Integration States
  const [fileSystem, setFileSystem] = useState<any>(null);
  const [githubRepo, setGithubRepo] = useState<string | null>(null);
  const [githubInput, setGithubInput] = useState('');
  const [isLinkingGithub, setIsLinkingGithub] = useState(false);
  const [latestCommit, setLatestCommit] = useState<{ message: string; author: string; date: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [userRepos, setUserRepos] = useState<any[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const providerToken = session?.provider_token;

  // Environment Variables States
  const [envVars, setEnvVars] = useState<{id: string, key: string, value: string}[]>([]);
  const [showEnvValues, setShowEnvValues] = useState<Record<string, boolean>>({});
  const [isSavingEnv, setIsSavingEnv] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data } = await supabase.from('projects').select('user_id, file_system, framework, created_at').eq('name', projectId).single();
      if (data) {
        if (data.framework) setFramework(data.framework);

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
        }
      }
    };
    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    if (!providerToken) {
      setUserRepos([]);
      return;
    }
    const fetchUserRepos = async () => {
      setIsLoadingRepos(true);
      try {
        const res = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
          headers: { Authorization: `Bearer ${providerToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserRepos(data);
        }
      } catch (e) {} finally {
        setIsLoadingRepos(false);
      }
    };
    
    fetchUserRepos();
  }, [providerToken]);

  const fetchGithubData = async (repo: string) => {
    setIsSyncing(true);
    try {
      const headers: Record<string, string> = {};
      if (providerToken) {
        headers['Authorization'] = `Bearer ${providerToken}`;
      }
      
      const response = await fetch(`https://api.github.com/repos/${repo}/commits`, { headers });
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
    if (!githubInput) return;
    
    setIsLinkingGithub(true);
    let repo = githubInput.trim();
    
    // Automatically parse full GitHub URLs (e.g., https://github.com/user/repo.git)
    if (repo.includes('github.com/')) {
      repo = repo.split('github.com/')[1];
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
    }
    
    // Ensure it's in owner/repo format
    if (!repo.includes('/')) {
      setIsLinkingGithub(false);
      return;
    }
    
    try {
      // Create new config file
      const baseFileSystem = fileSystem || getTemplate(framework);
      const newFileSystem = {
        ...baseFileSystem,
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
      await fetchGithubData(repo);
      setGithubInput('');
    } catch (e) {
      console.error('Failed to link github:', e);
    } finally {
      setIsLinkingGithub(false);
    }
  };

  const handleOAuthLink = async () => {
    setIsLinkingGithub(true);
    
    try {
      const { error: linkError } = await supabase.auth.linkIdentity({ 
        provider: 'github', 
        options: { 
          scopes: 'repo',
          redirectTo: window.location.href
        } 
      });

      if (linkError) {
        // If already linked or fails, fallback to standard OAuth sign-in to upgrade scopes
        const { error: signInError } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            scopes: 'repo',
            redirectTo: window.location.href
          }
        });
        
        if (signInError) {
          console.error('Failed to authenticate with GitHub:', signInError);
          setIsLinkingGithub(false);
        }
      }
    } catch (err) {
      console.error(err);
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


  return (
    <div className="flex flex-col gap-8 w-full text-[#a1a1aa] pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
          <Settings className="w-6 h-6" /> Project Settings
        </h1>
      </div>

      <div className="flex flex-col gap-8">

        {/* GitHub Integration */}
        <div className="flex flex-col gap-6">
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
                  <p className="text-sm text-gray-500 mt-2 max-w-sm text-center">Link a public or private GitHub repository to view live commit statuses and sync code directly into your IDE.</p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-md mt-4">
                  {!providerToken ? (
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={handleOAuthLink}
                        disabled={isLinkingGithub}
                        className="w-full flex items-center justify-center gap-3 bg-[#0A0A0A] hover:bg-[#111] border border-white/[0.1] hover:border-white/[0.2] transition-colors text-white py-2.5 rounded-lg text-sm font-medium"
                      >
                        {isLinkingGithub ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                        Connect GitHub Account
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        Authorizing will allow Collab Code to access and display your private repositories.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="relative w-full">
                        <LinkIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="e.g. facebook/react" 
                          value={githubInput}
                          onFocus={() => { if (userRepos.length > 0) setShowRepoDropdown(true); }}
                          onBlur={() => setTimeout(() => setShowRepoDropdown(false), 200)}
                          onChange={(e) => setGithubInput(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg pl-9 pr-10 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
                        />
                        {isLoadingRepos && (
                          <Loader2 className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 animate-spin" />
                        )}
                        
                        {showRepoDropdown && userRepos.length > 0 && (
                          <div className="absolute z-20 w-full mt-2 bg-[#050505] border border-white/[0.1] rounded-xl max-h-60 overflow-y-auto shadow-2xl overflow-hidden no-scrollbar">
                            <div className="p-2 border-b border-white/[0.05] bg-white/[0.02] text-xs font-medium text-gray-500 sticky top-0 backdrop-blur-md">
                              Your Repositories
                            </div>
                            {userRepos.map((repo) => (
                              <button
                                key={repo.id}
                                onClick={() => { setGithubInput(repo.full_name); setShowRepoDropdown(false); }}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/[0.05] border-b border-white/[0.02] last:border-0 transition-colors text-left"
                              >
                                <span className="truncate">{repo.full_name}</span>
                                {repo.private ? <Lock className="w-3.5 h-3.5 text-yellow-500 shrink-0" /> : <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={handleLinkGithub}
                        disabled={isLinkingGithub || !githubInput}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {isLinkingGithub ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Connect Repository'}
                      </button>
                    </>
                  )}
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
                    onClick={async () => { 
                      try {
                        const newFileSystem = { ...fileSystem };
                        
                        // Find and delete the github config (case-insensitive key)
                        const githubConfigKey = Object.keys(newFileSystem).find(k => k.toLowerCase() === '.cc-github.json');
                        if (githubConfigKey) {
                          delete newFileSystem[githubConfigKey];
                        }
                        
                        // Save to Supabase
                        await supabase.from('projects').update({ file_system: newFileSystem }).eq('name', projectId);
                        
                        setFileSystem(newFileSystem);
                        setGithubRepo(null); 
                        setLatestCommit(null);
                      } catch (e) {
                        console.error('Failed to disconnect github:', e);
                      }
                    }}
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
        <div className="flex flex-col gap-6">
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
      
      {isInviteModalOpen && (
        <InviteUserModal 
          projectId={projectId} 
          onClose={() => setIsInviteModalOpen(false)} 
        />
      )}
    </div>
  );
}
