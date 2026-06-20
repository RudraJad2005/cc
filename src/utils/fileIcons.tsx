import { VscFolder, VscFolderOpened, VscFolderLibrary, VscFolderActive, VscJson, VscFile, VscGear, VscFileZip, VscDatabase, VscTerminal } from 'react-icons/vsc';
import { DiPython, DiJavascript1, DiReact, DiHtml5, DiCss3, DiMarkdown, DiNpm, DiGit } from 'react-icons/di';
import { SiTypescript, SiVite, SiTailwindcss } from 'react-icons/si';
import { FcImageFile } from 'react-icons/fc';

export const getFolderIcon = (name: string, isExpanded: boolean, className: string = "w-4 h-4") => {
  const iconClass = className.replace('w-4 h-4', 'w-[18px] h-[18px]'); // Slightly larger for react-icons consistency

  if (name === '.venv' || name === 'venv' || name === 'env') {
    return isExpanded 
      ? <VscFolderOpened className={`${iconClass} text-[#3776AB] shrink-0`} /> 
      : <VscFolderActive className={`${iconClass} text-[#3776AB] shrink-0`} />;
  }
  if (name === 'node_modules') {
    return isExpanded 
      ? <VscFolderOpened className={`${iconClass} text-[#83CD29] shrink-0`} /> 
      : <VscFolderLibrary className={`${iconClass} text-[#83CD29] shrink-0`} />;
  }
  if (name === '__pycache__' || name === '.git' || name.startsWith('.')) {
    return isExpanded 
      ? <VscFolderOpened className={`${iconClass} text-gray-500 shrink-0`} /> 
      : <VscFolder className={`${iconClass} text-gray-500 shrink-0`} />;
  }
  if (name === 'src' || name === 'components') {
    return isExpanded 
      ? <VscFolderOpened className={`${iconClass} text-[#007ACC] shrink-0`} /> 
      : <VscFolder className={`${iconClass} text-[#007ACC] shrink-0`} />;
  }
  
  // Default Folder
  return isExpanded 
    ? <VscFolderOpened className={`${iconClass} text-[#007ACC] shrink-0`} /> 
    : <VscFolder className={`${iconClass} text-[#007ACC] shrink-0`} />;
};

export const getFileIcon = (name: string, className: string = "w-4 h-4") => {
  const ext = name.split('.').pop()?.toLowerCase();
  const iconClass = className.replace('w-4 h-4', 'w-[18px] h-[18px]');
  
  // Exact name matches
  if (name === 'package.json') return <DiNpm className={`${iconClass} text-[#CB3837]`} />;
  if (name === 'package-lock.json' || name === 'yarn.lock' || name === 'pnpm-lock.yaml') return <DiNpm className={`${iconClass} text-gray-400`} />;
  if (name.startsWith('.env')) return <VscGear className={`${iconClass} text-[#F5C06F]`} />;
  if (name === '.gitignore' || name === '.gitattributes') return <DiGit className={`${iconClass} text-[#F05032]`} />;
  if (name === 'requirements.txt') return <DiPython className={`${iconClass} text-[#3776AB]`} />;
  if (name === 'README.md' || name === 'readme.md') return <DiMarkdown className={`${iconClass} text-[#007ACC]`} />;
  if (name === 'vite.config.ts' || name === 'vite.config.js') return <SiVite className={`${iconClass} text-[#646CFF]`} />;
  if (name === 'tailwind.config.js' || name === 'tailwind.config.ts') return <SiTailwindcss className={`${iconClass} text-[#38B2AC]`} />;
  
  // Extension matches
  switch (ext) {
    case 'ts':
      return <SiTypescript className={`${iconClass} text-[#3178C6]`} />;
    case 'tsx':
      return <DiReact className={`${iconClass} text-[#61DAFB]`} />;
    case 'js':
    case 'mjs':
    case 'cjs':
      return <DiJavascript1 className={`${iconClass} text-[#F7DF1E]`} />;
    case 'jsx':
      return <DiReact className={`${iconClass} text-[#61DAFB]`} />;
    case 'py':
    case 'pyw':
      return <DiPython className={`${iconClass} text-[#3776AB]`} />;
    case 'json':
      return <VscJson className={`${iconClass} text-[#F5C06F]`} />;
    case 'css':
    case 'scss':
    case 'less':
      return <DiCss3 className={`${iconClass} text-[#1572B6]`} />;
    case 'html':
    case 'htm':
      return <DiHtml5 className={`${iconClass} text-[#E34F26]`} />;
    case 'md':
    case 'mdx':
      return <DiMarkdown className={`${iconClass} text-[#007ACC]`} />;
    case 'txt':
    case 'log':
      return <VscFile className={`${iconClass} text-gray-400`} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
    case 'gif':
    case 'ico':
    case 'webp':
      return <FcImageFile className={`${iconClass}`} />;
    case 'sh':
    case 'bash':
    case 'ps1':
    case 'cmd':
    case 'bat':
      return <VscTerminal className={`${iconClass} text-green-500`} />;
    case 'sql':
    case 'db':
    case 'sqlite':
      return <VscDatabase className={`${iconClass} text-[#007ACC]`} />;
    case 'zip':
    case 'tar':
    case 'gz':
    case '7z':
    case 'rar':
      return <VscFileZip className={`${iconClass} text-red-400`} />;
    default:
      return <VscFile className={`${iconClass} text-gray-400`} />;
  }
};
