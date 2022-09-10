const fs = require("fs");

/**
 *
 * @param {*} options
 * @returns
 */
function _validate(options) {
  if (Object.prototype.toString.call(options) !== "[object Object]") {
    return false;
  }
  for (const itemKey in options) {
    if (Object.hasOwnProperty.call(options, itemKey)) {
      const option = options[itemKey];
      if (itemKey === "publicPath") {
        try {
          const { protocol, hostname } = new URL(option);
          return `${protocol}//${hostname}`;
        } catch (error) {
          throw new TypeError(
            `publicPath must be url, ${JSON.stringify(error.code)}`
          );
        }
      }
      return true;
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
    publicPath: "https://cdn.example.com",
  };
  if (_validate(options)) {
    return Object.assign(defaultOptions, options);
  }
  return defaultOptions;
}

class AssetsCdnPrefreshWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.showMakeFile = false;
    this.content = "```***** CDN refresh and preheating *****```\n";
    this.apply = this.apply.bind(this);
  }

  apply(compiler) {
    const options = _mergeOptions(this.options);
    const { publicPath } = options;
    const hooks = compiler.hooks;

    hooks.assetEmitted.tap(
      "AssetsCdnPrefreshWebpackPlugin",
      (emittedAssets) => {
        this.addAssetsCdnPrefreshPath(publicPath, emittedAssets);
      }
    );

    hooks.done.tapAsync("AssetsCdnPrefreshWebpackPlugin", (compilation) => {
      const { outputOptions } = compilation.compilation;
      const { path } = outputOptions;
      this.writeFile(path);
      this.showMakeFile = false;
    });
  }

  /**
   *
   * @param {*} publicPath
   * @param {*} emittedAssets
   * @returns
   */
  addAssetsCdnPrefreshPath(publicPath, emittedAssets) {
    const excludeFileType = /\.[html]$/gi;
    if (excludeFileType.test(emittedAssets)) return null;
    if (!this.showMakeFile) this.showMakeFile = true;
    this.content += `${publicPath}/${emittedAssets}\n`;
  }

  /**
   *
   * @param {*} path
   */
  writeFile(path) {
    if (this.showMakeFile) {
      const fileName = "CDN_SOURCE_PATH.md";
      process.nextTick(() => {
        fs.writeFile(
          `${path}/${fileName}`,
          this.content,
          { encoding: "utf-8" },
          () => {
            console.log(`\nThe ${fileName} has been generated!🎉🎉🎉\n`);
          }
        );
      });
    }
  }
}

module.exports = AssetsCdnPrefreshWebpackPlugin;
