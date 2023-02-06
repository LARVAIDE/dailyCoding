const { AsyncSeriesHook } = require('tapable')

let hook = new AsyncSeriesHook(['name'])

/**
 * 异步kook有三种添加事件监听的方式：tap\tapAsync\tapPromise
 * */
console.time('timer')
hook.tapAsync('fn1', function(name, _callback){
    setTimeout(()=>{
        console.log('fn1', name, Date.now())
        _callback()
    }, 1000)
})

hook.tapAsync('fn2', function(name, _callback){
    setTimeout(()=>{
        console.log('fn2', name, Date.now())
        _callback()
    }, 2000)
})

hook.tapAsync('fn3', function(name, _callback){
    setTimeout(()=>{
        console.log('fn3', name, Date.now())
        _callback()
    }, 3000)
})

hook.callAsync('larv', function(){
    console.log('success')
    console.timeEnd('timer')
})
