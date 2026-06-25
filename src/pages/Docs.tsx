import React, { useState } from 'react';
import { Book, ChevronRight, Copy, Check, Terminal, Database, HardDrive, Shield, Globe, Rocket, Key, Search, Code2, FileCode, Box, ArrowRight } from 'lucide-react';

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
  </div>
);

/* ── Reusable code block with copy ── */
const CodeBlock = ({ code, language = 'bash', title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden font-mono text-[13px] shadow-[0_0_30px_rgba(255,255,255,0.02)] group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            <span className="text-[#666] ml-2 text-xs">{title}</span>
          </div>
          <button onClick={handleCopy} className="text-[#444] hover:text-white transition-colors">
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
      {!title && (
        <button onClick={handleCopy} className="absolute top-3 right-3 text-[#444] hover:text-white transition-colors opacity-0 group-hover:opacity-100 z-10">
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      )}
      <pre className="p-4 overflow-x-auto relative"><code className="text-[#ddd] leading-relaxed">{code}</code></pre>
    </div>
  );
};

/* ── Sidebar nav item ── */
const NavItem = ({ label, icon: Icon, active, onClick, indent = false }: { label: string; icon?: any; active: boolean; onClick: () => void; indent?: boolean }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${indent ? 'ml-4 text-xs' : ''} ${active ? 'bg-white/10 text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
  >
    {Icon && <Icon className="w-4 h-4 shrink-0" />}
    {!Icon && indent && <div className="w-1 h-1 rounded-full bg-[#666] shrink-0" />}
    {label}
  </button>
);

/* ── HTTP method badge ── */
const Method = ({ method }: { method: string }) => {
  const colors: Record<string, string> = {
    GET: 'bg-green-500/10 text-green-400 border-green-500/20',
    POST: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    PATCH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${colors[method] || 'bg-white/5 text-white border-white/10'}`}>{method}</span>;
};

/* ── Endpoint row ── */
const Endpoint = ({ method, path, description }: { method: string; path: string; description: string }) => (
  <div className="flex items-start gap-3 py-4 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] -mx-4 px-4 rounded transition-colors">
    <Method method={method} />
    <div className="flex-1 min-w-0">
      <code className="text-sm text-white font-mono break-all">{path}</code>
      <p className="text-xs text-[#888] mt-1">{description}</p>
    </div>
  </div>
);

/* ── Param table ── */
const ParamTable = ({ params }: { params: { name: string; type: string; required: boolean; description: string }[] }) => (
  <div className="border border-white/10 rounded-lg overflow-hidden mt-4 mb-6">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/10 bg-white/[0.02]">
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider">Parameter</th>
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider">Type</th>
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider hidden md:table-cell">Required</th>
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider">Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p, i) => (
          <tr key={i} className="border-b border-white/5 last:border-0">
            <td className="px-4 py-2.5 font-mono text-xs text-white">{p.name}</td>
            <td className="px-4 py-2.5 font-mono text-xs text-purple-400">{p.type}</td>
            <td className="px-4 py-2.5 text-xs hidden md:table-cell">{p.required ? <span className="text-orange-400">Required</span> : <span className="text-[#666]">Optional</span>}</td>
            <td className="px-4 py-2.5 text-xs text-[#888]">{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─────────────────── Section Content Components ─────────────────── */

const GettingStarted = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Getting Started</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Everything you need to start building with the CollabCode platform.</p>

    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" id="install"><Terminal className="w-5 h-5" /> Installation</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">Install the CollabCode CLI globally to create projects, manage deployments, and configure your environment from the terminal.</p>
    <CodeBlock title="Terminal" code={`$ npm install -g @collabcode/cli

# Authenticate with your account
$ collabcode login

# Create a new project
$ collabcode init my-app --template next`} />

    <h2 className="text-xl font-bold text-white mt-12 mb-4 flex items-center gap-2" id="quickstart"><Rocket className="w-5 h-5" /> Quickstart</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">Deploy your first application in under 60 seconds. CollabCode auto-detects your framework and applies the optimal build settings.</p>
    <CodeBlock title="Terminal" code={`# Navigate to your project
$ cd my-app

# Deploy to production
$ collabcode deploy --prod

✓ Build completed in 8.2s
✓ Deployed to https://my-app.collabcode.dev
✓ SSL certificate provisioned automatically`} />

    <h2 className="text-xl font-bold text-white mt-12 mb-4 flex items-center gap-2" id="frameworks"><Code2 className="w-5 h-5" /> Supported Frameworks</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">CollabCode natively supports all major JavaScript and full-stack frameworks with zero-config deployments.</p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      {['Next.js', 'React', 'Vue / Nuxt', 'Svelte / SvelteKit', 'Astro', 'Vite', 'Remix', 'Angular', 'Express.js'].map(fw => (
        <div key={fw} className="border border-white/10 bg-white/[0.02] rounded-lg px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors cursor-default">{fw}</div>
      ))}
    </div>
  </div>
);

const AuthenticationSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Authentication</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Secure your API requests with project-scoped tokens and manage user authentication flows.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="api-keys">API Keys</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">All API requests require a Bearer token. You can generate project-scoped API keys from the <strong className="text-white">Dashboard → Settings → API Keys</strong> panel.</p>
    <CodeBlock title="Request Header" code={`Authorization: Bearer cc_live_sk_a1b2c3d4e5f6...

# Example: List all projects
curl -X GET https://api.collabcode.dev/v1/projects \\
  -H "Authorization: Bearer cc_live_sk_a1b2c3d4e5f6" \\
  -H "Content-Type: application/json"`} />

    <h2 className="text-xl font-bold text-white mt-12 mb-4" id="user-auth">User Auth (via Supabase)</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">CollabCode integrates directly with Supabase Auth for user management. Connect your Supabase instance from the Backend dashboard to get started.</p>
    <CodeBlock title="auth.ts" code={`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Sign up a new user
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123'
})

// Sign in
const { data: session } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()`} />

    <ParamTable params={[
      { name: 'email', type: 'string', required: true, description: 'User email address' },
      { name: 'password', type: 'string', required: true, description: 'Minimum 6 characters' },
      { name: 'options.data', type: 'object', required: false, description: 'Custom user metadata (name, avatar, etc.)' },
      { name: 'options.captchaToken', type: 'string', required: false, description: 'hCaptcha or Turnstile verification token' },
    ]} />
  </div>
);

const DeploymentsSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Deployments API</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Create, list, and manage deployments for your CollabCode projects.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="deploy-endpoints">Endpoints</h2>
    <div className="mb-6">
      <Endpoint method="GET" path="/v1/projects/:projectId/deployments" description="List all deployments for a project. Returns paginated results sorted by creation date." />
      <Endpoint method="POST" path="/v1/projects/:projectId/deployments" description="Trigger a new deployment. Optionally specify a git ref or branch to deploy from." />
      <Endpoint method="GET" path="/v1/deployments/:deploymentId" description="Retrieve details of a specific deployment including status, URL, and build logs." />
      <Endpoint method="PATCH" path="/v1/deployments/:deploymentId" description="Update deployment metadata. Use this to promote a preview deployment to production." />
      <Endpoint method="DELETE" path="/v1/deployments/:deploymentId" description="Cancel an in-progress deployment or delete a completed one." />
    </div>

    <h2 className="text-xl font-bold text-white mt-8 mb-4" id="deploy-create">Create a Deployment</h2>
    <ParamTable params={[
      { name: 'ref', type: 'string', required: false, description: 'Git ref, branch, or commit SHA to deploy. Defaults to main.' },
      { name: 'environment', type: 'string', required: false, description: '"production" | "preview". Defaults to "preview".' },
      { name: 'force', type: 'boolean', required: false, description: 'Skip cache and rebuild from scratch.' },
    ]} />
    <CodeBlock title="Create deployment" code={`curl -X POST https://api.collabcode.dev/v1/projects/prj_abc123/deployments \\
  -H "Authorization: Bearer cc_live_sk_a1b2c3..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "ref": "main",
    "environment": "production"
  }'`} />

    <h2 className="text-xl font-bold text-white mt-10 mb-4" id="deploy-response">Response</h2>
    <CodeBlock title="Response — 201 Created" code={`{
  "id": "dpl_8f72a9b4c1e2",
  "status": "building",
  "url": "https://my-app-8f72a9b.collabcode.dev",
  "environment": "production",
  "ref": "main",
  "createdAt": "2026-06-24T12:00:00Z",
  "buildDuration": null,
  "project": {
    "id": "prj_abc123",
    "name": "my-app"
  }
}`} />
  </div>
);

const StorageSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Storage API</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Upload, download, and manage files in project buckets via the Supabase Storage integration.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="storage-endpoints">Endpoints</h2>
    <div className="mb-6">
      <Endpoint method="GET" path="/storage/v1/bucket" description="List all storage buckets for the connected Supabase instance." />
      <Endpoint method="POST" path="/storage/v1/bucket" description="Create a new storage bucket. Specify public or private access." />
      <Endpoint method="POST" path="/storage/v1/object/:bucketId" description="Upload a file to a bucket. Supports multipart uploads up to 5GB." />
      <Endpoint method="GET" path="/storage/v1/object/:bucketId/:path" description="Download a file by its bucket path." />
      <Endpoint method="DELETE" path="/storage/v1/object/:bucketId" description="Delete one or more files from a bucket." />
    </div>

    <h2 className="text-xl font-bold text-white mt-8 mb-4" id="storage-upload">Upload a File</h2>
    <CodeBlock title="storage.ts" code={`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Upload a file to a bucket
const { data, error } = await supabase.storage
  .from('user-uploads')
  .upload('avatars/user-123.png', file, {
    cacheControl: '3600',
    upsert: true,
    contentType: 'image/png'
  })

// Get a public URL
const { data: { publicUrl } } = supabase.storage
  .from('user-uploads')
  .getPublicUrl('avatars/user-123.png')

// List files in a folder
const { data: files } = await supabase.storage
  .from('user-uploads')
  .list('avatars', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' }
  })`} />

    <ParamTable params={[
      { name: 'path', type: 'string', required: true, description: 'File path inside the bucket (e.g. "avatars/user-123.png")' },
      { name: 'file', type: 'File | Blob', required: true, description: 'The file contents to upload' },
      { name: 'cacheControl', type: 'string', required: false, description: 'Cache-Control header value (e.g. "3600" for 1 hour)' },
      { name: 'upsert', type: 'boolean', required: false, description: 'If true, overwrite existing files at the same path' },
    ]} />
  </div>
);

const DatabaseSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Database API</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Query, insert, and manage data in your Postgres database via the Supabase client SDK.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="db-connect">Connecting</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">Connect your Supabase Postgres instance from <strong className="text-white">Dashboard → Backend</strong>. Once connected, use the client SDK for all database operations.</p>
    <CodeBlock title="db.ts" code={`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)`} />

    <h2 className="text-xl font-bold text-white mt-10 mb-4" id="db-select">Query Data</h2>
    <CodeBlock title="Select rows" code={`// Select all columns
const { data, error } = await supabase
  .from('posts')
  .select('*')

// Select specific columns with filters
const { data: filtered } = await supabase
  .from('posts')
  .select('id, title, author:users(name)')
  .eq('status', 'published')
  .order('created_at', { ascending: false })
  .limit(10)`} />

    <h2 className="text-xl font-bold text-white mt-10 mb-4" id="db-insert">Insert Data</h2>
    <CodeBlock title="Insert rows" code={`const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'Hello World',
    body: 'This is my first post.',
    author_id: 'usr_abc123',
    status: 'draft'
  })
  .select()  // Return the inserted row`} />

    <h2 className="text-xl font-bold text-white mt-10 mb-4" id="db-update">Update & Delete</h2>
    <CodeBlock title="Update and Delete" code={`// Update
const { data, error } = await supabase
  .from('posts')
  .update({ status: 'published' })
  .eq('id', 'post_123')
  .select()

// Delete
const { error: deleteError } = await supabase
  .from('posts')
  .delete()
  .eq('id', 'post_123')`} />

    <ParamTable params={[
      { name: '.from(table)', type: 'string', required: true, description: 'The table name to query' },
      { name: '.select(columns)', type: 'string', required: false, description: 'Comma-separated column names. Use * for all.' },
      { name: '.eq(column, value)', type: 'Filter', required: false, description: 'Exact match filter' },
      { name: '.order(column, opts)', type: 'Sort', required: false, description: 'Sort results by column' },
      { name: '.limit(count)', type: 'number', required: false, description: 'Limit number of results returned' },
    ]} />
  </div>
);

const ProjectsSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Projects API</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Create, configure, and manage projects on the CollabCode platform.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="proj-endpoints">Endpoints</h2>
    <div className="mb-6">
      <Endpoint method="GET" path="/v1/projects" description="List all projects in your workspace." />
      <Endpoint method="POST" path="/v1/projects" description="Create a new project. Connect a Git repository or import from a template." />
      <Endpoint method="GET" path="/v1/projects/:projectId" description="Get project details including framework, last deployment, and environment variables." />
      <Endpoint method="PATCH" path="/v1/projects/:projectId" description="Update project settings (name, build command, output directory, etc.)." />
      <Endpoint method="DELETE" path="/v1/projects/:projectId" description="Permanently delete a project and all its deployments." />
    </div>

    <h2 className="text-xl font-bold text-white mt-8 mb-4" id="proj-create">Create a Project</h2>
    <ParamTable params={[
      { name: 'name', type: 'string', required: true, description: 'Project name (must be URL-safe)' },
      { name: 'framework', type: 'string', required: false, description: 'Auto-detected if not provided. One of: nextjs, react, vue, svelte, astro' },
      { name: 'gitRepository', type: 'object', required: false, description: '{ url: string, branch: string } — Connect to a GitHub/GitLab repo' },
      { name: 'buildCommand', type: 'string', required: false, description: 'Custom build command (default: framework-specific)' },
      { name: 'outputDirectory', type: 'string', required: false, description: 'Build output directory (default: framework-specific)' },
    ]} />
    <CodeBlock title="Create project" code={`curl -X POST https://api.collabcode.dev/v1/projects \\
  -H "Authorization: Bearer cc_live_sk_a1b2c3..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-saas-app",
    "framework": "nextjs",
    "gitRepository": {
      "url": "https://github.com/user/my-saas-app",
      "branch": "main"
    }
  }'`} />
  </div>
);

const DomainsSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Domains API</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Attach custom domains and manage SSL certificates for your projects.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="domain-endpoints">Endpoints</h2>
    <div className="mb-6">
      <Endpoint method="GET" path="/v1/projects/:projectId/domains" description="List all domains attached to a project." />
      <Endpoint method="POST" path="/v1/projects/:projectId/domains" description="Add a custom domain. SSL certificates are auto-provisioned via Let's Encrypt." />
      <Endpoint method="DELETE" path="/v1/domains/:domainId" description="Remove a custom domain from the project." />
    </div>

    <h2 className="text-xl font-bold text-white mt-8 mb-4" id="domain-dns">DNS Configuration</h2>
    <p className="text-[#888] mb-4 text-sm leading-relaxed">After adding a domain, configure the following DNS records with your registrar:</p>
    <div className="border border-white/10 rounded-lg overflow-hidden mt-4 mb-6">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-white/10 bg-white/[0.02]">
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider">Type</th>
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider">Name</th>
          <th className="text-left px-4 py-2.5 text-[#888] font-medium text-xs uppercase tracking-wider">Value</th>
        </tr></thead>
        <tbody>
          <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs text-green-400">A</td><td className="px-4 py-2.5 font-mono text-xs text-white">@</td><td className="px-4 py-2.5 font-mono text-xs text-[#888]">76.76.21.21</td></tr>
          <tr><td className="px-4 py-2.5 font-mono text-xs text-blue-400">CNAME</td><td className="px-4 py-2.5 font-mono text-xs text-white">www</td><td className="px-4 py-2.5 font-mono text-xs text-[#888]">cname.collabcode.dev</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const EnvVarsSection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Environment Variables</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">Securely store secrets and configuration values scoped to specific environments.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="env-endpoints">Endpoints</h2>
    <div className="mb-6">
      <Endpoint method="GET" path="/v1/projects/:projectId/env" description="List all environment variables (values are encrypted and returned as *****)." />
      <Endpoint method="POST" path="/v1/projects/:projectId/env" description="Create or update an environment variable." />
      <Endpoint method="DELETE" path="/v1/projects/:projectId/env/:key" description="Delete an environment variable by key." />
    </div>

    <ParamTable params={[
      { name: 'key', type: 'string', required: true, description: 'Variable name (e.g. DATABASE_URL)' },
      { name: 'value', type: 'string', required: true, description: 'Variable value — encrypted at rest' },
      { name: 'target', type: 'string[]', required: false, description: 'Environments to apply to: ["production", "preview", "development"]' },
    ]} />

    <CodeBlock title="Set environment variable" code={`curl -X POST https://api.collabcode.dev/v1/projects/prj_abc123/env \\
  -H "Authorization: Bearer cc_live_sk_a1b2c3..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "DATABASE_URL",
    "value": "postgresql://user:pass@db.example.com:5432/mydb",
    "target": ["production", "preview"]
  }'`} />
  </div>
);

const CLISection = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">CLI Reference</h1>
    <p className="text-[#888] text-lg mb-10 leading-relaxed">The CollabCode CLI provides a complete interface for managing your projects from the terminal.</p>

    <h2 className="text-xl font-bold text-white mb-4" id="cli-install">Installation</h2>
    <CodeBlock title="Terminal" code={`$ npm install -g @collabcode/cli
$ collabcode --version
CollabCode CLI v3.2.1`} />

    <h2 className="text-xl font-bold text-white mt-10 mb-4" id="cli-commands">Commands</h2>
    <div className="space-y-4">
      {[
        { cmd: 'collabcode login', desc: 'Authenticate with your CollabCode account via browser OAuth.' },
        { cmd: 'collabcode init [name]', desc: 'Initialize a new project in the current directory.' },
        { cmd: 'collabcode deploy', desc: 'Deploy the current project. Add --prod to deploy to production.' },
        { cmd: 'collabcode dev', desc: 'Start the local development server with hot reload.' },
        { cmd: 'collabcode env pull', desc: 'Pull environment variables from the dashboard to a local .env file.' },
        { cmd: 'collabcode env push', desc: 'Push local .env values to the dashboard.' },
        { cmd: 'collabcode domains add [domain]', desc: 'Attach a custom domain to the current project.' },
        { cmd: 'collabcode logs', desc: 'Stream real-time function logs from your latest deployment.' },
        { cmd: 'collabcode whoami', desc: 'Display the currently authenticated user and workspace.' },
      ].map((c, i) => (
        <div key={i} className="flex items-start gap-4 border-b border-white/5 pb-4 last:border-0">
          <code className="text-sm text-white font-mono bg-white/5 px-3 py-1 rounded shrink-0">{c.cmd}</code>
          <span className="text-sm text-[#888]">{c.desc}</span>
        </div>
      ))}
    </div>
  </div>
);


/* ─────────────────── Navigation Config ─────────────────── */
const sections = [
  { id: 'getting-started', label: 'Getting Started', icon: Rocket, Component: GettingStarted },
  { id: 'authentication', label: 'Authentication', icon: Key, Component: AuthenticationSection },
  { id: 'projects', label: 'Projects', icon: Box, Component: ProjectsSection },
  { id: 'deployments', label: 'Deployments', icon: Globe, Component: DeploymentsSection },
  { id: 'storage', label: 'Storage', icon: HardDrive, Component: StorageSection },
  { id: 'database', label: 'Database', icon: Database, Component: DatabaseSection },
  { id: 'domains', label: 'Domains', icon: Globe, Component: DomainsSection },
  { id: 'env-vars', label: 'Environment Variables', icon: Shield, Component: EnvVarsSection },
  { id: 'cli', label: 'CLI Reference', icon: Terminal, Component: CLISection },
];


/* ─────────────────── Main Page ─────────────────── */
export function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSection = sections.find(s => s.id === activeSection);
  const ActiveComponent = currentSection?.Component || GettingStarted;

  const filteredSections = sections.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full bg-black text-white selection:bg-white/20 selection:text-white font-sans min-h-screen pt-16">

      <div className="flex max-w-[1400px] mx-auto">
        
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[260px] shrink-0 border-r border-white/10 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Book className="w-5 h-5" />
              API Docs
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-[#666] pl-9 pr-3 py-2 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>
          <nav className="p-3 flex flex-col gap-1">
            {filteredSections.map(s => (
              <NavItem
                key={s.id}
                label={s.label}
                icon={s.icon}
                active={activeSection === s.id}
                onClick={() => setActiveSection(s.id)}
              />
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 z-50 px-2 py-2 overflow-x-auto">
          <div className="flex gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeSection === s.id ? 'bg-white/10 text-white' : 'text-[#888] hover:text-white'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-12 pb-32 lg:pb-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#666] mb-8">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{currentSection?.label}</span>
          </div>

          {/* Section content */}
          <ActiveComponent />

          {/* Next / Prev navigation */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            {(() => {
              const idx = sections.findIndex(s => s.id === activeSection);
              const prev = idx > 0 ? sections[idx - 1] : null;
              const next = idx < sections.length - 1 ? sections[idx + 1] : null;
              return (
                <>
                  {prev ? (
                    <button onClick={() => setActiveSection(prev.id)} className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group">
                      <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      {prev.label}
                    </button>
                  ) : <div />}
                  {next ? (
                    <button onClick={() => setActiveSection(next.id)} className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group">
                      {next.label}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : <div />}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </main>
  );
}
