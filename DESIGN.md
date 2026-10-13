# QuoteColo — DESIGN.md

The complete, self-contained specification of the QuoteColo marketing website (desktop, 1440 px).
Everything needed to build the site is in this file and in the `assets/` folder next to it.

---

## 0. How to use this document (read first)

These rules exist so that every build of this site looks **identical**.

1. **Follow the values literally.** Every size, color, font, gap, radius, text and image is specified. Do not round, "improve", re-interpret or substitute.
2. **Do not invent.** If something is not described here, it does not exist: no extra sections, decorations, shadows, gradients, hover effects, animations, icons, badges, dividers, emojis or copy.
3. **Use only the tokens from §2.** No raw hex values, pixel values or font settings in component CSS except the ones written in this document.
4. **Use the copy from §9 verbatim**, including punctuation, quotes («», “”), dashes (– for ranges, — for pauses), capitalization and forced line breaks (`<br>`).
5. **Missing content is marked `TODO`** (§12). Render the placeholder exactly as described there; never write your own text, images or links.
6. **Text wraps naturally** inside the specified widths, except where `<br>` is given. Do not add `text-wrap: balance`, hyphenation or manual breaks.
7. **Typography rule:** put a non-breaking space (`&nbsp;`) between a number and its unit (`48&nbsp;hours`, `1&nbsp;MW`, `15–60&nbsp;kW`) and before an em dash (`weeks&nbsp;— and`). In §9 these are already written as `&nbsp;`.
8. **Three layouts:** desktop (≥ 1280), tablet (768–1279), mobile (< 768). Everything in §4–§9 describes desktop; §3.5 lists every value that changes on tablet and mobile. Anything not listed in §3.5 stays as on desktop.

---

## 1. Build rules

- Semantic HTML5 + CSS custom properties (§2, §11). No CSS framework, no UI kit, no icon font.
- Global reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }` · `img, svg, video { display: block; }` · `button { font: inherit; color: inherit; border: 0; background: none; cursor: pointer; }` · `a { color: inherit; text-decoration: none; }` · `ul, ol { list-style: none; }`.
- `html { scroll-behavior: smooth; }` · `body { background: var(--color-bg-main); color: var(--color-text-primary); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }`.
- Font: **Schibsted Grotesk** 400 / 500 / 600 from Google Fonts — `https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&display=swap`. No other font anywhere.
- Icons: inline SVG from `assets/icons/`. They use `currentColor`; set their color with CSS `color`.
- Images: `<img>` with explicit `width`/`height`; `object-fit` as given in §5; `loading="lazy"` for everything below the hero.
- Page language `en`. Every image has the `alt` given in §5 / §9.

---

## 2. Tokens

### 2.1 Color

| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#131D2C` | Headings, body, default text |
| `--color-text-secondary` | `#424B57` | Subtitles, descriptions, timestamps, input placeholders |
| `--color-text-tertiary` | `#7B7E8C` | Captions, field labels, eyebrows, meta labels |
| `--color-text-accent` | `#0C7DFF` | Links, accent labels, icons |
| `--color-text-accent-hover` | `#0A6CDD` | Hover of accent text links |
| `--color-bg-main` | `#FFFFFF` | Page, white cards, white icon tiles |
| `--color-bg-subtle` | `#F8FAFC` | Services explorer card, hero quote card |
| `--color-bg-secondary` | `#D1D6E5` | Inactive indicator bars |
| `--color-bg-tertiary` | `#F4F4F6` | Neutral tags, hero portrait backdrop |
| `--color-bg-accent` | `#0C7DFF` | Primary buttons, quote panels, active bars |
| `--color-bg-accent-pale` | `rgba(12, 125, 255, 0.10)` | Accent tags, icon tiles, highlighted cards |
| `--color-bg-accent-pale-hover` | `rgba(12, 125, 255, 0.20)` | Hover of pale-accent controls |
| `--color-bg-accent-pale-solid` | `#E7F2FF` | Founder chat bubble |
| `--color-bg-inverse` | `#131D2C` | Footer |
| `--color-border-neutral` | `#E9E9EB` | Card borders, input borders, dividers |
| `--color-border-neutral-hover` | `#CECECE` | Input hover border |
| `--color-border-accent` | `#0C7DFF` | Outline button border, focus ring |
| `--color-error` | `#FF3419` | Error message text and error input border |
| `--color-disabled` | `#D1D6E5` | Disabled buttons, inputs, carousel arrows |
| `--color-white` | `#FFFFFF` | Text and icons on accent / dark / photo |
| `--color-white-hover` | `rgba(255, 255, 255, 0.80)` | Hover of white links and the play button |
| `--color-white-pressed` | `rgba(255, 255, 255, 0.60)` | Pressed play button |
| `--color-on-inverse-muted` | `rgba(255, 255, 255, 0.20)` | Footer hours and legal links |
| `--color-on-inverse-divider` | `rgba(255, 255, 255, 0.05)` | Footer vertical dividers |
| `--color-overlay-media` | `rgba(19, 29, 44, 0.35)` | Dimming on case-study thumbnails |
| `--color-overlay-video` | `rgba(0, 0, 0, 0.20)` | Dimming on the large video poster |
| `--color-overlay-modal` | `rgba(0, 0, 0, 0.20)` | Modal backdrop |
| `--color-pattern-line` | `#E1E6F5` | Blueprint pattern lines (already baked into the pattern files) |

The logo artwork contains its own blue `#3176E3`; never use that color in UI.

### 2.2 Surfaces

```css
--surface-gradient: linear-gradient(160deg,
  rgba(236, 238, 243, 0.40) 0%,
  rgba(240, 243, 253, 0.40) 53%,
  rgba(242, 244, 252, 0.50) 100%);
```
The gradient is translucent: always paint it **on top of white** — `background: var(--surface-gradient), var(--color-bg-main);`.

**Blueprint pattern** — `assets/pattern/pattern-tile.png` (482×309) / `pattern-tile@2x.png`: a grid of 1 px lines in `#E1E6F5` on transparent. Use as `background-image` with `background-repeat: repeat; background-size: 482px 309px;` and `background-position: 0 0` unless stated otherwise.
Used in: hero portrait frame, conversation panel, founder-message portrait area, quote panels and modal (the latter three at 20 % opacity).

**Accent + pattern surface** (quote panels, modal) — one background, no pseudo-element (a `::before` layer leaks outside a scrolling modal):
```css
--accent-pattern: linear-gradient(rgba(12, 125, 255, 0.8), rgba(12, 125, 255, 0.8)),
                  url(pattern-tile@2x.png) 0 0 / 482px 309px repeat,
                  var(--color-bg-accent);
```
(80 % accent over the pattern = pattern lines at 20 % opacity on accent.)

### 2.3 Typography

| Class | Size / line-height | Weight | Letter-spacing |
|---|---|---|---|
| `.t-h1` | 64 / 64 | 600 | −0.02em |
| `.t-h2` | 48 / 48 | 600 | −0.02em |
| `.t-metric` | 40 / 40 | 600 | −0.02em |
| `.t-h3` | 32 / 40 | 600 | −0.02em |
| `.t-h4` | 24 / 28 | 600 | −0.02em |
| `.t-lead` | 24 / 28 | 400 | −0.02em |
| `.t-body-l-medium` | 20 / 24 | 500 | −0.02em |
| `.t-body-l` | 20 / 24 | 400 | −0.02em |
| `.t-body-medium` | 16 / 20 | 500 | −0.02em |
| `.t-body` | 16 / 20 | 400 | −0.02em |
| `.t-caption-medium` | 14 / 16 | 500 | −0.02em |
| `.t-caption` | 14 / 16 | 400 | −0.02em |

Only these 12 styles exist (plus the two badge sizes in §4); their tablet/mobile sizes are in §3.5. **Letter-spacing is −0.02em (−2 %) for every text on the site**, including buttons, tags, badges and inputs. **All headings and subtitles are left-aligned**; the only centered texts are button labels, number badges and the video prompt. No uppercase, no italics. Underline only on footer legal links.

### 2.4 Spacing (4 px grid)

`--space-1: 4px · --space-2: 8px · --space-3: 12px · --space-4: 16px · --space-5: 20px · --space-6: 24px · --space-7: 28px · --space-8: 32px · --space-10: 40px · --space-12: 48px · --space-14: 56px · --space-16: 64px · --space-20: 80px · --space-30: 120px`

### 2.5 Radius

`--radius-12: 12px · --radius-14: 14px · --radius-16: 16px · --radius-24: 24px · --radius-full: 9999px`

- **Every rounded rectangle uses a radius between 12 and 24.** 12 — tags, inputs, icon tiles 32/40, option cards, carousel arrows, accordion toggles; 14 — small buttons; 16 — cards, large buttons, panels, images, dropdown; 24 — large media and big panels.
- Exceptions (too small for 12): `tile-20` / `tile-20-wide` radius 6, `tile-nav` radius 4, indicator bars and circles use `--radius-full`.
- **iOS-style smoothing (60 %) on every rounded corner:** add `corner-shape: superellipse(1.5);` next to every `border-radius` (browsers without support fall back to the plain radius — that is acceptable). Do not change the radius values to compensate.

### 2.6 Shadow

`--shadow-button: 0 4px 4px rgba(12, 89, 255, 0.03), 0 8px 8px rgba(12, 89, 255, 0.04);` — Filled and Outline buttons, and the nav dropdown panel. No other element has a shadow.

### 2.7 Motion

`--ease: cubic-bezier(0.2, 0, 0, 1) · --dur-fast: 150ms · --dur-base: 200ms · --dur-slow: 300ms · --dur-hover: 300ms · --dur-reveal: 700ms`

- **Every hover / press** (buttons, links, tiles, arrows, burger, chips, contacts): `transition: color var(--dur-hover) var(--ease), background-color var(--dur-hover) var(--ease), border-color var(--dur-hover) var(--ease), box-shadow var(--dur-hover) var(--ease);`
- **Appearance on scroll** (§8.10) and **smooth scrolling** (§8.9) are on everywhere.
- Under `prefers-reduced-motion: reduce`: all durations `0ms`, no reveal (content visible immediately), no smooth scrolling, marquee static, Services autoplay off (active bar shown full).

### 2.8 Layers

`--z-header: 100 · --z-dropdown: 110 · --z-modal: 200`

### 2.9 Focus

Buttons, links, chips and controls: `:focus-visible { outline: 2px solid var(--color-border-accent); outline-offset: 2px; }`. No outline on mouse focus. Inputs are the exception (§6.2).

---

## 3. Layout

### 3.1 Page frame

- Design width **1440**. Content container **1200**, centered (= 120 px side margins at 1440): `.container { width: 1200px; margin-inline: auto; }`.
- Section backgrounds (white, gradient band, dark footer) are always full viewport width; content sits in `.container`.
- Above 1440 the container stays 1200 and centered. Below 1280 the tablet and mobile layouts from §3.5 apply.

### 3.2 Grid

12 columns × 78 px, gutter 24 px (= 1200). Span widths: 3 col 282 · 4 col 384 · 5 col 486 · 6 col 588 · 7 col 690 · 8 col 792 · 9 col 894 · 12 col 1200.

### 3.3 Section heading

```
.section-head   width 588 or 690 (given per section) · flex column · gap 16
  h2.t-h2       text-primary
  p.t-lead      text-secondary (optional)
```
Section head → section content: **40 px**.

### 3.4 Vertical rhythm (exact)

"Gap before" = empty space between the previous block's bottom and this block's top, painted in the given background.

| # | Block | Gap before | Gap background |
|---|---|---|---|
| 0 | Header (sticky, 104 high) | — | — |
| 1 | Hero | 0 | white |
| 2 | Trust metrics | 32 | white |
| 3 | Band A (gradient) starts | 32 | white |
| 3a | Deployment options | 80 | gradient |
| — | Band A ends | 80 | gradient |
| 4 | Provider network | 80 | white |
| 5 | How it works | 120 | white |
| 6 | Request-to-quotes example | 120 | white |
| 7 | How we match you | 120 | white |
| 8 | Client testimonials | 120 | white |
| 9 | Band B (gradient) starts | 80 | white |
| 9a | Quote request — with benefits | 80 | gradient |
| — | Band B ends | 80 | gradient |
| 10 | Colocation market reality | 80 | white |
| 11 | Band C (gradient) starts | 80 | white |
| 11a | Capacity search comparison | 80 | gradient |
| 11b | Who we help | 120 | gradient |
| — | Band C ends | 80 | gradient |
| 12 | Case studies | 80 | white |
| 13 | Founder message | 120 | white |
| 14 | Quote request — compact | 120 | white |
| 15 | Meet Bob Spiegel (video) | 120 | white |
| 16 | Provider network (same as #4) | 120 | white |
| 17 | Services | 120 | white |
| 18 | FAQ | 120 | white |
| 19 | Footer | 120 | white |

Implementation: each block is a `<section>` with `padding-top` = its gap; a band is a wrapper `<div class="band">` with `background: var(--surface-gradient), var(--color-bg-main); padding-block: 80px;` around its sections.

### 3.5 Responsive (tablet & mobile)

Styles (colors, font, radii, surfaces, shadows, icons, copy) never change between breakpoints. Only sizes, spacing and arrangement change — exactly as listed here. Anything not listed keeps its desktop value.

#### 3.5.1 Breakpoints & frame

| | Desktop | Tablet | Mobile |
|---|---|---|---|
| Viewport | ≥ 1280 | 768–1279 | < 768 (designed at 360, min 320) |
| Container | 1200 fixed, centered | fluid, side padding 32 | fluid, side padding 16 |
| Grid | 12 col · gutter 24 | 8 col · gutter 24 | 4 col · gutter 16 |
| Header height | 104 | 80 | 64 |
| Gap between sections (same bg) | 120 | 80 | 48 |
| Band inner padding (top/bottom) | 80 | 56 | 32 |
| Hero → Trust, Trust → Band A | 32 | 32 | 24 |
| Section head → content | 40 | 32 | 24 |
| Section head: title ↔ subtitle | 16 | 12 | 12 |
| Card grid gaps (24 on desktop) | 24 | 16 | 16 |
| Card grid gaps (16 on desktop) | 16 | 16 | 12 |
| Card padding (24 on desktop) | 24 | 24 | 16 |
| Large panel padding (32 / 40 on desktop) | 32 / 40 | 24 / 32 | 16 / 16 |

Rule of air (applies everywhere): spacing inside an element is always smaller than spacing between elements, which is smaller than spacing between sections. When in doubt, keep the order padding < gap between cards < section gap.

#### 3.5.2 Type scale

| Class | Desktop | Tablet | Mobile |
|---|---|---|---|
| `.t-h1` | 64/64 | 48/52 | 32/40 |
| `.t-h2` | 48/48 | 36/40 | 28/32 |
| `.t-metric` | 40/40 | 32/36 | 28/32 |
| `.t-h3` | 32/40 | 28/32 | 24/28 |
| `.t-h4` | 24/28 | 24/28 | 20/24 |
| `.t-lead` | 24/28 | 20/24 | 16/20 |
| `.t-body-l`, `.t-body-l-medium` | 20/24 | 18/24 | 16/24 |
| `.t-body`, `.t-body-medium` | 16/20 | 16/20 | 16/20 |
| `.t-caption`, `.t-caption-medium` | 14/16 | 14/16 | 12/16 |

Weights and letter-spacing (−0.02em) never change. Trust-metric values on mobile use 24/24 (they sit in 2-column cards). Forced line breaks (`<br>`) in §9 apply on desktop only; on tablet and mobile all `<br>` inside headings and card descriptions are ignored (`display: none` on a `.br-desktop` span), except in the chat messages (§9.6) where they stay.

#### 3.5.3 Components

| Component | Tablet | Mobile |
|---|---|---|
| Button L | 64 high | 56 high, padding 0 32, label 18/20 500; **full width** of its container |
| Button S | 52 high | 48 high, padding 0 24, label 16/20 500; full width inside cards |
| Text button | unchanged | unchanged |
| Input | 48 high, text 18/24 | 48 high, text 16/24 |
| Textarea | 136 high | 120 high |
| Tag | 32 high | 28 high, padding 0 10, text 12/16 |
| `tile-40` | 40 | 32 (icon 20, badge text 14px) |
| Play button | 72 | 48 (triangle 10×12) |
| Carousel controls | shown when the row scrolls | shown when the row scrolls; margin-top 24 |
| Accordion toggle | 40 | 32 (icon 20) |
| Modal | width 640, padding 40 | width `calc(100% - 32px)`, padding 24 16, gap 24; close icon 24 at top 16 / right 16; max-height `calc(100dvh - 32px)` |

#### 3.5.4 Header (tablet & mobile)

- Height 80 (tablet) / 64 (mobile); `.container` padding as in §3.5.1.
- Left: logo — tablet 146×48, mobile 121×40. Right: burger button — `tile-40` with bg `--color-bg-accent-pale`, icon `menu.svg` 24 in `--color-text-accent`; hover bg `--color-bg-accent-pale-hover` (`--dur-hover`). When the menu is open the same tile shows `close.svg`. Nav items and the header CTA are hidden.
- **Mobile menu** (opens from the burger): fixed panel below the header, full width, height `calc(100dvh - header height)`, bg `--color-bg-main`, padding 24 16 (mobile) / 32 32 (tablet), flex column, `overflow-y: auto`, page scroll locked. The burger icon becomes `close.svg`.
  - 5 menu items as rows: `button`, full width, height 56, `justify-content: space-between`, label `.t-h4` `--color-text-primary` + `tile-nav` chevron; separated by 1 px `--color-border-neutral` (bottom border). Tap opens the item's links below it (accordion, one open at a time): links `.t-body-medium`, gap 16, padding 0 0 16 0.
  - At the bottom (margin-top auto): Button L Filled "Get my quote", full width.
  - Closes on close icon, on link tap, on `Esc`. No animation.

#### 3.5.5 Sections

| § | Section | Tablet | Mobile |
|---|---|---|---|
| 9.1 | Hero | One column. Order: eyebrow → h1 → CTA bar (width 100%, max 557) → caption (gap 24) → portrait block (gap 48). Portrait block: 100% wide, max 588, aspect 588/518, same composition as desktop scaled proportionally (frame 83 % width, right-aligned; quote card 70 % width bottom-left). | One column. Eyebrow → h1 (gap 16) → CTA bar: stacked, text group then full-width Button L, padding 16, gap 16, width 100% → caption (gap 16) → portrait (gap 40): frame 100% wide, aspect 486/459, image bleeds 13 % of frame height above it → quote card **below** the frame (static, full width, margin-top 16, radius 0 24 0 24, padding 16). |
| 9.2 | Trust metrics | Grid 2×2, gap 16. | Grid 2×2, gap 12; card padding 16; tile-32 (icon 20); value 24/24. |
| 9.3 | Deployment options | Grid 2×2, gap 16, cards auto height (row-equal). | Horizontal scroll row (`overflow-x: auto; scroll-snap-type: x mandatory`), cards 286 wide, gap 16, snap start, padding-inline 16 (track bleeds to the screen edges); button full width. |
| 9.4 | Provider network | Tiles 240×100, logos scaled 85 %. | Tiles 200×80, logos scaled 70 %, gap 16; heading → marquee gap 24. |
| 9.5 | How it works | One column, cards full width, auto height, gap 16; bottom block always directly under the description (gap 32). | Same as tablet; card padding 24; notice text wraps (left-aligned). |
| 9.6 | Request example | Panel padding 24. Each message: sender row **above** the bubble (gap 12). Option cards side by side (gap 16). | Panel padding 16, messages gap 24. Sender above bubble; bubble padding 16; timestamp moves **below** the text (gap 12). Option cards stacked (gap 12), card padding 16. |
| 9.7 | How we match | Image card full width (max 384, left-aligned), then criteria in 2 columns (gap 16). | Image card 100% wide, radius 16, gradient surface, no padding; image aspect 384/330 → criteria one column, order 1→7, gap 12. Criterion text width = 100% − tile − gap. |
| 9.8 | Testimonials | Carousel, cards 336 wide, controls shown. | Carousel, cards 286 wide, gap 16, controls hidden; card gap 24 (instead of 40). |
| 9.9 / 9.15 | Quote panels | One column: left block (heading → benefits → logo, gap 32) then form card full width (gap 32). Compact form keeps two columns. | One column, panel padding 24 16 16 16; benefits gap 16; logo 120×40 (with benefits) / 154×50 (compact); form card padding 16, all fields stacked; submit row stacked: legal text then full-width button (gap 16). |
| 9.10 | Market reality | Row: label above the content (stacked), row padding 24 0. Quote: quote-mark above the card (gap 16), mark 64×64. | Same as tablet; mark 48×48; card padding 16. |
| 9.11 | Capacity search | Grid 2×2 (gap 16). Button L width auto. | One column, gap 12; Button L full width. |
| 9.12 | Who we help | Large card: stacked — content then image (100% wide, aspect 536/403), padding 32. Use-case cards grid 2×2, gap 16. | Large card padding 16, gap 24, h3 with no `<br>`; Button L full width. Use-case cards: horizontal scroll row, cards 286 wide, gap 16. |
| 9.13 | Case studies | Two cards side by side (gap 16); media aspect 588/320; controls hidden. | Horizontal scroll row, cards 296 wide, gap 16; media 296×200; play button 48. |
| 9.14 | Founder message | Panel stacked: quote block (padding 32 32 0 32), gap 32, then portrait area full width (bleeds to the panel edges), height 480. Portrait image: `position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 480px; width: auto;` (no bleed above). | Same as tablet with padding 16 16 0 16; portrait area and image height 400. |
| 9.16 | Video | 100% wide, aspect 5/3. | Same, play button 48, prompt padding 16. |
| 9.17 | Services | Explorer card stacked: photo (100% wide, aspect 480/433, max-height 400) above the list (gap 24), padding 32. Chips wrap, gap 12. | Padding 16, gap 24; photo aspect 1/1; inactive rows height 48 with title `.t-h4` mobile; chips gap 8. |
| 9.18 | FAQ | Item padding 24; question column fills. | Item padding 16, gap 12; toggle 32. |
| 7.2 | Footer | Two rows: [col-1 \| col-2 \| col-3] then col-4 below (gap 48); dividers hidden; padding 48 0; height auto. | One column, order col-1 → col-2 → col-3 → col-4, gap 32, padding 32 0; dividers hidden; links `.t-body-l-medium` mobile size. |

Images on tablet/mobile use the same files; `object-fit: cover` with the same positions as desktop.

---

## 4. Icons, badges & tiles

All icons are in `assets/icons/`, use `currentColor`, default color `--color-text-accent`.

| File | Drawn at | Where |
|---|---|---|
| `24/handshake.svg` · `24/tag.svg` · `24/globe.svg` · `24/clock.svg` | 24 | Trust metrics 1–4 |
| `24/check.svg` | 24 | Quote-panel benefits |
| `24/arrow-left.svg` · `24/arrow-right.svg` | 24 | Carousel controls |
| `24/arrow-up-right.svg` | 20 | Text button, default |
| `24/arrow-right.svg` | 20 | Text button, hover |
| `24/chevron-down.svg` | 16 in nav · 24 in FAQ | Nav items, FAQ toggle |
| `24/lightning.svg` · `24/map-pin.svg` · `24/server.svg` · `24/bitcoin.svg` | 24 | Use-case cards 1–4 |
| `24/phone.svg` · `24/mail.svg` | 24 | Footer and modal contacts |
| `24/close.svg` | 32 | Modal close (white); mobile menu close |
| `24/menu.svg` | 24 | Burger button (tablet, mobile) |
| `20/check.svg` | 20 (the file includes its own padding) | Shortlist checklist |
| `20/arrow-right.svg` · `20/help-circle.svg` | 20 (includes padding) | Step 3 list |
| `social/x.svg` · `social/facebook.svg` | 32 | Footer social |
| `decorative/quote-mark.svg` | 86×86 (fixed color `#D1D6E5`) | Market quote, founder message |

**Number badges are text, not icons.** Step / criterion numbers "1"…"7": `font: 600 16px/1 var(--font-sans); color: var(--color-text-accent);` centered in a `tile-40`. Inside a `tile-20`: `font: 500 11px/1 var(--font-sans)`. The "Free" badge: same 11px/500 text in `tile-20-wide`.

**Play triangle**: solid triangle 14 wide × 16 high pointing right, `--color-text-accent`, centered in the 72 px play button and shifted 2 px right.

**Tiles** (`display: grid; place-items: center; flex-shrink: 0;`):

| Tile | Size | Radius | Background |
|---|---|---|---|
| `tile-40` | 40×40 | 12 | given per use in §9 |
| `tile-32` | 32×32 | 12 | `--color-bg-main` |
| `tile-20` | 20×20 | 6 | `--color-bg-main` |
| `tile-20-wide` | 29×20 | 6 | `--color-bg-main` |
| `tile-nav` | 16×16 | 4 | `--color-bg-accent-pale` |

---

## 5. Images

| File | Where | Box | Fit | Alt |
|---|---|---|---|---|
| `images/founder-portrait-hero@2x.png` (transparent cut-out) | Hero | 486×518 (§9.1) | cover, center top | "Bob Spiegel, Founder of QuoteColo" |
| `images/colocation-site-3d@2x.png` (transparent) | How we match | 384×330 | contain | "Data center server racks" |
| `images/founder-avatar@2x.png` | Chat | 56×56 circle | cover | "Bob Spiegel" |
| `images/gpu-colocation@2x.png` | Who we help | 536×403, r16 | cover, center | "GPU servers in a data center" |
| `images/case-study-01.png` | Case study 1 | 588×320, r16 | cover, center | "Leonard Roszkowski" |
| `images/case-study-02.jpg` | Case study 2 | 588×320, r16 | cover, center 30% | "Noel Frutasio" |
| `images/founder-portrait-message@2x.png` (transparent cut-out) | Founder message | 548×559 (§9.14) | cover, center top | "Bob Spiegel" |
| `images/video-meet-founder@2x.png` | Video poster | 1200×720, r16 | cover, center | "Video: Meet Bob Spiegel" |
| `images/data-center@2x.png` | Services explorer | 480×433, r16 | cover, center | "Data center" |
| `images/providers/provider-01…06.png` | Provider network | see §9.4 | contain | `""` (§12) |
| `illustrations/service-*.png` (4) | Deployment cards | 80×80 (pale tile included, rendered on white — place only on white cards) | as is | `""` |
| `brand/logo-quotecolo.svg` | Header | 218×72 | — | "QuoteColo — Data Center Solutions Since 2004" |
| `brand/logo-quotecolo-on-dark.svg` | Footer | 218×72 | — | "QuoteColo" |
| `brand/logo-quotecolo-white.svg` | Quote panels | 160×53 (with benefits) · 220×73 (compact) | — | "QuoteColo" |

---

## 6. Components

Class names are suggestions; values are mandatory.

### 6.1 Button

```css
.btn   { display: inline-flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap; }
.btn-l { height: 64px; padding: 0 48px; border-radius: var(--radius-16); font: 500 20px/24px var(--font-sans); letter-spacing: -0.02em; }
.btn-s { height: 52px; padding: 0 24px; border-radius: var(--radius-14); font: 500 16px/20px var(--font-sans); letter-spacing: -0.02em; }
```
Borders are drawn as `box-shadow: inset 0 0 0 2px <color>` so the height never changes. **Filled Default also carries `inset 0 0 0 2px var(--color-bg-accent)`** (invisible, same color as the fill) so the hover border animates smoothly instead of jumping.

| Variant | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| **Filled** | bg `--color-bg-accent`; text white; `--shadow-button` | bg transparent; inset 2px `--color-border-accent`; text `--color-text-accent`; `--shadow-button` | same as Default | bg `--color-disabled`; text white; no shadow; `cursor: not-allowed` |
| **Outline** | bg transparent; inset 2px `--color-border-accent`; text `--color-text-accent`; `--shadow-button` | bg `--color-bg-accent`; text white | same as Default | inset 2px `--color-disabled`; text `--color-disabled`; no shadow |
| **Text** | no bg, padding, height or shadow; label `.t-body-medium` `--color-text-accent` + `arrow-up-right` (20) after it, gap 4 | icon becomes `arrow-right` (20); label unchanged | same as Default | label and icon `--color-disabled` |

Every quote CTA ("Get my quote", "Get my shortlist", "Get GPU Quotes", "Get Colo Quotes", "Find MW Capacity", "View Mining Exchange", "Find GPU colocation") opens the Quote modal (§8.6).

### 6.2 Text field / textarea

```
label.field                 flex column · gap 8 · width 100%
  span.t-caption            text-tertiary — label text
  input.input / textarea.input
  span.t-caption            --color-error — error text (error state only)
```
```css
.input { width: 100%; height: 48px; padding: 12px 16px; border-radius: var(--radius-12);
         border: 1px solid var(--color-border-neutral);
         background: var(--surface-gradient), var(--color-bg-main);
         font: 400 20px/24px var(--font-sans); letter-spacing: -0.02em; color: var(--color-text-primary); outline: none; }
.input::placeholder { color: var(--color-text-secondary); opacity: 1; }
textarea.input { height: 136px; resize: vertical; }
```

| State | Border | Text |
|---|---|---|
| Default (empty) | `--color-border-neutral` | placeholder `--color-text-secondary` |
| Hover | `--color-border-neutral-hover` | — |
| Focus | `--color-border-neutral` (unchanged, no ring, no glow) | typed text `--color-text-primary` |
| Error | `--color-error` | error text below: "Please, input a correct data" |
| Disabled | `--color-disabled` | `--color-disabled` |

### 6.3 Tag

`display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border-radius: var(--radius-12); white-space: nowrap;` text `.t-caption`.
- **Neutral**: bg `--color-bg-tertiary`, text `--color-text-primary`.
- **Accent**: bg `--color-bg-accent-pale`, text `--color-text-accent`.

Tags are static, except the "Browse by deployment" chips (§9.17) which are links with hover bg `--color-bg-accent-pale-hover`.

### 6.4 Card surfaces

| Name | Background | Border | Radius |
|---|---|---|---|
| `card` | `--color-bg-main` | — | 16 |
| `card-gradient` | `var(--surface-gradient), var(--color-bg-main)` | — | 16 |
| `card-outline` | `--color-bg-main` | 1px `--color-border-neutral` | 16 |
| `card-accent` | `--color-bg-accent-pale` | — | 16 |

Cards are not links and have no hover state.

### 6.5 Checklist row

`display: flex; align-items: center; gap: 8px;` → `tile-20` (20 px icon from `icons/20/` or number badge) + `.t-caption` `--color-text-primary`.

### 6.6 Carousel controls

Flex, gap 8: two buttons 40×40, radius 12, background `var(--surface-gradient), var(--color-bg-main)`, icons `arrow-left` / `arrow-right` 24 accent.
Hover: bg `--color-bg-accent-pale`. Disabled: icon `--color-disabled`, `cursor: default`, no hover.

### 6.7 Play button

72×72 circle, bg `--color-white`, play triangle (§4). Hover bg `--color-white-hover`, pressed bg `--color-white-pressed`.

### 6.8 Accordion toggle

`tile-40` with bg `--color-bg-accent-pale` and `chevron-down` 24 accent. Hover bg `--color-bg-accent-pale-hover`. Expanded: icon `rotate(180deg)`, `transition: transform var(--dur-base) var(--ease)`.

---

### 6.9 Tables

Two table variants. Both are built with CSS Grid (not `<table>` layout tricks) inside a semantic `<table>` or `role="table"`, always inside a **horizontal scroller** (§6.10).

#### 6.9.1 Facility table (list of places)

```
.table-a                    width 1200 · radius 16 · background var(--surface-gradient), var(--color-bg-main) · overflow hidden
  .table-a__row             display grid · grid-template-columns: 200px repeat(4, 174px) · column-gap 64px · padding 0 32px
```
- **Vertical dividers**: 1 px `--color-bg-secondary` (#D1D6E5), full row height, centred in each 64 px column gap (draw with `background-image` on the row or a `::before` on cells 2–5 at `left: -32px`). Present in the header row and in every body row.
- **Header row**: padding 32 (top/bottom); cells `.t-body` `--color-text-secondary`; column 1 left-aligned, columns 2–5 centred. No background (the table gradient shows).
- **Body rows**: cell padding 16 0; odd rows (1st, 3rd, 5th…) background `--color-bg-tertiary`, even rows transparent. Row height = tallest cell.
  - Column 1: `.t-body-l-medium` `--color-text-primary`, left-aligned, top-aligned.
  - Columns 2–5: `.t-body` `--color-text-primary`, centred, top-aligned.
- No borders, no hover.

**Note card** under the table (gap 32): `card-gradient`, padding 20 24, radius 16, flex row, gap 16, `align-items: center`: `tile-40` (bg `--color-bg-accent-pale`, `globe` icon) + `.t-body` `--color-text-secondary` text.

#### 6.9.2 Price table (matrix)

```
.table-b                    width 1200 · border 1px solid var(--color-border-neutral) · radius 20 · overflow hidden · background var(--color-bg-main)
  .table-b__row             display grid · grid-template-columns: 200px repeat(5, 166px) 170px
```
- **Every cell**: `border-right: 1px solid var(--color-border-neutral); border-bottom: 1px solid var(--color-border-neutral);` — the last column has no right border, the last row has no bottom border.
- **Header row**: background `var(--surface-gradient), var(--color-bg-main)`; cell padding 12 20, `align-items: center`; text `.t-caption` `--color-text-secondary`, left-aligned, wraps; column 1 header is empty.
- **Body rows**: cell padding 16 20, height 56.
  - Column 1: `.t-body-l-medium` `--color-text-primary`, left-aligned.
  - Price cells: `.t-caption-medium` `--color-text-primary` (14 / 20 line-height here), centred horizontally and vertically, `white-space: nowrap`, range written as `$113 – $190` (en dash with spaces).
- No zebra, no hover.

**Footnote** under the table (gap 40): `.t-body` `--color-text-secondary`; the words "Request a quote" are a `--color-text-accent` link that opens the Quote modal (§8.6).

### 6.10 Table scroller (tablet & mobile)

- Desktop (≥ 1280): the table fits the 1200 container — no scrolling, no arrows.
- Tablet and mobile: the table keeps a fixed width and **scrolls horizontally**; arrow controls (§6.6) sit **below** it (margin-top 24 on mobile, 32 on tablet). Arrows are hidden when nothing overflows; left arrow disabled at the start, right arrow disabled at the end.
- Scroller: `display: flex; overflow-x: auto; scrollbar-width: none; scroll-behavior: smooth;` with the table `flex-shrink: 0` (flex keeps the right padding inside the scroll area); bleeding to the screen edges like other mobile rows: `margin-inline: -16px; padding-inline: 16px; scroll-padding-inline: 16px;` (tablet: −32 / 32). No scroll-snap (tables scroll freely). Arrow step = one data column (facility table: 238 desktop-size / 192 mobile; price table: 166 / 140).
- Table sizes per breakpoint:

| | Desktop & tablet | Mobile |
|---|---|---|
| Facility table columns | 200 · 4 × 174, gap 64, padding 0 32 (width 1200) | 160 · 4 × 160, gap 32, padding 0 16 (width 960) |
| Facility header padding | 32 | 24 |
| Facility body cell padding | 16 0 | 12 0 |
| Price table columns | 200 · 5 × 166 · 170 (width 1200) | 140 · 6 × 140 (width 980) |
| Price cell padding | header 12 20 · body 16 20 | header 12 16 · body 12 16 |
| Text | as on desktop (type scale §3.5.2 applies automatically) | same |

- The table's own radius, borders, zebra and gradient stay the same on every breakpoint.

## 7. Header & footer

### 7.1 Header

```
header      position sticky · top 0 · z-index var(--z-header) · height 104 · bg --color-bg-main · no border · no shadow (also when scrolled)
  .container  height 104 · flex · align-items center · justify-content space-between
    a[href="/"]  logo-quotecolo.svg 218×72
    nav[aria-label="Main"]  flex · gap 24 · 5 menu items
    .btn.btn-s Filled  "Get my quote"
```
**Menu item** — `button`, flex, `align-items: center`, gap 8: label `.t-body` `--color-text-primary` + `tile-nav` with chevron-down (16).
Labels: **Company · Colocation Finder · Mining · Use cases · Resources**.
Hover and open: label `--color-text-accent`. While open the chevron rotates 180° (`--dur-base`).

**Dropdown panel** (one per menu item):
- `position: absolute; top: calc(100% + 16px); left: 0; z-index: var(--z-dropdown);`
- bg `--color-bg-main`, radius 16, padding 16, `box-shadow: var(--shadow-button)`, flex column, gap 16, `width: max-content`.
- Items: `a`, `.t-body-medium`, `--color-text-primary`, `white-space: nowrap`; hover `--color-text-accent`. No item backgrounds, dividers or icons.
- Opens on pointer hover and on click / Enter / Space; closes 150 ms after the pointer leaves both label and panel, on `Esc`, and on outside click. One open at a time. No open/close animation.
- **Company**: About · Why Use a Colocation Broker? — other menus: §12.

### 7.2 Footer

```
footer      bg --color-bg-inverse · height 429
  .container  height 429 · flex · justify-content space-between · align-items stretch
    col-1 (218) · divider · col-2 (148) · divider · col-3 (219) · divider · col-4 (235)
```
- Divider: `width: 1px; align-self: stretch; background: var(--color-on-inverse-divider);` (full footer height).
- Every column: flex column, `padding-top: 48px`.
- **Col 1** (gap 16): `logo-quotecolo-on-dark.svg` 218×72 → `.t-body-medium` white, max-width 203: "Access to 500+ providers in the US and Worldwide" → social row (gap 8): two `tile-40` with bg `--color-bg-accent-pale`, icons `social/x.svg` and `social/facebook.svg` (32, accent).
- **Col 2** (gap 24): links `.t-body-l-medium` white — About Company · Colocation · Case Studies · Blog.
- **Col 3** (gap 24, width 219): links `.t-body-l-medium` white, wrapping inside the column — Server Colocation Hosting · Mining Hosting · Mining Equipment Farms / Containers · Miners / Bitcoin Mining Equipment.
- **Col 4** (gap 48):
  - Contacts (gap 24):
    - Phone (gap 8): row [`tile-40` bg `--color-bg-accent-pale` + `phone` (24)] + `.t-body-l-medium` white "(888) 400–5732" (row gap 8, link `tel:+18884005732`) → `.t-body` `--color-on-inverse-muted` "M-F, 8am-8pm EST" with `padding-left: 48px`.
    - Email row: [`tile-40` + `mail`] + "info@quotecolo.com" (gap 8, `mailto:info@quotecolo.com`).
  - Legal (gap 16): `.t-body` `--color-on-inverse-muted`, `text-decoration: underline` — Privacy Policy · Terms of Service · Copyright © 2025 QuoteColo.
- Hover of white links: `--color-white-hover`. Muted links: no hover change.

---

## 8. Behaviour

### 8.1 Sticky header — §7.1
### 8.2 Dropdowns — §7.1

### 8.3 Provider logo marquee (§9.4)
- The 6 tiles are rendered twice in one row inside a track `overflow: hidden; width: 1200px` (the container).
- Animation: the doubled row moves left with `@keyframes { to { transform: translateX(-50%); } }`, `50s linear infinite`.
- Pauses on hover. Under reduced motion: no animation, first 6 tiles shown. No edge fades.

### 8.4 Carousels & horizontal scrollers
- **Every horizontally scrolling row has arrow controls** (§6.6) below it — testimonials, case studies, and on mobile also deployment cards and use-case cards. The provider-logo marquee never has arrows.
- Mobile scroll rows keep a 16 px inset at the start and after snapping: track `margin-inline: -16px; padding-inline: 16px; scroll-padding-inline: 16px;` (no `scroll-margin` on the cards).
- Arrows are hidden automatically when the row does not overflow (e.g. deployment cards on desktop, the 2 case studies on desktop). Arrows scroll by one card + gap with smooth behaviour.
- **Testimonials**: track starts at the container's left edge and overflows to the right edge of the viewport (cards beyond the container stay visible and are cut by the viewport). Arrows scroll by one card + gap (408 px), `--dur-slow`, `--ease`. Left arrow disabled at the start; right arrow disabled when the last card is fully visible. No loop, autoplay or dots. Native horizontal scroll (trackpad) works; scrollbar hidden.
- **Case studies**: same component; on desktop the 2 cards fill the container, so the arrows are hidden.

### 8.5 Accordions
- **FAQ** (§9.18): clicking anywhere on an item toggles it; any number can be open; all collapsed on load. The answer appears below the question (gap 16); height animates `--dur-base`.
- **Services explorer** (§9.17) — autoplay:
  - Exactly one item is active. Item 1 is active on load.
  - The active item's indicator bar fills with `--color-bg-accent` from top to bottom over **6 s** (`linear`; the bar's track is `--color-bg-secondary`). When it is full, the next item becomes active (after the last one — back to item 1).
  - Clicking any item activates it immediately and restarts its 6 s timer. Clicking the item's button opens the Quote modal and does not change the item.
  - The newly active content fades in (`opacity 0 → 1`, `translateY(8px) → 0`, `--dur-reveal`).
  - The timer runs only while the explorer is at least 30 % on screen.

### 8.6 Quote modal
- Opened by every quote CTA (§6.1).
- Backdrop: `position: fixed; inset: 0; background: var(--color-overlay-modal); z-index: var(--z-modal);` page scroll locked.
- The backdrop scrolls (`overflow-y: auto`, padding 40 0) if the dialog is taller than the viewport.
- Dialog: `role="dialog" aria-modal="true"`, **1200 wide** (same panel as §9.15), centered; padding 40, flex row, gap 24, radius 16, background `var(--accent-pattern)` (§2.2).
- Close button: `tile-40` (bg `--color-bg-main`, radius 12) with `close.svg` 32 in `--color-text-accent`, positioned **outside** the dialog: `top: 0; left: calc(100% + 11px)`. Hover bg `--color-white-hover`. Tablet/mobile: inside the dialog at `top: 16px; right: 16px` (mobile tile 32, icon 24). Also closes on backdrop click and `Esc`. Focus is trapped; initial focus on the first input; focus returns to the trigger.
- Tablet: dialog full width (max 704), stacked (left block above the form), padding 32, gap 32. Mobile: padding 24 16 16, gap 24, **logo hidden**, contacts stacked (gap 12), form fields stacked.
- Content: §9.20. Submit → §8.8.

### 8.7 Video
The "Meet Bob Spiegel" block and each case-study thumbnail: clicking the play button or the media replaces the poster in place with the video player (same size and radius) and starts playback with sound. No modal. Sources: §12.

### 8.8 Forms (in-page and modal)
- All five fields are required. Email must be a valid email address; Phone accepts digits, spaces and `+ ( ) -`.
- Validate on submit, then live on blur. Each invalid field shows its error state (§6.2) with "Please, input a correct data".
- Valid submit → navigate to the Thank-you page (§12).

### 8.9 Smooth scrolling
- Page scroll is smoothed with **Lenis 1.1.13** (`https://unpkg.com/lenis@1.1.13/dist/lenis.min.js`): `new Lenis({ lerp: 0.16, wheelMultiplier: 1, smoothWheel: true })` (light smoothing — scroll speed stays close to native) driven by `requestAnimationFrame`. Required CSS: `html.lenis, html.lenis body { height: auto; } .lenis.lenis-smooth { scroll-behavior: auto !important; } .lenis.lenis-stopped { overflow: hidden; }`. Do not set `scroll-behavior: smooth` on `html`.
- While the modal or the mobile menu is open: `lenis.stop()`; on close `lenis.start()`. The modal and the mobile menu have `data-lenis-prevent` so they scroll natively.
- Off under reduced motion.

### 8.10 Appearance on scroll
- Every block fades up when it enters the viewport: from `opacity: 0; transform: translateY(24px)` to `opacity: 1; transform: none`, `--dur-reveal` (700 ms) `--ease`. Triggered once per element by IntersectionObserver (`threshold: 0.08`, `rootMargin: 0px 0px -8% 0px`).
- Animated elements: section heads, hero groups and portrait, trust cards, provider heading and marquee, step cards, notice, chat messages, image and criterion cards, quote panels, market rows and quote, scenario cards and CTA, Who-we-help card, founder panel, video, services explorer and chips, FAQ items, footer columns. Horizontal scroll rows animate as one block.
- Siblings in the same row are staggered by 80 ms each (max 6 steps = 480 ms).
- Only hide elements when JavaScript is running (`html.js [data-reveal]`), so content stays visible without JS. Off under reduced motion.

---

## 9. Page content & structure

`→` = child order. Colors are §2 tokens. All text is final copy.

### 9.1 Hero
`.container` flex, `justify-content: space-between`, height 518.

**Left column** (588 × 518): flex column, `justify-content: space-between`, padding 64 0 24 0.
- Top group (gap 32):
  - `.t-body-medium` text-primary: Data centers don't publish real pricing.<br>Most require long forms and weeks of sales calls.
  - `h1.t-h1` text-primary: Get 2–4 real data center options in 48&nbsp;hours
- Bottom group (gap 28):
  - CTA bar: `display: inline-flex; align-items: center; gap: 24px; padding: 8px 8px 8px 16px; border-radius: 16px; width: 557px;` background gradient over white:
    - Text group (width 292, gap 8): `.t-body-medium` text-primary "1/4 rack to 100+ MW" → `.t-body` text-tertiary "Traditional colo / high-density / MW sites".
    - Button L Filled "Get my quote".
  - `.t-caption` text-tertiary: Our price is the same as going direct. We are not a typical broker.

**Right column** (588 × 518), `position: relative`:
- Portrait frame: `position: absolute; right: 0; bottom: 0; width: 486px; height: 459px; border-radius: 24px; background: url(pattern-tile.png) 0 0 / 482px 309px repeat, var(--color-bg-tertiary);` overflow visible.
  - Image `founder-portrait-hero@2x.png` 486×518: `position: absolute; left: 0; bottom: 0; border-radius: 0 0 24px 24px;` — its top 59 px rise above the frame.
- Quote card: `position: absolute; left: 0; bottom: 24px; width: 412px; z-index: 1;` bg `--color-bg-subtle`, padding 24, flex column, gap 16, `border-radius: 0 24px 0 24px`:
  - `.t-body` text-primary: “Tell me what you're deploying; I'll come back with real options from a network built over 20&nbsp;years”
  - `.t-body-medium` text-primary: —&nbsp;Bob Spiegel, Founder, QuoteColo

### 9.2 Trust metrics
Flex, gap 24. Four cards 282 × 143: `card-gradient`, padding 24, `border-bottom: 1px solid var(--color-border-neutral)`, flex column, `justify-content: space-between`.
- Row (`justify-content: space-between; align-items: center`): value `.t-metric` text-primary + `tile-40` (bg `--color-bg-main`) with icon.
- Caption `.t-body-medium` text-secondary.

| Value | Icon | Caption |
|---|---|---|
| 5,000+ | handshake | Clients helped since 2004 |
| No Cost | tag | to Buyers |
| 500+ | globe | Worldwide providers |
| Quotes | clock | in 48&nbsp;h |

### 9.3 Deployment options (Band A)
Section head (690): **What are you deploying?** / From a single server to 100+&nbsp;MW&nbsp;— matched across 500+ worldwide providers. Free to buyers.
Row: flex, gap 24, `align-items: stretch`. 4 cards, 282 wide, 412 high, `card`, padding 24, flex column, gap 48:
- Illustration 80×80.
- Content: `flex: 1`, flex column, `justify-content: space-between`, gap 24: text (gap 8: `.t-h4` text-primary title → `.t-body` text-secondary) → Button S Filled (`align-self: flex-start`).

| Illustration | Title | Description | Button |
|---|---|---|---|
| service-gpu-colocation | GPU, AI & High-<br>Density Colocation | Single-rack to multi-rack<br>GPU deployments at 15–60&nbsp;kW&nbsp;— including the ones Tier&nbsp;3 operators reject | Get GPU Quotes |
| service-traditional-colocation | Traditional Colocation | 1/4&nbsp;rack to private cage,<br>matched to real capacity and pricing in your metro or a cheaper Plan&nbsp;B market | Get Colo Quotes |
| service-mw-infrastructure | AI Data Center Sites & MW Capacity | Powered land, shell, and wholesale capacity for AI-scale builds&nbsp;— from a few megawatts to campus scale | Find MW Capacity |
| service-bitcoin-mining | Bitcoin mining hosting & equipment | Hosting matched to your<br>target all-in kWh rate, plus<br>a marketplace for miners,<br>equipment, containers, and farms | View Mining Exchange |

### 9.4 Provider network (block #4 and #16)
Flex column, gap 48, `align-items: flex-start`:
- `h2.t-h2` text-primary, left-aligned: Our Provider Network
- Marquee (§8.3): tiles 280×120, radius 16, gradient over white, gap 24, logo centered. Logo boxes: 01 208×69 · 02 183×61 · 03 210×70 · 04 195×65 · 05 222×74 · 06 186×62.

### 9.5 How it works
Section head (588): **How it works** / You send the specs. We find the options. You decide.
Flex column, gap 16:
- Row: 3 cards 384 × 430, gap 24, padding 32, radius 16, flex column.
- Notice, `.t-body`, one line: <span text-accent>Free for buyers. No obligation</span><span text-secondary>. Providers pay our referral fee; your price is not marked up.</span>

Card header (all cards, gap 16): row [`.t-h3` text-primary title (`flex: 1`) + `tile-40` (bg `--color-bg-main`) with number badge; gap 16; `align-items: flex-start`] → `.t-body-l` text-secondary description.

| # | Card bg | Title | Description | Bottom block | Vertical layout |
|---|---|---|---|---|---|
| 1 | gradient | Send your requirements | Tell us what you're deploying, where you want it, and when you need it. Send the specs you have; we'll help with the rest. | Neutral tags (wrap, gap 8): Hardware · Racks & kW · Location · Start date → (gap 16) `.t-caption` text-secondary "Estimates are fine. No perfect RFP needed." | `justify-content: space-between` |
| 2 | `--color-bg-accent-pale` | A shortlist that fits your specs | We filter our network of 500+ providers down to a few that fit, then email you their names and estimated all-in pricing for your requirements. | `.t-caption-medium` text-primary "Your shortlist, by email" (padding-bottom 8) → checklist rows (gap 8) with `check`: Provider names & matched options · Estimated total, with inclusions & extras · Availability & key terms | gap 48, top-aligned |
| 3 | gradient | Take the next step on your terms | Like the options? Contact the providers directly. Need more detail? Call or email us. We're here to help, not push you. | Checklist rows (gap 8): [`arrow-right`] Go directly to the providers you like · [`help-circle`] Ask us questions whenever you need | `justify-content: space-between` |

### 9.6 Request-to-quotes example
Section head (588): **A real example: from request to quotes** / Here's what an actual conversation looks like. Simple, direct and no sales pressure.

Panel: 1200, padding 32, radius 24, `background: var(--surface-gradient), url(pattern-tile.png) 0 0 / 482px 309px repeat, var(--color-bg-main);` flex column, gap 24 (two messages).

**Message row**: flex, gap 56, `align-items: flex-start`.
- Sender (220 wide): flex, `align-items: center`, gap 12: avatar 56 circle → [name `.t-body-l-medium` text-primary / role `.t-caption` text-tertiary; gap 8].
- Bubble: `flex: 1`, padding 24, radius 16.

**Message 1 — client**
- Avatar: circle bg `--color-bg-accent-pale`, letter "C" in `.t-h3` text-accent, centered. Name: Client. Role: CTO, AI startup.
- Bubble bg white; flex row, gap 16: text `.t-body-l` text-primary (`flex: 1`) + `.t-caption` text-secondary "Mon, 10:14 AM" (top).
- Text: Hi,<br><br>I'm looking for colocation for 8× NVIDIA H100 servers around 80&nbsp;kW total.<br>Primary location: Ashburn, VA.<br>Plan B: Dallas, TX.<br>Can you share pricing, availability and any relevant details (power, cooling, network)?<br><br>Thanks,<br>Alex

**Message 2 — founder**
- Avatar: circle bg `--color-bg-accent` with `founder-avatar@2x.png` inside. Name: Bob Spiegel. Role: Founder, QuoteColo.
- Bubble bg `--color-bg-accent-pale-solid`; flex column, gap 16:
  1. Row (gap 20): `.t-body-l` text-primary "Hi Alex,<br><br>Thanks for the details. I checked our networks and here are the best options for your request:" + `.t-caption` text-secondary "Mon, 2:37 PM".
  2. Option cards: flex, gap 16, two cards `flex: 1`. Card: bg white, padding 24, radius 12, flex column, gap 32: Accent tag → block (gap 16): 6 spec rows (gap 8) → total row. Row: `display: flex; justify-content: space-between; gap: 8px;` label `.t-body` text-secondary, value `.t-body` text-primary right-aligned. Total row: `border-top: 1px solid var(--color-border-neutral); padding-top: 12px;`.

| Row | Option 1 | Option 2 |
|---|---|---|
| Tag | Option 1 — Ashburn, VA | Option 2 — Dallas, TX (Plan B) |
| Provider: | Leading Tier III data center | Major wholesale data center |
| Availability: | January 2027 | November 2026 |
| Power: | 80&nbsp;kW (A/B feeds) | 80&nbsp;kW (A/B feeds) |
| Pricing: | 200 $/mo per kW committed | 140 $/mo per kW — lower rate |
| Base price: | 1,500 $ / rack / month | 1,350 $ / rack / month |
| Additional: | + 650 $ for your configuration | + 600 $ for your configuration |
| Estimated total: | 2,150 $ / month (text-primary) | 1,950 $ / month (**text-accent**) |

  3. `.t-body-l` text-primary: Both options include 24/7 remote hands, 1&nbsp;Gbps internet (expandable), and standard 5&nbsp;kW/rack cooling (with high-density upgrades available). Let me know if you'd like to discuss or if you want me to check additional markets.<br>Feel free to call my cell at +1 (617) 640 0309 if it's easier to discuss.<br><br>Best,<br>Bob

### 9.7 How we match you
Section head (588): **How we match you** / 7&nbsp;details are enough to build your short list
Row: flex, gap 24, `align-items: flex-start`:
- Image card 384 × 379: `card-gradient`, padding 32 0; image `colocation-site-3d@2x.png` 384×330, contain (top 32).
- Two columns, 384 each, gap 24; each a flex column with gap 24 of criterion cards.
  Criterion card: `card-gradient`, padding 24, flex row, gap 12, `justify-content: space-between`, `align-items: flex-start`: text block (width 296, gap 8: `.t-h4` text-primary → `.t-body` text-secondary) + `tile-40` (bg `--color-bg-main`) with number badge.

| # | Column | Title | Text |
|---|---|---|---|
| 1 | 1 | Any size | Single server to multi-rack or 100+&nbsp;MW deployments |
| 2 | 1 | Any density | Standard colo to 100+&nbsp;kW/rack GPU/AI/HPC, air or liquid cooled |
| 3 | 1 | Real Power Terms | Metered vs. allocated, redundancy, voltage, breaker size and true all-in power cost |
| 4 | 1 | Powered Land & MW Infrastructure | Powered land, shells and campuses, matching available MW, utility/substation status, expansion capacity and deployment timeline |
| 5 | 2 | Crypto Mining & Hosting | Matching by MW, all-in $/kWh, hosting terms and infrastructure, including farms, containers and equipment |
| 6 | 2 | Network & Compliance | Bandwidth, carriers, cross-connects, cloud on-ramps and required certifications |
| 7 | 2 | Your Market + Plan B | Preferred location first, and if capacity or economics don't work, identify viable alternative markets |

### 9.8 Client testimonials
Section head (588, title only): **What our clients say**
Carousel (§8.4): cards 384 wide, gap 24, `align-items: flex-start` (heights differ); controls below, gap 32.
Card: `card-outline`, padding 24, flex column, gap 40: Neutral tags (gap 4) → content (gap 24): [quote `.t-body-l` text-primary → attribution `.t-body-l-medium` text-primary; gap 16] → Text button "Read More".

| # | Tags | Quote | Attribution |
|---|---|---|---|
| 1 | High-power colocation · Custom requirements | “I work for General Dynamics as a Cloud Engineering team lead, but, disclaimer: my engagement with QuoteColo and Opus Interactive (the company you referred me to)” | —&nbsp;Sean McNamara |
| 2 | Hardware recovery · Mining partners | “We were looking for companies that could partner with us to get the most value out of the miners that were near the end of life that we recycle for our” | —&nbsp;Rich Chumsky, Owner, Buffalo Computer Recycling. |
| 3 | Colocation transition · Vendor discovery | “We wished to move our on-premises servers to a colocation arrangement, so we didn't have to worry about power and cooling concerns.” | —&nbsp;Drew G. Gray, Director of Technology. |
| 4 | Colocation transition · Vendor discovery | “We wished to move our on-premises servers to a colocation arrangement, so we didn't have to worry about power and cooling concerns.” | —&nbsp;Drew G. Gray, Director of Technology. |

### 9.9 Quote request — with benefits (Band B)
Panel: 1200, padding 40, radius 16, flex row, gap 24, `align-items: stretch`; background `var(--accent-pattern)` (§2.2); `overflow: hidden`.
- Left (516): flex column, `justify-content: space-between`:
  - Top (gap 40): `.t-h2` white "Get 2–4&nbsp;qualified options in 48&nbsp;hours" → benefits (gap 32). Benefit: flex, gap 16: `tile-32` with `check` (`margin-top: 4px`) + [`.t-h4` white title / `.t-body` white text; gap 8].
    1. **Free for buyers** — Providers pay our fee. Your price is not marked up.
    2. **Technical requirements first** — You can start without naming your company. Provider credit checks happen later.
    3. **Quick reply by email** — Standard quotes typically take 24–48&nbsp;hours; complex deployments take 3–4&nbsp;business days.
    4. **Put us to work** — Tell us enough to start looking. No perfect RFP needed. Give us the basics, and we will work through the missing details with you.
  - Bottom: `logo-quotecolo-white.svg` 160×53.
- Right: form card (§9.21, **stacked**), width 580.

### 9.10 Colocation market reality 2026
Section head (588): **Colocation market reality: what changed in 2026** / The buying environment moved in four ways. Here's what the questions used to be, and what they are now.
Four comparison rows, stacked with no gap and **no dividers**. Row: flex, gap 24, padding 32 0:
- Left (282): `.t-body-medium` text-accent label.
- Right (894, flex column, gap 32): [`.t-body` text-tertiary "Before…" → `.t-metric` text-primary value; gap 12] → `.t-body-l` text-primary paragraph.

| Label | Before | Value | Paragraph |
|---|---|---|---|
| Space VS. Power | Before: renting square feet, with power sized to fit the footprint. | 6–12&nbsp;months | That is the planning window for a megawatt or more. Most of what is available in the near term sits below 1&nbsp;MW, and a listed figure is not automatically one contiguous block you can use. A campus total can be split across rooms or phases, and a note saying «immediate» can sit beside an install date two quarters out. Ask whether the number is one room or several, and make sure every quarter comes with a year. This is a planning window, not a guaranteed installation date. |
| Rack Density | Before: 3&nbsp;kW to 5&nbsp;kW air-cooled cabinets, and cooling was rarely the question. | ~35&nbsp;kW per rack | That is the honest number to specify when you ask a provider for air-cooled capacity. An 8-GPU HGX or DGX B300 server draws roughly 14–16&nbsp;kW. One per rack lands near 16–18&nbsp;kW, and almost any legacy facility takes it. Two per rack reaches 32–36&nbsp;kW, the realistic ceiling for pure air with hot-aisle containment. Three or four needs rear-door heat exchangers, which is liquid-assisted no matter what the data sheet calls it. |
| Deployment Size | Before: bring whatever you have, and providers would quote almost any footprint. | 100–500&nbsp;kW | This is the footprint many larger providers are actively seeking right now. Below it, you have options and shorter decisions. At 1&nbsp;MW and up, investment-grade credit becomes the main gate, and some providers want to meet you before committing a full megawatt. Without IGC, a few will start you near 300&nbsp;kW and consider expansion later. Expansion is not reserved capacity unless it is in writing. |
| Pricing & Terms | Before: published list rates you could compare side by side. | 200&nbsp;$–250&nbsp;per kW/month | That is the October planning band for 100–500&nbsp;kW, covering space and power. Under 100&nbsp;kW runs 225&nbsp;$–250. One megawatt and up runs 185&nbsp;$–250, where the 185&nbsp;$ end is build-to-suit rather than ready-now space. The bands overlap on purpose. Bigger does not reliably mean cheaper, and at size the real differences are availability, credit and delivery date. Terms in our current inventory run from 12&nbsp;months to 36 and longer. |

Then (gap 40) the market quote: flex, `justify-content: space-between`, `align-items: flex-start`: quote-mark 86×86 + right column (894, flex column, gap 24):
- Card (`card-gradient`, padding 24, flex column, gap 32): `.t-h4` text-primary "«Options change every month. Some companies overpay badly; others find very affordable kW. If you only see one quote, it can feel like the Wild West»." + `.t-body-medium` text-accent "—&nbsp;Bob Spiegel, Founder, QuoteColo".
- `.t-body` text-tertiary: October 2026, from 50+ provider responses and QuoteColo's high-density inventory. Planning ranges, not market averages.

### 9.11 Capacity search comparison (Band C)
Section head (690): **Finding Data Center Capacity Before QuoteColo** / Most buyers try three of these first. Each one costs weeks&nbsp;— and still doesn't end in a real price.
Grid: `grid-template-columns: 588px 588px; gap: 24px;` rows stretch to equal height. Card: padding 24, radius 16, flex column, gap 24: tag → [`.t-h4` text-primary title / body; gap 8, gap 16 in card 4].

| # | Background | Tag | Title | Body |
|---|---|---|---|---|
| 1 | `card` | Neutral: Scenario 1 | Google, ChatGPT & ‘top 10’ lists | `.t-body` text-secondary: Looks useful&nbsp;— it isn't. No real pricing, no usable kW data, no timelines. Just SEO content that doesn't reflect actual deals or current capacity. |
| 2 | `card` | Neutral: Scenario 2 | Provider forms & sales calls | Long forms, slow replies, discovery calls. Weeks go by and pricing is still unclear&nbsp;— and some of those providers can't support your footprint anyway. |
| 3 | `card` | Neutral: Scenario 3 | Peers or a paid consultant | Peers work from outdated info; consultants are expensive. Neither gives you fast options matched to today's market and your actual requirements. |
| 4 | `card-accent` | Accent: Scenario 4&nbsp;— QuoteColo | One shortlist, real prices | Checklist rows (gap 8) with `tile-20` badges: [1] Send your specs&nbsp;— two minutes. · [2] We match across 500+ providers, including off-market regional operators. · [3] Real pricing back within hours. · [`tile-20-wide` "Free"] You never pay us&nbsp;— providers cover it. |

Then (gap 40) Button L Filled "Get my shortlist".

### 9.12 Who we help (Band C)
Section head (690): **Who we help** / You skip the weeks of calls&nbsp;— we match the specifics.
Flex column, gap 20:
- Large card: 1200, `card`, padding 40, flex row, gap 48, `align-items: center`:
  - Left (536, flex column, gap 32):
    - Group (gap 16): Accent tag "GPU & High-Density Colocation" → `.t-h3` text-primary "You have the hardware.<br>Now you need somewhere<br>to run it." → `.t-body-l` text-secondary "From one GPU server to larger clusters, we match your hardware, power and cooling requirements with suitable providers. Compare capacity, deployment dates and direct quotes."
    - Group (gap 16): Button L Filled "Find GPU colocation" → `.t-body` text-tertiary "Start with your technical requirements."
  - Right: `gpu-colocation@2x.png` 536×403, radius 16.
- Row: 4 cards, each 288 wide, gap 16, equal height (stretch); `card`, padding 24, flex column, gap 24: `tile-40` (bg `--color-bg-accent-pale`) with icon → [`.t-h4` text-primary / `.t-body` text-secondary; gap 8].

| Icon | Title | Text |
|---|---|---|
| lightning | Peers or a paid consultant | Peers work from outdated info; consultants are expensive. Neither gives you fast options matched to today's market and your actual requirements. |
| map-pin | AI land & powered sites | You're acquiring a site or bringing one to market. We connect buyers, owners and development partners around clear site requirements. |
| server | Traditional colocation | You need space for a server, racks or a private cage. We match your location, network and budget with suitable providers. |
| bitcoin | Bitcoin mining marketplace | You're buying or selling miners, containers or mining farms, or looking for hosting. Explore listings and connect through QuoteColo. |

### 9.13 Case studies
Section head (588): **Case Studies** / See how we helped teams secure colocation with the right power, pricing, and providers.
Carousel (§8.4): 2 cards, 588 wide, gap 24; controls below, gap 32.
Card (flex column, gap 20):
- Media 588×320, radius 16, `overflow: hidden`: photo (cover) + overlay `--color-overlay-media` + play button (§6.7) centered.
- Text (flex column, gap 24): [eyebrow `.t-body` text-tertiary → name `.t-h4` text-primary; gap 8] → three groups (gap 8 each): label `.t-body` text-tertiary → text `.t-body-l` text-primary.

| | Case 1 | Case 2 |
|---|---|---|
| Photo | case-study-01.png | case-study-02.jpg |
| Eyebrow | CEO Elemental Energy Solutions | CEO FSN Services and Communications |
| Name | Leonard Roszkowski | Noel Frutasio |
| Problem | Needed to source ASIC servers domestically. Skeptical about working with a new organization. | Regularly needed colocation space across multiple US states and time zones. Difficult to navigate the market without deep industry knowledge. |
| What we did | Connected them to buyers, sellers, and infrastructure partners across deployments. Removed procurement and logistics overhead entirely. | Defined requirements in one meeting, then delivered proposals with multiple carrier and data center options across every target market. |
| Result | Rapid organizational growth in a short period. Now uses QuoteColo as an ongoing procurement interface across hardware and infrastructure. | Placed in 4&nbsp;cities. Contracts signed quickly. Multi-state colocation needs resolved through a single point of contact. |

### 9.14 Founder message
Panel: 1200 × 480, radius 24, `background: var(--surface-gradient), var(--color-bg-main);` `position: relative; overflow: visible;` flex row, `align-items: center`, padding-left 64.
- Quote column (540, flex column, gap 16): quote-mark 86×86 → group (gap 24): `.t-lead` text-primary quote → `.t-body-medium` text-tertiary attribution.
  - Quote: «Twenty years, 5,000+ organizations, hundreds of providers across North America and beyond&nbsp;— colocation, GPU and AI infrastructure, powered sites, mining. What matters is that when you tell me your specs, I already know who has the capacity, who takes your footprint, and who'll give you a real price this week&nbsp;— not after weeks of calls. Let's find your space».
  - Attribution: Bob Spiegel, Founder, QuoteColo
- Portrait area: `position: absolute; right: 0; top: 0; width: 548px; height: 480px; border-radius: 0 0 24px 0; overflow: hidden; background: url(pattern-tile.png) 9px -68px / 482px 309px repeat;`
- Portrait image `founder-portrait-message@2x.png` (transparent cut-out, 1226×1283) shown at 548×559, `object-fit: cover; object-position: center top`: `position: absolute; right: 0; bottom: 0; border-radius: 0 0 24px 0;` — the pattern shows through around the figure. No blend modes. — it rises 79 px above the panel top (inside the 120 px gap above).

### 9.15 Quote request — compact
Same panel as §9.9 but height 576:
- Left (446, `justify-content: space-between`): `.t-h2` white "Get 2–4&nbsp;qualified options in 48&nbsp;hours" → `logo-quotecolo-white.svg` 220×73.
- Right: form card (§9.21, **two-column**), width 658.

### 9.16 Meet Bob Spiegel
Media 1200 × 720, radius 16, `overflow: hidden`: poster `video-meet-founder@2x.png` + overlay `--color-overlay-video` + centered prompt (padding 32, flex column, `align-items: center`, gap 16): play button → [`.t-body` white "Meet" / `.t-body-l-medium` white "Bob Spiegel"; centered; gap 4]. Behaviour §8.7.

### 9.17 Services
Section head (588, title only): **Services**
Flex column, gap 24:
- Explorer card: 1200, bg `--color-bg-subtle`, padding 40, radius 16, flex row, gap 32, `align-items: center`:
  - Photo 480×433, radius 16 (`data-center@2x.png`).
  - List (608, flex column, gap 20). Item: flex row, gap 12: indicator bar (2 px wide, radius full) + content.
    - **Active**: bar full item height (fills with accent, §8.5); content (gap 16): [`.t-h4` text-primary title / `.t-body` text-secondary description; gap 8] → Button S Filled.
    - **Inactive**: `button`, height 48, `align-items: center`; bar `--color-bg-secondary`, 32 high, no fill; title `.t-lead` text-secondary. Hover: title `--color-text-primary`.
  - Items: 1. **GPU & High-Density Colocation** — Find providers that fit your GPU hardware, rack density and cooling requirements. From one server to larger clusters, we help you compare capacity, deployment dates and direct quotes. — button "Find GPU colocation" · 2. **MW Infrastructure** — button "Find MW Capacity" · 3. **AI Land & Powered Sites** — button "Get my quote" · 4. **Traditional Colocation** — button "Get Colo Quotes" · 5. **Bitcoin Mining Marketplace** — button "View Mining Exchange". Items 2–5 use the placeholder description "Placeholder text. A short description of this service will go here: what we match, typical deployment sizes and how buyers compare providers, capacity and direct quotes." until real copy arrives (§12). All buttons open the Quote modal.
- Browse block (flex column, gap 16): `.t-caption-medium` text-tertiary "Browse by deployment" → chips (Accent tags, `flex-wrap: wrap`, gap 16): 1U-8U servers · Quarter rack · Half rack · Full rack · Private cage · Multi-rack · GPU / AI / HPC Colocation · High-density · Mining farms · Mining equipment · Mining containers · AI infrastructure · Powered-site opportunities.

### 9.18 FAQ
Section head (690): **Frequently Asked Questions** / We're happy to answer your questions
List (flex column, gap 16) of 9 items. Item: 1200, `card-gradient`, padding 24, flex row, gap 16, `justify-content: space-between`, `align-items: flex-start`, `cursor: pointer`: left (840, gap 16): `.t-lead` text-primary question → `.t-body-l` text-primary answer (only when expanded); right: accordion toggle (§6.8).
1. Does using QuoteColo cost me anything?
2. Is QuoteColo a legitimate service? How long have you been doing this?
3. How is this different from just Googling colocation providers?
4. How fast will I receive options?
5. Can you help with high-density GPU or AI workloads?
6. What if I only need a partial rack or a single server?
7. Do I have to share my company details to get a quote?
8. What's the real monthly cost of colocation?
9. Do you cover locations outside the US?

### 9.19 Footer — §7.2

### 9.20 Quote modal content
Same layout as the compact quote panel (§9.15):
- Left (446, flex column, `justify-content: space-between`, gap 40): header (gap 24): `.t-h2` white "Get a Quote" → contacts (flex, gap 16) → bottom: `logo-quotecolo-white.svg` 220×73.
  - Contact = link button: `tile-40` (bg `--color-bg-main`, `phone` / `mail` icon accent) + `.t-body-l-medium` white text, gap 8. Links `tel:+18884005732` "(888) 400–5732" and `mailto:info@quotecolo.com` "info@quotecolo.com". **Hover: slightly lighter** — text `--color-white-hover`, tile bg `--color-white-hover` (`--dur-hover`).
- Right: form card (§9.21, **two-column**), width 658 (flex 1).

### 9.21 Form card
White, padding 32, radius 16, flex column, gap 32.
- Fields (flex column, gap 16):
  - **Stacked** (with-benefits panel): First Name → Last Name → Email → Phone → Comment, one per row.
  - **Two-column** (compact panel, modal): [First Name | Last Name] → [Email | Phone] (each row flex, gap 16, equal widths) → Comment full width.
  - Label — placeholder: First Name — John · Last Name — Doe · Email — johndoe@gmail.com (`type="email"`) · Phone — +99 999 99 99 99 (`type="tel"`) · Comment (textarea) — * Tell us what you need&nbsp;— location, rack/kW or MW, equipment, bandwidth and start date
- Submit row: flex, gap 16, `align-items: center`: Button L Filled "Get my quote" (`type="submit"`) + `.t-body` text-primary (`flex: 1`): By clicking here, I state that I have read and understood the <a text-accent>Terms and Conditions</a>

---

### 9.22 Location page tables (example: Boston)

These blocks live on location pages (not on the home page). Page order: header → facilities section → prices section → footer. The first section has `padding-top` 64 (tablet 48, mobile 24); the following section and the footer use the normal section gap (§3.4 / §3.5.1). The page title "Boston Data Centers" is the page's `h1`, styled `.t-h2`.

**Facilities section**: section head (690, title only) `h2` "Boston Data Centers" → (gap 32) group (gap 16): `.t-h4` text-primary "Downtown & Cambridge" → facility table (§6.9.1) → (gap 32) note card: "Representative list, not complete inventory. We work with additional Boston-area facilities that don't appear in search results."

| Facility | Operator | Location | Address | Key features |
|---|---|---|---|---|
| Markley Boston Campus | Markley Group | Boston / Lowell | 1 Summer St · 1 Markley Way | New England's largest carrier hotel, with expansion campus |
| DataBank BOS1 | DataBank | Boston | 1 Summer St | Downtown carrier hotel and enterprise colocation |
| Crown Castle Boston | Crown Castle | Boston | 56 Roland St | Carrier-neutral interconnection facility |
| Lumen Cambridge | Lumen | Cambridge | 1 Main St | Enterprise network and colocation services |
| Verizon Boston Metro | Verizon | Boston / Cambridge | Multiple locations | Enterprise network infrastructure |

**Prices section**: section head (690): `h2` "Boston colocation prices<br>(USD/month)" / `.t-lead` "Most buyers try three of these first. Each one costs weeks&nbsp;— and still doesn't end in a real price." (TODO: this subtitle repeats the Capacity-search copy — confirm) → (gap 40) price table (§6.9.2) → (gap 40) footnote: "*Prices change every week. <a>Request a quote</a> to get accurate prices. We'll tell you honestly if Boston makes sense or if another market improves TCO without hurting regional reach or resilience."

Header cells (columns 2–7): 10U (1-3Amp 120v, 1-5TB) · 24U – 2 to 3kW & 100M to GIGe (+) · Standard Density 48U – 2 to 5kW & 100M to GIGe (+) · High Density 48U – 10 to 17kW (3ph) & 1M to GIGe (+) · Standard 4 rack private cage, 5kW per rack & GIGe (+) · High Density 4 rack private cage, 20kW per rack & GIGe (+)

| | 10U | 24U | Std 48U | HD 48U | Std cage | HD cage |
|---|---|---|---|---|---|---|
| Boston | $113 – $190 | $809 – $1188 | $1211 – $1781 | $2375 – $4940 | $5225 – $5700 | $15200 – $19000 |
| Toronto | $143 – $285 | $1234 – $1425 | $1899 – $2328 | $2849 – $5225 | $5938 – $6650 | $16625 – $21138 |
| NYC | $285 – $475 | $1140 – $1378 | $1425 – $1710 | $2375 – $4940 | $5225 – $5700 | $15675 – $21375 |
| Atlanta | $130 – $250 | $1100 – $1500 | $1500 – $1875 | $2500 – $5200 | $5500 – $6000 | $16000 – $20000 |
| Chicago | $130 – $150 | $1100 – $1500 | $1500 – $1875 | $2500 – $5200 | $5500 – $6000 | $16000 – $20000 |
| Dallas | $124 – $238 | $1045 – $1425 | $664 – $1781 | $712 – $4465 | $4038 – $5700 | $13300 – $17100 |
| Virginia | $108 – $250 | $861 – $1100 | $1500 – $1875 | $2500 – $5200 | $5750 – $6250 | $16000 – $22500 |
| New Jersey | $99 – $164 | $700 – $1000 | $1100 – $1875 | $2750 – $5500 | $5750 – $6250 | $16750 – $21500 |

(Short column names in the markdown header above are only for this document; on the site the header cells use the full texts listed before the table.)

## 10. Accessibility

- One `h1` (hero). Section titles are `h2`; card titles `h3`.
- Nav menu buttons: `aria-expanded`, `aria-controls`.
- FAQ items: `button[aria-expanded]`. Services explorer: `role="tablist"` with `aria-selected`.
- Carousel buttons: `aria-label="Previous"` / `"Next"`, `disabled` when disabled.
- Play buttons: `aria-label="Play video: Meet Bob Spiegel"` / `"Play video: <name>"`.
- Every input has a `label`; errors use `aria-invalid="true"` and `aria-describedby`.
- Tables use real `<table>` markup (`<thead>`, `<th scope="col">`, first cell of each row `<th scope="row">`) styled with `display: grid` on rows; the scroller has `tabindex="0"` and `aria-label` (e.g. "Boston colocation prices, scroll horizontally").
- Colors are used exactly as specified even where contrast is below WCAG AA. Do not adjust them.

---

## 11. CSS token sheet (copy as is)

```css
:root {
  --font-sans: "Schibsted Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;

  --color-text-primary: #131D2C;
  --color-text-secondary: #424B57;
  --color-text-tertiary: #7B7E8C;
  --color-text-accent: #0C7DFF;
  --color-text-accent-hover: #0A6CDD;
  --color-bg-main: #FFFFFF;
  --color-bg-subtle: #F8FAFC;
  --color-bg-secondary: #D1D6E5;
  --color-bg-tertiary: #F4F4F6;
  --color-bg-accent: #0C7DFF;
  --color-bg-accent-pale: rgba(12, 125, 255, 0.10);
  --color-bg-accent-pale-hover: rgba(12, 125, 255, 0.20);
  --color-bg-accent-pale-solid: #E7F2FF;
  --color-bg-inverse: #131D2C;
  --color-border-neutral: #E9E9EB;
  --color-border-neutral-hover: #CECECE;
  --color-border-accent: #0C7DFF;
  --color-error: #FF3419;
  --color-disabled: #D1D6E5;
  --color-white: #FFFFFF;
  --color-white-hover: rgba(255, 255, 255, 0.80);
  --color-white-pressed: rgba(255, 255, 255, 0.60);
  --color-on-inverse-muted: rgba(255, 255, 255, 0.20);
  --color-on-inverse-divider: rgba(255, 255, 255, 0.05);
  --color-overlay-media: rgba(19, 29, 44, 0.35);
  --color-overlay-video: rgba(0, 0, 0, 0.20);
  --color-overlay-modal: rgba(0, 0, 0, 0.20);
  --color-pattern-line: #E1E6F5;

  --surface-gradient: linear-gradient(160deg, rgba(236, 238, 243, 0.40) 0%, rgba(240, 243, 253, 0.40) 53%, rgba(242, 244, 252, 0.50) 100%);
  --shadow-button: 0 4px 4px rgba(12, 89, 255, 0.03), 0 8px 8px rgba(12, 89, 255, 0.04);
  --accent-pattern: linear-gradient(rgba(12, 125, 255, 0.8), rgba(12, 125, 255, 0.8)), url("assets/pattern/pattern-tile@2x.png") 0 0 / 482px 309px repeat, #0C7DFF;

  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 20px; --space-6: 24px;
  --space-7: 28px; --space-8: 32px; --space-10: 40px; --space-12: 48px; --space-14: 56px; --space-16: 64px;
  --space-20: 80px; --space-30: 120px;

  --radius-6: 6px; --radius-12: 12px; --radius-14: 14px; --radius-16: 16px; --radius-24: 24px; --radius-full: 9999px;

  --ease: cubic-bezier(0.2, 0, 0, 1); --dur-fast: 150ms; --dur-base: 200ms; --dur-slow: 300ms;
  --z-header: 100; --z-dropdown: 110; --z-modal: 200;
}

.t-h1             { font: 600 64px/64px var(--font-sans); letter-spacing: -0.02em; }
.t-h2             { font: 600 48px/48px var(--font-sans); letter-spacing: -0.02em; }
.t-metric         { font: 600 40px/40px var(--font-sans); letter-spacing: -0.02em; }
.t-h3             { font: 600 32px/40px var(--font-sans); letter-spacing: -0.02em; }
.t-h4             { font: 600 24px/28px var(--font-sans); letter-spacing: -0.02em; }
.t-lead           { font: 400 24px/28px var(--font-sans); letter-spacing: -0.02em; }
.t-body-l-medium  { font: 500 20px/24px var(--font-sans); letter-spacing: -0.02em; }
.t-body-l         { font: 400 20px/24px var(--font-sans); letter-spacing: -0.02em; }
.t-body-medium    { font: 500 16px/20px var(--font-sans); letter-spacing: -0.02em; }
.t-body           { font: 400 16px/20px var(--font-sans); letter-spacing: -0.02em; }
.t-caption-medium { font: 500 14px/16px var(--font-sans); letter-spacing: -0.02em; }
.t-caption        { font: 400 14px/16px var(--font-sans); letter-spacing: -0.02em; }

@media (max-width: 1279px) {
  .t-h1 { font-size: 48px; line-height: 52px; }   .t-h2 { font-size: 36px; line-height: 40px; }
  .t-metric { font-size: 32px; line-height: 36px; } .t-h3 { font-size: 28px; line-height: 32px; }
  .t-lead { font-size: 20px; line-height: 24px; }
  .t-body-l, .t-body-l-medium { font-size: 18px; line-height: 24px; }
}
@media (max-width: 767px) {
  .t-h1 { font-size: 32px; line-height: 40px; }   .t-h2 { font-size: 28px; line-height: 32px; }
  .t-metric { font-size: 28px; line-height: 32px; } .t-h3 { font-size: 24px; line-height: 28px; }
  .t-h4 { font-size: 20px; line-height: 24px; }   .t-lead { font-size: 16px; line-height: 20px; }
  .t-body-l, .t-body-l-medium { font-size: 16px; line-height: 24px; }
  .t-caption, .t-caption-medium { font-size: 12px; line-height: 16px; }
}
* { letter-spacing: -0.02em; }
```

---

## 12. Not provided yet — placeholders (do not invent)

| What | Placeholder until provided |
|---|---|
| Thank-you page | route `/thank-you`: header + footer + `h1.t-h1` "TODO: Thank-you page" inside the container, gap 120 above and below |
| FAQ answers (9) | `.t-body-l` text-tertiary "TODO: answer" |
| Services explorer items 2–5 | placeholder description (§9.17) and buttons as listed; photo stays `data-center@2x.png` |
| Dropdown items for Colocation Finder, Mining, Use cases, Resources | a single item "TODO" |
| Link targets (nav items, footer links, chips, "Read More", Terms and Conditions, social) | `href="#"` |
| Full testimonial texts behind "Read More" | none (link `href="#"`) |
| Video files (Meet Bob, case studies 1–2) | play button does nothing, `aria-disabled="true"` |
| Provider names for logo alt texts | `alt=""` |
| Form endpoint | `preventDefault()`, validate, then go to `/thank-you` |

---

## 13. Head: favicon & social preview

Every page (`/`, `/thank-you/`, and any future page) has in `<head>`:

```html
<meta name="description" content="Get 2–4 real data center options in 48 hours. Free for buyers — providers pay our referral fee; your price is not marked up.">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/assets/favicon/favicon-16x16.png" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<meta name="theme-color" content="#FFFFFF">
<meta property="og:type" content="website">
<meta property="og:site_name" content="QuoteColo">
<meta property="og:title" content="<page title>">
<meta property="og:description" content="<same as description>">
<meta property="og:url" content="https://quotecolo.com<page path>">
<meta property="og:image" content="https://quotecolo.com/assets/og/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="QuoteColo — Get 2–4 real data center options in 48 hours">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<page title>">
<meta name="twitter:image" content="https://quotecolo.com/assets/og/og-image.png">
```
- `favicon.ico` (16/32/48) also lives in the site root.
- Page titles: home — "QuoteColo — Get 2–4 real data center options in 48 hours"; thank-you — "Thank you — QuoteColo".
- One OG image (`assets/og/og-image.png`, 1200×630) for all pages. The domain `https://quotecolo.com` must be replaced if the production domain differs.

## 14. Asset index

```
quote-colo-agent/
├── DESIGN.md
├── example/                  reference implementation built from this file (index.html · boston/ · thank-you/ · styles.css · main.js · own copy of assets/)
├── reference/                 visual reference only — never used in the build
│   ├── page-desktop-1440.jpg
│   ├── components.jpg
│   └── modal-quote.png
└── assets/
    ├── brand/            logo-quotecolo.svg · logo-quotecolo-on-dark.svg · logo-quotecolo-white.svg
    ├── icons/24/         arrow-left · arrow-right · arrow-up-right · bitcoin · check · chevron-down · clock · close
    │                     globe · handshake · lightning · mail · map-pin · menu · phone · server · tag
    ├── icons/20/         arrow-right · check · help-circle
    ├── icons/social/     x · facebook
    ├── icons/decorative/ quote-mark
    ├── illustrations/    service-gpu-colocation · service-traditional-colocation · service-mw-infrastructure · service-bitcoin-mining
    ├── images/           founder-portrait-hero@2x · founder-portrait-message@2x · founder-avatar@2x · colocation-site-3d@2x
    │                     gpu-colocation@2x · data-center@2x · video-meet-founder@2x · case-study-01 · case-study-02
    │                     providers/provider-01 … provider-06
    ├── pattern/          pattern-tile.png · pattern-tile@2x.png · pattern.svg
    ├── favicon/          favicon.svg · favicon.ico · favicon-16x16 · favicon-32x32 · favicon-48x48 · apple-touch-icon (180) · icon-192 · icon-512 · site.webmanifest
    └── og/               og-image.png (1200×630)
```
