/**
 * for...of循环
 * 可以遍历实现了iterable接口的数据
 */

// const arr = [1, 2, 3, 4, 45]
// for (const key of arr) {
//     console.log(key)
// }


// const set = new Set([1, 2, 3, 4, 5, 6])
// const _ = set[Symbol.iterator]()
// let a = _.next()
// while(!a.done){
//     console.log(a.value)
//     a = _.next()
// }



/**
 * 实现可迭代接口
 */
const obj = {
    store: [1, 2, 3, 4, 5, 6, 7],
    [Symbol.iterator]: function () {
        let index = 0
        const _self = this

        return {
            next: function () {
                const result = {
                    value: _self.store[index],
                    done: index >= _self.store.length
                }
                index++
                return result
            }
        }
    }
}

for (const item of obj) {
    console.log(item)
}

