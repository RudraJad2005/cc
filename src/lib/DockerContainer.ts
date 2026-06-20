import { io, Socket } from 'socket.io-client';

export class DockerContainer {
  private socket: Socket;
  private projectId: string;
  public fs: any;

  constructor(projectId: string) {
    this.projectId = projectId;
    this.socket = io('wss://52.172.229.65.nip.io');
    
    this.fs = {
      readdir: async (path: string, options: any) => {
        return new Promise((resolve, reject) => {
          this.socket.emit('readDir', { projectId: this.projectId, dirPath: path });
          this.socket.once('dirRead', (data) => {
             // Map standard objects to match WebContainer's Dirent interface
             const entries = data.entries.map((e: any) => ({
                name: e.name,
                isDirectory: () => e.isDirectory
             }));
             resolve(entries);
          });
          this.socket.once('fsError', (err) => reject(new Error(err.error)));
        });
      },
      readFile: async (filePath: string, encoding: string = 'utf-8') => {
        return new Promise((resolve, reject) => {
          this.socket.emit('readFile', { projectId: this.projectId, filePath });
          this.socket.once('fileRead', (data) => resolve(data.content));
          this.socket.once('fsError', (err) => reject(new Error(err.error)));
        });
      },
      writeFile: async (filePath: string, content: string) => {
        return new Promise((resolve, reject) => {
          this.socket.emit('writeFile', { projectId: this.projectId, filePath, content });
          this.socket.once('fileWritten', () => resolve(undefined));
          this.socket.once('fsError', (err) => reject(new Error(err.error)));
        });
      },
      mkdir: async (filePath: string) => {
        // Implementation for mkdir
      },
      rm: async (filePath: string, options: any) => {
        return new Promise((resolve, reject) => {
          this.socket.emit('deleteFile', { projectId: this.projectId, filePath });
          this.socket.once('fileDeleted', () => resolve(undefined));
          this.socket.once('fsError', (err) => reject(new Error(err.error)));
        });
      }
    };
  }

  async mount(fileSystem: any) {
    return new Promise((resolve, reject) => {
      this.socket.emit('initWorkspace', { projectId: this.projectId, fileSystem });
      this.socket.once('workspaceReady', () => resolve(undefined));
      this.socket.once('workspaceError', (err) => reject(new Error(err.error)));
    });
  }

  on(event: string, callback: Function) {
    // Mock for 'server-ready'
    if (event === 'server-ready') {
      // call callback with port and url if we run a web server in docker
    }
  }

  // Used by TerminalTabs
  async spawn(cmd: string, args: string[]) {
     const terminalId = Math.random().toString(36).substring(7);
     this.socket.emit('spawnTerminal', { terminalId, projectId: this.projectId });
     
     let onDataCallback: any = null;
     let onExitCallback: any = null;

     this.socket.on('terminalOutput', (data) => {
        if (data.terminalId === terminalId && onDataCallback) {
          onDataCallback(data.data);
        }
     });

     this.socket.on('terminalClosed', (data) => {
        if (data.terminalId === terminalId && onExitCallback) {
          onExitCallback(0);
        }
     });

     return {
       output: {
         pipeTo: async (writableStream: any) => {
           // Wait slightly for the writer to be ready
           setTimeout(() => {
             try {
               const writer = writableStream.getWriter();
               onDataCallback = (data: string) => writer.write(data);
             } catch (e) {
               // If it's already locked or has issues, we can fall back to direct xterm writing in the future
             }
           }, 100);
         }
       },
       input: {
         getWriter: () => ({
           write: (data: string) => {
             this.socket.emit('terminalInput', { terminalId, data });
           }
         })
       },
       resize: ({ cols, rows }: { cols: number, rows: number }) => {
         this.socket.emit('resizeTerminal', { terminalId, cols, rows });
       },
       kill: () => {
         // Implement kill if needed
       },
       exit: new Promise((resolve) => {
         onExitCallback = resolve;
       })
     };
  }

  async getCompletions(sourceCode: string, line: number, column: number): Promise<any[]> {
    return new Promise((resolve) => {
      let resolved = false;
      
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve([]);
        }
      }, 500); // 500ms timeout to prevent hanging if backend isn't patched

      this.socket.emit('getCompletions', { projectId: this.projectId, sourceCode, line, column });
      
      this.socket.once('completionsResult', (data) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve(data.completions || []);
        }
      });
    });
  }
}
