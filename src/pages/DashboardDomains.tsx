import { Globe, Plus } from 'lucide-react';

export function DashboardDomains() {
  return (
    <div className="flex flex-col gap-8 h-full pb-20">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold tracking-tight text-white">Domains</h1>
         <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Domain
         </button>
      </div>

      <div className="flex-1 border border-white/[0.08] bg-[#020202] rounded-xl flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
         <div className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center mb-4 text-gray-400 bg-[#050505]">
            <Globe className="w-5 h-5" />
         </div>
         <h3 className="text-white font-medium mb-1">No Custom Domains</h3>
         <p className="text-gray-500 text-sm mb-6 max-w-md">Connect a custom domain to your projects for a branded experience.</p>
         <button className="bg-[#050505] border border-white/[0.1] text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:text-white hover:border-white/[0.2] transition-colors">
            Buy a Domain
         </button>
      </div>
    </div>
  );
}
