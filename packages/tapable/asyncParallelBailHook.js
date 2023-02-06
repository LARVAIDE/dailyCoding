const { AsyncParallelBailHook } = require('tapable')

let hook = new AsyncParallelBailHook(['name'])

/**
 * 异步kook有三种添加事件监听的方式：tap\tapAsync\tapPromise
 * */

// hook.tap('fn1', function(name){
//     console.log('fn1------>', name, `time: ${Date.now()}`)
// })

// hook.tap('fn2', function(name){
//     console.log('fn2------>', name, `time: ${Date.now()}`)
// })
// hook.callAsync('larv', function(){
//     console.log('success')
// })

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
        _callback('error')
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


// console.time('timer')
// hook.tapPromise('fn1', function(name){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log('fn1', name)
//             resolve()
//         }, 1000)
//     })
// })


// hook.tapPromise('fn2', function(name){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log('fn2', name)
//             resolve()
//         }, 2000)
//     })
// })

// hook.promise('kkkkkk').then(()=>{
//     console.log('success')
//     console.timeEnd('timer')
// })
