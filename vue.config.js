
const path = require('path')

module.exports = {
  lintOnSave: false,
  publicPath: '/v-full-page',
  outputDir: process.env.IS_LIB ? 'lib-dist' : 'dist',
  chainWebpack: config => {

  }
}