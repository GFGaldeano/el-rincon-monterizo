# Project Development Skill

## Purpose
This skill defines the preferred way to build features for **El Rincón Monterizo**.

Use it for:
- pages
- reusable components
- content catalog sections
- sponsor/ad sections
- admin UI
- future integrations

---

## Preferred Workflow
1. understand the task
2. identify the minimum viable solution
3. locate the correct architectural layer
4. implement only what is needed
5. keep code typed and readable
6. avoid unrelated refactors
7. explain modified files clearly

---

## Implementation Priorities
Prioritize:
1. correctness
2. readability
3. structure
4. responsive UI
5. maintainability
6. future extensibility without overengineering

---

## Folder Guidance
- route or page work goes in `src/app`
- reusable UI goes in `src/components`
- feature-specific logic goes in `src/features`
- utilities go in `src/lib`
- service logic goes in `src/services`
- shared types go in `src/types`

---

## UI Guidance
The UI should feel:
- modern
- clean
- community-oriented
- readable
- balanced
- responsive

Avoid:
- noisy layouts
- excessive visual density
- inconsistent spacing
- random styling decisions

---

## Clean Code Guidance
- use descriptive names
- keep functions small
- avoid deeply nested logic
- avoid giant components
- extract repeated logic only when reuse is real
- do not abstract too early

---

## Product Reminder
This project is an on-demand platform.
It is not focused on live streaming.
Initial monetization comes from local advertising and sponsor placements.

All implementation decisions should align with that.