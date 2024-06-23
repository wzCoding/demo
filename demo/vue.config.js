const { defineConfig } = require('@vue/cli-service')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

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
    //输出配置
    output: {
      pathinfo: false,
    },
    //缓存配置
    cache: {
      type: 'filesystem',
      version: '0.0.1'
    },
    //优化配置
    optimization: {
      //生成运行时chunk，减小入口chunk体积
      runtimeChunk: true,
      //启用压缩插件配置
      minimize: true,
    },
    //插件配置
    plugins: [
      //css 压缩
      new CssMinimizerPlugin()
    ],
    //外部依赖设置
    externals: {
      "vue": "Vue",
      "vue-router": "VueRouter",
      "pinia":"Pinia",
      "element-plus": "ElementPlus",
      "echarts": "echarts",
      "three": "THREE",
      "exceljs": "ExcelJS",
      "mockjs": "Mock",
      "highlight.js": "hljs"
    }
  },

  //webpack 详细配置
  chainWebpack: (config) => {
    //设置 resolve.extensions 配置
    const list = ['.js', '.vue', '.json']
    const extensions = config.resolve.extensions
    extensions.clear()
    list.forEach(e => extensions.add(e))
  }
})
