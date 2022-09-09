const {
    Tapable,
    AsyncSeriesHook,
    SyncBailHook,
    SyncHook,
    AsyncParallelHook
} = require('tapable')
const path = require('path')
const async = require('neo-async')
const _NormalModuleFactory = require('./NormalModuleFactory')
const _Parser = require('./Parser')

const NormalModuleFactory = new _NormalModuleFactory()
const parser = new _Parser()

class Compilation {
    constructor(compiler) {
        this.compiler = compiler
        this.context = compiler.context
        this.options = compiler.options
        // 让compilation具备文件读写能力
        this.inputFileSystem = compiler.inputFileSystem
        this.outputFileSystem = compiler.outputFileSystem
        this.entries = [] // 存放入口模块数组
        this.modules = [] // 存放所有的模块数据
        this.hooks = {
            successModule: new SyncHook(['module'])
        }
    }

    /**
     * 完成模块编译处理
     * @param {*} context 当前项目的根目录
     * @param {*} entry 当前入口的相对路径
     * @param {*} name 
     * @param {*} callback 
     */
    addEntry(context, entry, name, callback) {
        this._addModuleChain(context, entry, name, (err, module) => {
            callback(err, module)
        })
    }

    _addModuleChain(context, entry, name, callback) {
        this.createModule({
            parser: parser,
            name,
            context,
            rawRequest: entry,
            resource: path.posix.join(context, entry),
            moduleId: './' + path.posix.relative(context, path.posix.join(context, entry))
        }, entryModule => {
            this.entries.push(entryModule)
        }, callback)
    }

    /**
     * 创建模块的方法，用于复用
     * @param {*} data 创建模块所需要的属性
     * @param {*} doAddEntry 可选参数，加载入口模块时将moduleId写入this.entries
     * @param {*} callback 
     */
    createModule(data, doAddEntry, callback) {
        let module = NormalModuleFactory.create(data)
  
        const afterBuild = (err, module) => {
            // 判断当前module加载完成之后是否需要处理依赖
            if (module.dependencies.length > 0) {
                // 递归加载模块依赖
                this.processDependencies(module, err => {
                    callback(err, module)
                })
            } else {
                callback(err, module)
            }
        }

        this.buildModule(module, afterBuild)

        // 本次build完成后将module保存
        doAddEntry && doAddEntry(module)
        this.modules.push(module)
    }

    /**
     * 完成具体的build行为
     * @param {*} module 
     * @param {*} callback 
     */
    buildModule(module, callback) {
        module.build(this, err => {
            //当前module的编译结束了
            console.log('build结束')
            this.hooks.successModule.call(module)
            callback(err, module)
        })
    }

    /**
     * 加载模块都是创建一个模块，然后将被加载模块的内容合并进来
     * 当前不清楚module需要依赖多少个模块，此时需要在所有依赖都加载完成后再执行callback
     * @param {*} module 
     * @param {*} callback 
     */
    processDependencies(module, callback){
        let dependencies = module.dependencies
        async.forEach(dependencies, (dependency, done) => {
            this.createModule({
                parser: parser,
                name: dependency.name,
                context: dependency.context,
                rawRequest: dependency.rawRequest,
                moduleId: dependency.moduleId,
                resource: dependency.resource
            }, null, done)
        }, callback);
    }
}

module.exports = Compilation