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
- mock content catalog
- mock sponsors module
- dynamic content detail pages
- differentiated detail experience by content type
- custom not-found page

## Out of Scope for Current MVP
The following are not part of the current MVP unless explicitly approved:
- live streaming
- subscription-first monetization
- chat systems
- social network features
- AI recommendation engines
- marketplace logic
- complex admin workflows in this current phase

## High-Level Technical Structure

### Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Planned Backend / Data Layer
- Supabase
- PostgreSQL

### Planned Video Layer
- Mux

### Planned Deployment
- Vercel

## Current Folder Structure

```text
src/
  app/
    biblioteca/
    contenido/
      [id]/
    cultura/
    sponsors/
    videos/
    layout.tsx
    not-found.tsx
    page.tsx
  components/
    layout/
    ui/
  constants/
  features/
    content/
      components/
        detail/
      data/
      types/
    sponsors/
      components/
      data/
      types/
  hooks/
  lib/
  services/
  types/
docs/
  architecture.md
  coding-standards.md
  product-rules.md
  roadmap.md
  skills/
    project-development.md