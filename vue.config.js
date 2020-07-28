// vue.config.js
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  filenameHashing: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  configureWebpack: {},
  chainWebpack: {},
  css: {
    loaderOptions: {
      css: {
        modules: {
          localIdentName: "[name]-[hash]"
        },
        localscONVENTION: "camelCaseOnly"
      }
    }
  }
}
