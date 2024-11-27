import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/assets/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        mxl: ['1,375rem', '2.125rem'],
      },
      colors: {
        'primary': '#FF0420',
        'op': {
          neutral: {
            300: '#CBD5E0',
          },
          red: {
            100: '#FFF0F1',
          },
        },
        'gray': {
          50: '#FBFCFE',
          100: '#F2F3F8',
          200: '#E0E2EB',
          300: '#F2F4F7',
          400: '#636779',
          500: '#98A2B3',
          600: '#404454',
          700: '#0F111A',
          placeholder: '#667085',
          border: '#EAECF0',
        },
        'blue': {
          foreground: '#3374DB',
          background: '#D6E4FF',
          link: '#3374DB',
        },
        'dark': {
          500: '#05060B',
          600: '#101828',
          900: '#050608',
        },
        'status': {
          border: {
            success: '#75E0A7',
            error: '#FF99A1',
            expired: '#FEC84B',
          },
          text: {
            error: '#FF0420',
            expired: '#DC6803',
          },
          bg: {
            error: '#FEF3F2',
            expired: '#FFFAEB',
          },
        },
        'category-tab': {
          active: '#FFD1D5',
          inactive: '#FBFCFE',
        },
        'voting': { // voting status badge
          bg: '#ECFDF3',
          text: '#079455',
          border: '#17B26A',
        },
      },
      fontFamily: {
        sans: ['"Inter var", sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rating-illustration': 'url(\'/assets/images/rating-bg.svg\')',
        'conflict-loading': 'url(\'/assets/images/loading-bg.svg\')',
        'good-rating': 'url(\'/assets/images/good-rating-bg.svg\')',
        'ballot': 'url(\'/assets/images/ballot-bg.svg\')',
        'voting-power': 'url(\'/assets/images/bg-voting-power.svg\')',
        'badge-modal': 'url(\'/assets/images/badge-modal-cover.svg\')',
        'river-left-right': 'url(\'/assets/images/river-left.svg\'),url(\'/assets/images/river-right.svg\')',
      },
      backgroundPosition: {
        river: 'left top,right top',
      },
      backgroundSize: {
        'river-left-right': '50% auto',
      },

      screens: {
        // small laptops
        sl: { max: '1400px' },
        // laptops
        l: { max: '1920px' },
      },
      scale: {
        210: '2.1',
      },
    },
  },
  plugins: [],
};
export default config;
