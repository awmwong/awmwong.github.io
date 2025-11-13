/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Blob background colors
    'bg-purple-600', 'bg-pink-500', 'bg-orange-400',
    'bg-blue-600', 'bg-cyan-500', 'bg-teal-400',
    'bg-indigo-600', 'bg-purple-500', 'bg-pink-400',
    'bg-emerald-600', 'bg-teal-500', 'bg-cyan-400',
    'bg-rose-600', 'bg-fuchsia-400',
    'bg-amber-600', 'bg-orange-500', 'bg-red-400',
    'bg-violet-600', 'bg-indigo-500', 'bg-blue-400',
    'bg-sky-600',
    'bg-fuchsia-600', 'bg-purple-400',
    'bg-lime-600', 'bg-green-500', 'bg-emerald-400',
    'bg-red-600', 'bg-yellow-400',
    'bg-cyan-600',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
