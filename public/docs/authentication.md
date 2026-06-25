# Authentication

Secure your API requests with project-scoped tokens and manage user authentication flows.

## API Keys

All API requests require a Bearer token. You can generate project-scoped API keys from the **Dashboard → Settings → API Keys** panel.

```bash
# Example: List all projects
curl -X GET https://api.collabcode.dev/v1/projects \
  -H "Authorization: Bearer cc_live_sk_a1b2c3d4e5f6" \
  -H "Content-Type: application/json"
```

## User Auth (via Supabase)

CollabCode integrates directly with Supabase Auth for user management. Connect your Supabase instance from the Backend dashboard to get started.

```typescript
import { createClient } from '@supabase/supabase-js'

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
const { data: { user } } = await supabase.auth.getUser()
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | **Yes** | User email address |
| `password` | `string` | **Yes** | Minimum 6 characters |
| `options.data` | `object` | No | Custom user metadata (name, avatar, etc.) |
| `options.captchaToken` | `string` | No | hCaptcha or Turnstile verification token |
