const fs = require('fs');

// Patch FileTree.tsx
let fileTree = fs.readFileSync('src/components/ide/FileTree.tsx', 'utf-8');

// 1. Remove local lucide-react imports that are only used for icons (keep Folder, FolderOpen, ChevronRight, ChevronDown, FilePlus, FolderPlus, Trash2, Pencil)
// Wait, the easiest way is to just add the import for getFileIcon and remove the getFileIcon function.
fileTree = fileTree.replace(
  /import \{ WebContainer \} from '@webcontainer\/api';/,
  `import { WebContainer } from '@webcontainer/api';\nimport { getFileIcon } from '../../utils/fileIcons';`
);

// 2. Remove the getFileIcon function definition
fileTree = fileTree.replace(/  const getFileIcon = \(\s*name:\s*string\s*\) => \{[\s\S]*?  \};\n\n/, '');

fs.writeFileSync('src/components/ide/FileTree.tsx', fileTree);

// Patch EditorTabs.tsx
let editorTabs = fs.readFileSync('src/components/ide/EditorTabs.tsx', 'utf-8');

editorTabs = editorTabs.replace(
  /import \{ X, LayoutPanelLeft \} from 'lucide-react';/,
  `import { X, LayoutPanelLeft } from 'lucide-react';\nimport { getFileIcon } from '../../utils/fileIcons';`
);

editorTabs = editorTabs.replace(
  /<span className=\{\`material-symbols-outlined text-\[16px\] \$\{isActive \? 'text-\[\#E34F26\]' : 'text-on-surface-variant'\}\`\}>\s*code\s*<\/span>/,
  `{getFileIcon(filename, 'w-[15px] h-[15px] shrink-0' + (isActive ? '' : ' opacity-70'))}`
);

fs.writeFileSync('src/components/ide/EditorTabs.tsx', editorTabs);
