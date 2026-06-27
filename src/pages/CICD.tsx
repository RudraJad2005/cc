import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, GitMerge, CheckCircle2, MessageSquare, Terminal, Eye, Link as LinkIcon, RefreshCw, LayoutTemplate, ShieldAlert, Accessibility, Lock, Users } from 'lucide-react';
import { SiGithub, SiGitlab, SiBitbucket } from 'react-icons/si';

export function CICD() {
  const containerRef = useRef<HTMLDivElement>(null);



  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-blue-500/30 selection:text-white font-sans">
      
      {/* Top Hero Section */}
      <section className="pt-24 md:pt-40 pb-16 md:pb-32 flex flex-col items-center justify-center relative border-b border-white/[0.05]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[800px]">
          {/* Static badges */}
          <div className="flex gap-4 mb-12 flex-wrap justify-center relative">
            <div className="px-4 py-1.5 rounded-full bg-[#111] text-[#888] border border-white/10 text-sm font-medium">Comments</div>
            <div className="px-4 py-1.5 rounded-full bg-[#111] text-[#888] border border-white/10 text-sm font-medium">CMS Drafts</div>
            <div className="px-4 py-1.5 rounded-full bg-[#111] text-[#888] border border-white/10 text-sm font-medium">Accessibility</div>
            <div className="px-4 py-1.5 rounded-full bg-[#111] text-[#888] border border-white/10 text-sm font-medium">Share</div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            A deployment for every idea.
          </h1>
          <p className="text-base md:text-xl text-[#888] leading-relaxed mb-10 max-w-[600px]">
            Traditional deployment tools weren't built for modern development. Get the platform that has teams shipping faster with higher quality.
          </p>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
               Start Building
            </button>
            <button className="px-5 py-2.5 border border-white/15 text-white/80 rounded-full text-sm font-medium hover:bg-white/5 hover:text-white transition-all">
               Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section ref={containerRef} className="relative w-full max-w-[1200px] mx-auto px-4 md:px-0 pb-20 md:pb-40">
        
        {/* Central Line Structure */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block z-0" style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#22c55e] to-[#8b5cf6]" />
        </div>

        {/* --- Block 1: Develop & Push --- */}
        <div className="relative flex flex-col md:flex-row min-h-[80vh] z-10">
          {/* Left Column (Sticky Quote/Heading) */}
          <div className="md:w-1/2 p-8 md:pr-16 flex items-start justify-end sticky top-32 h-fit">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-left md:text-right max-w-sm">
              Zero-config to deploy. Instantly share your work.
            </h2>
          </div>
          
          {/* Right Column (Scrolling Content) */}
          <div className="md:w-1/2 p-8 md:pl-16 flex flex-col gap-32 mt-16 md:mt-40">
            
            {/* Step 1 */}
            <div className="flex flex-col gap-6 relative">
              <div className="absolute top-4 -left-[68px] w-2 h-2 rounded-full bg-blue-500 hidden md:block"></div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Develop. <span className="text-[#888] font-normal">GitHub, Bitbucket, GitLab, Azure DevOps or our CLI.</span></h3>
              </div>
              <div className="flex items-center gap-4 text-[#666]">
                <SiGithub className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                <SiGitlab className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                <SiBitbucket className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
                <Terminal className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-6 relative">
              <div className="absolute top-4 -left-[68px] w-2 h-2 rounded-full bg-purple-500 hidden md:block shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Push to preview. <span className="text-[#888] font-normal">Setting up staging shouldn't be a separate step. Every PR gets its own, fully-functional environment.</span></h3>
              </div>
              
              {/* GitHub Mockup */}
              <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#111113]">
                  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="bot" className="w-5 h-5 rounded-full bg-white p-0.5 filter invert" />
                  <span className="text-sm font-semibold text-white">collab-bot <span className="text-[#666] font-normal text-xs ml-2">commented just now</span></span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#ccc] mb-4">The latest updates on your project. <span className="text-blue-400 cursor-pointer hover:underline">Learn more</span></p>
                  <div className="overflow-x-auto"><table className="w-full text-left text-sm min-w-[400px]">
                    <thead>
                      <tr className="text-[#666] border-b border-white/5">
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Preview</th>
                        <th className="pb-2 font-medium">Comments</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#aaa]">
                      <tr className="border-b border-white/5">
                        <td className="py-3">app</td>
                        <td className="py-3"><span className="flex items-center gap-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Ready</span></td>
                        <td className="py-3"><span className="text-blue-400 cursor-pointer hover:underline">Visit Preview</span></td>
                        <td className="py-3"><span className="flex items-center gap-1 text-blue-400"><MessageSquare className="w-4 h-4" /> 3 Resolved</span></td>
                      </tr>
                      <tr>
                        <td className="py-3">site</td>
                        <td className="py-3"><span className="flex items-center gap-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Ready</span></td>
                        <td className="py-3"><span className="text-blue-400 cursor-pointer hover:underline">Visit Preview</span></td>
                        <td className="py-3"><span className="flex items-center gap-1 text-[#666]"><MessageSquare className="w-4 h-4" /> Comment</span></td>
                      </tr>
                    </tbody>
                  </table></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- Block 2: Iterate --- */}
        <div className="relative flex flex-col md:flex-row min-h-[80vh] z-10">
          {/* Left Column (Sticky Quote) */}
          <div className="md:w-1/2 p-8 md:pr-16 flex flex-col items-end justify-start sticky top-32 h-fit">
            <blockquote className="text-xl md:text-2xl text-[#888] font-medium leading-relaxed text-right max-w-sm mb-6">
              "This has completely changed our workflow, we're able to ship more confidently."
            </blockquote>
            <div className="font-bold text-white tracking-widest text-xl uppercase">SONOS</div>
          </div>
          
          {/* Right Column (Scrolling Content) */}
          <div className="md:w-1/2 p-8 md:pl-16 flex flex-col gap-32 mt-16 md:mt-0">
            
            {/* Step 3 */}
            <div className="flex flex-col gap-6 relative">
              <div className="absolute top-4 -left-[68px] w-2 h-2 rounded-full bg-pink-500 hidden md:block shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Keep pushing forward. <span className="text-[#888] font-normal">When builds are fast and rollbacks are instant, every developer can ship small, iterative changes that keep the team moving forward.</span></h3>
              </div>
              
              {/* Issue Tracker Mockup */}
              <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
                {/* Item 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent transition-colors group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">Migrate core pages to App Router</div>
                      <div className="flex items-center gap-2 text-xs text-[#666]">
                        <GitBranch className="w-3 h-3" /> rf/app-router
                        <span>•</span> 2m ago
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-2 text-[#666] group-hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" /> <span className="text-sm">Comment</span>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">Add banner to conf website</div>
                      <div className="flex items-center gap-2 text-xs text-[#666]">
                        <GitBranch className="w-3 h-3" /> 21342-banner
                        <span>•</span> 2h ago
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-2 text-[#aaa]">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-400" /> <span className="text-sm text-blue-400">4/5 Resolved</span>
                  </div>
                </div>
              </div>

              {/* Toolbar Mockup */}
              <div className="mt-8 flex flex-col items-center p-6 bg-gradient-to-b from-[#111] to-black border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
                 <div className="relative z-10 flex items-center gap-4 bg-[#1a1a1c] border border-white/10 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    <MessageSquare className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                    <Eye className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                    <LinkIcon className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                    <div className="w-px h-5 bg-white/20 mx-2"></div>
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border border-[#1a1a1c]"></div>
                       <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border border-[#1a1a1c]"></div>
                       <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 border border-[#1a1a1c]"></div>
                    </div>
                 </div>
                 <p className="mt-6 text-center text-sm text-[#888] relative z-10">
                   <strong className="text-white">The Collab Toolbar.</strong> A toolbox for iteration.<br/>Your command center, wherever you work.
                 </p>
              </div>

            </div>
          </div>
        </div>

        {/* --- Block 4: New Sections --- */}
        <div className="relative flex flex-col md:flex-row min-h-[80vh] z-10">
          {/* Left Column (Sticky Quote) */}
          <div className="md:w-1/2 p-8 md:pr-16 flex flex-col items-end justify-start sticky top-32 h-fit">
            <blockquote className="text-xl md:text-2xl text-[#888] font-medium leading-relaxed text-right max-w-sm mb-6">
              "Collab Code has given us the peace of mind to ship 10x faster."
            </blockquote>
            <div className="font-bold text-white tracking-widest text-xl uppercase">Acme Corp</div>
          </div>
          
          {/* Right Column (Scrolling Content) */}
          <div className="md:w-1/2 p-8 md:pl-16 flex flex-col gap-32 mt-16 md:mt-0">
            
            {/* Step 6: Collaborate */}
            <div className="flex flex-col gap-6 relative">
              <div className="absolute top-4 -left-[68px] w-2 h-2 rounded-full bg-cyan-500 hidden md:block"></div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Collaborate seamlessly. <span className="text-[#888] font-normal">Add comments and feedback directly on the preview link just like Google Docs.</span></h3>
              </div>
              
              <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#1a1a1c] border border-white/5 rounded-lg p-3 text-sm text-[#ccc]">
                      <span className="font-bold text-white">@alex</span> The padding here looks a bit tight on mobile. Can we increase it to 24px?
                    </div>
                    <div className="text-xs text-[#666]">Just now • Preview URL</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7: Security */}
            <div className="flex flex-col gap-6 relative">
              <div className="absolute top-4 -left-[68px] w-2 h-2 rounded-full bg-emerald-500 hidden md:block"></div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Security by default. <span className="text-[#888] font-normal">Automated secret scanning and dependency checks on every commit.</span></h3>
              </div>
              
              <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4">
                 <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">Security Scan Passed</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-[#888] bg-[#111113] p-2 rounded">
                       <span>Dependencies (npm audit)</span>
                       <span className="text-emerald-400">0 vulnerabilities</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#888] bg-[#111113] p-2 rounded">
                       <span>Secret Scanning</span>
                       <span className="text-emerald-400">0 leaked secrets</span>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Bottom CTA Split */}
      <section className="w-full flex flex-col md:flex-row min-h-[400px]">
         {/* Left Green Block */}
         <div className="w-full md:w-1/2 bg-[#22c55e] p-8 md:p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-lg">
              Scale with<br/>confidence.
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-md leading-relaxed">
              Join the thousands of teams using Collab Code Enterprise to secure their infrastructure.
            </p>
            <button className="w-fit px-6 py-3 bg-white text-black font-semibold text-[15px] flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg">
               Contact Enterprise Sales <span className="ml-1">→</span>
            </button>
         </div>

         {/* Right Purple Block */}
         <div className="w-full md:w-1/2 bg-[#8b5cf6] p-8 md:p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-lg">
              Start building<br/>for free.
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-md leading-relaxed">
              Deploy your first workspace in seconds. No credit card required.
            </p>
            <button className="w-fit px-8 py-3 bg-black text-white font-semibold text-[15px] flex items-center gap-2 hover:bg-black/80 transition-colors shadow-lg">
               Sign Up <span className="ml-1">→</span>
            </button>
         </div>
      </section>

    </main>
  );
}
