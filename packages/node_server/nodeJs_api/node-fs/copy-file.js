const fs = require('fs')

/**
 * 打开文件a，利用 read 将数据保存到 buffer
 * 打开文件 b，利用 write 将 buffer 内容写入到文件 b
 */
let buf = Buffer.alloc(10)

// fs.open('data.txt', 'r', (err, rfd) => {
//     fs.open('b.txt', 'w', (err, wfd) => {
//         fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
//             fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//                 console.log('写入成功')
//             })
//         })
//     })
// })

//数据完全拷贝
// fs.open('data.txt', 'r', (err, rfd) => {
//     fs.open('b.txt', 'a+', (err, wfd) => {
//         fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
//             fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//                 fs.read(rfd, buf, 0, 5, 10, (err, readBytes, buffer) => {
//                     fs.write(wfd, buf, 0, 5, 10, (err, written) => {
//                         console.log('写入成功')
//                     })
//                 })
//             })
//         })
//     })
// })

const BUFFER_SIZE = buf.length
let readOffset = 0

fs.open('data.txt', 'r', (err, rfd) => {
    fs.open('b.txt', 'w', (err, wfd) => {
        function next() {
            fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
                if (!readBytes) {// 无内容
                    fs.close(rfd, ()=>{})
                    fs.close(wfd, ()=>{})
                    console.log('操作完成')
                    return
                }
                readOffset += readBytes
                fs.write(wfd, buf, 0, readBytes, (err, written) => {
                    next()
                })
            })
        }
        next()
    })
})