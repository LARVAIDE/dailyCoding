const webpack = require('webpack');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyPlugin = require('./myPlugin');

module.exports = {
  entry: {
    index: './src/test.js'
  },
  mode: 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(jpe?g|svg|png|gif|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[contenthash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 超过100kb不转 base64
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
        sideEffects: true
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CleanWebpackPlugin(),
    new MyPlugin()
  ]
};
