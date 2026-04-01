# AGENTS.md

## Project Overview
This project is called **El Rincón Monterizo**.

It is a web platform for **on-demand educational, cultural, and audiovisual content**.
The platform is intended to be **free for end users** and initially monetized through **local digital advertising** integrated into the site.

Main content types planned:
- digital books and documents
- on-demand videos
- educational and cultural resources
- local sponsors and ad placements

This project is currently in an early stage and is being built with a strong focus on:
- clean architecture
- modular code
- maintainability
- scalable growth
- clear business-oriented structure

---

## Main Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

Planned additions:
- shadcn/ui
- Supabase
- PostgreSQL
- Mux
- Vercel

---

## Primary Goal for Agents
Agents must help build the project in a way that is:
- safe
- clear
- predictable
- maintainable
- easy to extend later

Agents must prioritize:
1. correctness
2. readability
3. low complexity
4. consistency with the existing structure
5. minimal unnecessary changes

---

## General Development Rules

### 1. Do not make large uncontrolled changes
- Do not rewrite unrelated files.
- Do not refactor large areas unless explicitly requested.
- Keep changes scoped to the task.

### 2. Prefer clarity over cleverness
- Use simple and readable code.
- Avoid over-engineering.
- Avoid unnecessary abstractions.

### 3. Preserve project structure
Respect the current structure:

- `src/app` for routes, pages, layouts
- `src/components` for reusable UI components
- `src/features` for business/domain modules
- `src/lib` for utilities and shared helpers
- `src/services` for external integrations and service logic
- `src/hooks` for custom React hooks
- `src/types` for shared TypeScript types
- `src/constants` for constants
- `docs/` for project documentation

### 4. Follow clean code principles
- meaningful naming
- small focused functions
- low nesting
- avoid duplicated logic
- separate UI from business logic when possible
- prefer composition over monolithic files

### 5. Respect TypeScript
- avoid `any` unless absolutely necessary
- define types for props, responses, and domain models
- keep types explicit when they improve clarity

### 6. UI and styling
- use Tailwind CSS
- keep UI clean and modern
- prefer reusable components
- avoid inconsistent spacing and typography
- prioritize responsive behavior from the beginning

### 7. Accessibility and semantics
- use semantic HTML
- include accessible labels when needed
- avoid div-heavy markup when proper tags exist

### 8. Documentation
When relevant, update documentation in `docs/` if architectural or business rules change.

---

## Business Context Rules
Agents must remember these product decisions:

- This is **not** a live streaming platform.
- The platform is focused on **on-demand** content.
- Initial monetization is based on **local advertisers and sponsors**.
- The experience should feel professional, modern, and community-oriented.
- The product should be prepared for future growth without becoming unnecessarily complex now.

---

## What Agents Should Avoid
Agents must avoid:
- adding dependencies without clear justification
- changing the stack without approval
- introducing premature backend complexity
- building features not requested
- inventing business rules without confirmation
- assuming paid subscriptions are part of the MVP
- assuming live streaming is part of the MVP

---

## How Agents Should Respond to Tasks
For significant tasks, agents should:
1. understand the goal
2. identify impacted files
3. propose a concise plan
4. apply focused changes
5. explain what changed

For small tasks, agents can act directly but should still keep changes minimal and coherent.

---

## Current Product Direction
The current product direction is:

**El Rincón Monterizo**
A modern on-demand digital platform for educational, cultural, and audiovisual content, with a future-ready architecture and an initial local-advertising monetization model.

Agents should align all technical work with that direction.