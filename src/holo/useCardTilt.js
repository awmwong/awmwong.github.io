import { useEffect, useRef } from 'react';
import { springStep, pointerToTilt, idleSway, tiltMagnitude } from './tilt.js';
import { motionTuning } from './tuning.js';

// Drives the holo card via CSS custom properties on the returned ref's
// element. Writes happen in a rAF loop, not React state, so the card
// never re-renders while animating.
export default function useCardTilt() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--px', '38%');
      el.style.setProperty('--py', '30%');
      el.style.setProperty('--tilt', '0.35');
      return undefined;
    }

    let rafId = 0;
    let lastInput = -Infinity;
    let lastTime = performance.now();
    let springX = { value: 0, velocity: 0 };
    let springY = { value: 0, velocity: 0 };
    const target = { rx: 0, ry: 0 };

    const onPointerMove = (event) => {
      if (event.target instanceof Element && event.target.closest('[data-holo-ignore]')) {
        return;
      }
      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const tilt = pointerToTilt(event.clientX, event.clientY, viewport, motionTuning.maxTilt);
      target.rx = tilt.rx;
      target.ry = tilt.ry;
      lastInput = performance.now();
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const frame = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (now - lastInput > motionTuning.idleAfterMs) {
        const sway = idleSway(now / 1000, motionTuning.maxTilt * motionTuning.idleAmplitude);
        target.rx = sway.rx;
        target.ry = sway.ry;
      }

      const springOpts = { stiffness: motionTuning.stiffness, damping: motionTuning.damping };
      springX = springStep(springX, target.rx, dt, springOpts);
      springY = springStep(springY, target.ry, dt, springOpts);

      const rx = springX.value;
      const ry = springY.value;
      // Sheen/glare position follows the tilt, so pointer and idle sway
      // light the card the same way.
      const px = 50 - (ry / motionTuning.maxTilt) * 42;
      const py = 50 + (rx / motionTuning.maxTilt) * 42;

      el.style.setProperty('--rx', `${rx.toFixed(3)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(3)}deg`);
      el.style.setProperty('--px', `${px.toFixed(2)}%`);
      el.style.setProperty('--py', `${py.toFixed(2)}%`);
      el.style.setProperty('--tilt', tiltMagnitude(rx, ry, motionTuning.maxTilt).toFixed(3));

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return cardRef;
}
