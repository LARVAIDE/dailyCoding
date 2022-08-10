/**
 * 高阶函数表现形式
 * 1.函数可以存储在变量中
 * 2.函数可以作为参数
 * 3.函数可以作为返回值
 */

const { log } = console
/**
 * 处理array
 * @param {array} target 
 * @param {function} handler 
 * @returns 
 */
function map(target, handler){
    const _ = []
    for (const iterator of target) {
        _.push(handler(iterator)) 
    }
    return _
}
const arr_map = [1,2,3,4]
const res_map = map(arr_map, item => item*item)
// log(res_map)


/**
 * 判断array是否有一项满足条件
 * @param {array} target 
 * @param {function} handler 
 * @returns 
 */
function some(target, handler){
    const _ = []
    for (const iterator of target) {
        if(handler(iterator)){
            return true
        }
    }
    return false
}
const arr_some = [1,12,23,14,45]
const res_some = some(arr_some, item => item > 40)
// log(res_some)


/**
 * 判断array是否全部满足某一条件
 * @param {array} target 
 * @param {function} handler 
 * @returns 
 */
function every(target, handler) {
    for (const iterator of target) {
        if(!handler(iterator)){
            return false
        }
    }
    return true
}
const arr_every = [41, 42,45]
const res_every = every(arr_every, item => item > 40)
log(res_every)