/**
 * 泛型
 * 对于不能确定类型，在调用时作为参数传递进去，也可以不传自动进行类型推断
 * 复杂情况下还是需要传递参数
 * */

import { type } from "os";

export {}

const {log} = console

const sum: (a: number, b: number) => number = (a, b) => {
    return a + b
}

//泛型参数
type param = number | string
const add: <T extends param, U extends param>(a: T, b: U) => any = (a, b) => {
    // return a + b
} 
log(add(1, 2))

function getId<T> (value: T): T {
    return value
}

const setAtrributeById: <T, U>(id: T, props: U) => any = (id, props) => {
    log(`get ${id} setProps : ${props}`) 
}

setAtrributeById('ssss', { aaa: 'ssss' })


function createArr<T>(length: number, value: T): Array<T>{
    return Array<T>(length).fill(value)
}

createArr<string>(10, '1')

//-------------------------------------------
//泛型接口

interface GenericIdentityFn<T> {
    (a: T): T
}
function identity<T>(a: T): T{
    return a
}
const useIdentity: GenericIdentityFn<number> = identity;
useIdentity(0)

//-------------------------------------------
//泛型类
interface GenericNumber<T> {

}

//泛型约束



