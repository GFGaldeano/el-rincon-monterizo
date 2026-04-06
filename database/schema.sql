
## `database/schema.sql`

```sql
-- =========================================================
-- El Rincón Monterizo - Initial MVP Schema
-- PostgreSQL / Supabase-ready
-- =========================================================

-- ---------------------------------------------------------
-- Enums
-- ---------------------------------------------------------

create type content_category as enum (
  'biblioteca',
  'video',
  'cultura',
  'documento'
);

create type sponsor_level as enum (
  'oro',
  'plata',
  'bronce',
  'destacado'
);

create type video_provider_type as enum (
  'youtube',
  'mux',
  'external'
);

-- ---------------------------------------------------------
-- Updated at helper
-- ---------------------------------------------------------

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------
-- Content
-- ---------------------------------------------------------

create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  category content_category not null,
  author_name text not null,
  organization_name text,
  cover_image_url text,
  content_url text,
  format text,
  duration_seconds integer,
  page_count integer,
  video_provider video_provider_type,
  mux_playback_id text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  published_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint content_title_not_blank check (char_length(trim(title)) > 0),
  constraint content_slug_not_blank check (char_length(trim(slug)) > 0),
  constraint content_author_name_not_blank check (char_length(trim(author_name)) > 0),
  constraint content_duration_seconds_non_negative check (
    duration_seconds is null or duration_seconds >= 0
  ),
  constraint content_page_count_non_negative check (
    page_count is null or page_count >= 0
  ),
  constraint content_display_order_non_negative check (
    display_order >= 0
  ),
  constraint content_mux_playback_id_not_blank check (
    mux_playback_id is null or char_length(trim(mux_playback_id)) > 0
  ),
  constraint content_video_provider_mux_requires_playback_id check (
    video_provider is distinct from 'mux' or mux_playback_id is not null
  ),
  constraint content_video_provider_non_mux_requires_url check (
    video_provider not in ('youtube', 'external') or content_url is not null
  )
);

create index if not exists idx_content_category on public.content(category);
create index if not exists idx_content_video_provider on public.content(video_provider);
create index if not exists idx_content_is_featured on public.content(is_featured);
create index if not exists idx_content_is_published on public.content(is_published);
create index if not exists idx_content_display_order on public.content(display_order);

create trigger trg_content_updated_at
before update on public.content
for each row
execute function set_updated_at();

-- ---------------------------------------------------------
-- Sponsors
-- ---------------------------------------------------------

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  business_category text not null,
  city text not null,
  website_url text,
  logo_url text,
  level sponsor_level not null,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  display_order integer not null default 0,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sponsors_name_not_blank check (char_length(trim(name)) > 0),
  constraint sponsors_slug_not_blank check (char_length(trim(slug)) > 0),
  constraint sponsors_city_not_blank check (char_length(trim(city)) > 0),
  constraint sponsors_business_category_not_blank check (char_length(trim(business_category)) > 0),
  constraint sponsors_display_order_non_negative check (
    display_order >= 0
  )
);

create index if not exists idx_sponsors_level on public.sponsors(level);
create index if not exists idx_sponsors_is_featured on public.sponsors(is_featured);
create index if not exists idx_sponsors_is_active on public.sponsors(is_active);
create index if not exists idx_sponsors_display_order on public.sponsors(display_order);

create trigger trg_sponsors_updated_at
before update on public.sponsors
for each row
execute function set_updated_at();

-- ---------------------------------------------------------
-- Notes
-- ---------------------------------------------------------
-- This schema is intentionally simple for the MVP.
-- Future admin/auth/publication workflows can extend it.
-- If your current project already exists and you previously created the
-- tables without `video_provider` or `mux_playback_id`, apply a migration
-- instead of recreating the schema from scratch.