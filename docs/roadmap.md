
---

## `docs/roadmap.md`

```md
# Roadmap

## Phase 1 - Foundation
- [x] initialize Next.js project
- [x] enable TypeScript
- [x] configure Tailwind CSS
- [x] configure ESLint
- [x] create base folder structure
- [x] create base documentation
- [x] prepare AGENTS.md and CLAUDE.md
- [x] prepare project skill documentation
- [x] publish repository to GitHub
- [x] install and initialize shadcn/ui
- [x] add initial UI components from shadcn/ui

## Phase 2 - Public UI Base
- [x] define layout structure
- [x] create header
- [x] create footer
- [x] create reusable container
- [x] create initial homepage
- [x] define initial visual direction
- [x] create responsive homepage

## Phase 3 - Public Navigation
- [x] create `/biblioteca`
- [x] create `/videos`
- [x] create `/cultura`
- [x] create `/sponsors`
- [x] connect main navigation with real routes

## Phase 4 - Content Structure
- [x] define content categories
- [x] create content types
- [x] create reusable content card
- [x] create dynamic content route `/contenido/[id]`
- [x] add related content section
- [x] add custom not-found page
- [x] add dynamic metadata for content detail
- [x] differentiate content detail by category

## Phase 5 - Sponsors / Advertising
- [x] define sponsor types
- [x] create reusable sponsor card
- [x] create sponsors page
- [x] add featured sponsors to UI
- [x] validate sponsor section as part of business model

## Phase 6 - Documentation Alignment
- [x] align architecture doc with implemented modules
- [x] align roadmap with actual progress
- [x] add initial data model documentation
- [x] add initial SQL schema for MVP

## Phase 7 - Supabase Preparation
- [x] create Supabase project
- [x] configure environment variables
- [x] create env helper
- [x] create browser Supabase client
- [x] create server Supabase client
- [x] create initial content read policy
- [x] create initial sponsors read policy
- [x] insert first real content records
- [x] insert first real sponsor records
- [x] validate database reads with `/test-supabase`

## Phase 8 - Public Content Migration to Supabase
- [x] create server content service layer
- [x] migrate biblioteca to Supabase
- [x] migrate homepage featured content to Supabase
- [x] migrate videos to Supabase
- [x] migrate cultura to Supabase
- [x] remove mock fallback from content detail
- [x] remove mock fallback from homepage content
- [x] remove mock fallback from videos page
- [x] keep content detail fully database-backed

## Phase 9 - Public Sponsors Migration to Supabase
- [x] create sponsor service layer
- [x] migrate `/sponsors` to Supabase
- [x] migrate featured sponsors on homepage to Supabase
- [x] stop depending on mock sponsors in public UI

## Phase 10 - Admin Access Foundation
- [x] define initial admin access strategy
- [x] add admin email allowlist
- [x] create admin login page
- [x] create protected `/admin` route
- [x] add Supabase login with email/password
- [x] add admin sign-out flow
- [x] protect `/admin` routes through Proxy
- [x] validate admin access server-side in dashboard page
- [x] create initial admin dashboard

## Phase 11 - Admin Content Management
- [x] create admin content list page
- [x] create content creation form
- [ ] create content edit flow
- [ ] create publish/unpublish flow
- [x] persist content creation in Supabase
- [x] create protected `/admin/content/new`
- [x] connect admin dashboard to content module

## Phase 12 - Admin Sponsors Management
- [ ] create admin sponsors list page
- [ ] create sponsor creation form
- [ ] create sponsor edit flow
- [ ] create sponsor activate/deactivate flow
- [ ] persist sponsor management in Supabase
- [x] create placeholder `/admin/sponsors`

## Phase 13 - Media and Experience
- [ ] define real library/document reading experience
- [ ] define culture/editorial reading experience
- [ ] prepare full media integration with Mux upload/management
- [x] support video playback from `contentUrl`
- [x] support YouTube embedded playback
- [x] prepare Mux playback through `mux_playback_id`
- [x] define content detail actions with real initial behavior

## Phase 14 - Production Readiness
- [ ] SEO basics
- [ ] performance review
- [ ] deployment configuration
- [ ] production environment variables
- [ ] analytics strategy
- [ ] final QA pass