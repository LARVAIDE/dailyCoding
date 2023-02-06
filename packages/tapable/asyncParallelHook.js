const { AsyncParallelHook } = require('tapable')

let hook = new AsyncParallelHook(['name'])

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

// console.log('start', Date.now())
// hook.tapAsync('fn1', function(name, _callback){
//     setTimeout(()=>{
//         console.log('fn1', name, Date.now())
//         _callback()
//     }, 1000)
// })

// hook.tapAsync('fn2', function(name, _callback){
//     setTimeout(()=>{
//         console.log('fn2', name, Date.now())
//         _callback()
//     }, 2000)
// })

// hook.callAsync('larv', function(){
//     console.log('success', Date.now())
// })
console.time('timer')
hook.tapPromise('fn1', function(name){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('fn1', name)
            resolve()
        }, 1000)
    })
})


hook.tapPromise('fn2', function(name){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('fn2', name)
            resolve()
        }, 2000)
    })
})

hook.promise('kkkkkk').then(()=>{
    console.log('success')
    console.timeEnd('timer')
})
