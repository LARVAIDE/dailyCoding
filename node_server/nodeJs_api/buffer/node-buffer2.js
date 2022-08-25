/**
 * buffer静态方法
 */
// let b1 = Buffer.from('解决问题')
// let b2 = Buffer.from('了没有')

// let b = Buffer.concat([b1, b2], 9)
// console.log(b)
// console.log(b.toString())

//isBuffer
// let b1 = Buffer.from('解决问题')
// console.log(Buffer.isBuffer(b1))

/**
 * split
 */
ArrayBuffer.prototype.split = function (sep) {
    let len = Buffer.from(sep).length
    let ret = []
    let start = 0
    let offset = 0

    while(offset = this.indexOf(sep, start) !== -1){
        ret.push(this.slice(start, offset)) 
        start = offset + len
    }
    ret.push(this.slice(start))
    return ret
}

let buffer = '解决问题，解决烦恼，解决一切'
let barr = buffer.split('决')
console.log(barr)