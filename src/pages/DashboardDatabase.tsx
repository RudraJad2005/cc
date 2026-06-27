import { useState, useEffect, useRef } from 'react';
import { Database, Server, Unplug, Loader2, ShieldAlert, Table as TableIcon, Columns, Search, RefreshCw, Hash, FileText, ToggleLeft, Calendar, Plus, ChevronDown, Check, X } from 'lucide-react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseInstances, getActiveInstance, setActiveInstanceId, addSupabaseInstance, removeSupabaseInstance, migrateLegacyInstance, SupabaseInstance } from '../utils/supabaseInstances';

export function DashboardDatabase() {
  const [instances, setInstances] = useState<SupabaseInstance[]>([]);
  const [activeInstance, setActiveInstance] = useState<SupabaseInstance | null>(null);
  const [showInstanceDropdown, setShowInstanceDropdown] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newInstanceName, setNewInstanceName] = useState('');

  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [tables, setTables] = useState<string[]>([]);
  const [activeTable, setActiveTable] = useState('');
  const [loadingTables, setLoadingTables] = useState(false);
  
  const [tableData, setTableData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Functionality states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortAscending, setSortAscending] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Insert row states
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [insertFormData, setInsertFormData] = useState<Record<string, any>>({});
  const [isInserting, setIsInserting] = useState(false);

  // New table restriction modal
  const [showNewTableModal, setShowNewTableModal] = useState(false);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowInstanceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load instances on mount
  useEffect(() => {
    migrateLegacyInstance();
    const loadedInstances = getSupabaseInstances();
    setInstances(loadedInstances);
    const active = getActiveInstance();
    setActiveInstance(active);
    if (!active && loadedInstances.length > 0) {
       setActiveInstanceId(loadedInstances[0].id);
       setActiveInstance(loadedInstances[0]);
    }
  }, []);

  // Fetch Tables using OpenAPI spec
  const fetchTables = async (url: string, key: string) => {
    setLoadingTables(true);
    try {
      const response = await fetch(`${url}/rest/v1/?apikey=${key}`);
      if (!response.ok) throw new Error('Failed to fetch database schema.');
      const data = await response.json();
      
      const paths = Object.keys(data.paths || {});
      const tableNames = paths
        .filter(p => p !== '/' && !p.startsWith('/rpc/'))
        .map(p => p.substring(1)); // remove leading slash
        
      setTables(tableNames);
      if (tableNames.length > 0) {
        setActiveTable(tableNames[0]);
      } else {
        setActiveTable('');
        setTableData([]);
      }
    } catch (err: any) {
      setErrorMsg(`Error loading tables: ${err.message}`);
      setTables([]);
      setActiveTable('');
      setTableData([]);
    } finally {
      setLoadingTables(false);
    }
  };

  // Fetch Rows for Active Table
  const fetchTableData = async (supabase: SupabaseClient, tableName: string, sortCol?: string, sortAsc?: boolean) => {
    setLoadingData(true);
    let query = supabase.from(tableName).select('*').limit(50);
    
    if (sortCol) {
       query = query.order(sortCol, { ascending: sortAsc });
    }

    const { data, error } = await query;
    setLoadingData(false);

    if (error) {
      setErrorMsg(`Error fetching rows: ${error.message}`);
      setTableData([]);
    } else {
      setTableData(data || []);
    }
  };

  useEffect(() => {
    if (activeInstance) {
      try {
        const payload = JSON.parse(atob(activeInstance.key.split('.')[1]));
        if (payload.role !== 'service_role') {
           setErrorMsg(`Access Denied: The key for ${activeInstance.name} is a '${payload.role}' key. Please use a 'service_role' key.`);
           setClient(null);
           return;
        }

        const supabase = createClient(activeInstance.url, activeInstance.key, {
           auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
        });
        setClient(supabase);
        setErrorMsg('');
        fetchTables(activeInstance.url, activeInstance.key);
      } catch (err) {
        setErrorMsg('Invalid Supabase credentials or key format.');
        setClient(null);
      }
    } else {
       setClient(null);
       setTables([]);
       setTableData([]);
       setActiveTable('');
    }
  }, [activeInstance]);

  useEffect(() => {
    if (client && activeTable) {
      fetchTableData(client, activeTable, sortColumn, sortAscending);
    }
  }, [activeTable, client, sortColumn, sortAscending]);

  const handleInsertRow = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!client || !activeTable) return;
     
     setIsInserting(true);
     // Clean up empty strings or undefined values that might violate schema
     const cleanData = Object.fromEntries(
        Object.entries(insertFormData).filter(([_, v]) => v !== '' && v !== undefined)
     );

     const { error } = await client.from(activeTable).insert([cleanData]);
     setIsInserting(false);

     if (error) {
        setErrorMsg(`Insert failed: ${error.message}`);
     } else {
        setShowInsertModal(false);
        setInsertFormData({});
        fetchTableData(client, activeTable, sortColumn, sortAscending);
     }
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey || !newInstanceName) return;
    
    const cleanKey = supabaseKey.trim();
    try {
       const payload = JSON.parse(atob(cleanKey.split('.')[1]));
       if (payload.role !== 'service_role') {
           setErrorMsg(`Invalid Key: You entered an '${payload.role}' key. Please use the 'service_role' secret key.`);
           return;
       }
    } catch (err) {
       setErrorMsg('Invalid Key: Malformed JWT format.');
       return;
    }

    let cleanUrl = supabaseUrl.trim();
    if (!cleanUrl.startsWith('http')) cleanUrl = `https://${cleanUrl}`;
    cleanUrl = cleanUrl.replace(/\/+$/, '');
    if (cleanUrl.endsWith('/storage/v1')) cleanUrl = cleanUrl.replace(/\/storage\/v1$/, '');
    
    const newInst = addSupabaseInstance(newInstanceName, cleanUrl, cleanKey);
    setInstances(getSupabaseInstances());
    setActiveInstanceId(newInst.id);
    setActiveInstance(newInst);
    
    setSupabaseUrl('');
    setSupabaseKey('');
    setNewInstanceName('');
    setErrorMsg('');
    setIsAddingNew(false);
  };

  const handleSwitchInstance = (inst: SupabaseInstance) => {
    setActiveInstanceId(inst.id);
    setActiveInstance(inst);
    setShowInstanceDropdown(false);
    setIsAddingNew(false);
  };

  const handleRemoveInstance = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeSupabaseInstance(id);
    const updated = getSupabaseInstances();
    setInstances(updated);
    if (activeInstance?.id === id) {
       if (updated.length > 0) {
          setActiveInstanceId(updated[0].id);
          setActiveInstance(updated[0]);
       } else {
          setActiveInstanceId(null);
          setActiveInstance(null);
       }
    }
  };

  const getColumnIcon = (value: any) => {
    if (typeof value === 'number') return <Hash className="w-3 h-3 text-blue-400" />;
    if (typeof value === 'boolean') return <ToggleLeft className="w-3 h-3 text-emerald-400" />;
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/)) return <Calendar className="w-3 h-3 text-purple-400" />;
    return <FileText className="w-3 h-3 text-gray-400" />;
  };

  if (!activeInstance || isAddingNew) {
    return (
      <div className="flex flex-col gap-6 h-full pb-20 items-center justify-center max-w-xl mx-auto px-4 sm:px-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-2">
           <Server className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Connect Supabase Database</h1>
        <p className="text-gray-400 text-center mb-6">
           Provide your Supabase Project URL and <strong>service_role</strong> API key to manage your database tables directly from this dashboard.
        </p>

        {errorMsg && (
           <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm mb-4">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              {errorMsg}
           </div>
        )}

        <div className="w-full p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex flex-col gap-2 text-blue-400 text-sm mb-4">
           <strong>Why the service_role key?</strong>
           <p className="text-blue-400/80">Using your <code>service_role</code> secret key allows this dashboard to bypass RLS so you can query all your tables.</p>
        </div>

        <form onSubmit={handleConnect} className="w-full bg-[#050505] border border-white/[0.1] rounded-xl p-5 sm:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Connection Name</label>
              <input 
                 type="text" 
                 required
                 value={newInstanceName}
                 onChange={e => setNewInstanceName(e.target.value)}
                 placeholder="e.g. Production DB" 
                 className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              />
           </div>
           <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Project URL</label>
              <input 
                 type="url" 
                 required
                 value={supabaseUrl}
                 onChange={e => setSupabaseUrl(e.target.value)}
                 placeholder="https://xyzcompany.supabase.co" 
                 className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              />
           </div>
           <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Project API Key (service_role secret)</label>
              <input 
                 type="password" 
                 required
                 value={supabaseKey}
                 onChange={e => setSupabaseKey(e.target.value)}
                 placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                 className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 font-mono"
              />
           </div>
           <div className="flex items-center gap-3 mt-2">
              {instances.length > 0 && (
                 <button type="button" onClick={() => setIsAddingNew(false)} className="px-6 py-3 bg-[#111] border border-white/[0.1] text-white font-medium rounded-lg hover:bg-[#222] transition-colors">
                    Cancel
                 </button>
              )}
              <button type="submit" className="flex-1 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                 Connect Database
              </button>
           </div>
        </form>
      </div>
    );
  }

  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  
  const filteredData = tableData.filter(row => {
     if (!searchQuery) return true;
     const lowerQuery = searchQuery.toLowerCase();
     return Object.values(row).some(val => 
        String(val).toLowerCase().includes(lowerQuery)
     );
  });

  return (
    <div className="flex flex-1 h-screen overflow-hidden bg-[#000]">
      {/* Inner Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/[0.08] bg-[#020202] flex-col shrink-0">
        <div className="p-3 border-b border-white/[0.08]">
           <button onClick={() => window.location.href = '/dashboard/backend'} className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/[0.05]">
                 <Database className="w-3 h-3" />
              </div>
              Back to Projects
           </button>
        </div>
        <div className="h-14 flex items-center px-4 border-b border-white/[0.08] relative" ref={dropdownRef}>
           <button 
              onClick={() => setShowInstanceDropdown(!showInstanceDropdown)}
              className="flex items-center justify-between w-full hover:bg-white/[0.02] p-1.5 -ml-1.5 rounded-md transition-colors"
           >
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
                    <Database className="w-3 h-3 text-indigo-400" />
                 </div>
                 <span className="text-sm font-semibold tracking-tight text-white">{activeInstance.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
           </button>

           {showInstanceDropdown && (
              <div className="absolute top-full left-4 right-4 mt-1 bg-[#0a0a0a] border border-white/[0.08] rounded-lg shadow-xl overflow-hidden z-50">
                 <div className="max-h-64 overflow-y-auto">
                    {instances.map(inst => (
                       <div key={inst.id} className="flex items-center group">
                          <button 
                             onClick={() => handleSwitchInstance(inst)}
                             className="flex-1 flex items-center gap-2 px-3 py-2 hover:bg-white/[0.04] transition-colors text-left"
                          >
                             {inst.id === activeInstance.id ? <Check className="w-3.5 h-3.5 text-indigo-400" /> : <div className="w-3.5 h-3.5" />}
                             <span className="text-sm text-white truncate">{inst.name}</span>
                          </button>
                          {instances.length > 1 && (
                             <button 
                                onClick={(e) => handleRemoveInstance(inst.id, e)}
                                className="px-3 py-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <Unplug className="w-3.5 h-3.5" />
                             </button>
                          )}
                       </div>
                    ))}
                 </div>
                 <div className="border-t border-white/[0.08] p-1">
                    <button 
                       onClick={() => { setShowInstanceDropdown(false); setIsAddingNew(true); }}
                       className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/[0.04] transition-colors rounded text-sm text-gray-300"
                    >
                       <Plus className="w-3.5 h-3.5" /> Add new instance
                    </button>
                 </div>
              </div>
           )}
        </div>

        {/* Navigation */}
        <div className="p-3 flex flex-col gap-1 border-b border-white/[0.08]">
           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white bg-white/[0.08] rounded-md transition-colors text-left font-medium">
              Table Editor
           </button>
           <button onClick={() => window.location.href = '/dashboard/backend/editor/auth'} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors text-left">
              Authentication
           </button>
           <button onClick={() => window.location.href = '/dashboard/backend/editor/storage'} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors text-left">
              Storage
           </button>
        </div>

        <div className="p-3">
           <button className="w-full flex items-center justify-between px-3 py-1.5 bg-[#0a0a0a] hover:bg-[#111] border border-white/[0.08] rounded-md text-xs text-white transition-colors">
              schema <strong className="text-indigo-400">public</strong> <Search className="w-3 h-3 text-gray-500" />
           </button>
        </div>

        <div className="p-3 relative">
           <Search className="w-3 h-3 absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
           <input type="text" placeholder="Search tables..." className="w-full bg-[#050505] border border-white/[0.08] rounded-md pl-8 pr-2 py-1.5 text-xs text-white focus:outline-none focus:border-white/[0.2] placeholder:text-gray-600" />
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar pb-4 flex flex-col">
           {loadingTables ? (
              <div className="flex items-center justify-center p-4"><Loader2 className="w-4 h-4 animate-spin text-gray-500" /></div>
           ) : tables.map(table => (
              <button 
                 key={table}
                 onClick={() => setActiveTable(table)}
                 className={`flex items-center justify-between px-4 py-2 text-sm transition-colors group ${activeTable === table ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border-r-2 border-transparent'}`}
              >
                 <div className="flex items-center gap-2">
                    <TableIcon className="w-4 h-4" />
                    <span className="truncate">{table}</span>
                 </div>
              </button>
           ))}
        </div>
      </aside>

      {/* Main Content - Table Editor Grid */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000]">
         {/* Top Tabs */}
         <div className="h-12 border-b border-white/[0.08] flex items-center bg-[#020202] px-2 overflow-x-auto no-scrollbar shrink-0">
            {activeTable && (
               <div className="h-full flex items-center px-4 border-b-2 border-indigo-500 text-sm font-medium text-white bg-white/[0.02]">
                  public.{activeTable}
               </div>
            )}
            <div className="h-full flex items-center px-4 text-gray-500 hover:text-white cursor-pointer transition-colors">
               <Plus className="w-4 h-4" />
            </div>
         </div>

         {/* Toolbar */}
         <div className="h-auto min-h-[48px] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#050505] shrink-0">
            <div className="flex items-center gap-4">
               <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2" />
                  <input 
                     type="text" 
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                     placeholder="Filter rows..." 
                     className="bg-transparent border-none text-xs text-white placeholder:text-gray-500 focus:outline-none pl-7 w-48"
                  />
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative" ref={sortDropdownRef}>
                  <button 
                     onClick={() => setShowSortDropdown(!showSortDropdown)}
                     className="flex items-center gap-2 text-xs text-white hover:bg-white/[0.08] px-2 py-1.5 rounded-md transition-colors"
                  >
                     <TableIcon className="w-3.5 h-3.5" /> 
                     {sortColumn ? `Sorted by ${sortColumn}` : 'Sort'}
                  </button>
                  {showSortDropdown && tableData.length > 0 && (
                     <div className="absolute right-0 top-full mt-1 w-48 bg-[#0a0a0a] border border-white/[0.08] rounded-lg shadow-xl overflow-hidden z-50 p-2 flex flex-col gap-2">
                        <select 
                           value={sortColumn} 
                           onChange={e => setSortColumn(e.target.value)}
                           className="bg-[#050505] border border-white/[0.1] rounded px-2 py-1.5 text-xs text-white focus:outline-none"
                        >
                           <option value="">Select column...</option>
                           {Object.keys(tableData[0]).map(col => (
                              <option key={col} value={col}>{col}</option>
                           ))}
                        </select>
                        <select 
                           value={sortAscending ? 'asc' : 'desc'} 
                           onChange={e => setSortAscending(e.target.value === 'asc')}
                           className="bg-[#050505] border border-white/[0.1] rounded px-2 py-1.5 text-xs text-white focus:outline-none"
                        >
                           <option value="asc">Ascending</option>
                           <option value="desc">Descending</option>
                        </select>
                        {sortColumn && (
                           <button 
                              onClick={() => { setSortColumn(''); setShowSortDropdown(false); }}
                              className="text-xs text-gray-400 hover:text-white mt-1 text-left px-1"
                           >
                              Clear sort
                           </button>
                        )}
                     </div>
                  )}
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-400 border-l border-white/[0.1] pl-3 ml-1">
                  Role <span className="bg-[#111] border border-white/[0.1] text-white px-2 py-0.5 rounded-md">postgres</span>
               </div>
               <button 
                  onClick={() => setShowInsertModal(true)}
                  disabled={!activeTable}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm ml-2 disabled:opacity-50"
               >
                  Insert <Plus className="w-3 h-3" />
               </button>
            </div>
         </div>

         {/* Data Grid */}
         <div className="flex-1 overflow-auto bg-[#000]">
            {!activeTable ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                  <Columns className="w-12 h-12 text-[#111]" />
                  <span className="text-sm">Select a table to view data</span>
               </div>
            ) : loadingData ? (
               <div className="h-full flex items-center justify-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : tableData.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                  <Search className="w-12 h-12 text-[#111]" />
                  <span className="text-sm">No rows found in this table</span>
               </div>
            ) : (
               <table className="min-w-full divide-y divide-white/[0.08] border-b border-white/[0.08]">
                 <thead className="bg-[#020202] sticky top-0 z-10 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
                   <tr>
                     <th className="w-10 px-4 py-2 border-r border-white/[0.08]">
                        <input type="checkbox" className="rounded border-white/[0.2] bg-[#050505] checked:bg-indigo-500" />
                     </th>
                     {columns.map(col => {
                        const type = typeof tableData[0][col];
                        let typeLabel = 'text';
                        if (type === 'number') typeLabel = 'integer';
                        if (type === 'boolean') typeLabel = 'boolean';
                        if (type === 'object') typeLabel = 'jsonb';
                        if (col === 'id') typeLabel = 'uuid';
                        if (col === 'created_at') typeLabel = 'timestamptz';

                        return (
                           <th key={col} className="px-4 py-2.5 text-left border-r border-white/[0.08] group hover:bg-white/[0.02] cursor-pointer">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getColumnIcon(tableData[0][col])}
                                  <span className="text-[13px] font-medium text-white tracking-wide">{col}</span>
                                  <span className="text-[10px] text-gray-500 font-mono tracking-tighter">{typeLabel}</span>
                                </div>
                                <Plus className="w-3 h-3 text-transparent group-hover:text-gray-500" />
                             </div>
                           </th>
                        );
                     })}
                     <th className="px-4 py-2 w-full"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/[0.04] bg-[#000]">
                   {filteredData.length === 0 ? (
                      <tr>
                         <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-sm text-gray-500">
                            No rows match the filter.
                         </td>
                      </tr>
                   ) : filteredData.map((row, i) => (
                     <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="w-10 px-4 py-2 border-r border-white/[0.04]">
                          <input type="checkbox" className="rounded border-white/[0.2] bg-[#050505] opacity-0 group-hover:opacity-100 transition-opacity checked:bg-indigo-500 checked:opacity-100" />
                       </td>
                       {columns.map(col => {
                          let displayVal = row[col];
                          if (displayVal === null) displayVal = <span className="text-gray-600 italic">NULL</span>;
                          else if (typeof displayVal === 'boolean') displayVal = <span className={displayVal ? "text-emerald-400" : "text-gray-500"}>{displayVal.toString()}</span>;
                          else if (typeof displayVal === 'object') displayVal = <span className="text-amber-400 font-mono text-[11px]">{JSON.stringify(displayVal)}</span>;
                          else displayVal = String(displayVal);

                          return (
                            <td key={col} className="px-4 py-2 whitespace-nowrap text-[13px] text-gray-300 border-r border-white/[0.04] font-mono">
                              {displayVal}
                            </td>
                          );
                       })}
                       <td className="px-4 py-2 w-full text-transparent">.</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
         </div>

         {/* Footer Pagination */}
         <div className="h-10 border-t border-white/[0.08] flex items-center justify-between px-4 bg-[#020202] shrink-0 text-xs text-gray-500">
            <div className="flex items-center gap-4">
               <span>Page 1 of 1</span>
               <span>100 rows</span>
               <span>{tableData.length} records</span>
            </div>
            <div className="flex items-center gap-2">
               <button className="px-2 py-1 bg-white/[0.08] text-white rounded text-[11px] font-medium transition-colors">Data</button>
               <button className="px-2 py-1 text-gray-400 hover:text-white rounded text-[11px] font-medium transition-colors">Definition</button>
            </div>
         </div>
      </div>

   {/* Insert Modal */}
   {showInsertModal && (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
         <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#050505] shrink-0">
               <h3 className="text-lg font-semibold text-white tracking-tight">Insert row into {activeTable}</h3>
               <button onClick={() => setShowInsertModal(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
               </button>
            </div>
            <div className="p-5 overflow-y-auto no-scrollbar flex-1 bg-[#000]">
               <form id="insertForm" onSubmit={handleInsertRow} className="flex flex-col gap-4">
                  {columns.map(col => (
                     <div key={col} className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-300 font-mono tracking-tight">{col}</label>
                        <input 
                           type="text" 
                           value={insertFormData[col] || ''}
                           onChange={e => setInsertFormData(prev => ({ ...prev, [col]: e.target.value }))}
                           className="bg-[#050505] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 font-mono transition-colors"
                           placeholder={`Enter ${typeof tableData[0][col] === 'number' ? 'number' : 'text'}`}
                        />
                     </div>
                  ))}
               </form>
            </div>
            <div className="px-5 py-4 border-t border-white/[0.08] flex justify-end gap-3 bg-[#050505] shrink-0">
               <button type="button" onClick={() => setShowInsertModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
               <button form="insertForm" type="submit" disabled={isInserting} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50">
                  {isInserting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Insert Row'}
               </button>
            </div>
         </div>
      </div>
   )}

   {/* New Table Modal */}
   {showNewTableModal && (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
         <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#050505] shrink-0">
               <h3 className="text-lg font-semibold text-white tracking-tight">Create a new table</h3>
               <button onClick={() => setShowNewTableModal(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
               </button>
            </div>
            <div className="p-6 bg-[#000] flex flex-col gap-4 text-center items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-2">
                  <Server className="w-6 h-6 text-indigo-400" />
               </div>
               <h4 className="text-white font-medium">Schema Changes Restricted</h4>
               <p className="text-sm text-gray-400 leading-relaxed">
                  Creating tables involves modifying the database schema. 
                  This dashboard uses the standard REST API, which cannot execute structural DDL operations like <code className="text-xs text-indigo-400 bg-indigo-500/10 px-1 rounded">CREATE TABLE</code>.
               </p>
               <p className="text-sm text-gray-400 leading-relaxed">
                  Please use the main <strong className="text-white">Supabase Dashboard</strong> to create new tables, columns, or modify schema structures.
               </p>
            </div>
            <div className="px-5 py-4 border-t border-white/[0.08] flex justify-end bg-[#050505] shrink-0">
               <button onClick={() => setShowNewTableModal(false)} className="px-5 py-2 bg-white text-black hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors">
                  Understood
               </button>
            </div>
         </div>
      </div>
   )}
 </div>
);
}
