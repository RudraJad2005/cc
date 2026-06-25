# Getting Started

Everything you need to start building with the CollabCode platform.

## Installation

Install the CollabCode CLI globally to create projects, manage deployments, and configure your environment from the terminal.

```bash
$ npm install -g @collabcode/cli

# Authenticate with your account
$ collabcode login

# Create a new project
$ collabcode init my-app --template next
```

## Quickstart

Deploy your first application in under 60 seconds. CollabCode auto-detects your framework and applies the optimal build settings.

```bash
# Navigate to your project
$ cd my-app

# Deploy to production
$ collabcode deploy --prod

✓ Build completed in 8.2s
✓ Deployed to https://my-app.collabcode.dev
✓ SSL certificate provisioned automatically
```

## Supported Frameworks

CollabCode natively supports all major JavaScript and full-stack frameworks with zero-config deployments.

- Next.js
- React
- Vue / Nuxt
- Svelte / SvelteKit
- Astro
- Vite
- Remix
- Angular
- Express.js
