# Portfolio sprints

Source of truth for `dotnet-portfolio` only. Do not track POS/BizFlow here.

Every sprint and **Now** task must include **End goal** (observable) and **Done when** (stop checklist). Agents stop when Done when is met.

**project-manager** owns this board. Route briefs: **ui-ux-reviewer** (visual) → PM; **brand-designer** (assets, no `global.css`); **mobile-responsive** implements phone CSS → **mobile-qa** gates 390/430 → PM. **code-reviewer** signs off, then **diligent-dev** commits **only when the user asked**. **vercel-deploy** ships only when the user asked, after the mobile QA gate. **resume-steward** owns View/Download + generated PDF. GitHub autodeploy still needs the user (Vercel GitHub App).

`global.css` has one owner at a time. Sequence: implementer → mobile-qa → this board.

## Sprint 1 — Foundation

**Goal:** Own git history on `main`, isolated from POS.

| ID | Task | Status |
| --- | --- | --- |
| S1-1 | Astro + TypeScript project in `C:\Working Directory\dotnet-portfolio` | done |
| S1-2 | `git init -b main` in this folder only | done |
| S1-3 | Project agents: `code-reviewer`, `diligent-dev`, `ui-ux-reviewer`, `project-manager`, `mobile-responsive`, `mobile-qa`, `resume-steward`, `vercel-deploy`, `brand-designer`, `frontend-dev` | done |
| S1-4 | First commit of the site + agents + this board | done |

## Sprint 2 — Proof

**Goal:** Homepage + four case studies that hire for .NET / API / software engineer.

| ID | Task | Status |
| --- | --- | --- |
| S2-1 | Profile, experience, toolkit (employer anonymous, no phone) | done |
| S2-2 | BizFlow case study | done |
| S2-3 | Anonymized legacy SaaS modernization case study | done |
| S2-4 | AMSentry / ZKTeco case study | done |
| S2-5 | ReadToUnlock supporting case study | done |
| S2-6 | Generated `/work/[slug]` routes | done |

## Sprint 3 — Craft

**Goal:** Operational Clarity UI that is distinctive and usable.

| ID | Task | Status |
| --- | --- | --- |
| S3-1 | Design tokens, type, grid, system map | done |
| S3-2 | Impeccable visual pass (hero, cards, case studies) | done |
| S3-3 | Mobile nav, contrast, reduced motion, focus | done |
| S3-4 | Browser visual QA on homepage + one case study | done |

## Sprint 4 — Ship

**End goal:** A hiring manager can open the live site and the résumé without leaks.
**Done when:** `astro check` + build green, Playwright smokes include résumé, README is honest, View/Download works. Autodeploy is user-blocked (S4-6), not a loop.

| ID | Task | Status |
| --- | --- | --- |
| S4-1 | `astro check` + `npm run build` | done |
| S4-2 | Playwright smokes (home, work routes, 404, email) | done |
| S4-3 | Replace starter README with real run/preview notes | done |
| S4-4 | Reviewer-approved commit cadence per finished task | in progress |
| S4-5 | Hosted résumé: `/resume` View + Download PDF generated from `src/data/resume.ts` (not an old Downloads PDF) | done |
| S4-6 | Vercel GitHub App / git autodeploy connected to `amhercos/amhercosaine` | blocked (needs user) |

## Sprint 5 — Mobile production

**End goal:** A hiring manager on an iPhone-class phone can use home, one case study, 404, and `/resume` without horizontal scroll or a broken menu.
**Done when:** `mobile-qa` verdict **ship** (Must-fix empty: nav, overflow, tap targets ≥44px, reduced motion). Desktop personality unchanged.

**Gate:** `mobile-qa` verdict **ship**. Do not deploy until this gate passes (when the user asks `vercel-deploy`).

| ID | Task | Owner | Status |
| --- | --- | --- | --- |
| M5-1 | Overflow, wrapping, hamburger nav, tap targets, email wrap, diagram containment; do not restyle desktop | `mobile-responsive` (implementer) | done |
| M5-1b | `/resume` contact links (email / GitHub / LinkedIn) ≥44px tap targets; print/PDF stays 16–18mm A4 margins | `mobile-responsive` | done |
| M5-2 | Walk homepage → one case study → 404 → `/resume` at 390×844 and ~430; file Must fix / Should fix | `mobile-qa` | next (re-gate after M5-1b) |
| M5-3 | Visual leftover brief after implementer (desktop + phone) | `ui-ux-reviewer` | next (after M5-1) |
| M5-4 | PM boards the QA brief; only then may `vercel-deploy` run (when the user asks) | `project-manager` | blocked on M5-2 **ship** |
| M5-5 | Should-fix: header `.brand` tap target ~37px — enlarge hit area only, not a desktop restyle | `mobile-responsive` | next |

## Sprint 6 — Brand assets

**End goal:** Tab icon and LinkedIn/Slack unfurl look like Operational Clarity (graphite, one cyan accent, the production-boring line).
**Done when:** Favicon + Apple touch + OG image are in `public/`, wired in `BaseLayout`, no extra unused art. Owner: `brand-designer`. Then `code-reviewer` signs off; `diligent-dev` commits only if the user asked.

| ID | Task | Owner | Status |
| --- | --- | --- | --- |
| B6-1 | Geometric favicon + header mark (same asset) | `brand-designer` | in progress |
| B6-2 | Open Graph / Twitter 1200×630-class PNG + meta tags | `brand-designer` | in progress |
| B6-3 | Review sign-off (no commit/deploy unless asked) | `code-reviewer` | next |

## Sprint 7 — Motion

**End goal:** Navigating home → case study → résumé → 404 feels like one product: chrome stays, content fades, mobile menu eases; reduced-motion users get no animation.
**Done when:** `ClientRouter` + content view-transition; drawer is not `display:none` flicker; no new modals; `prefers-reduced-motion` kills motion. Owner: `frontend-dev`.

| ID | Task | Owner | Status |
| --- | --- | --- | --- |
| S7-1 | Persist chrome; fade/rise main content ≤300ms | `frontend-dev` | in progress |
| S7-2 | Mobile nav drawer ease (open/close), not a new modal | `frontend-dev` | in progress |
| S7-3 | Reduced-motion off switch for VT, drawer, reveals | `frontend-dev` | in progress |

## Forgotten-task log

| ID | Task | Status |
| --- | --- | --- |
| F-1 | View/Download résumé button on the page using the **updated** résumé | closed this pass — contact `#contact` + `/resume` toolbar; PDF at `/AmherCosaine-Timpahan-Resume.pdf` |
| F-2 | Mobile production readiness | open — Sprint 5 |
| F-3 | GitHub autodeploy / Vercel git connect | open — do not force-connect; user must install/authorize the Vercel GitHub App on `amhercos/amhercosaine` if autodeploy is desired |

## Rules

- One commit per finished task when the diff is coherent; otherwise one commit per sprint checkpoint.
- Never commit `node_modules/`, `dist/`, `.astro/`, or `.env`.
- Never record the current employer name, a phone number, or Grant Thornton / P&A.
