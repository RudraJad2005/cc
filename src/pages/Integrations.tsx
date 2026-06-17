import { motion } from 'motion/react';
import { ArrowRight, GitBranch, Webhook, Database, Cloud, Search, Terminal, Boxes, Bell, BarChart3, Lock, Workflow } from 'lucide-react';

// Custom SVG Icons for Brands
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

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
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

export function Integrations() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="w-full flex-1 flex flex-col bg-[#000]">
       {/* Hero Section */}
       <section className="flex flex-col border-b border-white/[0.08] relative text-center items-center justify-center py-32 md:py-48 px-6 overflow-hidden bg-[#000]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="relative z-10 flex gap-4 mb-8 text-white/50"
          >
             <GithubIcon className="w-8 h-8" />
             <SlackIcon className="w-8 h-8" />
             <VercelIcon className="w-8 h-8" />
             <FigmaIcon className="w-8 h-8" />
          </motion.div>

          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
          >
             Connect your <br/>
             <span className="text-[#888]">entire toolchain.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Collab Code integrates deeply with the tools you already use. From version control to deployment and issue tracking, keep your workflow uninterrupted.
          </motion.p>
       </section>

       {/* Featured Grid */}
       <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.08]"
       >
          <IntegrationCard 
             icon={<GithubIcon className="w-9 h-9 text-white mb-6" />}
             title="GitHub"
             desc="Sync repositories, manage pull requests, and resolve merge conflicts without leaving the editor."
             borderRight
             variants={fadeUp}
          />
          <IntegrationCard 
             icon={<GitlabIcon className="w-9 h-9 text-[#E24329] mb-6" />}
             title="GitLab"
             desc="Native support for GitLab repositories, CI/CD pipelines, and merge request workflows."
             borderRight
             variants={fadeUp}
          />
          <IntegrationCard 
             icon={<VercelIcon className="w-9 h-9 text-white mb-6" />}
             title="Vercel"
             desc="Automatically deploy preview environments for every branch directly from your workspace."
             variants={fadeUp}
          />
          <IntegrationCard 
             icon={<SlackIcon className="w-8 h-8 text-white mb-6" />}
             title="Slack"
             desc="Get notifications for build statuses, review requests, and workspace invites in your channels."
             borderRight
             borderTop
             variants={fadeUp}
          />
          <IntegrationCard 
             icon={<FigmaIcon className="w-7 h-9 text-white mb-6" />}
             title="Figma"
             desc="Embed live Figma designs directly next to your code to ensure pixel-perfect implementation."
             borderRight
             borderTop
             variants={fadeUp}
          />
          <IntegrationCard 
             icon={<LinearIcon className="w-9 h-9 text-[#5E6AD2] mb-6" />}
             title="Linear & Jira"
             desc="Link code changes and branches to issues. Automatically update issue status on merge."
             borderTop
             variants={fadeUp}
          />
       </motion.section>

       {/* Frameworks Section */}
       <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-b border-white/[0.08] relative py-20 md:py-32 px-6 md:px-12 lg:px-20 xl:px-[100px] bg-[#080808]"
       >
          <div className="max-w-[1400px] mx-auto w-full flex flex-col">
             <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8">
                <div>
                   <h2 className="text-3xl md:text-4xl tracking-tight font-medium text-white mb-4">
                     Native framework support
                   </h2>
                   <p className="text-[#71717a] text-lg max-w-xl">
                     Collab Code detects your framework automatically. Zero configuration required for the most popular frontend and backend stacks.
                   </p>
                </div>
                <a href="#" className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors w-fit whitespace-nowrap">
                   View all frameworks <ArrowRight className="w-4 h-4" />
                </a>
             </div>

             <motion.div 
               variants={staggerContainer}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-50px" }}
               className="grid grid-cols-2 lg:grid-cols-5 gap-4"
             >
               <FrameworkTag name="Next.js" type="React Framework" variants={fadeUp} />
               <FrameworkTag name="React" type="Frontend Library" variants={fadeUp} />
               <FrameworkTag name="Vue.js" type="Frontend Framework" variants={fadeUp} />
               <FrameworkTag name="SvelteKit" type="Full-stack" variants={fadeUp} />
               <FrameworkTag name="Angular" type="Frontend Framework" variants={fadeUp} />
               
               <FrameworkTag name="Node.js" type="JavaScript Runtime" variants={fadeUp} />
               <FrameworkTag name="Python" type="Backend & ML" variants={fadeUp} />
               <FrameworkTag name="Go" type="Backend" variants={fadeUp} />
               <FrameworkTag name="Rust" type="Systems & Backend" variants={fadeUp} />
               <FrameworkTag name="Ruby on Rails" type="Full-stack" variants={fadeUp} />
             </motion.div>
          </div>
       </motion.section>

       {/* Infrastructure & Data Section */}
       <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 border-b border-white/[0.08]"
       >
          <div className="p-8 md:p-12 lg:p-20 xl:p-[100px] border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#050505]">
             <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 text-white">
               <Database className="w-5 h-5 mx-auto text-blue-400" />
             </div>
             <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">Database branching</h3>
             <p className="text-[#a1a1aa] leading-relaxed text-base mb-8">
                Connect your workspace directly to top tier serverless providers. We automatically provision isolated database branches for every code branch you create.
             </p>
             <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Supabase</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Neon</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">PlanetScale</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">MongoDB</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Upstash</span>
             </div>
          </div>
          <div className="p-8 md:p-12 lg:p-20 xl:p-[100px] bg-[#050505]">
             <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 text-white">
               <Cloud className="w-5 h-5 mx-auto text-amber-400" />
             </div>
             <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">Cloud Providers</h3>
             <p className="text-[#a1a1aa] leading-relaxed text-base mb-8">
                Deploy infrastructure changes securely. Integrate AWS, GCP, or Azure credentials natively into your workspace secrets engine without exposing them over the wire.
             </p>
             <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">AWS</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Google Cloud</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Azure</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Cloudflare</span>
                <span className="px-3 py-1.5 rounded-md border border-white/[0.08] text-[13px] text-gray-300 bg-[#111]">Fly.io</span>
             </div>
          </div>
       </motion.section>

       {/* Deep Dive Section 1 */}
       <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] relative bg-[#080808]"
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 text-white">
               <GitBranch className="w-5 h-5 mx-auto text-purple-400" />
            </div>
            <h2 className="text-3xl md:text-4xl tracking-tight font-medium text-white mb-6 leading-[1.1]">
              Deep version control <br/>
              <span className="text-[#a1a1aa]">built right in.</span>
            </h2>
            <p className="text-lg text-[#71717a] max-w-xl leading-relaxed tracking-wide mb-8">
              Don't compromise on your Git workflow. Our GitHub and GitLab integrations bring rich interface for rebasing, squashing, and reviewing PRs directly alongside your collaborative session.
            </p>
            <a href="#" className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors w-fit">
                Learn more about Git integrations <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <div className="w-full lg:w-[55%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex items-center justify-center relative overflow-hidden bg-[#050505]">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),_transparent_60%)] pointer-events-none" />
             
             {/* Mock PR Interface */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[440px] rounded-xl border border-white/[0.1] bg-[#161616]/80 backdrop-blur-md shadow-2xl overflow-hidden relative z-10 flex flex-col font-mono text-left"
             >
                <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-white/[0.01]">
                   <div className="flex items-center gap-2 text-[13px] font-medium text-gray-300">
                      <GitBranch className="w-4 h-4 text-purple-400" />
                      fix/auth-flow
                   </div>
                   <div className="text-[11px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">Open</div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                   <div className="text-[14px] text-white font-sans font-medium tracking-tight">Fix authentication redirect loop on production</div>
                   <div className="flex -space-x-1">
                      <div className="w-[20px] h-[20px] rounded-full ring-2 ring-[#161616] overflow-hidden bg-white/[0.1]">
                         <img src={`https://i.pravatar.cc/100?img=12`} className="w-full h-full object-cover" alt="user" />
                      </div>
                      <div className="w-[20px] h-[20px] rounded-full ring-2 ring-[#161616] flex items-center justify-center bg-[#292929] text-[10px] text-gray-400 border border-white/[0.1]">
                         +2
                      </div>
                   </div>
                   <div className="flex flex-col gap-2 mt-2">
                       <div className="flex items-center gap-2 text-[12px] text-[#71717a]">
                           <div className="w-2 h-2 rounded-full bg-green-500"></div> All checks have passed
                       </div>
                       <div className="flex items-center gap-2 text-[12px] text-[#71717a]">
                           <div className="w-2 h-2 rounded-full bg-blue-500"></div> 1 approved review
                       </div>
                   </div>
                   <button className="mt-2 w-full py-2 bg-green-600 border border-green-500 hover:bg-green-500 text-white font-sans text-sm font-medium rounded-lg transition-colors shadow-[0_4px_14px_0_rgba(22,163,74,0.39)]">
                      Squash and merge
                   </button>
                </div>
             </motion.div>
          </div>
       </section>

       {/* Integration Directory by Category */}
       <section className="border-b border-white/[0.08] bg-[#080808] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-fade opacity-30 pointer-events-none" />
          <div className="relative z-10 p-8 md:p-12 lg:p-20 xl:p-[100px]">
             <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-purple-300/80 text-[11px] font-mono mb-6 tracking-widest uppercase">
                   <Boxes className="w-3.5 h-3.5" /> Directory
                </div>
                <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-gradient mb-5">100+ integrations, organized.</h2>
                <p className="text-[#888] text-lg">Browse everything that plugs into Collab Code, grouped by what it does.</p>
             </div>

             <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto"
             >
                {[
                   { icon: GitBranch, label: 'Source Control', color: 'text-orange-400', items: ['GitHub', 'GitLab', 'Bitbucket', 'Gitea'] },
                   { icon: Cloud, label: 'Deployment', color: 'text-white', items: ['Vercel', 'Netlify', 'Fly.io', 'Render'] },
                   { icon: Database, label: 'Databases', color: 'text-blue-400', items: ['Supabase', 'Neon', 'PlanetScale', 'MongoDB'] },
                   { icon: Bell, label: 'Communication', color: 'text-pink-400', items: ['Slack', 'Discord', 'Microsoft Teams', 'Email'] },
                   { icon: Workflow, label: 'Project Mgmt', color: 'text-indigo-400', items: ['Linear', 'Jira', 'Asana', 'Trello'] },
                   { icon: BarChart3, label: 'Observability', color: 'text-emerald-400', items: ['Sentry', 'Datadog', 'Grafana', 'Axiom'] },
                ].map((cat, i) => {
                   const Icon = cat.icon;
                   return (
                      <motion.div
                         variants={fadeUp}
                         key={i}
                         className="group flex flex-col p-7 rounded-2xl border border-white/[0.08] bg-[#050505] hover:bg-[#0b0b0b] hover:border-white/[0.14] transition-all duration-300"
                      >
                         <div className="flex items-center justify-between mb-6">
                            <div className={`w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center ${cat.color}`}>
                               <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-mono tracking-widest uppercase text-[#666]">{cat.label}</span>
                         </div>
                         <div className="flex flex-col divide-y divide-white/[0.05]">
                            {cat.items.map((it) => (
                               <div key={it} className="flex items-center justify-between py-2.5 text-[14px] text-gray-300 group-hover:text-white transition-colors">
                                  {it}
                                  <ArrowRight className="w-3.5 h-3.5 text-[#555] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   );
                })}
             </motion.div>

             <div className="flex justify-center mt-12">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-white text-[14px] font-medium hover:bg-white/[0.07] transition-colors">
                   <Search className="w-4 h-4 text-gray-400" /> Browse the full directory
                </button>
             </div>
          </div>
       </section>

       {/* CLI / API Section */}
       <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true, margin: '-100px' }}
             className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#080808]"
          >
             <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 text-white">
                <Terminal className="w-5 h-5 text-emerald-400" />
             </div>
             <h2 className="text-3xl md:text-4xl tracking-tighter font-semibold mb-6 leading-[1.1]">
                <span className="text-gradient">Automate anything</span><br />
                <span className="text-[#666]">with the CLI & API.</span>
             </h2>
             <p className="text-lg text-[#888] max-w-xl leading-relaxed mb-8">
                Script workspace creation, wire up CI, and trigger workflows programmatically. A typed SDK, a fast CLI, and a complete GraphQL API.
             </p>
             <div className="flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-[14px] font-medium hover:bg-gray-100 transition-colors">Read API docs <ArrowRight className="w-4 h-4 opacity-60" /></a>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-white text-[14px] font-medium hover:bg-white/[0.08] transition-colors">npm SDK</a>
             </div>
          </motion.div>

          <div className="w-full lg:w-[55%] p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden bg-[#050505]">
             <div className="absolute inset-0 bg-grid-sm mask-fade opacity-40 pointer-events-none" />
             <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
                className="w-full max-w-[520px] rounded-xl border border-white/[0.1] bg-[#0a0a0a]/90 backdrop-blur-xl glow-ring overflow-hidden relative z-10 font-mono"
             >
                <div className="flex items-center justify-between px-4 h-10 border-b border-white/[0.06]">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                      <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                      <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                   </div>
                   <div className="flex items-center gap-2 text-[11px] text-[#666]">
                      <Lock className="w-3 h-3" /> deploy.ts
                   </div>
                </div>
                <div className="p-5 text-[13px] leading-[1.7]">
                   <p className="text-gray-500"><span className="text-pink-400">import</span> {'{'} Collab {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-400">'@collab/sdk'</span>;</p>
                   <p className="h-3" />
                   <p className="text-gray-500"><span className="text-pink-400">const</span> ws = <span className="text-pink-400">await</span> Collab.<span className="text-blue-400">workspaces</span>.<span className="text-blue-400">create</span>({'{'}</p>
                   <p className="text-gray-400 pl-4">repo: <span className="text-emerald-400">'acme/web'</span>,</p>
                   <p className="text-gray-400 pl-4">branch: <span className="text-emerald-400">'feat/checkout'</span>,</p>
                   <p className="text-gray-400 pl-4">tier: <span className="text-emerald-400">'pro'</span>,</p>
                   <p className="text-gray-500">{'}'});</p>
                   <p className="h-3" />
                   <p className="text-gray-500">ws.<span className="text-blue-400">on</span>(<span className="text-emerald-400">'ready'</span>, () <span className="text-pink-400">=&gt;</span> ws.<span className="text-blue-400">run</span>(<span className="text-emerald-400">'npm test'</span>));</p>
                   <p className="h-3" />
                   <p className="text-[#555]"><span className="text-emerald-400">✓</span> workspace ready · 142ms</p>
                </div>
             </motion.div>
          </div>
       </section>

       {/* Webhooks Section */}
       <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-b border-white/[0.08] relative items-center justify-center py-32 px-6 text-center bg-[#050505]"
       >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-8 relative z-10">
             <Webhook className="w-8 h-8 text-white/60" />
          </div>
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-6 relative z-10">
            Build your own workflows
          </h2>
          <p className="text-[#71717a] text-lg max-w-2xl mx-auto mb-10 relative z-10">
            Need something custom? Use our robust GraphQL API and Webhooks to integrate Collab Code deeply into your proprietary internal developer platforms.
          </p>
          <div className="flex gap-4 relative z-10">
             <button className="h-12 bg-white text-black px-8 rounded-full font-medium hover:bg-gray-200 text-[14px] transition-colors duration-300">
                Read API Docs
             </button>
             <button className="h-12 border border-white/[0.08] bg-white/[0.03] text-white px-8 rounded-full font-medium hover:bg-white/[0.08] text-[14px] transition-colors duration-300">
                Webhooks Guide
             </button>
          </div>
       </motion.section>
    </main>
  );
}

function IntegrationCard({ icon, title, desc, borderRight, borderTop, variants }: { icon: React.ReactNode, title: string, desc: string, borderRight?: boolean, borderTop?: boolean, variants?: any }) {
   if (variants) {
      return (
         <motion.div variants={variants} className={`p-8 md:p-12 lg:p-16 xl:p-[80px] ${borderRight ? 'md:border-r border-white/[0.08]' : ''} ${borderTop ? 'md:border-t-0 border-t border-white/[0.08]' : ''} border-b md:border-b-0 border-white/[0.08] bg-[#050505] hover:bg-[#080808] transition-colors`}>
            {icon}
            <h3 className="text-xl md:text-2xl font-medium text-[#f4f4f5] mb-4 tracking-tight">{title}</h3>
            <p className="text-[#a1a1aa] leading-relaxed text-sm md:text-base">{desc}</p>
         </motion.div>
      )
   }
   return (
      <div className={`p-8 md:p-12 lg:p-16 xl:p-[80px] ${borderRight ? 'md:border-r border-white/[0.08]' : ''} ${borderTop ? 'md:border-t-0 border-t border-white/[0.08]' : ''} border-b md:border-b-0 border-white/[0.08] bg-[#050505] hover:bg-[#080808] transition-colors`}>
         {icon}
         <h3 className="text-xl md:text-2xl font-medium text-[#f4f4f5] mb-4 tracking-tight">{title}</h3>
         <p className="text-[#a1a1aa] leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
   )
}

function FrameworkTag({ name, type, variants }: { name: string, type: string, variants?: any }) {
   if (variants) {
      return (
         <motion.div variants={variants} className="flex flex-col p-5 rounded-xl border border-white/[0.08] bg-[#161616]/50 hover:bg-[#161616] transition-colors group cursor-pointer">
            <div className="text-white font-medium text-[15px] mb-1 tracking-tight group-hover:text-blue-400 transition-colors">{name}</div>
            <div className="text-[#71717a] text-[13px]">{type}</div>
         </motion.div>
      )
   }
   return (
      <div className="flex flex-col p-5 rounded-xl border border-white/[0.08] bg-[#161616]/50 hover:bg-[#161616] transition-colors group cursor-pointer">
         <div className="text-white font-medium text-[15px] mb-1 tracking-tight group-hover:text-blue-400 transition-colors">{name}</div>
         <div className="text-[#71717a] text-[13px]">{type}</div>
      </div>
   )
}
