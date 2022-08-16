import { default as DiyPromise } from "./DiyPromise.mjs";

const myPromise = () => new DiyPromise((resolve, reject) => {
    setTimeout(() => resolve('ssss'), 2000);
})

const myPromise1 = () => new DiyPromise((resolve, reject) => {
    setTimeout(() => resolve('aaaa'), 5000);
})

DiyPromise.race([myPromise1(), 'c', myPromise()]).then(res => {
    console.log(res)
})

// DiyPromise.resolve('static resolve').then(res => console.log(res))
// DiyPromise.resolve(myPromise()).then(res => console.log(res))

