export function FlowCard() {
  return (
    <div className="w-full sm:w-[320px] rounded-xl border border-white/[0.08] bg-[#161616]/80 backdrop-blur-sm p-5 relative h-[200px] flex items-center shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none rounded-xl" />
      
      <div className="w-full h-full relative">
        <svg className="absolute inset-0 w-full h-full" overflow="visible" preserveAspectRatio="none" viewBox="0 0 280 160">
          <path d="M 20,80 L 100,80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M 50,80 Q 60,80 60,60 L 60,50 Q 60,40 70,40 L 150,40 Q 160,40 160,50 L 160,70 Q 160,80 170,80 L 220,80" stroke="#3b82f6" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        
        <div className="absolute top-[74px] left-[14px] flex flex-col items-center">
          <span className="text-[10px] text-gray-400 mb-1 absolute -top-5 tracking-wide">main</span>
          <div className="w-3 h-3 rounded-full bg-[#52525b] ring-2 ring-[#161616] z-10" />
        </div>
        <div className="absolute top-[34px] left-[104px] flex flex-col items-center">
          <span className="text-[10px] text-blue-400 mb-1 absolute -top-5 tracking-wide">feature/auth</span>
          <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-[#161616] z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>
        <div className="absolute top-[74px] left-[184px] flex flex-col items-center">
          <span className="text-[10px] text-gray-400 mb-1 absolute -top-5 tracking-wide">Merge PR</span>
          <div className="w-3 h-3 rounded-full bg-white ring-2 ring-[#161616] z-10 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
        </div>
      </div>
    </div>
  );
}
