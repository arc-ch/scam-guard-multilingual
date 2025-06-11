/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  // ... your existing config
  safelist: [
    'bg-red-500/20',
    'text-red-500',
    'bg-red-500',
    'text-red-600',
    // Add any other conditional classes you use
  ],
  // ... rest of config
}
