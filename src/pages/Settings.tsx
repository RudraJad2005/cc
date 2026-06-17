import { useState } from 'react';
import { User, CreditCard, Key, Users, AlertTriangle } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: <User className="w-4 h-4" /> },
    { id: 'billing', name: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'tokens', name: 'Tokens', icon: <Key className="w-4 h-4" /> },
    { id: 'teams', name: 'Teams', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
         
         {/* Vertical Tabs Sidebar */}
         <div className="w-full md:w-48 flex flex-row md:flex-col gap-1 overflow-x-auto no-scrollbar border-b md:border-b-0 border-white/[0.1] pb-4 md:pb-0 shrink-0">
            {tabs.map(tab => (
               <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                     activeTab === tab.id 
                     ? 'bg-white/[0.1] text-white' 
                     : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
               >
                  {tab.icon} {tab.name}
               </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 max-w-3xl">
            {activeTab === 'general' && (
               <div className="flex flex-col gap-12">
                  
                  <section className="flex flex-col gap-6">
                     <div className="flex flex-col gap-1 border-b border-white/[0.1] pb-4">
                        <h2 className="text-xl font-semibold text-white">Workspace Name</h2>
                        <p className="text-sm text-gray-400">This is your workspace's visible name within Collab Code.</p>
                     </div>
                     <div className="flex flex-col gap-4">
                        <input 
                           type="text" 
                           defaultValue="RudraJad2005"
                           className="w-full max-w-md bg-[#050505] border border-white/[0.1] rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors"
                        />
                        <button className="w-fit bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                           Save Changes
                        </button>
                     </div>
                  </section>

                  <section className="flex flex-col gap-6">
                     <div className="flex flex-col gap-1 border-b border-white/[0.1] pb-4">
                        <h2 className="text-xl font-semibold text-white">Workspace ID</h2>
                        <p className="text-sm text-gray-400">Used when interacting with the Collab Code API.</p>
                     </div>
                     <div className="flex flex-col gap-4">
                        <input 
                           type="text" 
                           readOnly
                           defaultValue="wrk_8f92js9dfk20fk"
                           className="w-full max-w-md bg-[#111] border border-white/[0.1] rounded-md px-4 py-2 text-sm text-gray-400 font-mono focus:outline-none cursor-not-allowed"
                        />
                     </div>
                  </section>

                  {/* Danger Zone */}
                  <section className="flex flex-col gap-6 mt-8">
                     <div className="flex flex-col gap-1 border-b border-red-500/20 pb-4">
                        <h2 className="text-xl font-semibold text-red-500 flex items-center gap-2">
                           <AlertTriangle className="w-5 h-5" /> Danger Zone
                        </h2>
                     </div>
                     <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex flex-col gap-1">
                           <h3 className="font-semibold text-white">Delete Workspace</h3>
                           <p className="text-sm text-gray-400">Permanently delete this workspace and all of its projects.</p>
                        </div>
                        <button className="shrink-0 bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white transition-colors">
                           Delete Workspace
                        </button>
                     </div>
                  </section>

               </div>
            )}
            
            {activeTab !== 'general' && (
               <div className="flex flex-col items-center justify-center p-20 border border-white/[0.05] border-dashed rounded-xl bg-[#020202]">
                  <p className="text-gray-500 text-sm">This section is currently under construction.</p>
               </div>
            )}
         </div>

      </div>
    </div>
  );
}
