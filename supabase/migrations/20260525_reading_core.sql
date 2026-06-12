-- Reading Core Migration
-- Purpose:
-- - Store Markdown documents in Supabase Postgres
-- - Render published documents at /reading/[slug]
-- - Support topics, search, chunks, and import logs
-- - Keep draft/archived documents private by default

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- documents
-- ---------------------------------------------------------------------------

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),

  slug text not null,
  title text not null,
  description text,

  body_markdown text not null,
  body_text text not null,

  source text not null default 'markdown',
  source_path text,
  canonical_url text,

  internal_path text generated always as ('/reading/' || slug) stored,

  author text,
  language text not null default 'en',
  status text not null default 'draft',

  published_at timestamptz,

  word_count integer,
  reading_time_minutes integer,

  content_hash text,
  metadata jsonb not null default '{}'::jsonb,

  search_vector tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(title, '') || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(body_text, '') || ' ' ||
      coalesce(author, '') || ' ' ||
      coalesce(source, '')
    )
  ) stored,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint documents_slug_unique unique (slug),

  constraint documents_status_check check (
    status in ('draft', 'published', 'archived')
  ),

  constraint documents_source_check check (
    source in ('markdown', 'medium', 'pdf', 'manual', 'imported_html')
  ),

  constraint documents_slug_format_check check (
    slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  ),

  constraint documents_language_check check (
    language ~ '^[a-z]{2}(-[A-Z]{2})?$'
  ),

  constraint documents_word_count_check check (
    word_count is null or word_count >= 0
  ),

  constraint documents_reading_time_check check (
    reading_time_minutes is null or reading_time_minutes >= 0
  )
);

drop trigger if exists set_documents_updated_at on public.documents;

create trigger set_documents_updated_at
before update on public.documents
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- document_topics
-- ---------------------------------------------------------------------------

create table if not exists public.document_topics (
  id uuid primary key default gen_random_uuid(),

  document_id uuid not null references public.documents(id) on delete cascade,

  topic text not null,
  label text,

  created_at timestamptz not null default now(),

  constraint document_topics_unique unique (document_id, topic),

  constraint document_topics_topic_format_check check (
    topic ~ '^[a-z0-9]+(_[a-z0-9]+)*$'
  )
);

-- ---------------------------------------------------------------------------
-- document_chunks
-- ---------------------------------------------------------------------------

create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),

  document_id uuid not null references public.documents(id) on delete cascade,

  chunk_index integer not null,
  heading text,
  heading_path text,
  content text not null,

  token_estimate integer,
  char_count integer generated always as (char_length(content)) stored,

  metadata jsonb not null default '{}'::jsonb,

  search_vector tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(heading, '') || ' ' ||
      coalesce(heading_path, '') || ' ' ||
      coalesce(content, '')
    )
  ) stored,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint document_chunks_unique unique (document_id, chunk_index),

  constraint document_chunks_chunk_index_check check (
    chunk_index >= 0
  ),

  constraint document_chunks_token_estimate_check check (
    token_estimate is null or token_estimate >= 0
  )
);

drop trigger if exists set_document_chunks_updated_at on public.document_chunks;

create trigger set_document_chunks_updated_at
before update on public.document_chunks
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- import_runs
-- ---------------------------------------------------------------------------

create table if not exists public.import_runs (
  id uuid primary key default gen_random_uuid(),

  importer text not null,
  source text not null,

  status text not null default 'running',

  started_at timestamptz not null default now(),
  finished_at timestamptz,

  read_count integer not null default 0,
  created_count integer not null default 0,
  updated_count integer not null default 0,
  skipped_count integer not null default 0,
  error_count integer not null default 0,

  metadata jsonb not null default '{}'::jsonb,

  constraint import_runs_status_check check (
    status in ('running', 'success', 'partial_success', 'failed')
  ),

  constraint import_runs_counts_check check (
    read_count >= 0 and
    created_count >= 0 and
    updated_count >= 0 and
    skipped_count >= 0 and
    error_count >= 0
  )
);

-- ---------------------------------------------------------------------------
-- import_items
-- ---------------------------------------------------------------------------

create table if not exists public.import_items (
  id uuid primary key default gen_random_uuid(),

  import_run_id uuid not null references public.import_runs(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,

  external_id text,
  source_url text,
  source_path text,

  action text not null,
  status text not null,

  title text,
  slug text,

  error_message text,
  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),

  constraint import_items_action_check check (
    action in ('created', 'updated', 'skipped', 'failed')
  ),

  constraint import_items_status_check check (
    status in ('success', 'warning', 'error')
  )
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists documents_status_idx
on public.documents(status);

create index if not exists documents_source_idx
on public.documents(source);

create index if not exists documents_language_idx
on public.documents(language);

create index if not exists documents_published_at_idx
on public.documents(published_at desc nulls last);

create index if not exists documents_updated_at_idx
on public.documents(updated_at desc);

create index if not exists documents_source_path_idx
on public.documents(source_path);

create index if not exists documents_content_hash_idx
on public.documents(content_hash);

create unique index if not exists documents_canonical_url_unique_idx
on public.documents(lower(canonical_url))
where canonical_url is not null;

create index if not exists documents_search_idx
on public.documents using gin(search_vector);

create index if not exists document_topics_document_id_idx
on public.document_topics(document_id);

create index if not exists document_topics_topic_idx
on public.document_topics(topic);

create index if not exists document_chunks_document_id_idx
on public.document_chunks(document_id);

create index if not exists document_chunks_search_idx
on public.document_chunks using gin(search_vector);

create index if not exists import_runs_source_idx
on public.import_runs(source);

create index if not exists import_runs_status_idx
on public.import_runs(status);

create index if not exists import_items_import_run_id_idx
on public.import_items(import_run_id);

create index if not exists import_items_document_id_idx
on public.import_items(document_id);

create index if not exists import_items_source_path_idx
on public.import_items(source_path);

create index if not exists import_items_source_url_idx
on public.import_items(source_url);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.documents enable row level security;
alter table public.document_topics enable row level security;
alter table public.document_chunks enable row level security;
alter table public.import_runs enable row level security;
alter table public.import_items enable row level security;

drop policy if exists "Public can read published documents"
on public.documents;

create policy "Public can read published documents"
on public.documents
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read topics for published documents"
on public.document_topics;

create policy "Public can read topics for published documents"
on public.document_topics
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.documents
    where documents.id = document_topics.document_id
    and documents.status = 'published'
  )
);

drop policy if exists "Public can read chunks for published documents"
on public.document_chunks;

create policy "Public can read chunks for published documents"
on public.document_chunks
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.documents
    where documents.id = document_chunks.document_id
    and documents.status = 'published'
  )
);

-- No public access to import logs.
-- Service role bypasses RLS and should be used by trusted import scripts only.

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;

grant select on public.documents to anon, authenticated;
grant select on public.document_topics to anon, authenticated;
grant select on public.document_chunks to anon, authenticated;

-- Import scripts should use SUPABASE_SERVICE_ROLE_KEY.
-- Do not grant anon/authenticated write permissions for reading tables.