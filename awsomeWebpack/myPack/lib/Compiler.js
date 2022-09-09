const {
    Tapable,
    AsyncSeriesHook,
    SyncBailHook,
    SyncHook,
    AsyncParallelHook
} = require('tapable')
const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')
const Stats = require('./Stats')

class Compiler {
    constructor(context) {
        this.context = context
        this.hooks = Object.freeze({
            done: new AsyncSeriesHook(["stats"]),
            entryOption: new SyncBailHook(["context", "entry"]),

            beforeRun: new AsyncSeriesHook(["compiler"]),
			run: new AsyncSeriesHook(["compiler"]),

            thisCompilation: new SyncHook(["compilation", "params"]),
			compilation: new SyncHook(["compilation", "params"]),

            beforeCompile: new AsyncSeriesHook(["params"]),
			compile: new SyncHook(["params"]),
			make: new AsyncParallelHook(["compilation"]),
			finishMake: new AsyncSeriesHook(["compilation"]),
			afterCompile: new AsyncSeriesHook(["compilation"])
        })
    }

    run(cb) {
        console.log('run执行了》〉》〉》〉》')
        const finallCallback = function(err, stats){
            cb(err, stats)
        }
        const onCompiled = function(err, compilation){
            console.log('onCompiled>>>>>>>>>>>>')
            finallCallback(err, new Stats(compilation))
        }
        this.hooks.beforeRun.callAsync(this, err => {
            this.hooks.run.callAsync(this, err => {
                this.compile(onCompiled)
            })
        })
    }

    compile(callback){
        const params = this.newCompilationParams()
        this.hooks.beforeRun.callAsync(params, err =>{
            this.hooks.compile.call(params)
            const compilation = this.newCompilation(params)

            this.hooks.make.callAsync(compilation, err => {
                console.log('make监听执行了》〉》〉》〉》')
                callback(err, compilation)
            })
        })
    }

    newCompilationParams(){
        const params = {
            normalModuleFactory: new NormalModuleFactory()
        }
        return params
    }

    newCompilation(params) {
        const compilation = this.createCompilation()
        this.hooks.thisCompilation.call(compilation, params)
        this.hooks.compilation.call(compilation, params)
        return compilation
    }

    createCompilation(){
        return new Compilation(this)
    }
}
module.exports = Compiler