#!/usr/bin/env node

//node-cli的入口文件必须要有上面的头部
//把本入口文件访问权限提升至755
//

console.log('cli is working')

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'project name' 
}]).then(msg => {
    console.log(msg);
    const tmpDir = path.join(__dirname, 'templates');//目录
    const distDir = process.cwd();

    fs.readdir(tmpDir, (err, files) => {
        console.log(err, files)
        if(err) throw Error(err)
        files.forEach(file => {
            ejs.renderFile(path.join(tmpDir, file), msg, (err, res) => {
                if(err) throw Error(err)
                fs.writeFileSync(path.join(distDir, file), res)
            })
        })
    })
})