import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', 
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
        anime: ['"Noto Sans Thai"', 'Prompt', 'Sarabun', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#ffa347',
          DEFAULT: '#ff6600',
          dark: '#cc5200',
        },
        peach: '#ffe6d9',
        blossom: '#ffbfcf',
        tea: '#edf6f9',
        ink: '#333',
      },
    },
  },
  plugins: [],
}

export default config
