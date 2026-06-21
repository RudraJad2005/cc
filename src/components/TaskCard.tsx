import { Terminal, MoreHorizontal } from 'lucide-react';

export function TaskCard() {
  return (
    <div className="w-full sm:w-[260px] rounded-xl border border-white/[0.08] bg-[#161616]/80 backdrop-blur-sm p-5 relative overflow-hidden shadow-2xl font-mono">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal className="w-[14px] h-[14px]" />
          <span className="text-[11px] font-medium tracking-wide">server.ts</span>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </div>
      
      <div className="text-[11px] text-[#71717a] mb-6 leading-relaxed flex flex-col gap-1.5 overflow-hidden">
         <div className="whitespace-nowrap"><span className="text-pink-500">import</span> <span className="text-white">express</span> <span className="text-pink-500">from</span> <span className="text-green-400">'express'</span>;</div>
         <div className="whitespace-nowrap"><span className="text-pink-500">const</span> <span className="text-blue-400">app</span> = <span className="text-yellow-200">express</span>();</div>
         <div className="relative">
            <span className="text-pink-500">const</span> port = <span className="text-orange-400">3000</span>;
            <div className="absolute left-[70px] top-[-10px] w-[2px] h-[14px] bg-blue-500 animate-pulse"></div>
            <div className="absolute left-[70px] top-[-22px] bg-blue-500 text-white text-[8px] px-1 rounded shadow-lg z-20">Alex</div>
         </div>
      </div>
      
      <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/[0.06]">
        <div className="flex -space-x-1.5 relative z-10">
          <div className="w-[18px] h-[18px] rounded-full ring-2 ring-[#161616] overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=33" className="w-full h-full object-cover" alt="avatar 1" />
          </div>
          <div className="w-[18px] h-[18px] rounded-full ring-2 ring-[#161616] overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=47" className="w-full h-full object-cover" alt="avatar 2" />
          </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-500 font-sans">Compute Active</span>
        </div>
      </div>
    </div>
  );
}
