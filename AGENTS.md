# AGENTS.md

## Project
**El Rincón Monterizo** is a modern web platform for **on-demand educational, cultural, and audiovisual content**.

The product is intended to be:
- free for end users in its initial phase
- monetized through local advertising and sponsors
- community-oriented
- scalable without unnecessary complexity

Main content types:
- digital books and documents
- on-demand videos
- educational resources
- cultural content
- sponsor and advertiser placements

---

## Current Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

Planned integrations:
- shadcn/ui
- Supabase
- PostgreSQL
- Mux
- Vercel

---

## Main Goal for Agents
Agents must help build the project with:
- correctness
- readability
- clean structure
- maintainability
- minimal and focused changes

Agents should always prefer:
1. simple solutions
2. explicit code
3. scoped modifications
4. consistency with the repository structure
5. business alignment with the product vision

---

## Repository Structure
Respect the current structure:

- `src/app` → routes, pages, layouts
- `src/components` → shared reusable UI components
- `src/features` → business/domain modules
- `src/lib` → utilities, helpers, configuration clients
- `src/services` → integration logic and external service access
- `src/hooks` → custom hooks
- `src/types` → shared TypeScript types
- `src/constants` → project constants
- `docs/` → project documentation

Do not place business logic everywhere.
Keep responsibilities separated.

---

## Coding Rules

### General
- write readable, production-oriented code
- avoid unnecessary abstractions
- avoid premature optimization
- avoid large unrelated refactors
- keep functions focused
- use descriptive names
- prefer early returns over deep nesting
- avoid duplicated logic

### TypeScript
- avoid `any` unless absolutely necessary
- define types for props, models, and service responses
- prefer explicit types when they improve clarity

### React / Next.js
- keep components small and focused
- do not create giant page files
- extract reusable components only when reuse is real
- use server/client boundaries intentionally
- do not mark components as client components unless required

### Styling
- use Tailwind CSS
- keep spacing, typography, and layout consistent
- prioritize responsive design
- avoid visual clutter
- prefer simple and elegant UI

### Accessibility
- use semantic HTML
- provide labels where necessary
- avoid div-heavy structures when semantic tags exist

---

## Product Context Rules
Agents must remember these decisions:

- This is an **on-demand** platform.
- This is **not** a live streaming platform.
- Initial monetization is based on **local advertisers and sponsors**.
- The MVP is not subscription-first.
- The product should feel modern, clear, and community-oriented.
- Architecture should support future growth, but the present implementation must remain simple.

---

## What Agents Must Avoid
Do not:
- add dependencies without clear justification
- change the stack without approval
- invent business rules
- assume premium subscriptions are part of the MVP
- assume live streaming is part of the MVP
- add unrequested features
- introduce complexity to “future-proof” everything

---

## Task Execution Style
For medium or large tasks:
1. understand the request
2. identify impacted files
3. propose a short plan
4. implement focused changes
5. explain what changed

For small tasks:
- act directly
- keep changes minimal
- preserve consistency

---

## Documentation Rule
When architectural, business, or development rules change, update relevant docs in `docs/`.