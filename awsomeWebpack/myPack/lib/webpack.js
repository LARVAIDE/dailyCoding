/**
 * webpack.js核心功能
 * @param {*} options 
 */

const Compiler = require('./Compiler')
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')

const webpack = function(options){
    /**
     * 此处省略一些对options的校验。。。
     */
    // ========================
    /**
     * 实例化complier
     * context的值为process.cwd()
     * 获取项目目录，和entry拼接，定位入口文件
     */
    let complier = new Compiler(options.context)
    complier.options = options

    // 初始化NodeEnvironmentPlugin，让complier具备文件读写能力
    // createCompiler()
    new NodeEnvironmentPlugin().apply(complier)
    // 挂载plugins至complier
    if(options.plugins && Array.isArray(options.plugins)){
        for (const plugin of options.plugins) {
            plugin.apply(Compiler)
        }
    }
    /**
     * 挂载webpack内置的插件，例如：处理入口文件
     * 里面有区分单入口和多入口
     */
    complier.options = new WebpackOptionsApply().process(options, complier);

    // 返回complier
    return complier
}

module.exports = webpack