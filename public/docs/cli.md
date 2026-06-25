# CLI Reference

The CollabCode CLI provides a complete interface for managing your projects from the terminal.

## Installation

```bash
$ npm install -g @collabcode/cli
$ collabcode --version
CollabCode CLI v3.2.1
```

## Commands

- `collabcode login` - Authenticate with your CollabCode account via browser OAuth.
- `collabcode init [name]` - Initialize a new project in the current directory.
- `collabcode deploy` - Deploy the current project. Add `--prod` to deploy to production.
- `collabcode dev` - Start the local development server with hot reload.
- `collabcode env pull` - Pull environment variables from the dashboard to a local `.env` file.
- `collabcode env push` - Push local `.env` values to the dashboard.
- `collabcode domains add [domain]` - Attach a custom domain to the current project.
- `collabcode logs` - Stream real-time function logs from your latest deployment.
- `collabcode whoami` - Display the currently authenticated user and workspace.
