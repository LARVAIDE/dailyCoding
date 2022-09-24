/**
 * 实例化的过程：
 * 1. 隐式创建一个对象
 * 2. 将当前对象的_proto_指向构造函数的prototype
 * 3. 
 * 4. 如果显示返回了对象，就返回这个对象，否则返回隐式创建的对象
 */
function Fn(m, n){
    let res = m+n
    this.m=m
    this.n=n
    return res
}

let ret = new Fn(1, 2)
console.log(ret)