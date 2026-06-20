const fs = require('fs');
let code = fs.readFileSync('src/pages/NativeIDE.tsx', 'utf-8');

// 1. Replace the return statement wrapper
code = code.replace(
  /<div className=\{\`flex h-screen w-full overflow-hidden text-\[var\(--ide-text,#fff\)\] bg-\[var\(--ide-base,#000\)\] \$\{ideTheme\}\`\}>/,
  `    <div className={\`bg-background text-on-background font-ui-body text-[13px] h-screen w-screen overflow-hidden flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container \${ideTheme}\`}>
      
      {/* TopNavBar */}
      <header className="bg-surface-container w-full h-[32px] border-b border-outline-variant flex items-center justify-between px-3 z-40 shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-ui-header text-[14px] font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>terminal</span>
            ProEditor
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Link to={\`/dashboard/projects/\${projectId}\`} className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors">Dashboard</Link>
            <a href="#" className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors">File</a>
            <a href="#" className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors">Edit</a>
          </nav>
        </div>

        {/* Command Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block w-96 z-50">
          <div className="relative group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant w-3.5 h-3.5" />
            <input 
              type="text" 
              placeholder={\`Search \${projectId || 'Project'}\`}
              className="w-full bg-surface-variant/50 border border-outline-variant/30 text-on-surface text-[13px] rounded-md py-0.5 pl-8 pr-12 focus:outline-none focus:border-primary focus:bg-surface-variant transition-colors placeholder:text-on-surface-variant/50 h-6"
            />
          </div>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={\`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors text-white text-[11px] font-medium \${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/[0.05]'}\`}
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          
          {!previewUrl && (
            <button 
              onClick={handleRunProject}
              disabled={isStarting}
              className={\`flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary text-on-primary transition-colors text-[11px] font-medium \${isStarting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}\`}
            >
              {isStarting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
              {isStarting ? 'Installing...' : 'Run'}
            </button>
          )}

          <button onClick={() => setShowSettingsModal(true)} className="p-0.5 text-on-surface-variant hover:bg-surface-container-high rounded transition-colors flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden relative">`
);

// 2. Replace the old Activity Bar
const oldActivityBarRegex = /\{\/\* Activity Bar \*\/\}[\s\S]*?\{\/\* Sidebar \*\/\}/;
code = code.replace(
  oldActivityBarRegex,
  `{/* Activity Bar */}
        <aside className="w-12 h-full bg-surface-container-low border-r border-outline-variant flex flex-col items-center py-2 shrink-0 z-30">
          <nav className="flex flex-col gap-2 w-full items-center">
            <button 
              onClick={() => toggleSidebar('explorer')}
              className={\`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative \${activeSidebar === 'explorer' ? 'text-primary border-l-2 border-primary bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}\`}
              title="Explorer"
            >
              <Files className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={() => toggleSidebar('search')}
              className={\`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative \${activeSidebar === 'search' ? 'text-primary border-l-2 border-primary bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}\`}
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={() => toggleSidebar('git')}
              className={\`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative \${activeSidebar === 'git' ? 'text-primary border-l-2 border-primary bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}\`}
              title="Source Control"
            >
              <GitBranch className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={handleAiChatClick}
              className={\`w-10 h-10 flex items-center justify-center transition-all duration-200 group relative \${isAiChatOpen ? 'text-tertiary-container border-l-2 border-tertiary-container bg-surface-container-high rounded-r-sm' : 'text-on-surface-variant hover:text-on-surface'}\`}
              title="AI Assistant"
            >
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </button>
          </nav>
          
          <div className="mt-auto flex flex-col gap-2 w-full items-center pb-2 relative">
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all duration-200" 
              title="Themes"
            >
              <Palette className="w-5 h-5 stroke-[1.5]" />
            </button>
            {showThemeMenu && (
              <div className="absolute bottom-0 left-full ml-2 w-48 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50">
                <div className="px-3 py-2 border-b border-outline-variant">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Color Theme</span>
                </div>
                <div className="p-1 flex flex-col">
                  {[
                    { id: 'theme-obsidian', name: 'Obsidian Glass (Default)' },
                    { id: 'theme-dark', name: 'Dark' }
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => { setIdeTheme(theme.id); setShowThemeMenu(false); }}
                      className={\`text-left px-3 py-2 text-sm rounded-md transition-colors \${ideTheme === theme.id ? 'bg-primary-container/20 text-primary' : 'text-on-surface hover:bg-surface-variant'}\`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Sidebar */}`
);

// 3. Update the old sidebar container styling to use glass-panel
code = code.replace(
  /className="shrink-0 flex flex-col bg-\[var\(--ide-panel\)\] z-10"/g,
  'className="shrink-0 flex flex-col bg-surface-container-low border-r border-outline-variant z-20 glass-panel"'
);

// 4. Update Sidebar splitter
code = code.replace(
  /className="w-1 cursor-col-resize hover:bg-\[var\(--ide-border-hover\)\] bg-\[var\(--ide-border\)\] transition-colors z-20 shrink-0"/g,
  'className="w-1 cursor-col-resize hover:bg-outline-variant bg-transparent transition-colors z-20 shrink-0"'
);

// 5. Replace Center Area to use <main> and remove the old header
const oldCenterRegex = /\{\/\* Center: Editor, Preview & Terminal \*\/\}\s*<div className="flex-1 flex flex-col min-w-0 bg-\[var\(--ide-base\)\]">\s*\{\/\* Header \*\/\}\s*<div className="h-14 flex items-center justify-between px-4 border-b border-\[var\(--ide-border\)\] bg-\[var\(--ide-panel-darker\)\] shrink-0">[\s\S]*?\{\/\* Top: Editor & Preview Split \*\/\}/;
code = code.replace(
  oldCenterRegex,
  `{/* Center: Editor, Preview & Terminal */}
        <main className="flex-1 flex flex-col level-0 relative overflow-hidden">
          
          {/* Top: Editor & Preview Split */}`
);

// 6. Update Editor Area container
code = code.replace(
  /className=\{\`flex-1 min-w-0 flex bg-\[var\(--ide-panel-darker\)\] relative \$\{previewUrl \? 'border-r border-\[var\(--ide-border\)\]' : ''\}\`\}/g,
  'className={`flex-1 min-w-0 flex bg-transparent relative ${previewUrl ? \'border-r border-outline-variant\' : \'\'}`}'
);

// 7. Update inner editor borders
code = code.replace(
  /className=\{\`flex-1 flex flex-col min-w-0 \$\{index > 0 \? 'border-l border-\[var\(--ide-border\)\]' : ''\}\`\}/g,
  'className={`flex-1 flex flex-col min-w-0 ${index > 0 ? \'border-l border-outline-variant\' : \'\'}`}'
);

// 8. Update Preview Area 
code = code.replace(
  /className=\{\`\$\{isPreviewFullscreen \? 'fixed inset-0 z-50' : 'w-1\/2 min-w-\[300px\] h-full'\} bg-\[var\(--ide-base\)\] flex flex-col relative\`\}/g,
  'className={`${isPreviewFullscreen ? \'fixed inset-0 z-50\' : \'w-1/2 min-w-[300px] h-full\'} bg-surface-container-lowest flex flex-col relative`}'
);
code = code.replace(
  /className="h-10 flex items-center justify-between px-3 border-b border-\[var\(--ide-border\)\] bg-\[var\(--ide-panel-darker\)\]"/g,
  'className="h-9 flex items-center justify-between px-3 border-b border-outline-variant bg-surface-container-low glass-panel shrink-0"'
);

// 9. Update Terminal container
code = code.replace(
  /className="flex flex-col shrink-0 border-t border-\[var\(--ide-border\)\] bg-\[var\(--ide-panel\)\] z-10"/g,
  'className="flex flex-col shrink-0 border-t border-outline-variant bg-surface-container-low z-20 glass-panel"'
);

// 10. Update AI Chat container
code = code.replace(
  /className="shrink-0 flex flex-col bg-\[var\(--ide-panel\)\] z-10" style=\{\{ width: aiChatWidth \}\}/g,
  'className="shrink-0 flex flex-col bg-surface-container-low border-l border-outline-variant z-20 glass-panel" style={{ width: aiChatWidth }}'
);

// 11. End main block and add footer
code = code.replace(
  /        <\/div>\n\n        \{\/\* AI Chat Right Sidebar \*\/\}/g,
  `        </main>\n\n        {/* AI Chat Right Sidebar */}`
);

code = code.replace(
  /      \{\/\* Settings Modal \*\/\}/,
  `      </div>
      
      {/* Footer Status Bar */}
      <footer className="bg-primary text-on-primary font-ui-label-sm text-[11px] w-full h-[24px] flex justify-between items-center px-2 z-50 shrink-0 cursor-default">
        <div className="flex items-center gap-3 h-full">
          <a href="#" className="font-bold hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">v1.0.0</a>
          <div className="flex items-center gap-1 hover:bg-on-primary-fixed-variant px-1.5 h-full transition-colors cursor-pointer opacity-90">
            <span className="material-symbols-outlined" style={{fontSize: '14px'}}>error</span>
            <span>0</span>
            <span className="material-symbols-outlined ml-1" style={{fontSize: '14px'}}>warning</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 h-full">
          <span className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">LF</span>
          <span className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">UTF-8</span>
          <span className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 py-0.5 rounded transition-colors h-full flex items-center">TypeScript</span>
          <div className="opacity-80 hover:bg-on-primary-fixed-variant px-1.5 h-full transition-colors cursor-pointer flex items-center gap-1">
            <span className="material-symbols-outlined" style={{fontSize: '14px'}}>done_all</span>
            Prettier
          </div>
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="hover:bg-on-primary-fixed-variant px-1.5 h-full transition-colors cursor-pointer flex items-center"
            title="Toggle Terminal"
          >
            <span className="material-symbols-outlined" style={{fontSize: '16px'}}>terminal</span>
          </button>
        </div>
      </footer>

      {/* Settings Modal */}`
);

// Clean up extra wrapper divs
code = code.replace(
  /      \{\/\* Settings Modal \*\/\}\n      \{showSettingsModal && \(\n        <SettingsModal \n          onClose=\{\(\) => setShowSettingsModal\(false\)\} \n        \/>\n      \)\}\n\n    <\/div>/,
  `      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal 
          onClose={() => setShowSettingsModal(false)} 
        />
      )}
    </div>`
);

fs.writeFileSync('src/pages/NativeIDE.tsx', code);
