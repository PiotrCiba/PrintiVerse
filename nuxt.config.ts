// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  Middleware:["/server/api/featured", "/server/api/query.get"],
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core']
  }
}
