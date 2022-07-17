const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const terserWebpackPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: false,
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, 
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
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader', 
                'postcss-loader', 
                'less-loader'
            ]
        }]
    },
    optimization: {
        minimize: true,
        usedExports: true, //标记未使用的代码，结合minimizer-->terserWebpackPlugin实现tree shaking
        minimizer: [
            new terserWebpackPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ],
        chunkIds: 'deterministic',
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minChunks: 1,
            cacheGroups: {
                defaultVendors: {
                  test: /[\\/]node_modules[\\/]/,
                  filename: 'js/[name].vendor.js',
                  priority: -10,
                  reuseExistingChunk: true,
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'public',
                globOptions: {
                    ignore: ['**/index.html']
                }
            }]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(), //在使用 tree shaking 时必须有 ModuleConcatenationPlugin 的支持，production模式默认启用了，其他模式需要手动引入
        new CompressionPlugin({
            test: /\.(css|js|ttf)$/,
            algorithm: 'gzip'
        })
    ]
} 