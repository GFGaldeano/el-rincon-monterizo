# Data Model

## Purpose
This document defines the initial data model for **El Rincón Monterizo**.

The current MVP needs to support:
- on-demand content
- different content categories
- sponsor/advertiser records
- featured content
- featured sponsors
- future publication workflows
- protected administrative access
- multi-provider video playback

---

## Current Implementation Status

### Content
The `content` entity is already in active use through Supabase for:
- homepage featured content
- biblioteca page
- videos page
- cultura page
- dynamic content detail page
- related content section
- admin content listing
- admin content creation

### Sponsors
The `sponsors` entity is already in active use through Supabase for:
- sponsors page
- featured sponsors section on homepage

### Admin Access
Admin access is currently handled through:
- Supabase Auth users
- protected routes
- allowlist of admin emails in environment variables
- server-side verification before protected admin operations

### Admin Writes
Administrative writes are currently enabled for content through:
- server actions
- server-only Supabase admin client
- protected admin routes
- server-side admin validation before insert operations

At this stage, the public UI is already using real database reads for both content and sponsors, and content creation from the admin panel is already persisted in Supabase.

---

## Core Principles
- keep the schema simple
- avoid premature complexity
- support current UI needs
- prepare for Supabase/PostgreSQL integration
- allow future admin workflows

---

## Main Entities

### 1. content
Represents any public content item shown on the platform.

Current use cases:
- books
- documents
- videos
- cultural/editorial content

Important fields:
- title
- slug
- description
- category
- author_name
- organization_name
- cover_image_url
- content_url
- format
- duration_seconds
- page_count
- is_featured
- is_published
- published_at
- display_order
- video_provider
- mux_playback_id

### Current usage in frontend
- featured homepage content
- biblioteca content listing
- videos content listing
- cultura content listing
- dynamic content detail
- related content section
- video playback routing by provider

### Current usage in admin
- content list in `/admin/content`
- content creation in `/admin/content/new`

### Notes about video fields
The content model now supports a flexible video strategy:

- `content_url`
  - used for YouTube URLs
  - used for external playback URLs
  - may be empty when using Mux playback ID only

- `video_provider`
  - expected values:
    - `youtube`
    - `mux`
    - `external`
  - can be inferred in some cases from `content_url`

- `mux_playback_id`
  - used for Mux-hosted videos
  - allows rendering Mux playback without relying on a generic URL

This allows the platform to support different playback sources without fragmenting the content model.

---

### 2. sponsors
Represents local sponsors and advertisers.

Current use cases:
- featured sponsors
- sponsor directory
- local business visibility
- future sponsor placement management

Important fields:
- name
- slug
- description
- business_category
- city
- website_url
- logo_url
- level
- is_featured
- is_active
- display_order
- start_date
- end_date

### Current usage in frontend
- sponsors page
- featured sponsors section on homepage

### Current admin status
- public sponsor reads are already live
- admin sponsor CRUD is still pending

---

## Current Auth Strategy

### Admin authentication
The project currently uses:
- Supabase Auth for login
- protected admin routes
- server-side admin verification
- email allowlist through environment variables

This means admin capability is already separated from public browsing.

### Admin mutation strategy
Protected write operations currently use:
- server-side actions
- server-only Supabase admin client
- elevated key stored in server environment variables only

This allows safe admin writes without exposing privileged keys to the browser.

---

## Initial Category Rules

### Content categories
The current platform supports:
- biblioteca
- video
- cultura
- documento

This can later evolve into:
- category tables
- tagging systems
- many-to-many content classification

For the MVP, a simple enum is enough.

### Sponsor levels
The current sponsor levels are:
- oro
- plata
- bronce
- destacado

For the MVP, a simple enum is enough.

### Video providers
The current video strategy supports:
- youtube
- mux
- external

This is currently modeled in a simple way and can later evolve if richer media workflows are needed.

---

## Why This Model
This structure supports the current frontend already built:
- homepage featured content
- filtered content pages
- dynamic content detail page
- sponsors page
- featured sponsors section
- provider-aware video behavior

It also keeps the migration path simple:
- keep the UI structure
- move progressively into real admin workflows
- extend entities later without rethinking the public model

---

## Current Migration Status
The project has already completed the public migration for:
- content
- sponsors

The project has also completed the initial admin write flow for:
- content creation

The current pending backend work is focused on:
- content editing
- publish/unpublish workflows
- sponsor management workflows
- richer media handling
- possible future asset workflows for uploads

---

## Future Extensions
Possible future entities:
- admin_profiles
- content_assets
- sponsor_slots
- ad_impressions
- ad_clicks
- categories table
- tags table
- content_tags join table

Possible future content enhancements:
- separate media asset table
- richer editorial fields for cultura content
- explicit publication history
- video upload workflows for Mux-managed assets

These are intentionally not part of the current MVP schema.