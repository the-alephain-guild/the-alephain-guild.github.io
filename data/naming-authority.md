# Naming Authority — public-facing vocabulary for the Alephain Guild ecosystem

**Status:** authoritative. All public landing pages, documentation sites, and
external announcements MUST use the canonical terms below. Aliases and
alternate framings are **forbidden in public copy** to prevent identity
fragmentation across the ecosystem.

This file is a companion to
[`ecosystem-sitemap.json`](./ecosystem-sitemap.json). The sitemap defines
**what exists**; this file defines **how to name it**.

**Version:** 2.0 (2026-07-19). See sitemap `change_log` for revision reasons.

---

## Canonical positioning phrases

Each Guild-layer system has exactly **one** canonical positioning phrase in
each language. Use it verbatim across every public surface.

### ARX

| Language | Canonical phrase |
|---|---|
| English | **ARX — the neutral quant operating system** |
| 中文 | **ARX — 中立量化操作系统** |

**Rationale**:

- *Neutral* — signals tenant-neutral, cross-organization, Guild-layer infrastructure
- *Quant* — makes the target audience explicit
- *Operating system* — establishes it as foundational infrastructure that coordinates independent canonical owners (crucible-rust / custos / speculum / athanor / synedrion / argus / nummus / fama per vision.md line 32), not a SaaS tool

### custos

| Language | Canonical phrase |
|---|---|
| English | **custos — the non-custodial execution runner** |
| 中文 | **custos — 非托管执行 runner** |

**Rationale**:

- *Non-custodial* — the single most important commitment; must lead
- *Execution runner* — describes the mechanical role; distinct from arx (auth) and crucible (state)

### Crucible

| Language | Canonical phrase |
|---|---|
| English | *(TBD — suggested: "the deployment forge")* |
| 中文 | *(TBD — 建议: "部署熔炉")* |

### Synedrion

| Language | Canonical phrase |
|---|---|
| English | *(TBD — suggested: "the AI council")* |
| 中文 | *(TBD — 建议: "AI 议会")* |

### Athanor, Speculum, Argus, Nummus, Fama

Canonical phrases derived from `ecosystem-sitemap.json` `tagline_en` / `tagline_zh`
fields. Update the sitemap first; consumers pick up automatically.

---

## Forbidden aliases (public copy)

The following framings are **not permitted** on any public-facing surface
(landing page, marketing material, README shipped to external audiences,
documentation site header). They may appear inside internal design docs or
code comments where they carry precise technical meaning.

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
| Guild-layer systems | Prefer *"Guild systems"* or *"neutral infrastructure"* | Public-facing translation of the internal "guild-systems" layer |
| Labs | *"Guild research units"* / *"研究单元"* | Public phrasing |
| Business tenant | **Do not use in public copy** | Internal term only. Externally speak of an "operating entity" or by the entity's own name (e.g., "Tesseract Trading") |
| Tenant | **Do not use in public copy** | Same as above |
| First-party tenant | **Do not use in public copy** | Same as above |

**Why hide "tenant" from public copy**: being an ARX tenant is an architectural
fact about how a business entity consumes Guild infrastructure. It is not a
brand identity. Using tenant vocabulary externally would (a) confuse readers
unfamiliar with multi-tenant architecture and (b) diminish the standing of the
operating entity (Tesseract Trading is not "a tenant" to the public — it is a
quantitative trading operation).

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

## Visibility vocabulary (public copy) — NEW in v2

**Visibility** = source code accessibility. **Separate axis from status**.
A system can be `operating` + `proprietary` (Crucible today), `operating` +
`open-source` (Athanor), or any combination.

| Sitemap visibility | Public label (en) | Public label (zh) |
|---|---|---|
| `open-source` | `◆ OPEN SOURCE` (append license if space allows: `◆ OPEN SOURCE · APACHE-2.0`) | `◆ 开源` |
| `proprietary` | `▲ PROPRIETARY` | `▲ 自有` |
| `unknown` | *never ship — resolve before publishing* | *同左* |

### Guild-layer ≠ open-source layer

**IMPORTANT correction of a v1 error**: previous `naming-authority.md v1`
implied that Guild-layer infrastructure is uniformly open-source. **This is
wrong.** Guild-layer infrastructure is composed of both open-source and
proprietary components:

- `custos` = open-source (Apache-2.0)
- `crucible-rust` = **proprietary**
- `arx` = TBD (pending decision)

Public copy MUST NOT conflate "Guild-owned" with "open-source". A system's
license status is a separate axis, marked with the `visibility` field and its
own public label.

### Proprietary components must be labeled

**Mandatory** (per D3 decision, 2026-07-19):

- `crucible-rust` MUST display the `▲ PROPRIETARY` badge on every public
  surface where it appears (landing ecosystem section, docs site references,
  marketing material)
- Rationale: honesty over hiding. The partial-open stack is the truth;
  concealing it is a bigger credibility risk than acknowledging it. Users
  and auditors can then judge trust boundaries accurately.
- This rule applies to any future proprietary Guild system too.

---

## ARX integration phases (public copy discipline) — NEW in v2

ARX coordinates 8 subsystems per `vision.md` line 32, but not all at once.
Integration is **phased** per the vision three-stage roadmap:

| Phase | Subsystems arx integrates | Public copy allowed |
|---|---|---|
| **v1 · entry** (current) | `crucible-rust`, `custos` | ✅ Describe as "runtime dependencies" or "currently coordinated" |
| **Phase 3 · platform** | `speculum`, `athanor`, `argus` (+ philosophers-stone as artifact source) | ⚠️ Describe only as "planned Phase 3 integrations" — do not claim as current |
| **Phase 4 · network** | `synedrion`, `nummus`, `fama` | ⚠️ Same discipline — planned only. `nummus` and `fama` MUST NOT be surfaced publicly until Phase 4 begins (lemons-market risk per vision §8) |

**Forbidden in public copy**:

- ~~"ARX coordinates 8 subsystems"~~ *(true as vision statement; misleading as current claim)*
- ~~"ARX integrates Speculum for backtesting"~~ *(not yet — Phase 3)*
- ~~"ARX + AI Council powered by Synedrion"~~ *(not yet — Phase 4)*
- Any statement that implies current capability from a planned integration

**Allowed in public copy**:

- ✅ "ARX today coordinates crucible-rust and custos"
- ✅ "ARX's vision extends to engine-neutral integrations (Speculum, Athanor, Argus) in Phase 3"
- ✅ "ARX's four-pillar terminus (see [vision.md]) includes an AI-driven research loop, planned for Phase 4"

---

## Enforcement

- All landing repos SHOULD embed a link back to this file in their README
- PR review of any public copy MUST grep for forbidden aliases
- Adding a new Guild system requires adding it to `ecosystem-sitemap.json` **and** a canonical positioning phrase here in **both languages**
- Retiring a phrase requires human review; do not silently swap
- Proprietary label omission on `crucible-rust` public copy = **BLOCKER** in review

---

## Open items (need human decision)

- [ ] Crucible canonical positioning phrase (en + zh) — suggested: "the deployment forge / 部署熔炉"
- [ ] Synedrion canonical positioning phrase (en + zh) — suggested: "the AI council / AI 议会"
- [ ] arx visibility: open-source / proprietary / mixed — decision needed before shipping arx cards on public landing
- [ ] Speculum / Argus / Synedrion visibility + license confirmation

*Last reviewed: 2026-07-19 (v2)*
