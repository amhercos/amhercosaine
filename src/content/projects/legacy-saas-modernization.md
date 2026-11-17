---
title: Enterprise Multi-Tenant SaaS
type: .NET Framework → .NET 10
summary: Modernizing a legacy .NET Framework application into a Clean Architecture .NET 10 Web API and Next.js frontend with Microsoft Entra ID SSO, RBAC, and Azure App Service delivery.
featured: true
order: 1
stack:
  - .NET 10 Web API
  - Clean Architecture
  - CQRS
  - Next.js
  - Microsoft Entra ID
  - OAuth 2.0 SSO
  - ASP.NET Core Identity
  - SQL Server
  - EF Core
  - Serilog
  - Azure DevOps
  - Azure App Service
highlights:
  - Clean Architecture .NET 10 Web API + Next.js client
  - Microsoft Entra ID, OAuth 2.0 SSO & RBAC
  - IHostedService email workers & CSV/XLSX/PDF/DOCX exports
  - Azure DevOps CI/CD releases to Azure App Service
challenge: Modernize a legacy .NET Framework application onto .NET 10 and Next.js while keeping existing business operations running smoothly.
solution: Build a Clean Architecture .NET 10 Web API with CQRS, Microsoft Entra ID & OAuth 2.0 SSO, RBAC, background workers, and Azure DevOps App Service pipelines.
role: .NET Developer Consultant, Radix Systems Services Corp. (Deployed to P&A Grant Thornton)
period: Jun 2026 – Present
confidential: true
---

## Context
As a .NET Developer Consultant at Radix Systems Services Corp. deployed to P&A Grant Thornton, I contribute to modernizing a multi-tenant enterprise SaaS platform from .NET Framework to a Clean Architecture .NET 10 Web API and Next.js frontend.

## Architecture
- **Frontend Client:** Next.js web application consuming typed REST contracts.
- **Edge & Identity:** ASP.NET Core gateway integrating Microsoft Entra ID, Google/Microsoft OAuth 2.0 SSO, ASP.NET Core Identity, and Role-Based Access Control (RBAC).
- **Application Core:** .NET 10 Web API structured with Clean Architecture, CQRS, `IHostedService` scheduled email/reporting workers, and multi-format exports (CSV, XLSX, PDF, DOCX).
- **Persistence & Delivery:** SQL Server via Entity Framework Core, structured Serilog telemetry, and automated Azure DevOps CI/CD pipelines deploying to Azure App Service.
