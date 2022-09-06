/**
 * 迭代器模式
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

    [Symbol.iterator]: function() {
        const all = [...this.work, ...this.study, ...this.life]
        let index = 0
        return {
            next: function() {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }
}

/**
 * 对象内部使用for...of暴露出迭代方法
 */
todos.each(item => console.log(item))


/**
 *  ==========================
 * 实现可迭代接口
 */

for (const iterator of todos) {
    console.log(iterator)
}

