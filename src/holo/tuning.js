// Live-tunable knobs for the holo card. Motion knobs mutate this object
// (useCardTilt reads it every frame); CSS knobs set custom properties on
// the document root. The debug panel (?debug) renders sliders for both.

export const motionTuning = {
  maxTilt: 14,       // deg
  stiffness: 130,    // spring
  damping: 20,       // spring
  idleAfterMs: 2500, // sway kicks in after this much quiet
  idleAmplitude: 0.55, // fraction of maxTilt
};

export const motionKnobs = [
  { key: 'maxTilt', label: 'max tilt °', min: 4, max: 24, step: 1 },
  { key: 'stiffness', label: 'spring stiffness', min: 40, max: 300, step: 5 },
  { key: 'damping', label: 'spring damping', min: 4, max: 40, step: 1 },
  { key: 'idleAfterMs', label: 'idle after ms', min: 500, max: 8000, step: 250 },
  { key: 'idleAmplitude', label: 'idle amplitude', min: 0, max: 1, step: 0.05 },
];

export const cssKnobs = [
  { name: '--scale-pop', label: 'scale pop', min: 0, max: 0.05, step: 0.005, initial: 0.015, unit: '' },
  { name: '--sheen-blur', label: 'sheen blur px', min: 0, max: 40, step: 1, initial: 22, unit: 'px' },
  { name: '--sheen-sat', label: 'sheen saturation', min: 0.4, max: 2.5, step: 0.05, initial: 1.45, unit: '' },
  { name: '--sheen-gain', label: 'sheen gain', min: 0, max: 1.5, step: 0.05, initial: 0.9, unit: '' },
  { name: '--sheen-base', label: 'sheen base', min: 0, max: 0.5, step: 0.01, initial: 0.15, unit: '' },
  { name: '--hue-factor', label: 'hue shift / tilt', min: 0, max: 20, step: 1, initial: 8, unit: '' },
  { name: '--mask-size', label: 'light size %', min: 30, max: 120, step: 2, initial: 66, unit: '%' },
  { name: '--streak-gain', label: 'streak gain', min: 0, max: 1.5, step: 0.05, initial: 0.8, unit: '' },
  { name: '--glare-gain', label: 'glare gain', min: 0, max: 1.5, step: 0.05, initial: 0.75, unit: '' },
  { name: '--glare-base', label: 'glare base', min: 0, max: 0.5, step: 0.01, initial: 0.18, unit: '' },
  { name: '--grain-opacity', label: 'grain', min: 0, max: 0.6, step: 0.02, initial: 0.22, unit: '' },
  { name: '--reflect-gain', label: 'reflect gain', min: 0, max: 1.5, step: 0.05, initial: 0.6, unit: '' },
  { name: '--reflect-base', label: 'reflect base', min: 0, max: 0.5, step: 0.01, initial: 0.1, unit: '' },
  { name: '--reflect-blur', label: 'reflect blur px', min: 0, max: 60, step: 2, initial: 26, unit: 'px' },
];

// Sheen stripe palettes: five hsla stops on a 34px pitch. Achromatic and
// low-saturation options avoid the "RGB projector" look of full spectrum.
export const sheenPalettes = {
  silver: [
    'hsla(0, 0%, 88%, 0.45)',
    'hsla(0, 0%, 48%, 0.22)',
    'hsla(0, 0%, 96%, 0.50)',
    'hsla(0, 0%, 58%, 0.24)',
    'hsla(0, 0%, 85%, 0.42)',
  ],
  pearl: [
    'hsla(330, 50%, 82%, 0.34)',
    'hsla(200, 55%, 82%, 0.34)',
    'hsla(150, 45%, 80%, 0.28)',
    'hsla(260, 50%, 82%, 0.30)',
    'hsla(35, 55%, 82%, 0.28)',
  ],
  ice: [
    'hsla(185, 90%, 60%, 0.40)',
    'hsla(210, 90%, 62%, 0.42)',
    'hsla(240, 85%, 64%, 0.40)',
    'hsla(265, 80%, 64%, 0.38)',
    'hsla(200, 90%, 60%, 0.40)',
  ],
  champagne: [
    'hsla(42, 80%, 64%, 0.40)',
    'hsla(22, 70%, 60%, 0.32)',
    'hsla(50, 85%, 68%, 0.42)',
    'hsla(340, 45%, 64%, 0.26)',
    'hsla(45, 75%, 62%, 0.36)',
  ],
  oilslick: [
    'hsla(175, 85%, 55%, 0.40)',
    'hsla(230, 80%, 60%, 0.40)',
    'hsla(280, 80%, 60%, 0.40)',
    'hsla(320, 80%, 58%, 0.34)',
    'hsla(200, 85%, 58%, 0.38)',
  ],
  spectrum: [
    'hsla(190, 95%, 58%, 0.50)',
    'hsla(260, 90%, 60%, 0.50)',
    'hsla(320, 90%, 60%, 0.50)',
    'hsla(40, 95%, 58%, 0.45)',
    'hsla(160, 90%, 56%, 0.45)',
  ],
};

const STRIPE_PITCH_PX = 34;

export function sheenGradient(paletteName) {
  const stops = sheenPalettes[paletteName];
  const line = [...stops, stops[0]]
    .map((color, i) => `${color} ${i * STRIPE_PITCH_PX}px`)
    .join(', ');
  return `repeating-linear-gradient(115deg, ${line})`;
}
