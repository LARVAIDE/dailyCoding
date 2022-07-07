// 泛型
//对于不能确定类型，在调用时作为参数传递进去
export {}

function getId<T> (value: T): T {
    return value;
}

// const sum: (a: number, b: number) => number = (a, b) => {
//     return a + b;
// }

const GetId<T>: (value: T) => T = (value) => value

function createArr<T>(length: number, value: T): Array<T>{
    return Array<T>(length).fill(value)
}

createArr<string>(10, '1');

