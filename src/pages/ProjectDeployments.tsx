import { Server, Github, Terminal, GitBranch, ArrowRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function ProjectDeployments() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('npx @collab/cli deploy');
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
      </div>

      <div className="flex flex-col items-center justify-center py-12 px-4 border border-white/[0.08] rounded-2xl bg-[#050505] relative overflow-hidden mb-8 text-center">
         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.1] flex items-center justify-center mb-6 relative z-10">
            <Server className="w-8 h-8 text-blue-400" />
         </div>
         <h2 className="text-2xl font-semibold text-white tracking-tight mb-3 relative z-10">No deployments yet</h2>
         <p className="text-gray-400 max-w-md relative z-10 leading-relaxed">
            Your project is ready to go live. Connect a Git repository for continuous integration, or deploy manually from your terminal.
         </p>
         
         <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
      </div>

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
               <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
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
                     npx @collab/cli deploy
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
