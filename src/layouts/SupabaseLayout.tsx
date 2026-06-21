import { Outlet, Link, useLocation } from 'react-router-dom';
import { Database, Server, Settings, Plus, Search, Table as TableIcon, HardDrive, Unplug, ShieldAlert } from 'lucide-react';
import { DashboardSidebar } from './DashboardLayout';

export function SupabaseLayout() {
  // We simply render the outer sidebar, and the full-screen flex container.
  // The individual pages (Database, Storage) will render their own inner sidebars and main content
  // to perfectly match the Supabase UI.
  return (
    <div className="min-h-screen bg-[#000] text-white flex font-sans selection:bg-white/30">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen">
         <Outlet />
      </div>
    </div>
  );
}
