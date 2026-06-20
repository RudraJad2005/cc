import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebContainer } from '@webcontainer/api';
import { X } from 'lucide-react';
import '@xterm/xterm/css/xterm.css';

interface TerminalProps {
  webcontainer: WebContainer | null;
  hidden?: boolean;
  type?: 'bash' | 'node' | 'git';
  theme?: string;
}

export function Terminal({ webcontainer, hidden = false, type = 'bash', theme }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  const applyTheme = () => {
    if (!xtermRef.current || !terminalRef.current) return;
    const style = getComputedStyle(terminalRef.current);
    const bg = style.getPropertyValue('--ide-panel-darker').trim() || '#050505';
    const fg = style.getPropertyValue('--ide-text').trim() || '#e5e5e5';
    
    xtermRef.current.options.theme = {
      background: bg,
      foreground: fg,
      cursor: '#3b82f6',
      selectionBackground: '#3b82f640'
    };
  };

  useEffect(() => {
    applyTheme();
  }, [theme]);

  useEffect(() => {
    if (!terminalRef.current || !webcontainer) return;

    const fitAddon = new FitAddon();
    const xterm = new XTerm({
      theme: {
        background: '#050505',
        foreground: '#e5e5e5',
        cursor: '#3b82f6',
        selectionBackground: '#3b82f640'
      },
      fontFamily: '"Geist Mono", "JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace',
      fontSize: 13,
      lineHeight: 1.5,
      letterSpacing: 0.5,
      fontWeight: '400',
      cursorBlink: true,
      cursorStyle: 'bar',
      cursorWidth: 2,
      convertEol: true
    });
    
    xterm.loadAddon(fitAddon);
    xterm.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = xterm;
    
    // Apply theme correctly after mount
    setTimeout(applyTheme, 50);

    let shellProcess: any;
    let shellWriter: any = null;

    const handleRunCmd = (e: any) => {
      // Only execute if this is the active (visible) terminal
      if (!hidden && shellWriter) {
        shellWriter.write(e.detail.command + '\r');
      }
    };
    window.addEventListener('terminal_run', handleRunCmd);

    const startShell = async () => {
      try {
        const cmd = type === 'node' ? 'node' : 'jsh';
        shellProcess = await webcontainer.spawn(cmd, {
          terminal: {
            cols: xterm.cols,
            rows: xterm.rows,
          },
        });
        
        shellProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              xterm.write(data);
            },
          })
        );
        
        shellWriter = shellProcess.input.getWriter();
        xterm.onData((data) => {
          shellWriter.write(data);
        });
      } catch (err) {
        console.error("Terminal spawn error:", err);
      }
    };

    startShell();

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
      if (shellProcess) {
        shellProcess.resize({
          cols: xterm.cols,
          rows: xterm.rows,
        });
      }
    });
    
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('terminal_run', handleRunCmd);
      xterm.dispose();
      if (shellProcess) {
        shellProcess.kill();
      }
    };
  }, [webcontainer, hidden]);

  useEffect(() => {
    if (!hidden && xtermRef.current) {
      // Re-fit when it becomes visible again
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 10);
    }
  }, [hidden]);

  return (
    <div className={`w-full h-full flex-col bg-transparent ${hidden ? 'hidden' : 'flex'}`}>
      <div ref={terminalRef} className="flex-1 w-full overflow-hidden p-2" />
    </div>
  );
}
