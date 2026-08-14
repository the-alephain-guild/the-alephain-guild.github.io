# The Alephain Guild — official site

The public site for **The Alephain Guild**. Static HTML, no build step, deployed
to GitHub Pages at **https://alephain.com**.

## Before you write anything

This site is read by customers, press, and anyone who finds us. What we publish
about ourselves is deliberately narrower than what we know about ourselves, and
that boundary is enforced by a check rather than by memory.

**Run it before you commit:**

```bash
npm run verify
```

It fails on internal system names, storage identifiers, architecture vocabulary,
and links into repositories an outside reader cannot open. The check reads whole
files including code blocks and JSON — an internal identifier pasted into a
sample payload discloses exactly as much as one written in a sentence.

**Where copy comes from.** Draw it from what a reader can actually reach: the
product's own surface, its public documentation, the things a user can do.
Internal documents may be used to *check a fact*, never as the *shape of the
story* — a document written to divide responsibility between internal systems
will, if followed, produce a page organised around those systems. That is how
this site came to describe its own architecture to the public.

**Naming.** [`data/naming-authority.md`](./data/naming-authority.md) is
authoritative for how anything is named in public copy.
[`data/ecosystem-sitemap.json`](./data/ecosystem-sitemap.json) is authoritative
for what is public at all. Its short list is intentional, not incomplete.

**If a banned term genuinely must appear**, append `disclosure-ok: <reason>` on
that line. The reason gets reviewed; it is an escape hatch, not a mute button.

## Structure

```
the-alephain-guild.github.io/
├── index.html        # the main page — markup, styles and i18n dictionaries, all inline
├── brand/            # the public brand page and the published marks
├── data/             # naming authority + public surface definition
├── scripts/          # tooling (not published — see _config.yml)
├── _config.yml       # Pages config; excludes tooling from the build
└── package.json      # verify entry point; no dependencies
```

Copy exists in three places per string: inline HTML (the fallback shown before
scripts run) and the `en` / `zh` dictionaries near the bottom of `index.html`.
**Change all three.** Editing only the inline text leaves the dictionaries
stale; editing only the dictionaries leaves the wrong text in the page source,
where readers and crawlers still find it.

## Design

The visual system follows brand v2 — monochrome, editorial, serif. Ink is
`#0F1115` on paper and `#EDE9DD` on slate; gold is a UI accent only and is never
applied to a logo. Display type is Newsreader; Noto Serif SC carries Chinese;
JetBrains Mono sets the small caps labels.

Both themes ship. Test both — dark mode contrast is not implied by light mode
passing.

## Deployment

Pushing to `main` publishes. There is no build step and no CI, so `npm run
verify` locally is the only thing standing between an edit and the public
internet.

## License

© 2026 The Alephain Guild. All rights reserved.
