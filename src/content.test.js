import { describe, expect, test } from 'bun:test';
import { card } from './content.js';

// Guards the v7 copy decisions from SPEC.md §1.
describe('card content', () => {
  test('tagline is the cardified linkedin headline', () => {
    expect(card.body).toBe('A decade of turning messy engineering problems into products that scale.');
  });

  test('subtitle and status line', () => {
    expect(card.title).toBe('Principal Software Engineer');
    expect(card.status.prefix).toBe('Currently @');
    expect(card.status.company).toBe('Windscribe');
    expect(card.status.url).toBe('https://windscribe.com');
  });

  test('focuses are the three defensible pillars', () => {
    expect(card.focuses).toEqual([
      'App Architecture',
      'APIs & Services',
      'DevEx & CI/CD',
    ]);
  });

  test('social links are unchanged', () => {
    const urls = card.socials.map((s) => s.url);
    expect(urls).toContain('https://linkedin.com/in/awmwong');
    expect(urls).toContain('https://github.com/awmwong');
  });
});
