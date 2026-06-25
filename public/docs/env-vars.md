# Environment Variables

Securely store secrets and configuration values scoped to specific environments.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/projects/:projectId/env` | List all environment variables (values are encrypted and returned as *****). |
| `POST` | `/v1/projects/:projectId/env` | Create or update an environment variable. |
| `DELETE` | `/v1/projects/:projectId/env/:key` | Delete an environment variable by key. |

## Set Environment Variable

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | **Yes** | Variable name (e.g. DATABASE_URL) |
| `value` | `string` | **Yes** | Variable value — encrypted at rest |
| `target` | `string[]` | No | Environments to apply to: `["production", "preview", "development"]` |


```bash
curl -X POST https://api.collabcode.dev/v1/projects/prj_abc123/env \
  -H "Authorization: Bearer cc_live_sk_a1b2c3..." \
  -H "Content-Type: application/json" \
  -d '{
    "key": "DATABASE_URL",
    "value": "postgresql://user:pass@db.example.com:5432/mydb",
    "target": ["production", "preview"]
  }'
```
