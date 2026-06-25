import React, { useState } from 'react';
import { Activity, Terminal, Eye, Gauge, LineChart, Globe, Zap, List, AlertCircle, Database } from 'lucide-react';

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
  </div>
);

export function Observability() {
  return (
    <main className="w-full bg-black text-white selection:bg-white/20 selection:text-white font-sans min-h-screen pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Outer Container with grid lines */}
        <div className="relative border border-white/10 bg-white/10 flex flex-col gap-[1px]">
          
          {/* Top Hero Row */}
          <div className="grid grid-cols-1 gap-[1px]">
            
            <div className="bg-black p-12 md:p-24 flex flex-col items-center justify-center relative min-h-[400px] text-center">
              <Crosshair className="-top-1.5 -left-1.5" />
              <Crosshair className="-top-1.5 -right-1.5" />
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#888] mb-8 z-10">
                <Activity className="w-3.5 h-3.5" />
                <span>Collab Observability</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl z-10">
                See exactly what your code is doing.
              </h1>
              <p className="text-xl text-[#888] mt-8 max-w-2xl z-10">
                Real-time logs, privacy-friendly web analytics, and Core Web Vitals monitoring—built directly into the edge network.
              </p>
            </div>
          </div>

          {/* Features Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            
            {/* Web Analytics */}
            <div className="bg-black p-12 relative flex flex-col overflow-hidden min-h-[500px]">
              <Crosshair className="-left-1.5 -top-1.5" />
              <div className="flex items-center justify-between mb-8 z-10">
                <div className="text-[#888] flex items-center gap-2 text-sm"><LineChart className="w-4 h-4" /> Web Analytics</div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Enable Analytics
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 z-10">
                Privacy-first tracking.<br />
                <span className="text-[#888] font-normal">Track page views, top referrers, and visitor demographics without cookie banners.</span>
              </h3>
              
              {/* Concrete UI Mockup */}
              <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-12 z-10">
                <div className="w-full max-w-[340px] bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <div className="text-xs text-[#888] mb-1">Total Visitors</div>
                      <div className="text-2xl font-bold text-white">24,592</div>
                    </div>
                    <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs">
                      +12.5%
                    </div>
                  </div>

                  <div className="flex items-end gap-1.5 h-24 mb-6">
                     {[30, 45, 20, 60, 80, 50, 95, 70, 40, 85, 65, 100, 55, 75].map((h, i) => (
                       <div key={i} className="flex-1 bg-white hover:bg-blue-400 transition-colors rounded-t-sm opacity-80 cursor-pointer" style={{ height: `${h}%` }}></div>
                     ))}
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="text-[10px] text-[#666] uppercase font-bold tracking-wider mb-2">Top Referrers</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white flex items-center gap-2"><Globe className="w-3 h-3 text-[#888]"/> google.com</span>
                        <span className="text-[#888]">12k</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white flex items-center gap-2"><Globe className="w-3 h-3 text-[#888]"/> github.com</span>
                        <span className="text-[#888]">8.4k</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Speed Insights */}
            <div className="bg-black p-12 relative flex flex-col overflow-hidden min-h-[500px]">
              <Crosshair className="-right-1.5 -top-1.5" />
              <div className="flex items-center justify-between mb-8 z-10">
                <div className="text-[#888] flex items-center gap-2 text-sm"><Gauge className="w-4 h-4" /> Speed Insights</div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Check Score
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 z-10">
                Core Web Vitals.<br />
                <span className="text-[#888] font-normal">Monitor real-world performance metrics from actual user devices, not just lab tests.</span>
              </h3>
              
              {/* Concrete UI Mockup */}
              <div className="flex-1 w-full flex items-center justify-center relative mt-12 z-10">
                <div className="w-full max-w-[340px] bg-[#0a0a0a] border border-white/10 rounded-xl p-5 shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col gap-4">
                  
                  <div className="flex justify-between items-center bg-black border border-white/10 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#888] font-mono">FCP</span>
                      <span className="text-sm font-bold text-white">First Contentful Paint</span>
                    </div>
                    <div className="text-green-400 font-mono text-sm bg-green-400/10 px-2 py-1 rounded">0.8s</div>
                  </div>

                  <div className="flex justify-between items-center bg-black border border-white/10 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#888] font-mono">LCP</span>
                      <span className="text-sm font-bold text-white">Largest Contentful Paint</span>
                    </div>
                    <div className="text-green-400 font-mono text-sm bg-green-400/10 px-2 py-1 rounded">1.2s</div>
                  </div>

                  <div className="flex justify-between items-center bg-black border border-white/10 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#888] font-mono">CLS</span>
                      <span className="text-sm font-bold text-white">Cumulative Layout Shift</span>
                    </div>
                    <div className="text-yellow-400 font-mono text-sm bg-yellow-400/10 px-2 py-1 rounded">0.12</div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Full Width Row - Runtime Logs */}
          <div className="grid grid-cols-1 gap-[1px]">
             <div className="bg-black p-12 relative flex flex-col lg:flex-row gap-12 items-center">
               <Crosshair className="-left-1.5 -top-1.5" />
               <Crosshair className="-right-1.5 -top-1.5" />
               
               <div className="flex-1">
                 <div className="text-[#888] flex items-center gap-2 text-sm mb-4"><List className="w-4 h-4" /> Runtime Logs</div>
                 <h3 className="text-3xl font-bold text-white mb-4">Stream logs from the edge.</h3>
                 <p className="text-[#888] text-lg max-w-md leading-relaxed mb-6">
                   Debug issues instantly. View serverless function logs, edge middleware logs, and build logs in real-time without refreshing the page.
                 </p>
                 <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                   View Documentation
                 </button>
               </div>

               <div className="flex-[1.5] w-full">
                 <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden font-mono text-[11px] shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                   <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-black">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span className="text-[#666] ml-2">production • collab-api • us-east-1</span>
                   </div>
                   <div className="p-4 space-y-3 max-h-[250px] overflow-hidden">
                     <div className="flex gap-4 opacity-70">
                       <span className="text-[#666] shrink-0">14:02:01</span>
                       <span className="text-blue-400 shrink-0">INFO</span>
                       <span className="text-[#ddd]">Function initialized in 12ms</span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-[#666] shrink-0">14:02:02</span>
                       <span className="text-green-400 shrink-0">GET</span>
                       <span className="text-white">/api/v1/users/me - 200 OK (4ms)</span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-[#666] shrink-0">14:02:05</span>
                       <span className="text-green-400 shrink-0">POST</span>
                       <span className="text-white">/api/v1/workspaces/create - 201 Created (45ms)</span>
                     </div>
                     <div className="flex gap-4 bg-red-500/10 -mx-4 px-4 py-1 border-l-2 border-red-500">
                       <span className="text-[#666] shrink-0">14:02:08</span>
                       <span className="text-red-400 shrink-0 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> ERROR</span>
                       <span className="text-red-200">Database connection timeout: Unable to reach Postgres cluster on port 5432.</span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-[#666] shrink-0">14:02:10</span>
                       <span className="text-yellow-400 shrink-0">WARN</span>
                       <span className="text-[#ddd]">Rate limit threshold approaching for IP 192.168.1.1 (95/100)</span>
                     </div>
                     <div className="flex gap-4 opacity-70">
                       <span className="text-[#666] shrink-0">14:02:11</span>
                       <span className="text-green-400 shrink-0">GET</span>
                       <span className="text-white">/api/v1/status - 200 OK (2ms)</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* New Section: Distributed Tracing */}
          <div className="bg-black p-12 md:p-16 border-t border-white/10 relative">
            <Crosshair className="-left-1.5 -top-1.5" />
            <Crosshair className="-right-1.5 -top-1.5" />
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-[1.5] w-full order-2 lg:order-1">
                 <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                   <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                     <div className="text-xs text-[#888]">Trace ID: <span className="text-white font-mono">req_8f72a9b</span></div>
                     <div className="text-xs text-[#888]">Total Time: <span className="text-white font-mono">1.24s</span></div>
                   </div>
                   <div className="space-y-3 relative">
                     {/* Flamegraph Mockup */}
                     <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-white/5 border-l border-dashed border-white/10"></div>
                     <div className="absolute left-[40%] top-0 bottom-0 w-[1px] bg-white/5 border-l border-dashed border-white/10"></div>
                     <div className="absolute left-[70%] top-0 bottom-0 w-[1px] bg-white/5 border-l border-dashed border-white/10"></div>

                     <div className="relative h-6 bg-blue-500/20 border border-blue-500/30 rounded flex items-center px-2 text-[10px] text-blue-100" style={{ width: '100%' }}>
                       POST /api/checkout
                     </div>
                     <div className="relative h-6 bg-purple-500/20 border border-purple-500/30 rounded flex items-center px-2 text-[10px] text-purple-100 ml-[5%]" style={{ width: '25%' }}>
                       middleware.ts (auth)
                     </div>
                     <div className="relative h-6 bg-green-500/20 border border-green-500/30 rounded flex items-center px-2 text-[10px] text-green-100 ml-[30%]" style={{ width: '40%' }}>
                       db.query (transactions)
                     </div>
                     <div className="relative h-6 bg-orange-500/20 border border-orange-500/30 rounded flex items-center px-2 text-[10px] text-orange-100 ml-[35%]" style={{ width: '15%' }}>
                       kv.get (user_session)
                     </div>
                     <div className="relative h-6 bg-red-500/20 border border-red-500/30 rounded flex items-center px-2 text-[10px] text-red-100 ml-[70%]" style={{ width: '25%' }}>
                       stripe.charges.create
                     </div>
                   </div>
                 </div>
              </div>
              <div className="flex-1 w-full order-1 lg:order-2">
                <div className="text-[#888] flex items-center gap-2 text-sm mb-4"><LineChart className="w-4 h-4" /> Distributed Tracing</div>
                <h3 className="text-3xl font-bold text-white mb-4">Find the bottleneck.</h3>
                <p className="text-[#888] text-lg mb-8 leading-relaxed">
                  Visualize exactly where your requests are spending time. Trace executions across edge functions, middleware, databases, and third-party APIs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-[#ddd]">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> OpenTelemetry native
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#ddd]">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Automatic instrumentation
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#ddd]">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Database query profiling
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* New Section: Alerts & Export */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            <div className="bg-black p-12 relative min-h-[400px] flex flex-col justify-center overflow-hidden">
               <Crosshair className="-left-1.5 -top-1.5" />
               <div className="text-[#888] flex items-center gap-2 text-sm mb-8 z-10"><AlertCircle className="w-4 h-4" /> Proactive Alerts</div>
               <h3 className="text-2xl font-bold text-white mb-4 z-10 tracking-tight">Know before your users do.</h3>
               <p className="text-[#888] mb-8 text-[15px] leading-relaxed z-10">Configure complex alerting rules based on P99 latency spikes, 5xx error rates, or traffic anomalies.</p>
               
               <div className="w-full max-w-sm border border-white/10 bg-[#0a0a0a] rounded-lg p-4 z-10">
                 <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                   <span className="text-sm text-white font-medium">Alert Rule</span>
                   <div className="w-8 h-4 bg-green-500 rounded-full relative shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                     <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 mb-3">
                   <span className="text-xs text-[#888]">IF</span>
                   <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white">5xx Errors</span>
                   <span className="text-xs text-[#888]">&gt;</span>
                   <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white">5%</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="text-xs text-[#888]">THEN</span>
                   <span className="text-xs bg-[#E01E5A]/10 text-[#E01E5A] border border-[#E01E5A]/20 px-2 py-1 rounded font-medium">Slack #incidents</span>
                 </div>
               </div>
            </div>
            
            <div className="bg-black p-12 relative min-h-[400px] flex flex-col justify-center overflow-hidden">
               <Crosshair className="-right-1.5 -top-1.5" />
               <div className="text-[#888] flex items-center gap-2 text-sm mb-8 z-10"><Database className="w-4 h-4" /> Data Export</div>
               <h3 className="text-2xl font-bold text-white mb-4 z-10 tracking-tight">Own your data.</h3>
               <p className="text-[#888] mb-8 text-[15px] leading-relaxed z-10">Stream logs directly into your existing infrastructure. Natively integrated with Datadog, Splunk, and AWS S3.</p>
               
               <div className="flex gap-4 z-10">
                 <div className="w-16 h-16 border border-white/10 bg-[#0a0a0a] rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-[#632CA6] flex items-center justify-center text-white font-bold text-xs">DD</div>
                 </div>
                 <div className="w-16 h-16 border border-white/10 bg-[#0a0a0a] rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">S3</div>
                 </div>
                 <div className="w-16 h-16 border border-white/10 bg-[#0a0a0a] rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-white font-bold text-xs">&gt;_</div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
