export type ArchTone = 'client' | 'api' | 'app' | 'domain' | 'data' | 'device' | 'legacy';

export type ArchNode = {
  id: string;
  name: string;
  tags: string[];
  detail: string;
  snippet?: string;
  tone: ArchTone;
};

export type ArchLane = {
  id: string;
  index: string;
  label: string;
  hint: string;
  nodes: ArchNode[];
};

export type ArchFlow = {
  label: string;
  detail: string;
};

export type ArchStudio = {
  title: string;
  caption: string;
  kind: 'layers' | 'pipeline' | 'strangler' | 'gate';
  lanes: ArchLane[];
  flows: ArchFlow[];
  path: string[];
};

export const systems: Record<string, ArchStudio> = {
  bizflow: {
    title: 'BizFlow · request path',
    caption: 'The React Native POS sends commands over HTTPS. The API authenticates, MediatR runs the use case, the domain enforces rules, then PostgreSQL or SQLite commits.',
    kind: 'layers',
    path: [
      'POS screen sends a command over HTTPS',
      'Web API authenticates staff, does not price the cart',
      'MediatR handler runs the sale / credit / promo use case',
      'Domain enforces stock, credit, and tenant boundaries',
      'Provider writes PostgreSQL (cloud) or SQLite (local)',
    ],
    flows: [
      { label: 'HTTPS + JWT', detail: 'React Native and the web console use the same JSON contracts.' },
      { label: 'MediatR IRequest', detail: 'One command maps to one handler. Controllers stay thin.' },
      { label: 'Use case → domain', detail: 'Handlers orchestrate. Invariants stay in the domain.' },
      { label: 'Provider port', detail: 'Application code does not depend on which database is in use.' },
    ],
    lanes: [
      {
        id: 'client',
        index: '01',
        label: 'Client tier',
        hint: 'Surfaces',
        nodes: [
          {
            id: 'rn-pos',
            name: 'React Native POS',
            tags: ['sales', 'credits', 'stock'],
            tone: 'client',
            detail: 'Floor client. It posts commands and renders receipts. Promotional pricing is not calculated on the device.',
            snippet: 'POST /transactions  →  SaleReceipt',
          },
          {
            id: 'web-ops',
            name: 'Web ops console',
            tags: ['catalog', 'staff', 'reports'],
            tone: 'client',
            detail: 'Back office for products, promotions, staff access, and dashboards. Same API contracts as mobile; different screens.',
          },
        ],
      },
      {
        id: 'api',
        index: '02',
        label: 'API boundary',
        hint: 'ASP.NET Core',
        nodes: [
          {
            id: 'web-api',
            name: 'ASP.NET Core Web API',
            tags: ['REST', 'Clean Architecture'],
            tone: 'api',
            detail: 'Endpoints are shaped like operations—products, transactions, promotions, credits, dashboard, staff, settings—not like pages.',
            snippet: 'MapGroup("/transactions")',
          },
          {
            id: 'auth',
            name: 'Tenant + auth',
            tags: ['middleware', 'JWT'],
            tone: 'api',
            detail: 'Tenant middleware selects the store schema before a handler runs. Staff JWTs stay at the edge so a cashier cannot reach another tenant’s data.',
          },
          {
            id: 'hw',
            name: 'Hardware bridge APIs',
            tags: ['ZKTeco', 'RFID'],
            tone: 'device',
            detail: 'Optional staff enrollment beside checkout. Attendance hardware is a separate bridge API, not part of the ticket command.',
          },
        ],
      },
      {
        id: 'app',
        index: '03',
        label: 'Application',
        hint: 'CQRS / MediatR',
        nodes: [
          {
            id: 'sales',
            name: 'Sales',
            tags: ['command', 'receipt'],
            tone: 'app',
            detail: 'Checkout is a command. The handler orchestrates pricing, stock reservation, and the receipt. The UI waits for the result.',
          },
          {
            id: 'inventory',
            name: 'Inventory',
            tags: ['query', 'alerts'],
            tone: 'app',
            detail: 'Low-stock and near-expiry alerts live here, not as ad hoc queries in the UI.',
          },
          {
            id: 'credits',
            name: 'Credits',
            tags: ['ledger', 'limits'],
            tone: 'app',
            detail: 'Customer credit is a ledger use case. The client displays the balance; it does not calculate one.',
          },
          {
            id: 'promos',
            name: 'PromotionEngine',
            tags: ['CalculatePrice', 'bundles'],
            tone: 'app',
            detail: 'Buy-X-for-Y and tie-up discounts are calculated here so two clients cannot disagree on a price. ValidationBehavior runs before every MediatR handler.',
            snippet: 'CalculatePrice(ticket) → SaleReceipt',
          },
          {
            id: 'dash',
            name: 'Dashboard',
            tags: ['query', 'reports'],
            tone: 'app',
            detail: 'Read models for operations. Queries do not apply write rules.',
          },
        ],
      },
      {
        id: 'domain',
        index: '04',
        label: 'Domain',
        hint: 'Boundaries',
        nodes: [
          {
            id: 'pricing',
            name: 'Pricing rules',
            tags: ['DDD', 'invariants'],
            tone: 'domain',
            detail: 'Line-item pricing rules. Special cases still belong in the domain, not in a screen.',
          },
          {
            id: 'health',
            name: 'Stock health',
            tags: ['expiry', 'reorder'],
            tone: 'domain',
            detail: 'Expiry and reorder facts drive alerts. A dashboard timer does not invent them.',
          },
          {
            id: 'tenant',
            name: 'Tenant boundary',
            tags: ['isolation', 'schema'],
            tone: 'domain',
            detail: 'One deployment, many businesses. Isolation is by schema, not by hoping every query includes a tenant filter.',
          },
        ],
      },
      {
        id: 'data',
        index: '05',
        label: 'Persistence',
        hint: 'Provider split',
        nodes: [
          {
            id: 'pg',
            name: 'PostgreSQL',
            tags: ['per-tenant schema', 'query filters'],
            tone: 'data',
            detail: 'Cloud path. One schema per business. StoreMigrationWatchdog patches tenant schemas on demand. Global query filters enforce isolation and soft-delete.',
            snippet: 'Search Path = tenant_{id}',
          },
          {
            id: 'sqlite',
            name: 'SQLite',
            tags: ['EF Core', 'local / provider'],
            tone: 'data',
            detail: 'Local or alternate provider. Same application ports; different infrastructure adapter. The domain does not depend on which store answered.',
          },
        ],
      },
    ],
  },

  amsentry: {
    title: 'AMSentry · hardware to record',
    caption: 'The WinForms bridge normalizes a ZKTeco punch and POSTs it to the API. The API is the system of record; the station process is the hardware adapter.',
    kind: 'pipeline',
    path: [
      'ZKTeco device emits a biometric punch',
      'WinForms bridge talks SDK and POSTs the event (5s timeout)',
      'Network fail → offline_queue.json; 4xx is not retried',
      'CQRS ingest writes the punch; reports stay on the query side',
      'Templates sync over Npgsql, not through the ingest controller',
    ],
    flows: [
      { label: 'ZKTeco SDK', detail: 'The vendor SDK stays on the station. The domain does not import a scanner DLL.' },
      { label: 'HTTP POST', detail: 'Normalized punches hit the attendance API. Burst handling belongs in the API, not on the device.' },
      { label: 'CQRS + templates', detail: 'Writes go through ingest. Reads go through queries. Enrollment talks to PostgreSQL over Npgsql so it does not wait on ingest.' },
    ],
    lanes: [
      {
        id: 'device',
        index: '01',
        label: 'Device edge',
        hint: 'Stations',
        nodes: [
          {
            id: 'zk',
            name: 'ZKTeco scanners',
            tags: ['fingerprint', 'burst logs'],
            tone: 'device',
            detail: 'Remote fingerprint stations. A missed punch affects payroll, so the bridge must queue rather than drop events.',
          },
        ],
      },
      {
        id: 'bridge',
        index: '02',
        label: 'Station bridge',
        hint: 'C# middleware',
        nodes: [
          {
            id: 'winforms',
            name: 'WinForms host',
            tags: ['C#', 'SDK host'],
            tone: 'client',
            detail: 'Windows process that hosts the vendor SDK. The SDK required this host; the API does not.',
          },
          {
            id: 'sync',
            name: 'Sync + offline queue',
            tags: ['HTTP POST', 'JSON queue'],
            tone: 'app',
            detail: 'Posts a normalized punch with a short timeout. Timeouts and 5xx go to a local JSON queue beside the executable. HTTP 4xx (bad id) is not retried.',
            snippet: 'POST /fingerprint/log-attendance',
          },
        ],
      },
      {
        id: 'api',
        index: '03',
        label: 'AMSentry API',
        hint: 'Clean Architecture',
        nodes: [
          {
            id: 'ingest',
            name: 'Ingest commands',
            tags: ['MediatR', 'writes'],
            tone: 'api',
            detail: 'High-frequency write path. Built to absorb bursts without blocking the rest of the API.',
          },
          {
            id: 'query',
            name: 'Attendance queries',
            tags: ['CQRS', 'reads'],
            tone: 'api',
            detail: 'Campus operations read from here. Opening a report does not block ingest.',
          },
          {
            id: 'admin',
            name: 'Admin use cases',
            tags: ['stations', 'policy'],
            tone: 'domain',
            detail: 'Separate handlers for administration. SDK details stay out of these use cases.',
          },
        ],
      },
      {
        id: 'store',
        index: '04',
        label: 'System of record',
        hint: 'Central DB',
        nodes: [
          {
            id: 'db',
            name: 'Attendance PostgreSQL',
            tags: ['punches', 'templates'],
            tone: 'data',
            detail: 'Stores punches and fingerprint templates. The station also upserts templates over Npgsql so enrollment does not wait on the ingest pipeline. 99.9% sync accuracy is from the original notes.',
          },
        ],
      },
    ],
  },

  'legacy-saas-modernization': {
    title: 'Legacy SaaS · strangler path',
    caption: 'The Framework app keeps serving. Each feature moves as a vertical slice: command or query, then validation, authorization, and logging.',
    kind: 'strangler',
    path: [
      'Legacy endpoint still serves the living product',
      'A feature is cut out as a vertical slice',
      'MediatR handler + FluentValidation replace the mixed concern',
      'Repository talks to the modern data layer',
      'Auth, logging, and exceptions stay shared infrastructure',
    ],
    flows: [
      { label: 'Slice cutover', detail: 'One use case at a time so delivery does not stop for a full rewrite.' },
      { label: 'MediatR', detail: 'Mixed legacy methods become IRequest handlers with a single job.' },
      { label: 'Shared edge', detail: 'Validation, auth, logging, and exceptions live in shared infrastructure, not in every endpoint.' },
    ],
    lanes: [
      {
        id: 'legacy',
        index: '01',
        label: 'Source · .NET Framework',
        hint: 'Still live',
        nodes: [
          {
            id: 'framework',
            name: 'Legacy SaaS',
            tags: ['.NET Framework', 'mixed concerns'],
            tone: 'legacy',
            detail: 'Business rules, data access, and API shape lived in the same methods. That is the constraint the migration has to respect.',
          },
          {
            id: 'coupled',
            name: 'Coupled surface',
            tags: ['behavior to keep'],
            tone: 'legacy',
            detail: 'Keep the behavior callers already depend on. Contracts cannot change silently while features move.',
          },
        ],
      },
      {
        id: 'modern',
        index: '02',
        label: 'Target · .NET 10 API',
        hint: 'Vertical slices',
        nodes: [
          {
            id: 'net10',
            name: '.NET 10 Web API',
            tags: ['ASP.NET Core', 'Clean Architecture'],
            tone: 'api',
            detail: 'Replacement host. Features migrate in as slices. Legacy code is not forwarded wholesale.',
            snippet: 'WebApplication.CreateBuilder → Map slice',
          },
          {
            id: 'slices',
            name: 'Feature slices',
            tags: ['CQRS', 'MediatR'],
            tone: 'app',
            detail: 'One folder, one use case. A new command does not reopen the full legacy graph.',
          },
          {
            id: 'validation',
            name: 'Cross-cutting',
            tags: ['FluentValidation', 'auth', 'logging'],
            tone: 'domain',
            detail: 'Validation, authentication, authorization, logging, and exception handling are shared infrastructure, not copied per endpoint.',
          },
          {
            id: 'repo',
            name: 'Repository + SQL',
            tags: ['EF Core', 'data models'],
            tone: 'data',
            detail: 'Persistence behind a repository. Models move with the slice rather than in a second full rewrite.',
          },
        ],
      },
    ],
  },

  readtounlock: {
    title: 'ReadToUnlock · progress gate',
    caption: 'The next reading opens only after the current milestone is complete. The next screen does not mount until the student confirms they read the word.',
    kind: 'gate',
    path: [
      'Student submits an assigned word',
      'Word stays on screen until they confirm they read it',
      'Chest unlocks; a weighted roll picks game or treat',
      'Reset to the next word. The skip path is not mounted.',
    ],
    flows: [
      { label: 'hasReadWord', detail: 'The next UI does not mount until the student confirms the read.' },
      { label: 'Unlock chest', detail: 'The chest is the reward gate after confirmation.' },
      { label: '60 / 20 / 20', detail: 'Mini-game, chocolate, or sticker, then the next word.' },
    ],
    lanes: [
      {
        id: 'ui',
        index: '01',
        label: 'Student surface',
        hint: 'React',
        nodes: [
          {
            id: 'ui',
            name: 'WordInput',
            tags: ['React', 'assigned word'],
            tone: 'client',
            detail: 'The session starts with a word to read. Empty input does not start the flow. Client-only React on Vercel; there is no attendance API behind this product.',
          },
        ],
      },
      {
        id: 'task',
        index: '02',
        label: 'Current work',
        hint: 'Assigned reading',
        nodes: [
          {
            id: 'task',
            name: 'WordDisplay',
            tags: ['hasReadWord'],
            tone: 'app',
            detail: 'The word stays on screen until the student confirms they read it. The chest does not mount until hasReadWord is true.',
            snippet: 'hasReadWord === true',
          },
        ],
      },
      {
        id: 'engine',
        index: '03',
        label: 'Unlock chest',
        hint: 'Gate',
        nodes: [
          {
            id: 'engine',
            name: 'ChestSelection',
            tags: ['unlock gate'],
            tone: 'domain',
            detail: 'The next UI does not mount until read confirmation fires, so skip-ahead is not available in this flow.',
            snippet: 'hasReadWord → mount chest',
          },
        ],
      },
      {
        id: 'gate',
        index: '04',
        label: 'Unlock gate',
        hint: 'Policy',
        nodes: [
          {
            id: 'gate',
            name: 'Weighted roll',
            tags: ['60 / 20 / 20'],
            tone: 'domain',
            detail: 'After the chest: 60% a mini-game, 20% chocolate, 20% sticker. The last game is remembered so the next roll does not immediately repeat. A later API could own this policy; for the original scope, it lives in the client.',
          },
          {
            id: 'next',
            name: 'Next word',
            tags: ['reset loop'],
            tone: 'data',
            detail: 'Claiming a reward or finishing a game resets the flow. Seven mini-games sit on the 60% path. The next word does not appear until this loop completes.',
          },
        ],
      },
    ],
  },
};

export function getSystem(slug: string): ArchStudio | undefined {
  return systems[slug];
}
