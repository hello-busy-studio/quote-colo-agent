# QuoteColo — website design system

- `DESIGN.md` — the complete design specification of the QuoteColo website (tokens, typography, grid, components, page content, responsive rules, behaviour).
- `assets/` — logos, icons, illustrations, images, pattern, favicon, OG image.
- `reference/` — visual reference renders (not used in the build).
- `example/` — reference HTML/CSS/JS implementation built strictly from `DESIGN.md` (home page, Boston location page, thank-you placeholder).

## Run the example locally

```bash
python3 -m http.server 4173 --directory example
```

Then open http://localhost:4173 and http://localhost:4173/boston/.
