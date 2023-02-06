const MyTransform = require('./MyTransform')

const ts = new MyTransform()
const str1 = '要下雨了'
// console.log(Buffer.from(str1))
// console.log(ts.encode(str1, 1))

const encodeBuf =  ts.encode(str1, 1)
const a = ts.decode(encodeBuf)
console.log(a)

console.log(ts.getPackageLength(encodeBuf))