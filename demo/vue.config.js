const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8081,
    open: true
  },
  publicPath:"/demo/",
  transpileDependencies: true
})
