// const hello = (name: string) => `hello ${name}`;

// hello('');


// declare const Types: ["input", "textarea", "mobile"];
// declare const Types1: ["input1", "textarea1", "mobile1"];
// type Types = {
//     name: string
// };
// type Types1 = {
//     age: number
// };
// interface Params {
//     1: Types
//     2: Types1
// }

// const foo = <K extends keyof Params>(type: K, params: Params[K]): void => {
//     console.log(params)
// }

// foo(1, {name: ''})

declare const StatusType: ('AA' | 'BB' | 'CC')[]
type Status = (typeof StatusType)[number];
let s: Status = 'AA'

type Keys = ('AA' | 'BB' | 'CC')[]
type Key = Keys[number]
let k: Key = 'BB'