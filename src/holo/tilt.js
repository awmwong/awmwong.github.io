// Pure math for the holo card: a damped spring for weighty tilt, the
// pointer-to-rotation mapping, and the autonomous idle sway.

const MAX_DT = 1 / 20; // clamp big gaps (background tabs) so the spring stays stable

export function springStep(state, target, dt, { stiffness = 130, damping = 20 } = {}) {
  const step = Math.min(dt, MAX_DT);
  const acceleration = stiffness * (target - state.value) - damping * state.velocity;
  const velocity = state.velocity + acceleration * step;
  return { value: state.value + velocity * step, velocity };
}

// Tilt faces the pointer: the card corner under the cursor comes forward.
// CSS rotateX(+) tips the top away; rotateY(+) tips the right edge away.
export function pointerToTilt(px, py, viewport, maxTilt = 12) {
  const nx = Math.max(-1, Math.min(1, (px / viewport.width) * 2 - 1));
  const ny = Math.max(-1, Math.min(1, (py / viewport.height) * 2 - 1));
  return { rx: ny * maxTilt, ry: -nx * maxTilt };
}

// Slow lissajous drift for the idle state; incommensurate frequencies so
// the path never visibly repeats.
export function idleSway(tSeconds, amplitude = 7) {
  return {
    rx: Math.sin(tSeconds * 0.43) * amplitude * 0.55,
    ry: Math.sin(tSeconds * 0.31 + 1.3) * amplitude,
  };
}

export function tiltMagnitude(rx, ry, maxTilt) {
  return Math.min(1, Math.hypot(rx, ry) / maxTilt);
}
