const fs = require('fs')
const path = require('path')
const marked = require('marked')
const browserSync = require('browser-sync')

/**
 * 1.读取md和css内容
 * 2.将上述读取出来的内容替换成占位符，生成需要展示的html字符串
 * 3.将html字符串写入至指定文件
 * 4.监听md文档的内容变化，更新html内容
 * 5.使用browser-sync来实时显示html
 */

let mdPath = path.join(__dirname, process.argv[2])
let cssPath = path.resolve('github.css')
let htmlPath = mdPath.replace(path.extname(mdPath), '.html')

fs.watchFile(mdPath, (curr, prev) => {
    if(curr.mtime !== prev.mtime){
        fs.readFile(mdPath, 'utf8', (err, data) => {
            //md转html
            const tokens = marked.lexer(data);
            const htmlStr = marked.parser(tokens);
            fs.readFile(cssPath, 'utf8', (err, data) => {
                let retHtml = temp.replace('{{content}}', htmlStr).replace('{{style}}', data)
                //将上述内容写入到html
                fs.writeFile(htmlPath, retHtml, (err) => {
                    console.log('html生成成功')
                })
            })
        })
    }   
})

browserSync.init({
    browser: '',
    server: __dirname,
    watch: true,
    index: path.basename(htmlPath)
})

const temp = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 1000px;
                margin: 0 auto;
                padding: 45px;
            }
            @media (max-width: 750px) {
                .markdown-body {
                    padding: 15px;
                }
            }
            {{style}}
        </style>
    </head>
    <body>
        <div class="markdown-body">
            {{content}}
        </div>
    </body>
    </html>
`