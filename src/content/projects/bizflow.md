---
title: BizFlow POS & Inventory
type: Multi-Tenant SaaS
summary: Multi-tenant retail POS and inventory SaaS built with .NET 10, PostgreSQL (schema-per-tenant isolation), SQLite offline support, React Native (Expo), and automated GitHub Actions Docker deployments.
featured: false
order: 2
stack:
  - .NET 10
  - ASP.NET Core Web API
  - Clean Architecture
  - CQRS / MediatR
  - PostgreSQL
  - SQLite
  - EF Core
  - Serilog
  - React Native (Expo)
  - GitHub Actions
  - Docker
highlights:
  - PostgreSQL schema-per-tenant isolation
  - SQLite offline cache in React Native (Expo)
  - CQRS/MediatR order, promotion & inventory services
  - GitHub Actions Docker CI/CD
challenge: Support multi-tenant retail operations across mobile cashiers and intermittent store networks with strict client data isolation.
solution: Pair a .NET 10 CQRS/MediatR API and PostgreSQL schema-per-tenant isolation with a React Native (Expo) mobile app backed by local SQLite caching.
role: Freelance Full-Stack Developer
period: Mar 2026 – Aug 2026
repo: https://github.com/amhercos/BizFlow
confidential: false
---

## Context
BizFlow is a multi-tenant point-of-sale and inventory SaaS platform supporting floor cashiers via React Native (Expo) and back-office retail operations.

## Architecture
- **Mobile POS:** React Native (Expo) cashier app with local SQLite caching for offline continuity.
- **API Gateway:** .NET 10 REST API handling JWT authentication and per-tenant schema resolution.
- **Domain Engine:** CQRS/MediatR services managing orders, bundle/bulk promotions, stock alerts, and Serilog telemetry.
- **Persistence & CI/CD:** PostgreSQL schema-per-tenant storage with automated GitHub Actions Docker build and deployment workflows.
