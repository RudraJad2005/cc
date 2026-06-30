import { useState, useEffect } from 'react';
import { User, CreditCard, Key, Users, AlertTriangle, Copy, Check, Trash2, Key as KeyIcon, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const { user } = useAuth();

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
                           defaultValue={user?.email?.split('@')[0] || 'User Workspace'}
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
            
            {activeTab === 'tokens' && (
               <TokensSettings />
            )}

            {activeTab !== 'general' && activeTab !== 'tokens' && (
               <div className="flex flex-col items-center justify-center p-20 border border-white/[0.05] border-dashed rounded-xl bg-[#020202]">
                  <p className="text-gray-500 text-sm">This section is currently under construction.</p>
               </div>
            )}
         </div>

      </div>
    </div>
  );
}

function TokensSettings() {
  const { user } = useAuth();
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [newKey, setNewKey] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const fetchKeys = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST' || error.message.includes('relation "public.api_keys" does not exist')) {
          setErrorMsg('The API Keys database table is not initialized yet. Please run the SQL migration script in your Supabase SQL editor.');
        } else {
          setErrorMsg(error.message);
        }
      } else if (data) {
        setKeys(data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load tokens.');
    } finally {
      setKeys((prev) => Array.isArray(prev) ? prev : []);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, [user]);

  const generateKey = async () => {
    if (!user) return;
    setErrorMsg('');
    try {
      const rawRandom = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const generatedKey = `cc_pk_${rawRandom}`;

      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          key: generatedKey
        })
        .select()
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        setNewKey(generatedKey);
        fetchKeys();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate token.');
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this token? CLI sessions using this token will be logged out.')) return;
    setErrorMsg('');
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) {
        setErrorMsg(error.message);
      } else {
        setKeys(keys.filter(k => k.id !== id));
        if (newKey) setNewKey('');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to revoke token.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const maskKey = (keyString: string) => {
    if (keyString.length < 12) return 'Invalid Key';
    return `${keyString.substring(0, 8)}...${keyString.substring(keyString.length - 4)}`;
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-white/[0.1] pb-4">
          <h2 className="text-xl font-semibold text-white">API Tokens</h2>
          <p className="text-sm text-gray-400">Manage keys used to authenticate with the CollabCode CLI and APIs.</p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">Configuration Action Required</span>
              <p className="text-gray-400 text-xs leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        {newKey && (
          <div className="p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-white">Your New API Token</span>
              <span className="text-xs text-gray-400">Make sure to copy this token now. You won't be able to see it again!</span>
            </div>
            <div className="flex items-center gap-2 max-w-md bg-black border border-white/[0.1] rounded-lg p-2.5">
              <code className="text-xs text-indigo-300 font-mono flex-1 break-all select-all">{newKey}</code>
              <button 
                onClick={() => copyToClipboard(newKey, 'new')} 
                className="text-gray-400 hover:text-white p-1 hover:bg-white/[0.05] rounded transition-colors"
              >
                {copiedKeyId === 'new' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 font-semibold text-white">Active Tokens ({keys.length})</span>
          <button 
            onClick={generateKey}
            disabled={!!errorMsg}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <KeyIcon className="w-4 h-4" /> Generate Token
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
          </div>
        ) : keys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border border-white/[0.05] rounded-xl bg-white/[0.01]">
            <KeyIcon className="w-8 h-8 text-gray-600 mb-3" />
            <p className="text-sm text-gray-500">No active tokens generated yet.</p>
          </div>
        ) : (
          <div className="flex flex-col border border-white/[0.08] rounded-xl bg-[#020202] overflow-hidden">
            {keys.map((k) => (
              <div key={k.id} className="flex items-center justify-between p-4 border-b border-white/[0.08] last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm text-gray-300">{maskKey(k.key)}</span>
                  <span className="text-xs text-gray-500">Created: {new Date(k.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => copyToClipboard(k.key, k.id)} 
                    className="text-gray-400 hover:text-white p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
                    title="Copy full token"
                  >
                    {copiedKeyId === k.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => deleteKey(k.id)} 
                    className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Revoke token"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
