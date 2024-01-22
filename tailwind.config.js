module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'sexy-yellow': '#EBFAC6',
        'hot-blue': '#AEECEF',
        'egg-white': '#F7F7F7',
      },
      backgroundImage: {
        'finn': "url('/img/fin-pix.jpg')",
      }
    },
    fontFamily: {
      'header': ['Satoshi', 'sans-serif'],
      'body': ['"Cabinet Grotesk"', 'sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
