const { defineConfig } = require('@vue/cli-service')
const unpluginElementPlus = require('unplugin-element-plus/webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = defineConfig({
  devServer: {
    port: 8081,
    open: true,
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (error?.message === "ResizeObserver loop completed with undelivered notifications.") {
            return false
          }
          return true
        },
      },
    },
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
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin({
      //   analyzerPort: 8088
      // }),
      unpluginElementPlus({
        useSource: false,
      }),
    ],
  }
})
