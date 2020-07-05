//开发环境配置

const path = require('path');
function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports =  {
  pages: {
      index: {
          entry: 'apps/main.js',
          template: 'public/index.html',
          filename: 'index.html',
      },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@app/styles/common/variable.scss";'
      }
    }
  },
  configureWebpack: {
      resolve: {
          extensions: ['.js', '.vue', '.json'],
          alias: {
              '@app': resolve('./../apps'),
              '@': resolve('./../src'),
              '@packages': resolve('./../packages'),
          }
      }
  },
  chainWebpack: config => {
      config.module
          .rule('js')
          .include
          .add('/packages')
          .end()
          .use('babel')
          .loader('babel-loader')
          .tap(options => {
              return options
          })
  },
  devServer: {
      port: 8091,
      hot: true,
      open: 'Google Chrome'
  }
}