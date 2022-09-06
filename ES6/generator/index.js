// function * foo(){
//     return 100
// }

// const res = foo()
// console.log(res.next())


function * bar(){
    console.log('11111')
    yield 100

    console.log('2222')
    yield 200

    console.log('333')
    yield 300
}
const res = bar()
console.log(res.next())
console.log(res.next())
console.log(res.next())
console.log(res.next())

