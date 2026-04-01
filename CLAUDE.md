# CLAUDE.md

## Mission
Help build **El Rincón Monterizo** as a clean, modular, scalable web platform for on-demand educational, cultural, and audiovisual content.

The project is being built incrementally.
Do not assume features that have not been explicitly approved.

---

## Core Product Context
El Rincón Monterizo is:
- a content platform
- on-demand only
- free for end users in its initial stage
- monetized through local advertising and sponsors
- oriented to education, culture, and community value

It is **not** currently:
- a live streaming platform
- a subscription-first product
- a marketplace
- a social network

---

## Tech Context
Current stack:
- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

Expected near-future integrations:
- shadcn/ui
- Supabase
- PostgreSQL
- Mux
- Vercel

---

## Working Style
When working on this repository:

- think before editing
- keep edits small and intentional
- avoid touching unrelated files
- do not introduce complexity without need
- preserve readability
- prefer explicit code over clever shortcuts

For medium or large tasks:
1. summarize the objective
2. propose a short implementation plan
3. execute step by step
4. clearly describe modified files

---

## Architecture Rules
Use these boundaries:

- `src/app`: routes, pages, layouts
- `src/components`: shared presentational/reusable components
- `src/features`: feature-specific logic and UI
- `src/lib`: utilities, shared helpers, config clients
- `src/services`: external services and integration logic
- `src/hooks`: custom hooks
- `src/types`: shared types
- `src/constants`: project constants
- `docs`: documentation

Do not mix business logic everywhere.
Keep domain logic close to features or services.

---

## Coding Rules

### General
- use TypeScript consistently
- avoid `any`
- use descriptive names
- write small focused functions
- reduce nesting
- avoid duplication
- prefer early returns

### React / Next.js
- keep components focused
- do not create giant page files
- extract reusable pieces when repetition appears
- use server/client boundaries intentionally
- do not make components client-side unless needed

### Styling
- use Tailwind CSS
- keep spacing consistent
- use readable layouts
- prefer utility composition over scattered custom CSS
- avoid visual clutter

### File discipline
- do not create unnecessary files
- do not create unused abstractions
- do not rename files unless needed
- do not move architecture pieces casually

---

## Business Guardrails
Never assume the following unless explicitly requested:
- premium subscriptions
- live streaming
- chat systems
- recommendation engines with AI
- complex admin dashboards beyond the current scope
- intrusive ad systems

Advertising should be treated initially as:
- banners
- sponsor blocks
- featured local businesses
- clean promotional placements

---

## Dependency Rules
Before adding a new dependency:
- verify whether it is really needed
- prefer built-in platform capabilities
- prefer existing stack conventions
- avoid dependency bloat

If a dependency is necessary, explain:
- why it is needed
- what problem it solves
- whether a lighter alternative exists

---

## Documentation Rules
If architecture, standards, or business assumptions change, suggest updating:
- `docs/architecture.md`
- `docs/product-rules.md`
- `docs/coding-standards.md`
- `docs/roadmap.md`

---

## Output Quality Standard
All generated code should aim to be:
- production-oriented
- readable
- typed
- maintainable
- coherent with the repo structure

Do not optimize prematurely.
Do not overbuild.
Do not improvise product decisions.