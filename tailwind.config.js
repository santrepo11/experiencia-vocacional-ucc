export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ucc: {
          blue: '#003B70',
          green: '#8CC63E',
          light: '#F5F7FA',
          navy: '#062A4D',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,59,112,0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
