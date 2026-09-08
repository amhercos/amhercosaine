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
3. `npx vercel` (preview) then `npx vercel --prod` only after they approve the preview URL.
4. Tell **project-manager** the live URL. Commits (config/site URL) go through **code-reviewer** then **diligent-dev**.
5. Never commit Vercel tokens or `.env`.
