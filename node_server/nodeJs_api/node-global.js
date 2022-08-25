//全局对象
// console.log(global)

// 获取当前文件绝对路径
// console.log(__filename)

//获取当前文件所在目录
// console.log(__dirname)

/**
 * 默认情况this是一个空对象，和global不相等
 */
// console.log(this)

// 模块化由IIFE实现
(function () {
    console.log(this === global)
})()