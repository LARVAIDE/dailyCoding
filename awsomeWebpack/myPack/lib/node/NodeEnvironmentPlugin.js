/**
 * 初始化NodeEnvironmentPlugin，让complier具备文件读写能力
 */
const fs = require('fs')

class NodeEnvironmentPlugin {
    constructor(options){
        this.options = options || {}
    }

    apply(complier){
        complier.inputFileSystem = fs
        complier.outputFileSystem = fs
    }
}

module.exports = NodeEnvironmentPlugin