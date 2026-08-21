import React, { useEffect, useState } from 'react';
import { motionTuning, motionKnobs, cssKnobs, sheenPalettes, sheenGradient } from './tuning.js';

// ?debug tuning panel: sliders drive the live motion config and the CSS
// custom properties, so numbers can be locked down by feel.
export default function DebugPanel() {
  const [values, setValues] = useState(() => {
    const initial = {};
    for (const knob of motionKnobs) initial[knob.key] = motionTuning[knob.key];
    for (const knob of cssKnobs) initial[knob.name] = knob.initial;
    return initial;
  });
  const [fps, setFps] = useState(0);
  const [copied, setCopied] = useState(false);
  const [palette, setPalette] = useState('silver');

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let rafId = 0;
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const setMotion = (key, value) => {
    motionTuning[key] = value;
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const setCss = (knob, value) => {
    document.documentElement.style.setProperty(knob.name, `${value}${knob.unit}`);
    setValues((prev) => ({ ...prev, [knob.name]: value }));
  };

  const applyPalette = (name) => {
    document.documentElement.style.setProperty('--sheen-gradient', sheenGradient(name));
    setPalette(name);
  };

  const copyValues = async () => {
    const snapshot = {
      palette,
      motion: Object.fromEntries(motionKnobs.map((k) => [k.key, values[k.key]])),
      css: Object.fromEntries(cssKnobs.map((k) => [k.name, `${values[k.name]}${k.unit}`])),
    };
    const text = JSON.stringify(snapshot, null, 2);
    console.log('holo tuning snapshot:\n' + text);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // console output above is the fallback
    }
  };

  const slider = (id, label, min, max, step, value, onChange) => (
    <label key={id} className="block">
      <span className="flex justify-between text-[10px] text-white/60">
        <span>{label}</span>
        <span className="tabular-nums text-white/90">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-white/80"
      />
    </label>
  );

  return (
    <div data-holo-ignore className="fixed top-3 right-3 z-50 w-56 max-h-[90vh] overflow-y-auto rounded-lg bg-black/80 border border-white/15 p-3 space-y-1.5 font-mono backdrop-blur">
      <div className="flex justify-between items-center text-[11px] text-white/80">
        <span>holo tuning</span>
        <span className="tabular-nums">{fps} fps</span>
      </div>
      <p className="text-[10px] text-white/40 uppercase tracking-wider pt-1">Motion</p>
      {motionKnobs.map((knob) =>
        slider(knob.key, knob.label, knob.min, knob.max, knob.step, values[knob.key],
          (value) => setMotion(knob.key, value)))}
      <p className="text-[10px] text-white/40 uppercase tracking-wider pt-1">Surface</p>
      <label className="block">
        <span className="text-[10px] text-white/60">sheen palette</span>
        <select
          value={palette}
          onChange={(event) => applyPalette(event.target.value)}
          className="w-full mt-0.5 rounded bg-white/10 border border-white/20 text-[11px] text-white/90 py-0.5 px-1"
        >
          {Object.keys(sheenPalettes).map((name) => (
            <option key={name} value={name} className="bg-neutral-900">{name}</option>
          ))}
        </select>
      </label>
      {cssKnobs.map((knob) =>
        slider(knob.name, knob.label, knob.min, knob.max, knob.step, values[knob.name],
          (value) => setCss(knob, value)))}
      <button
        type="button"
        onClick={copyValues}
        className="w-full mt-2 rounded bg-white/10 hover:bg-white/20 border border-white/20 py-1 text-[11px] text-white/90"
      >
        {copied ? 'copied!' : 'copy values'}
      </button>
    </div>
  );
}
