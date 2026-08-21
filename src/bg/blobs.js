// Gradient blob background (the v6 look) — now the card's "environment".
// Kept pure (rng injected) so it stays testable.

export const colorPalettes = [
  { from: 'from-purple-600', via: 'via-pink-500', to: 'to-orange-400' },
  { from: 'from-blue-600', via: 'via-cyan-500', to: 'to-teal-400' },
  { from: 'from-indigo-600', via: 'via-purple-500', to: 'to-pink-400' },
  { from: 'from-emerald-600', via: 'via-teal-500', to: 'to-cyan-400' },
  { from: 'from-rose-600', via: 'via-pink-500', to: 'to-fuchsia-400' },
  { from: 'from-amber-600', via: 'via-orange-500', to: 'to-red-400' },
  { from: 'from-violet-600', via: 'via-indigo-500', to: 'to-blue-400' },
  { from: 'from-sky-600', via: 'via-blue-500', to: 'to-indigo-400' },
  { from: 'from-fuchsia-600', via: 'via-purple-500', to: 'to-cyan-400' },
  { from: 'from-lime-600', via: 'via-green-500', to: 'to-emerald-400' },
  { from: 'from-red-600', via: 'via-orange-500', to: 'to-yellow-400' },
  { from: 'from-cyan-600', via: 'via-blue-500', to: 'to-purple-400' },
];

export function pickPalette(rng) {
  const palette = colorPalettes[Math.floor(rng() * colorPalettes.length)];
  return [
    palette.from.replace('from-', 'bg-'),
    palette.via.replace('via-', 'bg-'),
    palette.to.replace('to-', 'bg-'),
  ];
}

export function makeBlobs(count, viewport, colors, rng) {
  return Array(count).fill(0).map((_, i) => ({
    top: Math.floor(rng() * viewport.height) - 300,
    left: Math.floor(rng() * viewport.width) - 300,
    size: 300 + Math.floor(rng() * 400),
    color: colors[Math.floor(rng() * colors.length)],
    opacity: 0.35 + rng() * 0.3,
    animation: `animate-blob-${(i % 6) + 1}`,
  }));
}

// Hex values mirroring colorPalettes (from/via/to), for the card's
// environmental reflection layer.
const hexPalettes = [
  ['#9333ea', '#ec4899', '#fb923c'],
  ['#2563eb', '#06b6d4', '#2dd4bf'],
  ['#4f46e5', '#a855f7', '#f472b6'],
  ['#059669', '#14b8a6', '#22d3ee'],
  ['#e11d48', '#ec4899', '#e879f9'],
  ['#d97706', '#f97316', '#f87171'],
  ['#7c3aed', '#6366f1', '#60a5fa'],
  ['#0284c7', '#3b82f6', '#818cf8'],
  ['#c026d3', '#a855f7', '#22d3ee'],
  ['#65a30d', '#22c55e', '#34d399'],
  ['#dc2626', '#f97316', '#facc15'],
  ['#0891b2', '#3b82f6', '#c084fc'],
];

export function pickPaletteIndex(rng) {
  return Math.floor(rng() * colorPalettes.length);
}

export function blobColorsFor(index) {
  const palette = colorPalettes[index];
  return [
    palette.from.replace('from-', 'bg-'),
    palette.via.replace('via-', 'bg-'),
    palette.to.replace('to-', 'bg-'),
  ];
}

export function envColorsFor(index) {
  return hexPalettes[index];
}
