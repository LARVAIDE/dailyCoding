/**
 * 缓冲区，操作二进制
 * 全局变量无需引用
 * 不占用V8堆内存
 * 由V8GC回收
 * 配合Stream
 */

// const b1 = Buffer.alloc(10)
// const b2 = Buffer.allocUnsafe(10)

// console.log(b1)
// console.log(b2)

// const b3 = Buffer.from('1')
// console.log(b3)

// const b4 = Buffer.from([0xe4, 0xb8, 0xad])
// console.log(b4.toString())

// const b1 = Buffer.from('中')
// console.log(b1)
// console.log(b1.toString())


// const b1 = Buffer.alloc(3)
// const b2 = Buffer.from(b1)// 空间不是拷贝
// console.log(b1)
// console.log(b2)
// b1[0] = 1
// console.log(b1)
// console.log(b2)



  