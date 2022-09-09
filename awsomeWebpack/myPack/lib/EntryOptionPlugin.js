const SingleEntryPlugin = require('./SingleEntryPlugin')

const itemToPlugin = function(context, entry, name) {
    return new SingleEntryPlugin(context, entry, name)
}

class EntryOptionPlugin{
    apply(compiler) {
        compiler.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
            itemToPlugin('/Users/larvide/dailyCoding/awsomeWebpack', entry, 'main').apply(compiler)
        })
    }
}

module.exports = EntryOptionPlugin