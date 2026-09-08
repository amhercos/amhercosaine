---
title: ReadToUnlock
type: Gamified education product
summary: A React reading-comprehension tool that unlocks the next piece of content only after a student completes the current milestone.
featured: false
order: 4
stack:
  - React
  - TypeScript
  - Custom progress logic
  - Vercel
highlights:
  - Progress-gated unlocks
  - Milestone-based engagement
  - Product-shaped frontend work
challenge: Keep students moving through assigned reading without turning the product into a content dump they can skip.
solution: Built a React experience whose unlock mechanism grants the next activity only when progress rules are satisfied, using milestones as the pacing primitive.
role: Freelance developer
period: Jul 2025 — Aug 2025
repo: https://github.com/amhercos/Svci-WebEduc
confidential: false
---

## Context
ReadToUnlock is a reading-comprehension product for students. The educational goal was simple: participation should be earned, not assumed.

## Constraint
If every page is visible at once, students skip ahead. If the flow is too rigid, they stall. The unlock logic had to feel fair, understandable, and hard to bypass.

## Architecture
This is a product-shaped frontend: React screens, progress state, and an unlock gate that sits between completed work and the next milestone. The interesting design is not the visual theme; it is the rule that content access follows demonstrated progress.

## Implementation
I built the interactive milestone flow and the secure unlock mechanism that grants access based on user progress. The interface stays simple on purpose so the mechanic is obvious: finish the current reading task, then the next one opens.

## Outcome
The unlock model increased participation by making progress visible and consequential. This project is the shortest case study on the site; it exists to show product judgment and frontend range around a primarily backend career.

## Trade-offs
A heavier backend would have made the unlock rules harder to tamper with. For the original scope, a focused React product was the right size. I would now extract the progress rules into an explicit policy module so the same mechanic could later sit behind an API.
