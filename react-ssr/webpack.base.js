module.exports = {
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_moudles/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        }]
    }
}