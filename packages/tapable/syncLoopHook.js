const { SyncLoopHook } = require('tapable')

let hook = new SyncLoopHook(['name', 'age'])
hook.tap('fn1', function(name, age){
    console.log('fn1----->', name, age)
})

hook.tap('fn2', function(name, age){
    console.log('fn2----->', name, age)
})

hook.call('ddd', 33)