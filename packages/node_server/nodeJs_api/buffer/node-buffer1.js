let buf = Buffer.alloc(6)

/**
 * fill
 */
// buf.fill(123)
// console.log(buf)
// console.log(buf.toString())

/**
 * write
 */
// buf.write('123', 1)
// console.log(buf)
// console.log(buf.toString())


/**
 * toString()
 * utf汉字3个字节
 */
// buf = Buffer.from('解决问题')
// console.log(buf)
// console.log(buf.toString('utf8', 3, 9))

/**
 * slice
 */
// buf = Buffer.from('解决问题')
// let b1 = buf.slice(3)
// console.log(b1)
// console.log(b1.toString('utf8'))


/**
 * indexOf
 */
// buf = Buffer.from('解决问题，解决烦恼，解决一切')
// console.log(buf)
// console.log(buf.indexOf('决s', 4))

/**
 * copy
 */
let b1 = Buffer.alloc(6)
let b2 = Buffer.from('问题')

b2.copy(b1, 3)//b2拷贝给b1
console.log(b1.toString())
console.log(b2.toString())