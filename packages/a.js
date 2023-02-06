let { log } = console
let obj = { a: { b: { c: 1 } } };

function getValue(obj, keys) {
    return keys.match(/\w/g).reduce((acc, cur) => acc[cur], obj)
}

log(getValue(obj, 'a.b.c'))




