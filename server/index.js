const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const Docker = require('dockerode');
const pty = require('node-pty');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const docker = new Docker({ socketPath: '//./pipe/docker_engine' }); // Windows named pipe for Docker Desktop

const WORKSPACES_DIR = path.join(__dirname, 'workspaces');
if (!fs.existsSync(WORKSPACES_DIR)) {
  fs.mkdirSync(WORKSPACES_DIR);
}

// Track running ptys
const ptys = {};

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  
  // 1. Initialize a Docker Workspace for a Project
  socket.on('initWorkspace', async ({ projectId, fileSystem }) => {
    console.log(`Initializing workspace for project: ${projectId}`);
    const projectDir = path.join(WORKSPACES_DIR, projectId);
    
    // Create local folder if it doesn't exist
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    
    // Write files from Supabase to local folder so Docker can mount it
    if (fileSystem) {
       const writeTree = (dirPath, tree) => {
         for (const [name, node] of Object.entries(tree)) {
           const fullPath = path.join(dirPath, name);
           if (node.directory) {
             if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
             writeTree(fullPath, node.directory);
           } else if (node.file) {
             fs.writeFileSync(fullPath, node.file.contents);
           }
         }
       };
       writeTree(projectDir, fileSystem);
    }

    const containerName = `cc-project-${projectId}`;
    
    try {
      // Check if container already exists
      const container = docker.getContainer(containerName);
      let info;
      try {
        info = await container.inspect();
        if (!info.State.Running) {
          console.log(`Starting existing container ${containerName}`);
          await container.start();
        }
      } catch (err) {
        // Container doesn't exist, create it
        if (err.statusCode === 404) {
          console.log(`Creating new container ${containerName}`);
          
          // Ensure python image exists
          try {
            await docker.getImage('python:3.10').inspect();
          } catch(e) {
             console.log("Pulling python:3.10 image... this may take a moment.");
             // Synchronously wait for pull stream (simplified)
             await new Promise((resolve, reject) => {
               docker.pull('python:3.10', (err, stream) => {
                 if (err) return reject(err);
                 docker.modem.followProgress(stream, onFinished, onProgress);
                 function onFinished(err, output) { if(err) reject(err); else resolve(); }
                 function onProgress(event) { console.log(event.status); }
               });
             });
          }

          // Create the container with the workspace volume mounted
          // Note: using Windows format path for volume bind
          const windowsPath = projectDir.replace(/\\/g, '/');
          
          const newContainer = await docker.createContainer({
            Image: 'python:3.10',
            name: containerName,
            Tty: true,
            Cmd: ['tail', '-f', '/dev/null'], // Keep container running infinitely
            HostConfig: {
              Binds: [`${windowsPath}:/workspace`] // Mount host workspace to /workspace in container
            },
            WorkingDir: '/workspace'
          });
          
          await newContainer.start();
        } else {
          throw err;
        }
      }
      
      socket.emit('workspaceReady', { status: 'success', projectId });
    } catch (error) {
      console.error(`Failed to initialize workspace for ${projectId}:`, error);
      socket.emit('workspaceError', { error: error.message });
    }
  });

  // 2. Spawn a Terminal using node-pty to `docker exec` into the container
  socket.on('spawnTerminal', ({ terminalId, projectId }) => {
    console.log(`Spawning terminal ${terminalId} for ${projectId}`);
    const containerName = `cc-project-${projectId}`;
    
    try {
      // Use node-pty to run `docker exec` which gives us a true TTY inside the container!
      const ptyProcess = pty.spawn('docker', ['exec', '-it', containerName, '/bin/bash'], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
      });

      ptys[terminalId] = ptyProcess;

      ptyProcess.onData((data) => {
        socket.emit('terminalOutput', { terminalId, data });
      });

      ptyProcess.onExit(({ exitCode }) => {
        console.log(`Terminal ${terminalId} exited with code ${exitCode}`);
        delete ptys[terminalId];
        socket.emit('terminalClosed', { terminalId });
      });

    } catch (e) {
      console.error('Failed to spawn terminal', e);
      socket.emit('terminalOutput', { terminalId, data: `\r\nError spanning terminal: ${e.message}\r\n`});
    }
  });

  socket.on('terminalInput', ({ terminalId, data }) => {
    const ptyProcess = ptys[terminalId];
    if (ptyProcess) {
      ptyProcess.write(data);
    }
  });

  socket.on('resizeTerminal', ({ terminalId, cols, rows }) => {
    const ptyProcess = ptys[terminalId];
    if (ptyProcess) {
      ptyProcess.resize(cols, rows);
    }
  });

  // 3. File System API: Reading/Writing direct to the host folder
  socket.on('readFile', ({ projectId, filePath }) => {
    const fullPath = path.join(WORKSPACES_DIR, projectId, filePath);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      socket.emit('fileRead', { filePath, content });
    } catch (e) {
      socket.emit('fsError', { error: e.message });
    }
  });

  socket.on('writeFile', ({ projectId, filePath, content }) => {
    const fullPath = path.join(WORKSPACES_DIR, projectId, filePath);
    try {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content);
      socket.emit('fileWritten', { filePath });
    } catch (e) {
      socket.emit('fsError', { error: e.message });
    }
  });

  socket.on('deleteFile', ({ projectId, filePath }) => {
    const fullPath = path.join(WORKSPACES_DIR, projectId, filePath);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      socket.emit('fileDeleted', { filePath });
    } catch (e) {
      socket.emit('fsError', { error: e.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`CollabCode Docker Execution Server running on http://localhost:${PORT}`);
});
