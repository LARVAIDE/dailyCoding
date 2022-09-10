const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    context: path.resolve(__dirname, ''),
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist'),
    }
} 