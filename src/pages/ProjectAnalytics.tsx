import { Activity, Copy, Check, Terminal, Code2, Globe, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Select } from '../components/ui/Select';

export function ProjectAnalytics() {
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const [environment, setEnvironment] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [framework, setFramework] = useState('react');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${packageManager} ${packageManager === 'npm' ? 'i' : 'add'} @collab/analytics`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full pb-20 max-w-[1000px] mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
         <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-white tracking-tight">Analytics</h1>
         </div>
         <div className="flex items-center gap-2">
            <Select 
               options={[
                 { value: 'all', label: 'All environments' },
                 { value: 'production', label: 'Production' },
                 { value: 'preview', label: 'Preview' },
               ]}
               value={environment}
               onChange={setEnvironment}
               className="w-[160px]"
            />
            <Select 
               options={[
                 { value: '7d', label: 'Last 7 Days' },
                 { value: '24h', label: 'Last 24 Hours' },
                 { value: '30d', label: 'Last 30 Days' },
               ]}
               value={timeRange}
               onChange={setTimeRange}
               className="w-[140px]"
            />
         </div>
      </div>

      {/* Get Started Box */}
      <div className="rounded-xl border border-white/[0.1] bg-[#050505] p-8 mb-8">
         <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Get Started</h2>
            <Select 
               options={[
                 { value: 'react', label: 'React / Next.js' },
                 { value: 'vue', label: 'Vue / Nuxt' },
                 { value: 'svelte', label: 'SvelteKit' },
                 { value: 'vanilla', label: 'Vanilla JS' },
               ]}
               value={framework}
               onChange={setFramework}
               className="w-[180px]"
            />
         </div>
         <p className="text-gray-400 text-sm mb-8">To start counting visitors and page views, follow these steps.</p>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Step 1 */}
            <div className="flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <h3 className="text-white font-medium">Install our package</h3>
               </div>
               <p className="text-sm text-gray-400 mb-4">Start by installing <code className="text-white">@collab/analytics</code> in your existing project.</p>
               
               <div className="border border-white/[0.1] rounded-lg bg-[#000] overflow-hidden mt-auto">
                  <div className="flex items-center gap-1 p-2 border-b border-white/[0.1]">
                     <button onClick={() => setPackageManager('npm')} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${packageManager === 'npm' ? 'bg-white/[0.1] text-white' : 'text-gray-500 hover:text-gray-300'}`}>npm</button>
                     <button onClick={() => setPackageManager('yarn')} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${packageManager === 'yarn' ? 'bg-white/[0.1] text-white' : 'text-gray-500 hover:text-gray-300'}`}>yarn</button>
                     <button onClick={() => setPackageManager('pnpm')} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${packageManager === 'pnpm' ? 'bg-white/[0.1] text-white' : 'text-gray-500 hover:text-gray-300'}`}>pnpm</button>
                  </div>
                  <div className="flex items-center justify-between p-3">
                     <code className="text-sm text-gray-300 font-mono">
                        {packageManager} {packageManager === 'npm' ? 'i' : 'add'} @collab/analytics
                     </code>
                     <button onClick={copyToClipboard} className="text-gray-500 hover:text-white transition-colors">
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                     </button>
                  </div>
               </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <h3 className="text-white font-medium">Add the React component</h3>
               </div>
               <p className="text-sm text-gray-400 mb-4">Import and use the <code className="text-white bg-white/[0.1] px-1 rounded">&lt;Analytics/&gt;</code> React component into your app's layout.</p>
               
               <div className="border border-white/[0.1] rounded-lg bg-[#000] p-4 font-mono text-sm mt-auto overflow-x-auto">
                  <span className="text-pink-400">import</span> {'{ Analytics }'} <span className="text-pink-400">from</span> <span className="text-green-400">'@collab/analytics'</span>;
                  <br /><br />
                  {'export default function Layout({ children }) {'}<br />
                  &nbsp;&nbsp;{'return ('}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{'<>'}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{children}'}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;Analytics /&gt;</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{'</>'}<br />
                  &nbsp;&nbsp;{');'}<br />
                  {'}'}
               </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <h3 className="text-white font-medium">Deploy & Visit your Site</h3>
               </div>
               <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Deploy your changes and visit the deployment to collect your page views.
                  <br /><br />
                  If you don't see data after 30 seconds, please check for content blockers and try to navigate between pages on your site.
               </p>
               <div className="mt-auto flex items-center justify-center p-6 border border-white/[0.05] rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent">
                 <Globe className="w-12 h-12 text-gray-600" />
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4 py-4 mt-6">
            <div className="h-px bg-white/[0.08] flex-1"></div>
            <span className="text-xs text-gray-500 font-medium">Or, install automatically with Collab Agent (free)</span>
            <div className="h-px bg-white/[0.08] flex-1"></div>
         </div>

         <div className="flex flex-col items-center justify-center py-6">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#111] hover:bg-[#222] border border-white/[0.1] text-white font-medium rounded-full transition-colors text-sm mb-3">
               <Sparkles className="w-4 h-4 text-purple-400" /> Implement with Collab Agent
            </button>
            <p className="text-xs text-gray-500 text-center max-w-sm leading-relaxed">
               Automatically generate a pull request with Web Analytics configured for your project — at no charge.
            </p>
         </div>
      </div>

      {/* Empty Chart Area */}
      <div className="rounded-xl border border-white/[0.1] bg-[#050505] overflow-hidden">
         {/* Stats Header */}
         <div className="grid grid-cols-3 border-b border-white/[0.1]">
            <div className="p-4 border-r border-white/[0.1]">
               <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Visitors</h4>
               <span className="text-3xl font-bold text-white">0</span>
            </div>
            <div className="p-4 border-r border-white/[0.1]">
               <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Page Views</h4>
               <span className="text-3xl font-bold text-white">0</span>
            </div>
            <div className="p-4">
               <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Bounce Rate</h4>
               <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">0%</span>
                  <span className="text-xs font-medium bg-white/[0.05] text-gray-500 px-1.5 py-0.5 rounded">0%</span>
               </div>
            </div>
         </div>

         {/* Chart Grid Lines */}
         <div className="h-[300px] p-6 relative flex flex-col justify-between">
            <div className="border-t border-white/[0.05] w-full flex items-center relative"><span className="absolute -left-2 -translate-x-full text-xs text-gray-600">100</span></div>
            <div className="border-t border-white/[0.05] w-full flex items-center relative"><span className="absolute -left-2 -translate-x-full text-xs text-gray-600">50</span></div>
            <div className="border-t border-white/[0.05] w-full flex items-center relative"><span className="absolute -left-2 -translate-x-full text-xs text-gray-600">0</span></div>
         </div>
      </div>
    </div>
  );
}
