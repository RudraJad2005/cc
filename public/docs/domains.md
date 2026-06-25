# Domains API

Attach custom domains and manage SSL certificates for your projects.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/projects/:projectId/domains` | List all domains attached to a project. |
| `POST` | `/v1/projects/:projectId/domains` | Add a custom domain. SSL certificates are auto-provisioned via Let's Encrypt. |
| `DELETE` | `/v1/domains/:domainId` | Remove a custom domain from the project. |

## DNS Configuration

After adding a domain, configure the following DNS records with your registrar:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.collabcode.dev` |
