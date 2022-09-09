const path = require('path')
const types = require('@babel/types')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default

class NormalModule {
    constructor(data) {
        this.name = data.name
        this.entry = data.entry
        this.rawRequest = data.rawRequest
        this.parser = data.parser
        this.resource = data.resource
        this.context = data.context
        this._source,  // 存放某个模块的源码 
        this._ast, // 存放源码对应的ast
        this.dependencies = [] //保存被依赖模块信息
    }

    build(compilation, callback) {
        /**
         * 从文件中读取将来需要被加载的module
         * 如果当前不是js模块，就使用相应的loader处理，最终返回js模块
         * 上述操作完成后 将js 转为 ast
         * js模块内部又引用了其他模块，所以需要递归完成
         * 
         */
        this.doBuild(compilation, err => {
            this._ast = this.parser.parse(this._source)

            traverse(this._ast, { // 遍历ast
                CallExpression: nodePath => {
                    let node = nodePath.node
                    // 定位require所在的节点
                    if (node.callee.name === 'require') {
                        //获取原始的请求路径
                        let modulePath = node.arguments[0].value
                        //当前被加载的模块名称
                        let moduleName = modulePath.split(path.posix.sep).pop()
                        //当前只处理js
                        let extName = !moduleName.includes('.') ? '.js' : ''
                        moduleName += extName
                        //获取绝对路径
                        let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName)
                        //确定模块id
                        let depModuleId = './' + path.posix.relative(this.context, depResource)

                        // 记录当前被依赖模块信息，方便后续加载
                        this.dependencies.push({
                            name: this.name, // 需要修改
                            context: this.context,
                            rawRequest: moduleName,
                            moduleId: depModuleId,
                            resource: depResource
                        })

                        //替换内容
                        node.callee.name = '__webpack_require__'
                        node.arguments = [types.stringLiteral(depModuleId)]
                    }
                }
            })

            // 上述处理是操作ast做内容修改，下面是将ast转换成代码
            let { code } = generator(this._ast)
            callback(err)
        })
    }

    doBuild(compilation, callback) {
        this.getSource(compilation, (err, source) => {
            this._source = source
            callback()
        })
    }

    getSource(compilation, callback) {
        compilation.inputFileSystem.readFile(this.resource, 'utf-8', callback)
    }
}

module.exports = NormalModule