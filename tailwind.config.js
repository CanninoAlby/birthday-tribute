/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#ECE0D0',
          300: '#DEC9B0',
          400: '#CCA888',
          500: '#BA8D65',
          600: '#9E714C',
          700: '#7F573C',
          800: '#644431',
          900: '#4D3426',
        },
        roseGold: {
          50: '#FBF6F6',
          100: '#F7EDED',
          200: '#EED9D9',
          300: '#E0BCBC',
          400: '#CF9999',
          500: '#BE7878',
          600: '#A65C5C',
          700: '#8A4848',
          800: '#703A3A',
          900: '#562D2D',
        },
        candle: {
          light: '#FFF9E6',
          glow: '#F9E2AF',
          flame: '#EBA059',
          ambient: 'rgba(235, 160, 89, 0.15)',
        },
        paper: '#FAF6EE',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Cormorant Garamond"', 'serif'],
        numeral: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'candle': '0 0 25px rgba(235, 160, 89, 0.25)',
        'candle-lg': '0 0 45px rgba(235, 160, 89, 0.35)',
        'soft': '0 10px 30px -10px rgba(77, 52, 38, 0.08)',
        'card': '0 20px 40px -15px rgba(77, 52, 38, 0.12)',
      },
      animation: {
        'flicker': 'flicker 2s infinite ease-in-out',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
