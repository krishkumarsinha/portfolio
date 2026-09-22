/** @type {import('tailwindcss').Config} */
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
      },
      spacing: {
        'phi-xs': 'var(--space-xs)',
        'phi-sm': 'var(--space-sm)',
        'phi-md': 'var(--space-md)',
        'phi-lg': 'var(--space-lg)',
        'phi-xl': 'var(--space-xl)',
        'phi-2xl': 'var(--space-2xl)',
      },
      fontSize: {
        'phi-xs': 'var(--font-xs)',
        'phi-sm': 'var(--font-sm)',
        'phi-base': 'var(--font-base)',
        'phi-h4': 'var(--font-h4)',
        'phi-h3': 'var(--font-h3)',
        'phi-h2': 'var(--font-h2)',
        'phi-h1': 'var(--font-h1)',
      },
      aspectRatio: {
        'golden': '1.618 / 1',
        'golden-portrait': '1 / 1.618',
      },
    },
  },
  plugins: [containerQueries],
};
