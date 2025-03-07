import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '7xl': '80rem',
      },
      animation: {
        'smoke': 'smoke 2s ease-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        smoke: {
          '0%': { transform: 'scale(0.3) translate(0, 0)', opacity: '0.5' },
          '100%': { transform: 'scale(2) translate(0, -100px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config 