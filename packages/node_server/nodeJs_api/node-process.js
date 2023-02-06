/**
 * 无需require 可直接使用
 * 获取进程信息
 * 执行进程操作。监听进程在执行时运行的事件；创建子进程
 */ 

//1.资源消耗：cpu，memory...
// console.log('内存消耗：', process.memoryUsage())
/**
 * {
    rss: 27541504, //常驻内存
    heapTotal: 4964352, //执行前申请的总内存
    heapUsed: 4086928, //当前实际使用内存大小
    external: 444176, // 底层模块使用内存
    arrayBuffers: 11158 // 独立的空间，和V8区分
   }
 */

// console.log('处理器消耗：', process.cpuUsage())

//2.运行环境：运行目录，node环境，cpu架构，用户环境，系统平台...
// console.log('运行目录', process.cwd())
// console.log('node环境-简', process.version)
// console.log('node环境-全部', process.versions)
// console.log('cpu架构', process.arch)
// console.log('用户环境', process.env)
// console.log('系统平台', process.platform)

//3.运行状态：启动参数，进程PID，进程运行时间
// console.log('启动参数', process.argv)
// console.log('启动参数--', process.execArgv)
// console.log('进程PID', process.pid)
// setTimeout(() => {
//     console.log('进程运行时间', process.uptime())
// }, 3000);


//4.事件监听：
// process.on('exit', (code)=>{
//     console.log('exit:', code)
//     setTimeout(() => {
//         console.log('此处不能使用异步代码')
//     }, 1000);
// })
// process.on('beforeExit', (code) => {
//     console.log('beforeExit:', code)
// })

// console.log('finished')

//5.输入：stdin，输出：stdout，错误
// console.log = function (params) {
//     process.stdout.write('---' + params + '\n')
// }
// console.log(11)
// console.log(22)

// const fs = require('fs')
// fs.createReadStream('test.txt')
//    .pipe(process.stdout)

// process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', ()=>{
    let chunk = process.stdin.read()
    if(chunk !== null){
        process.stdout.write('data：'+ chunk)
    }
})