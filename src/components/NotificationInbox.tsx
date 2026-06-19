import { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Loader2, Code2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Invitation {
  id: string;
  project_id: string;
  sender_id: string;
  receiver_email: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export function NotificationInbox() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch initial pending invitations
    const fetchInvitations = async () => {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('receiver_email', user.email)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (!error && data) setInvitations(data);
    };

    fetchInvitations();

    // Setup Realtime subscription
    const channel = supabase
      .channel('invitations_channel')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'invitations',
          filter: `receiver_email=eq.${user.email}` 
        }, 
        (payload) => {
          const newInvite = payload.new as Invitation;
          if (newInvite.status === 'pending') {
            setInvitations(prev => [newInvite, ...prev]);
          }
        }
      )
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'invitations',
          filter: `receiver_email=eq.${user.email}` 
        }, 
        (payload) => {
          const updatedInvite = payload.new as Invitation;
          if (updatedInvite.status !== 'pending') {
            setInvitations(prev => prev.filter(inv => inv.id !== updatedInvite.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.email]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'accepted' | 'declined', projectId: string) => {
    setIsProcessing(id);
    try {
      const { error } = await supabase
        .from('invitations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Optimistically remove from list
      setInvitations(prev => prev.filter(inv => inv.id !== id));

      // If accepted, navigate them to the project!
      if (newStatus === 'accepted') {
        setIsOpen(false);
        navigate(`/dashboard/projects/${projectId}/editor`);
      }
    } catch (err) {
      console.error('Failed to update invitation:', err);
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-colors"
      >
        <Bell className="w-5 h-5" />
        {invitations.length > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#050505]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#0A0A0A] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {invitations.length > 0 && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                {invitations.length} new
              </span>
            )}
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {invitations.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <Bell className="w-8 h-8 text-gray-600 mb-2" />
                <p className="text-sm text-gray-400">You're all caught up!</p>
                <p className="text-xs text-gray-500">No new invitations right now.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {invitations.map((invite) => (
                  <div key={invite.id} className="p-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Code2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">
                          You've been invited to collaborate on <strong className="text-white">"{invite.project_id}"</strong>
                        </p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {new Date(invite.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleUpdateStatus(invite.id, 'accepted', invite.project_id)}
                        disabled={isProcessing === invite.id}
                        className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        {isProcessing === invite.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Check className="w-3.5 h-3.5" /> Accept</>}
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(invite.id, 'declined', invite.project_id)}
                        disabled={isProcessing === invite.id}
                        className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
