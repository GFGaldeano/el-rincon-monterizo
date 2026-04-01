# CLAUDE.md

## Mission
Help build **El Rincón Monterizo** as a clean, modular, scalable platform for on-demand educational, cultural, and audiovisual content.

Do not assume features that have not been explicitly approved.

---

## Product Context
El Rincón Monterizo is:
- a web content platform
- on-demand only
- free for end users in its first stage
- monetized through local advertising and sponsor placements
- focused on education, culture, and community value

It is not currently:
- a live streaming platform
- a marketplace
- a social network
- a subscription-first product

---

## Current Tech Context
- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

Planned next integrations:
- shadcn/ui
- Supabase
- PostgreSQL
- Mux
- Vercel

---

## Working Style
When editing this repository:

- think before changing files
- keep changes scoped
- avoid touching unrelated code
- do not over-engineer
- prefer explicit and readable implementations
- preserve architecture consistency

For medium or large tasks:
1. summarize the objective
2. propose a short implementation plan
3. execute step by step
4. explain modified files clearly

---

## Architecture Boundaries
Use these folder responsibilities:

- `src/app` → routes, pages, layouts
- `src/components` → shared presentational/reusable UI
- `src/features` → feature-specific UI and domain logic
- `src/lib` → helpers, utils, configuration clients
- `src/services` → service access and external integrations
- `src/hooks` → custom hooks
- `src/types` → shared types
- `src/constants` → constants
- `docs/` → documentation

Do not mix concerns unnecessarily.

---

## Naming Conventions

### Files
- components: `PascalCase.tsx`
- hooks: `useSomething.ts`
- utils/services/constants: `kebab-case.ts` or clear descriptive naming
- route files follow Next.js conventions

### Components
- use `PascalCase`
- keep one main responsibility per component
- extract child components only when needed

### Variables and functions
- use descriptive English names in code
- avoid ambiguous names like `data`, `item`, `temp` unless context is obvious

---

## Code Quality Rules

### TypeScript
- avoid `any`
- type props and return values when useful
- keep types close to the domain when possible

### React / Next.js
- prefer server components by default
- use client components only when necessary
- avoid large monolithic pages
- keep UI and business logic reasonably separated

### Tailwind
- keep class composition readable
- avoid excessively long class strings when extraction improves clarity
- maintain consistent spacing and responsive rules

### Clean Code
- small focused functions
- low nesting
- early returns
- no duplicated logic
- no hidden side effects
- no premature abstractions

---

## Dependency Rules
Before adding a package:
- confirm it is truly needed
- prefer platform/native solutions
- avoid dependency bloat

When adding one, explain:
- why it is needed
- what problem it solves
- whether a lighter alternative exists

---

## Business Guardrails
Never assume these are in scope unless explicitly requested:
- premium plans
- live streaming
- chat systems
- AI recommendation engines
- invasive ad systems
- complex dashboards beyond current needs

Advertising should initially be treated as:
- banners
- sponsor cards
- featured local businesses
- clean promotional placements

---

## Documentation Rule
If a structural or business decision changes, update:
- `docs/architecture.md`
- `docs/product-rules.md`
- `docs/coding-standards.md`
- `docs/roadmap.md`

---

## Quality Standard
All generated code should aim to be:
- readable
- typed
- maintainable
- production-oriented
- aligned with the repo structure