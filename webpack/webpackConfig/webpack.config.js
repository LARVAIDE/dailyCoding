const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: path.resolve(__dirname, './dist'),
        // publicPath: 'https://cdn.example.com/assets/[fullhash]'
        // assetModuleFilename: 'img/[name].[hash:6][ext]'
    },
    resolve: {
        extensions: ['.js', '.css', '.less', '.ts'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    target: 'web', //默认就是web
    devServer: {
        hot: true
    },
    module: {
        rules: [{
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
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader', 
                'css-loader', 
                'postcss-loader', 
                'less-loader'
            ]
        }, {
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'study webpack',
            template: './public/index.html'
        }),
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'public',
                globOptions: {
                    ignore: ['**/index.html']
                }
            }]
        })
    ]
} 