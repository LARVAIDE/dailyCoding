/**
 * 纯函数：相同的输得到相同的输出，没有副作用
 * 无副作用：函数运行时不会对其作用域之外的变量产生影响
 */
const _ = require('lodash')
const {log} = console
// silce ----> 纯函数
const arr1 = [1,2,3,4,5,6]
log(arr1.slice(0, 3))
log(arr1.slice(0, 3))
log(arr1.slice(0, 3))

//splice ----> 不是纯函数
log(arr1.splice(0, 3))
log(arr1.splice(0, 3))
log(arr1.splice(0, 3))


// 不是纯函数
let mini = 18
function checkAge(age) {
    return age >= mini
}

//纯函数
function checkAge(age) {
    let mini = 18
    return age >= mini
}


/**
 * 柯里化
 * 1. 先传递一部分函数固定起来
 * 2. 返回新函数接受剩余参数
 * 3. 返回结果
 */
function sum(a, b, c){
    return a+b+c
}

function curryed(fn) {
    return function curry(...arg) {
        if(arg.length < fn.length){
            return function(){
                return curry.apply(this, arg.concat([...arguments]))
            }
        }else{
            return fn.apply(this, arg)
        }
    }
}

const curried = curryed(sum)

log(curried(1, 2, 3))
log(curried(1)(2, 3))
log(curried(1, 2)(3))
log(curried(1)(2)(3))

const match = _.curry(function(reg, str) {
    return str.match(reg)
})

const hasSpace = match(/\s+/g)
const filter = _.curry(function(fn, array) {
    return array.filter(fn)
})

const findSpace = filter(hasSpace)

log(findSpace(['hello world', '你好世界']))



