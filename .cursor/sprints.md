# Portfolio sprints

Source of truth for `dotnet-portfolio` only. Do not track POS/BizFlow here.
Use **code-reviewer** before each checkpoint, then **diligent-dev** to commit that sprint’s completed tasks.

## Sprint 1 — Foundation

**Goal:** Own git history on `main`, isolated from POS.

| ID | Task | Status |
| --- | --- | --- |
| S1-1 | Astro + TypeScript project in `C:\Working Directory\dotnet-portfolio` | done |
| S1-2 | `git init -b main` in this folder only | done |
| S1-3 | Project agents: `code-reviewer`, `diligent-dev` | done |
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
| S3-4 | Browser visual QA on homepage + one case study | todo |

## Sprint 4 — Ship

**Goal:** Build is green and the site is previewable without leaks.

| ID | Task | Status |
| --- | --- | --- |
| S4-1 | `astro check` + `npm run build` | done |
| S4-2 | Playwright smokes (home, work routes, 404, email) | done |
| S4-3 | Replace starter README with real run/preview notes | done |
| S4-4 | Reviewer-approved commit cadence per finished task | in progress |

## Rules

- One commit per finished task when the diff is coherent; otherwise one commit per sprint checkpoint.
- Never commit `node_modules/`, `dist/`, `.astro/`, or `.env`.
- Never record the current employer name or a phone number.
