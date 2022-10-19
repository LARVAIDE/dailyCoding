export {}

const foo: object = function(){
    
}

const obj: {foo: number} = {
    foo: 1111
}


const sum: (a: number, b: number) => number = (a, b) => {
    return a + b;
}

interface sum_ {
    (a: number, b: number): number
}
const sum_: sum_ = (a, b) => {
    return a + b;
}

sum_(1, 0);