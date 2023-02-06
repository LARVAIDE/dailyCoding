const {log} = console
const person = {
    name: 'sss',
    age: 22,
    friend: []
}

const personProxy = new Proxy(person, {
    /**
     * 
     * @param {*} target 目标对象
     * @param {*} property 属性名称
     * @returns 
     */
    get(target, property) {
        console.log(target, property)
        return target[property]
    },
    
    /**
     * 
     * @param {*} target 目标对象
     * @param {*} property 属性名称
     * @param {*} value 值
     */
    set(target, property, value) {
        if(property === 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError(`${value} is not an int`)
            }
            target[property] = value
        }
    },

    /**
     * 
     * @param {*} target 
     * @param {*} property 
     */
    deleteProperty(target, property) {
        console.log('delete', property)
        delete target[property]
    }
})

// personProxy.gender = 'sss'
// personProxy.age = ''
// personProxy.age = 23
// delete personProxy.age
// personProxy.friend.push('tom')
// console.log(person) 


// log(Reflect.has(person, 'name'))
// log(Reflect.deleteProperty(person, 'age'))
// log(Reflect.ownKeys(person))


class Person{
    constructor(name){
        this.name = name
    }

    say(){
        log(`my name is ${this.name}`)
    }
}

class Student extends Person{
    constructor(name, number){
        super(name)
        this.number = number
    }

    hello() {
        super.say()
        log(`my school number is ${this.number}`)
    }
}

const ll = new Student('tom', 99)
// ll.hello()


const s = new Set()
s.add(1).add(2).add(2).add(3).add(4).add(5).add(2)
log(s) //Set(5) { 1, 2, 3, 4, 5 }

// s.forEach(i => log(i)) 
// for (const iterator of s) {
//     log(iterator)
// }
log(s.delete(2))
log(s.size)
log(s.has(2))
s.clear()
log(s)

log(Symbol('bar') === Symbol('bar')) //false

const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
log(s1 === s2) //true

log(Symbol.for('true') === Symbol.for(true)) // 非字符串会隐式类型转换


const arr = [100, 200, 300, 400]

for (const iterator of arr) {
    log(iterator)
    if(iterator > 200){
        break
    }
}


const iterator = arr[Symbol.iterator]()
iterator.next()
iterator.next()
iterator.next()


const todos = {
    list: [1, 2, 3, 4],
    something: ['吃饭', '睡觉', '摆烂'],
    work: ['划水', '摸鱼', '喝咖啡'],

    each: function(callback){
        const temp = [].concat(this.list, this.something, this.work)
        for (const iterator of temp) {
            callback(iterator)
        }
    },

    [Symbol.iterator]: function() {
        const all = [...this.list, ...this.something, ...this.work]
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

// todos.each(item => log(item))

for (const iterator of todos) {
    log(iterator)
}