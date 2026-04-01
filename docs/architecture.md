# Architecture

## Project Name
El Rincón Monterizo

## Overview
El Rincón Monterizo is a web platform for on-demand educational, cultural, and audiovisual content.

The initial version of the product is intended to be:
- free for end users
- financed through local advertising and sponsor placements
- focused on simplicity, clarity, and community value

## Main Goals
- provide access to educational and cultural content
- organize digital resources clearly
- support on-demand video and digital documents
- create a clean space for local sponsors and advertisers
- keep the architecture scalable without unnecessary complexity

## Product Scope (Current)
The project currently focuses on:
- public content browsing
- digital books and documents
- on-demand videos
- content categories
- sponsor and advertiser placements
- future admin management

## Out of Scope for Current MVP
The following are not part of the current MVP unless explicitly approved:
- live streaming
- subscription-first monetization
- social network features
- chat systems
- AI recommendation engines
- complex marketplace logic

## High-Level Technical Structure

### Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

### Planned Backend / Data Layer
- Supabase
- PostgreSQL

### Planned Video Layer
- Mux

### Planned Deployment
- Vercel

## Folder Structure

```text
src/
  app/         routes, pages, layouts
  components/  shared reusable UI
  features/    feature-specific modules
  lib/         utilities and helpers
  services/    external integrations and service access
  hooks/       custom hooks
  types/       shared TypeScript types
  constants/   project constants