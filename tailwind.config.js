/** @type {import('tailwindcss').Config} */
module.exports = {
  // Nextra handles dark mode automatically via theme.config.tsx
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './theme.config.tsx',
  ],
  theme: {
    extend: {
      colors: {
        discord: '#5865F2',
        'discord-hover': '#4752C4',
      },
    },
  },
  plugins: [],
}
