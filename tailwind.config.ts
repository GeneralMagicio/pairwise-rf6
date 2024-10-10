import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rating-illustration': 'url(\'/assets/images/rating-bg.svg\')',
        'conflict-loading': 'url(\'/assets/images/loading-bg.svg\')',
        'good-rating': 'url(\'/assets/images/good-rating-bg.svg\')',
        'ballot': 'url(\'/assets/images/ballot-bg.svg\')',
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
