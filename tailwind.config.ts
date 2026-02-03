import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Andes Trek
        'brand-green': '#5c7045',
        'brand-dark': '#1a1a1a',
        'brand-earth': '#8c7b6c',
        'brand-gray': '#f4f4f4',
        // Travel Journey
        'brand-red': '#d64541',
        // MNTN
        'mntn-bg': '#0B1D26',
        'mntn-gold': '#FBD784',
        'mntn-gray': '#bdc3c7',
        // Patagonia
        'brand-orange': '#FF4500',
        'brand-blue': '#E1F5FE',
        'brand-accent': '#00BCD4',
      },
      fontFamily: {
        // Andes Trek
        'script': ['"Dancing Script"', 'cursive'],
        'heading': ['"Oswald"', 'sans-serif'],
        'body': ['"Roboto"', 'sans-serif'],
        // Travel Journey
        'sans': ['"Montserrat"', 'sans-serif'],
        'serif': ['"Cormorant Garamond"', 'serif'],
        // MNTN
        'manrope': ['"Manrope"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        // Patagonia
        'outfit': ['"Outfit"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3.5rem',
      },
      backgroundImage: {
        // Andes Trek
        'topo-pattern': "url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\\' fill=\\'%239C92AC\\' fill-opacity=\\'0.1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')",
        // MNTN
        'hero-gradient': 'linear-gradient(180deg, rgba(11,29,38,0) 0%, #0B1D26 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(11,29,38,0) 0%, rgba(11,29,38,0.8) 100%)',
        // Patagonia
        'ice-gradient': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(225,245,254,0.5) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
