import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

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

function AnthonyWong() {
  const [gradient, setGradient] = useState({ from: '', via: '', to: '' });
  const [blobs, setBlobs] = useState([]);

  const colorPalettes = [
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

  useEffect(() => {
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    setGradient(randomPalette);

    const colors = [
      randomPalette.from.replace('from-', 'bg-'),
      randomPalette.via.replace('via-', 'bg-'),
      randomPalette.to.replace('to-', 'bg-'),
    ];

    const blobCount = 10;
    const generatedBlobs = Array(blobCount).fill(0).map((_, i) => ({
      // Random position anywhere on screen with some bleeding off edges
      top: Math.floor(Math.random() * window.innerHeight) - 300,
      left: Math.floor(Math.random() * window.innerWidth) - 300,
      size: 300 + Math.floor(Math.random() * 400),
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.35 + Math.random() * 0.3,
      animation: `animate-blob-${(i % 6) + 1}`
    }));

    setBlobs(generatedBlobs);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      {/* Animated Gradient Splashes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {blobs.map((blob, index) => (
          <div
            key={index}
            className={`fixed rounded-full mix-blend-screen filter blur-3xl ${blob.animation} ${blob.color}`}
            style={{
              top: `${blob.top}px`,
              left: `${blob.left}px`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              opacity: blob.opacity
            }}
          ></div>
        ))}
      </div>

      {/* Badge */}
      <div className="relative z-10 backdrop-blur-2xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Content */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Anthony Wong
          </h1>

          <div className="space-y-1">
            <p className="text-lg text-white/90 font-medium">
              Staff Software Engineer
            </p>
            <p className="text-sm text-white/70">
              Currently <span className="font-semibold text-white/85">between things</span>
            </p>
          </div>

          <p className="text-sm text-white/75 leading-relaxed">
            Building exceptional mobile experiences through robust infrastructure and thoughtful design
          </p>

          <div className="pt-2">
            <p className="text-xs text-white/60 uppercase tracking-wider mb-2 font-semibold">
              Focuses
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/90 font-medium">
                Native Development
              </span>
              <span className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/90 font-medium">
                Mobile Infrastructure
              </span>
              <span className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/90 font-medium">
                DevEx & CI/CD
              </span>
              <span className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/90 font-medium">
                API Architecture
              </span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-3 pt-4">
            <a
              href="https://linkedin.com/in/awmwong"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 text-white group-hover:text-white/90" />
            </a>
            <a
              href="https://github.com/awmwong"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 text-white group-hover:text-white/90" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AnthonyWong />);
