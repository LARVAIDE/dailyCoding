const _ = require('lodash')
const {log} = console

const arr = ['jack', 'tom', 'lucy', 'andrew']
log(_.first(arr))
log(_.last(arr))

log(_.toUpper(_.first(arr)))

log(_.reverse(arr))

_.each(arr, (item, index)=>{
    log(item, index)
})

log(arr)




/**
 * memoize
 * 可缓存
 */
function getArea(r) {
    return Math.PI * Math.pow(r, 2)
}
const getAreaWithMemo = _.memoize(getArea)
// log(getAreaWithMemo(10))


function memoize(fn){
    const cache = {}
    return function() {
        const k = JSON.stringify(arguments)
        return cache[k] = cache[k] || fn.apply(fn, arguments) 
    }
}

const getAreaWithMemo_ = memoize(r => Math.PI * Math.pow(r, 2))
log(getAreaWithMemo_(10)) 



