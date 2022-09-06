const container = document.getElementById('btn')

container.addEventListener('click', function(){
    import(/* webpackChunkName: 'foo' */ './js/foo').then(foo => {
        console.log(foo)
    })
})

console.log('主模块内容加载了')


// const name = require('./js/foo')

// console.log(name)
// console.log('主模块加载了')