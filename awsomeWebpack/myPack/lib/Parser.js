const {
    Tapable,
    AsyncSeriesHook,
    SyncBailHook,
    SyncHook,
    AsyncParallelHook
} = require('tapable')
const babylon = require('babylon')

class Parser{
    parse(source){
        return babylon.parse(source, { 
            sourceType: 'module',
            plugins: ['dynamicImport']
         })
    }
}

module.exports = Parser