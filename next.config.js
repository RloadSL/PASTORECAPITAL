/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'es'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'es',
    localeDetection: false,
  }/* ,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  } */
}

module.exports = nextConfig
