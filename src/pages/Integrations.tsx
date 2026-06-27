import { motion } from 'motion/react';
import { ArrowRight, GitBranch, Webhook, Database, Cloud, Search, Terminal, Boxes, Bell, BarChart3, Lock, Workflow, Plus, Sparkles, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Vercel-style Crosshair
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.15] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

// Custom SVG Icons
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GitlabIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.955 8.452l-2.288-7.042c-.22-.676-1.17-.676-1.39 0l-1.923 5.92H5.646l-1.923-5.92c-.22-.676-1.17-.676-1.39 0L.045 8.452a1.474 1.474 0 00.536 1.648l11.419 8.293L12 18.5l.001-.001.001.001 11.418-8.293a1.474 1.474 0 00.535-1.655z" />
    </svg>
  );
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 122.8 122.8" fill="currentColor" className={className}>
      <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"/>
      <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"/>
      <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"/>
      <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"/>
    </svg>
  );
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="currentColor" className={className}>
      <path d="M19 28.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19z" fill="#1abcfe"/>
      <path d="M0 28.5a9.5 9.5 0 1 1 19 0v9.5H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#0acf83"/>
      <path d="M19 0h9.5A9.5 9.5 0 1 1 19 19V0z" fill="#ff7262"/>
      <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#f24e1e"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>
    </svg>
  );
}

function LinearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886zM7 4.908l10.244 7.092L7 19.092V4.908z" />
    </svg>
  );
}

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}

export function Integrations() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* ───────────────── Hero Section (Vercel Style) ───────────────── */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden border-b border-white/[0.1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial="hidden" 
          animate="show" 
          variants={stagger}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-7xl xl:text-[80px] font-bold tracking-tighter leading-[1.1] mb-6">
            Connect your <span className="inline-flex items-center justify-center border border-white/[0.2] rounded-full px-3 md:px-4 py-1 text-2xl md:text-4xl lg:text-5xl translate-y-[-4px]">toolchain.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl text-[#888] max-w-2xl leading-relaxed mb-10">
            Integrate deeply with the tools you already use. From version control to deployment and issue tracking, keep your workflow completely uninterrupted.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            <button className="flex items-center gap-4 bg-white text-black rounded-full px-6 py-3.5 font-mono text-[14px] hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <span className="opacity-50">$</span> 
              <span>mcp install integrations</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────── Strict Grid Container ───────────────── */}
      <section className="bg-black relative w-full">
        <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative flex flex-col">

           {/* Frameworks Banner inside Grid */}
           <div className="p-6 md:p-12 lg:p-24 border-b border-white/[0.1] text-center flex flex-col items-center">
             <div className="inline-flex items-center justify-center gap-2 text-[#888] mb-6 text-xs font-mono uppercase tracking-widest">
                <Workflow className="w-3 h-3" /> Extensibility
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter text-white mb-6">Seamless ecosystem.</h2>
             <p className="text-lg text-[#888] max-w-2xl">
               Connect your codebase to your preferred services via webhooks, native OAuth integrations, and automated pipelines.
             </p>
           </div>

           {/* ───────────────── Integration Directory (Linear Style Blocks) ───────────────── */}
           <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
              <Crosshair className="-top-1.5 -left-1.5" />
              <Crosshair className="-top-1.5 -right-1.5" />

              {/* Block 1 (Soft Pink/Red - Code/Git) */}
              <div className="h-auto min-h-[400px] lg:h-[550px] lg:border-r border-b lg:border-b-0 border-white/[0.1] bg-[#FFA2A2] p-6 md:p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden group">
                 <div className="absolute -right-10 -top-10 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                   <GitBranch className="w-96 h-96" />
                 </div>
                 
                 <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white mb-8 shadow-2xl">
                   <GithubIcon className="w-6 h-6" />
                 </div>

                 <div className="relative z-10">
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight max-w-md">Source Control</h3>
                    <p className="text-[#0a0a0a]/70 text-lg leading-relaxed max-w-md font-medium">
                       Native support for GitHub and GitLab. Sync repositories, manage pull requests, and resolve merge conflicts without ever leaving the editor.
                    </p>
                 </div>
              </div>

              {/* Block 2 (Deep Blue/Indigo - Infrastructure) */}
              <div className="h-auto min-h-[400px] lg:h-[550px] bg-[#A2B2FF] p-6 md:p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden group">
                 
                 {/* Floating mockup UI */}
                 <div className="absolute top-1/2 left-1/2 w-[110%] -translate-y-1/2 -translate-x-1/4 rounded-xl border border-white/20 bg-white/20 backdrop-blur-md p-6 shadow-2xl transform group-hover:-translate-x-[20%] transition-transform duration-700">
                    <div className="flex items-center gap-3 mb-4">
                       <VercelIcon className="w-5 h-5 text-black" />
                       <span className="font-semibold text-sm text-black">Deployment successful</span>
                    </div>
                    <div className="space-y-3">
                       <div className="w-full h-2 bg-black/10 rounded-full" />
                       <div className="w-3/4 h-2 bg-black/10 rounded-full" />
                    </div>
                 </div>
                 
                 <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white mb-8 shadow-2xl relative z-10">
                   <Cloud className="w-6 h-6" />
                 </div>

                 <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight max-w-md">Infrastructure</h3>
                    <p className="text-[#0a0a0a]/70 text-lg leading-relaxed max-w-md font-medium">
                       Automatically deploy preview environments for every branch directly to Vercel, AWS, or your custom cloud providers.
                    </p>
                 </div>
              </div>
           </div>

           {/* ───────────────── App Directory Grid (The "Missing" Section) ───────────────── */}
           <div className="flex flex-col relative border-b border-white/[0.1]">
              <Crosshair className="-top-1.5 -left-1.5" />
              <Crosshair className="-top-1.5 -right-1.5" />
              
              <div className="p-12 md:py-24 text-center border-b border-white/[0.1]">
                 <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white">Integration Directory</h2>
              </div>

              {/* Grid Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 relative border-b border-white/[0.1]">
                 {[
                    { icon: GithubIcon, title: 'GitHub', desc: 'Sync repositories, manage pull requests, and resolve merge conflicts.', glow: 'from-white/20 to-transparent', color: 'text-white' },
                    { icon: GitlabIcon, title: 'GitLab', desc: 'Native support for GitLab repositories, CI/CD pipelines, and MR workflows.', glow: 'from-[#E24329]/20 to-transparent', color: 'text-[#E24329]' },
                    { icon: VercelIcon, title: 'Vercel', desc: 'Automatically deploy preview environments for every branch.', glow: 'from-white/20 to-transparent', color: 'text-white' },
                 ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                       <div key={i} className={`group col-span-1 p-10 lg:p-12 transition-all duration-700 min-h-[300px] flex flex-col overflow-hidden relative cursor-pointer ${i < 2 ? 'md:border-r border-white/[0.1]' : ''} border-b md:border-b-0 border-white/[0.1]`}>
                          
                          {/* Unique Background Glow & Scaled Logo Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                          <div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-[0.05] transform group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 pointer-events-none z-0">
                             <Icon className="w-48 h-48 text-white" />
                          </div>

                          <div className="mb-auto relative z-10">
                             <div className="w-12 h-12 rounded-xl border border-white/[0.1] bg-[#050505] flex items-center justify-center group-hover:scale-110 group-hover:border-white/[0.3] transition-all duration-500 shadow-xl">
                                <Icon className={`w-6 h-6 text-white group-hover:${item.color} transition-colors duration-500`} />
                             </div>
                          </div>
                          
                          <div className="mt-8 relative z-10 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                             <h3 className="text-xl font-medium text-white mb-2 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                             <p className="text-[#888] text-[15px] leading-relaxed group-hover:text-[#aaa] transition-colors">{item.desc}</p>
                          </div>
                       </div>
                    );
                 })}
              </div>

              {/* Grid Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 relative">
                 {[
                    { icon: SlackIcon, title: 'Slack', desc: 'Get notifications for build statuses, review requests, and workspace invites.', glow: 'from-[#E01E5A]/20 to-transparent', color: 'text-[#E01E5A]' },
                    { icon: FigmaIcon, title: 'Figma', desc: 'Embed live Figma designs directly next to your code to ensure pixel-perfect implementation.', glow: 'from-[#F24E1E]/20 to-transparent', color: 'text-[#F24E1E]' },
                    { icon: LinearIcon, title: 'Linear & Jira', desc: 'Link code changes to issues. Automatically update issue status on merge.', glow: 'from-[#5E6AD2]/20 to-transparent', color: 'text-[#5E6AD2]' },
                 ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                       <div key={i} className={`group col-span-1 p-10 lg:p-12 transition-all duration-700 min-h-[300px] flex flex-col overflow-hidden relative cursor-pointer ${i < 2 ? 'md:border-r border-white/[0.1]' : ''} border-b md:border-b-0 border-white/[0.1]`}>
                          
                          {/* Unique Background Glow & Scaled Logo Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                          <div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-[0.05] transform group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 pointer-events-none z-0">
                             <Icon className="w-48 h-48 text-white" />
                          </div>

                          <div className="mb-auto relative z-10">
                             <div className="w-12 h-12 rounded-xl border border-white/[0.1] bg-[#050505] flex items-center justify-center group-hover:scale-110 group-hover:border-white/[0.3] transition-all duration-500 shadow-xl">
                                <Icon className={`w-6 h-6 text-white group-hover:${item.color} transition-colors duration-500`} />
                             </div>
                          </div>
                          
                          <div className="mt-8 relative z-10 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                             <h3 className="text-xl font-medium text-white mb-2 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                             <p className="text-[#888] text-[15px] leading-relaxed group-hover:text-[#aaa] transition-colors">{item.desc}</p>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>

           {/* ───────────────── NEW: Workflow Automation Section (Highly Unique UI) ───────────────── */}
           <div className="flex flex-col md:flex-row relative border-b border-white/[0.1] overflow-hidden bg-[#050505]">
              <div className="p-6 md:p-12 lg:p-24 xl:p-32 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/[0.1] relative z-10">
                 <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6">Automate your entire lifecycle.</h2>
                 <p className="text-[#888] text-lg leading-relaxed max-w-md font-medium mb-10">
                    Connect your existing tools to CollabCode to create seamless, bidirectional workflows. PRs trigger deployments, comments trigger Jira tickets, and errors alert your Slack channels instantly.
                 </p>
                 <button className="bg-white text-black px-6 py-3 rounded-full font-medium w-fit hover:scale-105 transition-transform flex items-center gap-2">
                    Explore webhooks
                 </button>
              </div>

              <div className="p-6 md:p-12 lg:p-24 xl:p-32 md:w-1/2 relative min-h-[350px] md:min-h-[500px] flex items-center justify-center">
                 {/* Glowing ambient backdrop */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#A2B2FF]/20 via-[#D7CAFF]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
                 
                 {/* Workflow Nodes */}
                 <div className="relative w-full max-w-sm aspect-square">
                    
                    {/* Center Node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center z-20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                       <Cloud className="w-10 h-10 text-white" />
                    </div>

                    {/* Surrounding Nodes */}
                    <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center z-10">
                       <GithubIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-[50%] left-[10%] -translate-y-1/2 w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center z-10">
                       <FigmaIcon className="w-7 h-8 text-[#F24E1E]" />
                    </div>
                    <div className="absolute top-[50%] right-[10%] -translate-y-1/2 w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center z-10">
                       <SlackIcon className="w-8 h-8 text-[#E01E5A]" />
                    </div>
                    <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center z-10">
                       <LinearIcon className="w-8 h-8 text-[#5E6AD2]" />
                    </div>

                    {/* Animated Connecting Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: "4 4" }}>
                       <line x1="50%" y1="20%" x2="50%" y2="40%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                       <line x1="50%" y1="60%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                       <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                       <line x1="60%" y1="50%" x2="80%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    </svg>

                    {/* Animated Data Pulses */}
                    <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-[ping_2s_infinite]" />
                    <div className="absolute top-[50%] left-[30%] -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-[ping_2.5s_infinite]" />
                 </div>
              </div>
           </div>

           {/* ───────────────── Frameworks Grid (Vercel Style) ───────────────── */}
           <div className="flex flex-col relative border-b border-white/[0.1]">
              <div className="grid grid-cols-1 md:grid-cols-3 relative">
                 <Crosshair className="-top-1.5 -left-1.5" />
                 <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                 <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                 <Crosshair className="-top-1.5 -right-1.5" />

                 {[
                    { title: 'Frontend', list: ['React', 'Next.js', 'Vue.js', 'SvelteKit', 'Angular'] },
                    { title: 'Backend', list: ['Node.js', 'Python', 'Go', 'Rust', 'Ruby on Rails'] },
                    { title: 'Databases', list: ['Supabase', 'Neon', 'PlanetScale', 'MongoDB', 'Upstash'] },
                 ].map((item, i) => (
                    <div key={i} className={`col-span-1 p-10 lg:p-12 hover:bg-white/[0.02] transition-colors ${i < 2 ? 'md:border-r border-white/[0.1]' : ''} border-b md:border-b-0 border-white/[0.1]`}>
                       <div className="text-xs font-mono tracking-widest text-[#888] uppercase mb-8">{item.title}</div>
                       <div className="flex flex-col gap-4">
                          {item.list.map((fw, j) => (
                             <div key={j} className="text-[15px] text-white flex items-center gap-3">
                                <span className="w-1 h-1 bg-white/[0.3] rounded-full" /> {fw}
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* ───────────────── NEW: Ecosystem Marquee Section ───────────────── */}
           <div className="flex flex-col relative border-b border-white/[0.1] bg-black overflow-hidden py-24">
              <div className="text-center mb-16 relative z-10 px-6">
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">The ultimate developer ecosystem.</h2>
                 <p className="text-[#888] text-lg max-w-xl mx-auto">
                    Seamlessly connect your existing stack. Over 50+ native integrations available right out of the box.
                 </p>
              </div>

              {/* Glowing background behind marquee */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-gradient-to-r from-transparent via-[#D6FF00]/5 to-transparent pointer-events-none" />

              {/* Infinite Scrolling Logo Marquee */}
              <div className="relative w-full flex overflow-hidden border-y border-white/[0.05] bg-[#050505]">
                 <div className="flex w-[200%] md:w-[150%] animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
                    
                    {/* First set of logos */}
                    <div className="flex w-1/2 items-center justify-around py-8 px-4">
                       <GithubIcon className="w-10 h-10 text-white/50 hover:text-white transition-colors cursor-pointer" />
                       <Database className="w-10 h-10 text-emerald-400/50 hover:text-emerald-400 transition-colors cursor-pointer" />
                       <GitlabIcon className="w-10 h-10 text-[#E24329]/50 hover:text-[#E24329] transition-colors cursor-pointer" />
                       <Cloud className="w-10 h-10 text-blue-400/50 hover:text-blue-400 transition-colors cursor-pointer" />
                       <SlackIcon className="w-10 h-10 text-[#E01E5A]/50 hover:text-[#E01E5A] transition-colors cursor-pointer" />
                       <Server className="w-10 h-10 text-purple-400/50 hover:text-purple-400 transition-colors cursor-pointer" />
                       <FigmaIcon className="w-10 h-10 text-[#F24E1E]/50 hover:text-[#F24E1E] transition-colors cursor-pointer" />
                       <Terminal className="w-10 h-10 text-yellow-400/50 hover:text-yellow-400 transition-colors cursor-pointer" />
                       <LinearIcon className="w-10 h-10 text-[#5E6AD2]/50 hover:text-[#5E6AD2] transition-colors cursor-pointer" />
                       <Workflow className="w-10 h-10 text-pink-400/50 hover:text-pink-400 transition-colors cursor-pointer" />
                       <VercelIcon className="w-10 h-10 text-white/50 hover:text-white transition-colors cursor-pointer" />
                       <Boxes className="w-10 h-10 text-orange-400/50 hover:text-orange-400 transition-colors cursor-pointer" />
                    </div>
                    
                    {/* Duplicate set for infinite scroll */}
                    <div className="flex w-1/2 items-center justify-around py-8 px-4">
                       <GithubIcon className="w-10 h-10 text-white/50 hover:text-white transition-colors cursor-pointer" />
                       <Database className="w-10 h-10 text-emerald-400/50 hover:text-emerald-400 transition-colors cursor-pointer" />
                       <GitlabIcon className="w-10 h-10 text-[#E24329]/50 hover:text-[#E24329] transition-colors cursor-pointer" />
                       <Cloud className="w-10 h-10 text-blue-400/50 hover:text-blue-400 transition-colors cursor-pointer" />
                       <SlackIcon className="w-10 h-10 text-[#E01E5A]/50 hover:text-[#E01E5A] transition-colors cursor-pointer" />
                       <Server className="w-10 h-10 text-purple-400/50 hover:text-purple-400 transition-colors cursor-pointer" />
                       <FigmaIcon className="w-10 h-10 text-[#F24E1E]/50 hover:text-[#F24E1E] transition-colors cursor-pointer" />
                       <Terminal className="w-10 h-10 text-yellow-400/50 hover:text-yellow-400 transition-colors cursor-pointer" />
                       <LinearIcon className="w-10 h-10 text-[#5E6AD2]/50 hover:text-[#5E6AD2] transition-colors cursor-pointer" />
                       <Workflow className="w-10 h-10 text-pink-400/50 hover:text-pink-400 transition-colors cursor-pointer" />
                       <VercelIcon className="w-10 h-10 text-white/50 hover:text-white transition-colors cursor-pointer" />
                       <Boxes className="w-10 h-10 text-orange-400/50 hover:text-orange-400 transition-colors cursor-pointer" />
                    </div>

                 </div>
              </div>

              <style>{`
                 @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                 }
              `}</style>
           </div>

           {/* ───────────────── Final CTA (Soft Glowing Dark Mode Block) ───────────────── */}
           <div className="p-6 md:p-12 lg:p-24 xl:p-32 bg-black flex flex-col items-center text-center relative overflow-hidden">
              <Crosshair className="-top-1.5 -left-1.5" />
              <Crosshair className="-top-1.5 -right-1.5" />
              
              {/* Soft Colors Shine Contrast */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#A2B2FF]/20 via-[#D7CAFF]/10 to-transparent blur-[120px] rounded-[100%] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D6FF00]/5 blur-[100px] rounded-[100%] pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 relative z-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl">
                 <Terminal className="w-8 h-8" />
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 relative z-10">Start integrating today.</h2>
              <p className="text-[#888] text-xl max-w-xl mx-auto mb-10 font-medium relative z-10">
                 From LLMs to full-stack frameworks, supercharge your workspace with a running start.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                 <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    Browse Directory
                 </button>
                 <button className="px-8 py-4 text-white text-[15px] font-bold rounded-full border border-white/20 hover:bg-white/5 transition-colors backdrop-blur-md">
                    Read Documentation
                 </button>
              </div>
           </div>

        </div>
      </section>
    </main>
  );
}
