import a, { foo, bar } from "./modules.mjs";
import name from "./common.js";

console.log(foo, bar, a, name)

setTimeout(() => { 
    console.log(foo, bar, a)
}, 1500)


 