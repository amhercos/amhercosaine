---
title: AMSentry Biometric Attendance
type: Hardware-to-Cloud Platform
summary: .NET Clean Architecture / CQRS attendance API paired with a C# WinForms biometric hardware integration bridge achieving 99.9% sync accuracy and ~30% faster write throughput.
featured: false
order: 3
stack:
  - .NET
  - ASP.NET Core Web API
  - Clean Architecture
  - CQRS / MediatR
  - C# WinForms
  - ZKTeco SDK
  - PostgreSQL
highlights:
  - 99.9% biometric log sync accuracy
  - ~30% faster burst write throughput
  - Isolated C# WinForms ZKTeco middleware bridge
  - Local offline queue & automatic retry
challenge: Synchronize high-frequency biometric punches from distributed ZKTeco hardware terminals without coupling vendor SDK dependencies to the core API domain.
solution: Isolate the ZKTeco SDK inside a C# WinForms middleware agent with local offline queuing and retry, feeding a Clean Architecture / CQRS .NET attendance API.
role: Backend Developer Intern
period: Jun 2025 – Mar 2026
repo: https://github.com/amhercos/csharp-fingerprint-bridge
confidential: false
---

## Context
AMSentry captures biometric attendance events from distributed campus ZKTeco scanners and persists them into a central relational attendance store.

## Architecture
- **Hardware Edge:** Distributed ZKTeco biometric scanners emitting real-time attendance punches.
- **Middleware Bridge:** C# WinForms agent hosting the hardware SDK listener with local offline queuing and automatic retry.
- **Ingestion API:** .NET Clean Architecture / CQRS batch write pipeline achieving ~30% faster burst write throughput.
- **Persistence:** Central relational attendance and terminal database delivering 99.9% log sync accuracy.
