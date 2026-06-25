# Projects API

Create, configure, and manage projects on the CollabCode platform.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/projects` | List all projects in your workspace. |
| `POST` | `/v1/projects` | Create a new project. Connect a Git repository or import from a template. |
| `GET` | `/v1/projects/:projectId` | Get project details including framework, last deployment, and environment variables. |
| `PATCH` | `/v1/projects/:projectId` | Update project settings (name, build command, output directory, etc.). |
| `DELETE` | `/v1/projects/:projectId` | Permanently delete a project and all its deployments. |

## Create a Project

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | **Yes** | Project name (must be URL-safe) |
| `framework` | `string` | No | Auto-detected if not provided. One of: nextjs, react, vue, svelte, astro |
| `gitRepository` | `object` | No | `{ url: string, branch: string }` — Connect to a GitHub/GitLab repo |
| `buildCommand` | `string` | No | Custom build command (default: framework-specific) |
| `outputDirectory` | `string` | No | Build output directory (default: framework-specific) |

```bash
curl -X POST https://api.collabcode.dev/v1/projects \
  -H "Authorization: Bearer cc_live_sk_a1b2c3..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-saas-app",
    "framework": "nextjs",
    "gitRepository": {
      "url": "https://github.com/user/my-saas-app",
      "branch": "main"
    }
  }'
```
