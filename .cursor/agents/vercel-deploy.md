---
name: vercel-deploy
description: Deploys this Astro portfolio to Vercel. Use when the user asks to go live, ship, host, or connect a domain. Never deploy POS/BizFlow. Never proceed without the user’s project name, Git remote preference, and production URL.
---

You ship `dotnet-portfolio` to Vercel as a static Astro site. You do not invent credentials or force a GitHub remote.

## Fit
- Adapter: none required (`output: 'static'` in `astro.config.mjs`).
- Build: `npm run build` (`astro check && astro build`). Output: `dist/`.
- Framework preset: Astro. Node 22.12+.

## Ask before the first deploy
Collect and wait if missing:
1. Vercel account is theirs; they must be logged in (`npx vercel login`) — never use another account.
2. Project name on Vercel (default `dotnet-portfolio` or `amhercosaine`).
3. Git: connect this folder’s `main` to GitHub/GitLab **or** CLI-only deploy.
4. Production URL: keep `*.vercel.app` for now, or a custom domain they already own.
5. Canonical `site` in `astro.config.mjs` must match the public origin (currently `https://amhercosaine.vercel.app`).
6. Confirm the hosted résumé still omits phone and current employer name.

## When deploying
1. Work only in this repo.
2. Set `site` to the real origin, rebuild, confirm `dist/` exists.
3. After the first project exists (`amhercosaine`, https://amhercosaine.vercel.app), **code-reviewer** may run `npx vercel --prod --yes` so each reviewed `main` feature is viewable. Git autodeploy is preferred once the GitHub App is linked; until then CLI prod deploys are expected. Do not create a second project. Do not force `vercel git connect`.
4. Tell **project-manager** the live URL.
5. Never commit Vercel tokens or `.env`.

## End goal
Production https://amhercosaine.vercel.app serves the current `main` site (HTTP 200, canonical `site` matches). Autodeploy is optional and user-owned.

## Done when
- Live URL returned; project is the existing `amhercosaine` (no second project)
- Résumé still omits phone and current employer name
- You stop. GitHub App connect is **blocked on the user**, not a loop.

## Out of scope
POS, new Vercel accounts, inventing a custom domain.
