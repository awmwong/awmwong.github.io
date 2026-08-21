import React, { useEffect, useState } from 'react';
import { makeBlobs, blobColorsFor } from './blobs.js';

// The card's colorful environment: soft animated gradient blobs (the v6
// look). Freezes under prefers-reduced-motion.
export default function BlobField({ paletteIndex }) {
  const [blobs, setBlobs] = useState([]);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    setBlobs(makeBlobs(10, viewport, blobColorsFor(paletteIndex), Math.random));
  }, [paletteIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`fixed rounded-full mix-blend-screen filter blur-3xl ${still ? '' : blob.animation} ${blob.color}`}
          style={{
            top: `${blob.top}px`,
            left: `${blob.left}px`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            opacity: blob.opacity,
          }}
        ></div>
      ))}
    </div>
  );
}
