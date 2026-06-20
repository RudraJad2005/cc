const fs = require('fs');
let code = fs.readFileSync('src/pages/NativeIDE.tsx', 'utf-8');

// 1. Add file upload state and ref
code = code.replace(
  /  const \[isAiChatOpen, setIsAiChatOpen\] = useState\(false\);/,
  `  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);`
);

// 2. Add handleFileUpload function and menu toggle logic
code = code.replace(
  /  const handleSave = async \(\) => \{/,
  `  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !webcontainer) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          const uint8Array = new Uint8Array(arrayBuffer);
          const path = \`/\${file.name}\`;
          try {
            await webcontainer.fs.writeFile(path, uint8Array);
            if (channel) {
              channel.send({ type: 'broadcast', event: 'fs_update', payload: { action: 'writeFile', path: path, content: '' } });
            }
          } catch (err) {
            console.error(\`Failed to upload \${file.name}\`, err);
          }
        }
      };
      
      reader.readAsArrayBuffer(file);
    }
    
    // Refresh the file tree
    window.dispatchEvent(new Event('fs_synced'));
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Close file menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#file-menu-container')) {
        setShowFileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {`
);

// 3. Update the TopNavBar File link to a dropdown menu
code = code.replace(
  /            <a href="#" className="text-\[13px\] text-on-surface-variant hover:bg-surface-container-high px-2 py-0\.5 rounded transition-colors">File<\/a>/,
  `            <div id="file-menu-container" className="relative">
              <button 
                onClick={() => setShowFileMenu(!showFileMenu)}
                className="text-[13px] text-on-surface-variant hover:bg-surface-container-high px-2 py-0.5 rounded transition-colors"
              >
                File
              </button>
              {showFileMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50 py-1">
                  <button 
                    onClick={() => {
                      setShowFileMenu(false);
                      fileInputRef.current?.click();
                    }}
                    className="w-full text-left px-3 py-1.5 text-[13px] text-on-surface hover:bg-surface-variant transition-colors"
                  >
                    Upload Local File
                  </button>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />`
);

fs.writeFileSync('src/pages/NativeIDE.tsx', code);
