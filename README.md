# Amher Cosaine Timpahan — .NET portfolio

Standalone Astro site for hiring-manager review. Target roles: **.NET Developer**, **Software Engineer**, **API Developer**.

The current employer is kept anonymous. There is no phone number and no résumé PDF on this site.

## Preview locally

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Local preview at `localhost:4321` |
| `npm run check` | TypeScript / Astro diagnostics |
| `npm run build` | `astro check` then production static build into `./dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Playwright smokes (homepage, case studies, contact email, 404) |

## What is on the site

- Homepage: profile, selected systems, approach, experience, toolkit, contact
- Case studies at `/work/bizflow`, `/work/legacy-saas-modernization`, `/work/amsentry`, `/work/readtounlock`
- Contact: [amhercosainetimpahan@gmail.com](mailto:amhercosainetimpahan@gmail.com), plus GitHub and LinkedIn

## Notes

- Static output (`astro.config.mjs` `output: 'static'`). Sitemap and `robots.txt` ship with the build.
- Visual system is Operational Clarity: dark operations-console layout, IBM Plex, restrained cyan/green status signals.
