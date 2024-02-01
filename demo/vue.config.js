const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8081,
    open: true
  },
  publicPath: "/demo/",
  transpileDependencies: true,
  
  //sass-loader 简单配置
  css: {
    loaderOptions: {
      sass: {
        // 全局引入样式
        additionalData: `@import "~@/assets/css/gradient.scss";`
      }
    }
  }
})
