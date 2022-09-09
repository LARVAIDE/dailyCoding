# assets-cdn-prefresh-webpack-plugin
Generate static resource links for CDN refresh and preheating

# install
```
npm install --save assets-cdn-prefresh-webpack-plugin
```

# Example
```
    const AssetsCdnPrefreshWebpackPlugin = require('assets-cdn-prefresh-webpack-plugin');
    
    module.exports = { 
        mode: 'production',
        devtool: false,
        ...
        plugins: [
            new AssetsCdnPrefreshWebpackPlugin({
                publicPath: 'https://cdn.example.com'
            })
        ]
    }
```
