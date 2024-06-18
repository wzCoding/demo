const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({

  //开发服务器配置
  devServer: {
    port: 8081,
    open: true,
    client: {
      overlay: {
        //运行时异常报错处理
        runtimeErrors: (error) => {
          if (error?.message === "ResizeObserver loop completed with undelivered notifications.") {
            return false
          }
          return true
        },
      },
    },
  },

  //基本配置
  publicPath: "/demo/",
  transpileDependencies: true,
  productionSourceMap: false,

  //css 配置
  css: {
    loaderOptions: {
      //sass-loader 简单配置
      sass: {
        // 全局引入样式
        additionalData: `@import "~@/assets/css/gradient.scss";`
      }
    }
  },

  //webpack 一般配置
  configureWebpack: {
    externals: {
      "vue": "Vue",
      "vue-router": "VueRouter",
      "element-plus": "ElementPlus",
      "echarts": "echarts",
      "three": "THREE",
      "exceljs": "ExcelJS",
      "mockjs": "Mock",
      "highlight.js": "hljs"
    }
  }
})
