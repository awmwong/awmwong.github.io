import { describe, expect, test } from 'bun:test';
import { springStep, pointerToTilt, idleSway, tiltMagnitude } from './tilt.js';

describe('springStep', () => {
  test('converges to the target without exploding', () => {
    let state = { value: 0, velocity: 0 };
    for (let i = 0; i < 300; i++) {
      state = springStep(state, 10, 1 / 60);
      expect(Math.abs(state.value)).toBeLessThan(30);
    }
    expect(state.value).toBeCloseTo(10, 1);
    expect(Math.abs(state.velocity)).toBeLessThan(0.1);
  });

  test('large dt is clamped so background tabs cannot blow up the spring', () => {
    let state = { value: 0, velocity: 0 };
    state = springStep(state, 10, 5);
    expect(Number.isFinite(state.value)).toBe(true);
    expect(Math.abs(state.value)).toBeLessThan(30);
  });
});

describe('pointerToTilt', () => {
  const viewport = { width: 1000, height: 800 };

  test('center means flat', () => {
    const { rx, ry } = pointerToTilt(500, 400, viewport, 12);
    expect(rx).toBeCloseTo(0);
    expect(ry).toBeCloseTo(0);
  });

  test('pointer above center tips the top toward the viewer (rx negative)', () => {
    expect(pointerToTilt(500, 0, viewport, 12).rx).toBeCloseTo(-12);
  });

  test('pointer right of center brings the right edge forward (ry negative)', () => {
    expect(pointerToTilt(1000, 400, viewport, 12).ry).toBeCloseTo(-12);
  });

  test('never exceeds maxTilt even off-viewport', () => {
    const { rx, ry } = pointerToTilt(2000, -500, viewport, 12);
    expect(Math.abs(rx)).toBeLessThanOrEqual(12);
    expect(Math.abs(ry)).toBeLessThanOrEqual(12);
  });
});

describe('idleSway', () => {
  test('stays within amplitude and actually moves', () => {
    let min = Infinity;
    let max = -Infinity;
    for (let t = 0; t < 60; t += 0.25) {
      const { rx, ry } = idleSway(t, 7);
      expect(Math.abs(rx)).toBeLessThanOrEqual(7);
      expect(Math.abs(ry)).toBeLessThanOrEqual(7);
      min = Math.min(min, ry);
      max = Math.max(max, ry);
    }
    expect(max - min).toBeGreaterThan(5);
  });
});

describe('tiltMagnitude', () => {
  test('0 when flat, 1 at full tilt, clamped beyond', () => {
    expect(tiltMagnitude(0, 0, 12)).toBe(0);
    expect(tiltMagnitude(12, 0, 12)).toBeCloseTo(1);
    expect(tiltMagnitude(12, 12, 12)).toBe(1);
  });
});
