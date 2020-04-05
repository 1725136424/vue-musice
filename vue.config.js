module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }]
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/personal',
        '/singer',
        '/recommend',
        '/detail',
        '/search',
        '/rank'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
