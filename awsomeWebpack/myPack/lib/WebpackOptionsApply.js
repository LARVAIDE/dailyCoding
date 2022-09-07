
/**
 * 挂载webpack内置的插件
 * new WebpackOptionsApply().process(options, compiler);
 * EntryOptionPlugin
 * itemToPlugin
 * 1. SingleEntryPlugin 2.mutilEntryPlugin
 */

const EntryOptionPlugin = require('./EntryOptionPlugin')
class WebpackOptionsApply {
    process(options, compiler) {
        new EntryOptionPlugin().apply(compiler)
        compiler.hooks.entryOption.call(options.context, options.entry)
    }
}

module.exports = WebpackOptionsApply