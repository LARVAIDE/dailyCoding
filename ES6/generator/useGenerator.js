 /**
  * 发号器
  */

 function * idCreator() {
    let id = 1
    while(true){
        yield id++
    }
 }

 const idMaker = idCreator()
//  console.log(idMaker.next())
//  console.log(idMaker.next())



/**
 * 生成器+迭代器组合使用
 * 改写迭代器模式
 */
 const todos = {
    work: ['a', 'b', 'c'],
    study: [1, 2, 4],
    life: ['猪脚饭', '烧鸭饭', '沙县'],

    each: function(cb) {
        const all = [].concat(this.work, this.study, this.life)
        for (const iterator of all) {
            cb(iterator)
        }
    },

    [Symbol.iterator]: function *() {
        const all = [...this.work, ...this.study, ...this.life]
        for (const iterator of all) {
            yield iterator
        }
    }
}

for (const iterator of todos) {
    console.log(iterator)
}