//闭包
const {log} = console

function makePower(power) {
    return function(number) {
        return Math.pow(number, power) 
    }
}

const power2 = makePower(2)
const power3 = makePower(3)

log(power2(2))
log(power3(3))

