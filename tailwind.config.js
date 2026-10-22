/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        room: {
          dark: '#0c0e14',
          panel: '#151922',
          border: '#1f2430',
        },
        accent: {
          pink: '#f43f5e',
          glow: '#fb7185',
        },
        warm: {
          amber: '#f59e0b',
          glow: '#fbbf24',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
