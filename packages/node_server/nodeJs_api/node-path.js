const path = require('path')

//1.获取路径中的基础名称
// console.log(path.basename(__filename))
// console.log(path.basename(__filename, '.js'))
// console.log(path.basename(__filename, '.css'))
// 获取路径最后的部分
// console.log(path.basename('a/b/c'))

//2.获取路径中的目录名
// console.log(path.dirname(__filename))
// console.log(path.dirname('/a/b/c'))
// console.log(path.dirname('/a/b/c/'))

//3.获取路径中的扩展名
// console.log(path.extname(__filename))
// console.log(path.extname('/a/b/c.css'))
// console.log(path.extname('/a/b/c.css.js'))
// console.log(path.extname('/a/b/c.css.js.'))

// 4.解析路径
// const obj = path.parse('/a/b/c/index.html')
// console.log(obj)

//5.序列化路径
// const obj = path.parse('./a/b/c')
// console.log(path.format(obj))

//6.是否是绝对路径
// console.log(path.isAbsolute('foo'))
// console.log(path.isAbsolute('/foo'))
// console.log(path.isAbsolute('///foo'))
// console.log(path.isAbsolute('.'))
// console.log(path.isAbsolute('../bar'))

//7.拼接路径
// console.log(path.join('a/b', 'c', 'index.html'))
// console.log(path.join('/a/b', 'c', 'index.html'))
// console.log(path.join('/a/b', '../' 'index.html'))

//8.规范化路径
// console.log(path.normalize('/a/b../c/\/'))

//9.绝对路径
console.log(path.resolve())
console.log(path.resolve('/a', 'b'))