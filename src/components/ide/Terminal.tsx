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
}

export function Terminal({ webcontainer, hidden = false, type = 'bash' }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

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
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 13,
      cursorBlink: true,
      convertEol: true
    });
    
    xterm.loadAddon(fitAddon);
    xterm.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = xterm;

    let shellProcess: any;

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
        
        const input = shellProcess.input.getWriter();
        xterm.onData((data) => {
          input.write(data);
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
      xterm.dispose();
      if (shellProcess) {
        shellProcess.kill();
      }
    };
  }, [webcontainer]);

  useEffect(() => {
    if (!hidden && xtermRef.current) {
      // Re-fit when it becomes visible again
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 10);
    }
  }, [hidden]);

  return (
    <div className={`w-full h-full flex-col bg-[#050505] ${hidden ? 'hidden' : 'flex'}`}>
      <div ref={terminalRef} className="flex-1 w-full overflow-hidden p-2" />
    </div>
  );
}
