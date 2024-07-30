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
    fontSize: {
      16: ['1.6rem'],
      24: ['2.4rem'],
    },
    extend: {
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
      },
    },
  },
  plugins: [],
};
