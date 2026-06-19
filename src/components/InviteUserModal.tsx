import { useState, useEffect } from 'react';
import { Search, Loader2, Send, X, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface InviteUserModalProps {
  projectId: string;
  onClose: () => void;
}

export function InviteUserModal({ projectId, onClose }: InviteUserModalProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ id: string; email: string }[]>([]);
  const [sendingInviteTo, setSendingInviteTo] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const searchUsers = async () => {
      setIsSearching(true);
      setErrorMsg(null);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email')
          .ilike('email', `%${searchQuery}%`)
          .neq('id', user?.id) // don't show self
          .limit(5);

        if (error) throw error;
        setSearchResults(data || []);
      } catch (err: any) {
        console.error('Error searching users:', err);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, user?.id]);

  const handleSendInvite = async (receiverEmail: string) => {
    if (!user) return;
    setSendingInviteTo(receiverEmail);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Check if an invite already exists
      const { data: existing } = await supabase
        .from('invitations')
        .select('id, status')
        .eq('project_id', projectId)
        .eq('receiver_email', receiverEmail)
        .single();

      if (existing) {
        if (existing.status === 'pending') {
          throw new Error('An invitation is already pending for this user.');
        } else if (existing.status === 'accepted') {
          throw new Error('This user is already a collaborator on this project.');
        }
      }

      const { error } = await supabase.from('invitations').insert({
        project_id: projectId,
        sender_id: user.id,
        receiver_email: receiverEmail,
        status: 'pending'
      });

      if (error) throw error;
      
      setSuccessMsg(`Invitation sent to ${receiverEmail}!`);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send invite.');
    } finally {
      setSendingInviteTo(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Invite Collaborators</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search users by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/[0.1] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              autoFocus
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 animate-spin" />
            )}
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 text-center">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {successMsg}
            </div>
          )}

          <div className="flex flex-col gap-2 min-h-[200px]">
            {searchQuery.length > 0 && searchQuery.length < 3 && (
              <div className="text-center text-sm text-gray-500 py-8">
                Type at least 3 characters to search...
              </div>
            )}
            
            {!isSearching && searchQuery.length >= 3 && searchResults.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-8">
                No users found matching "{searchQuery}"
              </div>
            )}

            {searchResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                    {result.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300">{result.email}</span>
                </div>
                <button
                  onClick={() => handleSendInvite(result.email)}
                  disabled={sendingInviteTo === result.email || !!successMsg}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-blue-500/20 text-white hover:text-blue-400 border border-white/[0.1] hover:border-blue-500/30 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  {sendingInviteTo === result.email ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>Invite <Send className="w-3 h-3" /></>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
