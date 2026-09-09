---
title: Legacy SaaS modernization
type: Confidential .NET migration
summary: An anonymized move of a living SaaS product off .NET Framework onto a .NET 10 Web API—Clean Architecture, vertical slices, validation and auth rebuilt as infrastructure.
featured: false
order: 2
stack:
  - .NET 10
  - ASP.NET Core Web API
  - Clean Architecture
  - Vertical slices
  - CQRS / MediatR
  - Repository pattern
  - FluentValidation
highlights:
  - Framework to .NET 10
  - Feature-based application layer
  - Auth, validation, and logging rebuilt
challenge: Leave .NET Framework without freezing delivery or dragging mixed concerns into the new API.
solution: Rebuild as a .NET 10 Web API. Migrate by feature slice—CQRS plus MediatR, FluentValidation, repository access—so each use case can move while the product stays shippable.
role: .NET Developer
period: Jun 2026 — Present
confidential: true
---

## Context
Confidential engagement; employer name withheld. A production SaaS needed to leave .NET Framework for a .NET 10 Web API without stopping delivery.

## Constraint
Legacy methods mixed business rules, data access, and API shape. Existing callers still needed the same behavior. A full stop-the-world rewrite was not acceptable.

## Architecture
The approach is a strangler migration. The Framework app keeps serving. Each feature moves as a vertical slice: a command or query through MediatR, validated with FluentValidation, authorized, and logged. Persistence sits behind a repository. Validation, auth, logging, and exception handling are shared infrastructure rather than copied into every endpoint.

## Implementation
Work proceeded by slice: host and architecture, then features and endpoints, models and data access, then auth, validation, and exception handling. Each migrated slice had to carry a real use case, not a placeholder handler.

## Outcome
New work lands in a slice without reopening the legacy codebase. Validation and errors have one place to live. The product continued to ship during the migration.

## Trade-offs
Feature slices are faster to land, but naming and boundaries need discipline or they drift. A full rewrite would have been slower and riskier for production. Moving one use case at a time kept the system shippable.
