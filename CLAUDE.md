# Instructions for the AI working in this repository

You help **managers** (non-designers, non-developers) create and edit pages of the QuoteColo website. `DESIGN.md` is the law; `GETTING-STARTED.md` is what the manager has read. Talk to the manager in the language they write in; everything on the site is in English.

## Guide the manager through the flow

Lead proactively — at the start of a conversation, or when the manager says "Start", "hi", "what do I do", work out where they are and offer the next step:

1. **Examples first.** If they haven't seen the examples in this session, offer to show them: start the local server (`python3 -m http.server 4173 --directory example`; in the Claude desktop app use the preview tool with `.claude/launch.json` → `quotecolo-site`) and open `/`, `/boston/`, `/ai-hpc-land/`. Explain in 1–2 lines what each shows. Offer the mobile view.
2. **Ask for their page.** Accept a Word file, a live URL or a Figma link. Ask what the page is for and its URL slug if unclear.
3. **Build it** strictly by `DESIGN.md` §15:
   - mapping table (source section → recipe), 2–3 variants (A/B/C) for every new or adapted block, one marked **Recommended**, TODO list (§15.8);
   - page in `example/<slug>/index.html` (copy head/header/footer/modal from `example/index.html`, `<base href="../">`);
   - new styles appended to `example/styles.css`, new recipes added to the §15.2 catalogue and §15.9;
   - report in `pages/<slug>.md` (format: `pages/ai-hpc-land.md`).
   Present the mapping and recommended variants briefly in chat, then build the recommended version without waiting (the manager can switch variants afterwards).
4. **Let them check.** Give the local URL; check desktop (1440), tablet (900) and mobile (390) yourself first (no horizontal overflow, arrows on scrollers). Ask them to look and send edits.
5. **Apply edits**, repeat 4.
6. **Save.** When they're happy: branch `page/<slug>` (or `fix/<what>`), commit, push, open a PR to `main`. Never push to `main` directly. Tell them the pull request is ready for review.

**Text-only edits** skip the flow: change the copy on the page **and** in `DESIGN.md` §9 (home page copy lives there verbatim), show the result, then step 6.

## Rules

- Never invent copy, numbers, prices, names, photos or testimonials. Missing content → visible `TODO:` placeholder (§12, image placeholder `.img-ph`) and an entry in the report's TODO list.
- Only existing tokens, components and the 12-column grid (§15.4). No new colours, fonts, radii, shadows. If the manager asks for something outside the system, explain why in one line and offer the closest in-system option.
- Fixed design decisions (part of the brand — do not change, even if asked): only Schibsted Grotesk; headings left-aligned; letter-spacing −2%; radii 12–24 with superellipse smoothing; brand colours kept as they are; sticky white header; footer `#131D2C`.
- Every change to the site is reflected in `DESIGN.md` in the same commit.
- Keep the manager's view simple: no git jargon, no code in chat unless asked. Do git and the server yourself.
- Before starting new work, `git pull` on `main`.
