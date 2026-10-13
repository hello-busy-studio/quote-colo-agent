# QuoteColo — website design system

This repository is the single source of truth for the QuoteColo website design. It holds:

- **the rules**: `DESIGN.md`, a complete spec any AI or developer can build an identical site from;
- **three working example pages** built strictly from those rules;
- **a workflow** for turning any new page (Word doc, live web page, Figma) into a page in the same design.

New here? Start with **[GETTING-STARTED.md](GETTING-STARTED.md)**.

## The three example pages

| Page | Route | What it shows |
|---|---|---|
| Home | `/` | The full design system in use: hero, metrics, listings strip, cards, chat, testimonials, quote forms, market rows, video, FAQ, footer, quote modal. |
| Boston location page | `/boston/` | A location page: facility and price tables with horizontal scroll on mobile. |
| AI & HPC land page | `/ai-hpc-land/` | A page **redesigned from a Word document** using the §15 workflow — new blocks (listing table, criteria pairs, claim cards, grouped tables) built on the same grid. Its report is in `pages/ai-hpc-land.md`. |

`/thank-you/` is a placeholder for the page shown after a form is sent.

## Folders

```
DESIGN.md              The design spec. Tokens, type, grid, components, responsive rules,
                       behaviour, all page copy, and §15 "Building new blocks".
GETTING-STARTED.md     How to start working (for managers).
CLAUDE.md / AGENTS.md  Instructions the AI follows when you open this repo in Claude or another AI tool.

example/               The example site (plain HTML/CSS/JS, no build step).
  index.html           Home page
  boston/              Boston location page
  ai-hpc-land/         AI & HPC land page (redesign example)
  thank-you/           Placeholder
  styles.css, main.js  Shared styles and behaviour for every page
  assets/              Copy of assets/ used by the site

pages/                 One report per redesigned page: source → blocks mapping,
                       design variants (A/B/C), TODO list. Example: ai-hpc-land.md

assets/                Master assets: logo, icons (20/24 px), illustrations, images,
                       pattern, favicon set, OG image.
reference/             Reference renders of the original design (for viewing only, not used by the site).
```

## Run the examples locally

Ask Claude: *"show me the example pages"*. Or run it yourself in Terminal, from this folder:

```bash
python3 -m http.server 4173 --directory example
```

Then open http://localhost:4173, http://localhost:4173/boston/ and http://localhost:4173/ai-hpc-land/.

## Rules of the repository

- Every change to the site is also recorded in `DESIGN.md` — the spec and the examples never disagree.
- Changes go through a branch and a pull request; the busy.studio designer reviews them.
