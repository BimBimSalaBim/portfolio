const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
  },
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: '',
  project: '',
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
})
