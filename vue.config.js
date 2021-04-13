/**
 * @description 复写webpack构建对象
 */

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const cdn = require("./config/cdn");
const { name } = require("./package.json");
const compressionWebpackPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 9000;

let devServer = {
  port,
  open: true,
  // 代理配置
  proxy: {
    // 配置域名跨域
    "/api": {
      target: "http://dev.example.com",
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
};

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: isDev,
  productionSourceMap: false,
  devServer,
  configureWebpack: {
    name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                // 并发构建
                parallel: true,
                compress: {
                  // 生产配置不打印console
                  drop_console: true,
                },
              },
            }),
          ],
        }
      : {},
    // 配置生产使用外链导入共有依赖，此处需要继续配置index.html。
    externals: isProduction
      ? {
          vue: "vue",
          vuex: "Vuex",
          "vue-router": "VueRouter",
          axios: "axios",
        }
      : {},
  },
  // 部分包会使用ES6等高级语法，导致转义不成功，在IE等环节会报错，默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // webpack 操作
  chainWebpack(config) {
    // 生产代码切包
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.plugin("html").tap((opt) => {
        opt[0].cdn = cdn;
        opt[0].title = name;
        return opt;
      });

      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
      // add gzip 支持
      config.plugin("compressionWebpackPlugin").use(compressionWebpackPlugin);
    });
  },
};
