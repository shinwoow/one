// vue.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  indexPath: "index.html",
  filenameHashing: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  transpileDependencies: [],
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
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
    },
    pwa: {
      iconPaths: {
        favicon32: './favicon.ico',
        favicon16: './favicon.ico',
        appleTouchIcon: './favicon.ico',
        maskIcon: './favicon.ico',
        msTileImage: './favicon.ico'
      }
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
