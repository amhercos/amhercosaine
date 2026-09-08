---
title: BizFlow
type: POS & inventory SaaS
summary: A layered point-of-sale and inventory platform that turns sales, credit, promotions, and reporting into one coherent operational workflow.
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
challenge: Keep complex retail rules maintainable while serving multiple clients, two database providers, and a mobile POS surface without leaking domain logic into the UI.
solution: Built a Clean Architecture .NET backend with CQRS, DDD-inspired boundaries, and provider-specific PostgreSQL and SQLite persistence so each tenant stays isolated while the application layer stays coherent.
role: Full-stack developer, backend architecture lead
period: Mar 2026 — Present
repo: https://github.com/amhercos/BizFlow
confidential: false
---

## Context
BizFlow is a modular POS and inventory SaaS for businesses that need more than a cash register. The product has to handle products, categories, promotions, customer credit, staff access, dashboards, and reports while remaining usable from a mobile client.

## Constraint
Retail rules change quickly and they are easy to bury inside controllers or client screens. The system also had to support more than one database provider and keep tenant data fully segregated.

## Architecture
The backend is split into domain, application, infrastructure, migrations, and Web API layers. Commands and queries move through MediatR. Persistence is abstracted so PostgreSQL can serve the cloud path while SQLite covers a local or alternative provider path. Tenant isolation uses a schema-per-tenant strategy so one cloud deployment can host multiple businesses without mixing data.

## Implementation
I designed the API around operational domains rather than page-shaped endpoints: products, transactions, promotions, credits, dashboard, staff, settings, and authentication. The application layer owns use cases such as calculated promotional pricing and inventory-health alerts. The mobile client consumes those contracts instead of re-implementing business rules.

## Outcome
The architecture reduced coupling across the codebase and made multi-client integration simpler. Automated near-expiry and low-stock logic was built to cut wastage and improve replenishment. Those outcomes are based on the original project notes: a 40% reduction in code coupling and a 20% reduction in business wastage from the alert engine.

## Trade-offs
Schema-per-tenant isolation is operationally heavier than a shared table with a tenant column, but it was the right security boundary for this product. Supporting two database providers added migration complexity; the payoff is that the domain model does not depend on one vendor.
