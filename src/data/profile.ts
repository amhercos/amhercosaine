export const profile = {
  name: 'Amher Cosaine Timpahan',
  shortName: 'Amher Cosaine',
  role: '.NET Developer, Backend & API Engineer',
  availability: 'Open to .NET Backend & Full-Stack Roles, Hybrid or Remote',
  targetRoles: ['.NET Developer', 'Backend & API Engineer', 'Full-Stack Engineer'],
  headline: 'Amher Cosaine Timpahan',
  thesis:
    'Building Clean Architecture .NET 10 Web APIs, modernizing legacy .NET Framework systems, and shipping multi-tenant Azure SaaS.',
  intro:
    'Building Clean Architecture .NET 10 Web APIs, modernizing legacy .NET Framework systems, and shipping multi-tenant Azure SaaS.',
  location: 'Taguig, Philippines (Remote-ready)',
  email: 'amhercosainetimpahan@gmail.com',
  socials: {
    github: 'https://github.com/amhercos',
    linkedin: 'https://www.linkedin.com/in/amhercosaine/',
  },
  about:
    '.NET Developer building Clean Architecture .NET 10 Web APIs, modernizing legacy .NET Framework systems, and shipping multi-tenant Azure SaaS.',
} as const;

export type Profile = typeof profile;

export type ExperienceItem = {
  period: string;
  start: string;
  mode: string;
  role: string;
  company: string;
  href?: string;
  impacts: { lead: string; text: string }[];
};

export const experience: ExperienceItem[] = [
  {
    period: 'Jun 2026 – Present',
    start: '2026-06',
    mode: 'Client deployment',
    role: '.NET Developer Consultant',
    company: 'Radix Systems Services Corp. (Deployed to P&A Grant Thornton)',
    href: '/work/legacy-saas-modernization',
    impacts: [
      {
        lead: 'API Modernization:',
        text: 'Moving a legacy .NET Framework app to a Clean Architecture .NET 10 API and Next.js.',
      },
      {
        lead: 'Legacy Maintenance:',
        text: 'Shipped enhancements and fixes on the existing .NET Framework Razor system.',
      },
      {
        lead: 'Enterprise Auth:',
        text: 'Implemented Microsoft Entra ID, OAuth 2.0 SSO, ASP.NET Core Identity, and RBAC.',
      },
      {
        lead: 'Workers & Delivery:',
        text: 'Built scheduled email and export workers with Azure DevOps App Service releases.',
      },
    ],
  },
  {
    period: 'Mar 2026 – Aug 2026',
    start: '2026-03',
    mode: 'Freelance',
    role: 'Freelance Full-Stack Developer',
    company: 'BizFlow POS & Inventory',
    href: '/work/bizflow',
    impacts: [
      {
        lead: 'Multi-Tenant SaaS:',
        text: 'Built a .NET 10 and PostgreSQL backend with schema-per-tenant isolation.',
      },
      {
        lead: 'Mobile & Domain:',
        text: 'Shipped CQRS order, promo, and inventory services with a React Native POS.',
      },
      {
        lead: 'Delivery:',
        text: 'Added Serilog telemetry, stock alerts, and GitHub Actions Docker deployments.',
      },
    ],
  },
  {
    period: 'Jun 2025 – Mar 2026',
    start: '2025-06',
    mode: 'Internship',
    role: 'Backend Developer Intern',
    company: "St. Vincent's College Incorporated",
    href: '/work/amsentry',
    impacts: [
      {
        lead: 'Attendance API:',
        text: 'Built a .NET Clean Architecture and CQRS API with ~30% faster burst writes.',
      },
      {
        lead: 'Hardware Bridge:',
        text: 'Engineered a C# WinForms ZKTeco bridge reaching 99.9% sync accuracy.',
      },
    ],
  },
];

export const education = {
  degree: 'B.S. in Information Technology',
  school: "St. Vincent's College Incorporated",
  period: '2022 – 2026',
} as const;

export type SkillGroupKey = 'backend' | 'identity-cloud' | 'databases' | 'frontend';

export type SkillCategory = {
  category: string;
  filterKey: SkillGroupKey;
  items: string[];
};

export const skillMatrix: SkillCategory[] = [
  {
    category: 'Backend & Architecture',
    filterKey: 'backend',
    items: [
      'C#',
      '.NET 10 / .NET Core',
      '.NET Framework (ASP.NET MVC / Razor Pages)',
      'ASP.NET Core Web API',
      'Clean Architecture',
      'Vertical Slice Architecture',
      'DDD',
      'CQRS / MediatR',
      'Entity Framework Core',
      'LINQ',
      'FluentValidation',
    ],
  },
  {
    category: 'Observability & Background Jobs',
    filterKey: 'backend',
    items: [
      'IHostedService Workers',
      'Serilog',
      'ProblemDetails Middleware',
      'Swagger / OpenAPI',
      'Multi-Format Exports (CSV, XLSX, PDF, DOCX)',
    ],
  },
  {
    category: 'Identity & Access',
    filterKey: 'identity-cloud',
    items: [
      'Microsoft Entra ID',
      'ASP.NET Core Identity',
      'OAuth 2.0 / OIDC SSO (Microsoft & Google)',
      'JWT',
      'Role-Based Access Control (RBAC)',
    ],
  },
  {
    category: 'Cloud, DevOps & Hardware',
    filterKey: 'identity-cloud',
    items: [
      'Azure App Service',
      'Azure DevOps (Repos, Artifacts, Releases)',
      'GitHub Actions (CI/CD)',
      'Docker',
      'Git',
      'IIS',
      'ZKTeco SDK',
      'C# WinForms Middleware',
    ],
  },
  {
    category: 'Databases & Modeling',
    filterKey: 'databases',
    items: [
      'SQL Server',
      'PostgreSQL (Schema-per-Tenant Isolation)',
      'MySQL',
      'SQLite',
      'EF Core Migrations',
      'ACID Transactions',
      'ERD & Gane-Sarson DFD',
    ],
  },
  {
    category: 'Frontend & Mobile',
    filterKey: 'frontend',
    items: ['React', 'Next.js', 'TypeScript', 'React Native (Expo)', 'JavaScript', 'Tailwind CSS'],
  },
];
