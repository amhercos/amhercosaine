---
title: AMSentry
type: Hardware-to-cloud attendance
summary: A Clean Architecture backend and C# middleware bridge that synchronized ZKTeco fingerprint devices with a central attendance platform.
featured: false
order: 3
stack:
  - .NET
  - ASP.NET Core
  - Clean Architecture
  - CQRS / MediatR
  - C# WinForms
  - ZKTeco SDK
highlights:
  - Real-time biometric sync
  - High-frequency attendance logs
  - 99.9% sync accuracy
challenge: Connect physical fingerprint scanners across remote stations to cloud business logic without losing logs, duplicating punches, or blocking high-frequency writes.
solution: Built AMSentry on Clean Architecture and CQRS, then added a WinForms middleware bridge that talked to ZKTeco devices and pushed attendance events into a central database.
role: Backend developer intern
period: Jun 2025 — Mar 2026
repo: https://github.com/amhercos/csharp-fingerprint-bridge
confidential: false
---

## Context
AMSentry sits at the boundary between campus operations and software. Fingerprint devices had to feed a central attendance system used by the college, which meant hardware events had to become durable, queryable records.

## Constraint
Biometric stations are noisy, remote, and impatient. Logs arrive in bursts. A missed punch is a payroll and policy problem, not just a retry queue. The API also had to stay responsive under high-frequency writes.

## Architecture
The cloud side follows Clean Architecture with CQRS/MediatR so ingestion, querying, and administrative use cases stay separated. The local side is a C# WinForms middleware process that owns the ZKTeco SDK conversation, then forwards normalized attendance events to the backend.

## Implementation
I built the sync engine that processed attendance logs from multiple stations and designed API paths that could absorb high-frequency writes. The middleware is the hardware adapter; the API is the system of record. That split kept SDK details out of the domain model.

## Outcome
The sync engine processed thousands of attendance logs with 99.9% accuracy across remote hardware stations. The AMSentry backend improved API response times by 30% for high-frequency logs, based on the original project notes.

## Trade-offs
A WinForms bridge is not fashionable, but it was the practical host for the vendor SDK on station machines. A fully cloud-connected device fleet would have been cleaner; the middleware made the current hardware usable without waiting for that world.
