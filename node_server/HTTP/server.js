const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    console.log(req.method)
    // console.log(req.httpVersion)
    // console.log(req.headers)
    res.statusCode = 200
    res.setHeader('Content-type', 'text/html;chartset=utf-8')
    res.end('疯狂星期一')
})

server.listen(1234, () => {
    console.log('sss')
})