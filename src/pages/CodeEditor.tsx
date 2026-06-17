import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import sdk from '@stackblitz/sdk';
import { ArrowLeft, Loader2, Code2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function CodeEditor() {
  const { projectId } = useParams();
  const editorRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootVM() {
      // Fetch project details to know what template to boot
      const { data } = await supabase.from('projects').select('framework').eq('name', projectId).single();
      
      let template: any = 'node';
      if (data?.framework === 'Next.js') template = 'nextjs';
      else if (data?.framework === 'React') template = 'create-react-app';
      else if (data?.framework === 'Astro') template = 'node';
      else if (data?.framework === 'Svelte') template = 'node';
      else if (data?.framework === 'Vue') template = 'vue';

      if (editorRef.current) {
        sdk.embedProjectId(editorRef.current, template, {
          forceEmbedLayout: true,
          view: 'default',
          theme: 'dark',
          hideNavigation: true,
          hideExplorer: false,
          showSidebar: true,
        });
        setLoading(false);
      }
    }
    
    bootVM();
  }, [projectId]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden selection:bg-blue-500/30">
      
      {/* Editor Top Bar */}
      <div className="h-12 bg-[#181818] border-b border-[#2d2d2d] flex items-center px-4 flex-shrink-0 justify-between">
         <Link to={`/dashboard/projects/${projectId}`} className="flex items-center gap-2 text-[13px] text-[#cccccc] hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/[0.1]">
            <ArrowLeft className="w-4 h-4" /> Exit Editor
         </Link>
         <div className="flex items-center gap-2 text-[13px] font-medium text-[#cccccc]">
            <Code2 className="w-4 h-4 text-blue-400" />
            {projectId}
         </div>
         <div className="w-24 flex justify-end">
            <span className="text-[11px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">VM Active</span>
         </div>
      </div>

      {/* StackBlitz Mount Point */}
      <div className="flex-1 w-full relative bg-[#1e1e1e]">
         {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1e1e] z-10">
               <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
               <p className="text-[#cccccc] text-sm font-medium tracking-wide animate-pulse">Booting Node.js WebContainer...</p>
               <p className="text-[#888888] text-xs mt-2">Loading VS Code Engine</p>
            </div>
         )}
         <div ref={editorRef} className="w-full h-full border-none" />
      </div>

    </div>
  );
}
