---
title: BizFlow
type: POS & inventory SaaS
summary: A layered POS and inventory platform where sales, credit, promotions, and stock alerts share one workflow. Business rules stay in the API, not in the UI.
featured: true
order: 1
stack:
  - ASP.NET Core
  - Clean Architecture
  - CQRS / MediatR
  - EF Core
  - PostgreSQL
  - SQLite
  - React Native
highlights:
  - Schema-per-tenant isolation
  - Multi-provider data layer
  - Near-expiry and low-stock alerts
challenge: Keep retail rules maintainable while serving multiple clients, two database providers, and a mobile POS without leaking domain logic into screens.
solution: Clean Architecture .NET backend with CQRS, DDD-inspired boundaries, and PostgreSQL or SQLite behind the same ports so tenants stay isolated and the application layer stays coherent.
role: Full-stack developer, backend architecture lead
period: Mar 2026 — Present
repo: https://github.com/amhercos/BizFlow
confidential: false
---

## Context
BizFlow is a POS and inventory platform for sales, customer credit, promotions, and stock alerts. Mobile and web clients must use the same rules. Pricing, credit limits, and inventory policy belong in the backend, not in the screens.

## Constraint
The system serves more than one client, two database providers, and many tenants. Putting retail logic in controllers would duplicate it and make tenant isolation harder to enforce.

## Architecture
Clients call an ASP.NET Core Web API over HTTP. Controllers stay thin. MediatR carries commands and queries into the application layer. The domain owns pricing, stock, credit, and tenant boundaries. Persistence sits behind a provider port: PostgreSQL for cloud tenants (one schema per business) and SQLite for the local path. Use cases do not change with the database.

## Implementation
Endpoints map to operations—products, transactions, promotions, credits, dashboard, staff, settings, and auth—not to pages. Promotional pricing (`CalculatePrice`) and low-stock / near-expiry alerts run in the application layer so both clients get the same result. Tenant middleware selects the schema before a handler runs. Global query filters enforce isolation and soft-delete. The React Native POS posts commands and renders receipts; it does not reimplement pricing.

## Outcome
Screens no longer host business policy, which reduced coupling across the stack. Low-stock and near-expiry alerts exist to reduce wastage. Original notes: about 40% less code coupling, and about 20% less wastage from the alert engine.

## Trade-offs
Schema-per-tenant costs more to operate than a single tenant column. Supporting PostgreSQL and SQLite makes migrations more involved. The domain still does not depend on which provider answered.
