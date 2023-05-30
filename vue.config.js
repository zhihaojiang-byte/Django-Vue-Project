const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // Development server setting. solve cross-domain problem in Vue.
  devServer: {
    proxy: {
      // use proxy when request for url start with "/api"
      '/api': {
        target: 'http://127.0.0.1:7000/', // the backend domain
        changeOrigin: true,
        // rewrite the url , remove "/api" in the url
        pathRewrite: {
          '^/api': ''
        }
      }
    }



  }
})
