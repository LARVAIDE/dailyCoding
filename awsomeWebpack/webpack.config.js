const path = require('path')
const ChunkPlugin = require('./chunkPlugin');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    context: path.resolve(__dirname, ''),
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new ChunkPlugin()
    ]
} 