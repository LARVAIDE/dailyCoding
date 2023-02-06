// import { foo, log } from "./log";
// import msg from "./msg";
// import { name, version } from "../package.json";
// import cjs from "./cjs";


// log(name, version)

// log(cjs)

import('./log').then(({ log }) => {
    log('ssss')
})