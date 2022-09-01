const resolveApp = require('./path')
const webpack = require('webpack')
const terserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: resolveApp('dll'),
        filename: 'dll_[name].js',
        library: 'dll_[name]'
    },
    optimization: {
        minimizer: [
            new terserWebpackPlugin({
                extractComments: false
            })
        ],
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'dll_[name]',
            path: resolveApp('dll/mainfest.json')
        })
    ]
}