import { describe, expect, test } from 'bun:test';
import { makeBlobs, pickPalette, colorPalettes, pickPaletteIndex, blobColorsFor, envColorsFor } from './blobs.js';

describe('makeBlobs', () => {
  const viewport = { width: 1000, height: 800 };
  const colors = ['bg-a', 'bg-b', 'bg-c'];

  test('produces the requested count with fields in range', () => {
    const blobs = makeBlobs(10, viewport, colors, Math.random);
    expect(blobs).toHaveLength(10);
    for (const blob of blobs) {
      expect(blob.size).toBeGreaterThanOrEqual(300);
      expect(blob.size).toBeLessThanOrEqual(700);
      expect(blob.opacity).toBeGreaterThanOrEqual(0.35);
      expect(blob.opacity).toBeLessThanOrEqual(0.65);
      expect(colors).toContain(blob.color);
      expect(blob.top).toBeGreaterThanOrEqual(-300);
      expect(blob.left).toBeGreaterThanOrEqual(-300);
    }
  });

  test('cycles through the six blob animations', () => {
    const blobs = makeBlobs(7, viewport, colors, () => 0.5);
    expect(blobs[0].animation).toBe('animate-blob-1');
    expect(blobs[5].animation).toBe('animate-blob-6');
    expect(blobs[6].animation).toBe('animate-blob-1');
  });
});

describe('pickPalette', () => {
  test('returns bg- classes from one of the defined palettes', () => {
    const colors = pickPalette(() => 0);
    expect(colors).toEqual(['bg-purple-600', 'bg-pink-500', 'bg-orange-400']);
    expect(colorPalettes.length).toBe(12);
  });
});

describe('palette sharing', () => {
  test('blob classes and env hexes exist for every palette index', () => {
    for (let i = 0; i < colorPalettes.length; i++) {
      const classes = blobColorsFor(i);
      expect(classes).toHaveLength(3);
      for (const cls of classes) expect(cls.startsWith('bg-')).toBe(true);
      const hexes = envColorsFor(i);
      expect(hexes).toHaveLength(3);
      for (const hex of hexes) expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  test('pickPaletteIndex stays in range', () => {
    expect(pickPaletteIndex(() => 0)).toBe(0);
    expect(pickPaletteIndex(() => 0.999)).toBe(colorPalettes.length - 1);
  });
});
