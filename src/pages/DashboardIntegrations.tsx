import { Link } from 'react-router-dom';
import { Info, Hexagon, Database, Lock, Globe, Box } from 'lucide-react';

export function DashboardIntegrations() {
  const latestIntegrations = [
    { name: 'Auth0', desc: 'Auth for Users, APIs & Agents', icon: <img src="https://api.iconify.design/simple-icons:auth0.svg?color=white" className="w-4 h-4 object-contain" alt="Auth0" /> },
    { name: 'Shopify', desc: 'Build and deploy high-performance Shopify storefronts', icon: <img src="https://api.iconify.design/simple-icons:shopify.svg?color=%2395BF47" className="w-4 h-4 object-contain" alt="Shopify" /> },
    { name: 'AWS', desc: 'Serverless, reliable, secure AWS Services.', icon: <img src="https://api.iconify.design/simple-icons:amazonaws.svg?color=%23FF9900" className="w-4 h-4 object-contain" alt="AWS" /> },
    { name: 'Supabase', desc: 'The web data API that lets AI agents search, scrape, and interact at scale.', icon: <img src="https://api.iconify.design/simple-icons:supabase.svg?color=%233ECF8E" className="w-4 h-4 object-contain" alt="Supabase" /> },
    { name: 'Stripe', desc: 'Autonomously read, write, and perform tasks on the web with serverless browsers', icon: <img src="https://api.iconify.design/simple-icons:stripe.svg?color=%23635BFF" className="w-4 h-4 object-contain" alt="Stripe" /> },
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold tracking-tight text-white">Integrations</h1>
         <div className="flex items-center gap-3">
            <button className="bg-[#050505] border border-white/[0.1] text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:text-white hover:border-white/[0.2] transition-colors">
               Integrations Console
            </button>
            <Link to="/dashboard/integrations/marketplace" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
               Browse Marketplace
            </Link>
         </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
         
         {/* Left: Installed (Empty State) */}
         <div className="flex-1 border border-white/[0.08] bg-[#020202] rounded-xl flex flex-col items-center justify-center p-8 text-center h-full">
            <div className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center mb-4 text-gray-400 bg-[#050505]">
               <Info className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium mb-1">No Integrations Installed</h3>
            <p className="text-gray-500 text-sm mb-6">You don't have any integration installed.</p>
            <Link to="/dashboard/integrations/marketplace" className="bg-[#050505] border border-white/[0.1] text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:text-white hover:border-white/[0.2] transition-colors">
               Browse Marketplace
            </Link>
         </div>

         {/* Right: Latest Integrations Sidebar */}
         <div className="w-full xl:w-[320px] border border-white/[0.08] bg-[#020202] rounded-xl flex flex-col overflow-hidden shrink-0 h-full">
            <div className="p-6 border-b border-white/[0.05] flex flex-col items-center text-center shrink-0">
               <Hexagon className="w-6 h-6 text-gray-400 mb-4" />
               <h3 className="text-white font-medium text-lg mb-2">Latest Integrations</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Explore more integrations to expand your Collab Code development experience.</p>
            </div>
            
            <div className="flex flex-col divide-y divide-white/[0.05] overflow-y-auto">
               {latestIntegrations.map((integration, i) => (
                  <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors flex items-start gap-4 cursor-pointer">
                     <div className="w-8 h-8 rounded-full bg-[#111] border border-white/[0.1] flex items-center justify-center shrink-0">
                        {integration.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">{integration.name}</span>
                        <span className="text-gray-500 text-[13px] leading-snug mt-1">{integration.desc}</span>
                     </div>
                  </div>
               ))}
            </div>

            <div className="p-4 mt-auto border-t border-white/[0.05] shrink-0">
               <Link to="/dashboard/integrations/marketplace" className="flex items-center justify-center w-full bg-[#050505] border border-white/[0.1] text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:text-white hover:border-white/[0.2] transition-colors">
                  Browse Marketplace
               </Link>
            </div>
         </div>

      </div>
    </div>
  );
}
