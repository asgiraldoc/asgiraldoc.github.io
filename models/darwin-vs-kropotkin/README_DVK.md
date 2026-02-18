# Darwin vs Kropotkin page + lab (drop-in bundle)

This bundle is meant to be copied into your Jekyll repo (`asgiraldoc.github.io`).

## What it adds

- A modern “paper” layout (`_layouts/paper.html`) + stylesheet (`assets/css/paper.css`).
- Language toggle (EN/ES) + a simple on-page TOC (no Jekyll plugins required).
- A deep essay page: `models/darwin-vs-kropotkin/index.md`
- A Spanish placeholder page: `es/models/darwin-vs-kropotkin/index.md`
- An interactive lab (iframe-friendly):
  - `models/darwin-vs-kropotkin/lab/index.html`
  - `models/darwin-vs-kropotkin/lab/lab.js`
  - `models/darwin-vs-kropotkin/lab/lab.css`
  - `models/darwin-vs-kropotkin/lab/i18n/en.json` (+ es.json)
- Figures (SVG/PNG): `models/darwin-vs-kropotkin/figures/*`
- Optional GitHub Action to auto-translate EN -> ES:
  - `.github/workflows/translate-es.yml`
  - `scripts/translate_en_to_es.py`

## IMPORTANT: avoid conflict with the existing simulator

Right now your repo already has:

`models/darwin-vs-kropotkin/index.html` (React/Vite build)

That will conflict with the new Jekyll page `models/darwin-vs-kropotkin/index.md`.

### Recommended migration

1) Move the old file to a subfolder, keeping assets where they are:

- Move: `models/darwin-vs-kropotkin/index.html` → `models/darwin-vs-kropotkin/app/index.html`
- Keep: `models/darwin-vs-kropotkin/assets/` unchanged

Because the old index.html references assets by absolute path `/models/darwin-vs-kropotkin/assets/...`, it will still work.

2) Copy the bundle contents into your repo root.

3) Commit + push.

Now you should have:

- Essay: `/models/darwin-vs-kropotkin/`
- Lab: `/models/darwin-vs-kropotkin/lab/`
- Legacy UI: `/models/darwin-vs-kropotkin/app/`

## Auto-translation (optional)

If you enable the workflow:

- Edit ONLY the English source page:
  - `models/darwin-vs-kropotkin/index.md`
- On push, the action regenerates:
  - `es/models/darwin-vs-kropotkin/index.md`
  - `models/darwin-vs-kropotkin/lab/i18n/es.json`

Notes:
- The workflow commits back to the repo. If your branch is protected, you’ll need to allow GitHub Actions to push (or adjust strategy to deploy-pages).

