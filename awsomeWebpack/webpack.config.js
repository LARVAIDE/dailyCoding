const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.js', '.css', '.less', '.ts'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
       
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'study webpack',
            template: './src/index.html'
        })
    ]
} 