const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 5173,
    open: true
  },
  publicPath:"/demo/",
  transpileDependencies: true
})
