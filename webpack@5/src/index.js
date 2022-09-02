// import "core-js/stable";
// import "regenerator-runtime";

// import { sum, square } from "./js/index";
// import '@/js/createDOM'
// import '@/js/image'
// import '@/js/font'
// import '@/js/lazy'

// const promise = new Promise((resolve, reject) => {
//     console.log('11111');
//     return resolve('ssss')
// })
// console.log(promise)

// /**
//  * 这是注释
// */
// console.log(sum(1, 11), square(2, 2))



import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />)
