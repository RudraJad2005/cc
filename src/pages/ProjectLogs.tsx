import { FileText, Search, Play, Pause, Download, Filter } from 'lucide-react';
import { useState } from 'react';

export function ProjectLogs() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const mockLogs = [
    { id: 1, time: '14:22:01.452', level: 'info', message: 'Starting build process for commit a1b2c3d...' },
    { id: 2, time: '14:22:02.103', level: 'info', message: 'Cloning repository...' },
    { id: 3, time: '14:22:04.891', level: 'info', message: 'Installing dependencies using npm ci...' },
    { id: 4, time: '14:22:15.220', level: 'warn', message: 'npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+' },
    { id: 5, time: '14:22:20.005', level: 'info', message: 'Build completed in 18.5s' },
    { id: 6, time: '14:22:20.100', level: 'info', message: 'Deploying to edge network...' },
    { id: 7, time: '14:22:25.842', level: 'info', message: 'Deployment successful. URL: cc-main-a1b2c3d.collab.app' },
    { id: 8, time: '14:30:12.110', level: 'error', message: 'Failed to connect to database: Connection timeout' },
    { id: 9, time: '14:30:15.000', level: 'info', message: 'Retrying database connection (1/3)...' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-gray-400" /> Runtime Logs
           </h1>
           <p className="text-sm text-gray-400">View real-time build and execution logs for your project.</p>
         </div>
         <div className="flex items-center gap-3">
           <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium rounded-lg transition-colors text-sm border border-white/[0.08]"
           >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Resume'}
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium rounded-lg transition-colors text-sm border border-white/[0.08]">
              <Download className="w-4 h-4" /> Export
           </button>
         </div>
      </div>

      <div className="flex flex-col flex-1 bg-[#050505] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-3 border-b border-white/[0.1] bg-[#0a0a0a]">
           <div className="relative flex-1 max-w-md">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Search logs..." className="w-full bg-[#000] border border-white/[0.1] rounded-md pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/[0.3] placeholder:text-[#666]" />
           </div>
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" /> Filter Level
           </button>
        </div>

        {/* Terminal Window */}
        <div className="flex-1 p-4 font-mono text-[13px] overflow-y-auto leading-relaxed">
           {mockLogs.map(log => (
             <div key={log.id} className="flex items-start gap-4 py-1 hover:bg-white/[0.02] rounded px-2 -mx-2 transition-colors">
                <span className="text-gray-600 shrink-0 select-none">{log.time}</span>
                <span className={`shrink-0 uppercase text-[10px] tracking-wider font-bold mt-0.5 w-12 ${log.level === 'error' ? 'text-red-400' : log.level === 'warn' ? 'text-yellow-400' : 'text-blue-400'}`}>
                   {log.level}
                </span>
                <span className={`break-words ${log.level === 'error' ? 'text-red-300' : log.level === 'warn' ? 'text-yellow-300' : 'text-gray-300'}`}>
                   {log.message}
                </span>
             </div>
           ))}
           <div className="animate-pulse flex items-center gap-2 mt-4 text-gray-500">
             <div className="w-2 h-4 bg-gray-500"></div> Waiting for new logs...
           </div>
        </div>
      </div>
    </div>
  );
}
