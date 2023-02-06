const fs = require('fs')

/**
 * access
 */
// fs.access('data.txt', (err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log('有操作权限')
//     }
// })

/**
 * stat
 */
// fs.stat('data.txt', (err, statObj) => {
//     console.log(statObj)
//     console.log(statObj.isFile())
//     console.log(statObj.isDirectory())
// })

/**
 * mkdir
 */
// fs.mkdir('a/b/c', {
//     recursive: true
// }, (err) => {
//     if(!err){
//         //父级目录必须存在
//         console.log('目录创建成功')
//     }else{
//         console.log(err)
//     }
// })

/**
 * rmdir
 * 默认情况只能删除空目录
 * 
 */
// fs.rmdir('a', {
//     recursive: true
// }, (err) => {
//     if(!err){
//         console.log('目录删除成功')
//     }else{
//         console.log(err)
//     }
// })


/**
 * readdir
 */
// fs.readdir('a', (err, files)=>{
//     console.log(files)
// })

/**
 * unlink
 * 删除文件
 */
fs.unlink('a/a.txt', (err)=>{
    if(!err){
        console.log('删除成功')
    }
})