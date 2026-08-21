# Implementation Plan: awo.ng v7.0 "Holo"

## Overview

Pivot from the fluid sim to a holographic trading-card treatment of the
business card (SPEC.md). Pure DOM/CSS + a small spring; effects driven by
CSS custom properties. The fluid experiment is removed (it stays in git
history on `feat/v7-liquid`).

## Task list

### Phase 1: Clear the deck
- [ ] H1 (S): remove the fluid sim — src/fluid, src/fallback, src/tier.js,
      src/palette.js, deno check scripts and npm scripts; page becomes
      card on a static dark ground. Site still builds and renders.

### Phase 2: The holo card
- [ ] H2 (S): tilt math (`src/holo/tilt.js`, tested): spring step,
      pointer→tilt mapping, idle sway, clamps.
- [ ] H3 (M): `useCardTilt` hook (pointer + touch + idle + reduced-motion
      → CSS vars via rAF) and card layer markup (sheen, glare, texture),
      `.holo-*` styles in css/input.css.
- [ ] H4 (M): fidelity pass in the browser — spring feel, sheen palette,
      glare falloff, shadow, text legibility at extreme tilt.

### Phase 3: Ship
- [ ] H5 (S): a11y + reduced-motion verification, README/SPEC sync,
      version check, rebuild artifacts, final browser + mobile pass.

## Verification per task
- `npm test` and `npm run build` green before each commit.
- H3/H4: live screenshots via claude-in-chrome at multiple pointer
  positions; fps overlay; drag interaction.

## Risks
| Risk | Mitigation |
|---|---|
| Sheen looks cheap/flat | Iterate live in browser (H4 is dedicated to this); layer two offset gradients + generated texture |
| Blend modes wash out text | Foil dialed down behind text block; glare capped; contrast check at max tilt |
| Idle sway fights pointer | Single target vector; sway only writes when input is stale >2.5s; spring smooths handoff |
