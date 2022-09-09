class SingleEntryPlugin{
    constructor(context, entry, name){
        this.context = context
        this.name = name
        this.entry = entry
    }

    apply(complier){
        complier.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
            const { context, entry, name } = this
            console.log('make被触发了》〉》〉》〉》〉》〉》')
            compilation.addEntry(context, entry, name, callback)
        })
    }
}

module.exports = SingleEntryPlugin