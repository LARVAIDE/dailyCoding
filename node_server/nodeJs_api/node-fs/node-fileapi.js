const fs = require('fs')
const path = require('path')

/**
 * 读文件
 */
// fs.readFile(path.resolve('data.txt'), 'utf8', (err, data) => {
//     console.log(err)
//     if(!err){
//         console.log(data)
//     }
// })

/**
 * 写文件
 */
// fs.writeFile('data.txt', 'hello nodejs', {
//     mode: 438,
//     flag:'w+',
//     encoding: 'utf8'
// }, (err) => {
//     if(!err){
//         fs.readFile(path.resolve('data.txt'), 'utf8', (err, data) => {
//             console.log(err)
//             if(!err){
//                 console.log(data)
//             }
//         })
//     }
// })

//appendFile
// fs.appendFile('data.txt', '这里是深圳', ()=>{
//     console.log('写入成功')
// })

//copyFile
// fs.copyFile('data.txt', 'test.txt', () => {
//     console.log('拷贝成功')
// })

//watchFile
fs.watchFile('data.txt', {
    interval: 20
}, (curr, prev) => {
    if(curr.mtime !== prev.mtime){
        console.log('文件被修改了')
        fs.unwatchFile('data.txt')
    }
})


