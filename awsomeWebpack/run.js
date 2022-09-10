/**
 * 调试webpack的入口文件
 * 直接node命令执行该文件
 */
const webpack = require('./myPack')
const options = require('./webpack.config.js')

const complier = webpack(options)

complier.run(function(err, stats){
    console.log(err)
    // console.log(stats)
})