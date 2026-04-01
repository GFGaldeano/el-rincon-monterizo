# Project Development Skill

## Purpose
This skill defines the preferred way to build features for **El Rincón Monterizo**.

Use this skill when implementing:
- pages
- reusable components
- feature modules
- content catalog sections
- sponsor/ad sections
- admin-related UI
- integrations with future backend services

---

## Preferred Workflow
1. understand the task
2. identify the minimum viable implementation
3. locate the correct architectural layer
4. implement only what is needed
5. keep code typed and readable
6. avoid unrelated refactors
7. explain modified files clearly

---

## Implementation Priorities
When building features, prioritize:

1. correctness
2. structure
3. readability
4. reuse when justified
5. responsive UI
6. future extensibility without overengineering

---

## Folder Guidance
- page or route work goes in `src/app`
- shared reusable UI goes in `src/components`
- feature-specific UI and logic goes in `src/features`
- utility helpers go in `src/lib`
- external integrations go in `src/services`
- shared types go in `src/types`

---

## UI Style Guidance
- modern, clean, community-oriented
- readable typography
- balanced spacing
- responsive by default
- avoid noisy layouts
- prefer elegant simplicity

---

## Clean Code Guidance
- use descriptive names
- small focused functions
- avoid deeply nested logic
- avoid large monolithic components
- extract repeated logic only when repetition is real
- do not abstract too early

---

## Product Context Reminder
This project is an on-demand content platform.
It is not focused on live streaming.
Initial monetization comes from local advertising and sponsors.

All implementation decisions should respect that.