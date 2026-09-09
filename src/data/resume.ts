import { education, profile } from './profile';

export const resume = {
  name: profile.name,
  legalName: 'Amher Cosaine Miguel Timpahan',
  headline: 'Software Engineer · .NET Developer · API Developer',
  location: 'Taguig, Philippines · Open to remote',
  email: profile.email,
  github: profile.socials.github,
  linkedin: profile.socials.linkedin,
  summary:
    'I build .NET APIs that keep production boring. That means Clean Architecture services, CQRS/MediatR use cases, and data access that hiring managers can reason about—whether the job is a .NET Framework to .NET 10 migration, a multi-tenant SaaS, or a hardware-to-cloud bridge. Business rules stay in the domain, not scattered across controllers and screens.',
  expertise: [
    {
      title: 'Production APIs',
      detail:
        'ASP.NET Core Web APIs with Clean Architecture, vertical slices, CQRS/MediatR, FluentValidation, logging, and exception handling designed in—not bolted on.',
    },
    {
      title: 'Legacy → .NET 10',
      detail:
        'Move living SaaS products off .NET Framework while features stay shippable. Each slice carries a real use case into a testable command or query.',
    },
    {
      title: 'Systems that connect',
      detail:
        'Multi-tenant isolation, dual persistence (PostgreSQL / SQLite), and hardware SDK bridges (ZKTeco) without letting integration glue swallow the core model.',
    },
  ],
  skills: [
    {
      label: 'Backend',
      items: ['.NET 10 / C#', 'ASP.NET Core Web API', 'MediatR / CQRS', 'EF Core', 'FluentValidation', 'LINQ'],
    },
    {
      label: 'Architecture',
      items: ['Clean Architecture', 'DDD-inspired boundaries', 'Vertical slices', 'Repository pattern', 'Multi-tenant SaaS', 'REST'],
    },
    {
      label: 'Data & identity',
      items: ['PostgreSQL', 'SQL Server', 'SQLite', 'Schema-per-tenant', 'Microsoft Entra ID'],
    },
    {
      label: 'Integrations',
      items: ['ZKTeco SDK', 'C# WinForms middleware', 'High-frequency log ingestion', 'React Native clients'],
    },
    {
      label: 'Delivery',
      items: ['React / TypeScript', 'Docker', 'GitHub', 'Azure', 'Vercel'],
    },
  ],
  roles: [
    {
      role: '.NET Developer',
      org: 'Current employer · professional-services SaaS (confidential)',
      period: 'Jun 2026 — Present',
      bullets: [
        'Migrating a production SaaS product from .NET Framework to a .NET 10 Web API without freezing delivery.',
        'Rebuilt the backend as Clean Architecture with vertical feature slices, CQRS/MediatR, and the repository pattern so new work lands in a bounded unit.',
        'Moved business features, endpoints, and data models into the new surface instead of wrapping the legacy graph.',
        'Modernized authentication/authorization, FluentValidation, logging, and exception handling as shared infrastructure.',
      ],
    },
    {
      role: 'Freelance Full-Stack Developer',
      org: 'BizFlow POS & Inventory',
      period: 'Mar 2026 — Present',
      bullets: [
        'Designed a multi-tenant POS and inventory SaaS: ASP.NET Core API, schema-per-tenant isolation on PostgreSQL, SQLite for the local/provider path.',
        'Owned operational domains in the application layer—products, transactions, promotions, customer credit, staff, reporting—so the React Native client does not re-implement retail rules.',
        'Shipped inventory-health alerts (near-expiry / low-stock) and promotional pricing as use cases, not UI logic.',
        'Documented outcomes from project notes: ~40% less coupling across layers; ~20% less wastage from the alert engine.',
      ],
    },
    {
      role: 'Backend Developer Intern',
      org: "St. Vincent's College Incorporated",
      period: 'Jun 2025 — Mar 2026',
      bullets: [
        'Built the AMSentry attendance API (Clean Architecture, CQRS/MediatR) as the system of record for campus biometric stations.',
        'Delivered a C# WinForms middleware bridge to the ZKTeco SDK so fingerprint devices could sync in real time without SDK details leaking into the domain.',
        'Designed a sync engine for bursty, high-frequency punches across remote stations (99.9% accuracy per project notes; ~30% faster API responses for that write path).',
      ],
    },
    {
      role: 'Freelance Developer',
      org: 'ReadToUnlock',
      period: 'Jul 2025 — Aug 2025',
      bullets: [
        'Shipped a React / JavaScript reading-comprehension product whose next activity unlocks only after the current milestone is complete.',
        'Kept progress rules in the product, not the theme—so pacing is obvious to students and hard to skip.',
      ],
    },
  ],
  systems: [
    {
      name: 'BizFlow',
      line: 'Multi-tenant POS/inventory API — Clean Architecture, CQRS, PostgreSQL + SQLite, React Native.',
    },
    {
      name: 'Legacy SaaS modernization',
      line: 'Confidential .NET Framework → .NET 10 Web API with vertical slices, auth, and validation rebuilt.',
    },
    {
      name: 'AMSentry',
      line: 'Hardware-to-cloud attendance — ZKTeco bridge, high-frequency logs, Clean Architecture API.',
    },
    {
      name: 'ReadToUnlock',
      line: 'Progress-gated React learning product; frontend range around a primarily backend career.',
    },
  ],
  education,
} as const;

export const resumePdfHref = '/AmherCosaine-Timpahan-Resume.pdf';
export const resumePdfFilename = 'AmherCosaine-Timpahan-Resume.pdf';
