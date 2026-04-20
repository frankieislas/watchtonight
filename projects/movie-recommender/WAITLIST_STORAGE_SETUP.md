# Waitlist Storage Setup

## Current state
The waitlist endpoint now supports durable storage via Supabase.

If Supabase is not configured yet, the endpoint still accepts signups and returns a warning so the product flow does not break.

## Required environment variables
Add these in Vercel:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Suggested Supabase table
Create a table named `waitlist_signups` with columns:
- `id` - uuid, primary key, default generated
- `email` - text, required
- `name` - text
- `interest` - text
- `premium_interest` - text
- `created_at` - timestamptz, required

## Recommended SQL
```sql
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  interest text,
  premium_interest text,
  created_at timestamptz not null default now()
);
```

## Notes
- For the fastest setup, keep writes open only as needed for this beta project and tighten policies later.
- If you want stronger security next, switch the API route to use a Supabase service-role key server-side instead of anon credentials.
- For now, this is optimized for speed to live signal, not final production hardening.
