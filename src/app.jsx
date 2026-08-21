import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { card } from './content.js';
import useCardTilt from './holo/useCardTilt.js';
import DebugPanel from './holo/DebugPanel.jsx';
import BlobField from './bg/BlobField.jsx';
import { pickPaletteIndex, envColorsFor } from './bg/blobs.js';

const Linkedin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const Github = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
);

const socialIcons = { linkedin: Linkedin, github: Github };

function Card() {
  const cardRef = useCardTilt();
  return (
    <div className="holo-scene relative z-10 max-w-lg w-full">
      <div ref={cardRef} className="holo-card relative border border-white/15 rounded-2xl p-10"
        style={{
          background: 'linear-gradient(145deg, #1d1d24 0%, #121216 55%, #0d0d10 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 40px 80px -24px rgba(0,0,0,0.8), 0 12px 28px -12px rgba(0,0,0,0.6)',
        }}>
        <div className="holo-layer holo-reflect" aria-hidden="true" />
        <div className="holo-layer holo-sheen" aria-hidden="true" />
        <div className="holo-layer holo-streak" aria-hidden="true" />
        <div className="holo-layer holo-grain" aria-hidden="true" />
        <div className="relative flex flex-col space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          {card.name}
        </h1>

        <div className="space-y-1">
          <p className="text-lg text-white/90 font-medium">
            {card.title}
          </p>
          <p className="text-sm text-white/70">
            {card.status.prefix}{' '}
            <a
              href={card.status.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/85 underline decoration-white/40 underline-offset-2 hover:text-white hover:decoration-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              aria-label={`${card.status.company} website`}
            >
              {card.status.company}
            </a>
          </p>
        </div>

        <p className="text-sm text-white/75 leading-relaxed">
          {card.body}
        </p>

        <div className="pt-2">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-2 font-semibold">
            Focuses
          </p>
          <div className="flex flex-wrap gap-2">
            {card.focuses.map((focus) => (
              <span
                key={focus}
                className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/90 font-medium"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {card.socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/25 border border-white/20 hover:border-white/50 rounded-full p-3 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5 text-white group-hover:text-white/90" />
              </a>
            );
          })}
        </div>
        </div>
        <div className="holo-layer holo-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

function AnthonyWong() {
  const showDebug = new URLSearchParams(location.search).has('debug');
  const [paletteIndex] = useState(() => pickPaletteIndex(Math.random));

  // The card's reflection layer shares the environment palette.
  useEffect(() => {
    const [a, b, c] = envColorsFor(paletteIndex);
    const root = document.documentElement;
    root.style.setProperty('--env-a', a);
    root.style.setProperty('--env-b', b);
    root.style.setProperty('--env-c', c);
  }, [paletteIndex]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-neutral-950 touch-none overscroll-none">
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(38,38,42,0.9), rgba(10,10,12,1) 70%)' }}
      />
      <BlobField paletteIndex={paletteIndex} />
      <Card />
      {showDebug && <DebugPanel />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AnthonyWong />);
