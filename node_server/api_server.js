const express = require('express')
const { DataStore } = require("./list.json");

const app = express()

app.get('/', (req, res) => { 
    // res.json(DataStore.list)

    // res.setHeader('Connection', 'close')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('keep-alive', 'max=0')
    res.end('Connection')
})

app.listen(8080, () => {
    console.log('server is running')
})

