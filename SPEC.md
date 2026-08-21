# SPEC — awo.ng v7.0 "Holo"

## 1. Objective

Redesign awo.ng (personal site, single page). The business card becomes a
polished, high-fidelity holographic trading card, inspired by
poke-holo.simey.me:

- The card tilts in 3D toward the pointer with a springy, weighty feel.
- An iridescent oil-slick sheen and a pointer-tracked glare sweep across
  the card as it tilts. Foil covers the whole card but is dialed down
  behind the text so copy stays readable.
- When idle for a few seconds, the card sways gently on its own, showing
  off the sheen without interaction.
- On touch devices, dragging a finger tilts the card.
- Pure DOM/CSS + a small JS spring: transforms, gradients, blend modes,
  and generated (inline SVG) textures. No WebGPU, no external assets.

Target users: recruiters, peers, and the tech-curious. The card must read
instantly; the effect is the hook.

### Card content (v7 copy)

| Element | Content |
|---|---|
| Name | Anthony Wong |
| Subtitle | Principal Software Engineer |
| Status | Currently @ [Windscribe](https://windscribe.com) (linked) |
| Body | "A decade of turning messy engineering problems into products that scale." (from the LinkedIn headline; decided at review) |
| Focuses | App Architecture · APIs & Services · DevEx & CI/CD |
| Socials | LinkedIn, GitHub (unchanged) |

### Acceptance criteria

1. Desktop: pointer moves tilt the card smoothly (springy, no snapping);
   sheen and glare track the tilt; 60fps+ (compositor-driven CSS).
2. Mobile: touch-drag tilts the card; no scroll jank; no permission
   prompts.
3. Idle: after ~2.5s without input, a slow autonomous sway starts;
   pointer/touch takes over seamlessly.
4. `prefers-reduced-motion`: no tilt, no sway; a static card with a fixed
   subtle sheen.
5. Card text is real DOM (selectable, indexable, screen-reader friendly);
   text contrast stays readable at every tilt angle.
6. Works in every modern browser — no capability tiers, no fallback
   variants. One implementation, progressively calm under reduced motion.
7. No external assets: textures are generated (inline SVG data URIs);
   bundle stays dependency-lean (React + hand CSS).

## 2. Commands

```
npm run build        # build:css + build:js (production, minified)
npm run dev          # tailwind watch + esbuild serve
npm test             # bun unit tests
```

Deployment is GitHub Pages from `master`: built artifacts (`js/app.js`,
`css/output.css`) are committed with every source change.

## 3. Project structure

```
index.html            # shell: #root, fonts, css
src/
  app.jsx             # page, card content, layout
  content.js          # card copy (single source of truth)
  holo/
    tilt.js           # pure math: pointer->tilt mapping, spring, idle sway
    useCardTilt.js    # React hook: input tracking + rAF loop -> CSS vars
    tuning.js         # live-tunable knobs + sheen palettes
    DebugPanel.jsx    # ?debug slider panel
  bg/
    blobs.js          # environment palette + blob generation (pure)
    BlobField.jsx     # animated blob background
css/
  input.css           # tailwind + hand-written .holo-* layer styles
js/app.js             # committed bundle
```

## 4. Code style

- React function components + hooks; matches existing idiom.
- Tailwind for layout; the holo layers are hand-written CSS driven by
  CSS custom properties (`--rx`, `--ry`, `--pointer-x`, …).
- Pure math (spring, mapping, sway) lives in `holo/tilt.js`, tested.
- Guard clauses, descriptive names, comments only for the non-obvious.

## 5. Testing strategy

1. `npm test` (bun): tilt math — spring convergence, pointer mapping,
   sway bounds, reduced-motion short-circuit; card content copy guards.
2. `npm run build` clean before every commit.
3. Browser verification via claude-in-chrome: tilt response, idle sway,
   glare tracking, text legibility at extreme tilt, fps overlay.
4. Mobile check: touch-drag on a real device; reduced-motion OS check.

## 6. Boundaries

**Always**
- Static site, GitHub Pages, no backend, no external assets.
- Card content as real DOM text; effects never obscure legibility.
- Commit rebuilt artifacts alongside source changes.

**Ask first**
- Any new runtime dependency.
- Typography/font changes.
- Copy changes beyond the table in §1.

**Never**
- Touch `CNAME`.
- Analytics, trackers, third-party scripts.
- Canvas-drawn text.
