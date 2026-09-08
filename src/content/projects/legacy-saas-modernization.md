---
title: Legacy SaaS modernization
type: Confidential .NET migration
summary: An anonymized migration of a production SaaS product from .NET Framework into a .NET 10 Web API using Clean Architecture, vertical slices, and production-grade validation and auth.
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
challenge: Move a living SaaS product off .NET Framework without freezing delivery or dragging legacy coupling into the new API surface.
solution: Rebuilt the backend as a .NET 10 Web API with Clean Architecture, repository access, CQRS plus MediatR, FluentValidation, and vertical slices in the application layer so each feature could migrate as a bounded unit.
role: .NET Developer
period: Jun 2026 — Present
confidential: true
---

## Context
This is a confidential professional project. The product is a production SaaS system that needed a path off .NET Framework. Employer and client names are withheld; the engineering story is not.

## Constraint
A framework-era codebase had accumulated mixed responsibilities: business rules, data access, and API shape were too tightly bound. The migration had to preserve behavior while creating a structure the team could keep evolving.

## Architecture
The replacement system is a .NET 10 Web API. The application layer is organized as vertical slices by feature, with CQRS handlers through MediatR. Persistence sits behind a repository pattern. Cross-cutting concerns—validation, authentication/authorization, logging, and exception handling—were designed as shared infrastructure rather than copied into every endpoint.

## Implementation
I worked across the migration, not just the folder structure:
- redesigned the architecture and feature slices
- migrated business features and API endpoints
- moved and reshaped data access / models
- modernized authentication and authorization
- added FluentValidation, logging, and exception handling

The goal was not a cosmetic rewrite. Each slice had to carry a real use case from the old system into a testable command or query.

## Outcome
The new API is organized around features instead of framework leftovers. New work can land in a slice without reopening the entire legacy graph, and request validation and error handling now have one place to live.

## Trade-offs
Vertical slices make feature work faster, but shared domain language still has to be protected so slices do not drift. A full rewrite would have been slower and riskier; migrating by feature kept the system shippable while the architecture changed underneath.
