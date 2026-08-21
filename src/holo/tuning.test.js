import { describe, expect, test } from 'bun:test';
import { motionTuning, motionKnobs, cssKnobs } from './tuning.js';

describe('tuning knobs', () => {
  test('every motion knob maps to a live tuning key with an in-range default', () => {
    for (const knob of motionKnobs) {
      expect(motionTuning).toHaveProperty(knob.key);
      const value = motionTuning[knob.key];
      expect(value).toBeGreaterThanOrEqual(knob.min);
      expect(value).toBeLessThanOrEqual(knob.max);
    }
  });

  test('css knobs have in-range initial values and css var names', () => {
    for (const knob of cssKnobs) {
      expect(knob.name.startsWith('--')).toBe(true);
      expect(knob.initial).toBeGreaterThanOrEqual(knob.min);
      expect(knob.initial).toBeLessThanOrEqual(knob.max);
    }
  });
});

describe('sheen palettes', () => {
  test('each palette has 5 stops and builds a repeating gradient', async () => {
    const { sheenPalettes, sheenGradient } = await import('./tuning.js');
    for (const name of Object.keys(sheenPalettes)) {
      expect(sheenPalettes[name]).toHaveLength(5);
      const gradient = sheenGradient(name);
      expect(gradient.startsWith('repeating-linear-gradient(115deg,')).toBe(true);
      expect(gradient).toContain('170px');
    }
  });
});
