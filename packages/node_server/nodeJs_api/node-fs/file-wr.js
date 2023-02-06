const fs = require('fs')

/**
 * 大文件操作
 * 借助buffer,防止内存溢出
 */

//打开文件
let buf = Buffer.alloc(10)
// fs.open('data.txt', 'r', (err, fd) => {
//     console.log(fd)
//     // 1.当前打开文件 2.当前缓冲区 3.从buffer哪个位置开始写入 4.当前写入长度 5.从当前文件哪个位置开始读取
//     fs.read(fd, buf, 1, 4, 2, (err, readBytes, data) => {
//         console.log(readBytes)
//         console.log(data)
//         console.log(data.toString())
//     })
// })

/**
 * write
 * 将缓冲区内容写入文件
 */
buf = Buffer.from('1234567890')
fs.open('b.txt', 'w', (err, wfd) => {
    fs.write(wfd, buf, 0, 3, 0, (err, written, buffer) => {
        console.log(written)
        console.log(buffer)
        console.log(buffer.toString())

        fs.close(fd, (err)=>{
            console.log('关闭成功')
        })
    })
})