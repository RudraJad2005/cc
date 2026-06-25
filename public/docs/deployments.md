# Deployments API

Create, list, and manage deployments for your CollabCode projects.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/projects/:projectId/deployments` | List all deployments for a project. Returns paginated results sorted by creation date. |
| `POST` | `/v1/projects/:projectId/deployments` | Trigger a new deployment. Optionally specify a git ref or branch to deploy from. |
| `GET` | `/v1/deployments/:deploymentId` | Retrieve details of a specific deployment including status, URL, and build logs. |
| `PATCH` | `/v1/deployments/:deploymentId` | Update deployment metadata. Use this to promote a preview deployment to production. |
| `DELETE` | `/v1/deployments/:deploymentId` | Cancel an in-progress deployment or delete a completed one. |


## Create a Deployment

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | `string` | No | Git ref, branch, or commit SHA to deploy. Defaults to main. |
| `environment` | `string` | No | "production" or "preview". Defaults to "preview". |
| `force` | `boolean` | No | Skip cache and rebuild from scratch. |

```bash
curl -X POST https://api.collabcode.dev/v1/projects/prj_abc123/deployments \
  -H "Authorization: Bearer cc_live_sk_a1b2c3..." \
  -H "Content-Type: application/json" \
  -d '{
    "ref": "main",
    "environment": "production"
  }'
```

## Response

**201 Created**

```json
{
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
}
```
