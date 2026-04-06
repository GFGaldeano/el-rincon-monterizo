
---

## `docs/architecture.md`

```md
# Architecture

## Project Name
El Rincón Monterizo

## Overview
El Rincón Monterizo is a web platform for on-demand educational, cultural, and audiovisual content.

The initial version of the product is intended to be:
- free for end users
- financed through local advertising and sponsor placements
- focused on clarity, usability, and community value
- built with a modular architecture prepared for future growth

## Main Goals
- provide access to educational and cultural content
- organize digital resources clearly
- support on-demand videos and digital documents
- create a clean space for local sponsors and advertisers
- maintain a scalable codebase without unnecessary complexity

## Current Product Scope
The project currently includes:
- public homepage
- base application layout
- navigation structure
- public browsing sections
- dynamic content detail pages
- differentiated detail experience by content type
- custom not-found page
- Supabase integration for content reads
- Supabase integration for sponsors reads
- admin authentication flow
- protected admin routes
- initial admin dashboard
- admin content listing
- admin content creation flow with real persistence
- video playback by provider strategy

## Out of Scope for Current MVP
The following are not part of the current MVP unless explicitly approved:
- live streaming
- subscription-first monetization
- chat systems
- social network features
- AI recommendation engines
- marketplace logic
- complex admin workflows beyond the current scope

## High-Level Technical Structure

### Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend / Data Layer
- Supabase
- PostgreSQL

### Authentication
- Supabase Auth
- protected admin routes using Proxy
- admin allowlist based on email

### Video Strategy
- YouTube embedded playback
- Mux-ready playback through `mux_playback_id`
- external playback through `contentUrl`

### Planned Deployment
- Vercel

## Current Folder Structure

```text
src/
  app/
    admin/
      content/
        new/
      login/
      sponsors/
    biblioteca/
    contenido/
      [id]/
    cultura/
    sponsors/
    test-supabase/
    videos/
    layout.tsx
    not-found.tsx
    page.tsx
  components/
    layout/
    ui/
  constants/
  features/
    admin/
      actions/
      components/
        content/
    content/
      components/
        detail/
      types/
    sponsors/
      components/
      types/
  hooks/
  lib/
    supabase/
      admin.ts
      client.ts
      proxy.ts
      server.ts
    admin.ts
    env.ts
  services/
    content.server.ts
    sponsors.server.ts
  types/
  proxy.ts
docs/
  architecture.md
  coding-standards.md
  data-model.md
  product-rules.md
  roadmap.md
  skills/
    project-development.md
database/
  schema.sql