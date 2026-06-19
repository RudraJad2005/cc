import React, { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { GitBranch, Github, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SourceControlPanelProps {
  webcontainer: WebContainer | null;
}

export function SourceControlPanel({ webcontainer }: SourceControlPanelProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [message, setMessage] = useState('Initial commit from IDE');
  
  const [isPushing, setIsPushing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedRepo = localStorage.getItem('github_repo');
    if (savedRepo) setRepoUrl(savedRepo);

    // Try to read the repo from the project config if webcontainer is ready
    if (webcontainer) {
      webcontainer.fs.readFile('.cc-github.json', 'utf-8')
        .then((content) => {
          try {
            const config = JSON.parse(content);
            if (config.repo) setRepoUrl(config.repo);
          } catch(e) {}
        })
        .catch(() => {});
    }
  }, [webcontainer]);

  const handlePush = async () => {
    if (!webcontainer) return;
    if (!repoUrl || !message || !branch) {
      setError('Please fill in all fields');
      return;
    }

    setIsPushing(true);
    setError(null);
    setSuccess(false);

    try {
      // Fetch OAuth provider token from active Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.provider_token;
      
      if (!token) {
        throw new Error('No GitHub access token found. Please ensure you logged in via GitHub.');
      }

      localStorage.setItem('github_repo', repoUrl);

      const match = repoUrl.match(/github\.com\/([^/]+)\/([^/.]+)/);
      if (!match) throw new Error("Invalid GitHub URL. Must be like https://github.com/owner/repo");
      const owner = match[1];
      const repo = match[2];

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      };

      const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`, { headers });
      if (!refRes.ok) throw new Error(`Failed to fetch branch ${branch}. Does the repo/branch exist? Check token permissions.`);
      const refData = await refRes.json();
      const latestCommitSha = refData.object.sha;

      const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
      if (!commitRes.ok) throw new Error('Failed to fetch latest commit');
      const commitData = await commitRes.json();
      const baseTreeSha = commitData.tree.sha;

      const treeItems: any[] = [];
      
      const traverseAndCreateBlobs = async (dirPath: string) => {
        const entries = await webcontainer.fs.readdir(dirPath, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
          
          const fullPath = dirPath === '/' ? `/${entry.name}` : `${dirPath}/${entry.name}`;
          const relativePath = fullPath.substring(1); 
          
          if (entry.isDirectory()) {
            await traverseAndCreateBlobs(fullPath);
          } else {
            const content = await webcontainer.fs.readFile(fullPath, 'utf-8');
            
            const blobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                content: content,
                encoding: 'utf-8'
              })
            });
            if (!blobRes.ok) throw new Error(`Failed to create blob for ${relativePath}`);
            const blobData = await blobRes.json();
            
            treeItems.push({
              path: relativePath,
              mode: '100644',
              type: 'blob',
              sha: blobData.sha
            });
          }
        }
      };

      await traverseAndCreateBlobs('/');

      const createTreeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeItems
        })
      });
      if (!createTreeRes.ok) throw new Error('Failed to create tree');
      const newTreeData = await createTreeRes.json();

      const createCommitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: message,
          tree: newTreeData.sha,
          parents: [latestCommitSha]
        })
      });
      if (!createCommitRes.ok) throw new Error('Failed to create commit');
      const newCommitData = await createCommitRes.json();

      const updateRefRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          sha: newCommitData.sha,
          force: true
        })
      });
      if (!updateRefRes.ok) throw new Error('Failed to update branch reference');

      setSuccess(true);
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#0A0A0A] overflow-y-auto no-scrollbar">
      <div className="p-4 border-b border-white/[0.05]">
        <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase flex items-center gap-2">
          <GitBranch className="w-4 h-4" />
          Source Control
        </span>
      </div>
      
      <div className="p-4 flex flex-col gap-5">
        {/* Repo Configuration */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">GitHub Repository URL</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white">
                <Github className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repo"
                className="w-full bg-[#111] border border-white/[0.1] rounded-lg px-3 py-2 pl-9 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">Branch Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white">
                <GitBranch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="main"
                className="w-full bg-[#111] border border-white/[0.1] rounded-lg px-3 py-2 pl-9 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors"
              />
            </div>
          </div>
        </div>

        <hr className="border-white/[0.05]" />

        {/* Commit section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">Commit Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Update project files"
              className="w-full bg-[#111] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors resize-none h-20"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-2 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="break-words">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-xs">
              <Check className="w-4 h-4 shrink-0" />
              <p>Successfully pushed to {branch}!</p>
            </div>
          )}

          <button
            onClick={handlePush}
            disabled={isPushing || !webcontainer}
            className="w-full mt-2 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isPushing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Pushing...
              </>
            ) : (
              <>
                <GitBranch className="w-4 h-4" />
                Commit & Push
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
