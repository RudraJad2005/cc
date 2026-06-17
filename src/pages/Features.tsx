import React from 'react';
import { motion } from 'motion/react';
import {
  Terminal, ShieldCheck, Lock, ChevronRight, Zap, Globe, Cpu, Database, Activity, Code, Server, Github, BarChart3, LineChart
} from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: 'red', color: 'white', minHeight: '100vh', zIndex: 99999, position: 'relative' }}>
          <h1>React Runtime Error:</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '16px' }}>{this.state.error && this.state.error.toString()}</pre>
          <h2>Component Stack:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function FeaturesContent() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-indigo-500/30">
      
      {/* Global Background Grid Pattern - Made more subtle to match Vercel */}
      <div className="fixed inset-0 bg-grid opacity-[0.03] pointer-events-none z-0 mask-fade"></div>

      <div className="relative z-10 flex flex-col w-full">
          {/* Hero - Vercel Ditto */}
          <section className="pt-40 pb-32 px-6 flex flex-col items-center text-center relative overflow-hidden border-b border-white/[0.08]">
            
            {/* Vercel Glowing Triangle */}
            <div className="relative z-0 mt-12 mb-16 flex justify-center items-center w-full pointer-events-none">
               {/* Massive multi-color gradient glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#000_100%),radial-gradient(circle_farthest-side_at_0_100%,#00ccff,#3366ff_50%,transparent_100%),radial-gradient(circle_farthest-side_at_100%_0,#ffb3c6,#ff4d4d_50%,transparent_100%)] opacity-40 blur-[80px] mix-blend-screen" />
               <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl z-10 shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-pulse"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-bold tracking-tighter mb-8 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
              >
                Your complete platform for the web.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xl md:text-2xl text-[#888] font-medium tracking-tight max-w-3xl leading-relaxed mb-12"
              >
                Collab Code provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <span className="w-3 h-3 bg-black rounded-sm" />
                  Start Deploying
                </button>
                <button className="w-full sm:w-auto bg-[#0a0a0a] border border-white/[0.15] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#111] hover:border-white/[0.3] transition-colors">
                  Get a Demo
                </button>
              </motion.div>
            </div>
            
            {/* Terminal Preview underneath Hero */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="mt-32 w-full max-w-4xl rounded-2xl border border-white/[0.1] bg-[#000] shadow-2xl overflow-hidden relative z-20"
            >
               <div className="flex items-center px-4 py-3 border-b border-white/[0.1] bg-[#050505]">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-500 font-mono">bash ~ deploy</div>
               </div>
               <div className="p-6 md:p-10 text-left font-mono text-sm md:text-base leading-relaxed text-gray-300 bg-black">
                  <div className="flex items-center text-gray-500"><ChevronRight className="w-4 h-4 mr-2"/> <span className="text-white">npm i -g collabcode</span></div>
                  <div className="text-emerald-400 mt-2">✓ Installed successfully</div>
                  <div className="flex items-center text-gray-500 mt-6"><ChevronRight className="w-4 h-4 mr-2"/> <span className="text-white">collabcode deploy</span></div>
                  <div className="mt-2 text-cyan-400">▲ Collab Code CLI 14.0.0</div>
                  <div className="mt-1">🔍 Inspecting project...</div>
                  <div className="mt-1 text-gray-500">Building (Next.js)</div>
                  <div className="mt-6 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span> Ready! Deployed to edge network in 1.2s</div>
                  <div className="mt-2 text-blue-400 underline decoration-blue-400/30 underline-offset-4 cursor-pointer hover:text-blue-300 transition-colors">https://your-app.collabcode.app</div>
               </div>
            </motion.div>
          </section>

          {/* Frameworks Marquee/Grid */}
          <section className="bg-black">
             <div className="border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto border-x border-white/[0.08] py-32 text-center bg-[#000]">
                   <div className="inline-flex items-center justify-center gap-2 text-[#888] mb-6 text-sm font-mono uppercase tracking-widest"><Code className="w-4 h-4" /> Frontend First</div>
                   <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-16">Works with your favorite frameworks.</h2>
                   <div className="flex flex-wrap justify-center gap-4 px-6 max-w-4xl mx-auto">
                      {['Next.js', 'React', 'Svelte', 'Vue', 'Nuxt', 'Astro', 'Remix', 'Gatsby', 'Angular', 'Solid'].map((fw, i) => (
                         <div key={i} className="px-8 py-4 rounded-2xl border border-white/[0.1] bg-[#050505] text-white font-medium text-lg hover:bg-white hover:text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                            {fw}
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* NEW SECTION 1: DX / Preview Deployments */}
          <section className="bg-black">
             <div className="border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto border-x border-white/[0.08] p-10 lg:p-32 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden bg-[#050505]">
                   <div className="absolute inset-0 bg-grid-sm opacity-10 pointer-events-none mask-fade"></div>
                   
                   <div className="flex-1 relative z-10">
                      <div className="inline-flex items-center justify-center gap-2 text-[#888] mb-6 text-sm font-mono uppercase tracking-widest"><Github className="w-4 h-4 text-white" /> Collaborative DX</div>
                      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">Develop. Preview. Ship.</h2>
                      <p className="text-[#888] text-lg leading-relaxed mb-8 max-w-md">
                         Every push to a branch automatically generates a live Preview Deployment. Share the URL with your team to gather feedback, run automated tests, and iterate flawlessly before merging to production.
                      </p>
                   </div>
                   
                   <div className="flex-1 w-full relative z-10">
                      {/* Fake GitHub PR UI */}
                      <div className="rounded-xl border border-white/[0.1] bg-[#0A0A0A] shadow-[0_0_80px_rgba(255,255,255,0.03)] p-6 md:p-8">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                               <div className="w-3 h-3 bg-black rounded-sm" />             </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-white">collabcode</span> <span className="text-gray-500 text-sm border border-white/[0.1] px-1.5 rounded-sm bg-white/[0.05]">bot</span>
                               </div>
                               <div className="text-gray-300 text-sm mb-5">Successfully deployed to Collab Code!</div>
                               
                               <div className="rounded-lg border border-white/[0.1] bg-black overflow-hidden">
                                  <div className="px-4 py-3 border-b border-white/[0.1] bg-[#111] flex items-center justify-between text-sm">
                                     <span className="text-gray-400 font-medium">Preview</span>
                                     <span className="text-emerald-400 flex items-center gap-2 font-medium bg-emerald-500/10 px-2 py-1 rounded-md"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span> Ready</span>
                                  </div>
                                  <div className="px-4 py-4 flex flex-col gap-3 text-sm">
                                     <div className="flex justify-between items-center"><span className="text-gray-500">URL</span> <span className="text-blue-400 truncate ml-4 cursor-pointer hover:underline">feat-dashboard-collab.app</span></div>
                                     <div className="flex justify-between items-center"><span className="text-gray-500">Branch</span> <span className="text-gray-300 font-mono bg-white/[0.05] px-2 py-1 rounded-md">feat/dashboard</span></div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* NEW SECTION 2: Analytics & Observability */}
          <section className="bg-black">
             <div className="border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto border-x border-white/[0.08] p-10 lg:p-32 flex flex-col lg:flex-row-reverse items-center gap-16 relative overflow-hidden bg-[#000]">
                   <div className="flex-1 relative z-10">
                      <div className="inline-flex items-center justify-center gap-2 text-[#888] mb-6 text-sm font-mono uppercase tracking-widest"><BarChart3 className="w-4 h-4 text-emerald-400" /> Native Observability</div>
                      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">Traffic & Performance insights.</h2>
                      <p className="text-[#888] text-lg leading-relaxed mb-8 max-w-md">
                         Monitor your application's Web Vitals and active traffic in real-time. Native edge-level telemetry means you get perfect visibility without sacrificing milliseconds of performance.
                      </p>
                   </div>
                   
                   <div className="flex-1 w-full relative z-10">
                      {/* Fake Analytics Graph */}
                      <div className="rounded-xl border border-white/[0.1] bg-[#050505] shadow-[0_0_80px_rgba(16,185,129,0.05)] p-6 md:p-8 relative overflow-hidden">
                         <div className="flex items-center justify-between mb-10">
                            <div>
                               <div className="text-gray-400 text-sm mb-1 font-medium">Total Visitors</div>
                               <div className="text-4xl font-semibold text-white tracking-tight">124,592</div>
                            </div>
                            <div className="text-emerald-400 text-sm font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                               <Activity className="w-3 h-3" /> +14.2%
                            </div>
                         </div>
                         
                         <div className="relative w-full h-[180px] flex items-end gap-2">
                            {/* Fake Bar Chart Background */}
                            {[40, 60, 45, 80, 55, 90, 75, 100, 65, 85, 50, 70].map((h, i) => (
                               <div key={i} className="flex-1 bg-white/[0.05] rounded-t-sm hover:bg-white/[0.2] transition-colors relative group" style={{ height: `${h}%` }}>
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg">
                                     {h * 120}
                                  </div>
                               </div>
                            ))}
                            
                            {/* Glowing Overlay Line Chart */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                               <path d="M 0 60 L 9 40 L 18 55 L 27 20 L 36 45 L 45 10 L 54 25 L 63 0 L 72 35 L 81 15 L 90 50 L 100 30" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                               <path d="M 0 60 L 9 40 L 18 55 L 27 20 L 36 45 L 45 10 L 54 25 L 63 0 L 72 35 L 81 15 L 90 50 L 100 30 L 100 100 L 0 100 Z" fill="url(#emerald-gradient)" opacity="0.3" />
                               <defs>
                                  <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                                     <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                  </linearGradient>
                               </defs>
                            </svg>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Global Edge Network (Globe) */}
          <section className="bg-black">
             <div className="border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto border-x border-white/[0.08] p-10 lg:p-32 bg-[#020202] relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
                   <div className="absolute inset-0 bg-grid-sm opacity-20 pointer-events-none mask-fade"></div>
                   
                   <div className="flex-1 relative z-10">
                      <div className="inline-flex items-center justify-center gap-2 text-blue-400 mb-6 text-sm font-mono uppercase tracking-widest"><Globe className="w-4 h-4" /> Global Edge</div>
                      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">Deploy globally, instantly.</h2>
                      <p className="text-[#888] text-lg leading-relaxed mb-10 max-w-md">
                         Push your code to our global edge network. Your site automatically scales to meet demand, delivering millisecond response times to users anywhere in the world.
                      </p>
                      <div className="grid grid-cols-2 gap-8 max-w-md">
                         <div className="bg-[#050505] p-6 rounded-2xl border border-white/[0.1]">
                            <div className="text-4xl font-bold text-white mb-2 tracking-tight">300<span className="text-blue-500">+</span></div>
                            <div className="text-sm font-medium text-gray-500">Global Edge Nodes</div>
                         </div>
                         <div className="bg-[#050505] p-6 rounded-2xl border border-white/[0.1]">
                            <div className="text-4xl font-bold text-white mb-2 tracking-tight">50<span className="text-emerald-500">ms</span></div>
                            <div className="text-sm font-medium text-gray-500">Avg Global Latency</div>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 relative w-full h-[400px] flex items-center justify-center z-10">
                      {/* Edge Routing Network Map */}
                      <div className="w-full max-w-[450px] aspect-video relative flex items-center justify-center border border-white/[0.1] rounded-2xl bg-[#000] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.1)]">
                         <div className="absolute inset-0 bg-grid-sm opacity-20 pointer-events-none"></div>
                         
                         {/* Central Origin */}
                         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl border border-white/[0.15] bg-[#050505] shadow-[0_0_40px_rgba(59,130,246,0.4)] z-20 flex items-center justify-center glow-ring">
                            <Database className="w-6 h-6 text-blue-500" />
                         </div>
                         
                         {/* Endpoints */}
                         <div className="absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg border border-white/[0.1] bg-[#0A0A0A] z-20 flex items-center justify-center shadow-lg"><Globe className="w-4 h-4 text-emerald-500" /></div>
                         <div className="absolute top-[85%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg border border-white/[0.1] bg-[#0A0A0A] z-20 flex items-center justify-center shadow-lg"><Globe className="w-4 h-4 text-purple-500" /></div>
                         <div className="absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg border border-white/[0.1] bg-[#0A0A0A] z-20 flex items-center justify-center shadow-lg"><Globe className="w-4 h-4 text-pink-500" /></div>
                         <div className="absolute top-[75%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg border border-white/[0.1] bg-[#0A0A0A] z-20 flex items-center justify-center shadow-lg"><Globe className="w-4 h-4 text-amber-500" /></div>

                         {/* Animated Routing Bezier Curves */}
                         <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 400 225" preserveAspectRatio="none">
                            <path d="M 200 112.5 C 130 112.5 130 33.75 60 33.75" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                            <path d="M 200 112.5 C 130 112.5 130 33.75 60 33.75" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-[dash_2s_linear_infinite]" />

                            <path d="M 200 112.5 C 140 112.5 140 191.25 80 191.25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                            <path d="M 200 112.5 C 140 112.5 140 191.25 80 191.25" stroke="#a855f7" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />

                            <path d="M 200 112.5 C 270 112.5 270 56.25 340 56.25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                            <path d="M 200 112.5 C 270 112.5 270 56.25 340 56.25" stroke="#ec4899" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-[dash_2.5s_linear_infinite]" />

                            <path d="M 200 112.5 C 260 112.5 260 168.75 320 168.75" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                            <path d="M 200 112.5 C 260 112.5 260 168.75 320 168.75" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-[dash_3.5s_linear_infinite]" />
                         </svg>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Sticky Sidebar Asymmetrical Layout */}
          <section className="bg-black">
             <div className="border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto border-x border-white/[0.08]">
                   
                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-[1px] bg-white/[0.08]">
                       
                       <div className="lg:col-span-1 bg-[#000] p-10 relative hidden lg:block">
                          <div className="sticky top-32 flex flex-col gap-8">
                             <div>
                                <h2 className="text-3xl font-semibold tracking-tighter text-white mb-4">Enterprise Grade.</h2>
                                <p className="text-[#888] text-[15px] leading-relaxed">Security, observability, and deployments built directly into the core platform architecture.</p>
                             </div>
                             <div className="flex flex-col gap-3">
                                <span className="px-4 py-3 rounded-lg border border-white/[0.1] bg-[#050505] flex items-center gap-3 text-[13px] font-mono text-gray-300 shadow-sm"><Lock className="w-4 h-4 text-gray-500"/> ISO 27001</span>
                                <span className="px-4 py-3 rounded-lg border border-white/[0.1] bg-[#050505] flex items-center gap-3 text-[13px] font-mono text-gray-300 shadow-sm"><ShieldCheck className="w-4 h-4 text-gray-500"/> SOC 2 TYPE II</span>
                             </div>
                          </div>
                       </div>

                       <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.08]">
                          <div className="lg:hidden p-10 bg-[#000] col-span-1 md:col-span-2">
                              <h2 className="text-3xl font-semibold tracking-tighter text-white mb-4">Enterprise Grade.</h2>
                              <p className="text-[#888] text-[15px] leading-relaxed mb-6">Security, observability, and deployments built directly into the core platform architecture.</p>
                              <div className="flex flex-wrap gap-3">
                                 <span className="px-4 py-2.5 rounded-lg border border-white/[0.1] bg-[#050505] flex items-center gap-2 text-[13px] font-mono text-gray-300"><Lock className="w-3.5 h-3.5"/> ISO 27001</span>
                                 <span className="px-4 py-2.5 rounded-lg border border-white/[0.1] bg-[#050505] flex items-center gap-2 text-[13px] font-mono text-gray-300"><ShieldCheck className="w-3.5 h-3.5"/> SOC 2 TYPE II</span>
                              </div>
                          </div>

                          {[
                             { title: 'Proactive Defense', label: 'Vercel Firewall', desc: 'Integrated DDoS protection and dedicated support that keeps your site safe from attacks.', icon: <ShieldCheck className="w-4 h-4 text-gray-500"/> },
                             { title: 'Extend your backend', label: 'Secure Compute', desc: 'Securely bridge your Kubernetes or on-premise backend services with Secure Compute.', icon: <Server className="w-4 h-4 text-gray-500"/> },
                             { title: 'App Observability', label: 'Default Monitoring', desc: 'Visualize usage, traffic, and more from your dashboard with built-in audit logs.', icon: <Activity className="w-4 h-4 text-gray-500"/> },
                             { title: 'Zero config', label: 'Automated CI/CD', desc: 'Automate your deployment process then review among your team with Preview Deployments.', icon: <Zap className="w-4 h-4 text-gray-500"/> },
                             { title: 'Native platform', label: 'Global Edge', desc: 'Fully managed global infrastructure for your application, from 300ms cache propagation.', icon: <Globe className="w-4 h-4 text-gray-500"/> },
                             { title: 'Security & Privacy', label: 'Isolated V8', desc: 'Leverage Secure Compute to seamlessly integrate all workloads safely.', icon: <Code className="w-4 h-4 text-gray-500"/> },
                          ].map((item, i) => (
                             <div key={i} className="group flex flex-col p-10 bg-[#020202] hover:bg-[#080808] transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                                   {item.icon}
                                </div>
                                <div className="flex justify-between items-center mb-8 cursor-pointer border-b border-white/[0.1] pb-4 relative z-10">
                                   <h3 className="text-xl font-medium text-white group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                                   <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300 font-mono mb-4 relative z-10">
                                   {item.icon} {item.label}
                                </div>
                                <p className="text-[#888] text-[15px] leading-relaxed relative z-10">{item.desc}</p>
                             </div>
                          ))}
                       </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Continue your AI journey CTA */}
          <section className="py-40 bg-[#000] border-b border-white/[0.08] relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-sm mask-fade opacity-20 pointer-events-none" />
             <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="rounded-[40px] p-2 border border-white/[0.1] bg-[#050505] flex flex-col md:flex-row items-center justify-between pl-10 shadow-[0_0_80px_rgba(255,255,255,0.03)] glow-ring relative overflow-hidden">
                   <div className="absolute inset-0 bg-dots opacity-10 mask-fade pointer-events-none"></div>
                   
                   <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-6 md:mb-0 relative z-10 py-8 md:py-4">
                      Continue your AI journey.
                   </h3>
                   
                   <div className="flex flex-col sm:flex-row items-center gap-2 bg-[#0a0a0a] rounded-full p-2 border border-white/[0.1] relative z-10 w-full md:w-auto mt-4 md:mt-0 m-2">
                      <button className="bg-white text-black px-8 py-3 rounded-full text-[15px] font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto text-center shadow-lg whitespace-nowrap">
                         Generate UI with v0.app
                      </button>
                      <button className="px-8 py-3 text-white text-[15px] font-medium hover:bg-white/[0.05] rounded-full transition-colors w-full sm:w-auto text-center whitespace-nowrap">
                         Get a Demo
                      </button>
                   </div>
                </div>
             </div>
          </section>
      </div>
    </main>
  );
}

export function Features() {
  return (
    <ErrorBoundary>
      <FeaturesContent />
    </ErrorBoundary>
  );
}
