import { Activity } from 'lucide-react';

export function DashboardUsage() {
  return (
    <div className="flex flex-col gap-8 h-full pb-20">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold tracking-tight text-white">Usage</h1>
      </div>

      <div className="flex-1 border border-white/[0.08] bg-[#020202] rounded-xl flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
         <div className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center mb-4 text-gray-400 bg-[#050505]">
            <Activity className="w-5 h-5" />
         </div>
         <h3 className="text-white font-medium mb-1">Usage Data Unavailable</h3>
         <p className="text-gray-500 text-sm mb-6 max-w-md">Deploy a project to start collecting usage and analytics data.</p>
      </div>
    </div>
  );
}
