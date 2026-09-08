import { education, profile } from './profile';

export const resume = {
  name: profile.name,
  legalName: 'Amher Cosaine Miguel Timpahan',
  headline: 'Software Engineer · .NET Developer · Backend / API Developer',
  location: 'Taguig, Philippines',
  email: profile.email,
  github: profile.socials.github,
  linkedin: profile.socials.linkedin,
  summary:
    'Systems-oriented .NET developer. I design Clean Architecture APIs, migrate legacy SaaS onto .NET 10, and connect hardware and data stores to cloud business logic without scattering rules across controllers.',
  skills: [
    {
      label: 'Backend',
      items: ['.NET 10 / C#', 'ASP.NET Core Web API', 'MediatR / CQRS', 'EF Core', 'FluentValidation', 'LINQ'],
    },
    {
      label: 'Architecture',
      items: ['Clean Architecture', 'DDD', 'Repository pattern', 'Vertical slices', 'Multi-tenant SaaS', 'REST'],
    },
    {
      label: 'Data & identity',
      items: ['PostgreSQL', 'SQL Server', 'SQLite', 'Microsoft Entra ID'],
    },
    {
      label: 'Clients & delivery',
      items: ['React', 'TypeScript', 'React Native (Expo)', 'Docker', 'GitHub', 'Azure'],
    },
  ],
  roles: [
    {
      role: '.NET Developer',
      org: 'Current employer',
      period: 'Jun 2026 — Present',
      bullets: [
        'Migrating a production SaaS product from .NET Framework to a .NET 10 Web API while keeping features shippable.',
        'Redesigned the backend with Clean Architecture, vertical feature slices, CQRS/MediatR, and the repository pattern.',
        'Modernized authentication/authorization, FluentValidation, logging, and exception handling as shared infrastructure.',
      ],
    },
    {
      role: 'Freelance Full-Stack Developer',
      org: 'BizFlow POS & Inventory (SaaS)',
      period: 'Mar 2026 — Present',
      bullets: [
        'Built a multi-tenant POS and inventory platform with schema-per-tenant isolation on ASP.NET Core and PostgreSQL.',
        'Applied Clean Architecture, CQRS/MediatR, and DDD-inspired boundaries; dual persistence for PostgreSQL and SQLite.',
        'Shipped promotions, customer credit, reporting, and near-expiry / low-stock alerts consumed by a React Native client.',
      ],
    },
    {
      role: 'Backend Developer Intern',
      org: "St. Vincent's College Incorporated",
      period: 'Jun 2025 — Mar 2026',
      bullets: [
        'Built the AMSentry attendance API with Clean Architecture and CQRS/MediatR for high-frequency log ingestion.',
        'Delivered a C# WinForms middleware bridge to ZKTeco fingerprint scanners for real-time sync into a central database.',
        'Designed a sync engine for thousands of attendance events across remote stations (99.9% accuracy per project notes).',
      ],
    },
    {
      role: 'Freelance Developer',
      org: 'ReadToUnlock',
      period: 'Jul 2025 — Aug 2025',
      bullets: [
        'Shipped a React reading-comprehension product with milestone pacing and progress-gated unlocks.',
      ],
    },
  ],
  education,
} as const;

export const resumePdfHref = '/AmherCosaine-Timpahan-Resume.pdf';
export const resumePdfFilename = 'AmherCosaine-Timpahan-Resume.pdf';
