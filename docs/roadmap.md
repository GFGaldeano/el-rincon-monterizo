
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
- [x] create mock content dataset
- [x] create reusable content card
- [x] render featured content on homepage
- [x] render filtered content in Biblioteca
- [x] render filtered content in Videos
- [x] create dynamic content route `/contenido/[id]`
- [x] add related content section
- [x] add custom not-found page
- [x] add dynamic metadata for content detail
- [x] differentiate content detail by category

## Phase 5 - Sponsors / Advertising
- [x] define sponsor types
- [x] create mock sponsors dataset
- [x] create reusable sponsor card
- [x] create real sponsors page
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
- [x] insert first real content records
- [x] validate database reads with `/test-supabase`

## Phase 8 - Partial Content Migration to Supabase
- [x] create server content service layer
- [x] migrate biblioteca to Supabase
- [x] migrate homepage featured content to Supabase
- [x] support hybrid content detail resolution (DB first, mock fallback)

## Phase 9 - Pending Content Migration
- [ ] migrate `/videos` to Supabase
- [ ] migrate content detail fully to database-backed records
- [ ] stop depending on mock content data in public pages
- [ ] add more real content records in Supabase
- [ ] define slug-based detail strategy if needed

## Phase 10 - Sponsors Data Migration
- [ ] define sponsor table policies
- [ ] insert real sponsors in Supabase
- [ ] create sponsor service layer
- [ ] migrate `/sponsors` from mock data to Supabase
- [ ] migrate featured sponsors on homepage to Supabase

## Phase 11 - Admin and Content Management
- [ ] define admin access strategy
- [ ] design content creation/editing flow
- [ ] design sponsor management flow
- [ ] define publication workflow

## Phase 12 - Media and Experience
- [ ] define real video detail experience
- [ ] define real library/document reading experience
- [ ] define culture/editorial reading experience
- [ ] prepare media integration with Mux
- [ ] define content detail actions with real behavior

## Phase 13 - Production Readiness
- [ ] SEO basics
- [ ] performance review
- [ ] deployment configuration
- [ ] production environment variables
- [ ] analytics strategy
- [ ] final QA pass