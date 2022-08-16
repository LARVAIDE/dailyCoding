/**
 * 函子。作用：把副作用控制在可控范围内
 * - 容器：包含值和值的关系
 * - 函子：是一种特殊的容器，通过一个普通的对象来实现，该对象具有map方法可以运行一个处理值的函数。
 */
const {log} = console

// class Container {
//     constructor(value){
//         this._value = value
//     }

//     map(fn){
//         return new Container(fn(this._value))
//     }
// }

// const v = new Container(5).map(v => v+1).map(v => v * v)
// log(v)


//静态方法封装new操作
class Container {
    static of(v){
        return new Container(v)
    }

    constructor(value){
        this._value = value
    }

    map(fn){
        return Container.of(fn(this._value))
    }
}

const v = Container.of(5).map(v => v+2).map(v => v * v) //链式操作
// log(v)


/**
 * maybe函子
 * 处理空值
 */
 class Maybe {
    static of(v){
        return new Maybe(v)
    }

    constructor(value){
        this._value = value
    }

    map(fn){
        return this.isValid(this._value) ? Maybe.of(null) : Maybe.of(fn(this._value))
    }

    isValid() {
        return this._value === null || this._value === undefined
    }
}

const m = Maybe.of(5)
    .map(v => v+2)
    .map(v => null) //缺点：某一步骤null不够明确
    .map(v => v * v) 
// log(m)



/**
 * Either函子
 * 二者其中一个
 */
class Left{
    static of(v){
        return new Left(v)
    }
    constructor(value){
        this._value = value
    }

    map(){
        return this
    }
}

class Right{
    static of(v){
        return new Right(v)
    }
    constructor(value){
        this._value = value
    }

    map(fn){
        return Right.of(fn(this._value))
    }
}

function parseJSON(str){
    try {
        return Right.of(JSON.parse(str))
    } catch (error) {
        return Left.of({ error: error.message })
    }
}

// let e = parseJSON('{ name: ssss }')
// log(e)
let e = parseJSON('{ "name": "ssss" }')
log(e)


/**
 * folktale
 */

