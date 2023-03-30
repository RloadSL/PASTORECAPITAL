/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  i18n: {
    locales: ['en', 'es'],
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
