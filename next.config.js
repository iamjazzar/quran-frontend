/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  extensions: [".ts", ".tsx"],
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
  },
}

module.exports = nextConfig
