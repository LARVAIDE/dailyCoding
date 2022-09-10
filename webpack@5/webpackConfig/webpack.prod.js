const webpack = require("webpack");
const chalk = require("chalk");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const AssetsCdnPrefreshWebpackPlugin = require("../assets-cdn-prefresh-webpack-plugin");
const resolveApp = require("./path");
const glob = require("glob");

module.exports = {
  mode: "production",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, //向前找一个loader来处理文件，场景：使用@import()导入
            },
          },
          "postcss-loader",
        ],
        sideEffects: true, //避免css被treeshaking
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  optimization: {
    usedExports: true, //标记未使用的代码，结合minimizer-->terserWebpackPlugin实现tree shaking
    minimize: true, //false不使用minimizer
    minimizer: [
      new terserWebpackPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    chunkIds: "deterministic",
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 1,
      cacheGroups: {
        dlVendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendor.js",
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
        },
      },
    },
  },
  /**
   * 缓存生成的 webpack 模块和 chunk，来改善构建速度
   */
  cache: {
    type: "filesystem",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolveApp("./src")}/**/*`, { nodir: true }),
    }),
    new AssetsCdnPrefreshWebpackPlugin({
      publicPath: "https://cdn.91zhen.com",
    }),
    // new webpack.optimize.ModuleConcatenationPlugin(), //在使用 tree shaking 时必须有 ModuleConcatenationPlugin 的支持，production模式默认启用了，其他模式需要手动引入
    // new CompressionPlugin({
    //     test: /\.(css|js|ttf)$/,
    //     algorithm: 'gzip'
    // })
  ],
};
