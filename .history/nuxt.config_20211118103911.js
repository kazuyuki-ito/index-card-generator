module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'index-card-generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: ['assets/css/reset.css', 'assets/css/common.css'],

  modules: [
    'nuxt-material-design-icons',
    'nuxt-webfontloader'
  ],

  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:200;300;400;500;600;700;900', 'Noto+Serif+JP:200;300;400;500;600;700;900', 'Hachi+Maru+Pop']
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

