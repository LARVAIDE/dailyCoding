
function tryNTimes(asyFN, n) { 
    return new Promise((resolve, reject) => { 
        asyFN().then(resolve).catch(reason => { 
            if (n--) {
                console.log(`还有 ${n} 次尝试`)
                tryNTimes(asyFN, n--)
            } else { 
                reject(reason)
            }
        })
    })  
}   

// 每隔一秒生成一个随机数，大于0.9才resolve
function retryDemo(){
    return new Promise((resolve, reject)=>{
        let r = Math.random()
        setTimeout(()=>{
            console.log(r)
            if(r>0.9){
                resolve(r)
            }else{
                reject('error:'+r)
            }
        }, 1000)
    })
}
// 使用重试函数
tryNTimes(retryDemo, 5).then(res=>{
    console.log('成功：'+ res)
}).catch(err=>{
    console.log(err)
})