# asgiraldoc.github.io

Academic website of Axl S. Cepeda. Built with [Astro](https://astro.build), English and Spanish, deployed to GitHub Pages with GitHub Actions.

## Preview locally

Requires Node.js 22 or newer (`brew install node` on macOS).

```bash
npm install
npm run dev          # http://localhost:4321, live reload
npm run build        # production build into dist/
npm run preview      # serves dist/ exactly as GitHub Pages will
```

Use `npm run build && npm run preview` to check the game and the Darwin vs Kropotkin lab: the dev server does not serve their `index.html` folders.

## Updating content

| What | Where |
|---|---|
| Add a publication | Add an entry at the top of `src/data/publications.yml` |
| Update the CV | Replace `public/cv/CV_Axl-Cepeda.pdf` (keep the file name) |
| Text of any page (EN + ES) | `src/i18n/content.ts` |
| Links, email, analytics ID | `src/config.ts` |
| Colors and typography | `src/styles/global.css` (tokens at the top) |
| Games and interactive projects | `public/projects/` |

Pending items are marked with `TODO:`. List them with `npm run todos`.

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site. In the repository settings, set **Pages → Source** to **GitHub Actions** (one time).
