/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_includes/**/*.njk",
    "./src/_includes/shared/**/*.njk",
    "./src/_layouts/**/*.njk",
    "./src/_data/**/*.js",
    "./src/_data/**/*.json",
    "./src/css/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Logo Colors
        'logo-blue': '#00BFFF', // Electric Blue
        'logo-orange': '#FFA500', // Amber Orange
        'logo-orange-dark': '#FF8C00', // Darker Amber
        'logo-orange-core': '#FF4500', // Burnt Orange
        
        // Background Colors
        'logo-navy': '#0A0F1C', // Dark Navy
        'logo-navy-alt': '#0B1D2A', // Alternative Navy
        
        // Accent Colors
        'logo-circuit': '#124B70', // Circuit Line Blue
        'logo-circuit-alt': '#0E4C68', // Alternative Circuit
        'logo-steel': '#1C2B3A', // Steel Gray
        'logo-glow': '#3ECFFF', // Glow Blue
        
        // Legacy Darcula colors (keeping for compatibility)
        'darcula': {
          900: '#0A0F1C', // Updated to logo navy
          800: '#1C2B3A', // Updated to steel gray
          700: '#124B70', // Updated to circuit blue
          600: '#0E4C68', // Updated to alt circuit
          500: '#3ECFFF', // Updated to glow blue
          400: '#00BFFF', // Updated to logo blue
          300: '#1DAEFF', // Alternative blue
          200: '#FFA500', // Updated to logo orange
          100: '#FF8C00' // Updated to darker orange
        },
        
        // Updated VS Code colors to match logo
        'vs-fg': '#E8F4FD', // Light blue-tinted text
        'vs-bg': '#0A0F1C', // Logo navy background
        'vs-blue': '#00BFFF', // Logo electric blue
        'vs-green': '#00D4AA', // Teal green for contrast
        'vs-orange': '#FFA500', // Logo amber orange
        'vs-purple': '#8B5CF6', // Purple for variety
        'vs-red': '#EF4444', // Red for alerts
        'vs-yellow': '#F59E0B', // Yellow for warnings
        
        // Blog-specific color mappings for compatibility
        'bg-dark': '#0A0F1C', // Logo navy
        'text-primary': '#E8F4FD', // VS foreground
        'accent-primary': '#00BFFF', // Logo blue
        'accent-secondary': '#3ECFFF', // Logo glow
        'text-secondary': '#E8F4FD', // VS foreground
        'text-muted': '#E8F4FD', // VS foreground with opacity
        'border-color': '#124B70', // Logo circuit
        'card-bg': '#1C2B3A', // Logo steel
        'hover-bg': '#124B70' // Logo circuit
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
