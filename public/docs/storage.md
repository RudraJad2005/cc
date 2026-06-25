# Storage API

Upload, download, and manage files in project buckets via the Supabase Storage integration.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/storage/v1/bucket` | List all storage buckets for the connected Supabase instance. |
| `POST` | `/storage/v1/bucket` | Create a new storage bucket. Specify public or private access. |
| `POST` | `/storage/v1/object/:bucketId` | Upload a file to a bucket. Supports multipart uploads up to 5GB. |
| `GET` | `/storage/v1/object/:bucketId/:path` | Download a file by its bucket path. |
| `DELETE` | `/storage/v1/object/:bucketId` | Delete one or more files from a bucket. |


## Upload a File

```typescript
import { createClient } from '@supabase/supabase-js'

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
  })
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | **Yes** | File path inside the bucket (e.g. "avatars/user-123.png") |
| `file` | `File \| Blob` | **Yes** | The file contents to upload |
| `cacheControl` | `string` | No | Cache-Control header value (e.g. "3600" for 1 hour) |
| `upsert` | `boolean` | No | If true, overwrite existing files at the same path |
