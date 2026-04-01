# Coding Standards

## General Principles
- write clear and maintainable code
- prefer simple solutions
- avoid over-engineering
- keep changes small and focused
- do not refactor unrelated code without request

## Naming
- use descriptive English names in code
- components: PascalCase
- hooks: useSomething
- helpers/services/constants: clear descriptive names
- avoid ambiguous names unless the context is obvious

## File Size and Responsibility
- keep files focused
- avoid giant components and giant pages
- each file should have a clear responsibility
- extract code only when reuse or clarity justifies it

## TypeScript
- avoid `any`
- define types for props and domain models
- keep types explicit when they improve clarity
- prefer safe typing over shortcuts

## React / Next.js
- prefer server components by default
- use client components only when necessary
- keep page files lean
- extract reusable UI into `src/components`
- keep feature logic inside `src/features` when appropriate

## Tailwind CSS
- keep utility class usage readable
- maintain consistent spacing and typography
- avoid chaotic styling
- use responsive classes intentionally

## Clean Code Rules
- small focused functions
- early returns when helpful
- low nesting
- avoid duplicated logic
- avoid hidden side effects
- do not introduce abstractions too early

## Accessibility
- use semantic HTML
- use meaningful button labels
- use headings in correct order
- do not rely only on visual cues

## Folder Rules
- `src/app`: routes, layouts, pages
- `src/components`: shared reusable components
- `src/features`: feature-specific logic and UI
- `src/lib`: utilities and helpers
- `src/services`: service access and external integrations
- `src/hooks`: custom hooks
- `src/types`: shared types
- `src/constants`: shared constants

## Documentation Rule
If an architectural or product decision changes, update documentation.