---
title: ReadToUnlock
type: Gamified education product
summary: A React reading product that unlocks the next milestone only after the current one is complete. There is no skip path.
featured: false
order: 4
stack:
  - React
  - JavaScript / JSX
  - Custom progress logic
  - Vercel
highlights:
  - Progress-gated unlocks
  - Milestone-based engagement
  - Product-shaped frontend work
challenge: Keep students in assigned reading without allowing them to skip ahead through all content.
solution: A React experience whose unlock gate grants the next activity only when progress rules are satisfied. Milestones are the pacing primitive.
role: Freelance developer
period: Jul 2025 — Aug 2025
repo: https://github.com/amhercos/Svci-WebEduc
confidential: false
---

## Context
ReadToUnlock is a client-side React product for assigned reading. A student works through one word at a time. The next activity opens only after the current milestone is done.

## Constraint
If every screen is available at once, students skip ahead. If the lock is unclear, they stall. The gate has to be obvious and hard to bypass. This version has no backend API.

## Architecture
The product is React on Vercel. `WordInput` starts a session. `WordDisplay` keeps the assigned word on screen until the student confirms they read it (`hasReadWord`). Only then does `ChestSelection` mount. After the chest, a weighted roll chooses a mini-game, chocolate, or sticker, then the flow resets to the next word. The next UI does not mount until confirmation fires, so skip is not available.

## Implementation
Empty input does not start the flow. The chest uses a 60 / 20 / 20 split: mini-game, chocolate, or sticker. Seven mini-games sit on the 60% path. The last game is stored so the next roll does not repeat it immediately. Claiming a reward or finishing a game returns to the next word.

## Outcome
Progress is visible: nothing further happens until the student confirms the read. The case is short on purpose. It shows product judgment on a frontend-only scope, alongside backend-heavy work elsewhere on this site.

## Trade-offs
A server-owned policy would be harder to tamper with. For the original scope, a focused React app was the right size. A later version could move the gate behind an API without changing the student flow.
