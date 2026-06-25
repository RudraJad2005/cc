# Database API

Query, insert, and manage data in your Postgres database via the Supabase client SDK.

## Connecting

Connect your Supabase Postgres instance from **Dashboard → Backend**. Once connected, use the client SDK for all database operations.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)
```

## Query Data

```typescript
// Select all columns
const { data, error } = await supabase
  .from('posts')
  .select('*')

// Select specific columns with filters
const { data: filtered } = await supabase
  .from('posts')
  .select('id, title, author:users(name)')
  .eq('status', 'published')
  .order('created_at', { ascending: false })
  .limit(10)
```

## Insert Data

```typescript
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'Hello World',
    body: 'This is my first post.',
    author_id: 'usr_abc123',
    status: 'draft'
  })
  .select()  // Return the inserted row
```

## Update & Delete

```typescript
// Update
const { data, error } = await supabase
  .from('posts')
  .update({ status: 'published' })
  .eq('id', 'post_123')
  .select()

// Delete
const { error: deleteError } = await supabase
  .from('posts')
  .delete()
  .eq('id', 'post_123')
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `.from(table)` | `string` | **Yes** | The table name to query |
| `.select(columns)` | `string` | No | Comma-separated column names. Use * for all. |
| `.eq(column, value)` | `Filter` | No | Exact match filter |
| `.order(column, opts)` | `Sort` | No | Sort results by column |
| `.limit(count)` | `number` | No | Limit number of results returned |
