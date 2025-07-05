/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./_includes/**/*.{html,js,njk,md}",
    "./_layouts/**/*.{html,js,njk,md}"
  ],
  theme: {
    extend: {
      colors: {
        // Darcula-inspired color palette
        darcula: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1a1a',
          950: '#0d1117'
        },
        // VS Code Darcula colors
        'vs-bg': '#2b2b2b',
        'vs-fg': '#a9b7c6',
        'vs-blue': '#6897bb',
        'vs-green': '#6a8759',
        'vs-orange': '#cc7832',
        'vs-red': '#bc3f3c',
        'vs-purple': '#9876aa',
        'vs-yellow': '#ffc66d',
        'vs-cyan': '#6a8759'
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 