/**
 * 函数组合基本思想
 * 函数需要经过多个函数处理才能得到结果，可以把中间过程的函数合并成一个函数
 */

const {log} = console

function compose(f, g) {
    return function(value) {
        return f(g(value))
    }
}

function reverse(array) {
    return array.reverse()
}

function first(array){
    return array[0]
}

const last = compose(first, reverse)
log(last([1,2,3,4]))


/**
 * lodash中的组合函数的方法 _.flowRight()
 */
 const _ = require('lodash')

const _first = array => array[0]
const _reverse = array => array.reverse()
const _upper = str => str.toUpperCase()

// 从右到左执行
// const f = _.flowRight(_upper, _first, _reverse)
// log(f(['a', 'b', 'c']))

//模拟_.flowRight()
// function _flowRight(...args) {
//     return function(value){
//         return args.reverse().reduce((acc, cur) => {
//             return cur(acc)
//         }, value)
//     }
// }

//改成箭头函数
const _flowRight = (...args) => value => args.reduceRight((acc, curFn) => curFn(acc), value)

const f = _flowRight(_upper, _first, _reverse)
log(f(['a', 'b', 'c']))


/**
 * lodash中的结合律
 */

const logg = v => {
    log(v)
    return v
}

// const fC = _.flowRight(_.toUpper, _.first, _.reverse)
// const fC = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))
const fC = _.flowRight(_.flowRight(_.toUpper, _.first), logg, _.reverse)

log(fC(['a', 'b', 'c']))

