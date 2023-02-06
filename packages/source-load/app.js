// app.js
const express = require('express')
const fsPromises = require('fs/promises')

const app = express()

app.get('/', async (req, res) => {
    const data = await fsPromises.readFile('./index.html')
    res.end(data)
})

app.get('/main.css', async (req, res) => {
    const data = await fsPromises.readFile('./main.css')
    setTimeout(() => {
        res.end(data)
    }, 5000)
})

app.get('/style.css', async (req, res) => {
    const data = await fsPromises.readFile('./style.css')
    setTimeout(() => {
        res.end(data)
    }, 2000)
})

app.get('/a.js', async (req, res) => {
    const data = await fsPromises.readFile('./a.js')
    setTimeout(() => {
        res.end(data)
    }, 2000)
})

app.get('/b.js', async (req, res) => {
    const data = await fsPromises.readFile('./b.js')
    setTimeout(() => {
        res.end(data)
    }, 5000)
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})

