const fs = require("fs");

/**
 * 
 * @param {*} options 
 * @returns 
 */
function _validate(options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
        return false;
    }
    for (const itemKey in options) {
        if (Object.hasOwnProperty.call(options, itemKey)) {
            const option = options[itemKey];
            if (itemKey === 'publicPath') {
                try {
                    const { protocol, hostname } = new URL(option)
                    return `${protocol}//${hostname}`
                } catch (error) {
                    throw new TypeError(`publicPath must be url, ${JSON.stringify(error.code)}`)
                }
            }
            return true
        }
    }
}

/**
 * 
 * @param {*} options 
 * @returns {object}
 */
 function _mergeOptions(options) {
    const defaultOptions = {
        publicPath: 'https://cdn.example.com',
        fileName: 'CDN_SOURCE_PATH.md'
    }
    if (_validate(options)) {
        return Object.assign(defaultOptions, options);
    }
    return defaultOptions
}

class AssetsCdnPrefreshWebpackPlugin {
    constructor(options) {
        this.options = options || {}
        this.content = '\`\`\`cdn刷新预热\`\`\`\n';
        this.apply = this.apply.bind(this);
    }

    apply(compiler) {
        const options = _mergeOptions(this.options)
        const { publicPath, fileName } = options;
        const hooks = compiler.hooks;

        hooks.assetEmitted.tap('AssetsCdnPrefreshWebpackPlugin', emittedAssets => {           
            this.addAssetsCdnPrefreshPath(publicPath, emittedAssets)
        });

        hooks.done.tapAsync('AssetsCdnPrefreshWebpackPlugin', compilation => {
            const { outputOptions } = compilation.compilation
            const { path } = outputOptions
            this.writeFile(path, fileName);
        })
    }

    /**
     * 
     * @param {*} publicPath 
     * @param {*} emittedAssets 
     * @returns 
     */
    addAssetsCdnPrefreshPath(publicPath, emittedAssets) {
        const excludeHtml = /\.html$/ig
        if (excludeHtml.test(emittedAssets)) { 
            return
        }
        this.content += `${publicPath}/${emittedAssets}\n`
    }

    /**
     * 
     * @param {*} path 
     * @param {*} fileName 
     */
    writeFile(path, fileName) {
        process.nextTick(() => {
            fs.writeFile(`${path}/${fileName}`, this.content, { encoding: 'utf-8' }, () => {
                console.log(`\nThe ${fileName} has been generated!🎉🎉🎉\n`);
            });
        })
    }
}

module.exports = AssetsCdnPrefreshWebpackPlugin;