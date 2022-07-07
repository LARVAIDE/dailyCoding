// 泛型
//对于不能确定类型，在调用时作为参数传递进去

export {}

function createArr<T>(length: number, value: T): Array<T>{
    return Array<T>(length).fill(value)
}

createArr<string>(10, '1');

