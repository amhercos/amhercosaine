export type DfdKind = 'entity' | 'process' | 'store';

/** Center point (x, y) and width (w) of a node inside a layout's viewBox. */
export type DfdPos = { x: number; y: number; w: number };

export const DFD_HEIGHTS: Record<DfdKind, number> = {
  entity: 60,
  process: 86,
  store: 56,
};

export type DfdNode = {
  key: string;
  kind: DfdKind;
  /** Gane-Sarson identifier: P1, P2 for processes, D1, D2 for data stores. */
  ref?: string;
  title: string[];
  caption?: string;
  desktop: DfdPos;
  mobile: DfdPos;
  role: string;
  stack: string;
  outcome: string;
};

export type DfdEdge = {
  from: string;
  to: string;
  label: string;
  /** Override for the narrow vertical layout. An empty string hides the label. */
  mobileLabel?: string;
  /** Route the flow under the row (desktop) or along the right side (mobile). */
  arc?: boolean;
};

export type ProjectTheme = 'teal' | 'blue' | 'navy';

export type StudioSystem = {
  slug: string;
  tabLabel: string;
  title: string;
  context: string;
  period: string;
  subtitle: string;
  highlights: string[];
  stackLine: string;
  theme: ProjectTheme;
  desktopViewBox: { w: number; h: number };
  mobileViewBox: { w: number; h: number };
  nodes: DfdNode[];
  edges: DfdEdge[];
  traceOrder: string[];
};

export const studioSystems: StudioSystem[] = [
  {
    slug: 'legacy-saas-modernization',
    tabLabel: '01 Enterprise Multi-Tenant SaaS',
    title: 'Enterprise Multi-Tenant SaaS',
    context: 'Radix Systems Services Corp. (Deployed to P&A Grant Thornton)',
    period: 'Jun 2026 – Present',
    subtitle:
      'Modernizing a legacy .NET Framework application into a Clean Architecture .NET 10 Web API and Next.js frontend on Azure.',
    highlights: [
      'Clean Architecture .NET 10 Web API with a Next.js client',
      'Microsoft Entra ID, OAuth 2.0 SSO, and role-based access control',
      'Scheduled email workers and CSV, XLSX, PDF, and DOCX exports',
    ],
    stackLine:
      'C#, .NET 10, Clean Architecture, CQRS, Next.js, Microsoft Entra ID, OAuth 2.0, SQL Server, EF Core, Serilog, Azure App Service',
    theme: 'teal',
    desktopViewBox: { w: 1040, h: 290 },
    mobileViewBox: { w: 340, h: 540 },
    nodes: [
      {
        key: 'users',
        kind: 'entity',
        title: ['Enterprise Users'],
        desktop: { x: 85, y: 85, w: 140 },
        mobile: { x: 90, y: 40, w: 140 },
        role: 'Staff who sign in to run day-to-day workflows and reports.',
        stack: 'Next.js web client',
        outcome: 'One sign-in across the platform.',
      },
      {
        key: 'admins',
        kind: 'entity',
        title: ['Tenant Admins'],
        desktop: { x: 85, y: 215, w: 140 },
        mobile: { x: 250, y: 40, w: 140 },
        role: 'Administrators who manage users, roles, and tenant settings.',
        stack: 'Next.js web client',
        outcome: 'Self-service tenant administration.',
      },
      {
        key: 'auth',
        kind: 'process',
        ref: 'P1',
        title: ['Entra ID &', 'OAuth2 Auth'],
        desktop: { x: 290, y: 150, w: 140 },
        mobile: { x: 170, y: 150, w: 210 },
        role: 'Authenticates enterprise identities and applies role-based access.',
        stack: 'Microsoft Entra ID, OAuth 2.0, ASP.NET Core Identity, RBAC',
        outcome: 'Single sign-on with scoped roles.',
      },
      {
        key: 'api',
        kind: 'process',
        ref: 'P2',
        title: ['.NET 10', 'Clean Arch API'],
        desktop: { x: 495, y: 150, w: 140 },
        mobile: { x: 170, y: 270, w: 210 },
        role: 'Runs business use cases behind typed REST endpoints.',
        stack: '.NET 10, Clean Architecture, CQRS, EF Core, Serilog',
        outcome: 'Features ship as small, testable slices.',
      },
      {
        key: 'workers',
        kind: 'process',
        ref: 'P3',
        title: ['Scheduled Workers', '& Exports'],
        desktop: { x: 700, y: 150, w: 140 },
        mobile: { x: 170, y: 390, w: 210 },
        role: 'Sends scheduled emails and builds reports in the background.',
        stack: 'IHostedService, CSV, XLSX, PDF, DOCX',
        outcome: 'Long jobs never block user requests.',
      },
      {
        key: 'sql',
        kind: 'store',
        ref: 'D1',
        title: ['SQL Server'],
        caption: 'Relational & Audit Store',
        desktop: { x: 935, y: 150, w: 190 },
        mobile: { x: 170, y: 500, w: 240 },
        role: 'Holds tenant business data and audit history.',
        stack: 'SQL Server, EF Core, Azure DevOps releases',
        outcome: 'One relational source of truth.',
      },
    ],
    edges: [
      { from: 'users', to: 'auth', label: 'Sign in' },
      { from: 'admins', to: 'auth', label: 'Sign in' },
      { from: 'auth', to: 'api', label: 'Token' },
      { from: 'api', to: 'workers', label: 'Jobs' },
      { from: 'workers', to: 'sql', label: 'Persist' },
      { from: 'api', to: 'sql', label: 'Read / Write', mobileLabel: 'Query', arc: true },
    ],
    traceOrder: ['users', 'auth', 'api', 'workers', 'sql'],
  },
  {
    slug: 'bizflow',
    tabLabel: '02 BizFlow POS & Inventory',
    title: 'BizFlow POS & Inventory',
    context: 'Freelance Full-Stack Developer, Multi-Tenant Retail SaaS',
    period: 'Mar 2026 – Aug 2026',
    subtitle:
      'Multi-tenant retail POS and inventory SaaS built with .NET 10, PostgreSQL, SQLite offline support, and React Native.',
    highlights: [
      'Schema-per-tenant PostgreSQL keeps each store’s data separate',
      'SQLite cache keeps the cashier app usable offline',
      'GitHub Actions builds and ships Docker images',
    ],
    stackLine:
      'C#, .NET 10, CQRS / MediatR, PostgreSQL, SQLite, EF Core, Serilog, React Native (Expo), GitHub Actions, Docker',
    theme: 'blue',
    desktopViewBox: { w: 1040, h: 280 },
    mobileViewBox: { w: 340, h: 440 },
    nodes: [
      {
        key: 'pos',
        kind: 'entity',
        title: ['Cashier Mobile App'],
        caption: 'React Native (Expo)',
        desktop: { x: 110, y: 85, w: 170 },
        mobile: { x: 170, y: 40, w: 220 },
        role: 'Checkout app used by cashiers on the store floor.',
        stack: 'React Native, Expo, TypeScript',
        outcome: 'Fast checkout on any connection.',
      },
      {
        key: 'sqlite',
        kind: 'store',
        ref: 'D1',
        title: ['SQLite'],
        caption: 'Offline Cache',
        desktop: { x: 110, y: 225, w: 180 },
        mobile: { x: 85, y: 150, w: 150 },
        role: 'Local cache that holds sales while the store is offline.',
        stack: 'SQLite, Expo',
        outcome: 'Sales keep moving through outages.',
      },
      {
        key: 'api',
        kind: 'process',
        ref: 'P1',
        title: ['.NET 10', 'Multi-Tenant API'],
        desktop: { x: 400, y: 150, w: 160 },
        mobile: { x: 255, y: 150, w: 150 },
        role: 'Authenticates staff and routes each request to its tenant.',
        stack: '.NET 10, ASP.NET Core, JWT',
        outcome: 'Many retail clients on one deployment.',
      },
      {
        key: 'engine',
        kind: 'process',
        ref: 'P2',
        title: ['Order, Promo &', 'Inventory Engine'],
        desktop: { x: 650, y: 150, w: 160 },
        mobile: { x: 170, y: 280, w: 220 },
        role: 'Handles orders, promotions, and stock alerts.',
        stack: 'CQRS, MediatR, FluentValidation, Serilog',
        outcome: 'Retail rules live in one place.',
      },
      {
        key: 'postgres',
        kind: 'store',
        ref: 'D2',
        title: ['PostgreSQL'],
        caption: 'Schema-per-Tenant',
        desktop: { x: 905, y: 150, w: 190 },
        mobile: { x: 170, y: 395, w: 240 },
        role: 'Cloud store with a separate schema for every client.',
        stack: 'PostgreSQL, EF Core, Docker',
        outcome: 'Clean data separation per client.',
      },
    ],
    edges: [
      { from: 'pos', to: 'sqlite', label: 'Cache' },
      { from: 'pos', to: 'api', label: 'Sync orders' },
      { from: 'sqlite', to: 'api', label: 'Replay', mobileLabel: '' },
      { from: 'api', to: 'engine', label: 'Commands' },
      { from: 'engine', to: 'postgres', label: 'Persist' },
    ],
    traceOrder: ['pos', 'sqlite', 'api', 'engine', 'postgres'],
  },
  {
    slug: 'amsentry',
    tabLabel: '03 AMSentry Biometric Attendance',
    title: 'AMSentry Biometric Attendance',
    context: "St. Vincent's College Incorporated, Hardware-to-Cloud Platform",
    period: 'Jun 2025 – Mar 2026',
    subtitle:
      '.NET Clean Architecture and CQRS attendance API paired with a C# WinForms biometric hardware bridge.',
    highlights: [
      '99.9% log sync accuracy across campus scanners',
      '~30% faster burst write throughput',
      'Hardware SDK kept out of the core API',
    ],
    stackLine:
      'C#, .NET, ASP.NET Core, Clean Architecture, CQRS / MediatR, C# WinForms, ZKTeco SDK, PostgreSQL',
    theme: 'navy',
    desktopViewBox: { w: 1040, h: 220 },
    mobileViewBox: { w: 340, h: 420 },
    nodes: [
      {
        key: 'scanners',
        kind: 'entity',
        title: ['ZKTeco Biometric', 'Scanners'],
        desktop: { x: 120, y: 110, w: 170 },
        mobile: { x: 170, y: 40, w: 220 },
        role: 'Fingerprint terminals that record attendance punches.',
        stack: 'ZKTeco hardware',
        outcome: 'Punches captured at every station.',
      },
      {
        key: 'bridge',
        kind: 'process',
        ref: 'P1',
        title: ['C# WinForms', 'Bridge'],
        desktop: { x: 390, y: 110, w: 160 },
        mobile: { x: 170, y: 150, w: 220 },
        role: 'Listens to the scanner SDK and forwards punches, retrying when offline.',
        stack: 'C# WinForms, ZKTeco SDK',
        outcome: '99.9% sync accuracy.',
      },
      {
        key: 'api',
        kind: 'process',
        ref: 'P2',
        title: ['.NET CQRS', 'Attendance API'],
        desktop: { x: 650, y: 110, w: 160 },
        mobile: { x: 170, y: 270, w: 220 },
        role: 'Ingests punches on a dedicated write path, separate from reports.',
        stack: '.NET, Clean Architecture, CQRS / MediatR',
        outcome: '~30% faster burst writes.',
      },
      {
        key: 'db',
        kind: 'store',
        ref: 'D1',
        title: ['Central Attendance', 'Database'],
        desktop: { x: 905, y: 110, w: 190 },
        mobile: { x: 170, y: 380, w: 240 },
        role: 'Central record of attendance and terminal data.',
        stack: 'PostgreSQL, Npgsql',
        outcome: 'One trusted record for campus operations.',
      },
    ],
    edges: [
      { from: 'scanners', to: 'bridge', label: 'Punch events' },
      { from: 'bridge', to: 'api', label: 'Batch sync' },
      { from: 'api', to: 'db', label: 'Persist' },
    ],
    traceOrder: ['scanners', 'bridge', 'api', 'db'],
  },
];

export function getStudioSystem(slug: string): StudioSystem | undefined {
  return studioSystems.find((item) => item.slug === slug);
}
