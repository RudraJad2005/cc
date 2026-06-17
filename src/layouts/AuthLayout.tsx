import { Outlet, Link } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col font-sans selection:bg-white/30 relative overflow-hidden">
      
      {/* Abstract Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/[0.03] to-transparent blur-[100px] rounded-[100%] pointer-events-none"></div>

      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
         <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
               <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <span className="font-semibold tracking-tight text-white text-lg">Collab Code</span>
         </Link>
         <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Support</Link>
      </header>

      {/* Main Content Area (Centered) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 w-full">
         <Outlet />
      </main>

    </div>
  );
}
