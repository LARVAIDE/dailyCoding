module.exports = {
    mode: 'development',
    devtool: false,//'cheap-module-source-map'
    devServer: {
        hot: true,
        port: 8080,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'https://example.com',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
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
        }]
    }
} 