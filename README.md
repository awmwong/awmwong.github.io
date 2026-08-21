# awo.ng

v7.0 "Holo" — personal site. The business card is a holographic trading
card: it tilts toward the pointer with a springy feel, a silver sheen and
glare sweep across it, and it reflects the colors of the animated blob
background behind it (one random palette per load). Idle for a few
seconds and it sways on its own. Touch-drag tilts it on mobile; under
prefers-reduced-motion everything holds still.

Pure DOM/CSS + a small JS spring — no WebGL/WebGPU, no external assets.

## Commands

- `npm run dev` — local dev server (tailwind watch + esbuild serve)
- `npm run build` — production css + js bundles (committed to the repo)
- `npm test` — unit tests (bun)

`?debug` shows a live tuning panel: sliders for every motion and surface
knob, a sheen palette picker, fps, and a copy-values button.

Docs: `SPEC.md` (v7 spec), `tasks/plan.md` (implementation plan).
