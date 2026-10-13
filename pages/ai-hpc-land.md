# AI & HPC land page — redesign report

Source: Word document with 11 wireframes (`Документ Microsoft Word.docx`, wireframes only, copy embedded in the images).
Built by: `DESIGN.md` §15. Example: `example/ai-hpc-land/index.html` (route `/ai-hpc-land/`).

## 1. Mapping

| # | Source section | New section | Recipe | Notes |
|---|---|---|---|---|
| 1 | Hero: "Find AI and HPC land with power available today" + photo + CTA | Hero | R2 (adapted) | Subtitle added under `h1` (`.t-body-l` secondary, gap 24); right column = photo 588×518, radius 24 instead of the founder composition. CTA "Tell us your specs" opens the Quote modal. |
| 2 | 4 stats (12+ sites, 1MW–1GW+, from 4¢/kWh, off-market) | Metric row | R3 (adapted) | No icon tiles (values are too wide for a tile at 40 px). |
| 3 | Active listings table (11 rows) | Active listings | **R23 new** | Caption "Updated August, 2026" above the table. |
| 4 | "Tell us your MW target" + 3 badges + form | Quote panel (band) | R12 (adapted) | Subtitle inside the panel; 2 of 3 benefits are title-only; form note replaces the legal line; button "Get my site options". |
| 5 | How it works, 4 steps | How it works | R5 (adapted) | 4 × 3 col cards, padding 24, titles `.t-h4`, text `.t-body`. |
| 6 | Words from our clients (carousel #1) | — | — | Merged with #10 (one testimonials block per page, §15.6). |
| 7 | What makes land data-center-ready, 6 criteria | Criteria (band) | **R24 new** | |
| 8 | What an MW listing actually tells you, 7 claims + bar | Listing claims | **R25 new** | 7th claim highlighted with `card-accent` (not a dark panel — no dark surfaces in the system). |
| 9 | The 2026 land market, 3 groups + tables | Land market | **R26 new** | |
| 10 | Founder quote (Bob) | Founder quote | R13 | Founder panel with the existing portrait. |
| 11 | Words from our clients (MW specific) | Testimonials | R11 | Content TODO. |
| 12 | "Tell us your requirements" form | Quote panel compact | R12 compact | Second conversion block on the lower half of the page. |
| 13 | For landowners & sellers: 6 features + platform panel + stats | Landowners (band) | R4 + R7 + R3 | Section head gets an Accent tag as eyebrow; 6 cards as 3 × 2 (4 col); platform panel = R7 split card; stats = 3 metric cards. |
| 14 | FAQ in 2 groups | FAQ | R17 (adapted) | Group labels `.t-caption-medium` tertiary, sentence case (no uppercase in the system). |

Page rhythm: hero → metrics → listings → **blue panel** (band) → steps → criteria (band) → claims → market → founder → testimonials → **blue panel** compact → landowners (band) → FAQ. Two blue panels, never adjacent; bands never back-to-back.

## 2. Variants (new / adapted blocks)

**R23 Listing table**
- A — Matrix table like R19 (bordered grid, gradient header), cells left-aligned, second line in caption tertiary, Buy/Lease as tags under the site name. **Recommended** (dense data, 6 columns, scannable).
- B — Facility table like R18 (zebra rows, vertical dividers). Calmer, but zebra + two-line cells gets noisy with 11 rows.
- C — Card per listing (3 × 4 col). Best on mobile, but loses side-by-side comparison of rates and prices.

**R24 Criteria pairs**
- A — White cards 3 × 4 col on a gradient band; "Look for" Accent tag + text, divider, "Red flag" Error tag (red text on 10% red) + text. **Chosen**.
- B — Same, "Red flag" as a Neutral tag. Calmer, but the warning reads weaker.
- C — R8 comparison rows (criterion left 3 col, look-for / red-flag right 9 col). Good for long texts, too long a page for 6 short items.

**R25 Claim → verify cards**
- A — 3 × 2 `card-gradient` cards (number badge + title; "What the listing shows" value `.t-h3`; divider; "What to verify" question + answer) + 7th as full-width `card-accent` in two halves + note bar with button. **Recommended**.
- B — R8 rows: claim on the left, verify on the right. Reads like an article, less scannable.
- C — Matrix table (claim | listing shows | verify). Compact, but loses the big values that make the point.

**R26 Grouped market tables**
- A — One `card-gradient` per segment: title + range tag (+ note tag) + text + bordered table. **Recommended** (mirrors the source, segments stay separate).
- B — One table with segment header rows. Shorter, but segment descriptions get lost.
- C — R4 cards per market. Loses the price comparison.

**Other adaptations** (no variants needed): R2 with photo + subtitle, R3 without icons, R5 with 4 steps, R12 copy changes, R17 groups, section head with eyebrow tag.

## 3. TODO / to confirm

- Hero photo (aerial view of a powered site) — the wireframe only contains a low-res screenshot; placeholder used.
- Seller dashboard screenshot for the platform panel — placeholder used.
- Testimonials (MW-specific) — 4 placeholder cards.
- FAQ answers (7).
- Denver, CO row: rate is empty in the source and price says "see left" — both shown as TODO.
- Form fields: the wireframe shows 4 empty fields; the standard First/Last/Email/Phone fields are used. Confirm.
- The form note replaced the "Terms and Conditions" line — confirm whether the legal line must stay.
- Links: "Create Your Seller Account", "How It Works", "Read More" → `#`.
- Icon for "NDAs & Confidentiality Protected" — the set has no shield; `mail` used. Consider adding a shield icon to the set.

## 4. Copy fixes applied

- "Varified" → "Verified"; "Tell Us Your specs" → "Tell us your specs"; "A110" → "A100" (GPU model); hero eyebrow got a closing period.
- Hyphens used as dashes → em/en dashes per §0 rule 7.
- The landowners statement "Built for landowners. Trusted by developers. More visibility. More control. Better results." was dropped — the 3 stats below carry the same message (§15.8 rule: no duplicate content). Restore if needed.
- Metric captions were restructured to fit the metric cards: "12+ / Available sites · US & Canada", "1 MW–1 GW+ / Available load", "4¢/kWh / From · Texas greenfield", "Off-market / Included · never listed publicly".
