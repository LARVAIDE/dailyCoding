const webpack = require('webpack')
const options = require('./webpack.config.js')

const complier = webpack(options)

complier.run(function(err, stats){
    console.log(err)
    console.log(stats.toJson())
})