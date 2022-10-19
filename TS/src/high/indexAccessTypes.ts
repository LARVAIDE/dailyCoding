interface Obj {
    a: string,
    b: number
}

// keyof T
let keys: keyof Obj;

//T[K]
let value: Obj['a']

//T extends U
let obj = {
    a: 1,
    b: 2,
    c: 3
}
function getValue<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
}

getValue(obj, ['a', 'b'])

function IParams(params: Partial<Obj>): boolean {
    return Object.keys(params).length > 1 ? true : false;
    
}

console.log(IParams({}))