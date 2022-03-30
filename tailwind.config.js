const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {    fontFamily: {
      hafs: ['UthmanicHafs', ...defaultTheme.fontFamily.sans ],
      arabicSans: ['Noto Naskh Arabic', ...defaultTheme.fontFamily.sans],
    },
},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
