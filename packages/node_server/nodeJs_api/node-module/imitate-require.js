const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
    console.log(111)
}
Module._resolveFilename = function (fileName) {
    //将filename转换成绝对路径
    let absPath = path.resolve(__dirname, fileName)
    /**
     * 校验路径对应的内容是否存在
     */
    if (fs.existsSync(absPath)) {
        return absPath
    } else {
        //文件定位，补足扩展名
        let suffix = Object.keys(Module._extensions)
        for (let i = 0; i < suffix.length; i++) {
            let newPath = absPath + suffix[i]
            if (fs.existsSync(newPath)) {
                return newPath
            }
        }
        throw new Error(`${fileName} is not exists`)
    }
}

Module._extensions = {
    '.js'(module) {
        //读取
        let content = fs.readFileSync(module.id, 'utf8')
        //包装
        content = Module.wrapper[0] + content + Module.wrapper[1]
        //vm
        let compileFn = vm.runInThisContext(content)
        //准备形参
        let exports = module.exports
        let dirname = path.dirname(module.id)
        let filename = module.id
        //调用
        compileFn.call(exports, exports, myRequire, module, filename, dirname)
    },
    '.json'(module) {
        let content = JSON.parse(fs.readFileSync(module.id, 'utf8'))
        module.exports = content
    }
}

Module._cache = {}

Module.prototype.load = function () {
    let extname = path.extname(this.id)
    Module._extensions[extname](this)
}
Module.wrapper = [
    "(function(exports, require, module, __filename, __dirname) {",
    "})"
]

function myRequire(fileName) {
    //路径分析，获取绝对路径
    let mPath = Module._resolveFilename(fileName)

    //缓存优先
    let cacheModule = Module._cache[mPath]
    if (cacheModule) return cacheModule.exports

    /**
     * 未命中缓存
     * 创建空对象加载模块
     * */
    let module = new Module(mPath)
    //加入缓存
    Module._cache[mPath] = module
    //编译执行
    module.load()
    //返回
    return module.exports
}

let obj = myRequire('./v')
console.log(obj.age)

