const { SyncWaterfallHook } = require('tapable')

let hook = new SyncWaterfallHook(['name', 'age'])
hook.tap('fn1', function(name, age){
    console.log('fn1----->', name, age)
    return 'ret1'
})

hook.tap('fn2', function(name, age){
    console.log('fn2----->', name, age)
    return 'ret2'
})

hook.call('kkk', 33)