# Getting started

For managers who prepare pages for the QuoteColo website. No coding needed — the AI (Claude) does the building, you look at the result and say what to change.

## How it works, in one line

**Look at the examples → give your page → check it on your computer → send your edits.**
Or, for small things: **just ask to change the text.**

---

## Step 0. One-time setup

1. Install the **Claude desktop app** and sign in.
2. Get this repository onto your computer — easiest is to ask Claude in the Code tab:
   *"Clone <link to this repository> and open it."*
   (You need access to the repository on GitHub — ask your team if you don't have it.)
3. Open the `quote-colo-agent` folder in the Code tab. From now on Claude knows the rules of this project and will guide you.

Not sure what to do? Just type **"Start"** — Claude will walk you through the steps below.

## Step 1. Look at the three example pages

Before giving your own page, see what the design can do. Ask Claude:

> Show me the example pages.

Claude starts the site on your computer and opens it in the built-in browser:

| Page | Address | Why look at it |
|---|---|---|
| Home | http://localhost:4173/ | Every standard block: hero, numbers, cards, forms, testimonials, FAQ, footer. |
| Boston | http://localhost:4173/boston/ | A location page with tables. |
| AI & HPC land | http://localhost:4173/ai-hpc-land/ | A page that was **redesigned from a Word document** — this is what will happen to your page. |

Check each page on desktop and on a phone size (ask Claude: *"show it on mobile"*).

**Without Claude:** open Terminal in the `quote-colo-agent` folder and run

```bash
python3 -m http.server 4173 --directory example
```

then open the addresses above in your browser. Stop it with `Ctrl+C`.

## Step 2. Give your page

Send Claude your source in any form:

- a **Word document** (drag the file into the chat);
- a **live page** — paste the link to the old site;
- a **Figma** link.

and say what it is, e.g. *"This is our new page for Dallas colocation. Make it in our design."*

Claude will:
1. Read the content and match each part to a block of the design system.
2. Show you a **mapping table** (your section → our block) and, for anything new, **2–3 variants** with one recommended.
3. Ask only what it can't decide (missing photos, unclear text).
4. Build the page and give you the local address.
5. Write a report in `pages/<page-name>.md` with the TODO list (missing photos, texts, links).

Claude never invents copy, numbers or photos — anything missing becomes a visible "TODO" placeholder.

## Step 3. Check it on your computer

Open the address Claude gives you (e.g. http://localhost:4173/dallas/). Check:
- texts and numbers are right;
- the order of sections makes sense;
- desktop and mobile both look good;
- buttons open the quote form.

## Step 4. Send your edits

Write edits in plain words, as many at once as you like:

> In the hero, change the title to "…". Remove the second testimonials block. On mobile the table is hard to read — try cards.

Claude changes the page, you check again. Repeat until it's right.

## Just changing text?

You don't need the whole flow. Say:

> On the home page, change "Quotes in 48 h" to "Quotes in 24 h".

Claude changes the page **and** the copy in `DESIGN.md`, so the spec stays correct.

## Step 5. Save it

When you're happy, say **"Save and send for review"**. Claude puts your work on a separate branch and opens a pull request on GitHub. Once it's reviewed, it's merged into the main version.

---

## Good to know

- **The design rules are fixed** — one font, fixed colours, the 12-column grid, set spacing. If you want something outside them (a new colour, a different font), Claude will say so and suggest the closest option.
- **Everything is in English** on the site. You can talk to Claude in any language.
- **Where things are:** see the folder list in [README.md](README.md).
