const webpack = require("webpack");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const resolveApp = require("./path");
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const testConfig = require("./webpack.test");

const commonConfig = {
  entry: {
    index: "./src/index.js",
    // shared: ['react', 'react-dom'], //多入口三方库分离
  },
  output: {
    filename: "js/[name].[contenthash:8].bundle.js",
    path: resolveApp("./dist"),
    chunkFilename: "js/[name].[contenthash:8].bundle.js",
    // publicPath: 'https://cdn.example.com/assets/[fullhash]'
    // assetModuleFilename: 'img/[name].[hash:6][ext]'
  },
  resolve: {
    extensions: [".jsx", ".js", ".css", ".less", ".ts", ".tsx", "..."], //顺序优先级， ... 扩展运算符代表默认配置
    modules: [resolveApp("src"), "node_modules"], //优先 src 目录下查找需要解析的文件，会大大节省查找时间
    alias: {
      "~": resolveApp("src"),
      "@": resolveApp("src"),
      components: resolveApp("src/components"),
    },
  },
  /**
   *  asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
   *  asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
   *  asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
   *  asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource
   */
  module: {
    rules: [
      {
        test: /\.(jpe?g|svg|png|gif|webp)$/i,
        type: "asset",
        generator: {
          filename: "img/[name].[contenthash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 超过100kb不转 base64
          },
        },
      },
      {
        test: /\.ttf$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[ext]",
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /.md$/,
        exclude: /node_modules/,
        use: ["./markdown-loader"],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new HtmlWebpackPlugin({
      title: "study webpack",
      template: "./public/index.html",
    }),
    new ESLintPlugin(),
    // new webpack.DllReferencePlugin({
    //     context: resolveApp('./'),
    //     manifest: resolveApp('./dll/mainfest.json')
    // }),
    // new AddAssetHtmlPlugin({
    //     outputPath: 'js',
    //     filepath: resolveApp('./dll/dll_react.js'),
    // })
  ],
  /**
   * 排除三方包改用cdn
   */
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

module.exports = (env) => {
  const TARGET = process.env.npm_lifecycle_event;
  if (TARGET === "start") {
    process.env.NODE_ENV = "development";
    return merge(commonConfig, devConfig);
  }
  if (TARGET === "build") {
    process.env.NODE_ENV = "production";
    return merge(commonConfig, prodConfig);
  }
  if (TARGET === "test") {
    process.env.NODE_ENV = "development";
    return merge(commonConfig, testConfig);
  }
};
