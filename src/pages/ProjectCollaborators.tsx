import { Users, UserPlus, Search, Shield, ShieldAlert, MoreVertical, Mail, Check } from 'lucide-react';
import { useState } from 'react';
import { Select } from '../components/ui/Select';

export function ProjectCollaborators() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');

  const [team, setTeam] = useState([
    { id: '1', name: 'Rudra Jadhav', email: 'rudra@collab.app', role: 'owner', avatar: 'bg-indigo-500', initials: 'RJ' },
    { id: '2', name: 'Alice Smith', email: 'alice@example.com', role: 'developer', avatar: 'bg-emerald-500', initials: 'AS' },
    { id: '3', name: 'Bob Jones', email: 'bob@example.com', role: 'viewer', avatar: 'bg-blue-500', initials: 'BJ' },
  ]);

  const updateTeamRole = (id: string, newRole: string) => {
    setTeam(team.map(member => member.id === id ? { ...member, role: newRole } : member));
  };

  return (
    <div className="flex flex-col gap-8 h-full pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-gray-400" /> Collaborators
           </h1>
           <p className="text-sm text-gray-400">Manage who has access to this project and their permission levels.</p>
         </div>
      </div>

      {/* Invite Section */}
      <div className="p-6 rounded-xl border border-white/[0.1] bg-[#050505] flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-2">Invite Collaborator</label>
            <div className="flex items-center gap-2">
               <div className="relative flex-1 max-w-md">
                 <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                 <input 
                    type="email" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Email address..." 
                    className="w-full bg-[#000] border border-white/[0.1] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-[#666]" 
                 />
               </div>
               <div className="w-[140px] shrink-0">
                  <Select 
                     options={[
                       { value: 'developer', label: 'Developer' },
                       { value: 'viewer', label: 'Viewer' },
                       { value: 'admin', label: 'Admin' },
                     ]}
                     value={inviteRole}
                     onChange={setInviteRole}
                     className="h-[42px] flex items-center bg-[#000]"
                  />
               </div>
               <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors h-[42px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
                  <UserPlus className="w-4 h-4" /> Send Invite
               </button>
            </div>
         </div>
      </div>

      {/* Team List */}
      <div className="flex flex-col border border-white/[0.1] rounded-xl bg-[#050505] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-white/[0.1] bg-[#0a0a0a]">
           <div className="relative w-full max-w-sm">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Search team members..." className="w-full bg-[#000] border border-white/[0.1] rounded-md pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/[0.3] placeholder:text-[#666]" />
           </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.1] text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#020202]">
           <div className="col-span-6">User</div>
           <div className="col-span-4">Role</div>
           <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-white/[0.05]">
           {team.map((member) => (
             <div key={member.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-6 flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${member.avatar}`}>
                      {member.initials}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{member.name} {member.role === 'owner' && <span className="text-xs text-gray-500 font-normal ml-1">(You)</span>}</span>
                      <span className="text-xs text-gray-500">{member.email}</span>
                   </div>
                </div>
                
                <div className="col-span-4 flex items-center">
                   {member.role === 'owner' ? (
                      <div className="flex items-center gap-1.5 text-sm text-gray-400 cursor-not-allowed">
                         <ShieldAlert className="w-4 h-4 text-purple-400" /> Owner
                      </div>
                   ) : (
                      <div className="w-[130px] -ml-2">
                         <Select 
                            options={[
                              { value: 'admin', label: 'Admin' },
                              { value: 'developer', label: 'Developer' },
                              { value: 'viewer', label: 'Viewer' },
                            ]}
                            value={member.role}
                            onChange={(val) => updateTeamRole(member.id, val)}
                            className="!border-transparent hover:!border-white/[0.1] !bg-transparent hover:!bg-[#000]"
                         />
                      </div>
                   )}
                </div>
                
                <div className="col-span-2 flex items-center justify-end">
                   {member.role !== 'owner' && (
                      <button className="p-1.5 hover:bg-white/[0.1] rounded-lg text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                         Remove
                      </button>
                   )}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
