export const profile = {
  name: 'Amher Cosaine Timpahan',
  shortName: 'Amher Cosaine',
  initials: 'AC',
  role: '.NET Developer',
  targetRoles: ['.NET Developer', 'Software Engineer', 'API Developer'],
  headline: 'I build .NET APIs that keep production boring.',
  intro:
    'I turn complex business rules into clean, testable services—whether the work is a new SaaS platform, a hardware-to-cloud bridge, or a legacy system that needs a modern home.',
  location: 'Taguig, Philippines · Open to remote',
  availability: 'Open to opportunities',
  email: 'amhercosainetimpahan@gmail.com',
  socials: {
    github: 'https://github.com/amhercos',
    linkedin: 'https://www.linkedin.com/in/amhercosaine/',
  },
  about:
    'A systems-oriented .NET developer focused on turning messy operational workflows into reliable APIs with clear boundaries, future-proof design, and production-minded discipline.',
} as const;

export type Profile = typeof profile;

export const proofPoints = [
  { value: '.NET 10', label: 'Web API' },
  { value: 'Clean Arch', label: 'CQRS + DDD' },
  { value: 'Hardware', label: 'Cloud sync' },
  { value: 'Legacy', label: 'Modernization' },
] as const;

export const capabilities = [
  {
    number: '01',
    title: 'Domain-led APIs',
    description:
      'Business rules live in the domain and application layers, not scattered across controllers, jobs, and database triggers.',
    tags: ['Clean Architecture', 'CQRS', 'MediatR'],
  },
  {
    number: '02',
    title: 'Production resilience',
    description:
      'Validation, logging, and exception handling are designed in from the start so failures stay bounded and visible.',
    tags: ['FluentValidation', 'Logging', 'Auth'],
  },
  {
    number: '03',
    title: 'Systems that connect',
    description:
      'I bridge hardware, data stores, and client apps without letting integration glue swallow the core model.',
    tags: ['EF Core', 'PostgreSQL', 'IoT'],
  },
] as const;

export const experience = [
  {
    period: 'Jun 2026 — Present',
    start: '2026-06',
    role: '.NET Developer',
    company: 'Current employer',
    detail:
      'Modernizing a legacy SaaS product into a .NET 10 Web API with Clean Architecture, vertical feature slices, and production-grade validation, auth, and data access. Employer details remain private.',
  },
  {
    period: 'Mar 2026 — Present',
    start: '2026-03',
    role: 'Freelance Full-Stack Developer',
    company: 'BizFlow POS & Inventory',
    engagement: 'Freelance',
    href: '/work/bizflow',
    detail:
      'Built a multi-tenant point-of-sale and inventory SaaS: Clean Architecture .NET API, schema-per-tenant data isolation, promotions and credit flows, and a React Native client for the floor.',
  },
  {
    period: 'Jun 2025 — Mar 2026',
    start: '2025-06',
    role: 'Backend Developer Intern',
    company: "St. Vincent's College Incorporated",
    detail:
      'Built college-wide backend services and a biometric middleware bridge that synchronized fingerprint devices with a central attendance platform.',
  },
  {
    period: 'Jul 2025 — Aug 2025',
    start: '2025-07',
    role: 'Freelance Developer',
    company: 'ReadToUnlock',
    engagement: 'Freelance',
    href: '/work/readtounlock',
    detail:
      'Shipped a React reading-comprehension product with progress-gated unlock logic designed to keep students moving through assigned work.',
  },
] as const;

export const education = {
  degree: 'BS Information Technology',
  school: "St. Vincent's College Incorporated",
  period: '2022 — 2026',
} as const;

export const toolkit = [
  'C#',
  '.NET 10',
  'ASP.NET Core',
  'MediatR / CQRS',
  'Entity Framework Core',
  'FluentValidation',
  'PostgreSQL',
  'SQL Server',
  'Microsoft Entra ID',
  'React / TypeScript',
  'Docker',
  'Git / GitHub',
] as const;
