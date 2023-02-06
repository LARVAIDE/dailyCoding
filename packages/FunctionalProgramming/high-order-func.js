/**
 * 输入某种运算的到对应的输出
 * 相同的输入始终得到相应的输出（纯函数）
 */

const { log } = console

//非函数式
const a = 1
const b = 2
const c = a + b
// log(c)


//函数式，有输入有输出
const sum = (a, b) => a + b
const res = sum(a, b)
// log(res)


/**
 * 高阶函数表现形式
 * 1.函数可以存储在变量中
 * 2.函数可以作为参数
 * 3.函数可以作为返回值
 */


//高阶函数---函数作为参数
/**
 * forEach
 * @param {array} target 
 * @param {function} handler 
 */
function forEach(target, handler) {
    for (let index = 0; index < target.length; index++) {
        const element = target[index];
        handler(element)
    }
}
const arr_forEach = [1,2,3,4,5]
// forEach(arr_forEach, item => log(item))

/**
 * filter
 * @param {array} target 
 * @param {function} handler 
 */
function filter(target, handler){
    const res = []
    for (let index = 0; index < target.length; index++) {
        const element = target[index];
        if(handler(element)){
            res.push(element)
        }
    }
    return res
}
const arr_filter = [5,6,7,8,9,10]
const res_filter = filter(arr_filter, item => item >= 8)
// log(res_filter)

//高阶函数---函数作为返回值
function makeFn(){
    const msg = 'hello world'
    return function() {
        log(msg)
    }
}
// const fn = makeFn()
// fn()
// makeFn()()


function onlyOnce(fn){
    let done = false
    return function(){
        if(!done){
            done = true
            fn.apply(this, arguments)
        }
    }
}
const payment = onlyOnce(function(money){
    log(`${Date.now()},支付了：¥${money}`)
});
payment(10)
payment(10)
payment(10)
payment(10)



/**
 * 高阶函数的意义
 * 1. 抽象以屏蔽细节实现，只关注结果
 * 2. 抽象通用问题
 */

