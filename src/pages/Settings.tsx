import { User, Shield, CreditCard, Bell, Key } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Sidebar Nav */}
        <div className="w-full md:w-56 flex flex-col gap-1 shrink-0">
           {[
             { name: "General", icon: <User className="w-4 h-4" />, active: true },
             { name: "Security", icon: <Shield className="w-4 h-4" /> },
             { name: "Billing", icon: <CreditCard className="w-4 h-4" /> },
             { name: "Notifications", icon: <Bell className="w-4 h-4" /> },
             { name: "API Keys", icon: <Key className="w-4 h-4" /> },
           ].map((item, i) => (
              <button 
                key={i}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left ${item.active ? 'bg-white/[0.08] text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/[0.03]'}`}
              >
                 {item.icon}
                 {item.name}
              </button>
           ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-10">
           {/* Section 1 */}
           <div className="flex flex-col gap-4">
              <div className="flex flex-col mb-1">
                 <h2 className="text-lg font-medium text-white mb-1">Profile Information</h2>
                 <p className="text-sm text-[#888]">Update your account's profile information and email address.</p>
              </div>
              
              <div className="border border-white/[0.05] rounded-xl bg-white/[0.01] overflow-hidden">
                 <div className="p-6 flex flex-col gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#ccc]">Name</label>
                      <input type="text" defaultValue="Alex Rivera" className="w-full max-w-md bg-[#000] border border-white/[0.1] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors shadow-inner" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#ccc]">Email</label>
                      <input type="email" defaultValue="alex@collab.com" className="w-full max-w-md bg-[#000] border border-white/[0.1] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors shadow-inner" />
                   </div>
                   <div className="flex items-center gap-4 mt-2">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-16 h-16 rounded-full border border-white/[0.1]" />
                      <button className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-white/[0.1] transition-colors">
                        Change Avatar
                      </button>
                   </div>
                 </div>
                 
                 <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.05] flex justify-between items-center">
                    <span className="text-xs text-[#666]">Please use 32 characters at maximum.</span>
                    <button className="bg-white text-black px-4 py-1.5 border border-transparent rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                      Save
                    </button>
                 </div>
              </div>
           </div>

           {/* Section 2 */}
           <div className="flex flex-col gap-4">
              <div className="flex flex-col mb-1">
                 <h2 className="text-lg font-medium text-red-400 mb-1">Danger Zone</h2>
                 <p className="text-sm text-[#888]">Irreversible account actions.</p>
              </div>
              
              <div className="border border-red-500/20 rounded-xl bg-red-500/[0.02] overflow-hidden">
                 <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-white">Delete Account</span>
                      <span className="text-sm text-[#888]">Permanently remove your account and all associated projects.</span>
                   </div>
                   <button className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors shrink-0">
                      Delete Account
                   </button>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
