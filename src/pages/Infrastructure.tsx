import { Link } from 'react-router-dom';
import { Cpu, Lock, Terminal, Zap, Code2, Rocket, Database, HardDrive, Share2, Globe, Github, ChevronRight } from 'lucide-react';

export function Infrastructure() {
  return (
    <div className="flex flex-col w-full relative bg-black font-sans text-white selection:bg-white/30">
      
      {/* Strict Grid Container */}
      <div className="w-full max-w-[1400px] mx-auto border-x border-white/[0.08] min-h-screen flex flex-col">

        {/* Row 1: Hero & Feature Stack */}
        <div className="flex flex-col lg:flex-row w-full border-b border-white/[0.08]">
          
          {/* Left Column: Hero Typography (Sticky) */}
          <div className="w-full lg:w-[40%] lg:border-r border-white/[0.08] p-8 md:p-12 lg:p-20 flex flex-col justify-start pt-32 lg:sticky top-0 lg:h-[100vh]">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.1] mb-8">
                Introducing the core infrastructure engine to power your startup.
             </h1>
             <p className="text-[#888] text-lg lg:text-xl leading-relaxed mb-12 max-w-md">
                From the way teams collaborate on large codebases, to how apps get instantly provisioned—we're excited to announce these new automated features.
             </p>
          </div>

          {/* Right Column: Feature Stack */}
          <div className="w-full lg:w-[60%] flex flex-col">
             
             {/* Feature 1: Secure Compute / Containerization */}
             <div className="w-full border-b border-white/[0.08] p-8 md:p-12 lg:p-20 flex flex-col min-h-[600px]">
                <div className="flex items-center gap-2 text-[#888] text-xs font-mono mb-8 uppercase tracking-widest">
                   <Cpu className="w-4 h-4" /> Secure Compute
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-4 text-white leading-tight">
                   Limit your exposure. <span className="text-[#888]">Your internal APIs and databases are secure from the public internet. Builds and runtime traffic are funnelled through fully dedicated internal Docker networks.</span>
                </h2>
                
                {/* Visual Graphic (Flat Vercel Style) */}
                <div className="mt-20 w-full flex-grow flex items-center justify-center relative select-none">
                   <div className="flex items-center justify-between w-full max-w-2xl relative h-[280px]">
                       
                       {/* Left Node (Source) */}
                       <div className="w-[200px] z-20">
                           <div className="bg-black border border-white/[0.15] p-5 rounded-lg relative overflow-hidden">
                              <div className="flex items-center justify-between mb-4">
                                 <div className="flex items-center gap-2 text-white text-sm font-medium"><Terminal className="w-4 h-4 text-[#888]"/> Source Code</div>
                              </div>
                              <div className="font-mono text-xs text-[#888] space-y-1.5">
                                 <div><span className="text-white">"scripts"</span>: {'{'}</div>
                                 <div className="pl-3"><span className="text-[#aaa]">"start"</span>: <span className="text-[#666]">"node server"</span></div>
                                 <div>{'}'}</div>
                              </div>
                           </div>
                       </div>

                       {/* Connectors (Static SVG) */}
                       <div className="absolute left-[190px] right-[190px] top-0 bottom-0 pointer-events-none z-0">
                           <svg className="w-full h-full" preserveAspectRatio="none">
                               <path d="M 0 140 C 80 140, 80 40, 100% 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                               <path d="M 0 140 L 100% 140" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                               <path d="M 0 140 C 80 140, 80 240, 100% 240" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                           </svg>
                       </div>

                       {/* Right Nodes (Infrastructure) */}
                       <div className="w-[200px] h-full flex flex-col justify-between z-20">
                          {/* Top: API Container */}
                          <div className="bg-black border border-white/[0.15] p-4 rounded-lg flex items-center gap-4 relative">
                             <div className="w-8 h-8 rounded bg-[#111] border border-white/[0.1] flex items-center justify-center"><Cpu className="w-4 h-4 text-[#aaa]"/></div>
                             <div>
                                <div className="text-white text-sm font-medium">Node.js API</div>
                                <div className="text-[#666] text-xs font-mono mt-0.5">Isolated</div>
                             </div>
                          </div>

                          {/* Middle: Database */}
                          <div className="bg-black border border-white/[0.15] p-4 rounded-lg flex items-center gap-4 relative">
                             <div className="w-8 h-8 rounded bg-[#111] border border-white/[0.1] flex items-center justify-center"><Database className="w-4 h-4 text-[#aaa]"/></div>
                             <div>
                                <div className="text-white text-sm font-medium">PostgreSQL</div>
                                <div className="text-[#666] text-xs font-mono mt-0.5">VPC Link</div>
                             </div>
                          </div>

                          {/* Bottom: Storage */}
                          <div className="bg-black border border-white/[0.15] p-4 rounded-lg flex items-center gap-4 relative">
                             <div className="w-8 h-8 rounded bg-[#111] border border-white/[0.1] flex items-center justify-center"><HardDrive className="w-4 h-4 text-[#aaa]"/></div>
                             <div>
                                <div className="text-white text-sm font-medium">S3 Bucket</div>
                                <div className="text-[#666] text-xs font-mono mt-0.5">Private</div>
                             </div>
                          </div>
                       </div>
                   </div>
                </div>
             </div>

             {/* Feature 2: Subdomain Routing / Load Balancing */}
             <div className="w-full p-8 md:p-12 lg:p-20 flex flex-col min-h-[600px]">
                 <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-2 text-[#888] text-xs font-mono uppercase tracking-widest">
                       <Zap className="w-4 h-4" /> Dynamic Proxies
                    </div>
                    <Link to="/docs" className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors tracking-wide">
                       Read the docs
                    </Link>
                 </div>
                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-16 text-white max-w-xl leading-tight">
                   Manage the traffic. <span className="text-[#888]">Minimize downtime by automatically proxying custom subdomains directly to your isolated Docker container ports in real-time.</span>
                 </h2>

                 {/* Visual Graphic (Flat Terminal/Progress) */}
                 <div className="w-full border border-white/[0.15] rounded-lg bg-black p-6 lg:p-8 mt-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between text-xs text-[#888] font-mono mb-3">
                         <span>Proxy: project.52.172.229.65.nip.io</span>
                         <span>Target: :43921</span>
                      </div>
                      
                      <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden mb-8">
                         <div className="h-full bg-white w-full" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] font-mono text-[#666]">
                         <div>
                            <div className="text-white mb-3">Incoming Request</div>
                            <div className="flex items-center gap-3 mb-2">
                              <Share2 className="w-3 h-3 text-[#555]" />
                              <span className="text-[#888]">b4c6756</span> <span className="text-white">GET /api/users</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Share2 className="w-3 h-3 text-[#555]" />
                              <span className="text-[#888]">8yoR9yx</span> <span className="text-white">POST /api/deploy</span>
                            </div>
                         </div>
                         <div>
                            <div className="text-white mb-3">Internal Docker Response</div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              <span className="text-white">200 OK</span> <span className="text-[#666]">- 12ms</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              <span className="text-white">201 Created</span> <span className="text-[#666]">- 45ms</span>
                            </div>
                         </div>
                      </div>
                    </div>
                 </div>
             </div>

          </div>
        </div>

        {/* Row 2: Developer Workflow (2 Columns) */}
        <div className="flex flex-col md:flex-row w-full border-b border-white/[0.08]">
          <div className="w-full md:w-1/2 p-8 lg:p-16 border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col min-h-[400px]">
             <div className="flex items-center gap-2 text-[#888] text-xs font-mono uppercase tracking-widest mb-8">
                 <Terminal className="w-4 h-4" /> CollabCode CLI
             </div>
             <h3 className="text-2xl font-medium text-white mb-4">Deploy from terminal.</h3>
             <p className="text-[#888] mb-12">Run our CLI command from your project's root directory to instantly deploy your current local environment.</p>
             <div className="mt-auto bg-black border border-white/[0.15] p-4 rounded-lg font-mono text-sm text-[#aaa] flex items-center gap-3">
                <span className="text-[#444]">$</span> collabcode deploy --prod
             </div>
          </div>
          
          <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col min-h-[400px]">
             <div className="flex items-center gap-2 text-[#888] text-xs font-mono uppercase tracking-widest mb-8">
                 <Github className="w-4 h-4" /> Git Integration
             </div>
             <h3 className="text-2xl font-medium text-white mb-4">Continuous Deployment.</h3>
             <p className="text-[#888] mb-12">Automatically deploy your project on every push to a branch. We'll build and deploy your app instantly.</p>
             <div className="mt-auto bg-black border border-white/[0.15] p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center border border-white/[0.1]"><Github className="w-4 h-4 text-white"/></div>
                   <div>
                      <div className="text-white text-sm font-medium">RudraJad2005/startup</div>
                      <div className="text-[#666] text-xs">Connected to main</div>
                   </div>
                </div>
                <div className="text-xs font-medium bg-[#111] border border-white/[0.1] text-white px-2 py-1 rounded">Active</div>
             </div>
          </div>
        </div>

        {/* Row 3: Global Edge Network */}
        <div className="w-full border-b border-white/[0.08] p-8 lg:p-20 flex flex-col items-center text-center bg-[#020202]">
           <div className="flex items-center gap-2 text-[#888] text-xs font-mono uppercase tracking-widest mb-8">
               <Globe className="w-4 h-4" /> Global Network
           </div>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-white max-w-3xl leading-tight">
             Deploy globally in seconds.
           </h2>
           <p className="text-[#888] text-lg max-w-2xl mb-16">
             Your infrastructure is automatically provisioned across multiple availability zones, ensuring your users always get the fastest response times possible.
           </p>

           <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
              {['San Francisco', 'New York', 'Frankfurt', 'Singapore'].map((city, i) => (
                 <div key={i} className="bg-black border border-white/[0.1] p-6 rounded-lg text-left">
                    <div className="text-white font-medium mb-1">{city}</div>
                    <div className="text-[#888] font-mono text-xs">12ms latency</div>
                 </div>
              ))}
           </div>
        </div>

        {/* Row 4: 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-white/[0.08]">
          <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col gap-6">
              <Database className="w-6 h-6 text-[#888]" />
              <h3 className="text-lg font-medium text-white">Infinite scalability.</h3>
              <p className="text-[#888] text-sm leading-relaxed">Enable code to run on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware.</p>
          </div>
          <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col gap-6">
              <Code2 className="w-6 h-6 text-[#888]" />
              <h3 className="text-lg font-medium text-white">AST-driven architecture.</h3>
              <p className="text-[#888] text-sm leading-relaxed">CollabCode analyzes your package.json and source files to automatically detect and provision databases, cache layers, and storage buckets.</p>
          </div>
          <div className="p-8 lg:p-12 flex flex-col gap-6">
              <HardDrive className="w-6 h-6 text-[#888]" />
              <h3 className="text-lg font-medium text-white">Efficient compute.</h3>
              <p className="text-[#888] text-sm leading-relaxed">Fluid compute optimizes resources to deliver powerful performance while minimizing waste across your entire server fleet.</p>
          </div>
        </div>

        {/* Row 5: CTA */}
        <div className="w-full p-16 lg:p-32 flex flex-col items-center text-center">
           <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-white">
             Ready to deploy?
           </h2>
           <p className="text-[#888] text-lg mb-10 max-w-xl">
             Start building with CollabCode's next-generation infrastructure engine today.
           </p>
           <div className="flex items-center gap-4">
              <Link to="/dashboard/new" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                 Start Deploying
              </Link>
              <Link to="/contact" className="bg-black text-white border border-white/[0.15] px-6 py-3 rounded-full font-medium hover:bg-[#111] transition-colors">
                 Contact Sales
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
