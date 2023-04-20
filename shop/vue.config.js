const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    //项目打包时关闭生产Map文件
    productionSourceMap:false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
      proxy: {
        "/api": {
          target: "http://gmall-h5-api.atguigu.cn",
        },
      },
    },

})
