const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        hafs: ['UthmanicHafs', ...defaultTheme.fontFamily.sans ],
        arabicSans: ['Noto Naskh Arabic', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        '0': '0',
      },
      colors: {
        quran: {
          paper: '#FAFAFD',
          verse: '#03588C',
          number: '#8C1111',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
