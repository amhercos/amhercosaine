---
title: AMSentry
type: Hardware-to-cloud attendance
summary: A Clean Architecture API plus a C# WinForms bridge that turned ZKTeco fingerprint punches into durable attendance records.
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
challenge: Connect remote fingerprint scanners to cloud business logic without dropping punches, duplicating them, or stalling under burst writes.
solution: Clean Architecture and CQRS on the API; a WinForms middleware host that owns the ZKTeco SDK and forwards normalized events to the system of record.
role: Backend developer intern
period: Jun 2025 — Mar 2026
repo: https://github.com/amhercos/csharp-fingerprint-bridge
confidential: false
---

## Context
AMSentry records attendance from ZKTeco fingerprint scanners at remote stations. Each punch must become a durable record in the central API so payroll and campus operations can rely on it.

## Constraint
Devices are remote and send logs in bursts. A missed punch is a payroll problem. The vendor SDK requires a Windows process. Scanner libraries cannot leak into domain rules.

## Architecture
Two processes share the work. On the station, a WinForms bridge talks to the ZKTeco SDK, normalizes the event, and POSTs it to the API. If the network fails, punches wait in a local JSON queue. In the cloud, a Clean Architecture API splits ingest commands, attendance queries, and admin use cases through MediatR so reporting does not block writes. Fingerprint templates sync over Npgsql, not through the ingest controller. The domain never imports the scanner SDK.

## Implementation
The sync engine posts a normalized punch with a 5-second timeout. HTTP 4xx (invalid payload) is not retried. Timeouts and 5xx are written to `offline_queue.json` beside the executable and flushed when the connection returns. That split keeps vendor DLLs on the station and business rules in the API.

## Outcome
Thousands of remote punches synced at 99.9% accuracy, from the original project notes. High-frequency ingest improved API response times by about 30%.

## Trade-offs
WinForms was required because the vendor SDK expects a Windows host. A fully cloud-native device fleet would be simpler to operate, but it was not available for this hardware.
