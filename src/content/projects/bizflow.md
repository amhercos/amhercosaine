---
title: BizFlow
type: POS & inventory SaaS
summary: A layered POS and inventory platform with client-side pricing previews and server-authoritative checkout for sales, credit, promotions, and stock.
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
BizFlow is a POS and inventory platform for sales, customer credit, promotions, and stock alerts. The React Native POS previews promotional prices locally so cashiers see basket totals immediately. The API still reloads product data and computes the transaction that is recorded.

## Constraint
The system serves more than one client, two database providers, and many tenants. Putting retail logic in controllers would duplicate it and make tenant isolation harder to enforce.

## Architecture
Clients call an ASP.NET Core Web API over HTTP. Controllers stay thin. MediatR carries commands and queries into the application layer. The checkout handler owns persisted pricing, stock, credit, and payment validation. Persistence sits behind a provider port: PostgreSQL for cloud tenants (one schema per business) and SQLite infrastructure for the alternate local path.

## Implementation
The React Native `promotion-engine.ts` calculates bulk, bundle, and discount totals for the basket preview. Checkout posts to `POST /api/Transactions/checkout`; the handler reloads products, validates stock, recalculates eligible cash-sale promotions with the API `PromotionEngine`, computes payment totals, and commits the transaction. JWTs carry `StoreId` and `SchemaName`. `CurrentUserService` reads those claims, `PosDbContext` applies the schema and StoreId query filters, and `ConnectionResolver` rejects inactive or unmigrated stores before returning the configured PostgreSQL connection.

## Outcome
Checkout remains authoritative even though the mobile client gives cashiers an immediate pricing preview. Low-stock and near-expiry alerts exist to reduce wastage. Original notes: about 40% less code coupling, and about 20% less wastage from the alert engine.

## Trade-offs
Schema-per-tenant costs more to operate than a single tenant column. Supporting PostgreSQL and SQLite makes migrations more involved. The domain still does not depend on which provider answered.
