/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // => @media (max-width: 1119px) { ... }
      md: { max: '1199px' }, // tablet

      // => @media (max-width: 743px) { ... }
      sm: { max: '743px' }, // mobile
    },
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
    fontSize: {
      '16-500': [
        '1.6rem',
        {
          fontWeight: '500',
        },
      ],
      '16-600': [
        '1.6rem',
        {
          fontWeight: '600',
        },
      ],
      '16-700': [
        '1.6rem',
        {
          fontWeight: '600',
        },
      ],
    },
    colors: {
      // 예시) <p className="bg-gray-D">
      black: {
        0: '#000000',
        1: '#171717',
        3: '#333236',
        4: '#4B4B4B',
      },
      gray: {
        7: '#787486',
        9: '#9FA6B2',
        D: '#D9D9D9',
        E: '#EEEEEE',
        F: '#FAFAFA',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      violet: {
        5: '#5534DA',
        F: '#F1EFFD',
      },
      red: {
        DEFAULT: '#D6173A',
      },
      green: {
        DEFAULT: '#7AC555',
      },
      orange: {
        DEFAULT: '#FFA500',
      },
      blue: {
        DEFAULT: '#76A5EA',
      },
    },
  },
  plugins: [],
};
