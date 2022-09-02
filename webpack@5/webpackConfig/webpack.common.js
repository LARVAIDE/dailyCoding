const webpack = require('webpack')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MyPlugin = require('./myPlugin')
const resolveApp = require('./path')
const { merge } = require('webpack-merge')
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const commonConfig = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: resolveApp('./dist'),
        chunkFilename: 'js/chunk_[name].js'
        // publicPath: 'https://cdn.example.com/assets/[fullhash]'
        // assetModuleFilename: 'img/[name].[hash:6][ext]'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.css', '.less', '.ts', '.tsx', '...'], //顺序优先级， ... 扩展运算符代表默认配置
        modules: [resolveApp('src'), 'node_modules'], //优先 src 目录下查找需要解析的文件，会大大节省查找时间
        alias: {
            '~': resolveApp('src'),
            '@': resolveApp('src'),
            'components': resolveApp('src/components')
        }
    },
    /**
     *  asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
     *  asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
     *  asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
     *  asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource
     */
    module: {
        rules: [{
            test: /\.(jpe?g|svg|png|gif|webp)$/i,
            type: 'asset', 
            generator: {
                filename: 'img/[name].[contenthash:6][ext]'
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 8 * 1024 // 超过100kb不转 base64
                }
            }
        }, {
            test: /\.ttf$/,
            type: 'asset/resource', 
            generator: {
                filename: 'font/[name].[ext]'
            }
        }, {
            test: /\.jsx?$/,
            include: resolveApp('src'),
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }
        }, {
            test: /.md$/,
            use: [
                './markdown-loader'
            ]
        }]
    },
    plugins: [
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new HtmlWebpackPlugin({
            title: 'study webpack',
            template: './public/index.html'
        }),
        new MyPlugin()
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
     * 剥离不需要改动的一些依赖，大大节省打包构建的时间
     */
    externals: {

    }
} 

module.exports = env => {
    const isProd = env.production
    process.env.NODE_ENV = isProd ? "production" : "development" //这里手动设置是因为默认process.env.NODE_ENV不能在配置文件里面获取
    const config = isProd ? prodConfig : devConfig
    return merge(commonConfig, config)
}