# Naming Authority — public-facing vocabulary for the Alephain Guild

**Status:** authoritative. All public landing pages, documentation sites, and
external announcements MUST use the canonical terms below. Aliases and
alternate framings are **forbidden in public copy** to prevent identity
fragmentation.

This file is a companion to
[`ecosystem-sitemap.json`](./ecosystem-sitemap.json). The sitemap defines
**what is public**; this file defines **how to name it**.

**Version:** 3.0 (2026-08-13). See sitemap `change_log` for revision reasons.

---

## Canonical positioning phrases

Each publicly named thing has exactly **one** canonical positioning phrase in
each language. Use it verbatim across every public surface.

### ARX

| Language | Canonical phrase |
|---|---|
| English | **ARX — the neutral quant operating system** |
| 中文 | **ARX — 中立量化操作系统** |

**Rationale**:

- *Neutral* — signals that it serves organizations without belonging to any one of them
- *Quant* — makes the target audience explicit
- *Operating system* — establishes it as foundational infrastructure rather than a SaaS tool

### custos

| Language | Canonical phrase |
|---|---|
| English | **custos — the non-custodial execution runner** |
| 中文 | **custos — 非托管执行 runner** |

**Rationale**:

- *Non-custodial* — the single most important commitment; must lead
- *Execution runner* — describes what it does on the user's machine, distinct from the authorization layer

---

## Forbidden aliases (public copy)

The following framings are **not permitted** on any public-facing surface
(landing page, marketing material, README shipped to external audiences,
documentation site header).

### ARX — do not use in public copy

- ~~authorization gateway~~ *(technically accurate, but hides the OS-level ambition)*
- ~~auth perimeter~~ *(too narrow — implies just a boundary, not an OS)*
- ~~identity service~~ *(reductive — obscures tenant / RBAC / policy scope)*
- ~~ARX authorization system~~ *(loses "neutral" and "quant")*
- ~~ARX AuthN/AuthZ~~ *(engineering jargon, not positioning)*

### custos — do not use in public copy

- ~~self-hosted runner~~ *(technically true but weakens the commitment; use "non-custodial")*
- ~~local execution agent~~ *(loses the "you hold your keys" framing)*
- ~~strategy runner~~ *(hides the trust boundary)*

---

## Ecosystem-level vocabulary

| Term | Public copy | Notes |
|---|---|---|
| The Alephain Guild | Use as-is | The umbrella organization |
| Labs | *"Guild research units"* / *"研究单元"* | Public phrasing |
| Business tenant | **Do not use in public copy** | Speak of an "operating entity" or use the entity's own name (e.g., "Tesseract Trading") |
| Tenant | **Do not use in public copy** | Same as above |
| First-party tenant | **Do not use in public copy** | Same as above |

**Why keep "tenant" out of public copy**: it describes how an operating entity
consumes shared infrastructure. It is not a brand identity. Using it externally
would (a) confuse readers unfamiliar with the term and (b) diminish the standing
of the entity — Tesseract Trading is not "a tenant" to the public, it is a
quantitative trading operation.

---

## Status vocabulary (public copy)

**Status** = current operational state. Aligned with `ecosystem-sitemap.json`
`status_vocabulary`:

| Sitemap status | Public label (en) | Public label (zh) |
|---|---|---|
| `operating` | `● OPERATING` | `● 运行中` |
| `private-beta` | `◐ PRIVATE BETA` | `◐ 内测中` |
| `planned` | `◇ PLANNED` | `◇ 规划中` |
| `unknown` | *never ship this label — resolve before publishing* | *同左* |

---

## Visibility vocabulary (public copy)

**Visibility** = source code accessibility. **Separate axis from status** — a
thing can be operating and open-source, operating and proprietary, or any
combination. Do not conflate "the Guild built it" with "you can read it".

| Sitemap visibility | Public label (en) | Public label (zh) |
|---|---|---|
| `open-source` | `◆ OPEN SOURCE` (append license if space allows: `◆ OPEN SOURCE · APACHE-2.0`) | `◆ 开源` |
| `proprietary` | `▲ PROPRIETARY` | `▲ 自有` |
| `unknown` | *never ship — resolve before publishing* | *同左* |

### Proprietary must be labeled, not hidden

Anything published as `proprietary` MUST carry the `▲ PROPRIETARY` badge on
every public surface where it appears. Honesty beats concealment: readers and
auditors can only judge a trust boundary they can see, and being caught
obscuring one costs more credibility than declaring it ever would.

This cuts both ways. The badge is for things we publish. It is not a licence to
publish something merely because we could label it.

---

## Enforcement

- All landing repos SHOULD embed a link back to this file in their README
- PR review of any public copy MUST grep for forbidden aliases
- Publishing something new requires adding it to `ecosystem-sitemap.json` **and** a canonical positioning phrase here in **both languages**
- Retiring a phrase requires human review; do not silently swap
- Omitting a required visibility label in public copy = **BLOCKER** in review

---

## Open items (need human decision)

- [ ] ARX visibility: open-source / proprietary / mixed — decision needed before shipping ARX cards on public landing

*Last reviewed: 2026-08-13 (v3)*
