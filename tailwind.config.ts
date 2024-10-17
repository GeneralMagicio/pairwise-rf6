import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        mxl: ['1,375rem', '2.125rem'],
      },
      colors: {
        primary: '#FF0420',
        gray: {
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
        blue: {
          foreground: '#3374DB',
          background: '#D6E4FF',
          link: '#3374DB',
        },
        dark: {
          500: '#05060B',
          600: '#101828',
        },
        status: {
          border: {
            success: '#75E0A7',
            error: '#FDA29B',
            expired: '#FEC84B',
          },
          text: {
            error: '#D92D20',
            expired: '#DC6803',
          },
          bg: {
            error: '#FEF3F2',
          },
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
        'social-gradient': 'linear-gradient(145.08deg, #E0FFC1 0%, #E6EFFF 100%)',
      },
      screens: {
        // small laptops
        sl: { max: '1400px' },
        // laptops
        l: { max: '1920px' },
      },
    },
  },
  plugins: [],
};
export default config;
