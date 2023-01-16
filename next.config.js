/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  } ,
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com'],
  }, 
  async redirects() {
    return [
      {
        source: '/tax-consultant/consultants/:id/services/',
        destination: '/tax-consultant/consultants/:id/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
