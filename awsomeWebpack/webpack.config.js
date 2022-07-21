const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    context: process.cwd(),
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
    plugins: [

    ]
} 