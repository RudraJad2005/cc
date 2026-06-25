import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, Copy, Check, Terminal, Database, HardDrive, Shield, Globe, Rocket, Key, Search, Box, ArrowRight, Menu, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/* ── Types ── */
interface DocItem {
  id: string;
  title: string;
  file: string;
}

interface DocCategory {
  title: string;
  items: DocItem[];
}

interface DocsConfig {
  categories: DocCategory[];
}

/* ── Sidebar nav item ── */
const NavItem = ({ label, active, onClick, indent = false }: { label: string; active: boolean; onClick: () => void; indent?: boolean }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${indent ? 'ml-4 text-xs' : ''} ${active ? 'bg-white/10 text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
  >
    {indent && <div className="w-1 h-1 rounded-full bg-[#666] shrink-0" />}
    {label}
  </button>
);

/* ── Main Page ── */
export function Docs() {
  const [config, setConfig] = useState<DocsConfig | null>(null);
  const [activeItem, setActiveItem] = useState<DocItem | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch config
    fetch('/docs/config.json')
      .then(res => res.json())
      .then((data: DocsConfig) => {
        setConfig(data);
        if (data.categories.length > 0 && data.categories[0].items.length > 0) {
          setActiveItem(data.categories[0].items[0]);
        }
      })
      .catch(err => console.error("Failed to load docs config", err));
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    setLoading(true);
    fetch(`/docs/${activeItem.file}`)
      .then(res => res.text())
      .then(text => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load markdown", err);
        setMarkdownContent("# Error\nFailed to load documentation content.");
        setLoading(false);
      });
  }, [activeItem]);

  if (!config) {
    return <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-16 text-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>Loading Docs...</div>;
  }

  // Filter categories based on search
  const filteredCategories = config.categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  // Flatten items to find prev/next
  const allItems = config.categories.flatMap(c => c.items);
  const currentIdx = activeItem ? allItems.findIndex(i => i.id === activeItem.id) : -1;
  const prevItem = currentIdx > 0 ? allItems[currentIdx - 1] : null;
  const nextItem = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null;

  return (
    <main className="w-full bg-black text-white selection:bg-white/20 selection:text-white font-sans min-h-screen pt-16">
      
      {/* Mobile Header Toolbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-16 z-40">
         <div className="flex items-center gap-2 text-white font-semibold">
           <Book className="w-4 h-4" /> Documentation
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-md">
           {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
      </div>

      <div className="flex max-w-[1400px] mx-auto relative">
        
        {/* Sidebar */}
        <aside className={`fixed inset-0 top-[120px] bg-black z-30 lg:static lg:flex flex-col lg:w-[280px] shrink-0 border-r border-white/10 lg:h-[calc(100vh-64px)] overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 border-b border-white/10 lg:block hidden">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Book className="w-5 h-5" />
              API Docs
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-[#666] pl-9 pr-3 py-2 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>
          
          <nav className="p-4 flex flex-col gap-6">
            {filteredCategories.map((category, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-2 px-2">{category.title}</h4>
                <div className="flex flex-col gap-0.5">
                  {category.items.map(item => (
                    <NavItem
                      key={item.id}
                      label={item.title}
                      active={activeItem?.id === item.id}
                      onClick={() => {
                        setActiveItem(item);
                        setMobileMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content area */}
        <div className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-8 lg:py-12 pb-32">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#666] mb-8">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{activeItem?.title}</span>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert max-w-4xl prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4 prose-p:text-[#888] prose-p:leading-relaxed prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-table:border prose-table:border-white/10 prose-th:bg-white/[0.02] prose-th:p-3 prose-th:text-left prose-td:p-3 prose-td:border-t prose-td:border-white/5">
            {loading ? (
               <div className="animate-pulse space-y-4 mt-8">
                 <div className="h-10 bg-white/5 rounded w-1/3"></div>
                 <div className="h-4 bg-white/5 rounded w-3/4"></div>
                 <div className="h-4 bg-white/5 rounded w-full"></div>
                 <div className="h-32 bg-white/5 rounded w-full mt-8"></div>
               </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const [copied, setCopied] = useState(false);
                    
                    const handleCopy = () => {
                      navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    };

                    return !inline && match ? (
                      <div className="relative group not-prose mb-6">
                        <div className="absolute top-0 left-0 right-0 h-10 bg-black/50 border-b border-white/10 rounded-t-xl flex items-center justify-between px-4">
                           <div className="flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                             <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                             <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                             <span className="text-[#666] ml-2 text-xs font-mono">{match[1]}</span>
                           </div>
                           <button onClick={handleCopy} className="text-[#444] hover:text-white transition-colors p-1">
                             {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                           </button>
                        </div>
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ margin: 0, paddingTop: '3rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a', fontSize: '13px' }}
                        />
                      </div>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            )}
          </div>

          {/* Next / Prev navigation */}
          {!loading && (
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              {prevItem ? (
                <button onClick={() => { setActiveItem(prevItem); window.scrollTo(0,0); }} className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group">
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  {prevItem.title}
                </button>
              ) : <div />}
              {nextItem ? (
                <button onClick={() => { setActiveItem(nextItem); window.scrollTo(0,0); }} className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group">
                  {nextItem.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : <div />}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
