const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolveApp = require('./path')
const { merge } = require('webpack-merge')
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const commonConfig = {
    entry: {
        index: './src/index.js',
        main: './src/main.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: resolveApp('./dist'),
        chunkFilename: 'js/chunk_[name].js'
        // publicPath: 'https://cdn.example.com/assets/[fullhash]'
        // assetModuleFilename: 'img/[name].[hash:6][ext]'
    },
    resolve: {
        extensions: ['.js', '.css', '.less', '.ts'],
        alias: {
            '@': resolveApp('./src')
        }
    },
    module: {
        rules: [{
            test: /\.(jpe?g|svg|png|gif|webp)$/i,
            type: 'asset',
            generator: {
                filename: 'img/[name].[hash:6][ext]'
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 8 * 1024
                }
            }
        }, {
            test: /\.ttf$/,
            type: 'asset/resource',
            generator: {
                filename: 'font/[name].[hash:3][ext]'
            }
        }, {
            test: /\.js$/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new HtmlWebpackPlugin({
            title: 'study webpack',
            template: './public/index.html'
        })
    ]
} 

module.exports = env => {
    const isProd = env.production
    process.env.NODE_ENV = isProd ? "production" : "development" //这里手动设置是因为默认process.env.NODE_ENV不能在配置文件里面获取
    const config = isProd ? prodConfig : devConfig
    return merge(commonConfig, config)
}