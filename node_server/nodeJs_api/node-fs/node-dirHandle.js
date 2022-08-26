const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

/**
 * 同步创建目录
 */

function makeDirSync(dirPath) {
    let items = dirPath.split(path.sep)
    for (let i = 1; i <= items.length; i++) {
        let dir = items.slice(0, i).join(path.sep)
        try {
            fs.accessSync(dir)
        } catch (error) {
            fs.mkdirSync(dir)
        }
    }
}

// makeDirSync('a/b/c')

/**
 * 异步创建目录
 */

// function mkdir(dirPath, cb){
//     let parts = dirPath.split('/')
//     let index= 1

//     function next() {
//         if(index > parts.length) return cb && cb()
//         let current = parts.slice(0, index++).join('/')

//         fs.access(current, (err) => {
//             if(err){
//                 fs.mkdir(current, next)
//             }else{
//                 next()
//             }
//         })
//     }
//     next()
// }

// mkdir('a/b/c', () => {
//     console.log('创建成功')
// })

/**
 * 把access和mkdir用promise包装
 */
// const access = promisify(fs.access)
// const mkdir = promisify(fs.mkdir)
// async function myMkdir(dirPath, cb) {
//     let parts = dirPath.split('/')
//     for (let i = 1; i <= parts.length; i++) {
//         let current = parts.slice(0, i).join('/')
//         try {
//             await access(current)
//         } catch (error) {
//             await mkdir(current)
//         }
//     }
//     cb && cb()
// }

// myMkdir('a/b/c', () => {
//     console.log('目录创建成功')
// })

/**
 * 异步删除目录
 * 1.判断当前是否为文件，然后执行删除
 * 2.如果当前是目录，需要继续读取目录里的内容，然后再删除
 * 3.将删除行为定义为一个函数，再递归复用
 * 4.将当前名称拼接成删除时的路径
 */
function removeDir(dirPath, cb) {
    //判断当前 dirPath 的类型
    fs.stat(dirPath, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dirPath, (err, files) => {
                let dirs = files.map(item => {
                    return path.join(dirPath, item)
                })
                let idx = 0
                function next() {
                    if(idx == dirs.length)return fs.rmdir(dirPath, cb)

                    let current = dirs[idx++]
                    removeDir(current, next)
                }
                next()
            })
        } else {
            fs.unlink(dirPath, cb)
        }
    })
}

removeDir('a', () => {
    console.log('目录删除成功')
})