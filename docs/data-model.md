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

---

## Current Implementation Status

### Content
The `content` entity is already in active use through Supabase for:
- homepage featured content
- biblioteca page
- test page for database validation

The detail page currently uses a hybrid strategy:
- database content first
- mock fallback when the record is not yet migrated

### Sponsors
The `sponsors` entity is already designed in SQL, but the frontend still consumes mock sponsor data.
This part has not yet been migrated to live database reads.

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

### Current usage in frontend
- featured homepage content
- biblioteca content listing
- dynamic content detail
- related content section

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

At this stage, sponsors are still using mock data in the application layer.

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

---

## Why This Model
This structure supports the current frontend already built:
- homepage featured content
- filtered content pages
- dynamic content detail page
- sponsors page
- featured sponsors section

It also keeps the migration path simple:
- replace mock arrays with database queries
- keep the UI structure
- introduce admin flows later

---

## Current Migration Strategy
The project is intentionally using a phased migration approach:

1. define schema first
2. validate Supabase connection
3. migrate content reads gradually
4. keep fallback mock data temporarily
5. migrate sponsors later

This reduces risk and keeps the public UI stable while backend integration advances.

---

## Future Extensions
Possible future entities:
- users
- admin_profiles
- content_assets
- sponsor_slots
- ad_impressions
- ad_clicks
- categories table
- tags table
- content_tags join table

These are intentionally not part of the current MVP schema.