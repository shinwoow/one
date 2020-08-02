// vue.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  filenameHashing: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"))
      .set("_css", resolve("src/assets/css"));
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/assets/css/mixins.scss"),
        path.resolve(__dirname, "./src/assets/css/variable.scss")
      ]
    }
  },
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 7777,
    https: false,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          "^/api": "/"
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
};
